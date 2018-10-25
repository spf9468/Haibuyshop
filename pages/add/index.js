// pages/add/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  getAddress: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          froms: res
        })
      }
    })
  },
  addAddress:function(e){
    // console.log(e)
    var shop_id = app.globdData.dianpu_id
    var u_id = wx.getStorageSync('u_id')
    if (e.detail.value.user_name.length == 0 || e.detail.value.user_phone.length==0 ||e.detail.value.add_address.length==0){
      wx.showModal({
          title: '选项不能为空',
          icon: 'false',
      })
    }else{
    wx.request({
      url: 'https://wx.9lele.com/index.php/wx/address/address_add',
      data:{
        user_name: e.detail.value.user_name,
        user_id:u_id,
        shop_id:shop_id,
         user_phone:e.detail.value.user_phone,
         add_address: e.detail.value.add_address,
         latitude: e.detail.target.dataset.id,
         longitude: e.detail.target.dataset.ids
      },
      success:function(res){
        // console.log(res.data)
        if(res.data==0){
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 1500
          })
        }else{
          wx.navigateTo({
            url: '/pages/address/index',
          })
        }
      }
    })
    }
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})