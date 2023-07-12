/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 09:07:11
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-28 15:03:47
 */
import {
  getDIC,
  getDicT,
  getDicNS
} from "@/config/index";

let retType = getDIC("whse_retState");
import { num2ThousandthFormat } from "@/utils/tools"

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

  // 模块参数  辅料|五金|行政|染料|化工
export const moduleParamsEnum = {
  // 化工
  5:{
    type: "RHL",
    fieldLabel: "原料",
    unitLabel: "重量",
    mainApiBaseKey: "whseRetsuppchemical",
    dtlApiBaseKey: "whseRetsuppchemicalDtl",
    mainOidKey: "whseRetsuppchemicaloid",
    mainOidFkKey: "whseRetsuppchemicalFk",
    dtlOidFk: "whseRetsuppchemicalDtloid",
    inDtlOidFk: "whseChemicalinDtlbFk",
    stockKey: "viewChemicalStock"
  },
  // 染料
  8:{
    type: "RLL",
    fieldLabel: "染料",
    unitLabel: "重量",
    mainApiBaseKey: "whseRetsuppdyesal",
    dtlApiBaseKey: "whseRetsuppdyesalDtl",
    mainOidKey: "whseRetsuppdyesaloid",
    mainOidFkKey: "whseRetsuppdyesalFk",
    dtlOidFk: "whseRetsuppdyesalDtloid",
    inDtlOidFk: "whseDyesainDtlaFk",
    stockKey: "viewDyestuffStock"
  },
}


// 主表
export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [{
        label: "出仓单编号",
        prop: "retCode",
        width: 140
      },
      {
        label: "出仓类型",
        prop: "retType",
        width: 160,
        type: "select",
        align: "center",
        dicData: getDIC("whse_out_type")
      },
      {
        label: "出仓日期",
        prop: "retDate",
        align: "center",
        width: 160,
      },
      {
        label: "退货通知单编号",
        prop: "retMemo",
        width: 160,
      },
      {
        label: "出仓状态",
        prop: "stockState",
        width: 160,
        type: "select",
        align: "center",
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
        label: "退货通知单编号",
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
    height: "calc(100vh - 200px)",
    selection:true,
    index:false,
    column: [{
        label: "退货通知单编号",
        prop: "remeoNo",
        width: 150
      },
      {
        label: "供应商名称",
        prop: "suppName",
        width: 120
      },
      {
        label: `${moduleParamsEnum[_this.imWkType].fieldLabel}名称`,
        prop: "chinName",
        width: 200,
        overHidden: true
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 120
      },
      {
        label: `退货${moduleParamsEnum[_this.imWkType].unitLabel}` ,
        prop: "returnQty",
        width: 120,
        align: "right",
        formatter(r,v){
          return num2ThousandthFormat(v);
        }
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
        width: 120
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
        label: "退货通知单编号",
        prop: "retMemo",
        span: 5,
        placeholder: " ",
        labelWidth: 150,
        disabled: true,
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 5,
        type: "select",
        dicData:retType,
        placeholder: " ",
        disabled: true,
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
        label: `${moduleParamsEnum[_this.imWkType].fieldLabel}编号`,
        prop: "matCode",
        width: 120
      },{
        label: `${moduleParamsEnum[_this.imWkType].fieldLabel}名称`,
        prop: "matName",
        width: 200,
        overHidden: true
      },{
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 120
      },{
        label: `计划退货量`,
        // prop: "inWeight",
        prop: "planRetWeight",
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        formatter: (row,value) => {
          return num2ThousandthFormat(value)
        }
      },{ 
        label: `实际退货量`,
        // prop: "retQty",
        prop: "realRetWeight",
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        formatter: (row,value) => {
          let retWeight = row.childrenList.reduce((a,b) => a + +(b.retWeight || 0), 0)
          row.realRetWeight = retWeight;
          return num2ThousandthFormat(retWeight)
        }
      },{
        label:  _this.$t("unit") ,//单位,
        // prop: "unitName",
        prop: "weightUnit",
        width: 120,
        type: "select",
        dicData: getDIC("bas_matUnit")
      }
    ]
  }
}

export function retReatDtlaCrudOp(_this){
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    page:false,
    column: [{
      label: "库存重量",
      prop: "stockWeight",
      width: 120,
      align: "right",
      cell: false,
      formatter: (row,value) => {
        return  num2ThousandthFormat(value)
      }
    },{
      label: "退货重量",
      prop: "retWeight",
      width: 120,
      cell: true,
      align: "right",
      type: "number",
      formatter: (row,value) => {
        return  num2ThousandthFormat(value)
      }
    },{
        label: "货位码",
        prop: "storageNo",
        width: 120,
        overHidden: true,
        cell: false,
      }
    ]
  }
}