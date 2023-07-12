/*
 * @Author: Lyl
 * @Date: 2022-02-23 08:11:26
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-25 10:18:28
 * @FilePath: \iot.vue\src\view\proMng\dyeDeliveryNote\api.js
 * @Description:
 */
import axios from "axios";

export function fetchStockFinishedClothData(params) {
  return axios({
    url: "/api/whseFinishedFabricShot",
    method: "get",
    params: params
  });
}


export function saveProPickUpFabricData(data) {
  return axios({
    url: "/api/proPickUpFabric",
    method: "post",
    data
  });
}


export function fetchQcCheckoutFabricData(params) {
  return axios({
    url: "/api/qcCheckoutFabric/page",
    method: "get",
    params: params
  });
}

export function fetchWhseShotVatNoData(params) {
  return axios({
    url: "/api/whseFinishedFabricShot/getVatNO",
    method: "get",
    params: params
  });
}


export function get(params) {
  return axios({
    url: "/api/proPickUpFabric/page",
    method: "get",
    params: params
  });
}

export function del(id) {
  return axios({
    url: "/api/proPickUpFabric?pickupId=" + id,
    method: "delete"
  });
}

export function getNote(params) {
  return axios({
    url: "/api/proOutFactOrderDtl",
    method: "get",
    params: params
  });
}

export function addNote(params) {
  return axios({
    url: "/api/proOutFactOrderDtl",
    method: "post",
    params: params
  });
}

export function updateNote(params) {
  return axios({
    url: "/api/proOutFactOrderDtl",
    method: "put",
    params: params
  });
}
export function delNote(id) {
  return axios({
    url: "/api/proOutFactOrderDtl?dtlId=" + id,
    method: "delete"
  });
}

export function uploadXlxs(params) {
  return axios({
    url: "/api/proWeaveOutworkShip/importExcle",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export function getProOutFactOrderVat(params) {
  return axios({
    url: "/api/proOutFactOrderVat/page",
    method: "get",
    params: params
  });
}

export function addProOutFactOrderVat(params) {
  return axios({
    url: "/api/proOutFactOrderVat",
    method: "post",
    params: params
  });
}

export function delProOutFactOrderVat(id) {
  return axios({
    url: "/api/proOutFactOrderVat?vatRefId=" + id,
    method: "delete"
  });
}
