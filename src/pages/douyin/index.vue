<template>
  <div class="water-mater">
    <view class="title">请输入链接地址：</view>
    <textarea class="msg" v-model="message" placeholder="请输入链接" />
    <button class="start-parsing-btn" type="primary" @click="startParsing">开始解析</button>

    <button class="start-parsing-btn" type="primary" @click="downlod">下载</button>

    <video :src="`http://${datas.videoUrl}`" v-if="datas.videoUrl"></video>
    <view class="img-list" v-else>
      <image
        class="img-item"
        mode="aspectFit"
        @error="imageError"
        v-for="(item, i) in datas.images"
        :key="i"
        :src="item"
      ></image>
    </view>
  </div>
</template>

<script setup lang="ts" name="water-mater">
import { ref } from 'vue'
import { getHrefInfo } from '@/api/douyin'
import { extractHttpFromString } from '@/utils/index'
import { downloadImage, downloadVideo } from '@/hooks/download'
import { PCULIC_URL } from '@/config/app'

interface Datas {
  cover: string
  videoUrl: string
  videoUrlInit: string
  videoName: string
  relativePath: string
  images: string[]
}
const datas = ref<Datas>({
  cover: '',
  videoUrl: '',
  videoUrlInit: '',
  videoName: '',
  relativePath: '',
  images: [],
})

const message = ref<string>()

/**
 * @description: 开始解析
 */
const startParsing = () => {
  if (!message.value) {
    uni.showToast({
      title: '请输入需要解析的链接！',
      mask: true,
    })
    return false
  }

  getHrefInfo({
    url: extractHttpFromString(message.value),
  }).then((res: any): void => {
    if (res.code !== 200) {
      uni.showToast({
        title: res.msg,
        mask: true,
      })
      return
    }
    datas.value = res.data
    uni.showToast({
      title: '解析成功！',
      mask: true,
    })
  })
}

/**
 * @description: 下载文件
 */
const downlod = async () => {
  if (datas.value) {
    uni.authorize({
      scope: 'scope.writePhotosAlbum',
      success() {
        uni.showLoading({
          title: '保存中...',
          mask: true,
        })
        // 保存图片
        if (datas.value.images.length) {
          let arr: any[] = datas.value.images.map((item) => {
            return downloadImage(item)
          })

          const res = Promise.all(arr)
          res
            .then((r) => {
              uni.showToast({
                title: `保存成功！`,
                mask: true,
              })
            })
            .catch((err) => {
              uni.showToast({
                title: `保存失败！`,
                mask: true,
              })
            })
        } else {
          downloadVideo(`${PCULIC_URL}${datas.value.relativePath}`)
            .then((res) => {
              uni.showToast({
                title: `保存成功！`,
                mask: true,
              })
            })
            .catch((err) => {
              console.log(err)

              uni.showToast({
                title: `保存失败！`,
                mask: true,
              })
            })
        }
      },
      fail() {
        uni.showModal({
          title: '您需要授权相册权限',
          success(res) {
            // 2.1点击确认按钮就调取授权设置页面
            if (res.confirm) {
              // 2.2 开启授权设置页面
              uni.openSetting({
                success(res) {},
                fail(res) {},
              })
            }
          },
        })
      },
    })
  }
}

const imageError = (e: any) => {
  console.error('image发生error事件，携带值为' + e.detail.errMsg)
}
</script>

<style lang="scss">
.water-mater {
  padding: 20upx 20upx 0 20upx;
  .title {
    font-size: 25upx;
    margin-bottom: 10upx;
  }
  .msg {
    width: 100%;
    font-size: 28upx;
    border: 1px solid #ddd;
    padding: 20upx;
    box-sizing: border-box;
    margin: 0 auto 20upx auto;
    border-radius: 10upx;
  }
  .start-parsing-btn {
    background-color: #007aff;
    font-size: 28upx;
    padding: 5upx;
    margin-bottom: 25upx;
  }
  .img-list {
    .img-item {
      width: 50%;
    }
  }
}
</style>
