/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-24 08:53:38
 * @Description:
 */

import axios from "axios";

/* 
*   启动流程
* @params { 业务编号 } PKey
* @params { 生产外键 } busKey
* @params { 用户 } UserName
* */
export function startWorkFlow(params){
  return axios({
    url: "/api/workflow/start/act/ins",
    method: "get",
    params: params
  })
}

// 拆缸通知单
export function createProConvertVatNoticeData(data) {
  return axios({
    url: "/api/proConvertVatNotice",
    method: "post",
    data
  });
}


export function fetchQcCheckoutFabricByPage(params) {
  return axios({
    url: "/api/qcCheckoutFabric/page",
    method: "get",
    params: params
  });
}

// 获取R缸改染 字典
export function fetchDictByUpdateVat(params){
  return axios({
    url: "/api/proBleadyeRunJob/dict/gst/key",
    method: "get",
    params: params
  });
}

// 改染R缸
export function fetchUpdateRVatData(data){
  return axios({
    url: "/api/proBleadyeRunJob/r/vat/update",
    method: "put",
    data: data
  });
}


// 拆单明细
export function fetchQcCheckClothDayDetailCardData(params) {
  return axios({
    url: "/api/qcCheckClothDayDetailCard/list",
    method: "get",
    params: params
  });
}

// 未拆缸异常单
export function fetchVQcCheckClothForDivdvat(params){
  return axios({
    url: `/api/vQcCheckClothForDivdvat/page`,
    method: "get",
    params
  }); 
}

// 修改
export function updateFinishedBySplitVat(data) {
  return axios({
    url: "/api/proFinalProductCard/changeVatNo",
    method: "post",
    data
  });
}

//  获取生产通知单信息
export function fetchProGstPoData(params){
  return axios({
    url: "/api/gstPo/page",
    method: "get",
    params
  }); 
}

// 拆单时，检查是新生产通知单号的是颜色及面料是否一致
export function fetchColorBySalPoNo(params){
  return axios({
    url: `/api/proBleadyeRunJob/check/color/BySalPoNo`,
    method: "get",
    params
  }); 
}

//  获取下栏信息
export function fetchProBleadyeRunJobFlatData(params){
    return axios({
      url: `/api/proBleadyeRunJobFlat`,
      method: "get",
      params
    }); 
}
//  新增下栏信息
export function createProBleadyeRunJobFlatData(params){
    return axios({
      url: `/api/proBleadyeRunJobFlat`,
      method: "post",
      params
    }); 
}
//  修改下栏信息
export function updateProBleadyeRunJobFlatData(params){
    return axios({
      url: `/api/proBleadyeRunJobFlat`,
      method: "put",
      params
    }); 
}
//  删除下栏信息
export function removeProBleadyeRunJobFlatData(id){
    return axios({
      url: `/api/proBleadyeRunJobFlat?platId=` + id,
      method: "delete"
    }); 
}
// 根据织单号获取 [纱缸]，[纱牌]，[纱批]
export function fetchJobYarnInfoDataByWeaveCodeId(weaveCodeId){
  return axios({
    url: "/api/proWeaveJobYarn/info/byWeaveCodeId/" + weaveCodeId,
    method: "get",
  }); 
}

//改缸号 
export function fetchUpdateVatNoByType (type,vatNo){
  return axios({
    url: `/api/proBleadyeRunJob/update/vatNo/${type}/${vatNo}`,
    method: "put",
  }); 
}

//  获取新缸号（拆缸）
export function fetchSpliteVatNo(type,vatNo){
  return axios({
    url: `/api/proBleadyeRunJob/create/split/vatNo/${type}/${vatNo}`,
    method: "get",
  }); 
}

// 根据生产单号、布料描述、颜色名称带出 信息"
export function fetchBleadyQtyDataByPoNo(params){
  return axios({
    url: "/api/proBleadyeRunJob/qty/byPoNo",
    method: "get",
    params
  }); 
}

// 获取开发待排染整运转单
export function fetchDevUnCreateRunJobDataListByPage(params){
  return axios({
    url: "/api/proBleadyeRunJob/unCreate/tsm/page",
    method: "get",
    params
  }); 
}

// 获取待排染整运转单
export function fetchUnCreateRunJobDataListByPage(params){
  return axios({
    url: "/api/proBleadyeRunJob/unCreate/page",
    method: "get",
    params
  }); 
}

// 删除生产排期数据
export function removeProSalScheduleDetailData(detailId){
  return axios({
    url: "/api/proSalScheduleDetail?detailId=" + detailId,
    method: "delete"
  });
}


