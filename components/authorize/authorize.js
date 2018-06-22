// components/authorize.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isAuthorize: function() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            this.setData({
              hasUserInfo: false
            })
          }
        }
      });
    },

    getUserInfo: function (e) {
      console.log(e);
      // console.log(app);
      if (e.detail.userInfo) {
        app.getUser();
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          hasUserInfo: true
        })
      }
      // detail对象，提供给事件监听函数
      let myGetUserInfo = {
        userInfo: e.detail.userInfo
      }
      this.triggerEvent("bindGetUserInfo", myGetUserInfo);
    }
  }
})
