const mongoose = require('mongoose');

//链接数据库，test集合
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema;

//创建一个Schema的实例,设计表结构
const lunbotuSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
    },
  },
  // 关联lunbotu集合
  { collection: 'lunbotu' }
);

//创建并导出模型构造函数
const Lunbotu = mongoose.model('Lunbotu', lunbotuSchema);
module.exports = Lunbotu;
