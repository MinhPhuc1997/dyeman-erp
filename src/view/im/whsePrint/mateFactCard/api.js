/*
 * @Author: Lyl
 * @Date: 2022-09-24 14:12:05
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-24 16:22:35
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\api.js
 * @Description: 
 */
import axios from 'axios';
import store from '@/store/index'
// 获取送货单号/纱线批号
export function fetchCommonInterfaceNo(_methodName, BPOName) {
  let params = {
    _bpoName: "BPO_CommonInterface" + "Service", //BPO的名字(拥有那个服务端函数的BPO)
    _methodName, //服务端函数名
    // _parameters: { BPOName: "BPO_Pur_Delivery_Main", Parameters: [{}]},  //函数的参数值,如果没有参数则为空
    '_parameters[BPOName]': BPOName, // "BPO_Pur_Delivery_Main2", // BPOName,
    '_parameters[Parameters]': `[{ \"cmp_id\": \"${store.state.orgData.ucmlOrganizeoid}\" }]`, // `"[{'cmp_id': '"}]"`,  //JSON.stringify(`[{:${store.state.orgData.ucmlOrganizeoid}}]`),
    _paraNames: "BPOName,Parameters", //函数的参数名称,如果没有参数则为空
    _pUrl: "", //浏览器地址后面的参数,不填写
    _classFullName: "" //回调方法名,大概?  不填写
  };
  return axios({
    method: "post",
    url: "/UCMLWebServiceEntryForJs.aspx",
    params,
    headers: {
      'ignoreBaseUrl': true,
      // "Access-Control-Allow-Methods": "*"
    },
  })
}

// 获取送货单
export function fetchNewDeliNoData(data) {
  return axios({
    url: "/UCMLWebServiceEntryForJs.aspx",
    method: "post",
    data
  })
}
// 获取进度信息
export function fetchPurSinglescheduleData(params) {
  return axios({
    url: "/api/purSingleschedule",
    method: "get",
    params
  })
}

// 新增进度信息
export function createPurSinglescheduleData(params) {
  return axios({
    url: "/api/purSingleschedule",
    method: "post",
    params
  })
}
// 新增送货单资料
export function createDeliOrderData(params) {
  return axios({
    url: "/api/purDelivery",
    method: "post",
    params
  })
}
// 新增送货单明细资料
export function createDeliOrderDtlData(params) {
  return axios({
    url: "/api/purDelisingleDtla",
    method: "post",
    params
  })
}

//  修改申购采购订单信息
export function updatePurSinglepoData(params) {
  return axios({
    url: "/api/purSinglepo",
    method: "put",
    params
  });
}

//  获取申购采购订单信息
export function fetchPurSinglepoByPage(params) {
  return axios({
    url: "/api/purSinglepo/page",
    method: "get",
    params
  });
}


//  获取申购采购订单明细
export function fetchPurSinglepoDtlData(params) {
  return axios({
    url: "/api/purSinglepoDtl",
    method: "get",
    params
  });
}


//  获取供应商信息
export function fetchBasSupplierData(params) {
  return axios({
    url: "/api/basSupplier",
    method: "get",
    params
  });
}



//  获取送货单明细
export function fetchPurDeliveryDtlData(params) {
  return axios({
    url: "/api/purDelisingleDtla/page",
    method: "get",
    params
  });
}


//  获取送货单
export function fetchPurDeliveryData(params) {
  return axios({
    url: "/api/purDelivery/page",
    method: "get",
    params
  });
}


//  获取化工原料信息
export function fetchBasChemicalmatNewData(params) {
  return axios({
    url: "/api/BasChemicalmatNew/page",
    method: "get",
    params
  });
}

//  获取染料信息
export function fetchBasPigmentData(params) {
  return axios({
    url: "/api/basPigment/page",
    method: "get",
    params
  });
}


//  获取下栏码卡信息
export function fetchWhseMateFactCardData(params) {
  return axios({
    url: `/api/whseMateFactCard/page`,
    method: "get",
    params
  });
}
//  新增下栏码卡信息
export function createWhseMateFactCardData(params) {
  return axios({
    url: `/api/whseMateFactCard`,
    method: "post",
    params
  });
}
//  修改下栏码卡信息
export function updateWhseMateFactCardData(params) {
  return axios({
    url: `/api/whseMateFactCard`,
    method: "put",
    params
  });
}

//  删除下栏码卡信息
export function removeWhseMateFactCardData(id) {
  return axios({
    url: `/api/whseMateFactCard?mcardId=` + id,
    method: "delete"
  });
}


//  获取下栏信息
export function fetchProBleadyeRunJobFlatData(params) {
  return axios({
    url: `/api/proBleadyeRunJobFlat`,
    method: "get",
    params
  });
}
//  新增下栏信息
export function createProBleadyeRunJobFlatData(params) {
  return axios({
    url: `/api/proBleadyeRunJobFlat`,
    method: "post",
    params
  });
}
//  修改下栏信息
export function updateProBleadyeRunJobFlatData(params) {
  return axios({
    url: `/api/proBleadyeRunJobFlat`,
    method: "put",
    params
  });
}

//  删除下栏信息
export function removeProBleadyeRunJobFlatData(id) {
  return axios({
    url: `/api/proBleadyeRunJobFlat?platId=` + id,
    method: "delete"
  });
}
