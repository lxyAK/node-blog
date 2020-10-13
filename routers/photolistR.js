/**
 * Lunbotu.js
 *   处理轮播图路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入 lunbotu 模型构造函数
const Photolist = require('../models/photolist.js');

const photolistR = express.Router();

photolistR.get('/getimages',function (req,res) {
  var params = req.query;
  console.log(params.id);
  Photolist.findOne({id:params.id},function (err,result) {
    if (!err) res.send(result);
    else console.log(err.message);
  })
})
module.exports = photolistR;