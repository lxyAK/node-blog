const mongoose = require('../mongoose_hanlde.js')

//链接数据库
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });

// mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema

//创建一个Schema的实例,设计表结构
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //创建时候的时间
  created_time: {
    type: Date,
    //注意: 这里不要写 Date.now() 因为会即刻调用
    //这里直接给了一个方法: Date.now
    //当你去 new Model的时候, 如果你没有传递 creat_time, 则 mongoose 就会调用 default 指定的 Date.now 方法, 使用期返回值作为默认值, 直接获得的就是当前最新时间
    default: Date.now
  },
  //最后修改资料后的时间
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  //头像
  avatar: {
    type: String,
    //设置默认头像
    default: '/public/img/avatar-default.png'
  },
  //个人简介
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    //枚举
    enum: [-1, -0, 1]
  },
  birthday: {
    type: Date
  },
  //设置权限状态
  status: {
    type: Number,
    // 0没有权限
    // 1不可以评论
    // 2不可以登录
    enum: [0, 1, 2],
    //默认为0
    default: 0
  }
})

//创建并导出模型构造函数
const User = mongoose.model('User', userSchema)
module.exports = User