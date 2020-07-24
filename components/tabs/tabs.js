// components/tabs/tabs.js
Component({
     /**
      * 组件的属性列表
      */
     properties: {//子组件（tabs组件）接收父 组件在引用 时的参数。（tabs组件在被 父组件 使用时 需要 父组件 自己写好一个参数给 子组件 ）
          tabs:{
               //定义tabs是数组类型，数据是数组
               type:Array,
               value:[]
          }
     },

     
     
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
