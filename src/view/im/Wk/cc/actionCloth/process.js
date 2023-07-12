import axios from "axios";

export const checkResultPage = (object) => {
  try {
    let {total, pages, records} = object.data;

    if (total === 0) {
      return RequestResult(false, total, pages, records, "Không tìm thấy kết quả tra cứu--找不到数据");
    } else {
      records.map((e, i) => {
        e.index = i + 1
      });
      return RequestResult(true, total, pages, records, "ok");
    }
  } catch (e) {
    return RequestResult(false, 0, 0, [], e.toString());
  }
}

export const checkResult = (object) => {
  try {
    if (object.data.length === 0) {
      return {success: false, msg: "Không tìm thấy kết quả tra cứu--找不到数据"};
    } else {
      return {success: true, data: object.data};
    }
  } catch (e) {
    return {success: false, msg: e.toString()};
  }
}

export const RequestResult = (success, total, pages, records, msg) => {
  let object = {
    success: success,
    total: total,
    pages: pages,
    records: records,
    msg: msg
  }
  return object;
}

export const checkVatNoNotSelect = (object) => {
  if (object.length === 0) {
    return {success: false, msg: "Vui lòng chọn mã hàng--请选择缸号"};
  } else {
    return {success: true, msg: ""};
  }
}

export const getInforArray = (arr) => {
  let sumWeight = 0;
  let sumWeightLbs = 0;
  arr.map((e, i) => {
    sumWeight = sumWeight + e.netWeight;
    sumWeightLbs = sumWeightLbs + e.netWeightLbs;
  })
  return {
    pidCount: arr.length,
    sumWeight: sumWeight,
    sumWeightLbs: sumWeightLbs
  }
}

export const hideArrayElement = (arr, hideArr) => {
  let resultArr = [];
  arr.map((e) => {
    if (hideArr.findIndex((el) => el.productNo === e.productNo) === -1) {
      resultArr.push(e);
    }
  });
  return resultArr;
}

export const checkListBeforeSave = (list, fk) => {
  let newArr = [];
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    console.log(item.storeLoadCode)
    if (item.storeLoadCode === undefined || item.storeLoadCode === "") {
      return {success: false, msg: "Vui lòng kiểm tra lại mã pallet ở vị trí số " + item.index + "! -- 请重新载具编号"};
    }
    if (item.clothOutDtlbs.length === 0) {
      return {success: false, msg: "Pallet " + item.storeLoadCode + " chưa chọn vải -- 成品布出倉批號資料"};
    }
    let arrChildren = [];
    item.clothOutDtlbs.map((e) => {
      arrChildren.push({
        productCardFk: e.productId,
        prodNo: e.prodNo,
        // productCardFk:e.productCardFk,
        productNo: e.productNo,
        // storeLoadCode:e.storeLoadCode,
        woUnit: e.weightUnit,
        woWeights: e.netWeight,
        woWeightsLbs: e.netWeightLbs
      })
    })
    newArr.push({
      clothOutDtlbs: arrChildren,
      storeLoadCode: item.storeLoadCode,
      whseFinishedclothinDtlFk: fk,
    })
  }
  return {success: true, data: newArr};
}

export const convertImportData = (list) => {
  let newArr = [];
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let arrChildren = [];
    item.detail.map((e) => {
      arrChildren.push({
        pidNo: e.pidNo,
        productDtlFk: "string",
        productId: e.productId,
        productNo: e.productNo,
        vatNo: e.vatNo,
        weight: e.netWeight,
        weightLbs: e.netWeightLbs,
        weightUnit: e.weightUnit
      })
    });
    newArr.push({
      packageDtls: arrChildren,
      storeLoadCode: item.storeLoadCode,
    })
  }
  return {success: true, data: newArr};
}


export const getArrayDetailExport = (arr, arrData, name) => {
  //get list store code
  //get detail base on list store code
  arr = arr.filter((item) => item.storeLoadCode === name);
  console.log(name, arr);
  if (arr == null || arr.length === 0) {
    return {success: false, msg: "Không nhận dạng được dữ liệu trả kho 1"};
  }
  if (arrData.length === 0) {
    return {success: false, msg: "Không nhận dạng được dữ liệu xuất đi"};
  }
  let listStoreCode = [];
  arr.map((e) => {
    if (listStoreCode.findIndex((item) => item.value === e.fromStoreCode) === -1) {
      listStoreCode.push({value: e.fromStoreCode})
    }
  });
  if (listStoreCode.length === 0) {
    return {success: false, msg: "Lỗi không tìm thấy mã pallet"};
  }
  let detailArr = [];
  arrData.map((e) => {
    if (listStoreCode.findIndex((item) => item.value === e.storeLoadCode) > -1) {
      e.clothOutDtlbs.map((item) => {
        let obj = {
          fromStore: e.storeLoadCode,
          productNo: item.productNo,
          pidNo: item.pidNo,
          netWeight: item.netWeight,
          netWeightLbs: item.netWeightLbs,
          weightUnit: item.weightUnit,
        }
        detailArr.push(obj);
      })
    }
  })
  detailArr.map((e, i) => e.index = i + 1);
  return {success: true, data: detailArr};
}

