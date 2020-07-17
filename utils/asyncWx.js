
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