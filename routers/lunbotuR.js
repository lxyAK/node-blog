/**
 * Lunbotu.js
 *   处理轮播图路由文件
 * @type {createApplication}
 */

const express = require('express');

//导入 lunbotu 模型构造函数
const Lunbotu = require('../models/lunbotu.js');

const LunbotuR = express.Router();

LunbotuR.get('/getlunbotu',async(req,res) =>{
  const model = await Lunbotu.find(req.body);
  res.send(model);
});

module.exports = LunbotuR;