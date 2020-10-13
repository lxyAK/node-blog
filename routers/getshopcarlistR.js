const express = require('express');
const getShopCarListR = express.Router();
const Goodsinfo = require('../models/goodsinfo.js');

getShopCarListR.get('/goods/getshopcarlist', (req, res) => {
  if (!Array.isArray(req.query.ids)) {
    req.query.ids = [req.query.ids];
  }
  Goodsinfo.aggregate()
    //提取 message 数组字段
    .unwind('$message')
    //通过 message 数组中的所有 id 属性，指定多个值进行查找
    .match({ 'message.id': { $in: req.query.ids } })
    //把查询到的数据组成这种格式 [{_id:null, message: [obj, obj, obj, obj...]}]
    .group({ _id: null, message: { $push: '$message' } })
    //打包一下数据，添加一个 status 字段
    .project({ message: 1, status: { $add: 0 } })
    .exec(function (err, data) {
      console.log(data);
      res.send(data[0]);
    });
});

module.exports = getShopCarListR;
