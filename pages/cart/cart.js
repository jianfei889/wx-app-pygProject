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
          const cart = wx.getStorageSync("cart")||[];//购物车的显示.当cart为空时是一个空数组

          this.setData({//因为cart参数没有设置  adress,所以再设值. 注意这里的adress需要大括号
               address
          })
          
          this.setCart(cart)

         /*  // 2. 把数据设置给 data 中的一个变量
          this.setData({
               address,
               cart,
               allCheck,
               totalPrice,
               totalNum
          }) */

     },





     //原生获取收获地址的方法。
     yuanSheng_getAddress(){




          // 1. 绑定点击事件
          // 2. 获取收获地址(微信存在收获地址内置方法函数 wx.chooseAddress)
          
          // 3. 第一次点击按钮如果不授权的话，在第二次点击按钮之后不会再调用 是否授权页面。所以解决办法有：
               // 用到的数据 authSetting[""scope.address""]
               // 1. 授权的话：scope.address：true---------这种情况可以直接调用收获地址
               // 3. 从来没调用 scope 的话，值为 undefined---------这种情况可以直接调用收获地址
               // 2. 不授权的话：scope.address：false-----------这种情况下，解决办法为：
                    // 1.诱导用户自己打开 授权设置页面（用openSetting打开）  ， 然后自己给予权限
                    // 2. 获取收获地址



          // 收获地址---有原生的代码和在原生代码上优化的两种方法。原生比较容易理解，优化版的代码简洁，公司项目推荐优化



          /* //这里的是原生的方法
               wx.getSetting({//这里的是原生的方法
                    // 操作 1. 获取权限状态
                    success: (result)=>{
                         //操作 2. 获取权限状态
                         // const scopeAddress = result.authSetting.(scope.address)//原本是这样的。scope.address 命名上有带你问题，但它是一个属性
                              //针对这种命名的属性，可以采用下面的方法
                         const scopeAddress = result.authSetting["scope.address"]

                         if(scopeAddress==true||scopeAddress==undefined){
                              wx.chooseAddress({//调用收获地址方法
                                   success: (result2)=>{
                                        console.log(result2);
                                        
                                   }
                              });
                         }else{
                              //操作 3. 不授权的话：scope.address：false
                              wx.openSetting({
                                   success: (result2)=>{//打开设置页面成功时

                                        //4. 调用收获地址代码
                                        wx.chooseAddress({
                                             success: (result3)=>{
                                                  console.log(result3);
                                                  
                                             }
                                        });

                                   }


                              });
                         }
                    }
               });
               */
     
     },


     // 这是优化之后的版本  ，获取收获地址   
     async getAddress(){

          try {

          //1. 获取权限状态
          const res1 = await getSetting()//权限状态的设置，里面存有设置相关的参数
          const scopeAddress = res1.authSetting["scope.address"]//将scope的获取地址的值获取过来。这里的值为布尔类型
          
          //2. 获取权限状态
          if(scopeAddress==false){
               //操作 3. 不授权的话：scope.address：false, 3.1：引导用户打开设置页面手动授权
               await openSetting()
          }

          //4. 调用收货地址的api，（api为微信内置的 chooseAddress）
          const res2 = await chooseAddress()
          // console.log(res2);

          //5. 存入缓存之中
          wx.setStorageSync("address", res2);
          
     } catch (error) {//错误函数
          console.log(error);
     }
    
     },


     // 商品选中事件，计算全选、总价、总数量
     itemChange(e){
          //1. 获取被修改的商品 id 
          const goods_id = e.currentTarget.dataset.id
          //2. 获取购物车数组
          let {cart} = this.data
          
          // 3. 找到被修改的商品对象 的 索引
          let index = cart.findIndex(v=>v.goods_id===goods_id)
          //4.按下按钮时，将状态取反
          cart[index].check = !cart[index].check
         
          this.setCart(cart)

     },



     //设置购物车的状态，封装总价格，总数量，全选与否的计算方法
     setCart(cart){
               
              

               //全选：计算全选
               //every()，数组方法，可以遍历，会接收一个回调函数，需要确保每个回调函数都返回true 的情况下 every() 才会返回 true.  这里是在cart数据下遍历
               // let allCheck = cart.length?cart.every(v=>v.check):false//有数据就是true,  true时eveny()就返回true，然后就能全选。否则就不全选
               let allCheck =true//有数据就是true,  true时eveny()就返回true，然后就能全选。否则就不全选

               //总价格，总数量
               let totalPrice = 0;
               let totalNum = 0;

               cart.forEach(v=>{
                    if(v.check){//如果是在选中状态下的话
                         totalPrice+=v.num*v.goods_price,
                         totalNum+= v.num
                    }else{
                         allCheck = false
                    }
               });

          allCheck = cart.length!=0?allCheck:false

           //5，6. 购物车数据重新设置回 缓存和data
           this.setData({
               cart,
               totalPrice,
               totalNum,
               allCheck
          })
          
          wx.setStorageSync("cart", cart);


     },


     //商品的全选功能
     itemAllcheck(){
          //1. 获取data中的数据
          let {cart,allCheck} = this.data
          //2. 修改值
          allCheck = !allCheck
          //3. 循环循环修改cart数组中的选中状态
          cart.forEach(v=>v.check = allCheck)
          //4. 把修改后的值 填充回data或者缓存之中
          this.setCart(cart)

     },


     async editNum(e){

          
          //1. 获取函数传递过来的数据
          const {edit,id} = e.currentTarget.dataset
          //2. 获取购物车数组
          let {cart} = this.data;
          //3. 找到需要修改的商品索引
          const index = cart.findIndex(v=>v.goods_id===id)

          //4. 开始修改数量

/* 
          //原生方法          
          if(cart[index].num===1&&edit===-1){
               wx.showModal({
                    title: '提示',
                    content: '你确定要删除该商品吗?',
                    success :(res)=> {
                    if (res.confirm) {
                         cart.splice(index,1)
                         this.setCart(cart)
                    } else if (res.cancel) {
                    console.log('用户点击取消')
                    }
                    }
               })
          }else{
               cart[index].num+=edit
          }

 */


          //经过封装之后的方法
          if(cart[index].num===1&&edit===-1){
               const res = await showModal({content:'你确定要删除该商品吗?'})

               if (res.confirm) {
                    cart.splice(index,1)
                    this.setCart(cart)
                 }

          }else{
               cart[index].num+=edit
          }

          


          //5. 设置回缓存和data中
          this.setCart(cart)

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
     总价格和总数量
          1. 都需要商品全选才能算价格数量
          2. 获取购物车数组
          3. 遍历
          4. 判断商品是否被选中
          5. 总价格 += 商品单价 + 商品数量
          6. 总数量 += 商品数量 
          7. 把计算后的商品价格和数量返回到 data之中
*/

/* 
     商品的选中功能：
          商品的复选框勾选只是改变本地缓存中的数据，并没有把data中的数据改变，所以按下取消选择，全选按钮还是会选中。所以再次需要改变本地缓存的同时也改变data
          1. 绑定 change 事件
          2. 获取到被修改的商品对象
          3. 商品对象选中状态 取反
          4. 重新把缓存和data数据改变
          5. 重新计算全选、总价、总数量，还有其他的。。。
*/

/* 
     全选和反选功能：
     1. 给全选复选框绑定数据
     2. 获取data中的  全选变量 allCheck
     3. 直接取反  allCheck = !allCheck
     4. 遍历购物车数组  让里面商品的 选中状态 跟随着 allCheck 的改变而改变
     5. 把购物车数组和 allCheck 重新设置回 data 中，把购物车重新设置回缓存中
*/


/* 
     商品数量的编辑
     //1. 给 + - 按钮绑定同一个点击事件。区别的关键在于自定义属性
     //2. 传递被点击的商品 id ，goods_id
     //3. 获取到data中的购物车数组
     //4. 直接修改商品对象的 num，
          当num为0时，询问用户是否删除商品(用弹窗提示)，取消则num为0，确定则删除商品
     //5. 把cart 数组重新设置回缓存中和data中，可以this.setCart完成
*/


/* 
     商品结算页面
     1.判断有没有收货地址
     2. 判断用户有没有选购商品
     3. 经过上面两个验证时，跳转支付页面
*/







})



