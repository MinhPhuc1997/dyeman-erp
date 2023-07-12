/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-20 15:52:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-20 17:19:06
 */

import axios from "axios";

export function fetchProBatchColorLedgerViewByPage(params){
    return axios({
      url:"/api/proAppColorRec/viewAppColoRec",
      params: params,
      method: "get"
    })
  }


export function fetchQcCheckClothDayDetailByPage(params){
    return axios({
      url:"/api/qcCheckClothDayDetail/page",
      params: params,
      method: "get"
    })
  }
  