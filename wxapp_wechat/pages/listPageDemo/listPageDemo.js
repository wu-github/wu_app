// pages/listPage/listPage.js
Page({
  data:{
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    firstClass:""
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    // console.log(this.data.array[val[0]]);
    this.setData({
      firstClass: this.data.array[val[0]]
    })
    
  },
  outer_view:function(){
    console.log("outer");
  },
  middel_view:function(){
    console.log("middel");
  },
  inner_view:function(){
    console.log("inner");
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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