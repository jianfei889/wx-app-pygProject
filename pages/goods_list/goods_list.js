import { request } from "../../request/index.js"
//这个文件只引用即可，不用使用的。具体待查
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"


// pages/goods_list/goods_list.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          tabs:[
               {
                    id:0,
                    value:"综合",
                    isActive:true
               },
               
               {
                    id:1,
                    value:"销量",
                    isActive:false
               },
               {
                    id:2,
                    value:"价格",
                    isActive:false
               },

          ],
          goodsList:[]
     
     },

     //接口要的参数,
     queryParams:{
          query:"",
          cid:"",
          pagenum:1,
          pagesize:10//注意大小写要跟接口文档的一致。这里的是显示的数据条数
     },

     //总页数
     totalPages:1,

     //标题(导航栏)的自定义事件
     tabsItemChange(e){
          // console.log(e);
          //1.获取被点击的标题的  索引
          const index = e.detail.index
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


     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          // console.log(options);
          this.queryParams.cid = options.cid;//这里是赋值的意思

          this.getGoodsList()
          
     },


     //获取商品的列表。这里的res就是从接口获取过来的数据。
     async getGoodsList(){
          const res = await request({
               url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
               data:this.queryParams//链接要传递的参数
          })
          // console.log(res.data.message);
          const total = res.data.message.total
          //计算总页数
          this.totalPages = Math.ceil(total/this.queryParams.pagesize)
          

          this.setData({
               // goodsList:res.data.message.goods
               goodsList:[//拼接数组
                    ...this.data.goodsList,...res.data.message.goods
               ]
          })
          //关闭下拉刷新的窗口
          wx.stopPullDownRefresh()//如果没有调用下拉刷新函数就启用下拉停止函数  是有效的，不影响页面的。
          
     },

     

     /* 
          用户上滑事件操作：
          1. 找到滚动条的触底事件（平台查找）
          2. 判断有没有下一页的数据
               1. 获取到总页数
                    总页数 = Math.ceil(总条数 / 页容量 )//注意这里的天花板函数。（向上取整，假如 2.2，则取值为 3 ）
                    总页数 = Math.ceil( 57445 / 10  )
                         


               2. 获取到当前页码
               3. 判断当前页面是否大于或者小于、等于总页数（用来判断是否有下一页数据）
          3.如果没有下一页就弹出提示     
          4. 有下一页就加载下一页数据,加载下一页时把原有数据跟下一页的数据拼接一起
     */          
    /* 
     触发下拉刷新列表：
          1. 触发下拉刷新事件  enablePullDownRefresh ，需要在页面的json文件中开启一个配置项
               找到下拉刷新事件，在里面添加逻辑
          2. 
    */

     //页面上滑 滚动条触底事件,----事件从微信开放平台查找
     onReachBottom(){
          // console.log('页面触底');
          //1. 判断有没有下一页数据
          
          if(this.queryParams.pagenum>=this.totalPages){
               // 没有下一页数据
               // console.log('%c'+"没有下一页数据","font-size:30px;");
               wx.showToast({title: '没有下一页数据了。'});
          }else{
               // console.log('%c'+"有下一页数据","font-size:30px;");
               this.queryParams.pagenum++;
               this.getGoodsList();
          }
          
     },

    onPullDownRefresh(){
         //1. 重置数组
         this.setData({
              goodsList:[]
         })
         //2. 重置页码为第一页
         this.queryParams.pagenum=1
         //3. 重新发送请求
         this.getGoodsList()
          //4. 数据请求回来之后就关闭正在刷新的动画，否则体验不好
          // 这里在请求处关闭.( wx.stopPullDownRefresh() ) 。在函数方法中使用
    }

})