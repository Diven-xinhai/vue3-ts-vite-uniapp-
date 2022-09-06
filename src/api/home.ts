/*
 * @Date: 2022-09-05 16:56:24
 * @LastEditors: YeKe
 * @LastEditTime: 2022-09-06 09:08:42
 * @FilePath: \vue3-vite-uniapp\src\api\home.ts
 */
import request from '@/utils/request'

/**
 * 获取用户信息
 *
 */
export function getGoodsList() {
  return request?.get?.('/tabList', {}, { noAuth: true })
}
