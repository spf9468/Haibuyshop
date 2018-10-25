//获取应用实例
var app = getApp();
// var page = 1;
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false,
    jsonList: [],
    lunboList: [],
    goodsList: [],
    pagetotal: "",
    page: 1,
    xingji:"",

  },


  onLoad: function() {
    var that = this
    var dianpu_id = app.globdData.dianpu_id;
    //轮播接口
    wx.request({
      url: "https://wx.9lele.com/index.php/wx/Index/goods_lunbo",
      data: {
        dianpu_id: dianpu_id
      },
      success: function(res) {
        that.setData({
          lunboList: res.data.datalist,
        })
      }
    })

    //热卖商品接口
    wx.request({
      url: "https://wx.9lele.com/index.php/wx/Index/goods_hot",
      data: {
        dianpu_id: dianpu_id
      },
      success: function(res) {
        that.setData({
          jsonList: res.data.datalist,
        })
      }
    })
    //商品列表接口
    wx.request({
      url: "https://wx.9lele.com/index.php/wx/Index/goods_list?page=" + that.data.page + "&dianpu_id=" + dianpu_id,
      success: function(res) {
        console.log(res)
        that.setData({
          goodsList: res.data.datalist,
          pagetotal: res.data.pagetotal,
          page: that.data.page + 1,
          xingji: res.data.xingqi,
        })
      }
    })
  },

  onPullDownRefresh() {
    wx.showLoading({
      title: '加载中...',

      mask: true,
      complete: function(res) {
        wx.hideLoading();
      },
    })

  },
  onReachBottom() {
    var that = this;
    var dianpu_id = app.globdData.dianpu_id;
    wx.showLoading({
      title: '玩命加载中...',
      mask: true,
      complete: function(res) {
        wx.hideLoading();
      },
    })
    var p = that.data.page;
    console.log(p)
    var total = that.data.pagetotal;
    var moment = that.data.goodsList;
    if (p <= total) {
      wx.request({
        url: "https://wx.9lele.com/index.php/wx/Index/goods_list?page=" + p + "&dianpu_id=" + dianpu_id,
        success: function(res) {
          for (var i = 0; i < res.data.datalist.length; i++) {
            moment.push(res.data.datalist[i]);
          }
          that.setData({
            goodsList: moment,
            page: p + 1,
          })
        }
      })
    }
  }
})