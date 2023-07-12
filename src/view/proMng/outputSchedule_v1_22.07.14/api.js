/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:20:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-07 15:24:39
 * @Description:
 */
import axios from 'axios'
export function get(params) {
  return axios({
    url: '/api/proWeaveJob/reSummary',
    method: 'get',
    params: params
  })
}


// 新增佈飛记录
export function add(data) {
  return axios({
    url: '/api/proWeaveJobSumOutput',
    method: 'post',
    params: data
  })
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: '/api/proWeaveJobSumOutput',
    method: 'put',
    params: data
  })
}

export function del(id) {
  return axios({
    url: '/api/proWeaveJobSumOutput?sumOutputId=' + id,
    method: 'delete',
  })
}

// 订单信息
export function getPo(params) {
  return axios({
    url: '/api/salPoList',
    method: 'get',
    params: params
  })
}
// 订单胚布信息
export function getPoDtla(params) {
  return axios({
    url: '/api/salPoDtlaList',
    method: 'get',
    params: params
  })
}

// 订单胚布信息
export function getPoColor(params) {
  return axios({
    url: '/api/salPoColor',
    method: 'get',
    params: params
  })
}