// 更新生产排期数据
export function updateProSalScheduleDetailData(params){
  return axios({
    url: "/api/proSalScheduleDetail",
    method: "put",
    params: params
  });
}


// 新增生产排期数据
export function createProSalScheduleDetailData(params){
  return axios({
    url: "/api/proSalScheduleDetail",
    method: "post",
    params: params
  });
}

// 获取生产排期数据
export function fetchProSalScheduleDetailData(params){
  return axios({
    url: "/api/proSalScheduleDetail",
    method: "get",
    params: params
  });
}


// 获取颜色颜色选择数据
export function fetchColorSelectData(params){
  return axios({
    url: "/api/proWeaveJob/color/select/byWeaveCode",
    method: "get",
    params: params
  });
}

// 获取测试标准缺省数据数据
export function fetchTestStandardData(params){
  return axios({
    url: "/api/proWeaveJob/test/standard/byPoNo",
    method: "get",
    params: params
  });
}



// 修改
export function updateFinished(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "put",
    params: data
  });
}

// 查询织单
export function getFinishList(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

export function getCodeValue(code) {
  return axios({
    url: "/api/baseEquipmentCategoryList?parentId=dev-12&categoryCode=" + code,
    method: "get"
  });
}

// 查询织单
export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

// 查询漂染单
export function getDye(params) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "get",
    params: params
  });
}
// 修改
export function updateDye(data) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "put",
    params: data
  });
}
export function addDye(data) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "post",
    params: data
  });
}

export function addProject(data) {
  return axios({
    url: "/api/proBleadyeJobItem",
    method: "post",
    params: data
  });
}
export function addDyeProject(data) {
  return axios({
    url: "/api/proBleadyeJobItem",
    method: "post",
    params: data
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
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

export function fetchProBleadyeRunJobDataPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/list/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proBleadyeRunJob?runJobId=" + id,
    method: "delete"
  });
}

export function delDye(id) {
  return axios({
    url: "/api/proBleadyeJob?bleadyeJobId=" + id,
    method: "delete"
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

// 修改入仓记录
export function updateInwhse(data) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/updateById",
    method: "put",
    params: data
  });
}

export function getBf(params) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "get",
    params: params
  });
}

// 新增
export function addBf(data) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "post",
    params: data
  });
}

// 修改
export function updateBf(data) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "put",
    params: data
  });
}

// 修改
export function delbf(id) {
  return axios({
    url: "/api/proBleadyeRunJobCalico?recId=" + id,
    method: "delete"
  });
}

export function getTest(params) {
  return axios({
    url: "/api/proBleadyeRunJobTest",
    method: "get",
    params: params
  });
}

// 新增
export function addTest(data) {
  return axios({
    url: "/api/proBleadyeRunJobTest",
    method: "post",
    params: data
  });
}
export function addDyeTest(data) {
  return axios({
    url: "/api/proBleadyeJobTest",
    method: "post",
    params: data
  });
}

// 修改
export function updateTest(data) {
  return axios({
    url: "/api/proBleadyeRunJobTest",
    method: "put",
    params: data
  });
}

// 修改
export function deltest(id) {
  return axios({
    url: "/api/proBleadyeRunJobTest?jobTestId=" + id,
    method: "delete"
  });
}

export function getItem(params) {
  return axios({
    url: "/api/proBleadyeRunJobItem",
    method: "get",
    params: params
  });
}

// 新增
export function addItem(data) {
  return axios({
    url: "/api/proBleadyeRunJobItem",
    method: "post",
    params: data
  });
}

// 修改
export function updateItem(data) {
  return axios({
    url: "/api/proBleadyeRunJobItem",
    method: "put",
    params: data
  });
}

// 修改
export function delitem(id) {
  return axios({
    url: "/api/proBleadyeRunJobItem?itemId=" + id,
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

export function getGroup(params) {
  return axios({
    url: "/api/proWeaveJobGroup",
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


// // 打印
// export function printProBleadyeRunJob(id) {
//   return axios({
//     url: "/api/proBleadyeRunJob/createBleadyeRunJobPdf?UserName=ADMIN&id=" + id,
//     method: "get",
//     responseType: "arraybuffer",
//     headers: {
//       UserName: "ADMIN"
//     }
//   });
// }

// printProBleadyeRunJob(this.detail.runJobId).then(res => {
//   let URL = window.URL || window.webkitURL;
//   const blob = new Blob([res.data], { type:'application/pdf;charset=utf-8' });
//   this.pdfUrl = URL.createObjectURL(blob);
//   this.pdfDlg = true;
//   this.isExhaust = false;
// })