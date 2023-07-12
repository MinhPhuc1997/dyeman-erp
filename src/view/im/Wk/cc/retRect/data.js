/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 09:07:11
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-29 08:28:37
 */
import {
  getDIC,
  getDicT,
  getDicNS
} from "@/config/index";

import { num2ThousandthFormat } from "@/utils/tools"

let retType = getDIC("whse_retState");

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


// 主表
export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    column: [{
        label: "出仓单编号",
        prop: "retCode",
        width: 160
      },
      {
        label: "出仓类型",
        prop: "retType",
        align: "center",
        width: 160,
        type: "select",
        dicData: getDIC("whse_out_type")
      },
      {
        label: "出仓日期",
        align: "center",
        prop: "retDate",
        width: 160,
      },
      {
        label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
        prop: "retMemo",
        width: 160,
      },
      {
        label: "出仓状态",
        prop: "retState",
        width: 160,
        align: "center",
        type: "select",
        dicData:retType
      },
      {
        label: _this.$t("sysCreatedby") ,//操作员
        prop: "sysCreatedby",
        width: 160,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
      },
    ]
  };
}

// 主页面查询表单皮配置
export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "出仓日期",
        prop: "retDate",
        span: 5,
        placeholder: " ",
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
        prop: "retMemo",
        span: 5,
        placeholder: " ",
        labelWidth: 150
      },
      {
        label: "出仓状态",
        prop: "retState",
        span: 5,
        type: "select",
        dicData:retType,
        placeholder: " ",
      },
      {
        label: "出仓单编号",
        prop: "retCode",
        span: 5,
        placeholder: " ",
      }
    ]
  };
}


// 退货通知单表格配置
export function retReatCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    selection:true,
    index:false,
    height: "calc(100vh - 150px)",
    column: [{
        label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
        prop: "remeoNo",
        width: 150
      },
      {
        label: "供应商名称",
        prop: "suppName",
        width: 120
      },
      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "yarnBrand",
        width: 120
      },
      {
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "suppNo",
        width: 120
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 120
      },
      {
        label: "退货数量",
        prop: "returnQty",
        width: 120
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "unitName",
        width: 120
      },
      {
        label: "要求退货日期",
        prop: "returnDate",
        width: 120
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "returnReason",
      },
    ]
  }
}

// 退供应商纱出仓表单数据
export function retReatFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "出仓单编号",
        prop: "retCode",
        span: 5,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "出仓日期",
        prop: "retDate",
        span: 5,
        placeholder: " ",
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
        prop: "retMemo",
        span: 5,
        placeholder: " ",
        labelWidth: 150,
        disabled: true,
      },
      {
        label: "出仓状态",
        prop: "retState",
        span: 5,
        type: "select",
        dicData:retType,
        placeholder: " ",
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "retRemarks",
        span: 10,
      },
    ]
  };
}

// 明细数据
export function retReatDtlCrudOp(_this){
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    rowKey:"whseYarninDtloid",
    page:false,
    column: [{
        label: "入库单号",
        prop: "yinId",
        width: 140
      },{
        label:  _this.$t("yarnCode"), //纱线编号
        prop: "yarnsId",
        width: 100
      },{
        label:  _this.$t("yarnName"), //纱线名称
        prop: "yarnsName",
        // width: 200,
        overHidden: true
      },{
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "yarnsCard",
        width: 100
      },{
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "batId",
        width: 120,
        overHidden: true
      },{
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 120
      },{
        label: "入仓重量",
        prop: "inWeight",
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        formatter: (row,value) => {
          return num2ThousandthFormat(value)
        }
      },{ 
        label: "退纱重量",
        prop: "retWeight",
        width: 120,
        // cell: true,
        type: "number",
        align: "right",
        precision: 2,
        formatter: (row,value) => {
          let retWeight = row.retreatDtlaList.reduce((a,b) => a + +(b.retWeight || 0), 0)
          return num2ThousandthFormat(retWeight)
        }
      },{
        label:  _this.$t("unit") ,//单位,
        prop: "unitName",
        width: 120
      },{
        label: "退纱件数",
        prop: "retPcsNum",
        width: 120,
        type: "number",
        align: "right",
        formatter: (row,value) => {
          let retPcsNum = row.retreatDtlaList.reduce((a,b) => a + +(b.retPcs || 0), 0)
          return num2ThousandthFormat(retPcsNum)
        }
      }
    ]
  }
}

export function retReatDtlaCrudOp(_this){
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    rowKey:"whseRetreatDtlaoid",
    page:false,
    column: [{
        label: "退纱重量",
        prop: "retWeight",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        formatter: (row,value) => {
          return num2ThousandthFormat(value)
        }
      },{
        label: "退纱件数",
        prop: "retPcs",
        type: "number",
        align: "right",
        width: 100,
        cell: true,
        formatter: (row,value) => {
          return num2ThousandthFormat(value,0)
        }
      },{
        label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        prop: "packSize",
        width: 120,
        type: "select",
        cell: false,
        dicData: getDIC("bas_yarnPackUnit")
      },{
        label: "货位码",
        prop: "locationCode",
        width: 120,
        overHidden: true,
        cell: false,
        type: "select",
        filterable: true,
        dicData: getDicNS("whseLocation?warehouseType=0", "locationCode", "locationCode")
      }
    ]
  }
}