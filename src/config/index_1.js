import axios from "axios";
import store from "@/store/index";
import { forEach } from "lodash";
export const webSocket = {
  setWebSoket(_this) {
    if ("WebSocket" in window) {
      // _this.websocket = new WebSocket("ws://192.168.5.1:91/test");
      _this.websocket = new WebSocket("ws://192.168.5.1:92/broadcast");
    } else {
      alert("该浏览器不支持websocket通讯，请切换浏览器！");
    }
    //连接发生错误的回调方法
    _this.websocket.onerror = function() {
      alert("服务器连接失败，请检查网络!");
    };
    //连接成功建立的回调方法
    _this.websocket.onopen = function(event) {
      // alert("服务器连接成功!");
      _this.$tip.success("服务器连接成功!");
    };
    //接收到消息的回调方法
    _this.websocket.onmessage = function(event) {
      // // console.log(event);
      // if (event.data === 'null') {
      //   _this.$tip.warning("暂无该订单信息!");
      //   return
      // }
      // _this.setData(JSON.parse(event.data))
    };
    //连接关闭的回调方法
    _this.websocket.onclose = function() {
      _this.websocket.close();
      // _this.$tip.warning("连接关闭!");
    };
  },
  setCz(_this) {
    if ("WebSocket" in window) {
      _this.czsocket = new WebSocket("ws://127.0.0.1:44001/weight");
    } else {
      _this.$tip.error("该浏览器不支持websocket通讯，请切换浏览器！");
    }
    //连接发生错误的回调方法
    // _this.czsocket.onerror = function() {
    //   _this.$tip.warning("称重服务离线，请打开称重应用!");
    // };
    //连接成功建立的回调方法
    _this.czsocket.onopen = function(event) {
      _this.$tip.success("S.POWER客户端连接成功!");
    };
    //接收到消息的回调方法
    _this.czsocket.onmessage = function(event) {};
    //连接关闭的回调方法
    _this.czsocket.onclose = function() {
      // _this.czsocket.close();
      // _this.$tip.warning("连接关闭!");
    };
    // _this.websocket.onsend = function () {

    // }
  },
  setPrint(_this) {
    if ("WebSocket" in window) {
      _this.prsocket = new WebSocket("ws://127.0.0.1:44001/print");
    } else {
      _this.$tip.error("该浏览器不支持websocket通讯，请切换浏览器！");
    }
    //连接发生错误的回调方法
    // _this.prsocket.onerror = function() {
    //   // _this.$tip.error("打印应用连接失败，请检查是否启动!");
    //   _this.$tip.warning("打印服务离线!");
    // };
    //连接成功建立的回调方法
    _this.prsocket.onopen = function(event) {
      _this.$tip.success("S.POWER客户端连接成功!");
    };
    //接收到消息的回调方法
    _this.prsocket.onmessage = function(event) {};
    //连接关闭的回调方法
    _this.prsocket.onclose = function() {
      // _this.prsocket.close();
      // _this.$tip.warning("连接关闭!");
    };
    // _this.websocket.onsend = function () {

    // }
  },
  setClient(_this) {
    if ("WebSocket" in window) {
      _this.spowerClient = new WebSocket("ws://127.0.0.1:44001/data");
    } else {
      _this.$tip.error("该浏览器不支持websocket通讯，请切换浏览器！");
    }
    //连接成功建立的回调方法
    _this.spowerClient.onopen = function(event) {
      _this.$tip.success("S.POWER客户端连接成功!");
    };
    // _this.spowerClient.onerror = function() {
    //   _this.$tip.error("S.POWER客户端连接失败!");
    // };
    //接收到消息的回调方法
    _this.spowerClient.onmessage = function(event) {};
    //连接关闭的回调方法
    // _this.spowerClient.onclose = function() {
    //   _this.$tip.error("S.POWER客户端已退出!");
    // };
  },
  setDriving(_this) {
    if ("WebSocket" in window) {
      _this.drsocket = new WebSocket("ws://192.168.5.1:92/test-one");
    } else {
      _this.$tip.error("该浏览器不支持websocket通讯，请切换浏览器！");
    }
    //连接发生错误的回调方法
    _this.drsocket.onerror = function() {
      _this.$tip.warning("行车监控服务离线!");
    };
    //连接成功建立的回调方法
    _this.drsocket.onopen = function(event) {
      _this.$tip.success("行车监控服务连接成功!");
    };
    //接收到消息的回调方法
    _this.drsocket.onmessage = function(event) {};
    //连接关闭的回调方法
    _this.drsocket.onclose = function() {
      _this.drsocket.close();
      // _this.$tip.warning("连接关闭!");
    };
    // _this.websocket.onsend = function () {

    // }
  }
};
// 获取下拉字典
export function getDIC(codeTableId) {
  const codeValueList = store.getters && store.getters.code
  codeTableId = codeTableId.toLocaleLowerCase()
  if (store.state.DIC.dicMap[codeTableId]) {
    return store.state.DIC.dicMap[codeTableId];
  } else {
    let resultMap = codeValueList.filter(v => v.codetableid.toLocaleLowerCase() === codeTableId).map(item => {
      return {
        label: item.codename,
        value: item.codeid
      }
    })
    // axios.get("/api/getcodeValue?codeTableId=" + codeTableId).then(res => {
    //   res.data.sort((a, b) => {
    //     return a.orderno - b.orderno;
    //   });
    //   res.data.forEach(item => {
    //     resultMap.push({
    //       label: item.codename,
    //       value: item.codeid
    //     });
    //   });
    // });
    store.commit("setDicItem", {
      key: codeTableId,
      value: resultMap
    });
    return resultMap;
  }
}

