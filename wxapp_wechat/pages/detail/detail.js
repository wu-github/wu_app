// pages/detail/detail.js
var common_login=require('../../common/login/common_login.js');
Page({
  data:{
    id:'',
    content:'',
    sku_status:'none',
    propertyClasses:'',
    properties:'',
    skus:'',
    select_sku:[],
    select_price:'',
    skuId:'',
    login_view_status:'none',
    login_name:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id=options.id;
    var that=this;
    that.setData({
      login_name:getApp().globalData.login_name
    })
    wx.request({
      url: 'http://localhost:8080/customer-center/product/detaildata',
      data: {productId:id},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
          id:id,
          content:res.data.content
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
  skus:function(){
    var that=this;
    var id=that.data.id;
    if(that.data.sku_status=='none'){
      wx.request({
        url: 'http://localhost:8080/customer-center/product/allProperty',
        data: {productId:id},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header:{'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
        success: function(res){
          // success
          console.log(res);
          var content=res.data.content;
          that.setData({
            propertyClasses:content.propertyClassList,
            properties:'',
            skus:content.skuMap,
            sku_status:'block'
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
  },
  select_property:function(e){
    var select_property=[];
    var select_price="";
    var skuId="";
    var skus=this.data.skus;
    var selectClass=e.target.id;
    var select=e.detail.value;
    var isSelected=true;
    select_property=this.data.select_sku;
    if(select_property.length>0){
      for(var i=0,len=select_property.length;i<len;i++){
        if(select_property[i].indexOf(selectClass)==0){
          select_property[i]=select;
          isSelected=false;
          break;
        }
      }
    }else{
      select_property.push(select);
      isSelected=false;
    }
    if(isSelected){
      select_property.push(select);
      select_property.sort(function(arr1,arr2){
      return arr1-arr2;
    })
    }
    var sku=skus[select_property.join(":")];
    if(sku){
      select_price=sku.price;
      skuId=sku.skuId;
    }else if(select_property.length==this.data.propertyClasses.length){
      wx.showModal({
      title: '提示',
      content: '该规格课程已售完！',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          
        }
      }
    })
    }
    this.setData({
      select_property:select_property,
      select_price:select_price,
      skuId:skuId
    })
  },
  toBuy:function(){
    if(this.data.skuId){
      var productId=this.data.id;
      var skuId=this.data.skuId;
      wx.navigateTo({
        url: '/pages/detail/select_linkers?productId='+productId+'&skuId='+skuId,
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
    }else{
      wx.showToast({
      title: '请选择规格！',
      icon: 'success',
      mask: true,
      duration: 1000,
      success: function() {
        
      }
    });
    }
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
  },
  show_login_view:function(){
    if(!getApp().globalData.tokenId){
      this.setData({
        login_view_status:'block',
    })
    }
  },
  hide_login:function(){
        this.setData({
      login_view_status:'none'
    })
  }
})