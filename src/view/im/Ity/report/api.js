import axios from "axios";

export function whseCalicoin(params) {
  return axios({
    url: "/api/whseCalicoin/wareStatData",
    method: "get",
    params: params
  });
}

export function whseChemicalin(params) {
  return axios({
    url: "/api/whseChemicalin/chemicalStatData",
    method: "get",
    params: params
  });
}

export function whseDyesalin(params) {
  return axios({
    url: "/api/whseDyesalin/dyesaStatData",
    method: "get",
    params: params
  });
}

export function whseYarnin(params) {
  return axios({
    url: "/api/whseYarnin/yarninStatData",
    method: "get",
    params: params
  });
}

export function whseFabricChangeAction(params) {
  return axios({
    url: "/api/whseFabricChangeAction/reportStatDate",
    method: "get",
    params: params
  });
}