// 获取下拉字典
export async function getDbDicT(url, url2) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);
  let resultMap = [];
  axios.get("/api/" + url).then(res => {
    let data = [];
    if (res.data.rows) {
      data = res.data.rows;
    } else {
      data = res.data;
    }
    axios.get("/api/" + url2).then(Res => {
      if (Res.data.rows) {
        data = data.concat(Res.data.rows);
      } else {
        data = data.concat(Res.data);
      }
      data.forEach(item => {
        resultMap.push(item);
      });
    });
  });
  return resultMap;
}

// 获取字典表
export function getDicT(url, label, value, form = {}, sort) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);
  let resultMap = [];
  let dictKey = `${url}_${label}_${value}`
  if (store.state.DIC.dicMap[dictKey]) {
    return store.state.DIC.dicMap[dictKey];
  } else {
    axios({
      url: "/api/" + url,
      method: "get",
      params: form
    }).then(res => {
      let data = [];
      if (res.data.rows) {
        data = res.data.rows;
      } else {
        data = res.data;
      }
      data.sort((a, b) => {
        return a.orderno - b.orderno;
      });
      if (url == "whseLocation") {
        data.sort((a, b) => {
          return a.locationCode > b.locationCode ? 1 : -1;
        });
      }
      if (sort) {
        data.sort((a, b) => {
          return a[sort] > b[sort] ? -1 : 1;
        });
      }
      data.forEach(item => {
        for (var key in item) {
          if (item[key] === 0) {
            item[key] = "0";
          }
          if (item[key] === null) {
            item[key] = " ";
          }
        }
        resultMap.push({
          label: item[label],
          value: item[value]
        });
      });
    });
    store.commit("setDicItem", {
      key: dictKey,
      value: resultMap
    });
    return resultMap;
  }
}
// 获取字典表
export function getDicNS(url, label, value, form = {}, sort,done) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);
  let resultMap = [];
  axios({
    url: "/api/" + url,
    method: "get",
    params: form
  }).then(res => {
    let data = [];
    if (res.data.rows) {
      data = res.data.rows;
    } else {
      data = res.data;
    }
    if (sort) {
      data.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : -1;
      });
    }

    data.forEach(item => {
      for (var key in item) {
        if (item[key] === 0) {
          item[key] = "0";
        }
        if (item[key] === null) {
          item[key] = " ";
        }
      }
      resultMap.push({
        label: item[label],
        value: item[value]
      });
    });
    done && done();
  });
  return resultMap;
}
// 获取字典表
export function getDicTs(url, label, value, itemspec, model, msUnit) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);
  let resultMap = [];
  if (store.state.DIC.dicMap[url]) {
    return store.state.DIC.dicMap[url];
  } else {
    axios({
      url: "/api/" + url,
      method: "get"
    }).then(res => {
      let data = [];
      if (res.data.rows) {
        data = res.data.rows;
      } else {
        data = res.data;
      }
      data.sort((a, b) => {
        return a.orderno - b.orderno;
      });
      data.forEach(item => {
        for (var key in item) {
          if (item[key] === 0) {
            item[key] = "0";
          }
          if (item[key] === null) {
            item[key] = " ";
          }
        }
        resultMap.push({
          label: item[label],
          value: item[value],
          itemspec: item[itemspec],
          model: item[model],
          msUnit: item[msUnit]
        });
      });
    });
    store.commit("setDicItem", {
      key: url,
      value: resultMap
    });
    return resultMap;
  }
}
export function postDicT(url, label, value, form = {}) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  let resultMap = [];
  axios.post("/api/" + url, form).then(res => {
    let data = [];
    if (res.data.rows) {
      data = res.data.rows;
    } else {
      data = res.data;
    }
    data.sort((a, b) => {
      return a.orderno - b.orderno;
    });
    data.sort((a, b) => {
      return a[label] > b[label] ? 1 : -1;
    });
    data.forEach(item => {
      resultMap.push({
        label: item[label],
        value: item[value]
      });
    });
  });
  return resultMap;
}

