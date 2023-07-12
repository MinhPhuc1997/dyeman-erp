/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-10 08:43:20
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";

let typeOfDict = getDIC("pro_typeOf")

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
  excelBtn: true,
  showSummary: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}




// 主页面查询表单皮配置
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label:  _this.$t("proCollarAccount.receiveNo") ,//收货单号
            prop: "receiveNo",
            span: 4,
            placeholder: " ",
           },
           {
            label:  _this.$t("po.poNo1"), //订单编号
            prop: "salPoNo",
            span: 4,
            placeholder: " ",
           },
           {
            label: _this.$t("proCollarAccount.receiveDate") ,//收货日期
            prop: "receiveDate",
            type: "daterange",
            span: 6,
            placeholder: " ",
           },
           {
            label:  _this.$t("proCollarAccount.deliveryNo") ,//送货单号
            prop: "deliveryNo",
            span: 4,
            placeholder: " ",
           },
           {
            label: _this.$t("auditState") ,//审核状态,
            prop: "stockState",
            placeholder: " ",
            type: "select",
            span: 4,
            dicData: getDIC("pro_stockState"),
          },
        ]
      };
}

// 主表
export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [{
        label: _this.$t("proCollarAccount.receiveNo") ,//收货单号
        prop: "receiveNo",
        width: 160
      },
      {
        label:  _this.$t("po.poNo1"), //订单编号
        prop: "salPoNo",
        width: 120,
        overHidden: true
       },
      {
        label: _this.$t("proCollarAccount.receiveDate") ,//收货日期
        prop: "receiveDate",
        width: 160,
        align: "center",
      },
      {
        label:  _this.$t("weaveJob.outFactory"), // 加工厂
        prop: "basProcessingUnitFk",
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
        width: "120",
        overHidden: true
      },
      {
        label: _this.$t("proCollarAccount.deliveryNo") ,//送货单号
        prop: "deliveryNo",
        width: 160,
      },
      {
        label: _this.$t("proCollarAccount.boxNum") ,//箱数
        prop: "boxNum",
        width: 100,
        align: "right",
      },
      {
        label: _this.$t("proCollarAccount.packageNum") ,//总包数
        prop: "packageNum",
        width: 100,
        align: "right",
      },
      {
        label: _this.$t("auditState") ,//审核状态,
        prop: "stockState",
        type: "select",
        dicData: getDIC("pro_stockState"),
        width: 160,
        align: "center",
      },
      {
        label: _this.$t("sysCreatedby") ,//操作员
        prop: "sysCreatedby",
        width: 160,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        align: "center",
      },
    ]
  };
}

export function formOp(_this, isEdit = false){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
                label: _this.$t("proCollarAccount.receiveNo") ,//收货单号
                prop: "receiveNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                disabled: true
            },
            {
                label: _this.$t("proCollarAccount.receiveDate") ,//收货日期
                prop: "receiveDate",
                type: "date",
                valueFormat: "yyyy-MM-dd",
                labelWidth: 150,
                span: 4,
                placeholder: " ",
                rules:[
                    {required: true, message: "收货日期不能为空", triggle: "blue"}
                ],
                disabled: isEdit
            },
            {
                label:  _this.$t("weaveJob.outFactory"), // 加工厂
                prop: "basProcessingUnitFk",
                type: "select",
                span: 5,
                disabled: true,
                placeholder: "",
                dicData: getDicT(
                  "basProcessingUnit",
                  "processingName",
                  "basProcessingUnitoid"
                ),
            },
            {
                label: _this.$t("proCollarAccount.deliveryNo") ,//送货单号
                prop: "deliveryNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                rules:[
                    {required: true, message: "送货单号不能为空", triggle: "blue"}
                ],
                disabled: isEdit
            },
            {
                label: _this.$t("sysCreatedby") ,//操作员
                prop: "sysCreatedby",
                span: 5,
                type: "select",
                dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
                disabled: true,
            },
        ]
    };
}

export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        height: "calc(100vh - 205px)",
        selection: false,
        page:false,
        rowKey: "proCollarAccountDtloid",
        showSummary: true,
        sumColumnList: [],
        column: [
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                width: 150,
            },
            {
                label: _this.$t("proCollarAccount.pos") ,//部位
                prop: "pos",
                width: 100,
            },
            {
                label: _this.$t("proCollarAccount.size") ,//尺寸
                prop: "size",
                width: 100,
                overHidden: true
            },
            {
                label: _this.$t("proCollarAccount.pcsNum") ,// "计划条数",
                prop: "pcsNum",
                width: 120,
                align: "right",
                overHidden: true,
                formatter(r,v){
                    return num2ThousandthFormat(v,0)
                },
            },
            {
                label:  _this.$t("unit") ,//单位,
                prop: "unit",
                width: 100,
                align: "center",
                overHidden: true,
                cell: true,
                placeholder: " "
            },
            {
                label:  _this.$t("weight") ,//重量,
                prop: "weight",
                cell: true,
                width: 100,
                align: "right",
                formatter(r,v){
                    return num2ThousandthFormat(v,1)
                },
                overHidden: true,
                placeholder: " ",
                type: "number"
            },
            {
                label:  _this.$t("proCollarAccount.realPcsNum") ,// "实际条数",
                prop: "realPcsNum",
                width: 100,
                cell: true,
                align: "right",
                placeholder: " ",
                type: "number",
                formatter(r,v){
                    return num2ThousandthFormat(v,0)
                },
            },
            {
                label: _this.$t("proCollarAccount.packageNo") ,//包号
                prop: "packageNo",
                width: 100,
                cell: true,
                placeholder: " ",
                rules:[
                    {required: true, message: "包号不能为空", triggle: "blue"}
                ]
            },
            {
                label: _this.$t("proCollarAccount.boxNo") ,//箱号
                prop: "boxNo",
                width: 120,
                cell: true,
                placeholder: " "
            },
            
        ]
    }
}

// 未生成台账数据
export function unCreateFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column:[
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                span: 5
            },
            {
                label:  _this.$t("po.poNo1"), //订单编号
                prop: "salPoNo",
                span: 5
            }
            
        ]
    }
}

export function unCreateCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                width: "140"
            },
            {
                label: _this.$t("proCollarAccount.deliveryInfo") ,// "交货情况(PCS)",
                prop: "deliveryInfo",
                slot: true,
                width: 130,
                align: "center"
            },
            {
                label:  _this.$t("weaveJob.outFactory"), // 加工厂
                prop: "outFactoryName",
                width: "120"
            },
            {
                label: _this.$t("orderNo") ,//"订单号",,
                prop: "salPoNo",
                width: "120",
                overHidden: true
            },
            {
                label:  _this.$t("weaveJob.calicoDate"), // 胚布交期"
                prop: "calicoDate",
                width: "120",
                align: "center",
            },
            {
                label: _this.$t("workDate") ,//开单日期,
                prop: "billDate",
                width: "120",
                align: "center",
            },
            {
                label: _this.$t("colorName") ,//颜色,
                prop: "colorName",
                width: "120",
                overHidden: true
            },
            {
                label: _this.$t("proCollarAccount.fabricDesc") ,//布类类别
                prop: "fabricDesc",
                overHidden: true
            },
           
        ]
    }
}




