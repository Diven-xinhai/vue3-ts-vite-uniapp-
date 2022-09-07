"use strict";
var common_vendor = require("../../common/vendor.js");
var api_douyin = require("../../api/douyin.js");
var utils_index = require("../../utils/index.js");
require("../../utils/request.js");
require("../../config/app.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const message = common_vendor.ref();
    const startParsing = () => {
      if (!message.value) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u9700\u8981\u89E3\u6790\u7684\u94FE\u63A5\uFF01",
          icon: "error",
          mask: true
        });
        return false;
      }
      api_douyin.getHrefInfo({
        url: utils_index.extractHttpFromString(message.value)
      }).then((res) => {
        if (res.code !== 200) {
          common_vendor.index.showToast({
            title: res.msg,
            mask: true,
            icon: "error"
          });
          return;
        }
        common_vendor.index.showToast({
          title: "\u89E3\u6790\u6210\u529F\uFF01",
          mask: true
        });
        console.log(res.data);
        common_vendor.index.navigateTo({
          url: `/pages/download/index?data=${encodeURIComponent(JSON.stringify(res.data))}`
        });
      });
    };
    const copyContent = () => {
      common_vendor.index.getClipboardData({
        success: function(res) {
          message.value = res.data;
        }
      });
    };
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: message.value,
        b: common_vendor.o(($event) => message.value = $event.detail.value),
        c: common_vendor.o(startParsing),
        d: common_vendor.o(copyContent)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c355884a"], ["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/douyin/index.vue"]]);
wx.createPage(MiniProgramPage);
