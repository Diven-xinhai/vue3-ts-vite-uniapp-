"use strict";
var common_vendor = require("../../common/vendor.js");
var api_douyin = require("../../api/douyin.js");
var utils_index = require("../../utils/index.js");
var hooks_download = require("../../hooks/download.js");
var config_app = require("../../config/app.js");
require("../../utils/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const datas = common_vendor.ref({
      cover: "",
      videoUrl: "",
      videoUrlInit: "",
      videoName: "",
      relativePath: "",
      images: []
    });
    const message = common_vendor.ref();
    const startParsing = () => {
      if (!message.value) {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u9700\u8981\u89E3\u6790\u7684\u94FE\u63A5\uFF01",
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
            mask: true
          });
          return;
        }
        datas.value = res.data;
        common_vendor.index.showToast({
          title: "\u89E3\u6790\u6210\u529F\uFF01",
          mask: true
        });
      });
    };
    const downlod = async () => {
      if (datas.value) {
        common_vendor.index.authorize({
          scope: "scope.writePhotosAlbum",
          success() {
            common_vendor.index.showLoading({
              title: "\u4FDD\u5B58\u4E2D...",
              mask: true
            });
            if (datas.value.images.length) {
              let arr = datas.value.images.map((item) => {
                return hooks_download.downloadImage(item);
              });
              const res = Promise.all(arr);
              res.then((r) => {
                common_vendor.index.showToast({
                  title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
                  mask: true
                });
              }).catch((err) => {
                common_vendor.index.showToast({
                  title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
                  mask: true
                });
              });
            } else {
              hooks_download.downloadVideo(`${config_app.PCULIC_URL}${datas.value.relativePath}`).then((res) => {
                common_vendor.index.showToast({
                  title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
                  mask: true
                });
              }).catch((err) => {
                console.log(err);
                common_vendor.index.showToast({
                  title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
                  mask: true
                });
              });
            }
          },
          fail() {
            common_vendor.index.showModal({
              title: "\u60A8\u9700\u8981\u6388\u6743\u76F8\u518C\u6743\u9650",
              success(res) {
                if (res.confirm) {
                  common_vendor.index.openSetting({
                    success(res2) {
                    },
                    fail(res2) {
                    }
                  });
                }
              }
            });
          }
        });
      }
    };
    const imageError = (e) => {
      console.error("image\u53D1\u751Ferror\u4E8B\u4EF6\uFF0C\u643A\u5E26\u503C\u4E3A" + e.detail.errMsg);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: message.value,
        b: common_vendor.o(($event) => message.value = $event.detail.value),
        c: common_vendor.o(startParsing),
        d: common_vendor.o(downlod),
        e: datas.value.videoUrl
      }, datas.value.videoUrl ? {
        f: `http://${datas.value.videoUrl}`
      } : {
        g: common_vendor.f(datas.value.images, (item, i, i0) => {
          return {
            a: common_vendor.o(imageError, i),
            b: i,
            c: item
          };
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/douyin/index.vue"]]);
wx.createPage(MiniProgramPage);
