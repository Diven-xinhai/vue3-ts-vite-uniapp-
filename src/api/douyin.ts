/*
 * @Date: 2022-09-05 16:56:24
 * @LastEditors: YeKe
 * @LastEditTime: 2022-09-06 15:46:11
 * @FilePath: \vue3-vite-uniapp\src\api\douyin.ts
 */
import request from '@/utils/request'

/**
 * @description: 获取抖音链接信息
 */
export function getHrefInfo(data: any) {
  return request.get?.('/removeWm', { url: data.url }, { noAuth: true, loadingMsg: '正在解析中...' })
}
