"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const tabList = common_vendor.ref([{ value: 0, label: "\u6296\u97F3\u53BB\u6C34\u5370", path: "/pages/douyin/index" }]);
    const goPath = (item) => {
      common_vendor.index.navigateTo({
        url: item.path
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabList.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: i,
            c: common_vendor.o(($event) => goPath(item), i)
          };
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1badc801"], ["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
