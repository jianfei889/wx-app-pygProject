import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js"
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"  //貌似现在不需要引入，只需要把微信开发助手的增强编译设置打开就行


// pages/cart/cart.js
Page({

     data:{
          address:{},
          cart:[],
          allCheck:false,
          totalPrice:0,
          totalNum:0,
     },

     onShow(){
          // 1. 获取本地存储中的数据
          const address = wx.getStorageSync("address");
          
          //显示收获地址，（onshow事件，由于购物车可能会频繁的打开，有或者频繁编辑收获地址，所以用 onshow 事件）
               // 1. 获取本地存储中的数据
               // 2. 把数据设置给 data 中的一个变量
          let cart = wx.getStorageSync("cart")||[];//购物车的显示.当cart为空时是一个空数组

          //过滤后的购物车数组
          cart = cart.filter(v=>v.check)



          this.setData({//因为cart参数没有设置  adress,所以再设值. 注意这里的adress需要大括号
               address
          })
          

          //总价格，总数量
          let totalPrice = 0;
          let totalNum = 0;

          cart.forEach(v=>{
                    totalPrice+=v.num*v.goods_price,
                    totalNum+= v.num
          });


               //5，6. 购物车数据重新设置回 缓存和data
               this.setData({
               cart,
               totalPrice,
               totalNum
          })
          



     },





     
     async toPay(){
         /* 
               商品结算页面
               1.判断有没有收货地址
               2. 判断用户有没有选购商品
               3. 经过上面两个验证时，跳转支付页面
          */
         const {address,totalNum} = this.data
     
         //步骤一
         if(!address.userName){
               await showToast({title:'当前没有收获地址'})
               return;
         }

         //步骤二
         if(totalNum===0){
              await showToast({title:"当前没有选购商品"})
              return
         }

         ///步骤三
         wx.navigateTo({
              url: '/pages/pay/pay',
         });


     }




/* 
     微信支付：
          1. 哪些人哪些账号 可以实现微信支付
               1. 企业账号 
               2. 企业账号的小程序后台中，必须给开发者添加上白名单
                    1. 一个appid,可以同时绑定多个开发者
                    2. 那么这个开发者就可以公用这个appid和他的开发权限了
               
*/




})



