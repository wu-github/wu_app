// pages/detail/select_linkers.js
const date = new Date();
const years = [];
const months = [];
const days = [];
const year_begain=1950;
for (let i = 1950; i <= date.getFullYear()+5; i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}
Page({
  data:{
    //time
    years: years,
    months: months,
    days: days,
    date_value:[date.getFullYear()-year_begain,date.getMonth(),date.getDate()-1],

    productId:'',
    skuId:'',
    product_name:'',
    sku:'',
    protocoCode:'',
    adultNum:'',
    childNum:'',
    totalPrice:'',
    linkers:[],
    linker_view_status:'none',
    select_child:'',
    select_linker:'',
    linker_info_view:false,
    linker:'',
    toBuy_status:'',
    linker_type:'x',
    select_child:true,
    certificate:'',
    certificateType:'',
    certificateTypeName:'',
    certificateNum:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var productId=options.productId;
    var skuId=options.skuId;
    productId="ff80808159ba0cc9015a02fe65f7002c";
    skuId="ff80808159ba0cc9015a02fe667b003e";
    getApp().globalData.tokenId="custmoerAFDF711481BECE737D7766BBF3D8DB09";
    wx.request({
      url: 'http://localhost:8080/customer-center/product/propertyData',
      data: {productId:productId,skuId:skuId},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type':'application/x-www-form-urlencoded','tokenId':getApp().globalData.tokenId,'Cookie':'tokenId='+getApp().globalData.tokenId}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        var content=res.data.content;
        var certificateNum;
        if(content.certificate=='0'){
          certificateNum="y";
        }
        that.setData({
          productId:productId,
          skuId:skuId,
          product_name:content.shortName,
          sku:content.skuName,
          adultNum:content.adultNum,
          childNum:content.childNum,
          totalPrice:content.totalPrice,
          certificate:content.certificate,
          certificateType:content.certificateType[0].code,
          certificateTypeName:content.certificateType[0].value,
          certificateNum:certificateNum
        })
      },
      fail: function() {
        // fail
        wx.showToast({
        title: '连接服务器失败',
        icon: 'success',
        mask: true,
        duration: 1000,
        success: function() {
          
        }
      });
      },
      complete: function() {
        // complete
      }
    })
  },
  show_linkers:function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/customer-center/product/linkers/select',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type':'application/x-www-form-urlencoded','tokenId':getApp().globalData.tokenId,'Cookie':'tokenId='+getApp().globalData.tokenId}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        var content=res.data.content;
        that.setData({
          linker_view_status:'block',
          linkers:content.linkerList
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
  select_linker:function(e){
    this.setData({
      select_linker:e.detail.value
    })
  },
  select_child:function(e){
    this.setData({
      select_child:e.detail.value
    })
  },
  modify_linker:function(e){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/customer-center/personal/childInfo',
      data: {"childId":e.target.id},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type':'application/x-www-form-urlencoded','tokenId':getApp().globalData.tokenId,'Cookie':'tokenId='+getApp().globalData.tokenId}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        var content=res.data.content;
        var birth_date=content.birthDate;
        var birth_date=birth_date.replace('年',',').replace('月',',').replace('日',',').split(',');
        birth_date[1]--;
        birth_date[2]--;
        that.setData({
          linker:content,
          date_value:[birth_date[0]-year_begain,birth_date[1],birth_date[2]],
          toBuy_status:true,
          linker_info_view:true,
          linker_type:e.target.dataset.type
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
  add_linker:function(){
    this.setData({
      linker:'',
      toBuy_status:true,
      linker_info_view:true,
    })
  },
  select_linker_type:function(e){
    if(e.detail.value=="x"){
      this.setData({
        linker_type:'x'
      })
    }
    if(e.detail.value=="c"){
      this.setData({
        linker_type:'c'
      })
    }
  },
  birth_date_change:function(e){
    this.setData({
      date_value:[e.detail.value[0],e.detail.value[1],e.detail.value[2]]
    })
  },
  bindreset:function(){
    this.setData({
      select_child:true
    })
  },
  linker_info_submit:function(e){
    console.log(e);
    var value=e.detail.value;
    var type; 
    if(e.target.dataset.id){
      type=this.data.linker_type;
    }else{
      type=value.linker_type;
    }
    wx.request({
      url: 'http://localhost:8080/customer-center/personal/addChild',
      data: {childId:e.target.dataset.id,name:value.name,gender:value.sex,grade:value.grade,shcool:value.shcool,birthDate:birth,hkNumber:hkNumber,
				twNumber:twNumber,passportNumber:passportNumber,cardNo:cardNo,type:type},
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
    this.setData({
      certificateNum:'y',
      linker_info_view:false,
      toBuy_status:false
    })
  },
  cancel:function(){
    this.setData({
      linker_info_view:false,
      toBuy_status:false
    })
  },
  toBuy:function(){
    var child=this.data.select_child;
    var linker=this.data.select_linker;
    var childNum=this.data.childNum;
    var adultNum=this.data.adultNum;
    var a={'a':1,'b':child};
    if(child.length!=childNum||linker.length!=adultNum){
      wx.showToast({
        title: '请按照说明选择信息!',
        icon: 'success',
        mask: true,
        duration: 1000,
        success: function() {
          
        }
      });
      return;
    }
    if(has_certificate=='n'){
      wx.showToast({
        title: '请添加'+certificateTypeName+'信息!',
        icon: 'success',
        mask: true,
        duration: 1000,
        success: function() {
          
        }
      });
      return;
    }
    wx.request({
      url: 'http://localhost:8080/customer-center/product/orderSave',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{'content-type':'application/x-www-form-urlencoded','tokenId':getApp().globalData.tokenId,'Cookie':'tokenId='+getApp().globalData.tokenId}, // 设置请求的 header
      success: function(res){
        // success
        var orderId;
        wx.navigateTo({
          url: '/pages/detail/check_order?orderId='+orderId,
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