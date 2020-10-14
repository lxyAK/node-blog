const express = require('express');
const router = express.Router();
const eventproxy = require('eventproxy');
//导入模型构造函数
const Topic = require('../models/topic.js');
const User = require('../models/user.js');
const md5 = require('blueimp-md5');
const ep = new eventproxy(); //处理异步代码的工具

//首页
router.get('/', (req, res) => {
  //console.log(req.session.user);
  // 获取博客数据
  var page = parseInt(req.query.page) || 1;
  page = page > 0 ? page : 1;
  var count = 10;
  var query = {};
  var option = { skip: (page - 1) * count, limit: count, sort: '-add_time' };
  // 获取10条博客内容
  Topic.find(query, {}, option, (err, topics) => {
    ep.emit('topic_data_ok', topics);
  });
  // 获取总页面
  Topic.countDocuments(query, (err, allCount) => {
    var pageCount = Math.ceil(allCount / count);
    ep.emit('page_count_ok', pageCount);
  });
  ep.all('topic_data_ok', 'page_count_ok', function (topics, pageCount) {
    console.log(topics);
    // console.log(pageCount);
    res.render('index.html', {
      user: req.session.user,
      topics: topics,
      pageCount: pageCount,
      page: page,
    });
  });
});

//登录渲染
router.get('/login', (req, res) => {
  res.render('login.html', {});
});
//登录处理
router.post('/login', (req, res, next) => {
  /**
   * 1.获取表单提交的数据
   * 2.提交到数据库进行匹配
   * 3.发送响应
   */
  var body = req.body;
  // console.log(body);
  //password要进行加密比对
  User.findOne(
    //password 反向解密
    { email: body.email, password: md5(md5(body.password) + 'google20190830') },
    (err, user) => {
      // console.log(err, user);
      if (err) {
        // 设置自定义状态码
        // console.log(res.status(200));
        return res.status(200).json({
          err_code: 500,
          message: 'Server is err',
        });
      }

      //优先处理错误，如果user为null说明没有找到数据
      if (!user) {
        // console.log(user);
        return res.status(200).json({
          err_code: 1,
          message: 'Email or password is invalid',
        });
      }

      //如果数据存在则表示登录成功，记录登录状态
      req.session.user = user;
      // console.log(req.session.user);
      res.status(200).json({
        err_code: 0,
        message: 'OK',
      });
      //根据状态码
      // res
      //   .status(200)
      //   .json({
      //     data:user,
      //     status: 200,
      //     message: 'ok',
      //   })
    }
  );
});

//注册渲染
router.get('/register', (req, res) => {
  res.render('register.html', {});
});
//注册处理
router.post('/register', (req, res, next) => {
  /**
   * 1.获取表单的数据 req.body
   * 2.操作数据库
   *  判断用户 email 或者 nickname 是否存在
   *  如果存在, 不允许注册
   *  如果不存在, 注册新建用户
   * 3.发送响应
   */
  var body = req.body;
  User.findOne(
    {
      $or: [{ email: body.email }, { nickname: body.nickname }],
    },
    function (err, data) {
      if (err) {
        // return res.status(500).json({
        // err_code: 500,
        // message: '服务端错误',
        // });
        return next(err);
      }
      //如果data存在, 表示邮箱或者密码已存在
      if (data) {
        return res.status(200).json({
          err_code: 1,
          message: '邮箱或者昵称已存在',
        });
      }

      //对密码进行 md5 重复加密 ---> 一般情况加密2层+自定义加密字符串
      body.password = md5(md5(body.password) + 'google20190830');

      //通过模型构造函数创建一条数据, 将用户传入req.body传入, 然后save保存数据持久化
      new User(body).save(function (err, user) {
        if (err) {
          // return res.status(500).json({
          // err_code: 500,
          // message: '服务端错误',
          // });
          return next(err);
        }

        //注册成功，使用 Session 来记录用户的登录状态
        req.session.user = user;
        // console.log(req.session.user);
        res.status(200).json({
          err_code: 0,
          message: 'ok',
        });
      });
    }
  );
});

//用户退出登录
router.get('/logout', function (req, res) {
  //清除登录状态
  req.session.user = null;
  //重定向到登录页面，因为 a 链接是同步请求，直接可以用客户端重定向
  res.redirect('/login');
});

//设置页面渲染
router.get('/settings/profile', function (req, res, next) {
  // console.log('渲染设置页面：', req.session.user);
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('settings/profile.html', {
    user: req.session.user,
  });
});

