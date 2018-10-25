var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        goodsinfo:[]
    },

    onLoad: function(options) {
        console.log(options.type);
        var v_type = options.type;
        if(v_type === "lunbo"){
          var id = options.id;
          var data = wx.getStorageSync('lunbo');
          var g_data = data[id-1];
          console.log(g_data);
        }
      if (v_type === "hot"){
        var id = options.id;
        var data = wx.getStorageSync('ndw');
        var g_data = data[id - 1];
        console.log(g_data);
        }
      if (v_type === "goods"){
        var id = options.id;
        var data = wx.getStorageSync('goods');
        var g_data = data[id - 1];
        //console.log(g_data);
        }
        this.setData({
          goodsinfo:g_data
        })
    
        var that = this
        
        // 商品详情
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/goods/inqgoods?id=' + options.id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                //console.log(res.data.data);
                that.data.shopppingDetails = res.data.data;

                var goodsPicsInfo = [];
                var goodsPicsObj = {};
                var goodspic = res.data.data.goodspics;
                var goodspics = goodspic.substring(0, goodspic.length - 1);
                var goodspicsArr = goodspics.split("#");
                for (var i = 0; i < goodspicsArr.length; i++) {
                    goodsPicsInfo.push({
                        "picurl": goodspicsArr[i]
                    });
                }
                that.setData({
                    goodsPicsInfo: goodsPicsInfo
                })
            }
        })

    }
})
