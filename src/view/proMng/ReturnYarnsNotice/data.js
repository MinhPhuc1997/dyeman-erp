/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-15 17:05:04
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";

let typeOfDict = getDIC("pro_typeOf")
let operator = getDicT("ucmlUser", "employeename", "ucmlUseroid")

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
        label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
        prop: "withdrawalNo",
        subLabel: "Mã số trả liệu",
        width: 160,
        headerslot: true
      },
      {
        label:  _this.$t("ReturnYarnsNotice.happenDate"), //退纱日期
        prop: "happenDate",
        subLabel: "Ngày trả liệu",
        width: 160,
        headerslot: true
      },
      {
        label:  _this.$t("ReturnYarnsNotice.typeOf"), // "退纱类型",
        subLabel: "Loại xả sợi",
        prop: "typeOf",
        width: 160,
        type: "select",
        dicData: typeOfDict,
        headerslot: true
      },
      {
        label: _this.$t("ReturnYarnsNotice.outFacOrRemark") ,//外发厂
        subLabel: "Nhà máy xuất khẩu",
        headerslot: true,
        prop: "extFactId",
        width: 160,
      },
      {
        label: _this.$t("sysCreatedby") ,//操作员
        prop: "sysCreatedby",
        subLabel: "Nhà điều hành",
        headerslot: true,
        width: 160,
        type: "select",
        dicData: operator,
        overHidden: true
      },
      {
        label:  _this.$t("retMatNotice.isInStock"), //已入仓
        prop: "isInStock",
        subLabel: "Đã vào kho.",
        headerslot: true,
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
    return {
        ...mainCrudOpCommon,
        selection: true,
        page:false,
        rowKey: "proYarnsWithdrawalDtloid",
        column: [
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                width: 150,
                // cell: true,
                slot: true,
                headerslot: true,
                subLabel: "Số đơn dệt",
            },
            {
                label:  _this.$t("ReturnYarnsNotice.turnWeaveJobCode") ,//转织织单号,
                prop: "turnWeaveJobCode",
                width: 150,
                hide: true,
                // cell: true,
                slot: true,
                headerslot: true,
                subLabel: "Chuyển đơn dệt",
            },
            {
                label:  _this.$t("yarnCode"), //纱线编号
                prop: "yarnsId",
                width: 115,
                headerslot: true,
                subLabel: "Mã nguyên liệu",
            },
            {
                label:  _this.$t("yarnName"), //纱线名称
                prop: "yarnsName",
                width: 350,
                overHidden: true,
                headerslot: true,
                subLabel: "Tên nguyên liệu",
            },
            {
                label:  _this.$t("yarnCard"), //纱牌,
                prop: "yarnsCard",
                width: 110,
                headerslot: true,
                subLabel: "Nhãn hiệu sợi",
            },
            {
                label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
                prop: "suppBatNo",
                width: 180,
                overHidden: true,
                headerslot: true,
                subLabel: "Số lô nhà cung ứng",
            },
            {
                label:  _this.$t('factoryBatch'), //本厂批号,
                prop: "batchNo",
                width: 110,
                headerslot: true,
                subLabel: "Số lô nhà máy",
            },
            {
                label:  _this.$t("ReturnYarnsNotice.weight1"), //退纱数量
                prop: "weight1",
                width: 120,
                type: "number",
                cell: true,
                headerslot: true,
                subLabel: "Số lượng",
            },
            {
                label:  _this.$t("ReturnYarnsNotice.weight2"), //借纱退回数量
                prop: "weight2",
                width: 120,
                type: "number",
                cell: true,
                headerslot: true,
                subLabel: "Vay số lượng",
            },
            {
                label:  _this.$t("unit") ,//单位,
                prop: "weightUnit",
                width: 100,
                type: "select",
                dicData: getDIC("bas_matUnit"),
                headerslot: true,
                subLabel: "Đơn vị",
            },
            {
                label:  _this.$t("ReturnYarnsNotice.cartonNumber"), //件数
                prop: "cartonNumber",
                width: 80,
                type: "number",
                cell: true,
                headerslot: true,
                subLabel: "Số mảnh",
            },
            {
                label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
                prop: "packSize",
                width: 120,
                cell: true,
                type: "select",
                dicData: getDIC("bas_yarnPackUnit"),
                headerslot: true,
                subLabel: "Số mảnh",
            }
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
            label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
            prop: "withdrawalNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
            labelslot: true,
            subLabel: "Mã số trả liệu"
           },
           {
            label:  _this.$t("ReturnYarnsNotice.happenDate"), //退纱日期
            prop: "happenDate",
            type: "date",
            valueFormat: "yyyy-MM-dd",
            span: 5,
            placeholder: " ",
            labelslot: true,
            subLabel: "Ngày trả liệu"
           },
           {
            label:  _this.$t("weaveJobCode") ,//织单号,
            labelWidth: 140,
            prop: "weaveJobCode",
            span: 5,
            placeholder: " ",
            labelslot: true,
            subLabel: "Số đơn dệt"
           },
           {
            label:  _this.$t("ReturnYarnsNotice.typeOf"), //退纱类型
            prop: "typeOf",
            span: 5,
            type: "select",
            dicData: typeOfDict,
            placeholder: " ",
            labelslot: true,
            subLabel: "Loại xả sợi"
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
            label:  _this.$t("ReturnYarnsNotice.withdrawalNo"), //退纱通知单编
            subLabel: "Mã số trả liệu",
            labelslot: true,
            prop: "withdrawalNo",
            disabled: true,
            labelWidth: 170,
            span: 5,
            placeholder: " ",      
           },
           {
            label:  _this.$t("ReturnYarnsNotice.happenDate"), //退纱日期
            subLabel: "SNgày trả liệu",
            labelslot: true,
            prop: "happenDate",
            type: "date",
            valueFormat: "yyyy-MM-dd",
            span: 5,
            placeholder: " ",
           },
           {
            label:  _this.$t("ReturnYarnsNotice.typeOf"), //退纱类型
            subLabel: "Loại xả sợi",
            labelslot: true,
            prop: "typeOf",
            span: 5,
            type: "select",
            dicData: typeOfDict,
            placeholder: " ",
            change({value}){
                if(!value) return;
                _this.$set(_this.dtlCrudOp.column[1], "hide", value != 2);
            }
           },
           {
            // label:  _this.$t("retMatNotice.extFactId"), //外发加工厂
            label:  _this.$t("ReturnYarnsNotice.outFacOrRemark"), //外发厂|备注
            subLabel: "Nhà máy xuất khẩu",
            labelslot: true,
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
        labelWidth: 120,
        column:[
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                span: 6
            },
            {
                label:  _this.$t("factoryBatch") ,//本厂批号,
                prop: "batchNo",
                span: 6
            },
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
                width: 150,
                cell: true,
                overHidden: true
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
                prop: "yarnsId",
                span: 6
            },
            {
                label:  _this.$t("yarnName"), //纱线名称
                prop: "yarnsName",
                span: 6
            },
            {
                label:  _this.$t("factoryBatch"), //本厂批号
                prop: "batchNo",
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
                // prop: "weight",
                prop: "usableAmount",
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