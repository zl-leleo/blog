var express = require('express');
var router = express.Router();

router.use(function(req, res,next){
  if(!req.userInfo.isAdmin){
    // 如果当前用户是非管理员
    res.send('对不起，只有管理员才能进入后台管理');
    return;
  }
  next();
});

router.get('/', function(req, res, next){
  res.render('admin/index');
})



module.exports = router;
