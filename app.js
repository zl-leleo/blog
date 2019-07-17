// 加载express模板
var express = require('express');

// 加载模板处理模块
var swig = require('swig');

// 创建app应用 => nodejs http.createServer();
var app = express();

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
app.get('/',function(req, res, next){
  // 读取views目录下的置顶文件，解析并返回给客户端
  // 第一个参数：表示模板的文件，相对于views目录， views/index.html
  // 第二个参数：传递给模板使用的数据
  res.render('index');
});

// 监听请求
app.listen('8081');






