/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-01 16:55:51
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

function fillZero(row, value) {
  return value && value.toFixed(2);
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


export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("revolve.planStart"), // "计划开始",
        prop: "planStart",
        type: "datetimerange",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 12,
        placeholder: " "
      },
    ]
  };
}
export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth:110,
    height: "calc(100vh - 240px)",
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true,
        formslot:true,
        rules: [
          {
            required: true,
            message: "请输入缸号",
            trigger: "blur",
          },
        ],
      },
      {
        label:  _this.$t("checkPlan.planDate"), //查布日期
        prop: "planDate",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        width: 120,
        sortable: true,
        span: 6,
        fixed: true,
        align: "center",
        rules: [
          {
            required: true,
            message: "请选择查布日期",
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("revolve.planStart"), // "计划开始",
        prop: "planStart",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        width: 160,
        sortable: true,
        overHidden:true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请选择计划开始",
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("revolve.planEnd"), // "计划结束
        prop: "planEnd",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        overHidden:true,
        width: 160,
        span: 6,
        rules: [
          {
            required: true,
            message: "请选择计划结束",
            trigger: "blur",
          },
        ],
      },
      {
        label:  _this.$t("checkPlan.sumPid"), //总疋数
        prop: "sumPid",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 80,
        type: "number",
        align: "right"
      },
      // {
      //   label:  _this.$t("driving.carriageStorageCode"), //布笼号
      //   prop: "storeCodes",
      //   readonly: true,
      //   placeholder: " ",
      //   span: 6,
      //   width: 200,
      //   overHidden: true
      // },
      // {
      //   label: "装笼疋数",
      //   prop: "storeCode",
      //   readonly: true,
      //   placeholder: " ",
      //   span: 12,
      //   width: 120,
      //   align: "right",
      //   overHidden: true
      // },
      {
        label:  _this.$t("checkPlan.sumNw"), //总重量
        prop: "sumNw",
        placeholder: " ",
        span: 6,
        width: 130,
        align: "right",
        type: "number",
        overHidden: true
        // formatter: fillZero
      },
      {
        label:  _this.$t("checkPlan.samplCount"), //抽样疋数
        prop: "samplCount",
        placeholder: " ",
        span: 6,
        width: 130,
        align: "right",
        type: "number",
        overHidden: true,
        // formatter: fillZero,
        rules: [
          {
            required: true,
            message: "请输入抽样数量",
            trigger: "blur",
          },
        ],
      },
     
      {
        label:  _this.$t("checkPlan.planRate"), //成比例
        prop: "planRate",
        // disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        overHidden: true
      },
      // {
      //   label: "抽样布笼",
      //   prop: "storeCode11",
      //   placeholder: " ",
      //   span: 6,
      //   width: 200,
      //   overHidden: true,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请选择抽样布笼",
      //       trigger: "blur",
      //     },
      //   ],
      // },
      {
        label:  _this.$t("checkPlan.pidNos"), //完成疋号
        prop: "pidNos",
        placeholder: " ",
        span: 18,
        width: 120,
        type: "select",
        dicData: [],
        overHidden: true,
        multiple: true,
        dataType: "String",
        filterable: true,
        defaultFirstOption: true,
        allowCreate: true,
        // change: (val) =>{
          
        //   _this.qcCheckPlanFormData.overQty = 0;
        //   if (!val.value.length) {
        //     return;
        //   } 
        //   console.log(val, _this.noteList);
        //   _this.qcCheckPlanFormData.overPidCount =  val.value instanceof Array ?  val.value.length : val.value.split(",").length;
        //   _this.noteList.forEach( (item) => {
        //     if (val.value.includes(item.pidNo+'')) {
        //       _this.qcCheckPlanFormData.overQty += item.netWeight;
        //     }
        //   });
        //   _this.qcCheckPlanFormData.overQty = _this.qcCheckPlanFormData.overQty.toFixed(2);
        // }
      },
      {
        label:  _this.$t("checkPlan.overPidCount"), //完成疋数
        prop: "overPidCount",
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.overQty"), //完成数量
        prop: "overQty",
        // disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        // formatter: fillZero,
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.exceptPidCount"), //异常疋数
        prop: "exceptPidCount",
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.exceptQty"), //异常数量
        prop: "exceptQty",
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.exceptDesc"), //异常描述
        prop: "exceptDesc",
        placeholder: " ",
        span: 6,
        width: 120,
      },
      {
        label:  _this.$t("checkPlan.inFlag"), //在库
        prop: "inFlag",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        type: "select",
        display: false,
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
      },
    ]
  };
}

export function qcCheckStorePlanCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 400px)",
    index: false,
    page: false,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "pidCount",
        type: "sum"
      },
      {
        label: " ",
        name: "storeLoadCode",
        type: "count"
      },
    ],
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
        width: 160,
        cell: false,
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
        label: _this.$t("checkPlan.outTime"), // "出库日期",
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