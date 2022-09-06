"use strict";
var common_vendor = require("../common/vendor.js");
function downloadImage(url) {
  return new Promise((reslove, reject) => {
    common_vendor.index.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          common_vendor.index.saveImageToPhotosAlbum({
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
    common_vendor.index.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          common_vendor.index.saveVideoToPhotosAlbum({
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
exports.downloadImage = downloadImage;
exports.downloadVideo = downloadVideo;
