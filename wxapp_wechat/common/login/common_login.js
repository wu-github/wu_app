function login(login_phone,login_pw,that){
  if(!login_phone){
    wx.showToast({
      title: '请输入手机号',
      icon: 'success',
      mask: true,
      duration: 1000,
      success: function() {
        
      }
    });
    return;
  }
  if(!login_pw){
    wx.showToast({
      title: '请输入密码',
      icon: 'success',
      mask: true,
      duration: 1000,
      success: function() {
        
      }
    });
    return;
  }
  wx.request({
    url: 'http://localhost:8080/customer-center/user/login',
    data: {loginName:login_phone,password:login_pw,checkCode:'',orderId:''},
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
    success: function(res){
      // success
      console.log(res);
      if(!res.data.success){
        that.setData({
          errorMsg:res.data.message
        })
        return;
      }
      getApp().globalData.login_name=res.data.content.userName;
      getApp().globalData.tokenId=res.data.content.tokenId;
      that.setData({
        login_name:res.data.content.userName,
        login_view_status:'none'
      })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}
module.exports = {
  login: login
}