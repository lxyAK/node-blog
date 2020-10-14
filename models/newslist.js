const mongoose = require('mongoose');
const { now } = require('jquery');

//链接数据库，test集合
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema;

//创建一个Schema的实例,设计表结构
const newslistSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      default: 'http://127.0.0.1:3001/public/img/lxy.jpg',
    },
    add_time: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    title: {
      type: String,
      required: true,
    },
    click: {
      type: Number,
      required: true,
    },
    zhaiyao: {
      type: String,
      required: true,
    },
  },
  // 关联lunbotu集合
  { collection: 'newslist' }
);

//创建并导出模型构造函数
const Newslist = mongoose.model('Newslist', newslistSchema);
module.exports = Newslist;
