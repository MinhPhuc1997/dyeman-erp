/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-23 10:36:15
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-17 10:20:12
 */
import axios from "axios";

// 添加出仓主表记录
export function addOutWhse(data) {
    return axios({
      url: "/api/whseMaterial",
      method: "post",
      params: data
    });
  }
  
  // 添加出仓明细记录
  export function addOutWhseDla(data) {
    return axios({
      url: "/api/whseMaterialDla",
      method: "post",
      params: data
    });
  }
  
  // 添加出仓批号记录
  export function addOutWhseDlb(data) {
    return axios({
      url: "/api/whseMaterialDlb",
      method: "post",
      params: data
    });
  }
  

// 删除胚布记录
export function delCalico(id) {
    return axios({
      url: "/api/proBleadyeRunJobCalico?recId="  + id ,
      method: "delete"
    });
}

// 添加胚布记录
export function addCalico(data) {
return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "post",
    params: data
});
}
  
  // 修改佈飛记录
  export function updateNote(data) {
    return axios({
      url: "/api/proClothNote",
      method: "put",
      params: data
    });
  }
  
  // 新增佈飛记录
  export function addNote(data) {
    return axios({
      url: "/api/proClothNote/cpn",
      method: "post",
      params: data
    });
  }
  
// 新增入仓记录
export function addInWhse(data) {
    return axios({
      url: '/api/whseCalicoin/v1.0/save',
      method: 'post',
      params: data
    })
  }
  
  
  // 新增入仓明细
  export function addInDtla(data) {
    return axios({
      url: '/api/whseCalicoinDtla/v1.0/save',
      method: 'post',
      params: data
    })
  }
  
  // 新增入仓批号资料
  export function addInDtlb(data) {
    return axios({
      url: '/api/whseCalicoinDtlb/v1.0/save',
      method: 'post',
      params: data
    })
  }

  
// 获取织单信息
export function fetchProWeaveJobData(params) {
    return axios({
      url: "/api/proWeaveJob",
      method: "get",
      params: params,
    });
}



// 获取胚布信息
export function fetchProNoteCodeData(params) {
    return axios({
      url: "/api/proClothNote/page",
      method: "get",
      params: params,
    });
}

// 获取缸号投缸胚布
export function fetchProBleadyeRunJobCalicoData(params) {
    return axios({
      url: "/api/proBleadyeRunJobCalico",
      method: "get",
      params: params,
    });
}

  
// 获取fineReport路径接口
export function fetchFineReportUrl(params) {
  return axios({
    url: "/api/basFinereporturl/finereport/detail",
    method: "get",
    params:params
  });
}

// 获得拆缸后的重量
export function fetchProBleadyeRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params,
  });
}

