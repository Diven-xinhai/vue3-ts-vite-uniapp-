<template>
  <view class="index">
    <view class="tab-list" v-for="(item, i) in tabList" :key="i" @click="goPath(item)">
      {{ item.label }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getGoodsList } from '@/api/home'
interface TabList {
  value: number
  label: string
  path: string
}

const tabList = ref<TabList[]>([{ value: 0, label: '抖音去水印', path: '/pages/douyin/index' }])

const goPath = (item: TabList) => {
  uni.navigateTo({
    url: item.path,
  })
}
</script>

<style lang="scss" scoped>
.index {
  padding: 25rpx;
  .tab-list {
    width: 25%;
    padding: 25rpx;
    border-radius: 15rpx;
    box-shadow: 0 0 10rpx #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
