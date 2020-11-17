// pages/myPage/myPage.js
var app = getApp()
Page({
  data:{
    //swiper_data
     imgUrls: [
      "/pages/myPage/images/moon.jpg",
      "/pages/myPage/images/title.jpg"
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,

    //map_data
    latitude:"",
    longitude:"",
    gender : "",
    userInfo : {},
    markers: [{
      // iconPath: "/pages/myPage/images/moon.jpg",
      id: 0,
      latitude: "",
      longitude: "",
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 121.45,
        latitude: 31.21
      }, {
        longitude: 121.473701,
        latitude: 31.230416
      }],
      color:"#00ff00AA",
      width: 11,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/pages/myPage/images/wu.gif',
      position: {
        left: 10,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  //swiper
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //  
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
        
      })
      var gender=userInfo.gender;
      if(gender==1){
        that.setData({gender:"男"})
      }else if(gender==0){
        that.setData({gender:"女"})
      }else{
        that.setData({gender:"未知"})
      }
    })
    wx.getLocation({
    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    success: function(res){
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      var lists=[{
      // iconPath: "/pages/myPage/images/moon.jpg",
      id: 0,
      title:"当前位置",
      latitude: latitude,
      longitude: longitude,
      width: 50,
      height: 50
    }];

      that.setData({
        latitude:latitude,
        longitude:longitude,
        markers:lists
      })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
