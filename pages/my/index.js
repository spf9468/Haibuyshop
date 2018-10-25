var app = getApp()
Page( {
  data: {
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      url:'../order/index'

    }, {
        icon: '../../images/iconfont-shouhuodizhi.png',
        text: '收货地址管理',
        url: '../address/index'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服',
        id:'5',
      }, {
        icon: '../../images/iconfont-help.png',
        text: '常见问题',
        url: '../question/index'
      }]
  },

  onLoad: function() {
   
  },
  modal:function(e){
    var a = e.currentTarget.dataset.id
    if(a == 5){
      wx.showModal({
        title: '客服电话',
        content: '010-666666',
      })
    }
  }
})