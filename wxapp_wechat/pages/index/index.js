//index.js
//获取应用实例
var app = getApp();
var common_login=require('../../common/login/common_login.js');
Page({
  data: {
    motto: '',
    userInfo: {},
     //swiper_data
     imgUrls: [
      "/pages/myPage/images/moon.jpg",
      "/pages/myPage/images/title.jpg"
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    login_view_status:'none',
    bind_login_phone_value:'',
    bind_login_pw_value:'',
    errorMsg:'',
    login_name:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toMy:function (){
    wx.navigateTo({
      url: '../myPage/myPage',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  toListDemo:function(){
     wx.navigateTo({
      url: '../listPageDemo/listPageDemo',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  toList:function(){
     wx.switchTab({
      url: '../listPage/listPage',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        motto:"Hello "+userInfo.nickName,
        login_name:getApp().globalData.login_name
      })
    })
  },
  show_login_view:function(){
    if(!getApp().globalData.tokenId){
      this.setData({
        login_view_status:'block',
        bind_login_phone_value:wx.getStorageSync('bind_login_phone_value')
    })
    }
  },
  hide_login:function(){
        this.setData({
      login_view_status:'none'
    })
  },
  bind_login_phone:function(e){
    this.setData({
      bind_login_phone_value:e.detail.value
    })
    wx.setStorage({
      key: 'bind_login_phone_value',
      data: e.detail.value,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bind_login_pw:function(e){
    this.setData({
      bind_login_pw_value:e.detail.value
    })
  },
  login:function(){
    common_login.login(this.data.bind_login_phone_value,this.data.bind_login_pw_value,this);
  },
  register:function(){
    wx.navigateTo({
      url: '/pages/register/register',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})

