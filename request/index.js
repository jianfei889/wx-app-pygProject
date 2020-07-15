//同时发送异步代码的次数
let ajaxTimes = 0
export const request= (params)=>{

    ajaxTimes++

    wx.showLoading({
        title: '加载中',
        mask:true   //一层蒙版，出现蒙版时就会挡住用户的操作。
      })
      

    return new Promise((resolve,reject)=>{
          wx.request({
            ...params,//展开
            success:(result)=>{
                resolve(result)//返回数据
            },
            fail:(err)=>{
                reject(err)//失败则返回错误
            },

            complete:()=>{//不管成功失败都会调用
                ajaxTimes--
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
            }


        });
        
    })
}