/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-22 13:11:41
 * @FilePath: \iot.vue\src\view\quaLity\qaProductionCapacity\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

function fillWeek(row, value) {
  let year = value.slice(0,3);
  let month = value.slice(4,5);
  let day = value.slice(6,7);
 
  console.log(year, month, day);
  let date = new Date(value);
  return value && date;
}

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


export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: _this.$t("public.date") , //日期
        prop: "dayId",
        span: 6,
        placeholder: " "
      },
    ]
  };
}

export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth:110,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "productQty",
        type: "sum"
      },
      {
        label: " ",
        name: "hairQty",
        type: "sum"
      },
      {
        label: " ",
        name: "collarQty",
        type: "sum"
      },
      {
        label: " ",
        name: "receivedQty",
        type: "sum"
      },
      {
        label: " ",
        name: "outQty",
        type: "sum"
      }
    ],
    height: "calc(100vh - 240px)",
    column: [
      {
        label: _this.$t("public.date") , //日期
        prop: "dayId",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        sortable: true,
        align: "center"
      },
    //   {
    //     label: "星期",
    //     prop: "week",
    //     width: 120,
    //     span: 6,
    //     placeholder: " ",
    //     // formatter: fillWeek,
    //     overHidden: true,
    //     sortable: true,
    //     align: "center"
    //   },
      {
        label:  _this.$t("checkPlan.productQty"), //成品
        prop: "productQty",
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label:  _this.$t("checkPlan.hairQty"), //钳毛
        prop: "hairQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label:  _this.$t("checkPlan.collarQty"), //折领
        prop: "collarQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label:  _this.$t("checkPlan.receivedQty"), //持单量(kg)
        prop: "receivedQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label:  _this.$t("checkPlan.outQty"), //完成量
        prop: "outQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label:  _this.$t("checkPlan.exceptQty"), //异常数量
        prop: "exceptQty",
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        align: "right"
      },
    ]
  };
}

export function qcCheckStorePlanCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 310px)",
    index: false,
    column: [
      {
        label:  _this.$t("sn"), //序号
        prop: "waitOutSn",
        cell: true,
        placeholder: " ",
        span: 6,
        width: 60,
        align: "center",
        overHidden: true
      },
      {
        label:  _this.$t("driving.carriageStorageCode"), //布笼号
        prop: "storeLoadCode",
        placeholder: " ",
        span: 6,
        width: 200,
        cell: true,
        overHidden: true
      },
      
      {
        label:  _this.$t("checkPlan.outFlag"), //出库完成
        prop: "outFlag",
        cell: true,
        disabled: false,
        placeholder: " ",
        span: 6,
        width: 120,
        type:"switch",
        align: "center",
        dicData:[
          {
            label:  _this.$t("false"), //否"
            value:false,
          },
          {
            label:  _this.$t("true"), //是
            value:true,
          }
        ],
        overHidden: true,
        change: (val) => {
          _this.$nextTick(() =>{
            setTimeout(() => {
              if (!_this.dtlCurIdx) return;
              val.value ? 
              _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].outTime = _this.$getNowTime("datetime") 
              : _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].outTime = ""
            });
          })
        }
      },
      {
        label:  _this.$t("checkPlan.outTime"), //"出库日期",
        prop: "outTime",
        type: "datetime",
        cell: true,
        width: 180,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("checkPlan.returnFlag"), //是否回仓
        prop: "returnFlag",
        disabled: false,
        placeholder: " ",
        span: 6,
        width: 120,
        type:"switch",
        align: "center",
        cell: true,
        dicData:[
          {
            label:  _this.$t("false"), //否"
            value:false,
          },
          {
            label:  _this.$t("true"), //是
            value:true,
          }
        ],
        overHidden: true,
        change: (val) => {
          _this.$nextTick(() =>{
            setTimeout(() => {
              if (!_this.dtlCurIdx) return;
              val.value ? 
              _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].returnTime = _this.$getNowTime("datetime") 
              : _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].returnTime = ""
            });
          })
        }
      },
      {
        label:  _this.$t("checkPlan.returnTime"), //回仓日期
        prop: "returnTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        width: 180,
        cell: true,
        placeholder: " "
      },
      {
        label:  _this.$t("checkPlan.sumPid"), //总疋数
        prop: "pidCount",
        placeholder: " ",
        span: 6,
        width: 90,
        cell: false,
        align: "right",
        overHidden: true
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "piNos",
        placeholder: " ",
        span: 6,
        // width: 200,
        cell: false,
        overHidden: true
      },
    ]
  };
}