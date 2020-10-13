const express = require('express');
const goodsinfoR = express.Router();
const Goodsinfo = require('../models/goodsinfo.js');
// const Message = require('../models/goodsinfo.js');

goodsinfoR.get('/goods/getinfo/', (req, res) => {
  
  var query = req.query;
  
  // params.id = Number(params.id);
  Goodsinfo.aggregate()
    .unwind('$message')
    //指定一个数组字段用于分割，对每个值创建一个单独的文档
    .match({ 'message.id': query.id })
    //通过指定的属性值来匹配过滤
    .group({ _id: query.id, message: { $push: '$message' } })
    //打包一下数据，添加一个 status 字段
    .project({ message: 1, status: { $add: 0 } })
    
    .exec(function (err, data) {
      console.log(data[0].message[0].id);
      console.log(typeof (data[0].message[0].id));
      res.send(data[0]);
    });
});
module.exports = goodsinfoR;
