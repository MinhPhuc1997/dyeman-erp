/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 16:43:52
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-12 11:15:12
 */

import axios from "axios";


export function fetchConfirmPreAlloc(params){
    return axios({
        url: "/api/whseYarnPreAlloc/confirm",
        method: "get",
        params: params
    })
}


// 获取生产通知单号字典
export function fetchPoNoDictData(params){
    return axios({
        url: "/api/whseYarnPreAllocDtl/top10/poNo",
        method: "get",
        params: params
    })
}

// 获取数据
export function fetchYarnPreAllocData(params){
    return axios({
        url: "/api/whseYarnPreAlloc/page",
        method: "get",
        params: params
    })
}

// 通过主表oid获取明细数据
export function fetchDtlDataListByOid(params){
    return axios({
        url: `/api/whseYarnPreAllocDtl/list`,
        method: "get",
        params: params
    })
}

export function saveYarnPreAllocData(data){
    return axios({
        url: "/api/whseYarnPreAlloc",
        method: "post",
        data: data
    })
}


export function updateYarnPreAllocData(data){
    return axios({
        url: "/api/whseYarnPreAlloc",
        method: "put",
        data: data
    })
}

export function removeYarnPreAllocData(params){
    return axios({
        url: "/api/whseYarnPreAlloc",
        method: "delete",
        params: params
    })
}

// 批量新增明细数据
export function batchSaveOrUpdateDtlData(dataList){
    return axios({
        url: "/api/whseYarnPreAllocDtl/batch/saveOrUpdate",
        method: "post",
        data: dataList
    })
}


// 批量删除明细数据
export function batchRemoveDtla(dataList){
    return axios({
        url: "/api/whseYarnPreAllocDtl/batch/removeByIds",
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