if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const tabList = vue.ref([{ value: 0, label: "\u6296\u97F3\u53BB\u6C34\u5370", path: "/pages/douyin/index" }]);
      const goPath = (item) => {
        uni.navigateTo({
          url: item.path
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "index" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabList.value, (item, i) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "tab-list",
              key: i,
              onClick: ($event) => goPath(item)
            }, vue.toDisplayString(item.label), 9, ["onClick"]);
          }), 128))
        ]);
      };
    }
  });
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1badc801"], ["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/index/index.vue"]]);
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const PCULIC_URL = "http://192.168.2.120:3001";
  const HTTP_REQUEST_URL = "http://192.168.2.120:3001/api";
  const HEADER = {
    "content-type": "application/json"
  };
  const HEADERPARAMS = {
    "content-type": "application/x-www-form-urlencoded"
  };
  function baseRequest(url, method, data, { noAuth = false, noVerify = false, isLoading = true, loadingMsg = "\u6B63\u5728\u52A0\u8F7D\u4E2D..." }, params) {
    const Url = HTTP_REQUEST_URL;
    let header = JSON.parse(JSON.stringify(HEADER));
    if (params != void 0) {
      header = HEADERPARAMS;
    }
    return new Promise((reslove, reject) => {
      if (isLoading) {
        uni.showLoading({
          title: loadingMsg,
          mask: true
        });
      }
      uni.request({
        url: Url + url,
        method: method || "GET",
        header,
        data: data || {},
        success: (res) => {
          formatAppLog("log", "at utils/request.ts:52", "res", res);
          uni.hideLoading();
          if (noVerify) {
            reslove(res);
          } else if (res.statusCode === 200) {
            reslove(res.data);
          } else {
            reject(res.data.message || "\u7CFB\u7EDF\u9519\u8BEF");
          }
        },
        fail: (msg) => {
          uni.hideLoading();
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
  function getHrefInfo(data) {
    var _a;
    return (_a = request.get) == null ? void 0 : _a.call(request, "/removeWm", { url: data.url }, { noAuth: true, loadingMsg: "\u6B63\u5728\u89E3\u6790\u4E2D..." });
  }
  const extractHttpFromString = (str) => {
    const reg = /http[s]?:\/\/\S+/;
    return str.match(reg);
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const message = vue.ref();
      const startParsing = () => {
        if (!message.value) {
          uni.showToast({
            title: "\u8BF7\u8F93\u5165\u9700\u8981\u89E3\u6790\u7684\u94FE\u63A5\uFF01",
            icon: "error",
            mask: true
          });
          return false;
        }
        getHrefInfo({
          url: extractHttpFromString(message.value)
        }).then((res) => {
          if (res.code !== 200) {
            uni.showToast({
              title: res.msg,
              mask: true,
              icon: "error"
            });
            return;
          }
          uni.showToast({
            title: "\u89E3\u6790\u6210\u529F\uFF01",
            mask: true
          });
          formatAppLog("log", "at pages/douyin/index.vue:48", res.data);
          uni.navigateTo({
            url: `/pages/download/index?data=${encodeURIComponent(JSON.stringify(res.data))}`
          });
        });
      };
      const copyContent = () => {
        uni.getClipboardData({
          success: function(res) {
            message.value = res.data;
          }
        });
      };
      onShow(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", { class: "water-mater" }, [
          vue.createElementVNode("view", { class: "title" }, "\u8BF7\u8F93\u5165\u94FE\u63A5\u5730\u5740\uFF1A"),
          vue.withDirectives(vue.createElementVNode("textarea", {
            class: "msg",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => message.value = $event),
            placeholder: "\u8BF7\u8F93\u5165\u94FE\u63A5"
          }, null, 512), [
            [vue.vModelText, message.value]
          ]),
          vue.createElementVNode("view", { class: "btn-box" }, [
            vue.createElementVNode("button", {
              class: "btn-primary",
              type: "primary",
              onClick: startParsing
            }, "\u5F00\u59CB\u89E3\u6790"),
            vue.createElementVNode("button", {
              class: "btn-primary color-fff",
              type: "primary",
              onClick: copyContent
            }, "\u7C98\u8D34\u5185\u5BB9")
          ])
        ]);
      };
    }
  });
  var PagesDouyinIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c355884a"], ["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/douyin/index.vue"]]);
  function downloadImage(url) {
    return new Promise((reslove, reject) => {
      uni.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                reslove(res);
              }
            });
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
  function downloadVideo(url) {
    return new Promise((reslove, reject) => {
      uni.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                reslove(res);
              }
            });
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
  var loadFile = "/static/load-file.png";
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const datas = vue.ref({
        cover: "",
        title: "",
        videoUrl: "",
        videoName: "",
        relativePath: "",
        images: []
      });
      let downloadTitle = vue.ref("");
      const tab = vue.ref([
        { label: "\u56FE\u96C6", id: 0, downloadTitle: "\u4FDD\u5B58\u9009\u4E2D\u7684\u56FE\u7247" },
        { label: "\u89C6\u9891", id: 1, downloadTitle: "\u4FDD\u5B58\u89C6\u9891\u5230\u76F8\u518C" },
        { label: "\u5C01\u9762", id: 2, downloadTitle: "\u4FDD\u5B58\u5C01\u9762\u5230\u76F8\u518C" },
        { label: "\u6587\u6848", id: 3, downloadTitle: "" }
      ]);
      const active = vue.ref(0);
      const clickTab = (id, i) => {
        active.value = id;
        downloadTitle.value = tab.value[i].downloadTitle;
      };
      const checkboxChange = (e, i) => {
        datas.value.images[i].isCheck = !datas.value.images[i].isCheck;
      };
      const copyContent = () => {
        uni.setClipboardData({
          data: datas.value.title,
          success: function() {
            uni.showToast({
              title: `\u590D\u5236\u6210\u529F\uFF01`,
              mask: true
            });
          }
        });
      };
      const download = async () => {
        uni.showLoading({
          title: "\u4FDD\u5B58\u4E2D...",
          mask: true
        });
        if (active.value == 0) {
          if (!datas.value.images.length) {
            uni.showToast({
              title: "\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u56FE\u7247\uFF01",
              icon: "error",
              mask: true
            });
          }
          let arr = datas.value.images.map((item) => {
            if (!item.isCheck) {
              return;
            } else {
              return downloadImage(item.url);
            }
          });
          const res = Promise.all(arr);
          res.then((r) => {
            uni.showToast({
              title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
              mask: true
            });
          }).catch((err) => {
            uni.showToast({
              title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
              icon: "error",
              mask: true
            });
          });
        } else if (active.value == 1) {
          if (!datas.value.videoUrl) {
            uni.showToast({
              title: "\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u89C6\u9891\uFF01",
              icon: "error",
              mask: true
            });
          }
          downloadVideo(`${PCULIC_URL}${datas.value.relativePath}`).then((res) => {
            uni.showToast({
              title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
              mask: true
            });
          }).catch((err) => {
            formatAppLog("log", "at pages/download/index.vue:173", err);
            uni.showToast({
              title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
              icon: "error",
              mask: true
            });
          });
        } else if (active.value == 2) {
          if (!datas.value.cover) {
            uni.showToast({
              title: "\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u5C01\u9762\uFF01",
              icon: "error",
              mask: true
            });
          }
          downloadImage(datas.value.cover).then((res) => {
            uni.showToast({
              title: `\u4FDD\u5B58\u6210\u529F\uFF01`,
              mask: true
            });
          }).catch((err) => {
            uni.showToast({
              title: `\u4FDD\u5B58\u5931\u8D25\uFF01`,
              icon: "error",
              mask: true
            });
          });
        }
      };
      onLoad((option) => {
        formatAppLog("log", "at pages/download/index.vue:226", option.data);
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
        formatAppLog("log", "at pages/download/index.vue:239", e);
        datas.value.images[i].url = loadFile;
        datas.value.images[i].isCheck = false;
        datas.value.images[i].disabled = true;
        formatAppLog("error", "at pages/download/index.vue:243", "image\u53D1\u751Ferror\u4E8B\u4EF6\uFF0C\u643A\u5E26\u503C\u4E3A" + e.detail.errMsg);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", { class: "water-mater" }, [
          active.value != 3 ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "btn-primary download-btn",
            type: "primary",
            onClick: download
          }, vue.toDisplayString(vue.unref(downloadTitle)), 1)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "tab" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tab.value, (item, i) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["item", item.id == active.value ? "item-active" : ""]),
                key: i,
                onClick: ($event) => clickTab(item.id, i)
              }, vue.toDisplayString(item.label), 11, ["onClick"]);
            }), 128))
          ]),
          vue.createElementVNode("view", { class: "content" }, [
            active.value == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "img-list"
            }, [
              datas.value.images.length ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(datas.value.images, (item, i) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "img-item",
                  key: i
                }, [
                  vue.createElementVNode("checkbox-group", {
                    onChange: ($event) => checkboxChange($event, i)
                  }, [
                    vue.createElementVNode("checkbox", {
                      class: "checkbox-class",
                      color: "#007aff",
                      value: "cb",
                      checked: item.isCheck,
                      disabled: item.disabled
                    }, null, 8, ["checked", "disabled"]),
                    vue.createElementVNode("image", {
                      class: "img",
                      mode: "aspectFill",
                      "lazy-load": "",
                      onError: ($event) => imageError($event, i),
                      src: item.url
                    }, null, 40, ["onError", "src"])
                  ], 40, ["onChange"])
                ]);
              }), 128)) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "no-data-title"
              }, "\u6682\u65E0\u56FE\u96C6"))
            ])) : vue.createCommentVNode("v-if", true),
            active.value == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              datas.value.videoUrl ? (vue.openBlock(), vue.createElementBlock("video", {
                key: 0,
                class: "video-class",
                src: `http://${datas.value.videoUrl}`
              }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "no-data-title"
              }, "\u6682\u65E0\u89C6\u9891"))
            ])) : vue.createCommentVNode("v-if", true),
            active.value == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "cover-img-box"
            }, [
              vue.createElementVNode("image", {
                class: "cover-img",
                mode: "aspectFit",
                src: datas.value.cover,
                "lazy-load": ""
              }, null, 8, ["src"])
            ])) : vue.createCommentVNode("v-if", true),
            active.value == 3 ? (vue.openBlock(), vue.createElementBlock("view", { key: 3 }, [
              vue.createElementVNode("view", null, vue.toDisplayString(datas.value.title), 1),
              vue.createElementVNode("button", {
                class: "btn-primary copy-btn",
                onClick: copyContent
              }, "\u590D\u5236\u6587\u6848")
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });
  var PagesDownloadIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1b0b168f"], ["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/pages/download/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/douyin/index", PagesDouyinIndex);
  __definePage("pages/download/index", PagesDownloadIndex);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      onLaunch(() => {
        formatAppLog("log", "at App.vue:4", "App Launch");
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:7", "App Show");
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:10", "App Hide");
      });
      return () => {
      };
    }
  });
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/lipenghui/test/vue3-vite-uniapp/src/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
