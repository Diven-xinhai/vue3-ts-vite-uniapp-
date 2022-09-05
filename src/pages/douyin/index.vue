<template>
  <view class="index"> 111111 </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getGoodsList } from '@/api/home'
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
