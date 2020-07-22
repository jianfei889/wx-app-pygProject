// components/tabs/tabs.js
Component({
     /**
      * 组件的属性列表
      */
     properties: {//子组件（tabs组件）接收父组件在引用时的参数。（tabs组件在被 -- 显示组件 -- 使用时需要tabs组件自己写好一个参数给   --父组件--）
          tabs:{
               type:Array,
               value:[]
          }
     },

     /**
      * 组件的初始数据
      */
     data: {

     },



     /**
      * 组件的方法列表
      */
     methods: {
          //点击事件，商品列表的顶部导航栏
          itemtap(e){
               // console.log(e);
               //1. 获取被点击的索引
               const index = e.currentTarget.dataset.index
               // 2. 触发父组件中的事件
               this.triggerEvent("tabsItemChange",{index})
               
          }
     }
})
