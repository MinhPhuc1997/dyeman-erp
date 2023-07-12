/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 16:43:52
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-02-04 08:58:27
 */

import axios from "axios";

// 获取部门列表
export function fetchDptDataList(){
    return axios({
        url: "/api/ucmlOrganize/list",
        method: "get",
    })    
}


export function fetchConfirmScrapApply(params){
    return axios({
        url: "/api/whseMatScrapApply/confirm",
        method: "get",
        params: params
    })
}


// 获取生产通知单号字典
export function fetchPoNoDictData(params){
    return axios({
        url: "/api/whseMatScrapApplyDtl/top10/poNo",
        method: "get",
        params: params
    })
}

// 获取数据
export function fetchScrapApplyData(params){
    return axios({
        url: "/api/whseMatScrapApply/page",
        method: "get",
        params: params
    })
}

// 通过主表oid获取明细数据
export function fetchDtlDataListByOid(params){
    return axios({
        url: `/api/whseMatScrapApplyDtl/list`,
        method: "get",
        params: params
    })
}

export function saveMatScrapApplyData(data){
    return axios({
        url: "/api/whseMatScrapApply",
        method: "post",
        data: data
    })
}


export function updateMatScrapApplyData(data){
    return axios({
        url: "/api/whseMatScrapApply",
        method: "put",
        data: data
    })
}

export function removeScrapApplyData(params){
    return axios({
        url: "/api/whseMatScrapApply",
        method: "delete",
        params: params
    })
}

// 批量新增明细数据
export function batchSaveOrUpdateDtlData(dataList){
    return axios({
        url: "/api/whseMatScrapApplyDtl/batch/saveOrUpdate",
        method: "post",
        data: dataList
    })
}


// 批量删除明细数据
export function batchRemoveDtla(dataList){
    return axios({
        url: "/api/whseMatScrapApplyDtl/batch/removeByIds",
        method: "post",
        data: dataList
    })
}


// 检验出仓数据
export function fetchValidOutWeight(dataList){
    return axios({
        url: `/api/whseYarnsAccountTotal/valid/usable`,
        method: "post",
        data: dataList
    })
}

// 检验出仓数据
export function fetchValidNegOutWeight(dataList){
    return axios({
        url: `/api/whseYarnsAccountTotal/valid/neg/usable`,
        method: "post",
        data: dataList
    })
}