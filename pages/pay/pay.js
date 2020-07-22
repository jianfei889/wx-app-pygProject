import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js"
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"  //貌似现在不需要引入，只需要把微信开发助手的增强编译设置打开就行
import { request } from "../../request/index.js"


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


     },


     //点击支付的功能
     async orderPay(){
          // 1. 先判断缓存中有没有token(token就是令牌，唯一，身份证，凭据，进行验证的意思)
          const token = wx.getStorageSync("token");
          //判断token 是否存在
          if(!token){
               console.log("没有token值");
               wx.navigateTo({
                    url: '/pages/auth/auth',
               });
          }  
          
          //3. 创建订单
               //3.1, 准备请求头参数
               // const header = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
               // const header = {Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"}
               let header2 = {Authorization:token}
               let header = header2.Authorization
               console.log(header);

               // 3.2，准备请求体参数
               const order_price = this.data.totalPrice     //这里获取请求体的总价
               const consignee_addr = this.data.address.all //.all是详细地址，这里获取请求体的地址
               
               const cart = this.data.cart
               let goods = []
               cart.forEach(v=>goods.push({
                    goods_id:v.goods_id,
                    goods_number:v.num,
                    goods_price:v.goods_price
               }))
            
               
               
               
          //4. 准备发送请求，创建订单，获取订单编号
               const urlData = {order_price,consignee_addr,goods}
               const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create",method:"POST",data:urlData,header})
               console.log(res);
               


          



     }







/* 

     【 注 】：   没有微信企业账号的是无法做支付页面的。所以这里学习学习，等待机会再补充完整案例代码


     1. 微信支付：
          1. 哪些人哪些账号 可以实现微信支付
               1. 企业账号 
               2. 企业账号的小程序后台中，必须给开发者添加上白名单
                    1. 一个appid,可以同时绑定多个开发者
                    2. 那么这个开发者就可以公用这个appid和他的开发权限了
     2. 支付按钮：
          1. 先判断缓存中有没有token
          2. 没有跳转到授权页面 进行获取token
          3. 有token,正常执行剩下的支付逻辑
          4. 创建订单 获取订单编号
               4.1 准备接口的请求头参数
               4.2：准备请求体参数
          5. 准备发送请求，创建订单，获取订单号
               5.1 接口调用，post方式，data路径传参，获取订单号


*/




})



