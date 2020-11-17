// pages/detail/check_order.js
Page({
  data:{
    payParam:{
      timeStamp:new Date().getTime()/1000,
      nonceStr:'nonceStr',
      package:'',
      signType:'MD5',
      paySign:''
      }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'https://URL',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type':'application/x-www-form-urlencoded','tokenId':getApp().globalData.tokenId,'Cookie':'tokenId='+getApp().globalData.tokenId}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  toBuy:function(){
    var payParam=this.data.payParam;
    wx.requestPayment({
      timeStamp: payParam.timeStamp+'',
      nonceStr: payParam.nonceStr,
      package: payParam.package,
      signType: 'MD5',
      paySign: payParam.paySign,
      success: function(res){
        // success
        console.log(res);
        if(res.errMsg=='requestPayment:ok	'){
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            mask: true,
            duration: 1000,
            success: function() {
              
            }
          });
        }
      },
      fail: function(res) {
        // fail
        console.log(res);
      },
      complete: function(res) {
        // complete
        console.log(res);
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