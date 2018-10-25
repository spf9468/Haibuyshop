// pages/cart/cart.js

// console.log(data_type.dataList)
var app = getApp();
Page({
  data: {
    list: [],//循环购物车数据
    allSelect: "circle",
    num: 0,
    count: 0,
    info: [],
    goods_info: [],
    last_price:0,
  },
  go_pay: function () {
    var that = this;
    //console.log(that.data.list);
    that.setData({
      goods_info: []
    })
    var goods_info = that.data.goods_info;
    for (var i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i].select == "success") {
        goods_info.push(that.data.list[i].cart_id)
      }
    }
    var cart_id = that.data.goods_info;
    wx.navigateTo({
      url: "../address/index?cart_id=" + cart_id,
    })
  },
  onLoad: function () {
    var that = this
    //无则赋值
    var shop_id = app.globdData.dianpu_id
    var u_id = wx.getStorageSync('u_id')
    wx.request({
      url: 'https://wx.9lele.com/index.php/wx/type/cart_show',
      data: { merchant_id: shop_id, user_id: u_id },
      success: function (res) {
        that.setData({
          list: res.data.data,
        })
      }
    })
  },



  //改变选框状态
  change: function (e) {
    var that = this;
    //console.log(e)
    //console.log(this.data.list)
    //得到下标
    var index = e.currentTarget.dataset.index
    //console.log(that.data.goods_info);
    //console.log(index)
    //得到选中状态
    var select = e.currentTarget.dataset.select
    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }

    //把新的值给新的数组
    var newList = that.data.list
    //console.log(newList[index]);
    var goods_info = that.data.goods_info;
    goods_info.push(newList[index].cart_id);
    that.setData({
      goods_info: goods_info
    })
    //console.log(goods_info);
    // console.log(that.data.goods_info)
    newList[index].select = stype
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //加法
  addtion: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //默认99件最多
    if (num < 100) {
      num++
    }
    /**
     * 修改商品数量接口
     */

    //把新的值给新的数组
    var newList = that.data.list
    var p = newList[index].goods_price
    newList[index].goods_number = num
    newList[index].cart_sum = parseInt(num) * parseInt(p)
    //var new_number = 'that.data.list.'
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //减法
  subtraction: function (e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var newList = that.data.list
    var p = newList[index].goods_price
    console.log(num)
    console.log(p)
    var a = []
    for (var i in newList) {
      a.push(newList[i])
    }

    //当1件时，点击移除
    // console.log(index)
    if (num == 1) {
      wx.request({
        url: 'https://wx.9lele.com/index.php/wx/type/cart_del',
        data: { cart_id: newList[index].cart_id },
        success: function (res) {
          a.splice(index, 1)
        }
      })
    } else {
      num--
      a[index].cart_sum = parseInt(num) * parseInt(p)
      a[index].goods_number = num
      
    }

    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //全选
  allSelect: function (e) {
    var that = this
    //先判断现在选中没
    var allSelect = e.currentTarget.dataset.select
    var newList = that.data.list
    var a = []
    for (var i in newList) {
      a.push(newList[i])
    }
    if (allSelect == "circle") {
      //先把数组遍历一遍，然后改掉select值
      for (var i = 0; i < a.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      for (var i = 0; i < a.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    that.setData({
      list: newList,
      allSelect: select
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //计算数量
  countNum: function () {
    var that = this
    //遍历数组，把既选中的num加起来
    var newList = []
    var newList = that.data.list
    var allNum = 0
    var a = []
    for (var i in newList) {
      a.push(newList[i])
    }
    for (var i = 0; i < a.length; i++) {
      if (newList[i].select == "success") {
        allNum += parseInt(newList[i].cart_number)
      }
    }
    parseInt
    //console.log(allNum)
    that.setData({
      num: allNum
    })
  },
  //计算金额方法
  count: function () {
    var that = this
    //思路和上面一致
    //选中的订单，数量*价格加起来
    var newList = that.data.list

    var newCount = 0
    var a = []
    for (var i in newList) {
      a.push(newList[i])
    }
    for (var i = 0; i < a.length; i++) {
      if (newList[i].select == "success") {
        newCount += parseInt(newList[i].cart_sum)  
      }
    }
    that.setData({
      count: newCount
    })
  }
})