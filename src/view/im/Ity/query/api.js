import axios from "axios";

export function getProclothNotePage(params){
    return axios({
        url: "/api/proClothNote/pages",
        method: "get",
        params: params
    })
}

export function getWhseMaterialPage(params){
  return axios({
    url: "/api/whseMaterial/page",
    method: "get",
    params: params
  })
}

export function getWhseMaterialDla(params){
  return axios({
    url: "/api/whseMaterialDla",
    method: "get",
    params: params
  })
}

export function getWhseMaterialDlb(params){
  return axios({
    url: "/api/whseMaterialDlb",
    method: "get",
    params: params
  })
}

export function getProBleadyeRunJob(params){
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  })
}

export function getProBleadyeRunJobCalico(params){
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "get",
    params: params
  })
}

export function getproClothNotePage(params){
  return axios({
    url: "/api/proClothNote/page",
    method: "get",
    params: params
  })
}

export function getProWeaveJobPage(params){
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  })
}

export function getclothNoteInStorage(params){
  return axios({
    url: "/api/clothNoteInStorage/page",
    method: "get",
    params: params
  })
}

export function getClothNoteInStorage(params){
  return axios({
    url: "/api/clothNoteInStorage",
    method: "get",
    params: params
  })
}

export function getclothNoteOutStorage(params){
  return axios({
    url: "/api/clothNoteOutStorage/page",
    method: "get",
    params: params
  })
}

export function getClothNoteOutStorage(params){
  return axios({
    url: "/api/clothNoteOutStorage",
    method: "get",
    params: params
  })
}


export function getproClothNoteHis(params){
  return axios({
    url: "/api/proClothNoteHis",
    method: "get",
    params: params
  })
}

export function getProClothNoteInvHis(params){
  return axios({
    url: "/api/proClothNoteInvHis",
    method: "get",
    params: params
  })
}








