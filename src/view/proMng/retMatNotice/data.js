/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-31 15:46:05
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";

let typeOfDict = getDIC("pro_typeOf")
let operator = getDicT("ucmlUser", "employeename", "ucmlUseroid")
import i18n from "@/lang/index";
export const dataTyptEnum = {
    3: {
        viewTitle: i18n.t('retMatNotice.viewTitle1') , //"化工原料退仓通知单",
        tableName: "proChemicalWithdrawal",
        dtlTableName: "proChemicalWithdrawalDtl",
        oidKey: "proChemicalWithdrawaloid",
        materialIdKey: "chemicalId",
        materialNameKey: "chemicalName",
        dtlOidKey: "proChemicalWithdrawalDtloid",
        dtlFkKey: "proChemicalWithdrawalFk",
    },
    4: {
        viewTitle:  i18n.t('retMatNotice.viewTitle2') , //"染料退仓通知单",
        tableName: "proDyesaWithdrawal",
        dtlTableName: "proDyesaWithdrawalDtl",
        oidKey: "proDyesaWithdrawaloid",
        materialIdKey: "dyesaId",
        materialNameKey: "dyesaName",
        dtlOidKey: "proDyesaWithdrawalDtloid",
        dtlFkKey: "proDyesaWithdrawalFk", 
    },
    5: {
        viewTitle: i18n.t('retMatNotice.viewTitle3') , //"生产辅料退仓通知单",
        tableName: "proAccessoriesWithdrawal",
        dtlTableName: "proAccessoriesWithdrawalDtl",
        oidKey: "proAccessoriesWithdrawaloid",
        materialIdKey: "accessoriesId",
        materialNameKey: "accessoriesName",
        dtlOidKey: "proAccessoriesWithdrawalDtloid",
        dtlFkKey: "proAccessoriesWithdrawalFk", 
    }
}


const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: true,
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
    column: [{
        label:  _this.$t("retMatNotice.withdrawalNo"), //退料通知单编号
        prop: "withdrawalNo",
        width: 160
      },
      {
        label:  _this.$t("retMatNotice.happenDate"), //退料日期
        prop: "happenDate",
        width: 160,
      },
      {
        label:  _this.$t("retMatNotice.typeOf"), //退料类型
        prop: "typeOf",
        width: 160,
        type: "select",
        dicData: typeOfDict,
      },
      {
        label: _this.$t("isWorkOut") ,//外发厂
        prop: "extFactId",
        width: 160,
      },
      {
        label: _this.$t("sysCreatedby") ,//操作员
        prop: "sysCreatedby",
        width: 160,
        type: "select",
        dicData: operator,
      },
      {
        label:  _this.$t("retMatNotice.isInStock"), //已入仓
        prop: "isInStock",
        width: 160,
        formatter:(row, value) => {
            return value ? '√' : "×"
        },
        align: "center"
      },
    ]
  };
}

export function dtlCrudOp(_this){
    console.log("_this.matType",_this.matType)
    let {materialIdKey, materialNameKey} = dataTyptEnum[_this.matType] || {};
    return {
        ...mainCrudOpCommon,
        selection: true,
        page:false,
        column: [
            {
                label:  _this.$t("retMatNotice.materialIdKey"), // "退料编号",
                prop: materialIdKey,
                width: 100,
            },
            {
                label:  _this.$t("retMatNotice.materialNameKey"), // "退料名称",
                prop: materialNameKey,
                width: 350,
                overHidden: true
            },
            {
                label:  _this.$t('factoryBatch'), //本厂批号,
                prop: "batchNo",
                width: 100,
            },
            {
                label:  _this.$t("retMatNotice.weight"), // "退回数量",
                prop: "weight",
                width: 120,
                type: "number",
                cell: true,
            },
            {
                label:  _this.$t("unit") ,//单位,
                prop: "weightUnit",
                width: 100,
                type: "select",
                dicData: getDIC("bas_matUnit"),
            },
        ]
    }
}

