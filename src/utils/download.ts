/*
 * @Date: 2022-09-06 16:38:59
 * @LastEditors: YeKe
 * @LastEditTime: 2022-09-06 17:47:32
 * @FilePath: \vue3-vite-uniapp\src\hooks\download.ts
 */

/**
 * @description: 下载图片到相册
 * @param {string} url
 * @return {*} promise
 */
export function downloadImage(url: string) {
  return new Promise((reslove, reject) => {
    // 下载图片生成虚拟地址
    uni.downloadFile({
      url: url,
      success: (res: any) => {
        if (res.statusCode === 200) {
          // 保存到相册
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              reslove(res)
            },
          })
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * @description: 下载视频到相册
 * @param {string} url
 * @return {*} promise
 */
export function downloadVideo(url: string) {
  return new Promise((reslove, reject) => {
    // 下载图片生成虚拟地址
    uni.downloadFile({
      url: url,
      success: (res: any) => {
        if (res.statusCode === 200) {
          // 保存到相册
          uni.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              reslove(res)
            },
          })
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
