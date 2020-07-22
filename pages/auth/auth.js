import { request } from "../../request/index.js"
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"
import {login} from "../../utils/asyncWx.js"



Page({

     /**
      * 页面的初始数据
      */
     data: {
          
     },


     







     //获取用户信息,code,以及 token
     async getUserInfo(e){
          
          try {
                    //1. 获取用户信息
                    const { encryptedData,rawData,iv,signature} = e.detail
                    
                    //2. 获取小程序登陆后的 code,这个是返回的 code 值
                    const {code} = await login()
                    
                    const loginParams ={encryptedData,rawData,iv,signature,code}




                    // 注意：这里的token 需要企业id的权限支持，所以接下来的项目可能无法完成。



                    //3.发送请求，获取用户的tiken
                    // const  {token} = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin",data:loginParams,method:"post"})
                    const  {token} = {token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"}
                    console.log(token);
                    
                    

                    // 4. 把token存入到缓存数据中，同时跳转到上一个页面
                    wx.setStorageSync("token", token);
                    wx.navigateBack({
                         delta: 1
                    });
                    
               
          } catch (error) {
               console.log("err:------  "+error);
          }

     }




})