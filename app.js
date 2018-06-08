//app.js
//前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
import { login } from '/utils/api.js'
// 测试环境接口地址
const devPath = 'https://testerp.yktour.com.cn/sst';
// 正式环境接口地址
const proPath = 'https://bpm.yktour.com.cn/sst/';
//开启测试环境接口
const basePath = devPath;
App({
  //全局数据
  globalData: {
    userInfo: null
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    //唤起登录
    if (!wx.getStorageSync('token')){
      this.getUser();
    }
  },
  //登录
  getUser: function(){
    let self = this;
    wx.login({
      success: res => {
        console.log(res);
        if(res.code){
          // 通过返回的code发起请求，传给后端
          login(basePath,res).then(res => {
            //保存token
            // console.log(res);
            if (res.success){
              // wx.setStorageSync('token', res.data.token);
              console.log(" ========== 请求登录成功 ========== ");
              console.log(self.globalData);
              if (!self.globalData.userInfo) {
                self.getUserInfo();
              }
            }else{
              self.showErrorModal("未获取用户信息");
              console.log(self.globalData);
            }
          }).catch(function (e) {
            console.log(e);
            self.showErrorModal("服务器请求超时");
          });
        }
      }
    })
  },
  // 获取用户信息
  getUserInfo: function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              //如果定义了，则说明page.onload比当前方法运行的早（page已经完成初始化），app的globalData还没有数据，通过此回调可以及时的刷新数据
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '温馨提示',
      content: content || '未知错误',
      showCancel: false
    });
  },
})