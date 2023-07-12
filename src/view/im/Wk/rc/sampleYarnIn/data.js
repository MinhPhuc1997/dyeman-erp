/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-25 17:27:20
 */
import {
  getDIC,
  getDicT,
  getDicNS
} from "@/config/index";

function fillZero(row, value) {
  return value && value.toFixed(2);
}

import { num2ThousandthFormat } from "@/utils/tools"


let examState = getDIC("whse_retState");
let opreator = getDicT("ucmlUser", "employeename", "ucmlUseroid");


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

export function whseInCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 225px)",
    column: [{
        label: "入仓编号",
        prop: "yinId",
        width: 200,
      },
      {
        label: "入仓类型",
        prop: "yinType",
        align: "center",
        width: 100,
        type: "select",
        dicData: getDIC("whse_yinType")
      },
      {
        label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
        prop: "yinDate",
        align: "center",
        width: 100,
      },
      {
        label: "样纱通知单编号",
        prop: "registerNo",
        width: 150,
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        overHidden: true,
        width: 180
      },
      // {
      //   label: "检验状态",
      //   prop: "yinStatus",
      //   width: 100,
      //   type: "select",
      //   dicData: getDIC("whse_yinStatus")
      // },
      {
        label: "财务状态",
        prop: "finStatus",
        align: "center",
        width: 100,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: "入仓状态",
        prop: "stockState",
        type: "select",
        align: "center",
        dicData: examState,
        width: 100,
      },
      {
        label: _this.$t("sysCreatedby") ,//操作员
        prop: "sysCreatedby",
        type: "select",
        dicData: opreator,
        width: 100,
      },
    ]
  }
}

export function whseInFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "入仓编号",
      prop: "yinId",
      span: 5,
      placeholder: " ",
    }, {
      label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
      prop: "yinDate",
      span: 5,
      placeholder: " ",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
    }, {
      label: "样纱通知单编号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
    },{
      label:  _this.$t('factoryBatch'), //本厂批号,
      prop: "batchNo",
      span: 5,
      placeholder: " ",
    }]

  }
}

export function yarnForSampleCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 225px)",
    selection: true,  
    column: [{
        label: "样纱通知单",
        prop: "yarnforsampleNote",
        width: 120,
      },
      {
        label:  _this.$t("yarnCode"), //纱线编号
        prop: "yarnsId",
        width: 100,
      },
      {
        label:  _this.$t("yarnName"), //纱线名称
        prop: "yarnsName",
        overHidden: true,
        // width: 250,
      },
      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "yarnsCard",
        width: 100,
      },
      {
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "suppBatId",
        width: 120,
        overHidden: true,
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 100,
      },
      {
        label: "样纱重量",
        prop: "weight",
        width: 100,
        type: "number",
        align: "right",
        precision: 2,
        formatter: fillZero
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "unitName",
        width: 100,
      },
      {
        label: "箱/件数",
        prop: "cartonQty",
        width: 100,
        align: "right"
      },
      {
        label: "纱球数",
        prop: "yarnBallqty",
        width: 100,
        align: "right"
      },
      {
        label: "计划送货日期",
        prop: "planSenddate",
        width: 140,
      },

    ]
  }
}

// 纱入仓数据
export function whseYarnInFormOp(_this) {
  return {
    ...formOpCommon,
    column: [{
      label: "入仓编号",
      prop: "yinId",
      span: 5,
      placeholder: " ",
      disabled: true,
    }, {
      label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
      prop: "yinDate",
      span: 5,
      placeholder: " ",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    }, {
      label: "样纱通知单号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
      disabled: true,
    }, {
      label: "入仓状态",
      prop: "stockState",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: examState,
      disabled: true,
    }, 
    // {
    //   label: "检验状态",
    //   prop: "yinStatus",
    //   span: 5,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDIC("whse_yinStatus")
    // },
    {
      label: "财务状态",
      prop: "finStatus",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: getDIC("whse_finStatus")
    },{
      label: _this.$t("sysCreatedby") ,//操作员
      prop: "sysCreatedby",
      span: 5,
      placeholder: " ",
      disabled: true,
      type: "select",
      dicData: opreator
    }]
  }
}

// 明细数据
export function whseYarnInDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "whseYarninDtloid",
    column: [{
      label:  _this.$t("yarnCode"), //纱线编号
      prop: "yarnsId",
      width: 100
    }, {
      label:  _this.$t("yarnName"), //纱线名称
      prop: "yarnsName",
      // width: 200,
      overHidden: true
    }, {
      label:  _this.$t("yarnCard"), //纱牌,
      prop: "yarnsCard",
      width: 100
    }, {
      label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
      prop: "batId",
      width: 120,
      overHidden: true
    }, {
      label:  _this.$t('factoryBatch'), //本厂批号,
      prop: "batchNo",
      width: 100
    }, {
      label:  _this.$t("weight") ,//重量,
      prop: "weight",
      width: 100,
      align: "right",
      type: "number",
      formatter: (row,value) => {
        let weight = row.aChildren.reduce((a,b) => a + +(b.weight || 0), 0)
        return num2ThousandthFormat(weight)
      },
    },{
      label:  _this.$t("note.weightUnit"), //重量单位
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: getDIC("bas_matUnit"),
    },
    {
      label: "箱/件数",
      prop: "cartonNum",
      width: 100,
      align: "right",
      formatter: (row,value) => {
        let  cartonNum = row.aChildren.reduce((a,b) => a + +(b.cartonNum || 0), 0)
        return num2ThousandthFormat(cartonNum)
      },
    },{
      label: "检验状态",
      prop: "checkStatus",
      width: 100,
      align: "center",
      type: "select",
      dicData: getDIC("whse_yinStatus"),
      default: 1,
      cell: true,
    }]
  }
}

// 货位码数据
export function whseYarnInDtlaCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "whseYarninDtlaoid",
    column: [{
      label: _this.$t("energy.sl") ,//数量
      prop: "weight",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter(r,v){
        return num2ThousandthFormat(v)
      }
    }, {
      label:  _this.$t("ReturnYarnsNotice.cartonNumber"), //件数
      prop: "cartonNum",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter: fillZero
    }, {
      label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
      prop: "packSize",
      width: 100,
      cell: true,
      type: "select",
      dicData: getDIC("bas_yarnPackUnit")
    }, {
      label: "货位码",
      prop: "locationCode",
      width: 100,
      cell: true,
      type: "select",
      dicData: getDicNS("whseLocation?warehouseType=0", "locationCode", "locationCode")
    }]
  }
}
