const App = getApp()
Page({
    data: {
        orderinfo:"",
    },
    onLoad:function(options) {
       var that = this;
       var order_id = options.id;
       wx.request({
         url: "https://wx.9lele.com/index.php/wx/Index/order_list",
         data:{order_id:order_id},
         success:function(res){
            that.setData({
              orderinfo:res.data.datalist[0]
            })
            // console.log(that.data.orderinfo[0])
         },
       }) 
    }, 
})