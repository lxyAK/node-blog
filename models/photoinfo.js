const mongoose = require('mongoose');

//链接数据库，test集合
// mongoose.connect('mongodb://localhost:27017/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: {
    type: String,
    required: true,
    default:'柚柚出去玩的一天'
  },
  id: {
    type: String,
    required: true,
  },
  click:{
    type:Number,
    required:true,
    default:3
  },
  add_time:{
    type:Date,
    required:true,
    default:Date.now()
  }
});

//创建一个Schema的实例,设计表结构
const photoinfoSchema = new Schema(
  {
    id:String,
    status: Number,
    message: [messageSchema],
  },
  // 关联lunbotu集合
  { collection: 'photoinfo' }
);


//创建并导出模型构造函数
const Photoinfo = mongoose.model('Photoinfo', photoinfoSchema);
module.exports = Photoinfo;
