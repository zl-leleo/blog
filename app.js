// 加载express模板
var express = require('express');

// 加载模板处理模块
var swig = require('swig');

// 加载数据库模块
var mongoose = require('mongoose');

// 创建app应用 => nodejs http.createServer();
var app = express();

// 设置静态文件托管
// 当用户访问的url的/public开始，那么直接返回对应__dirname + '/public' 下的文件
app.use('/public', express.static( __dirname + '/public'));

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同事也是模板文件的后缀第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);

// 设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', __dirname + '/views');

// 开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

// 注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）保持一致
app.set('view engine', 'html');


// 首页
// req request对象
// res response对象
// next 函数
// app.get('/',function(req, res, next){
//   // 读取views目录下的置顶文件，解析并返回给客户端
//   // 第一个参数：表示模板的文件，相对于views目录， views/index.html
//   // 第二个参数：传递给模板使用的数据
//   res.render('index');
// });

// 根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

// 监听请求
mongoose.connect('mongodb://localhost:27017/blog',function(err){
  if(err){
    console.log('数据库连接失败')
  }else{
    console.log('数据库连接成功')
    app.listen('8081');
  }
});






