import axios from "axios";

/* 获取我的待办数据 */
export function fetchTaskList(params) {
  return axios({
    url: "/api/workflow/task/list",
    method: "get",
    params
  });
}
/** 
* 审批操作
* @param { 意见 } message  
* @param { 1.同意  2.拒收 } result 
* @param { 任务id } taskId 
*/
export function approvalFlowTask(params) {
  return axios({
    url: "/api/workflow/follow",
    method: "get",
    params
  });
}