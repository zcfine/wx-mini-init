/**
 * 抓取远端API的结构
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */

module.exports = function (path, params) {
  wx.showLoading({
    title: '加载中',
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${path}`,
      data: Object.assign({
        token: wx.getStorageSync('token')
      }, params),
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(" ========== 成功 ==========");
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function (res) {
        console.log(" ========== 失败 ==========");
        wx.hideLoading();
        reject(res.data);
      }
    })
  })
}
