// 本地模拟json数据
var json = {
  "error_code": 0,
  "data": [
    {
      "o_id": 1,
      "o_sn": "1255656565464",
      "g_price":"￥2999",
      "o_status": 0,
      "o_addtime":"2018-10-8",
      "goods":[{
        "g_num": 2,
        "g_content":"fadfadfadf",
        "g_img": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538047314984&di=a94cf630e27d72ac13c140623ee54c1b&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fbaike%2Fc0%253Dbaike60%252C5%252C5%252C60%252C20%253Bt%253Dgif%2Fsign%3Dabe75c21718da9775a228e79d138937c%2F91ef76c6a7efce1b7c6157d8ad51f3deb48f655e.jpg',
      }] 
    }, {
      "o_id": 2,
      "o_sn": "125566844484",
      "g_price": "￥1999",
      "o_status": 0,
      "o_addtime": "2018-10-7",
      "goods": [{
        "g_num": 3,
        "g_content": "fadfadfadfafdfadf",
        "g_img": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538047314984&di=a94cf630e27d72ac13c140623ee54c1b&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fbaike%2Fc0%253Dbaike60%252C5%252C5%252C60%252C20%253Bt%253Dgif%2Fsign%3Dabe75c21718da9775a228e79d138937c%2F91ef76c6a7efce1b7c6157d8ad51f3deb48f655e.jpg',
      }] 
    },
    {
      "o_id": 3,
      "o_sn": "125566844484",
      "g_price": "￥1999",
      "o_status": 0,
      "o_addtime": "2018-10-7",
      "goods": [{
        "g_num": 3,
        "g_content": "fadfadfadfafdfadf",
        "g_img": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538047314984&di=a94cf630e27d72ac13c140623ee54c1b&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fbaike%2Fc0%253Dbaike60%252C5%252C5%252C60%252C20%253Bt%253Dgif%2Fsign%3Dabe75c21718da9775a228e79d138937c%2F91ef76c6a7efce1b7c6157d8ad51f3deb48f655e.jpg',
      }]
    },
  ]
}

// 定义数据出口
module.exports = {
  orderList: json
}
