const mongoose = require('mongoose')

//链接数据库
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });

// exports.mongoose = mongoose
module.exports = mongoose