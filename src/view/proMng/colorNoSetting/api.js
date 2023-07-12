/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-04 14:34:55
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-04 16:01:59
 */
import axios from "axios";


export function fetchColorNoDataList(params) {
    return axios({
      url: "/api/gstPoverDtlx/list",
      method: "get",
      params: params
    });
  }

export function batchUpdateColorNoData(data){
    return axios({
        url: "/api/gstPoverDtlx/batch/update/colorNo",
        method: "put",
        data: data
      });
}
