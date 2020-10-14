exports.requireLogin = function (req,res) {
  // 判断用户是否登录
  if (!req.session.user) {
    return res.redirect('/login')
  }
}