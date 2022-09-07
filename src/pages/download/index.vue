<template>
  <div class="water-mater">
    <button v-if="active != 3" class="btn-primary download-btn" type="primary" @click="download">
      {{ downloadTitle }}
    </button>
    <view class="tab">
      <view
        :class="['item', item.id == active ? 'item-active' : '']"
        v-for="(item, i) in tab"
        :key="i"
        @click="clickTab(item.id, i)"
      >
        {{ item.label }}
      </view>
    </view>

    <view class="content">
      <view class="img-list" v-if="active == 0">
        <template v-if="datas.images.length">
          <view class="img-item" v-for="(item, i) in datas.images" :key="i">
            <checkbox-group @change="checkboxChange($event, i)">
              <checkbox
                class="checkbox-class"
                color="#007aff"
                value="cb"
                :checked="item.isCheck"
                :disabled="item.disabled"
              />
              <image class="img" mode="aspectFill" lazy-load @error="imageError($event, i)" :src="item.url"></image>
            </checkbox-group>
          </view>
        </template>
        <template v-else>
          <view class="no-data-title">暂无图集</view>
        </template>
      </view>

      <view v-if="active == 1">
        <video class="video-class" :src="`http://${datas.videoUrl}`" v-if="datas.videoUrl"></video>
        <view class="no-data-title" v-else>暂无视频</view>
      </view>

      <view class="cover-img-box" v-if="active == 2">
        <image class="cover-img" mode="aspectFit" :src="datas.cover" lazy-load></image>
      </view>

      <view v-if="active == 3">
        <view>{{ datas.title }}</view>
        <button class="btn-primary copy-btn" @click="copyContent">复制文案</button>
      </view>
    </view>
  </div>
</template>

<script setup lang="ts" name="water-mater">
import { ref } from 'vue'
import { onLoad, onShow, onHide } from '@dcloudio/uni-app'
import { downloadImage, downloadVideo } from '@/hooks/download'
import { PCULIC_URL } from '@/config/app'
import loadFile from '@/static/load-file.png'

interface Datas {
  cover: string
  title: string
  videoUrl: string
  videoName: string
  relativePath: string
  images: { url: string; isCheck: boolean; disabled: boolean }[]
}
const datas = ref<Datas>({
  cover: '',
  title: '',
  videoUrl: '',
  videoName: '',
  relativePath: '',
  images: [],
})

let downloadTitle = ref<string>('')

const tab = ref([
  { label: '图集', id: 0, downloadTitle: '保存选中的图片' },
  { label: '视频', id: 1, downloadTitle: '保存视频到相册' },
  { label: '封面', id: 2, downloadTitle: '保存封面到相册' },
  { label: '文案', id: 3, downloadTitle: '' },
])

const active = ref<number>(0)

const clickTab = (id: number, i: number) => {
  active.value = id
  downloadTitle.value = tab.value[i].downloadTitle
}

const checkboxChange = (e: any, i: number) => {
  datas.value.images[i].isCheck = !datas.value.images[i].isCheck
}

const copyContent = () => {
  uni.setClipboardData({
    data: datas.value.title,
    success: function () {
      uni.showToast({
        title: `复制成功！`,
        mask: true,
      })
    },
  })
}

/**
 * @description: 下载文件
 */
const download = async () => {
  /* #ifdef MP-WEIXIN */

  uni.authorize({
    scope: 'scope.writePhotosAlbum',
    success() {
      /* #endif */
      uni.showLoading({
        title: '保存中...',
        mask: true,
      })
      // 保存图片
      if (active.value == 0) {
        if (!datas.value.images.length) {
          uni.showToast({
            title: '没有可保存的图片！',
            icon: 'error',
            mask: true,
          })
        }
        let arr: any[] = datas.value.images.map((item) => {
          if (!item.isCheck) {
            return
          } else {
            return downloadImage(item.url)
          }
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
              icon: 'error',
              mask: true,
            })
          })
      } else if (active.value == 1) {
        if (!datas.value.videoUrl) {
          uni.showToast({
            title: '没有可保存的视频！',
            icon: 'error',
            mask: true,
          })
        }
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
              icon: 'error',
              mask: true,
            })
          })
      } else if (active.value == 2) {
        if (!datas.value.cover) {
          uni.showToast({
            title: '没有可保存的封面！',
            icon: 'error',
            mask: true,
          })
        }
        downloadImage(datas.value.cover)
          .then((res) => {
            uni.showToast({
              title: `保存成功！`,
              mask: true,
            })
          })
          .catch((err) => {
            uni.showToast({
              title: `保存失败！`,
              icon: 'error',
              mask: true,
            })
          })
      }
      /* #ifdef MP-WEIXIN */
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
  /* #endif */
}

onLoad((option: any) => {
  console.log(option.data)
  const data: Datas = JSON.parse(decodeURIComponent(option.data))
  data.images.forEach((item) => {
    item.isCheck = true
    item.disabled = false
  })
  datas.value = data

  active.value = datas.value.videoUrl ? 1 : 0
  downloadTitle.value = tab.value.filter((item) => item.id == active.value)[0].downloadTitle
})

const imageError = (e: any, i: number) => {
  console.log(e)
  datas.value.images[i].url = loadFile
  datas.value.images[i].isCheck = false
  datas.value.images[i].disabled = true
  console.error('image发生error事件，携带值为' + e.detail.errMsg)
}
</script>

<style lang="scss" scoped>
.water-mater {
  padding: 20upx 20upx 0 20upx;
  position: relative;
  box-sizing: border-box;
  .title {
    font-size: 25upx;
    margin-bottom: 10upx;
  }
  .tab {
    width: 100%;
    position: absolute;
    top: 0upx;
    z-index: 10;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .item {
      width: 25%;
      text-align: center;
      font-size: 28upx;
      padding: 20upx 10upx;
      box-sizing: border-box;
      border-bottom: 1px solid #fff;
    }
    .item-active {
      border-bottom: 2px solid #007aff;
    }
  }
  .content {
    // max-height: 90vh;
    height: calc(100vh - 150upx);
    overflow-y: auto;
    padding-top: 80upx;
    .video-class {
      width: 100%;
    }
    .cover-img-box {
      height: 100%;
      .cover-img {
        width: 100%;
        height: 90%;
      }
    }
  }
  .btn-primary {
    width: 80%;
    background-color: #007aff;
    font-size: 28upx;
    padding: 5upx;
    margin-bottom: 25upx;
  }
  .download-btn {
    position: fixed;
    bottom: 20upx;
    left: calc(50% - 40%);
    z-index: 10;
  }

  .copy-btn {
    background-color: #fff;
    margin-top: 100upx;
  }

  .color-fff {
    color: #333;
    background-color: #fff;
  }
  .img-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .img-item {
      width: calc(50% - 10upx);
      margin-bottom: 20upx;
      position: relative;
      .img {
        width: 100%;
      }
      .checkbox-class {
        position: absolute;
        top: 10upx;
        right: 0;
        z-index: 1;
      }
    }
  }

  .no-data-title {
    width: 100%;
    font-size: 28upx;
    text-align: center;
    padding: 20upx;
  }
}
</style>
