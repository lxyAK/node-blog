/**
 * imgcategorf.js
 *   处理轮播图路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入 Lmgcategorf 模型构造函数
const Lmgcategorf = require('../models/imgcategorf');

const LmgcategorfR = express.Router();

LmgcategorfR.get('/getimgcategorf', (req, res) => {
  Lmgcategorf.findOne(function (err, data) {
    if (!err) {
      // console.log(data);
      res.send(data);
    } else {
      console.log(err.message);
    }
  });
});

module.exports = LmgcategorfR;
