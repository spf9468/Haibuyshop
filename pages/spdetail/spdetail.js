var app = getApp();
Page({
    data: {
        indicatorDots: true,
        goods_price:0,//商品单价
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        iscollect: true,
        goodsinfo:"",
        old_price:[],
        attr_id:"",//选中的属性id
        goods_id:"",
        num: 1,
        minusStatus: 'disabled'
    },
    
    collect: function(){
        this.setData({
            iscollect: !this.data.iscollect
        })
    },
    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    },
    //自动加载事件
     onLoad: function (options) {
        var that = this;
        // console.log(options)
        var goods_id = options.id;
        //调用查出渲染详情表数据接口
        wx.request({
          url: "https://wx.9lele.com/index.php/wx/type/goods_info",
          data:{goods_id:goods_id},
          success:function(res){
            //console.log(res)
             that.setData({      
               goodsinfo: res.data.data,//修改商品详情数据
               goods_price:res.data.data.goods_info.goods_price,//修改商品单价
               goods_id:options.id,//修改商品id

             })
            console.log(that.data.goodsinfo)
          }
        })

        wx.request({
          url: "https://wx.9lele.com/index.php/wx/address/goods_info_image",
          data: { goods_id: goods_id },
          success: function (res) {
            console.log(res.data.goodsinfo)
            that.setData({

               goods_image:res.data.goodsinfo

            })
          }
        })

  },

     addcar:function(e){
  
       var that=this
    
       var attr_num = e.currentTarget.dataset.attrNum
       var goods_id = e.currentTarget.dataset.id 
       var attr_id = e.currentTarget.dataset.attrId 
       var u_id = wx.getStorageSync('u_id')
   //加入购物车提示框是否成功
       wx.showToast({
         title: '加入购物车成功',
         icon: 'success',
         duration: 2000
       })
      //  调用接口详情入库购物车
       wx.request({
         url: "https://wx.9lele.com/index.php/wx/type/cart_add",
         data: {goods_id: goods_id,attr_id:attr_id,user_id:u_id, attr_num:attr_num},
         success: function (res) {
           console.log(res.data)
         }
       })
     },

  changAttrid:function(e){
    this.setData({
      attr_id:e.currentTarget.dataset.id,
      attr_name: e.currentTarget.dataset.name
    })
  },


   radioChange:function(e){
    //  console.log(e)
     var that = this
     var attr_price = e.detail.value
     var price = that.data.goods_price
     var last_price = 'goodsinfo.goods_info.goods_price'
     that.setData({
       [last_price]:parseInt(price) + parseInt(attr_price)
     })
   },

    //点击属性变换金钱
    attr:function(e){
      var that=this
      // console.log(e)
      // return
       //接取原有价钱
       var price=e.currentTarget.dataset.price
       //接取属性价钱
       var attr_price=e.currentTarget.dataset.priceAttr
       //计算有属性的商品价格
       var num = parseInt(price) + parseInt(attr_price)
      //判断切换属性价钱
       var  click_sum =  parseInt(that.data.click_num) + 1; 
       that.setData({
         click_num: click_sum,
       })
       console.log(that.data.click_num)
      if ((parseInt(click_sum) %2) != 1) {
         var goods_price = 'goodsinfo.goods_info.goods_price'
         that.setData({
           [goods_price]:price,
         })
       }else{
         var goods_price = 'goodsinfo.goods_info.goods_price'
         that.setData({
           [goods_price]:num,
         })
       }

    },

    //显示对话框
    showModal: function () {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    //隐藏对话框
    hideModal: function () {
      // 隐藏遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
    },

    /* 点击减号 */
    bindMinus: function () {
      var num = this.data.num;
      // 如果大于1时，才可以减 
      if (num > 1) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    },
    /* 点击加号 */
    bindPlus: function () {
      var num = this.data.num;
      // 不作过多考虑自增1 
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    },
    /* 输入框事件 */
    bindManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回 
      this.setData({
        num: num
      });
    } 

    
})