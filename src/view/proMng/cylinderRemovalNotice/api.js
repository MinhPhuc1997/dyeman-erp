/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-04 14:34:55
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-04 16:01:59
 */
import axios from "axios";


export function fetchProConvertVatNotice(params) {
    return axios({
      url: "/api/proConvertVatNotice/page",
      method: "get",
      params: params
    });
}


export function fetchProConvertVatDetail(params) {
  return axios({
    url: "/api/proConvertVatDetail",
    method: "get",
    params: params
  });
}
