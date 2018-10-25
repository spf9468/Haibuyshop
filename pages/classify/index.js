var app = getApp()
//引入本地json数据
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        arr:[],
        curNav: 1,
	    	curIndex: 0,
        cateItems: [],
        curNav: 1,
        curIndex: 0,
        att:[],
        
  },
  
    
    switchRightTab: function (e) {
      
      // 获取item项的id，和数组的下标值  
      let id = e.target.dataset.id,
        index = parseInt(e.target.dataset.index);
      // 把点击到的某一项，设为当前index  
      this.setData({
        curNav: id,
        curIndex: index
      })
    },
    //跳转商品列表
    goods_desc:function(e){

      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../list/list?id='+id
      })
    },

    onLoad: function() {
    var that = this
    var value = wx.getStorageSync('classy');
    // if(!value){
      //无则赋值
    var shop_id = app.globdData.dianpu_id
      wx.request({
        url: 'https://wx.9lele.com/index.php/wx/type/classify_show',
        data: { merchant_id: shop_id},
        success: function (res) {
           console.log(res),
          // wx.setStorageSync('classy',res.data.data)
          // var value = wx.getStorageSync('classy');
          that.setData({
            //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
            data: res.data.data,

          });    
        }
        
      })  

    // }
    },

  // fl:function(event){
    
  //   console.log(event.currentTarget.dataset.id)
  //   this.setData({
  //     //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
  //     data_type: user.data,
  
  //   });

   
  //   // wx.request({
  //   //   url: '111',
  //   //   type:'post',
  //   //   success:function(res)
  //   //   {
  //   //     console.log(res);
  //   //   }
  //   // })
  // },  

    //事件处理函数
 
})