export const getArrayDetailImport = (arr, name) => {
  if (arr == null) {
    return {success: false, msg: "Không nhận dạng được dữ liệu trả kho 2"};
  }
  let detailArr = [];
  arr = arr.filter((item) => item.storeLoadCode === name);
  arr.map((e, i) => {
    e.detail.map((item) => {
      let obj = {
        storeLoadCode: e.storeLoadCode,
        fromStore: e.fromStoreCode,
        productNo: item.productNo,
        pidNo: item.pidNo,
        netWeight: item.netWeight,
        netWeightLbs: item.netWeightLbs,
        weightUnit: item.weightUnit,
      }
      detailArr.push(obj);
    })
  });
  detailArr.map((e, i) => e.index = i + 1);
  return {success: true, data: detailArr};
}

export const checkSelectStore = (data) => {
  console.log(data)
  if (data.total === 0) {
    return {success: false, msg: "Pallet này chưa có dữ liệu nhập kho 这个载具编号还没入库！"}
  }
  if (data.total > 1) {
    let arr = [];
    data.records.map((e) => {
      if (arr.findIndex((item) => item.whseFinishedclothinoid === e.whseFinishedclothinoid) === -1) {
        arr.push({whseFinishedclothinoid: e.whseFinishedclothinoid});
      }
    })
    if (arr.length === 1) {
      return {success: true, data: arr};
    } else {
      let sumWeight = data.records[0].sumWeight;
      let pidCount = data.records[0].pidCount;
      let sumWeightLbs = data.records[0].sumWeightLbs;
      for (let i = 0; i < data.records.length; i++) {
        let item = data.records[i];
        if (item.sumWeight != sumWeight || item.pidCount != pidCount || item.sumWeightLbs != sumWeightLbs) {
          return {success: false, msg: "Hệ thống xuất hiện BUG có " + data.total + " giá trị nhập kho 系统异常联系IT！"}
        }
      }
      let dataSort = data.records;
      dataSort.sort((a, b) => {
        return a.yinDate > b.yinDate ? -1 : 1
      });
      return {success: true, data: dataSort[0]};
    }
  }
  return {success: true, data: data.records};
}

export const queryParms = (object, raw, page) => {
  let result = {}
  let data = Object.keys(object).filter(key => typeof object[key]!="object" && object[key] !== "" && object[key]!="undefined");
  data.map((e) => {
    let obj = {};
    if (e.indexOf("$") === -1) {
      if (raw.includes(e)) {
        obj[e] = object[e];
      } else {
        obj[e] = "%" + object[e];
      }
      Object.assign(result, obj)
    }
  })
  if (page != null) {
    result = Object.assign({
      rows: page.pageSize,
      start: page.currentPage
    }, result)
  }
  return result
}

export const SaveParms = (object) => {
  let result = {}
  let data = Object.keys(object).filter(key => object[key] !== "" && object[key]!="undefined");
  data.map((e) => {
    let obj = {};
    if (e.indexOf("$") === -1) {
      obj[e] = object[e];
      Object.assign(result, obj)
    }
  })
  return result
}

export const queryParmsV1 = (object, raw, page, leftRight) => {
  let result = {}
  let data = Object.keys(object).filter(key => object[key] !== "");
  data.map((e) => {
    let obj = {};
    if (e.indexOf("$") === -1) {
      if (raw.includes(e)) {
        obj[e] = object[e];
      } else {
        if (leftRight.includes(e)) {
          obj[e] = "%" + object[e] + "%";
        } else {
          obj[e] = "%" + object[e];
        }
      }
      Object.assign(result, obj)
    }
  })
  if (page != null) {
    result = Object.assign({
      rows: page.pageSize,
      start: page.currentPage
    }, result)
  }
  return result
}

export const queryParmsEx = (object, raw, date, page) => {
  let result = {}
  let data = Object.keys(object).filter(key => object[key] !== "" && typeof object[key] !=='undefined');
  data.map((e) => {
    if (e != date) {
      let obj = {};
      if (e.indexOf("$") === -1) {
        if (raw.includes(e)) {
          obj[e] = object[e];
        } else {
          obj[e] = "%" + object[e].toString().trim() + "%";
        }
        Object.assign(result, obj)
      }
    }

  })
  if (page != null) {
    result = Object.assign({
      rows: page.pageSize,
      start: page.currentPage
    }, result)
  }
  return result
}

