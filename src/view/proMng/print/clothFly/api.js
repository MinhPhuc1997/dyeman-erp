/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-22 10:14:02
 * @Description:
 */

import axios from "axios";

export function fetchLoomStaffDataByPage(params) {
    return axios({
      url: "/api/proOperator/page",
      method: "get",
      params
    })
}

/* 布飞信息 */
export function fetchNoteCodeByPage(params) {
  return axios({
    url: "/api/proClothNote/page",
    method: "get",
    params: params
  })
}


/* 机号排期 */
export function fetchLoomScheduleDataByPage(params) {
  return axios({
    url: "/api/proWeaveOperLog/page",
    method: "get",
    params: params
  })
}


// 獲取機號信息
export function getJh(params) {
  return axios({
    url: "/api/proWeaveJobUseMachine",
    method: "get",
    params: params
  });
}

// 通过排期类型查找工作包
export function get(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

// 获取色号流水号
export function getCodeSupply(params) {
  return axios({
    url: "/api/singleCodeSupply?code=color_num",
    method: "get"
  });
}

// 新增佈飛记录
export function addBf(data) {
  return axios({
    url: "/api/proClothNote",
    method: "post",
    params: data
  });
}

// 佈飛记录
export function getBf(data) {
  return axios({
    url: "/api/proClothNote",
    method: "get",
    params: data
  });
}
// 打印佈飛
export function printBf(id) {
  return axios({
    url: "/api/proClothNote/preview?id=" + id,
    method: "get"
  });
}

export function getYarn(params) {
  return axios({
    url: "/api/proWeaveJobYarn",
    method: "get",
    params: params
  });
}

// 獲取打印記錄
export function getNote(params) {
  return axios({
    url: "/api/proClothNote/page",
    method: "get",
    params: params
  });
}

// 新增佈飛记录
export function addNote(data) {
  return axios({
    url: "/api/proClothNote",
    method: "post",
    params: data
  });
}

// 修改佈飛记录
export function updateNote(data) {
  return axios({
    url: "/api/proClothNote",
    method: "put",
    params: data
  });
}

// 修改佈飛记录
export function delNote(id) {
  return axios({
    url: "/api/proClothNote?noteId=" + id,
    method: "delete"
  });
}

export function getGroup(params) {
  return axios({
    url: "/api/proWeaveJobGroup",
    method: "get",
    params: params
  });
}
