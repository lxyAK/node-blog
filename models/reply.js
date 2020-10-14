var mongoose = require('../mongoose_hanlde'); //链接数据区
var moment = require('moment');
moment().format();

// 创建数据模型
var ReplySchema = new mongoose.Schema({
  topicsId: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  add_time: {
    type: String,
    required: true,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  user_name: {
    type: String,
    required: true,
  },
});

// 导出数据模型
module.exports = mongoose.model('Replies', ReplySchema);
