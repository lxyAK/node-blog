/**
 * newscomments.js
 *   处理评论的路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入  模型构造函数
const newscomments = require('../models/newscomments');

const newscommentsR = express.Router();

newscommentsR.get('/getcomments/:id', (req, res) => {
  // console.log(1);
  var params = req.params;
  //页数参数
  var query = req.query;
  // console.log(query);
  query.pageindex = Number(query.pageindex);
  // console.log(query.pageindex);
  // console.log(params);
  // 查询字符串传递过来的 id 来查找对应的数据,然后通过第二个参数来确定具体的索引,实现翻页功能
  newscomments.findOne({ id: params.id }, (err, data) => {
    if (err) {
      console.log('查询失败');
    } else if (data) {
      res.send(data.comments[query.pageindex - 1]);
      // console.log(data);
    } else {
      console.log('查询失败');
    }
  });
});

newscommentsR.post('/postcomments', (req, res) => {
  // console.log(1);
  //页数参数
  var query = req.query;
  console.log(query);
  console.log(req.body);
  // console.log(params);
  //添加评论方法
  newscomments.findOneAndUpdate({ id: query.id },{new:true}, (err, data) => {
    if (!err) {
      // console.log(data.comments[0].user_comments);
      data.comments[0].user_comments.unshift(req.body)
      console.log(data.comments[0].user_comments);
      data.save()
      res.send(data)
    } else {
      console.log(err);
    }
  });
});

module.exports = newscommentsR;
