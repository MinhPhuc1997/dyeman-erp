import axios from 'axios'

export function fetchPurDeliveryData(params) {
    return axios({
        url: '/api/purDelivery/page',
        method: 'get',
        params
    })
}

export function fetchPurDelisingleDtlaData(params) {
    return axios({
        url: '/api/purDelisingleDtla',
        method: 'get',
        params
    })
}