import axios from 'axios';

export  function fetchLogData(params) {
    return axios({
        url: '/api/proDptReciveLog/page/last',
        method: 'get',
        params
    })
}

// 修改
export function updateLogData(data) {
    return axios({
      url: "/api/proDptReciveLog",
      method: "put",
      params: data
    });
  }
  