# 微信小程序项目练习 代码注释 过程记录   练习笔记


## 待解决
    1. index的楼层的图片样式中，这里的vm失效， height: (386/232)*33vm;
        所以换成了：height: 208rpx;  也就是第一张图的高度换成后四张图的rpx高度.
        后期解决下，vm为什么不行的。



### 重点难点理解
    1. ```let index = e.currentTarget.dataset.index```//注意这里获取的是一个数值
        ```let {index} = e.currentTarget.dataset```//这里获取的是一个对象形式的数据。返回数据加上对象符号可以转化为数值形式的直接调用，否则index就是对象数据不能直接作为数字使用
    ```let rightContent = this.cates[index].children```  这里是运用“index”索引获取的数据，注意用到的index的类型







