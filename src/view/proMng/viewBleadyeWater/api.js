/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-26 17:34:55
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\api.js
 * @Description:
 */
import axios from 'axios'

// 异常报告拆缸
export function fetchProBleadyeJobVbwByPage(params){
  return axios({
    url: "/api/proBleadyeJob/vbw",
    method: "get",
    params: params
  })
}

