// pages/save/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this
    wx.request({
      url: 'https://wx.9lele.com/index.php/wx/address/address_save?id='+options.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          datalist:res.data
        })
      }
    })
  },
  getAddress: function () {
    var that = this
    var add = 'datalist.add_address'
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          [add]:res.name+res.address,
          address: res,
        })
      }
    })
  },
  upAddress:function(e){
    console.log(e)
    wx.request({
      url: 'https://wx.9lele.com/index.php/wx/address/address_saves',
      data:{
        id:e.detail.target.dataset.id,
        add_address: e.detail.value.add_address,
        user_phone: e. detail.value.user_phone,
        user_name: e.detail.value.user_name,
        latitude: e.detail.target.dataset.la,
        longitude:e.detail.target.dataset.lo
      },
      success:function(res){
        
        //console.log(res.data)
        wx.switchTab({
          url: '../my/index',
        })
      }
    })
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