// pages/login/login.js
Page({

     /**
      * 页面的初始数据
      */
     data: {

     },

     getUserInfo(e){
          console.log(e);
          
          const {userInfo} = e.detail//这里注意变量的名称，如果是userinfo会无效的。
          
          wx.setStorageSync("userinfo", userInfo);//

          wx.navigateBack({
               delta: 1
          });
          
     }

     
})