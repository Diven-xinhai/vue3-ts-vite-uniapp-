/*
 * @Date: 2022-08-16 15:06:31
 * @LastEditors: YeKe
 * @LastEditTime: 2022-08-18 11:50:51
 * @FilePath: \vue3-ts-bili\src\utils\index.ts
 */
/**
 * @description: 从字符串中提取Http[s]
 * @param {string} str
 * @return {string} http
 */
export const extractHttpFromString = (str: string) => {
  const reg = /http[s]?:\/\/\S+/
  return str.match(reg)
}
