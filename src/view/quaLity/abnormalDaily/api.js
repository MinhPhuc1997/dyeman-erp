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
export function fetchSplitVatByDetail(params){
  return axios({
    url: "/api/proBleadyeRunJob/auto/create/run/job",
    method: "get",
    params: params
  })
}

//改缸号 
export function fetchUpdateVatNoByType (type,vatNo,detailFk){
  return axios({
    url: `/api/proBleadyeRunJob/update/vatNo/${type}/${vatNo}`,
    method: "put",
    params: { detailFk: detailFk }
  }); 
}

// 获取是否可自动拆缸区间内
export function fetchHasAutoSplitTimes(){
  return axios({
    url: `/api/proBleadyeRunJob/has/auto/split`,
    method: "get",
  }); 
}

export function removeQcCheckClothDayDetailCard(id){
  return axios({
    url: "/api/qcCheckClothDayDetailCard?id=" + id,
    method: "delete"
  })
}

export function fetchQcCheckClothDayDetailCardData(params) {
  return axios({
    url: "/api/qcCheckClothDayDetailCard/list",
    method: "get",
    params: params
  });
}


export function saveOrupdateDayDetailCard(data){
  return axios({
    url: "/api/qcCheckClothDayDetailCard/batch/saveOrUpdate",
    data,
    method: "post"
  })
}


export function getRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

export function getFinishedNoteList(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

export function fetchQcCheckClothDayDetailByPage(params){
  return axios({
    url:"/api/qcCheckClothDayDetail/page",
    params: params,
    method: "get"
  })
}

export function addQcCheckClothDayDetail(params){
  return axios({
    url: "/api/qcCheckClothDayDetail",
    params: params,
    method: "post"
  })
}

export function updateQcCheckClothDayDetail(params){
  return axios({
    url: "/api/qcCheckClothDayDetail",
    params: params,
    method: "put"
  })
}

export function removeQcCheckClothDayDetail(id){
  return axios({
    url: "/api/qcCheckClothDayDetail?detailId=" + id,
    method: "delete"
  })
}

export function createRepairPdf(id){
  return axios({
    url:"/api/qcClothBackRepair/repairPdf?id=" + id,
    method: "get"
  })
}

export function fetchQcClothBackRepairByPage(params){
  return axios({
    url:"/api/qcClothBackRepair/page",
    params: params,
    method: "get"
  })
}

export function addQcClothBackRepair(params){
  return axios({
    url: "/api/qcClothBackRepair",
    params: params,
    method: "post"
  })
}

export function updateQcClothBackRepair(params){
  return axios({
    url: "/api/qcClothBackRepair",
    params: params,
    method: "put"
  })
}

export function removeQcClothBackRepair(id){
  return axios({
    url: "/api/qcClothBackRepair?repairId=" + id,
    method: "delete"
  })
}