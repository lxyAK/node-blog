/**
 * newslist.js
 *   处理轮播图路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入 lunbotu 模型构造函数
const newslist = require('../models/newslist.js');

const newslistR = express.Router();

newslistR.get('/getnewslist',async(req,res) =>{
  const model = await newslist.find(req.body);
  res.send(model);
});

module.exports = newslistR;