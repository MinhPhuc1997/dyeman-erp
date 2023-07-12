/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 16:43:52
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-28 10:56:48
 */

import axios from "axios";


// 获取数据
export function fetchClothInvDiffData(params){
    return axios({
        url: "/api/whseClothInvDiff/page",
        method: "get",
        params: params
    })
}

// 通过主表oid获取明细数据
export function fetchDtlDataListByOid(params){
    return axios({
        url: `/api/whseClothInvDiffDfl/page`,
        method: "get",
        params: params
    })
}
