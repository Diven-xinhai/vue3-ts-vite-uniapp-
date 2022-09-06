/*
 * @Date: 2022-08-18 17:16:10
 * @LastEditors: YeKe
 * @LastEditTime: 2022-09-06 09:07:48
 * @FilePath: \vue3-vite-uniapp\src\hooks\hooksuseCurrentInstance.ts
 */
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
/**
 * @description: 获取组件实例
 * @return {*} 实例
 */
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProperties = appContext.config.globalProperties
  return {
    globalProperties,
  }
}
