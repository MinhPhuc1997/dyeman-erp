/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-29 08:20:52
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
    materIdLabel: "化工原料編號",
    materNameLabel: "化工原料名稱",
    materIdKey: "chemicalId",  
    materNameKey: "chemicalName",
    materOidKey: "whseChemicalinoid",
    materFkKey: "whseChemicalinFk",
    materDtlaOidKey: "whseChemicalinDtlaoid",
    materDtlaFKKey: "whseChemicalinDtlaFk",
    materDtlbOidKey: "whseChemicalinDtlboid",
    weightUnitKey: "weightUnit",
    weightKey: "weight",
    // API Name
    proMatWithDtlApiName: "proChemicalWithdrawalDtl",
    whseInApiName: "whseChemicalin",
    whseInDtlaApiName: "whseChemicalinDtla",
    whseInDtlbApiName: "whseChemicalinDtlb",
  },
  4: {
    materIdLabel: "染料编號",
    materNameLabel: "染料名稱",
    materIdKey: "chemicalId",  
    materNameKey: "chemicalName",
    materOidKey: "whseDyesalinoid",
    materFkKey: "whseDyesalinFk",
    materDtlaOidKey: "whseDyesainDtlaoid",
    materDtlaFKKey: "whseDyesainDtlaFk",
    materDtlbOidKey: "whseDyesainDtlboid",
    weightUnitKey: "weightUnit",
    weightKey: "weight",
    // API Name
    proMatWithDtlApiName: "proDyesaWithdrawalDtl",
    whseInApiName: "whseDyesalin",
    whseInDtlaApiName: "whseDyesalInDtla",
    whseInDtlbApiName: "whseDyesalInDtlb"
  }, 
  5: {
    materIdLabel: "生產輔料編號",
    materNameLabel: "生產輔料名稱",
    materIdKey: "materialNum",  
    materNameKey: "materialName",
    materOidKey: "whseAccessoriesinoid",
    materFkKey: "whseAccessoriesInFk",
    materDtlaOidKey: "whseAccessoriesDtloid",
    materDtlaFKKey: "whseAccessoriesDtlFk",
    materDtlbOidKey: "whseAccessoriesDtlaoid",
    weightUnitKey: "unitQty",
    weightKey: "poQty",
    // API Name
    proMatWithDtlApiName: "proAccessoriesWithdrawalDtl",
    whseInApiName: "whseAccessoriesIn",
    whseInDtlaApiName: "whseAccessoriesDtl",
    whseInDtlbApiName: "whseAccessoriesDtla"
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
        label: "入仓类型",
        prop: "yinType",
        width: 100,
        type: "select",
        align: "center",
        dicData: getDIC("whse_yinType")
      },
      {
        label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
        prop: "yinDate",
        align: "center",
        width: 100,
        overHidden: true
      },
      {
        label: "返仓通知单编号",
        prop: "registerNo",
        width: 150,
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        align: "center",
        width: 100,
        type: "select",
        dicData: getDIC("whse_yinStatus")
      },
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
        align: "center",
        type: "select",
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
      label: "返仓通知单编号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
    }]

  }
}

export function retMatNoticCrudOp(_this) {
  let type = _this.imWkType;
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 225px)",
    selection: true,
    column: [{
        label: "返仓通知单号",
        prop: "withdrawalNo",
        width: 120,
      },
      {
        label: _this.$t("isWorkOut") ,//外发厂
        prop: "extFactId",
        overHidden: true,
        width: 140,
      },
      {
        label: "返仓日期",
        prop: "happenDate",
        width: 100,
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: dataPropEnum[type].materIdLabel,
        prop: "materialId",
        width: 120,
      },
      {
        label: dataPropEnum[type].materNameLabel,
        prop: "materialName",
        overHidden: true,
        // width: 250,
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 100,
      },
      {
        label: "回仓重量",
        prop: "weight",
        width: 100,
        type: "number",
        align: "right",
        precision: 2,
        formatter(r, v){
          return num2ThousandthFormat(v);
        }
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: dataPropEnum[type].weightUnitKey,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        width: 100,
      },
    ]
  }
}

// 料入仓数据
export function whseMaterInFormOp(_this) {
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
      label: "返仓通知单编号",
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
    }, {
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
export function whseMaterInDtlCrudOp(_this) {
  let type = _this.imWkType;
  let {materIdLabel,materNameLabel,materIdKey,materNameKey,weightUnitKey, weightKey} = dataPropEnum[type];
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "whseMaterInDtloid",
    column: [{
      label: materIdLabel,
      prop: materIdKey,
      width: 120
    }, {
      label: materNameLabel,
      prop: materNameKey,
      width: 200,
      overHidden: true
    }, {
      label:  _this.$t('factoryBatch'), //本厂批号,
      prop: "batchNo",
      width: 100
    }, {
      label: "返仓重量",
      prop: "retWeight",
      width: 100,
      align: "right",
      type: "number",
      formatter(r, v){
        return num2ThousandthFormat(v);
      }
    }, {
      label: "入仓重量",
      prop: weightKey,
      width: 100,
      align: "right",
      type: "number",
      formatter: (row,value) => {
        let weight = row.dtlBChildren.reduce((a,b) => a + +(b.weight || 0), 0)
        return num2ThousandthFormat(weight)
      },
      // cell: true,
    }, {
      label:  _this.$t("unit") ,//单位,
      prop: weightUnitKey,
      width: 100,
      type: "select",
      dicData: getDIC("bas_matUnit"),
    }]
  }
}

// 货位码数据
export function whseMaterInDtlaCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "whseMaterInDtlaoid",
    column: [{
      label: "货位码",
      prop: "storageNo",
      width: 100,
      cell: true,
      type: "select",
      filterable: true,
      dicData: getDicNS("whseLocation?warehouseType=" + _this.imWkType, "locationCode", "locationCode")
    },{
      label:  _this.$t("weight") ,//重量,
      prop: "weight",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter(r, v){
        return num2ThousandthFormat(v);
      }
    }]
  }
}
