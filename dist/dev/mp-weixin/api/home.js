"use strict";
var utils_request = require("../utils/request.js");
function getGoodsList() {
  var _a, _b;
  return (_b = (_a = utils_request.request) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, "/tabList", {}, { noAuth: true });
}
exports.getGoodsList = getGoodsList;
