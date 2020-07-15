import { request } from "../../request/index.js"
//这个文件只引用即可，不用使用的。具体待查
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"


Page({

     data: {
          goodsObj:""
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          const {goods_id} = options
          this.getGoodsDetails(goods_id)
     },

     //获取商品详情的数据，这里使用es7的async数据
     async getGoodsDetails(goods_id){
          const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:{goods_id} })
          // console.log(res);
          
          this.setData({
               goodsObj:res.data.message
          })
     }

    
})