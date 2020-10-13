const express = require('express')
const thumimagesR = express.Router()
const Thumimages = require('../models/thumimages')

thumimagesR.get('/getthumimages/',(req,res)=>{
  var query = req.query;
  console.log(query.id);
  Thumimages.findOne({id:query.id},(err,data)=>{
    if (!err) {
      res.send(data)
    } else {
      console.log(err);
    }
  })
})

module.exports = thumimagesR