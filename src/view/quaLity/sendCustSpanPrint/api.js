/*
 * @Author: Lyl
 * @Date: 2022-09-24 14:12:05
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-24 16:22:35
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\api.js
 * @Description: 
 */
import axios from 'axios';


//  获取缸号信息
export function fetchRunJobData(params){
  return axios({
    url: `/api/proBleadyeRunJob/page`,
    method: "get",
    params
  }); 
}

//  获取样板标签信息
export function fetchProLableCardData(params){
    return axios({
      url: `/api/proLableCard/page`,
      method: "get",
      params
    }); 
}
//  新增样板标签信息
export function createProLableCardData(params){
    return axios({
      url: `/api/proLableCard`,
      method: "post",
      params
    }); 
}
//  修改样板标签信息
export function updateProLableCardData(params){
    return axios({
      url: `/api/proLableCard`,
      method: "put",
      params
    }); 
}

//  删除样板标签信息
export function removeProLableCardData(id){
    return axios({
      url: `/api/proLableCard?labelId=` + id,
      method: "delete"
    }); 
}

