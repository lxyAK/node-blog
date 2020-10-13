const mongoose = require('mongoose');

//链接数据库，test集合
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

//创建一个Schema的实例,设计表结构
const imgcategorfSchema = new Schema(
  {
    status: Number,
    message: [messageSchema],
  },
  // 关联lunbotu集合
  { collection: 'imgcategrof' }
);


//创建并导出模型构造函数
const Lmgcategorf = mongoose.model('Lmgcategorf', imgcategorfSchema);
module.exports = Lmgcategorf;