export function getXDicT(url) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  let resultMap = [];
  axios.get("/api/" + url).then(res => {
    let data = [];
    if (res.data.rows) {
      data = res.data.rows;
    } else {
      data = res.data;
    }
    data.sort((a, b) => {
      return a.orderno - b.orderno;
    });
    data.forEach(item => {
      for (var key in item) {
        if (item[key] === 0) {
          item[key] = "0";
        }
        if (item[key] === null) {
          item[key] = " ";
        }
      }
      resultMap.push(item);
    });
  });

  return resultMap;
}

export function getNowTime(type = "date") {
  const time = new Date();
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mi = time.getMinutes();
  let s = time.getSeconds();
  m = m < 10 ? `0${m}` : m;
  d = d < 10 ? `0${d}` : d;
  h = h < 10 ? `0${h}` : h;
  mi = mi < 10 ? `0${mi}` : mi;
  s = s < 10 ? `0${s}` : s;
  if (type == "date") {
    return `${y}-${m}-${d}`;
  } else {
    return `${y}-${m}-${d} ${h}:${mi}:${s}`;
  }
}
// export function getNowTime() {
//   const time = new Date();
//   let y = time.getFullYear();
//   let m = time.getMonth() + 1;
//   let d = time.getDate();
//   let h = time.getHours();
//   let mi = time.getMinutes();
//   mi = mi < 10 ? `0${mi}` : mi;

// }

export function unique(arr, val) {
  const res = new Map();
  return arr.filter(a => !res.has(a[val]) && res.set(a[val], 1));
}
/* @arr 数组
   @type 分组的属性
*/
export function group(arr, type, children = 'children' ) {
  let map = {},
    dest = [];
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (!map[ai[type]]) {
      dest.push({
        [type]: ai[type],
        [children]: [ai]
      });
      map[ai[type]] = ai;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj[type] == ai[type]) {
          dj[children].push(ai);
          break;
        }
      }
    }
  }
  return dest;
}

export function preFixInt(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}
/**
 * 滾動至表格底部
 * @param _this 当前作用域
 * @param tableName  表格ID
 */

export function toTableLow(_this, tableName = "crud") {
  // const dom = _this.$refs[tableName].$el
  const dom1 = document
    .getElementById(tableName)
    .getElementsByClassName("el-table__body-wrapper")[0];
  dom1.scrollTo(0, dom1.scrollHeight);
}


// 获取fineReport路径接口
/**
 * params: {
 *    module: "PRO",
      id: "PRO_BLEADYE_RUN_SUMMARY",
 * }
 *
 */
export function fetchFineReportUrl(params) {
  return axios({
    url: "/api/basFinereporturl/finereport/detail",
    method: "get",
    params:params
  });
}
