/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-01 16:52:22
 */

// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  showSummary: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
};

export function stkinMemoCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 275px)",
    column: [{
        label:  _this.$t("proClothStkinMemo.memoNo"), //入仓通知单编号
        prop: "memoNo",
        width: 200,
      },
      {
        label:  _this.$t("proClothStkinMemo.memoDate"), //通知单日期
        prop: "memoDate",
        width: 150,
        align: "center"
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140
      },
      {
        label:  _this.$t("proFinishStkinMemo.memoPiCount"), // "通知单疋数",
        prop: "memoPiCount",
        width: 150,
        align: "center"
      },
      {
        label:  _this.$t("proClothStkinMemo.memoWeight"), //通知单数量
        prop: "memoWeight",
        width: 150,
        align: "right",
        formatter(r,v){
          return v && _this.$num2ThousandthFormat(v,1)
        }
      },
      {
        label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
        prop: "yinDate",
        width: 150,
        align: "center"
      },
      {
        label:  _this.$t("proFinishStkinMemo.whseInPiCount"), // "入仓疋数",
        prop: "whseInPiCount",
        width: 150,
        align: "center"
      },
      {
        label:  _this.$t("proClothStkinMemo.whseInWeight"), //入仓数量
        prop: "whseInWeight",
        width: 150,
        align: "right",
        formatter(r,v){
          return v && _this.$num2ThousandthFormat(v,1)
        }
        
      },
      {
        label:  _this.$t("proClothStkinMemo.sysCreated"), //"生成时间",
        prop: "sysCreated",
        width: 170,
        align: "center"
      },
    ]
  }
}

export function stkinMemoQueryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label:  _this.$t("proClothStkinMemo.memoDate"), //通知单日期
      prop: "memoDate",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
      span: 6,
      placeholder: " ",
    },
    {
      label: _this.$t("vatNo") ,//"缸号",
      prop: "vatNo",
      span: 6,
      placeholder: " ",
    }]

  }
}

export function unStoreFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: _this.$t("public.date") , //日期
      prop: "lastCheckTime",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
      span: 6,
      placeholder: " ",
    },
    {
      prop: "vatNo",
      label: _this.$t("vatNo") ,//"缸号",
      span: 6
    }
  ]

  }
}

export function unStoreCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 275px)",
    selection: true,
    index:false,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 150,
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("proClothStkinMemo.piCount"), //"已验布疋数
        prop: "piCount",
        width: 120,
        align: "right"
      },
      {
        label:  _this.$t("proClothStkinMemo.lastCheckTime"), //最后验布时间
        prop: "lastCheckTime",
        width: 180,
      },
      {
        label:  _this.$t("proClothStkinMemo.realWeight"), //重量
        prop: "realWeight",
        width: 120,
        align: "right"
      },
    ]
  }
}

// 
export function stkinMemoFormOp(_this) {
  return {
    ...formOpCommon,
    column: [{
      label:  _this.$t("proClothStkinMemo.memoNo"), //入仓通知单编号
      prop: "memoNo",
      labelWidth: "150",
      span: 5,
      placeholder: " ",
      disabled: true,
    }, {
      label:  _this.$t("proClothStkinMemo.memoDate"), //通知单日期
      prop: "memoDate",
      span: 6,
      placeholder: " ",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    }]
  }
}

// 明细数据
export function stkinMemoDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "id",
    height: "calc(100vh - 150px)",
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 170
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        width: 150,
        overhidden: true
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 180,
        overHidden: true,
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "pidNo",
        width: 100,
        align: "right"
      },
      {
        label:  _this.$t("proFinishStkinMemo.netWeight"), // "净重量(kg)",
        prop: "netWeight",
        width: 120,
        align: "right",
        formatter(row, value){
          return value && (+value || 0).toFixed(2)
        }
      }
    ]
  }
}

