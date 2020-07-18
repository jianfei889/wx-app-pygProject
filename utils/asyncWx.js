
//promise 形式的 getSetting 
export const getSetting=()=>{
    return new Promise((res,reject)=>{
        wx.getSetting({
            success: (result)=>{
                res(result)
            },
            fail: (err)=>{
                reject(err)
            }
            
        });
    })
}



//promise 形式的 chooseAddress 
export const chooseAddress=()=>{
    return new Promise((res,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                res(result)
            },
            fail: (err)=>{
                reject(err)
            }
            
        });
    })

}


//promise 形式的 openSetting 
export const openSetting=()=>{
    return new Promise((res,reject)=>{
        wx.openSetting({
            success: (result)=>{
                res(result)
            },
            fail: (err)=>{
                reject(err)
            }
            
        });
    })

}



//promise 形式的 showModal 
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success :(result)=> {
                resolve(result)//成功的话就返回成功的结果
            },
            fail:(err)=>{
                reject(err)
            }
       })
    })

}


//promise 形式的 showToast 
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 1500,
            mask: true,
            success: (result)=>{
                 resolve("showToast封装方法："+result)
            },
            fail: (err)=>{
                reject(err)
            }
            
       });
    })

}

















