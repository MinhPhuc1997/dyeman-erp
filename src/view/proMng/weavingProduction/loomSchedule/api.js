/*
 * @Author: Lyl
 * @Date: 2022-09-09 09:02:38
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-23 14:03:59
 * @FilePath: \iot.vue\src\view\proMng\weavingProduction\loomSchedule\api.js
 * @Description: 
 */
import axios from "axios";

/* 保存排期信息 */
export function createProWeaveOperLogList(data) {
    return axios({
      url: "/api/proWeaveOperLog/batch",
      method: "post",
      data: data
    })
}

/* 获取织单对应机号 */
export function fetchWeaveOrderLoomData(id) {
    return axios({
      url: "/api/proWeaveJobUseMachine?proWeaveJobFk=" + id,
      method: "get"
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

export function createLoomScheduleData(params) {
  return axios({
    url: "/api/proWeaveOperLog",
    method: "post",
    params
  })
}

export function updateLoomScheduleData(params) {
  return axios({
    url: "/api/proWeaveOperLog",
    method: "put",
    params
  })
}

export function removeLoomScheduleData(id) {
  return axios({
    url: "/api/proWeaveOperLog?logId=" + id,
    method: "delete",
  })
}
/* ---- */

/* 员工信息 */

export function fetchLoomStaffDataByPage(params) {
  return axios({
    url: "/api/proOperator/page",
    method: "get",
    params
  })
}

export function createLoomStaffData(params) {
  return axios({
    url: "/api/proOperator",
    method: "post",
    params
  })
}

export function updateLoomStaffData(params) {
  return axios({
    url: "/api/proOperator",
    method: "put",
    params
  })
}

export function removeLoomStaffData(id) {
  return axios({
    url: "/api/proOperator?opId=" + id,
    method: "delete",
  })
}

/* ---- */