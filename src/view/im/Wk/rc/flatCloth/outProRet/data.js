/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-11 16:22:57
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";


import { num2ThousandthFormat } from "@/utils/tools"

const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 230px)",
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



// 主界面查询表单
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: "入仓编号",
            prop: "whseInNo",
            span: 4,
            placeholder: " ",
           },
           {
            label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
            prop: "whseInDate",
            type: "daterange",
            span: 5,
            placeholder: " ",
           },
           {
            label: "检验状态",
            prop: "stockState",
            span: 4,
            type: "select",
            dicData: getDIC("pro_stockState"),
            placeholder: " ",
        },
        ]
      };
}

// 待抽取列表
export function crudOp(_this) {
    return {
      ...mainCrudOpCommon,
      selection: false,
      column: [{
          label: "入仓编号",
          prop: "whseInNo",
          width: 160
        },
        {
            label: "入仓类型",
            prop: "whseInType",
            width: 160,
            type: "select",
            align: "center",
            dicData: getDIC("whse_flatType")
        },
        {
            label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
            prop: "whseInDate",
            align: "center",
            width: 160
        },
        {
            label:  _this.$t("weaveJob.outFactory"), // 加工厂
            prop: "factoryName",
            width: 160
        },
        {
            label: "检验状态",
            prop: "stockState",
            width: 160,
            align: "center",
            type: "select",
            dicData: getDIC("pro_stockState")
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

// 查询表单皮配置
export function unCreateQueryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: _this.$t("proCollarAccount.receiveNo") ,//收货单号
            prop: "receiveNo",
            span: 5,
            placeholder: " ",
           },
           {
            label: _this.$t("proCollarAccount.deliveryNo") ,//送货单号
            prop: "deliveryNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
        ]
      };
}

// 待抽取列表
export function unCreateCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    selection: true,
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
        label: "厂家发货码",
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
    ]
  };
}

export function formOp(_this, isEdit = false){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
                label: "入仓编号",
                prop: "whseInNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                disabled: true
            },
            {
                label:  _this.$t("proClothStkinMemo.yinDate"), //入仓日期
                prop: "whseInDate",
                type: "date",
                valueFormat: "yyyy-MM-dd",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                rules:[
                    {required: true, message: "入仓日期不能为空", triggle: "blue"}
                ],
                disabled: isEdit
            },
            {
                label: _this.$t("proCollarAccount.receiveNo") ,//收货单号
                prop: "receiveNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                disabled: true
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
        showSummary: true,
        page:false,
        rowKey: "whseFlatClothInDtloid",
        sumColumnList: [
            {label: " ",name: "weight", type: "sum"},
            {label: " ",name: "inPcsNum", type: "sum"},
        ],
        column: [
            {
                label:  _this.$t("weaveJobCode") ,//织单号,
                prop: "weaveJobCode",
                width: 130,
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
                label:  _this.$t("unit") ,//单位,
                prop: "numUnit",
                width: 100,
                align: "center",
                overHidden: true,
                cell: true,
                placeholder: " "
            },
            {
                label: "入仓数量",
                prop: "inPcsNum",
                width: 100,
                cell: true,
                align: "right",
                placeholder: " ",
                formatter(r,v){
                    return num2ThousandthFormat(v,0)
                },
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
                label: _this.$t("proCollarAccount.packageNo") ,//包号
                prop: "packageNo",
                width: 100,
                placeholder: " ",
            },
            {
                label: _this.$t("proCollarAccount.boxNo") ,//箱号
                prop: "boxNo",
                width: 120,
                placeholder: " "
            },
            
        ]
    }
}





