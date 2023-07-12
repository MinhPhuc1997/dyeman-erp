import axios from "axios";

export const API = {
  whsCarriageStoragePage: "/api/whsCarriageStorage",
  proFinalProductCardPage: "/api/proFinalProductCard/page",
  proBleadyeRunJobPage: "/api/proBleadyeRunJob/page",
  whseFinishedFabricLog: "/api/whseFinishedFabricLog",
  whseFinishedclothcargopackDtlPage: "/api/whseFinishedclothcargopackDtl/page",
  whseFinishedclothin: "/api/whseFinishedclothin/lastIn",
  whseFinishedclothcargopackDtl: "/api/whseFinishedclothcargopackDtl",
  whseFinishedclothinList: "/api/whseFinishedclothin/v1.0/list",
  whseFinishedclothinDtlList: "/api/whseFinishedclothinDtl/v1.0/list",
  whseFabricChangeAction: "/api/whseFabricChangeAction",
  whseFabricChangeActionPage: "/api/whseFabricChangeAction/page",
  whseFabricChangeActionView: "/api/whseFabricChangeAction/view",
  whseFabricActionOption: "/api/whseFabricActionOption",
  whsCarriageStorage: "/api/whsCarriageStorage/page",
  whseFinishedFabricShot: "/api/whseFinishedFabricShot/page",
  whseFinishedFabricShotR: "/api/whseFinishedFabricShot",
  whseFinishedFabricLogPage: "/api/whseFinishedFabricLog/page",
  qcCheckoutFabricpage: "/api/qcCheckoutFabric/page",
  qcCheckoutFabricDtl: "/api/qcCheckoutFabricDtl",
  proFinalProductCard: "/api/proFinalProductCard",
  qcCheckClothDayDetail: "/api/qcCheckClothDayDetail",
  proConvertVatNoticePage: "/api/proConvertVatNotice/page",
  proConvertVatDetail: "/api/proConvertVatDetail",
  proOutFactOrderPage: "/api/proOutFactOrder/page",
  proOutFactOrderVat: "/api/proOutFactOrderVat",
  proOutFactOrderDtl: "/api/proOutFactOrderDtl",
  drawCloth: "/api/whseFabricChangeAction/drawCloth",
  outputStat: "/api/proDptReciveLog/outputStat",
  outputStatDay:"/api/proDptReciveLog/outputStatDay"
}

export function axiosGet(uri, params) {
  return axios({
    url: uri,
    method: "get",
    params: params
  });
}

export function axiosDel(uri, id) {
  return axios({
    url: uri,
    method: "delete",
    params: id
  });
}


export function getWhsCarriageStorage(params) {
  return axios({
    url: "/api/whsCarriageStorage/page",
    method: "get",
    params: params
  });
}


export function postWhseFinishedclothin(params) {
  return axios({
    url: "/api/whseFinishedclothin/create",
    method: "post",
    dataType: "json",
    "content-type": "application/json",
    "header": "USER",
    data: params
  });
}
export function axiosPostV1(uri, params) {
  return axios({
    url: uri,
    method: "post",
    params: params
  });
}
export function axiosPost(uri, params) {
  return axios({
    url: uri,
    method: "post",
    dataType: "json",
    "content-type": "application/json",
    data: params
  });
}export function axiosPostEx(uri, params) {
  return axios.post(uri, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function axiosPutEx(uri, params) {
  return axios.put(uri, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function axiosPut(uri, data) {
  return axios({
    url: uri,
    method: "put",
    params: data
  });
}




///api/whsCarriageStorage/page storageCode
