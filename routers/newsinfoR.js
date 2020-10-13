/**
 * newsinfo.js
 *   处理轮播图路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入  模型构造函数
const newsinfo = require('../models/newsinfo.js');

const newsinfoR = express.Router();

newsinfoR.get('/getnewsinfo/:id', (req, res) => {
  var params = req.params;
  // console.log(params.id);
  // URL 传递过来的 id 来查找对应的数据
  newsinfo.findOne({ id: params.id }, (err, data) => {
    if (err) {
      console.log('查询失败');
    } else if (data) {
      res.send(data);
    } else {
      console.log('查询失败');
    }
  });
});

module.exports = newsinfoR;
