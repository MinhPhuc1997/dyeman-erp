import axios from 'axios'

/*
*    获取流程图详细信息
* */
export function fetchFlowDetail(params) {
    return axios({
        method: 'get',
        url: '/api/workflow/proc/detail',
        params
    })
}