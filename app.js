//app.js
App({
  //全局变量
  globdData:{
   dianpu_id:2//店铺id为2
  },

  onLaunch: function () {
    var u_id = wx.getStorageSync('u_id');
    var AppID = 'wxabab7bda8ddc37b3';//动态去微信公众平台查询
    var AppSecret = '08fa5230794eb2e2a29972b1a5d2f599';//动态去微信公众平台查询
    if(!u_id){
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://wx.9lele.com/index.php/wx/te/user_login?code='+res.code+"&dianpu_id=2&AppID="+AppID+"&AppSecret="+AppSecret,
            success: function (res) {
              console.log(res)
              wx.setStorageSync('u_id', res.data.u_id)
            }
          })
        }
      })
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData:{
    userInfo:null,
    classifyId:0
  }
})