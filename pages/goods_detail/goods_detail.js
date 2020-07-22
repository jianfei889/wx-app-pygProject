import { request } from "../../request/index.js"
//这个文件只引用即可，不用使用的。具体待查
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"


/* 
     加入购物车：
          1. 先绑定点击事件
          2. 获取缓存中的购物车数据 数组格式
          3. 先判断当前是跟你拼是否已经存在商品之中，
          4. 存在就 修改商品数据，执行购物车商品的数量加一个，重新把购物车数组填充会缓存之中
          5. 不存在 ，直接给购物车数组添加一个新的元素，新元素自带购买数量属性 num ,之后再把购物车数组填充到缓存之中
          6. 弹出用户提示信息（加入购物车成功)
*/

/* 
     商品收藏功能
     1. 页面onShow的时候，加载缓存中的商品收藏的数据
     2. 判断当前商品是不是被收藏
          1.是  改变页面的图标
          2.否，什么都不做
     3. 点击商品收藏按钮时，
          1. 判断商品是否存在于缓存的数组中
          2. 已经存在，把该商品的收藏删除点
          3. 没收藏的话，把商品添加到收藏数组之中，存入到缓存中
     
*/



Page({

     data: {
          goodsObj:"",
          //商品是否被收藏
          isCollect:false
     },

     goodsInfo:{},

     
     

     onLoad: function (options) {
          // var pages =  getCurrentPages();
          // let currentPage = pages[pages.length-1]
          // let options2 = currentPage.options//页面参数
          // console.log("2222:"+options2);
          
          
          // const  {goods_id} = options2
          

          let {goods_id} = options
          this.getGoodsDetails(goods_id)
          
          


     },

     //获取商品详情的数据，这里使用es7的async数据
     async getGoodsDetails(goods_id){
          const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:{goods_id} })
          // console.log(res);
          const goodsObj = res.data.message
          
          this.goodsInfo = goodsObj//这里是预览图片用到的数据

          //1. 获取缓存中的商品收藏的数组
          // let collect = getStorageSync("collect")||[]//可能是一个空数组，对它进行转换
          // 2.判断当前商品是否被收藏
          // let isCollect = collect.some(v=>{
          //      v.goods_id===goodsInfo.goods_id
          // })



          this.setData({
               //商品详情的富文本
               goodsObj:{
                    goods_name:goodsObj.goods_name,
                    goods_price:goodsObj.goods_price,
                    // 富文本标签中的图片存在webp格式， iphone 部分手机 不识别webp 的图片格式
                    //解决办法：1. 后台改动图片成常规格式（推荐做法）  2. 在前端上转换格式(临时做法，不是企业做法，方法可行，但是不推荐)
                    goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
                    pics:goodsObj.pics

               },
               // isCollect
          })


     },


     //点击图片 放大预览
     previewImage(e){
          
          //1. 先构造要预览的图片数组,map()构造新数组，遍历数组，拿到想要的，v是每个元素，v.pics_mid是每个图片的链接
          const urls = this.goodsInfo.pics.map(v=>v.pics_mid)
          
          //2. 点击之后，接收用户点击的图片的索引。（点击哪张图片就放大预览哪张图片）
          const current = e.currentTarget.dataset.url

          wx.previewImage({//微信的图片预览功能函数
               current: current, // 当前显示图片的http链接
               urls: urls // 需要预览的图片http链接列表
             })
        

     },
     

     //添加商品时，加入了两个key键,num和check，一个用来记录数量，一个记录选中状态
     cartAdd(){
          //1. 获取缓存数据中的购物车数组,(没有就会新建)
               //最后的  ||[]  是将格式转换为一个数组格式，确保该变量是一个数组格式
          let cart = wx.getStorageSync("cart")||[];

          //2. 判断商品对象是否存在于购物车数组之中
          let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)

          if(index===-1){
               //3. 在goodsInfo属性下添加一个key值，如果不存在则新建
               this.goodsInfo.num=1
               this.goodsInfo.check=true
               cart.push(this.goodsInfo)

          }else{
               //4. 存在时，执行 num++
               cart[index].num++
          }

          //5. 把购物车重新添加回缓存中
               // 参数1：key,也就是缓存数据的key值，  参2：值
          wx.setStorageSync('cart',cart)

          //6. 弹窗提示信息
          wx.showToast({
               title: '加入购物车成功',
               icon:'success',
               mask: true,//蒙版
          });


     }






    
})