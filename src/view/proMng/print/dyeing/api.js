/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-21 10:16:54
 * @Description:
 */

import axios from "axios";


// 获取染整单信息
export function fetchProBleadyeJobDataList(params){
  return axios({
    url: "/api/proBleadyeJob",
    method: "get",
    params: params
  });
}

// 獲取合缸明细
export function getBleadyeJobMerge(params) {
  return axios({
    url: "/api/proBleadyeJobMerge",
    method: "get",
    params: params
  });
}
// 更新合缸明细
export function updateBleadyeJobMerge(data) {
  return axios({
    url: "/api/proBleadyeJobMerge",
    method: "put",
    params: data
  });
}

// 新增合缸明细
export function addBleadyeJobMerge(data) {
  return axios({
    url: "/api/proBleadyeJobMerge",
    method: "post",
    params: data
  });
}

// 刪除
export function delBleadyeJobMerge(id) {
  return axios({
    url: "/api/proBleadyeJobMerge?vatNo=" + id,
    method: "delete"
  });
}

// 獲取运转单
export function getRunJob(params) {
  return axios({
    url: "/api/proBleadyeJobMerge/NotRef",
    method: "get",
    params: params
  });
}

// 獲取基礎工藝
export function getTechargueList(params) {
  return axios({
    url: "/api/baseBleadyeTechargue",
    method: "get",
    params: params
  });
}
// 獲取訂單號
export function getPo(params) {
  return axios({
    url: "/api/salPoList",
    method: "get",
    params: params
  });
}

// 獲取訂單胚布资料
export function getPoDtla(params) {
  return axios({
    url: "/api/salPoDtlaList",
    method: "get",
    params: params
  });
}
// 獲取訂單颜色资料
export function getPoDtlb(params) {
  return axios({
    url: "/api/salPoColor",
    method: "get",
    params: params
  });
}

// 獲取訂單面料资料Sal_bom_fabric
export function getBom(params) {
  return axios({
    url: "/api/salBomFabric",
    method: "get",
    params: params
  });
}

export function get(params) {
  return axios({
    url: "/api/proBleadyeJob/pageEx",
    method: "get",
    params: params
  });
}

// 通过排期类型查找工作包
export function getRevolve(params) {
  return axios({
    url: "/api/proBleadyeRunJob/notIn",
    method: "get",
    params: params
  });
}
export function getRevolveList(params) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  });
}
// 新增
export function add(data) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proBleadyeJob?bleadyeJobId=" + id,
    method: "delete"
  });
}
// 打印佈飛
export function print(params) {
  return axios({
    url: "/api/proBleadyeJob/buildWorkOrder",
    method: "get",
    params: params
  });
}

export function getYarn(params) {
  return axios({
    url: "/api/proWeaveJobYarn",
    method: "get",
    params: params
  });
}

export function getProject(params) {
  return axios({
    url: "/api/proBleadyeJobItem/page",
    method: "get",
    params: params
  });
}

// 新增
export function addProject(data) {
  return axios({
    url: "/api/proBleadyeJobItem",
    method: "post",
    params: data
  });
}

// 修改
export function updateProject(data) {
  return axios({
    url: "/api/proBleadyeJobItem",
    method: "put",
    params: data
  });
}

// 刪除
export function delProject(id) {
  return axios({
    url: "/api/proBleadyeJobItem?itemId=" + id,
    method: "delete"
  });
}

export function getTest(params) {
  return axios({
    url: "/api/proBleadyeJobTest/page",
    method: "get",
    params: params
  });
}

// 新增
export function addTest(data) {
  return axios({
    url: "/api/proBleadyeJobTest",
    method: "post",
    params: data
  });
}

// 修改
export function updateTest(data) {
  return axios({
    url: "/api/proBleadyeJobTest",
    method: "put",
    params: data
  });
}

// 刪除
export function delTest(id) {
  return axios({
    url: "/api/proBleadyeJobTest?jobTestId=" + id,
    method: "delete"
  });
}

export function getDye(params) {
  return axios({
    url: "/api/proBleadyeJobVatParam/page",
    method: "get",
    params: params
  });
}

// 新增
export function addDyes(data) {
  return axios({
    url: "/api/proBleadyeJobVatParam",
    method: "post",
    params: data
  });
}

// 修改
export function updateDye(data) {
  return axios({
    url: "/api/proBleadyeJobVatParam",
    method: "put",
    params: data
  });
}

// 刪除
export function delDye(id) {
  return axios({
    url: "/api/proBleadyeJobVatParam?vatParamId=" + id,
    method: "delete"
  });
}

export function getTechargue(params) {
  return axios({
    url: "/api/proBleadyeJobTechargue/page",
    method: "get",
    params: params
  });
}

export function getProBleadyeJobTechargue(params) {
  return axios({
    url: "/api/proBleadyeJobTechargue",
    method: "get",
    params: params
  });
}

// 新增
export function addTechargue(data) {
  return axios({
    url: "/api/proBleadyeJobTechargue",
    method: "post",
    params: data
  });
}

// 修改
export function updateTechargue(data) {
  return axios({
    url: "/api/proBleadyeJobTechargue",
    method: "put",
    params: data
  });
}

// 刪除
export function delTechargue(id) {
  return axios({
    url: "/api/proBleadyeJobTechargue?jobTechId=" + id,
    method: "delete"
  });
}

export function getCodeItem(params) {
  return axios({
    url: "/api/proBleadyeCodeItem/page",
    method: "get",
    params: params
  });
}
export function getTechItem(params) {
  return axios({
    url: "/api/proBleadyeJobTechItem/page",
    method: "get",
    params: params
  });
}

// 新增
export function addTechItem(data) {
  return axios({
    url: "/api/proBleadyeJobTechItem",
    method: "post",
    params: data
  });
}

// 修改
export function updateTechItem(data) {
  return axios({
    url: "/api/proBleadyeJobTechItem",
    method: "put",
    params: data
  });
}

// 刪除
export function delTechItem(id) {
  return axios({
    url: "/api/proBleadyeJobTechItem?techItemId=" + id,
    method: "delete"
  });
}

export function getWash(params) {
  return axios({
    url: "/api/proBleadyeJobWash/page",
    method: "get",
    params: params
  });
}

// 新增
export function addWash(data) {
  return axios({
    url: "/api/proBleadyeJobWash",
    method: "post",
    params: data
  });
}

// 修改
export function updateWash(data) {
  return axios({
    url: "/api/proBleadyeJobWash",
    method: "put",
    params: data
  });
}

// 刪除
export function delWash(id) {
  return axios({
    url: "/api/proBleadyeJobWash?itemId=" + id,
    method: "delete"
  });
}
// 
export function postBaseEquipmentList() {
  return axios({
    url: "/api/baseEquipmentList?categoryId=dev-12",
    method: "post"
  });
}

