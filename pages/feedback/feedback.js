/* 
     1. 点击“+” 触发tap点击事件
          1. 调用小程序内置的选择图片的 api
          2. 选择成功之后，获取到图片的路径，获取的是数组形式
          3. 把图片路径存入到data的变量中
          4. 页面就可以根据图片数组 进行循环显示
     2. 点击删除图片
          1. 获取被点击的元素的索引
          2. 获取 data 中的图片的数组
          3. 根据索引 在数组中删除对应的元素
          4. 把数组重新设置回data中
     3. 点击提交按钮时，
          1. 获取文本域的内容
               1.前提条件： 事先在data中定义变量，类似 输入框的获取
               2.前提条件： 文本域绑定 输入事件 事件触发的时候，把输入框的值存入到变量中
          2. 对这些内容进行合法性的验证
          3. 验证通过，将用户选择的图片上传到专门的图片的服务器中
               1. 遍历图片数组
               2. 挨个上传文件
               3. 自己再维护图片数组  存放 图片上传后的外网链接
          4. 文本域 和 外网的图片的路径 一起提交到后台服务器中，（这一步1只是前端模拟制作，不会发送到后台）
          5. 提交到后台服务器后，情况反馈页面的内容
          6. 返回上一页
*/

Page({


     // components 里面的就是子组件， 也就是你自定义的div 模块，子组件就是模板。
     // 子传父数据用emit
     // 父传子数据用props 


     
     data: {

          tabs:[
               {
                    id:0,
                    value:"体验问题",
                    isActive:true
               },
               
               {
                    id:1,
                    value:"商品、商家投诉",
                    isActive:false
               }

          ],

          chooseImgs:[],//选中图片的数组
          //文本域的内容
          textVal:""

     },

     //外网图片的路径数组
     uploadFiles:[],

     
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


     // 选择图片事件，+ 号的点击事件
     chooseImg(){
          //调用小程序内置的选择图片的 api
          //在开发者工具中是直接打开磁盘，真机测试中是先选择相机或者相册
          wx.chooseImage({
               count: 9,//张数
               sizeType: ['original', 'compressed'],//图片尺寸，压缩或者原图
               sourceType: ['album', 'camera'],//图片来源，相机或者相册
               success: (result) => {
                    const chooseImgs = result.tempFilePaths

                    this.setData({
                         // chooseImgs:[...this.data.chooseImage,...result.tempFilePaths]//新旧数组拼接在一起
                         chooseImgs:[...this.data.chooseImgs,...chooseImgs]//第一个是旧数据，第二个是新数据，将两个拼接起来
                    })
                    
               }

          });

     },

     // 点击删除图片
     removeImg(e){
          // 1. 获取被点击的元素的索引
          const {index} = e.currentTarget.dataset
          //  2. 获取 data 中的图片的数组
          let {chooseImgs} = this.data
          //3. 根据索引 在数组中删除对应的元素
          chooseImgs.splice(index,1)//参数一是要开始删除的 索引，参2是删除的数量
          this.setData({
               chooseImgs
          })
          
     },

     //文本域的 bindinput 输入框事件，用来获取文本域的输入内容
     textInput(e){
          this.setData({
               textVal:e.detail.value
          })
     },


     //提交按钮的点击事件
     formSubmit(){
          //1. 获取文本域的内容
          const {textVal,chooseImgs} = this.data
          
          console.log("这里是上传图片成功的回调函数。因为图床url原因，所以图片上传待做。");

          //2. 合法性的验证

          //   textVal.trim()时无法显示。但是  !textVal.trim() 返回的是 true
          if(!textVal.trim()===true){
               //不合法的输入内容（内容为空）
               
               wx.showToast({
                    title: '输入不合法',
                    icon: 'none',
                    mask: true
               });
               
               return
          }


          wx.showLoading({
               title:"正在上传中" ,
               mask: true,
          });
            


          //判断有没有需要上次图片的需要
          if(chooseImgs.length!=0){
               
               //3. 验s证通过，将用户选择的图片上传到专门的图片的服务器中
               //上传文件不支持多个文件同时上传。处理方法为 遍历数组，挨个上传
               chooseImgs.forEach((v,i)=>{
                    wx.uploadFile({
                         //将图片上传到哪里的路径
                         url: 'http://images.ac.cn/api/upload',       //这里的url路径是图床的服务端路径。因为没有可用的路径，所以先用土豆图床代替。但是这个是不成功的。
                         filePath: v,    //被上传的文件的路径
                         name: 'wx-app-file',         //上传文件的名称，用来返回给后台获取，
                         formData: {},   //上传文件附带的文本信息，
                         success: (result) => {
                              console.log("这里是上传图片成功的回调函数。因为图床url原因，所以上传待做。");
                              let url = JSON.parse(result.data).url
                              this.uploadFiles.push(url)

                              //这里的上传图片是等待所有的图片都上传完成才会触发的
                              if(i===chooseImgs.length-1){//当遍历的索引是最后一个才会触发
                                   
                                   wx.hideLoading();//完成时关闭提示
                                   
                                   //完成之后情况文本域数据
                                   this.setData({
                                        textVal:"",
                                        chooseImgs:[]
                                   })
                              }

                              //上传完成最后就返回是一个页面
                              wx.navigateBack({
                                   delta: 1
                              });
                              
                         }
                    });
               
                    
                      
                    
               })

          }else{
               wx.hideLoading();
               console.log("这里显示只提交文本，没有提交图片。");
               wx.navigateBack({
                    delta: 1
               });
                 
          }
          

     }




 
})