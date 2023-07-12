/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-01 18:43:53
 * @Description:
 */

import axios from 'axios';


// 修改佈飛记录
export function updateNote(data) {
  return axios({
    url: '/api/proClothNote',
    method: 'put',
    params: data
  })
}
// 獲取打印記錄
export function getJob(params) {
  return axios({
    url: '/api/proWeaveJob/page',
    method: 'get',
    params: params
  })
}

// 獲取打印記錄
export function get(params) {
  return axios({
    url: '/api/proClothNote/pageLike',
    method: 'get',
    params: params
  })
}


// 新增佈飛记录
export function add(data) {
  return axios({
    url: '/api/proClothNote',
    method: 'post',
    params: data
  })
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: '/api/proClothNote',
    method: 'put',
    params: data
  })
}

// 修改佈飛记录
export function del(id) {
  return axios({
    url: '/api/proClothNote?noteId=' + id,
    method: 'delete',
  })
}

// 打印佈飛
export function printBf(id) {
  return axios({
    url: '/api/proClothNote/printing?id=' + id,
    method: 'get',
  })
}


