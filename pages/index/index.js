//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  
  onLoad: function () {
    // wx.getSetting({
    //   success: res => {
    //     if (!res.authSetting['scope.userInfo']) {
    //       this.setData({
    //         hasUserInfo: false
    //       })
    //     }
    //   }
    // });

    // 判断有无授权
    this.authorize = this.selectComponent("#authorize");
    this.authorize.isAuthorize();


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      console.log("1");
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
      console.log("2");
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },

  //事件处理函数
  bindGetUserInfo: function(e) {
    let self = this;
    console.log(e);
    // console.log(app);
    if (e.detail.userInfo){
      self.setData({
        userInfo: e.detail.userInfo
      })
    }
    
  }
})
