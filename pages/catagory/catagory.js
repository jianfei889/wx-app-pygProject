import { request } from "../../request/index.js"
//这个文件只引用即可，不用使用的。具体待查
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"

// pages/catagory/catagory.js
Page({

     data: {
          leftMenuList:[],
          rightContent:[],
          //被点击的左侧菜单（active)
          currentIndex:0,
          //右侧距离顶部的位置
          scrollTop:0
     },

     cates:[],

      /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {

          //缓存技术--开始

               /* 
                    缓存技术：
                    1. 先判断本地存储有没有数据
                         {{time:Date.now,data:[...]}}
                    2. 没有旧数据  直接发送请求获取新数据
                    3. 有旧数据，判断旧数据有没有过期，没过期就使用本地存储的数据就行
               */
              
               //1. 获取本地存储的数据，(小程序也存在本地存储技术的)
               const cates = wx.getStorageSync("cates");

               //2. 判断
               if(!cates){
                    // 没有旧数据  直接发送请求获取新数据
                    this.getCates();
               }else{
                    //有旧数据  定义过期时间。在过期时间可以直接从本地获取数据
                    if(Date.now()-cates.time>1000*60){
                         this.getCates()//时间过期就发送请求
                    }else{
                         // 可以使用旧的数据
                         this.cates=cates.data

                         //拿到数据之后渲染左右两侧的数据

                         let leftMenuList = this.cates.map(v=>v.cat_name);//构造左侧的菜单数据
                         let rightContent = this.cates[0].children //构造右侧的商品数据
                         
                         this.setData({//设置左右两侧的数据
                              leftMenuList,
                              rightContent,
                              //重新设置右侧内容到顶部的距离
                         })


                    }
               }
          //缓存技术--完成





          // this.getCates()
     },


     //获取左侧和右侧菜单栏的内容,es6的promise方法
   /*   getCates(){
          request({
               url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
          })
          .then(res=>{
               // console.log(res); 
               this.cates=res.data.message

               //把接口数据存入到本地存储中
               wx.setStorageSync("cates", {time:Date.now(),data:this.cates});


               //构造左侧的菜单数据
               let leftMenuList = this.cates.map(v=>v.cat_name);
              
               //构造右侧的商品数据
               //这里的cates[0]表示获取第一个索引的数据
               let rightContent = this.cates[0].children

               //设置左右两侧的数据
               this.setData({
                    leftMenuList,
                    rightContent
               })

          })

     }, */


     //获取左侧和右侧菜单栏的内容，es7的async方法
     async getCates(){
         
          //1. 使用ES7 的async、await 来发送请求
          const  res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})

          this.cates=res.data.message

          //把接口数据存入到本地存储中
          wx.setStorageSync("cates", {time:Date.now(),data:this.cates});


          //构造左侧的菜单数据
          let leftMenuList = this.cates.map(v=>v.cat_name);
          
          //构造右侧的商品数据
          //这里的cates[0]表示获取第一个索引的数据
          let rightContent = this.cates[0].children

          //设置左右两侧的数据
          this.setData({
               leftMenuList,
               rightContent
          })


     },






     //左侧菜单栏的点击事件
     itemTap(e){
          // console.log(e);
          /* 
               任务：1. 获取被点击的标题身上的索引
                    2. 给data中的currentIndex赋值即可（赋值用于active）
                    3. 最后给 rightContent 的数据赋值即可。
          */
          let index = e.currentTarget.dataset.index//注意这里获取的是一个数值
          // let {index} = e.currentTarget.dataset//这里获取的是一个对象形式的数据。返回数据加上对象符号可以转化为数值形式的直接调用，否则index就是对象数据不能直接作为数字使用
          
          // console.log("index:"+index);
          

         
         //构造右侧的商品数据
         let rightContent = this.cates[index].children
     //     console.log(rightContent);
         
         this.setData({
              currentIndex:index,
              rightContent,
              scrollTop:0
         }) 
          
     },


  


})