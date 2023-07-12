/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-29 15:41:25
 * @Description:
 */

import axios from "axios";

// export function fetch(params) {
//   return axios({
//     url: "/api/proProductFlatCard/page",
//     method: "get",
//     params: params
//   });
// }

export function fetchQcCheckoutFabricHisDtl(params) {
  return axios({
    url: "/api/qcCheckoutFabricHisDtl",
    method: "get",
    params: params
  });
}


export function fetchQcCheckoutFabricHis(params) {
  return axios({
    url: "/api/qcCheckoutFabricHis/page",
    method: "get",
    params: params
  });
}


export function getProProductFlatCardDataByPage(params) {
  return axios({
    url: "/api/proProductFlatCard/page",
    method: "get",
    params: params
  });
}

export function getProProductFlatCardData(params) {
    return axios({
      url: "/api/proProductFlatCard",
      method: "get",
      params: params
    });
  }


// 审核
export function aduitQcCheckoutFabric(params) {
  return axios({
    url: "/api/qcCheckoutFabric/vouch",
    method: "put",
    params
  });
}

// 获得拆缸后的重量
export function getDismantleVatno(val) {
  return axios({
    url: "/api/proFinalProductCard/DismantleVatno?vatNo=" + val,
    method: "get"
  });
}

// 修改运转单记录
export function updateRunJob(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "put",
    params: data
  });
}

export function getFinishedNote(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

export function getRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

// 查询
export function get(params) {
  return axios({
    url: "/api/qcCheckoutFabric/page",
    method: "get",
    params: params
  });
}

export function getdetail(params) {
  return axios({
    url:
      "/api/proFinalProductCard/page?r_clothCheckTime_r=!%5E",
    method: "get",
    params: params
  });
}

export function checkExist(params) {
  return axios({
    url:"/api/qcCheckoutFabric",
    method: "get",
    params: params
  });
}

export function versionCont(params) {
  return axios({
    url:"/api/qcCheckoutFabric/versionCont",
    method: "get",
    params: params
  });
}

// 新增佈飛记录
export function add(data) {
  return axios({
    url: "/api/qcCheckoutFabric",
    method: "post",
    params: data
  });
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: "/api/qcCheckoutFabric",
    method: "post",
    params: data
  });
}

// 修改佈飛记录
export function del(id) {
  return axios({
    url: "/api/qcCheckoutFabric?checkoutId=" + id,
    method: "delete"
  });
}
