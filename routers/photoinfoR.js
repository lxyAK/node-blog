/**
 * Lunbotu.js
 *   处理轮播图路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入 lunbotu 模型构造函数
const photoinfo = require('../models/photoinfo.js');

const photoinfoR = express.Router();

photoinfoR.get('/getimageinfo/', (req, res) => {
  var params = req.query
  // console.log(params);
  photoinfo.findOne({id:params.id}, function (err, data) {
    if (!err) {
      // console.log(data);
      res.send(data)
    } else {
      console.log(err);
    }
  });
});

module.exports = photoinfoR;
