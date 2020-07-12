
// 0 引入用来发送请求的方法
import { request } from "../../request/index.js"


//Page Object
Page({
  data: {

    swiperList: [],// 轮播图数组
    
    catesList: [],// 导航数组

    floorList:[]//楼层数组

  },

  //api 获取轮播图数据
  getSwiperList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },


  //获取分类导航数据
  getCateList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result.data.message
        })
      })
  },

  //获取楼层数据
  getFloorList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  },


  onLoad: function () {

    // var reqTask = wx.request({
      //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

      //   success: (result)=>{

      //     // console.log(result);

      //     this.setData({
      //       swiperList:result.data.message
      //     })

      //   },

    // });

    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
    
  }






});
