<template>
  <div class="water-mater">
    <view class="title">请输入链接地址：</view>
    <textarea class="msg" v-model="message" placeholder="请输入链接" />
    <view class="btn-box">
      <button class="btn-primary" type="primary" @click="startParsing">开始解析</button>
      <button class="btn-primary color-fff" type="primary" @click="copyContent">粘贴内容</button>
    </view>
  </div>
</template>

<script setup lang="ts" name="water-mater">
import { ref } from 'vue'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { getHrefInfo } from '@/api/douyin'
import { extractHttpFromString } from '@/utils/index'

const message = ref<string>()

/**
 * @description: 开始解析
 */
const startParsing = () => {
  if (!message.value) {
    uni.showToast({
      title: '请输入需要解析的链接！',
      icon: 'error',
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
        icon: 'error',
      })
      return
    }
    uni.showToast({
      title: '解析成功！',
      mask: true,
    })
    console.log(res.data)

    uni.navigateTo({
      url: `/pages/download/index?data=${encodeURIComponent(JSON.stringify(res.data))}`,
    })
  })
}

const copyContent = () => {
  uni.getClipboardData({
    success: function (res) {
      message.value = res.data
    },
  })
}

onShow(() => {})

const imageError = (e: any) => {
  console.error('image发生error事件，携带值为' + e.detail.errMsg)
}
</script>

<style lang="scss" scoped>
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

  .btn-box {
    display: flex;
    justify-content: space-between;
    .btn-primary {
      width: 45%;
    }
  }
  .btn-primary {
    background-color: #007aff;
    font-size: 28upx;
    padding: 5upx;
    margin-bottom: 25upx;
  }
  .color-fff {
    color: #333;
    background-color: #fff;
  }
  .img-list {
    .img-item {
      width: 50%;
    }
  }
}
</style>
