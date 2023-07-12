/*
 * @Author: Lyl
 * @Date: 2022-09-24 14:12:05
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-24 16:22:35
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\api.js
 * @Description: 
 */
import axios from 'axios';

//  获取下栏码卡信息
export function fetchProProductFlatCardData(params){
    return axios({
      url: `/api/proProductFlatCard/page`,
      method: "get",
      params
    }); 
}
//  新增下栏码卡信息
export function createProProductFlatCardData(params){
    return axios({
      url: `/api/proProductFlatCard`,
      method: "post",
      params
    }); 
}
//  修改下栏码卡信息
export function updateProProductFlatCardData(params){
    return axios({
      url: `/api/proProductFlatCard`,
      method: "put",
      params
    }); 
}

//  删除下栏码卡信息
export function removeProProductFlatCardData(id){
    return axios({
      url: `/api/proProductFlatCard?fcardId=` + id,
      method: "delete"
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