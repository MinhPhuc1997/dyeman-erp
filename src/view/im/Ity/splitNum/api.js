/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-25 14:52:23
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-28 09:29:09
 */
import axios from "axios";


// 根据批号物料编号获取库存出入明细数据
export function fetchInOrOutDataList(params){
    return axios({
        url: "/api/whseSplitNumDtl/whse/inOrOut",
        method: "get",
        params: params
    })
}

// 根据主键oid获取明细数据
export function fetchWhseSplitDltDataByMoid(params){
    return axios({
        url: "/api/whseSplitNumDtl/list",
        method: "get",
        params: params
    })
}

export function fetchSplitNumDataPage(params){
    return axios({
        url: "/api/whseSplitNum/page",
        method: "get",
        params: params
    })
}


export function addSplitNumData(data){
    return axios({
        url: "/api/whseSplitNum",
        method: "post",
        data: data
    })
}

export function updateSplitNumData(data){
    return axios({
        url: "/api/whseSplitNum",
        method: "put",
        data: data
    })
}

export function saveOrUpdateSplitNumDtlData(data){
    return axios({
        url: "/api/whseSplitNumDtl/batch/saveOrUpdate",
        method: "post",
        data: data
    })
}

export function removeSplitNumData(params){
    return axios({
        url: "/api/whseSplitNum",
        method: "delete",
        params: params
    })
}

