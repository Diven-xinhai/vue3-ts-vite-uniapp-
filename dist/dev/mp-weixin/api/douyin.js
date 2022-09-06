"use strict";
var utils_request = require("../utils/request.js");
function getHrefInfo(data) {
  var _a, _b;
  return (_b = (_a = utils_request.request).get) == null ? void 0 : _b.call(_a, "/removeWm", { url: data.url }, { noAuth: true, loadingMsg: "\u6B63\u5728\u89E3\u6790\u4E2D..." });
}
exports.getHrefInfo = getHrefInfo;
