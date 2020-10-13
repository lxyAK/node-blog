const express = require('express');
const GoodsList = require('../models/goodslist');
const goodslistR = express.Router();

goodslistR.get('/getgoods/', (req, res) => {
  var query = req.query;
  console.log(query.pageindex);
  GoodsList.findOne({ pageindex: query.pageindex }, (err, data) => {
    if (!err) {
      console.log(data);
      res.send(data)
    }
    // console.log(err);
  });
});

//导出路由,然后去入口文件 app 中去挂载
module.exports = goodslistR;
