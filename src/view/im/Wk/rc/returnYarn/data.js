/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-29 08:21:42
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
    height: "calc(100vh - 205px)",
    column: [{
        label: "入仓编号",
        prop: "yinId",
        width: 200,
      },
      {
        label: "入仓类型",
        prop: "yinType",
        width: 100,
        align: "center",
        type: "select",
        dicData: getDIC("whse_yinType")
      },
      {
        label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
        prop: "yinDate",
        width: 100,
        align: "center",
        overHidden: true
      },
      {
        label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
        prop: "registerNo",
        width: 150,
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        width: 100,
        type: "select",
        align: "center",
        dicData: getDIC("whse_yinStatus")
      },
      {
        label: "财务状态",
        prop: "finStatus",
        width: 100,
        type: "select",
        align: "center",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: "入仓状态",
        prop: "stockState",
        align: "center",
        type: "select",
        dicData: getDIC("whse_retState"),
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
      label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
    }]

  }
}

export function retYarnNoticCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    selection: true,
    column: [{
        label: "退纱通知单号",
        prop: "withdrawalNo",
        width: 120,
      },
      {
        label: _this.$t("isWorkOut") ,//外发厂
        prop: "extFactId",
        width: 120,
        hide: _this.imWkType == "4"
      },
      {
        label:  _this.$t("ReturnYarnsNotice.happenDate"), //退纱日期
        prop: "happenDate",
        align: "center",
        width: 100,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: 120,
        overHidden: true
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
        prop: "suppBatNo",
        width: 120,
        overHidden: true,
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
        formatter(r,v){
          return num2ThousandthFormat(v);
        }
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "unitName",
        width: 100,
        overHidden: true
      },
      {
        label:  _this.$t("ReturnYarnsNotice.cartonNumber"), //件数
        prop: "cartonNumber",
        width: 100,
        align: "right"
      },
      {
        label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        prop: "packName",
        width: 100,
        overHidden: true
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remarks",
        overHidden: true,
        width: 100,
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
      label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
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
      dicData: getDIC("whse_retState")
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
      prop: "suppBatNo",
      width: 120,
      overHidden: true
    }, {
      label:  _this.$t('factoryBatch'), //本厂批号,
      prop: "batchNo",
      width: 100
    }, {
      label:  _this.$t("ReturnYarnsNotice.weight1"), //退纱数量
      prop: "weight",
      width: 100,
      align: "right",
      type: "number",
      formatter(r, v){
        return num2ThousandthFormat(v);
      }
    }, {
      label: "入仓数量",
      prop: "inWeight",
      width: 100,
      align: "right",
      type: "number",
      formatter: (row,value) => {
        let inWeight = row.aChildren.reduce((a,b) => a + +(b.weight || 0), 0)
        return num2ThousandthFormat(inWeight)
      },
      // cell: true,
    }, {
      label:  _this.$t("unit") ,//单位,
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: getDIC("bas_matUnit"),
    }, {
      label:  _this.$t("weaveJobCode") ,//织单号,
      prop: "weaveJobCode",
      width: 120,
    }, {
      label:  _this.$t("remark") ,//备注,
      prop: "remarks",
      width: 100,
      overHidden: true
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
      formatter(r, v){
        return num2ThousandthFormat(v);
      }
    }, {
      label:  _this.$t("ReturnYarnsNotice.cartonNumber"), //件数
      prop: "cartonNum",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter(r, v){
        return num2ThousandthFormat(v);
      }
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
      filterable: true,
      dicData: getDicNS("whseLocation?warehouseType=0", "locationCode", "locationCode")
    }]
  }
}
