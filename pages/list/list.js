Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    lists: [],              // 接收搜索的内容
    wxSearchData: '',       // 输入的值
     data:[],//页面展示的数据
     cat_id:""
     },

  onLoad: function (options) {
   console.log(options)
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
      
        var that = this
      
          //无则赋值
          wx.request({
            url: 'https://wx.9lele.com/index.php/wx/type/goods_list?cat_id='+ options.id,
            success: function (res) {
              that.setData({
                scrollH: scrollH,
                imgWidth: imgWidth,
                data: res.data.data,
                cat_id: options.id
              });
            }
          })
        //加载首组图片
        this.loadImages();
      }
    })

  },
  //列表跳转当前商品详情页
  list_desc: function (e) {
     
     var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: '../spdetail/spdetail?id=' + id
     })

  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
      col1.push(imageObj);
    } else {
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function () {
    let images = [];
    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  },
//搜索
  wxSearchInput: function (value) {
  var goods_name=value.detail.value;
  console.log(value);
    var that = this;
    if (value.detail.cursor > 0) {
      wx.request({
        url: 'https://wx.9lele.com/index.php/wx/type/search',
        data: {
          goods_name: goods_name,cat_id:that.data.cat_id
        },
        success: function (res) {
          console.log(res.data.data);
     
            that.setData({
              
              data: res.data.data
            })
         
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  /**
   * 监听软键盘确认键
   */
  wxSearchConfirm: function (e) {

  },

  /**
   * 返回
   */
  back: function (e) {
    wx: wx.navigateBack({
      delta: 1,
    })
  }

})
