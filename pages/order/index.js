//index.js
// var config = require('../../config.js')
// var http = require('../../utils/httpHelper.js')
// var sta = require("../../utils/statistics.js");
// var orderData = require("../../data/order.js");
// var neworder = orderData.orderList.data
//console.log(neworder);
//获取应用实例
var app = getApp()
Page({
  data: {
    orderList:[],
  },
 onLoad: function () {
    var that = this;
    /**
     * 订单列表接口
     */
   var dianpu_id = app.globdData.dianpu_id;
   var user_id = wx.getStorageSync('u_id');
    wx.request({
      url: "https://wx.9lele.com/index.php/wx/Index/order_list",
      data:{dianpu_id:dianpu_id,user_id:user_id},
      success: function (res) {
        console.log(res)
        that.setData({
          orderList: res.data.datalist,
        })
      }
    })
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../my/index'
    })
  },
  
  lookOrder:function(e){
    var order_id = e.currentTarget.id;
    var that = this;
    wx.navigateTo({
      url: "../detail/index?id="+order_id,
    })
  },
  
  cancelOrder:function (e){
    var that = this;
    var order_id = e.currentTarget.id;
    wx.request({
      url: "https://wx.9lele.com/index.php/wx/Index/edit_order_status",
      data:{order_id:order_id},
      success:function(res){
          wx.showToast({
            title: '取消订单成功!',
            success:res => {
              that.setData({orderList:[]});
              that.onLoad();
            },
            duration: 1000,   
          })
        
      }
    })
     
  },
  
})
