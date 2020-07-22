// pages/user/user.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          userinfo:{}
     },

     onShow(){
          const userInfo = wx.getStorageSync("userinfo");
          this.setData({
               userinfo:userInfo
          })
     }

    
})

