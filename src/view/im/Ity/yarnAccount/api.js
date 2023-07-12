/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-25 14:52:23
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-16 08:56:13
 */
import axios from "axios";

export function fetchSyncStockData(){
    return axios({
        url: "/api/whseYarnsAccountTotal/sync/yarns/stock",
        method: "get",
    })
}

// 
export function fetchYarnsAccountList(params){
    return axios({
        url: "/api/whseYarnsAccount/page",
        method: "get",
        params: params
    })
}


// 根据批号物料编号获取库存出入明细数据
export function fetchYarnsAccountTotalList(params){
    return axios({
        url: "/api/whseYarnsAccountTotal/page",
        method: "get",
        params: params
    })
}