"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_download = require("../../hooks/download.js");
var config_app = require("../../config/app.js");
var common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const datas = common_vendor.ref({
      cover: "",
      title: "",
      videoUrl: "",
      videoName: "",
      relativePath: "",
      images: []
    });
    let downloadTitle = common_vendor.ref("");
    const tab = common_vendor.ref([
      { label: "\u56FE\u96C6", id: 0, downloadTitle: "\u4FDD\u5B58\u9009\u4E2D\u7684\u56FE\u7247" },
      { label: "\u89C6\u9891", id: 1, downloadTitle: "\u4FDD\u5B58\u89C6\u9891\u5230\u76F8\u518C" },
      { label: "\u5C01\u9762", id: 2, downloadTitle: "\u4FDD\u5B58\u5C01\u9762\u5230\u76F8\u518C" },
      { label: "\u6587\u6848", id: 3, downloadTitle: "" }
    ]);
    const active = common_vendor.ref(0);
    const clickTab = (id, i) => {
      active.value = id;
      downloadTitle.value = tab.value[i].downloadTitle;
    };
    const checkboxChange = (e, i) => {
      datas.value.images[i].isCheck = !datas.value.images[i].isCheck;
    };
    const copyContent = () => {
      common_vendor.index.setClipboardData({
        data: datas.value.title,
        success: function() {
          common_vendor.index.showToast({
            title: `\u590D\u5236\u6210\u529F\uFF01`,
            mask: true
          });
        }
      });
    };
    const download = async () => {
      common_vendor.index.authorize({
        scope: "scope.writePhotosAlbum",
        success() {
          common_vendor.index.showLoading({
            title: "\u4FDD\u5B58\u4E2D...",
            mask: true
          });
          if (active.value == 0) {
            if (!datas.value.images.length) {
              common_vendor.index.showToast({
                title: "\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u56FE\u7247\uFF01",
                icon: "error",
                mask: true
              });
            }
            let arr = datas.value.images.map((item) => {
              if (!item.isCheck) {
                return;
              } else {
                return hooks_download.downloadImage(item.url);
              }
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
                icon: "error",
                mask: true
              });
            });
          } else if (active.value == 1) {
            if (!datas.value.videoUrl) {
              common_vendor.index.showToast({
                title: "\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u89C6\u9891\uFF01",
                icon: "error",
                mask: true
              });
            }
            hooks_download.downloadVideo(`${config_app.PCULIC_URL}${datas.value.relativePath}`).then((res) => {
              common_vendor.index.showToast({
                title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
                mask: true
              });
            }).catch((err) => {
              console.log(err);
              common_vendor.index.showToast({
                title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
                icon: "error",
                mask: true
              });
            });
          } else if (active.value == 2) {
            if (!datas.value.cover) {
              common_vendor.index.showToast({
                title: "\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u5C01\u9762\uFF01",
                icon: "error",
                mask: true
              });
            }
            hooks_download.downloadImage(datas.value.cover).then((res) => {
              common_vendor.index.showToast({
                title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
                mask: true
              });
            }).catch((err) => {
              common_vendor.index.showToast({
                title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
                icon: "error",
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
    };
    common_vendor.onLoad((option) => {
      console.log(option.data);
      const data = JSON.parse(decodeURIComponent(option.data));
      data.images.forEach((item) => {
        item.isCheck = true;
        item.disabled = false;
      });
      datas.value = data;
      active.value = datas.value.videoUrl ? 1 : 0;
      downloadTitle.value = tab.value.filter((item) => item.id == active.value)[0].downloadTitle;
    });
    const imageError = (e, i) => {
      console.log(e);
      datas.value.images[i].url = common_assets.loadFile;
      datas.value.images[i].isCheck = false;
      datas.value.images[i].disabled = true;
      console.error("image\u53D1\u751Ferror\u4E8B\u4EF6\uFF0C\u643A\u5E26\u503C\u4E3A" + e.detail.errMsg);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: active.value != 3
      }, active.value != 3 ? {
        b: common_vendor.t(common_vendor.unref(downloadTitle)),
        c: common_vendor.o(download)
      } : {}, {
        d: common_vendor.f(tab.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.n(item.id == active.value ? "item-active" : ""),
            c: i,
            d: common_vendor.o(($event) => clickTab(item.id, i), i)
          };
        }),
        e: active.value == 0
      }, active.value == 0 ? common_vendor.e({
        f: datas.value.images.length
      }, datas.value.images.length ? {
        g: common_vendor.f(datas.value.images, (item, i, i0) => {
          return {
            a: item.isCheck,
            b: item.disabled,
            c: common_vendor.o(($event) => imageError($event, i)),
            d: item.url,
            e: common_vendor.o(($event) => checkboxChange($event, i)),
            f: i
          };
        })
      } : {}) : {}, {
        h: active.value == 1
      }, active.value == 1 ? common_vendor.e({
        i: datas.value.videoUrl
      }, datas.value.videoUrl ? {
        j: `http://${datas.value.videoUrl}`
      } : {}) : {}, {
        k: active.value == 2
      }, active.value == 2 ? {
        l: datas.value.cover
      } : {}, {
        m: active.value == 3
      }, active.value == 3 ? {
        n: common_vendor.t(datas.value.title),
        o: common_vendor.o(copyContent)
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b0b168f"], ["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/download/index.vue"]]);
wx.createPage(MiniProgramPage);
