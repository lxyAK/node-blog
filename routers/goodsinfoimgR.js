const express = require('express')
const goodsinfoimgR = express.Router()
const Goodsinfoimg = require('../models/goodsinfoimg')

goodsinfoimgR.get('/getgoodsimg/',(req,res)=>{
  var query = req.query;
  console.log(query.id);
  Goodsinfoimg.findOne({id:query.id},(err,data)=>{
    if (!err) {
      res.send(data)
    } else {
      console.log(err);
    }
  })
})

module.exports = goodsinfoimgR