// 主页面查询表单皮配置
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label:  _this.$t("retMatNotice.withdrawalNo"), //退料通知单编号
            prop: "withdrawalNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
           {
            label:  _this.$t("retMatNotice.happenDate"), //退料日期
            prop: "happenDate",
            type: "date",
            valueFormat: "yyyy-MM-dd",
            span: 5,
            placeholder: " ",
           },
           {
            label:  _this.$t("retMatNotice.typeOf"), //退料类型
            prop: "typeOf",
            span: 5,
            type: "select",
            dicData: typeOfDict,
            placeholder: " ",
           }
        ]
      };
}

// 通知单维护配置
export function withDrawalFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label:  _this.$t("retMatNotice.withdrawalNo"), //退料通知单编号
            prop: "withdrawalNo",
            disabled: true,
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
           {
            label:  _this.$t("retMatNotice.happenDate"), //退料日期
            prop: "happenDate",
            type: "date",
            valueFormat: "yyyy-MM-dd",
            span: 5,
            placeholder: " ",
           },
           {
            label:  _this.$t("retMatNotice.typeOf"), //退料类型
            prop: "typeOf",
            span: 5,
            type: "select",
            dicData: typeOfDict,
            placeholder: " ",
           },
           {
            label:  _this.$t("retMatNotice.extFactId"), //外发加工厂
            prop: "extFactId",
            labelWidth: 150,
            span: 12,
           }
        ]
      };
}


// 领纱单配置
export function retYarnFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column:[
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                span: 6
            }
        ]
    }
}

export function retYarnCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                width: 120,
                cell: true,
            },
            {
                label:  _this.$t("yarnCode"), //纱线编号
                prop: "yarnsId",
                width: 120,
            },
            {
                label:  _this.$t("yarnName"), //纱线名称
                prop: "yarnsName",
                width: 200,
                overHidden: true
            },
            {
                label:  _this.$t("yarnCard"), //纱牌,
                prop: "yarnBrand",
                width: 120,
            },
            {
                label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
                prop: "suppBatchNo",
                width: 120,
                overHidden: true
            },
            {
                label:  _this.$t('factoryBatch'), //本厂批号,
                prop: "batchNo",
                width: 120,
            },
            {
                label:  _this.$t("retMatNotice.totalWeight"), //领纱数量
                prop: "totalWeight",
                width: 120,
            },
            {
                label:  _this.$t("unit") ,//单位,
                prop: "unitName",
                width: 120,
            },
        ]
    }
}


// 纱线库存表单配置
export function yarnStockFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column:[
            {
                label:  _this.$t("yarnCode"), //纱线编号
                prop: "yarnId",
                span: 6
            },
            {
                label:  _this.$t("yarnName"), //纱线名称
                prop: "yarnName",
                span: 6
            }
        ]
    }
}

export function yarnStockCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label:  _this.$t("yarnCode"), //纱线编号
                prop: "yarnsId",
                width: 120,
            },
            {
                label:  _this.$t("yarnName"), //纱线名称
                prop: "yarnsName",
                width: 200,
                overHidden: true
            },
            {
                label:  _this.$t("yarnCard"), //纱牌,
                prop: "yarnsCard",
                width: 120,
            },
            {
                label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
                prop: "batId",
                width: 120,
                overHidden: true
            },
            {
                label:  _this.$t('factoryBatch'), //本厂批号,
                prop: "batchNo",
                width: 120,
            },
            {
                label:  _this.$t("retMatNotice.inStock"), //库存数
                prop: "weight",
                width: 120,
                type: "number",
                align: "right",
                
            },
            {
                label:  _this.$t("unit") ,//单位,
                prop: "weightUnit",
                type: "select",
                dicData: getDIC("bas_matUnit"),
                width: 120,
            },
        ]
    }
}