export const queryParmsNew = (object, raw, page) => {
  let result = {}
  let data = Object.keys(object).filter(key =>  typeof object[key]!="object" && object[key] !== "" && object[key]!="undefined");
  data.map((e) => {
      let obj = {};
      if (e.indexOf("$") === -1) {
        if (raw.includes(e)) {
          obj[e] = object[e];
        } else {
          obj[e] = "%" + object[e].trim() + "%";
        }
        Object.assign(result, obj)
      }
  })
  if (page != null) {
    result = Object.assign({
      rows: page.pageSize,
      start: page.currentPage
    }, result)
  }
  return result
}

export const queryParmsV2 = (object) => {
  let result = {}
  let data = Object.keys(object).filter(key =>  typeof object[key]!="object" && object[key] !== "" && object[key]!="undefined");
  data.map((e) => {
    let obj = {};
    if (e.indexOf("$") === -1) {
      obj[e] =  object[e].trim() ;
      Object.assign(result, obj)
    }
  })
  return result
}
export const totalData = (arr) => {
  let pidCount = arr.length;
  let sumWeight = 0;
  let sumWeightLbs = 0;
  let sumLength = 0;
  arr.map((e, i) => {
    sumWeight = sumWeight + Number(e.netWeight);
    sumWeightLbs = sumWeightLbs + Number(e.netWeightLbs);
    sumLength = sumLength + Number(e.yardLength)
  })
  return {
    pidCount: pidCount,
    sumWeight: sumWeight,
    sumWeightLbs: sumWeightLbs,
    sumLength: sumLength
  }
}

export const resultCompare = (data) => {
  let a = data[0];
  let b = data[1];
  let c = data[2];
  c.pidCount = a.pidCount === b.pidCount ? "OK" : "NOT OK";

  c.sumWeight = a.sumWeight === b.sumWeight ? "OK" : "NOT OK";
  c.sumWeightLbs = a.sumWeightLbs === b.sumWeightLbs ? "OK" : "NOT OK";
  c.sumLength = a.sumLength === b.sumLength ? "OK" : "NOT OK";
}

export const resultDetail = (listA, listB) => {
  let arr = [];
  let list = ((listA.length - listB.length) > 0) ? listA : listB;
  let listv = ((listA.length - listB.length) > 0) ? listB : listA
  if (listv.length === 0) {
    return list;
  }

  list.map((e, i) => {
    let b = listv[listv.findIndex((item) => item.productNo === e.productNo)]
    if (!compare(e, b)) {
      arr.push(e);
    }
  })

  return arr;
}

export const compare = (a, b) => {
  if (a.netWeight !== b.netWeight) {
    return false;
  }
  if (a.netWeightLbs !== b.netWeightLbs) {
    return false;
  }
  if (a.yardLength !== b.yardLength) {
    return false;
  }
  if (a.pidNo !== b.pidNo) {
    return false;
  }
  if (a.grossWeight !== b.grossWeight) {
    return false;
  }
  if (a.grossWeightLbs !== b.grossWeightLbs) {
    return false;
  }
  return true;
}

export const checkStatus = (object) => {
  if (object.pidCount === "NOT OK") {
    return false
  }
  if (object.sumWeight === "NOT OK") {
    return false
  }
  if (object.sumWeightLbs === "NOT OK") {
    return false
  }
  if (object.sumLength === "NOT OK") {
    return false
  }
  return true;
}

export const compensation = (sheet_data) => {
  let end = false
  let arr = [];
  if (sheet_data.length > 0) {
    console.log("here", sheet_data.length)
    for (let row = 1; row < sheet_data.length; row++) {
      if (sheet_data[row][1] != undefined || sheet_data[row][1] != null ||
        sheet_data[row][2] != undefined || sheet_data[row][2] != null ||
        sheet_data[row][3] != undefined || sheet_data[row][3] != null) {
        let obj = {
          vatNo: sheet_data[row][1],
          pidNo: sheet_data[row][2],
          netWeight: sheet_data[row][3],
          grossWeight: sheet_data[row][4],
          storeLoad: sheet_data[row][5],
          storeLocal: sheet_data[row][6],
          yardLength: sheet_data[row][7]
        }
        arr.push(obj)
      }
    }
  }
  return arr
}

