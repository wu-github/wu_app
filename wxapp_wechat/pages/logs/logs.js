//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: ['some']
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },
  clear_log:function(){
    //
    // var logs=this.data.logs;
    // logs.push(Date.now());
    wx.setStorageSync('logs', [])
    this.setData({
      logs:[]
    })
  }
})
