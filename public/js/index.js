$(function() {

  var loginObj = $('.login');
  var registerObj = $('.register');
  var userObj = $('.user');

  // 切换到注册面板
  loginObj.find('a').on('click', function() {
    loginObj.hide();
    registerObj.show();
  })

  // 切换到登录面板
  registerObj.find('a').on('click', function() {
    loginObj.show();
    registerObj.hide();
  })

  // 注册
  registerObj.find('.btn').on('click', function() {

    //通过ajax提交请求
    $.ajax({
      type: 'post',
      url: '/api/user/register',
      data: {
        username: registerObj.find('[name="username"]').val(),
        password: registerObj.find('[name="password"]').val(),
        repassword: registerObj.find('[name="repassword"]').val()
      },
      dataType: 'json',
      success: function(result) {
        registerObj.find('.colWarning').html(result.message);

        if (!result.code) {
          // 注册成功
          setTimeout(function() {
            loginObj.show();
            registerObj.hide();
          }, 1000);
        }
      }
    })
  });

  // 登录
  loginObj.find('.btn').on('click', function() {

    //通过ajax提交请求
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      data: {
        username: loginObj.find('[name="username"]').val(),
        password: loginObj.find('[name="password"]').val()
      },
      dataType: 'json',
      success: function(result) {
        loginObj.find('.colWarning').html(result.message);

        if (!result.code) {
          // 登录成功
          window.location.reload();

          // setTimeout(function() {
          //   loginObj.hide();
          //   userObj.show();

          //   // 显示登录用户的信息
          //   userObj.find('.username').html(result.userInfo.username);
          //   userObj.find('.xinxi').html('你好，欢迎光临我的博客！');

          // }, 1000);
        }
      }
    })
  })

  // 退出
  userObj.find('.logout').on('click',function(){
    $.ajax({
      url: 'api/user/logout',
      success: function(result){
        if(!result.code){
          window.location.reload();
        }
      }
    })
  })

})
