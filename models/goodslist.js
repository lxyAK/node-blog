const mongoose = require('mongoose');

//链接数据库，test集合
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  click: {
    type: Number,
    required: true,
  },
  sell_price: {
    type: Number,
    required: true,
  },
  market_price: {
    type: Number,
    required: true,
  },
  stock_quantity: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  add_time: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const goodsListSchema = new Schema(
  {
    pageindex: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: '0',
    },
    message: [messageSchema],
  },
  {
    collection: 'goodslist',
  }
);

//导出数据模型
const GoodsList = mongoose.model('GoodsList', goodsListSchema);
module.exports = GoodsList;
