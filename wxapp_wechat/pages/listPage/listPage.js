// pages/listPage/listPage.js
var common_login=require('../../common/login/common_login.js');
Page({
  onShareAppMessage: function () {
    return {
      title: '分享',
      desc: '分享描述',
      path: '/pages/listPage/listPage'
    }
  },
  data:{
    select_status:"none",
    suppliers:"",
    firstClasses:"",
    secondClasses:"",
    products:"",
    selectProduct:"",
    selectClass:"",
    login_view_status:'none',
    login_name:''
  },
  onPullDownRefresh: function(){
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.setData({
      login_name:getApp().globalData.login_name
    })
    //访问服务器
  wx.request({
    url:    'http://localhost:8080/customer-center/product/listdata',
    data: {type:'15'},
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
    success: function(res){
      // success
      console.log(res);
      var content=res.data.content;
      var firstClass=content.classList;
      var secondClass;
      for(var i=0,len=firstClass.length;i<len;i++){

      }
      that.setData({
        suppliers:content.suppliers,
        firstClasses:firstClass,
        secondClasses:"",
        products:content.productList,
        selectProduct:content.productList
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
  select:function(){
    var status;
    if(this.data.select_status=="none"){
      status="block";
    }else{
      status="none";
    }
    this.setData({
      select_status:status
    })
  },
  supp_select:function(e){

  },
  first_select:function(e){
    var secondClasses=e.target.dataset.class.classVos;
    if(!secondClasses||secondClasses.length<0){
      secondClasses=[];
    };
    this.setData({
      secondClasses:secondClasses,
      selectClass:e.target.id
    });
    this.product_show();
  },
  second_select:function(e){
    this.setData({
      selectClass:e.target.id
    })
    this.product_show();
  },
  product_show:function(){
    var products=this.data.products;
    var selectClass=this.data.selectClass;
    var selectProduct=[];
    for(var i=0,len=products.length;i<len;i++){
      if(products[i].classId==selectClass.substring(0,products[i].classId.length)){
        selectProduct.push(products[i]);
      }
    };
    if(!selectProduct||selectProduct.length<=0){
      selectProduct=[];
    }
    this.setData({
      selectProduct:selectProduct
    })
  },
  cancel:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定取消？',
      // showCancel:false,
      cancelText:'qx',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            select_status:'none'
          })
        }
      }
    })
  },
  ok:function(){
    var that=this;
    wx.showToast({
      title: '成功',
      icon: 'success',
      mask: true,
      duration: 1500,
      success: function() {
        that.setData({
            select_status:'none'
        })
      }
    });
  },
  toDetail:function(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
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