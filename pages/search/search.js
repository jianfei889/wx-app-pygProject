import { request } from "../../request/index.js"
//这个文件只引用即可，不用使用的。具体待查
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"

Page({

     /**
      * 页面的初始数据
      */
     data: {
          //商品列表的数组
          goods:[],
          // 取消按钮是否显示
          isBtn:true,
          //输入框的值
          inputValue:""

     },

     timeId:0,

     /* 
          搜索商品：
               1. 输入框绑定，值改变事件 input事件
                    1. 获取到输入框的值
                    2. 做一个合法性的值判断，对空格之类的过滤
                    3.通过的话就把输入框的值 发送到后台
                    4. 返回的数据  打印到页面上
               2
          防抖：
               防止抖动，（用定时器实现）
               // 1.定义一个全局的定时器id

          防抖  一般用于输入框  防止重复输入 重复发送请求
          节流  一般用于页面的上拉下拉等等  做下拉应用节流的效果

     */


     //输入框的值改变的话就会触发的事件.这里的是一改变文字就会触发的事件
    searchInput(e){
          // e.detail.value,当前的输入框的值，
          // e.detail.cursor,当前新增的值

          // 1. 获取输入框的值
          const {value} = e.detail
          // 2. 做一个合法性的值判断，对空格之类的过滤
          if(!value.trim()){
               this.setData({
                    goods:[],
                    isBtn:true//输入框为空的话，按钮为true。按钮是否隐藏：是的
               })
               //空字符串的话就不合法，所以return掉
               return
          }

          this.setData({
                    goods:[],
                    isBtn:false//输入框有长度时，按钮为false。按钮是否隐藏：否。（输入框有内容时就不隐藏了）
               })


          //防抖

          clearTimeout(this.timeId)//清除定时器(没有定时器的花执行也不会有影响的)
          this.timeId = setTimeout(()=>{
               this.qsearch(value)
          },1500)


       
     },
     

     //搜索的请求参数，用于其他函数在调用本身时用于返回数据
     async qsearch(query){//这里需要传入一个参数，参数是输入框的值，在应用函数时传参
          const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:{query}})
          // console.log(res);
          const goods = res.data.message.goods
          

          this.setData({
               goods
          })
          
     },

     //点击取消按钮内容
     cancel(e){
          this.setData({
               inputValue:"",
               isBtn:true,
               goods:[]
          })
          
     },



     
})