import { request } from "../../request/index.js"
//这个文件只引用即可，不用使用的。具体待查
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"


Page({

     /**
      * 页面的初始数据
      */
     data: {

          tabs:[
               {
                    id:0,
                    value:"全部订单",
                    isActive:true
               },
               
               {
                    id:1,
                    value:"待付款",
                    isActive:false
               },
               {
                    id:2,
                    value:"代发货",
                    isActive:false
               },
               {
                    id:3,
                    value:"退货/退款",
                    isActive:false
               },

          ],

     },







          // 这里又用到token了，再次等待机会













     onShow(options){//页面参数无法打印
          // 获取小程序的页面栈--数组  长度最大为10，
          let curPages =  getCurrentPages();
          
          let currentPage = curPages[curPages.length-1].options
          let type = currentPage.type
          // console.log(type);//页面参数

          this.titleByIndex(type-1)


          this.getOrders(type)
          
          
     },



     //获取订单列表的方法,请求体(url路径的data传参)为type.
     async getOrders(type){
          const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all",data:{type}})
          // console.log(res);
          
     },


     
     onLoad(options){//可以打印出页面参数
          // console.log(options);
     },
     
     

     titleByIndex(index){
          //2. 修改源数组
          let {tabs} = this.data
          tabs.forEach(
               (v,i)=>{
               i===index?v.isActive=true:v.isActive=false
          })
          //3. 赋值到data中
          this.setData({
               tabs
          })

     },



      //标题(导航栏)的自定义事件
      tabsItemChange(e){
          // console.log(e);
          //1.获取被点击的标题的  索引
          const index = e.detail.index
          
          this.titleByIndex(index)

          //2. 重新发送请求 type,
          this.getOrders(index+1)
          
     },




    
})