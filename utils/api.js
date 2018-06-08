const apiServer = require('./server.js');
export const login = function (path, opts) {
  console.log("login");
  return apiServer(path + "/api/wechat/login", {
    code: opts.code
  })
};
export const test = function (path, opts) {
  return "ceshi"
};