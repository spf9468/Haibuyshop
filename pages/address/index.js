Page({
  /**
   * 页面的初始数据
   */
  data: {
    address_id:"",
    goods_id:"",
    cart_id:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  //   // console.log(options);
  //   // return
  //   var that = this
  //   that.setData({
  //     cart_id:options.cart_id
  //   })

  //   var u_id = wx.getStorageSync('u_id')
  //   // console.log(options)
  //   // var goods_id = options.goods_id;
  //   // that.setData({
  //   //   goods_id:goods_id
  //   // })
  //   wx.request({
  //     url: 'https://wx.9lele.com/index.php/wx/address/address_show?user_id='+u_id, //仅为示例，并非真实的接口地址
  //     // header: {
  //     //   'content-type': 'application/json' // 默认值
  //     // },
  //     success: function (res) {
  //       console.log(res);
  //       that.setData({
  //         datalist: res.data
  //       })
  //     }
  //   })  
    
  // },

  onLoad: function (options) {
    var that = this
    console.log(options)
    var u_id = wx.getStorageSync('u_id')
    var cart_id = options.cart_id;
    that.setData({
      cart_id: cart_id,
    })
    wx.request({
      url: 'https://wx.9lele.com/index.php/wx/address/address_show?user_id='+u_id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          datalist: res.data
        })
      }
    })
  },


  /**
   * 提交订单
   */
  add_order: function (e) {
    var that = this;
    var cart_id = that.data.cart_id;
    var user_id = wx.getStorageSync('u_id');
    var address_id = that.data.address_id;
    wx.request({
      url: "https://wx.9lele.com/index.php/wx/Index/add_order?cart_id="+cart_id+"&address_id="+address_id+"&user_id="+user_id,
      success: function(res) {
        wx.navigateTo({
          url: "../order/index",
        })
      }
    })
  },




sets:function(res){
  // console.log(res)
  var that=this
  wx.request({
    url: 'https://wx.9lele.com/index.php/wx/Address/set_address?id='+res.currentTarget.dataset.id,
    success: function (res) {
      console.log(res)
      that.setData({
        id:res.data
      })
    }
  })
  
},
  /**
   * 获取单选框的地址值
   */
  radioChange:function(e){
    var that = this;
    console.log(e)
    var address_id = e.detail.value;
    that.setData({
      address_id:address_id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  delAddress:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    wx.showModal({
      content: '确认删除?',
      success: function (res) {
        if(res.confirm){
          wx.showToast({
            title: 'loading',
            icon: 'loading',
            duration:90000
          })
          wx.request({
            url: 'https://wx.9lele.com/index.php/wx/address/address_delete?id='+id, 
            success:function(res){
              setTimeout(function(){
                wx.showToast({
                  title: '删除成功',
                  duration:1500,
                })
              })
            }
          })
        }
        that.onLoad();
      },
    })   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
 
  // },

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