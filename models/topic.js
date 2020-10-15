var mongoose = require('../mongoose_hanlde'); //链接数据区
var moment = require('moment');
moment().format();

// 创建数据模型
var TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  add_time: {
    type: Date,
    required: true,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  user_name: {
    type: String,
    required: true,
    default: '匿名用户',
  },
});

// 导出数据模型
module.exports = mongoose.model('Topic', TopicSchema);
