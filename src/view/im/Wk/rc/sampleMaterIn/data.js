/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-26 10:12:46
 */
import {
  getDIC,
  getDicT,
  getDicNS
} from "@/config/index";
import { num2ThousandthFormat } from "@/utils/tools"

function fillZero(row, value) {
  return value && value.toFixed(2);
}

let examState = getDIC("whse_retState");
let opreator = getDicT("ucmlUser", "employeename", "ucmlUseroid");

export const dataPropEnum = {
  3: {
    samNoteKey: "chemicalforsampleNote",
    samIdKey: "chemicalId",
    samNameKey: "chemicalName",
    // 入仓字段字典
    matOidKey: "whseChemicalinoid",
    matFkKey: "whseChemicalinFk",
    matDtlaOidKey: "whseChemicalinDtlaoid",
    matDtlaFkKey: "whseChemicalinDtlaFk",
    matDtlbOidKey: "whseChemicalinDtlboid",
    matCodeKey: "chemicalId",
    matNameKey: "chemicalName",
    matCodeLabel: "化工原料编号",
    matNameLabel: "化工原料名称",
    // 表名字典
    purSamDtlaTableName: "purChemicalforsampleDtl",
    whseTableName: "whseChemicalin",
    whseDtlaTableName: "whseChemicalinDtla",
    whseDtlbTableName: "whseChemicalinDtlb",
  },
  4: {
    samNoteKey: "dyesaforsampleNote",
    samIdKey: "chemicalId",
    samNameKey: "chemicalName",
    // 入仓字段字典
    matOidKey: "whseDyesalinoid",
    matFkKey: "whseDyesalinFk",
    matDtlaOidKey: "whseDyesainDtlaoid",
    matDtlaFkKey: "whseDyesainDtlaFk",
    matDtlbOidKey: "whseDyesainDtlboid",
    matCodeKey: "chemicalId",
    matNameKey: "chemicalName",
    matCodeLabel: "染料编号",
    matNameLabel: "染料名称",
    // 表名字典
    purSamDtlaTableName: "purDyesaforsampleDtl",
    whseTableName: "whseDyesalin",
    whseDtlaTableName: "whseDyesalInDtla",
    whseDtlbTableName: "whseDyesalInDtlb",
  }
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
        label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
        prop: "yinDate",
        align: "center",
        width: 100,
      },
      {
        label: "样品通知单编号",
        prop: "registerNo",
        width: 150,
      },
      {
        label: "供应商编号",
        prop: "suppId",
        width: 120,
      },
      {
        label: "供应商名称",
        prop: "suppName",
        width: 150,
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
        width: 100,
        align: "center",
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
        width: 130,
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
      label: "样品通知单编号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
    }]

  }
}


export function unStockSampleFormOp(_this){
  let {samIdKey,samNoteKey} = dataPropEnum[_this.imWkType];
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "供应商名称",
      prop: "suppName",
      span: 5,
      placeholder: " ",
    }, {
      label: "样品通知单",
      prop: samNoteKey,
      span: 5,
      placeholder: " ",
    }]
  }
}

export function unStockSampleCrudOp(_this) {
  let { samIdKey,samNameKey,samNoteKey } = dataPropEnum[_this.imWkType];
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 265px)",
    selection: true,  
    column: [{
        label: "样品通知单",
        prop: samNoteKey,
        width: 120,
      },
      {
        label: "样品编号",
        prop: samIdKey,
        width: 100,
      },
      {
        label: "样品名称",
        prop: samNameKey,
        overHidden: true,
        // width: 250,
      },
      {
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "suppId",
        overHidden: true,
        width: 120,
      },
      {
        label: "供应商名称",
        prop: "suppName",
        overHidden: true,
        width: 150,
      },
      {
        label: "样品重量",
        prop: "weight",
        width: 100,
        type: "number",
        align: "right",
        precision: 2,
        formatter(r,v){
          return num2ThousandthFormat(v)
        }
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "weightUnit",
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: "计划送货日期",
        prop: "planSenddate",
        width: 140,
      },

    ]
  }
}

// 料入仓数据
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
      label: "样品通知单号",
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
    //   dicData: getDIC("whse_yinStatus"),
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
  let { matCodeKey,matNameKey,matCodeLabel, matNameLabel } = dataPropEnum[_this.imWkType];
  return {
    ...mainCrudOpCommon,
    page: false,
    column: [{
      label: matCodeLabel,
      prop: matCodeKey,
      width: 120
    }, {
      label: matNameLabel,
      prop: matNameKey,
      width: 250,
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
        let weight = row.dtlBChildren.reduce((a,b) => a + +(b.weight || 0), 0)
        return num2ThousandthFormat(weight)
      },
    },{
      label:  _this.$t("note.weightUnit"), //重量单位
      prop: "weightUnit",
      width: 100,
      type: "select",
      align: "center",
      dicData: getDIC("bas_matUnit"),
    },{
      label: "检验状态",
      prop: "checkStatus",
      width: 100,
      type: "select",
      align: "center",
      dicData: getDIC("whse_yinStatus"),
      default: 1,
      cell: true,
    }
    
   ]
  }
}

// 货位码数据
export function whseYarnInDtlaCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: dataPropEnum[_this.imWkType].matDtlbOidKey,
    column: [{
      label: _this.$t("energy.sl") ,//数量
      prop: "weight",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter(r, v){
        return num2ThousandthFormat(v);
      }
    },{
      label: "货位码",
      prop: "storageNo",
      width: 100,
      cell: true,
      type: "select",
      dicData: getDicNS("whseLocation?warehouseType=" + _this.imWkType, "locationCode", "locationCode")
    }]
  }
}