export const readKaneTop = (sheet_data) => {
  let arr = [];
  let sum = [];
  let end = false
  if (sheet_data.length > 0) {
    let p_vatNo = sheet_data[5][2];
    let row = 5;

    while (end !== true) {
      if (sheet_data[row][0] !== undefined && sheet_data[row][0].toUpperCase().toString() === 'TOTAL') {
        end = true;
        console.log(row, sheet_data[row])
      } else {
        let item = sheet_data[row]
        let itemBottom = sheet_data[row + 1]
        if (item[2] === undefined && itemBottom[2] !== undefined) {
          p_vatNo = itemBottom[2];
        } else {
          let endOfFile = itemBottom[0] !== undefined && (itemBottom[0].toUpperCase().toString() === 'TOTAL');
          let object = {
            row: row,
            vatNo: p_vatNo,
            pidNo: Number(item[4]),
            productNo: p_vatNo.concat((Number(item[4]) < 10 ? "00" + item[4].toString() : (Number(item[4]) >= 100) ? item[4].toString() : "0" + item[4].toString())),
            netWeightLbs: Number(item[5]).toFixed(2),
            netWeight: Number(item[6]).toFixed(2),
            grossWeight: Number(item[7]).toFixed(2),
          }
          if (!endOfFile) {
            arr.push(object)
          } else {
            sum.push(object)
          }
        }
        // console.log(arr)
        row++;
      }
    }

  }
  return {data: arr, sum: sum}
}


export const readOTO = (sheet_data) => {
  let arr = [];
  if (sheet_data.length > 0) {
    let row = 4;
    let p_vatNo = sheet_data[row][1];
    let total = {
      count: 0,
      weight: 0,
    }
    while (this.end !== true) {

      if (sheet_data[row][0] !== undefined && sheet_data[row][0].toUpperCase().toString() === 'TOTAL') {
        this.end = true;
      } else {
        let item = sheet_data[row]
        let itemBottom = sheet_data[row + 1]
        if (item[3] === total.count && item[4] === total.weight) {
          p_vatNo = itemBottom[1];
          total = {count: 0, weight: 0}
        } else {
          total.count += 1;
          total.weight += Number(item[4]);
          arr.push({
            row: row,
            vatNo: p_vatNo,
            pidNo: Number(item[3]),
            productNo: p_vatNo.concat((Number(item[3]) < 10 ? "00" + item[3].toString() : (Number(item[3]) >= 100) ? item[3].toString() : "0" + item[3].toString())),
            netWeightLbs: null,
            netWeight: Number(item[4]).toFixed(2),
            grossWeight: Number(item[5]).toFixed(2),
          });
        }
        row++;
      }
    }
    return arr
  }
}

export const checkIncludes = (text, val) => {
  return text.includes(val)
}

export const groupData = (data) => {
  if (data.length == 0) {
    return []
  }
  let arr = [];
  let vatList = []
  data.map((e, i) => {
    if (vatList.findIndex(item => item.vatNo === e.vatNo) === -1) {
      vatList.push({vatNo: e.vatNo})
    }
  })
  vatList.map((e, i) => {
    let temp = data.filter((item) => item.vatNo === e.vatNo);
    let obj = getDetailInArray(temp);
    arr.push({
      detail: temp,
      vatNo: e.vatNo,
      pidNos: obj.total,
      netWeight: Number(obj.netWeight).toFixed(2),
      netWeightLbs: Number(obj.netWeightLbs).toFixed(2),
      grossWeight: Number(obj.grossWeight).toFixed(2),
    })
  })
  return arr;
}

const getDetailInArray = (data) => {
  let netWeight = 0;
  let netWeightLbs = 0;
  let grossWeight = 0;
  data.map((e, i) => {
    netWeight = Number(netWeight) + Number(e.netWeight);
    netWeightLbs = Number(netWeightLbs) + Number(e.netWeightLbs);
    grossWeight = Number(grossWeight) + Number(e.grossWeight);
  })
  return {
    total: data.length,
    netWeight: netWeight,
    netWeightLbs: netWeightLbs,
    grossWeight: grossWeight
  }
}


export const exportExcel = async (params, url, name) => {
  let api = "http://192.168.5.1:99/api"
  try {
    var instance = axios.create({
      baseURL: api,
      timeout: 999999,
    });
    let res = await instance({
      method: 'get',
      url: url,
      params: params,
    });

    if (res.data.path.includes("xlsx")) {
      console.log(res.data.path)
      let uri = api + "/erp/downloadExcel?path=" + res.data.path + "&name=" + name;

      window.open(uri)
      console.log(uri);
    }
  } catch (e) {
    this.$tip.warning("Hệ thống xuất hiện lỗi, 系统导出报表发生问题")
  }
}