//设置页面处理
router.post('/settings/profile', function (req, res, next) {
  /**
   * 1.通过 session 记录的用户数据，提交到数据库进行匹配
   * 2.获取用户提交的表单，提交到数据库进行操作
   *  2.1.判断用户修改的昵称是否存在，存在则不允许修改，不存在则可以修改
   * 3.发送响应
   */
  var body = req.body;
  var user = req.session.user;
  // console.log(user);
  // console.log('post请求体', body);
  //通过用户提交的数据查看是否存在
  User.findOne({ nickname: body.nickname }, function (err, data) {
    if (err) {
      return next(err);
    }
    //如果 data 存在则表示昵称存在
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'this nickname already exists',
      });
    } else {
      //否则表示不存在，然后找到对应的数据更新用户资料,然后返回新的数据
      User.findByIdAndUpdate(
        user._id,
        {
          nickname: body.nickname,
          gender: body.gender,
          birthday: body.birthday,
        },
        //返回修改后的新数据
        { new: true },
        function (err, data) {
          if (err) {
            return next(err);
          }
          //更新 session 信息
          req.session.user = data;
          //  console.log(data);
          res.status(200).json({
            err_code: 0,
            message: 'OK',
          });
        }
      );
    }
  });
});

//账户设置页面渲染
router.get('/settings/admin', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('settings/admin.html', {
    user: req.session.user,
  });
});

//处理修改密码
router.post('/settings/admin', function (req, res, next) {
  if (req.session) {
    //通过 session 数据获取用户的 id 然后跟数据库进行匹配
    //接受用户的表单提交,找到密码反向解密,然后更新再加密
    /**
     * 1.获取表单提交的数据
     * 2.提交到数据库进行匹配
     * 3.发送响应
     */
    var body = req.session.user; // 验证信息
    // console.log(body);
    var newBody = req.body; // 更新的信息
    // 再次判断用户提交的密码是否一致
    if (newBody.newPassword !== newBody.rePassword) return;
    //password要进行加密比对,比对成功进行修改
    User.findOneAndUpdate(
      //查询条件 password 反向解密
      {
        email: body.email,
        password: body.password,
      },
      // 修改的数据
      { password: md5(md5(newBody.newPassword) + 'google20190830') },
      //返回更新后的数据
      { new: true },
      (err, user) => {
        // console.log(err, user);
        if (err) {
          // 设置自定义状态码
          // console.log(res.status(200));
          return res.status(200).json({
            err_code: 500,
            message: 'Server is err',
          });
        }

        //优先处理错误，如果user为null说明没有找到数据
        if (!user) {
          // console.log(user);
          return res.status(200).json({
            err_code: 1,
            message: 'Email or password is invalid',
          });
        }
        // console.log(user);
        //密码修改成功，记录登录状态
        req.session.user = user;
        // console.log(req.session.user);
        res.status(200).json({
          err_code: 0,
          message: 'OK',
        });
      }
    );
  }
});

// 发表页面渲染
router.get('/topics/new', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('../views/topic/new.html', {
    user: req.session.user,
  });
});

// 发表话题内容页面处理
router.post('/topics/new', (req, res, next) => {
  // 接收用户的发表内容
  let body = req.body;
  // 根据用户的登录信息进行数据合并
  let newBody = {
    title: body.title,
    content: body.content,
    user_name: req.session.user.nickname,
  };
  // console.log(newBody);
  //通过模型构造函数创建一条数据, 将用户传入req.body传入, 然后save保存数据持久化
  new Topic(newBody).save(function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: '服务端错误',
      });
      // return next(err);
    }

    res.status(200).json({
      err_code: 0,
      message: 'ok',
    });
  });
});

// 话题内容详情页面处理
router.get('/topics/:id', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  let topicId = req.params.id.replace(/\"/g,"")
  console.log(topicId);
  Topic.findOne({_id:topicId}, (err, topic) => {
    ep.emit('topic_data_ok', topic);
  });
  ep.all('topic_data_ok', (topic) => {
    res.render('../views/topic/show.html', {
      user: req.session.user,
      topic: topic,
    });
  });
});

/**
 * 测试
 */
/* GET home page. */
// 用来为这个用户存储一个 session
// router.get('/a', function (req, res, next) {
//   var a = Math.floor(Math.random() * 10) + '';
//   req.session.user = a;
//   res.send(a);
// });

// // 在页面上打印自己在 session 中存储的信息
// router.get('/b', function (req, res, next) {
//   req.session.touch();
//   res.send(req.session.user);
// });

module.exports = router;
