"use strict";
var common_vendor = require("../common/vendor.js");
var config_app = require("../config/app.js");
function baseRequest(url, method, data, { noAuth = false, noVerify = false, isLoading = true, loadingMsg = "\u6B63\u5728\u52A0\u8F7D\u4E2D..." }, params) {
  const Url = config_app.HTTP_REQUEST_URL;
  let header = JSON.parse(JSON.stringify(config_app.HEADER));
  if (params != void 0) {
    header = config_app.HEADERPARAMS;
  }
  return new Promise((reslove, reject) => {
    if (isLoading) {
      common_vendor.index.showLoading({
        title: loadingMsg,
        mask: true
      });
    }
    common_vendor.index.request({
      url: Url + url,
      method: method || "GET",
      header,
      data: data || {},
      success: (res) => {
        console.log("res", res);
        common_vendor.index.hideLoading();
        if (noVerify) {
          reslove(res);
        } else if (res.statusCode === 200) {
          reslove(res.data);
        } else {
          reject(res.data.message || "\u7CFB\u7EDF\u9519\u8BEF");
        }
      },
      fail: (msg) => {
        common_vendor.index.hideLoading();
        reject("\u8BF7\u6C42\u5931\u8D25");
      }
    });
  });
}
const requestOptions = [
  "options",
  "get",
  "post",
  "put",
  "head",
  "delete",
  "trace",
  "connect"
];
const request = {};
requestOptions.forEach((method) => {
  const m = method.toUpperCase;
  request[method] = (api, data, opt, params) => baseRequest(api, m, data, opt || {}, params);
});
exports.request = request;
