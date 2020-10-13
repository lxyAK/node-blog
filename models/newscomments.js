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

const grandsonSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    default: '匿名用户',
  },
  add_time: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  content: {
    type: String,
    required: true,
    default: '用户很懒什么都没留下',
  },
});

const childSchema = new Schema({
  pageindex:{
    type:Number,
    required:true,
    default:1
  },
  user_comments: [grandsonSchema]
});

//创建一个Schema的实例,设计表结构
const newscommentsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    comments: [childSchema],
  },

  // 关联lunbotu集合
  { collection: 'newscomments' }
);

//创建并导出模型构造函数
const Newscomments = mongoose.model('Newscomments', newscommentsSchema);
module.exports = Newscomments;
