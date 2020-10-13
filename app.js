//加载必要模块
var createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
// const router = require('./routers/router');
//导入路由模块
const bodyParser = require('body-parser');
const md5 = require('blueimp-md5');
const session = require('express-session');
const LunbotuR = require('./routers/lunbotuR');
const newslistR = require('./routers/newslistR');
const newsinfoR = require('./routers/newsinfoR')
const newscommentsR = require('./routers/newscommentsR')
const imgcategorfR = require('./routers/imgcategorfR')
const photolistR = require('./routers/photolistR')
const photoinfoR = require('./routers/photoinfoR')
const thumimagesR = require('./routers/thumimagesR')
const goodslistR = require('./routers/goodslistR')
const goodsinfoimgR = require('./routers/goodsinfoimgR');
const goodsinfoR = require('./routers/goodsinfoR');
const getShopCarListR = require('./routers/getshopcarlistR')
const MongoStore = require('connect-mongo')(session);

 // 引入数据库连接文件 

//加载静态资源 , 推荐以后所有的文件路径都使用__dirname来动态获取
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use(
  '/node_modules/',
  express.static(path.join(__dirname, './node_modules'))
);

//使用Session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url:'mongodb://localhost/ims',
      collection:'sessions'
    })
  })
);

//post 请求体设置
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//加载模板引擎
app.engine('html', require('express-art-template'));
//告诉 Express 模板的存放位置
app.set('views', path.join(__dirname, 'views'));
//告诉 Express 给试图引擎设置文件扩展名
//app.set('view engine', 'html');

//挂载路由 一定要放在后面
// app.use(router);
app.use(LunbotuR);
app.use(newslistR);
app.use(newsinfoR)
app.use(newscommentsR)
app.use(imgcategorfR)
app.use(photolistR)
app.use(photoinfoR)
app.use(thumimagesR)
app.use(goodslistR)
app.use(goodsinfoimgR)
app.use(goodsinfoR)
app.use(getShopCarListR)

// 配置一个处理 404 的中间件
// 当前面没有任何能处理的中间件的时候,就进入这个中间件了
app.use(function (req, res) {
  res.send(null)
});

//设置一个全局错误处理的中间件
app.use(function (err, req, res, next) {
  res.status(200).json({
    err_code: 500,
    message: err.message,
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(port, () =>
  console.log(`Server running at  http://127.0.0.1:${port}`)
);
