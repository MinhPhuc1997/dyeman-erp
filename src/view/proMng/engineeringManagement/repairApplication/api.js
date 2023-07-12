import axios from 'axios';

export function startEngMaintenanceTaskInst(params) {
  return axios({
    url: '/api/engMaintenanceTask/proc/inst',
    method: 'get',
    params: params
  })
}


export function fetchEngMaintenanceTask(params) {
    return axios({
      url: '/api/engMaintenanceTask/page',
      method: 'get',
      params: params
    })
}
  
  // 新增
  export function createEngMaintenanceTaskData(data) {
    return axios({
      url: '/api/engMaintenanceTask',
      method: 'post',
      params: data
    })
  }
  
  // 修改
  export function updateEngMaintenanceTaskData(data) {
    return axios({
      url: '/api/engMaintenanceTask',
      method: 'put',
      params: data
    })
  }
  
  // 修改
  export function removeEngMaintenanceTaskData(id) {
    return axios({
      url: '/api/engMaintenanceTask?taskId=' + id,
      method: 'delete',
    })
  }