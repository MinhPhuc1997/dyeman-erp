/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:20:55
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-12 08:26:39
 */
import {
    getDIC,
    getDicT,
    getDicNS
  } from "@/config/index";

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
  index: true,
  page: true,
}


// 主页面查询表单皮配置
export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "纱线名称",
      prop: "yarnName",
      span: 4,
      placeholder: " ",
    },
    {
      label: "纱线编号",
      prop: "yarnNo",
      span: 4,
      placeholder: " ",
    },
    {
      label: "纱牌",
      prop: "yarnCard",
      span: 4,
      placeholder: " ",
    },
    {
      label: "本厂批号",
      prop: "batchNo",
      span: 4,
      placeholder: " ",
    },
    {
      label: "供应商批号",
      prop: "batId",
      span: 4,
      placeholder: " ",
    },
    {
      label: "本厂PO",
      prop: "poNo",
      span: 4,
      placeholder: " ",
    }]
  };
}


export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    rowKey: "whseYarnPreAllocoid",
    column: [{
      label: "分配单编号",
      prop: "preAllocCode", 
      width: 120,
    },{
      label: "分配日期",
      prop: "preAllocDate", 
      width: 100,
      align: "center"
    },{
      label: "生效",
      prop: "effective", 
      width: 60,
      align: "center",
      slot: true
    },{
      label: "操作用户",
      prop: "sysCreatedby", 
      overHidden: true,
      width: 90,
      type: "select",
      dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
    },]
  }
}

export function mainDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    rowKey: "whseYarnPreAllocDtloid",
    page: false,
    column: [{
      label: "材料编号",
      prop: "yarnNo", 
      width: 120,
    },{
      label: "材料名称",
      prop: "yarnName", 
      width: 150,
      overHidden: true
    },{
      label: "纱牌",
      prop: "yarnCard", 
      width: 100,
      align: "center",
      overHidden: true
    },{
      label: "供应商批号",
      prop: "batId", 
      width: 150,
      align: "center",
      overHidden: true
    },{
      label: "本厂批号",
      prop: "batchNo", 
      width: 120,
      align: "center",
    },{
      label: "分配数量",
      prop: "allocQty", 
      width: 120,
      align: "right",
      formatter(r,v){
        return v && _this.$num2ThousandthFormat(v,2)
      }
    },{
      label: "本厂PO",
      prop: "poNo", 
      width: 150,
      align: "center",
      overHidden: true
    },{
      label: "备注",
      prop: "remarks", 
    }]
  }
}


export function yarnPreAllocFormDataOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "预分配单号",
      prop: "preAllocCode",
      span: 5,
      placeholder: " ",
      disabled: true
    },{
      label: "分配日期",
      prop: "preAllocDate",
      type: "date",
      valueformat: "yyyy-MM-dd",
      span: 5,
      placeholder: " ",
    }]
  };
}

export function preAllocDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 265px)",
    rowKey: "whsePreAllocDtloid",
    page: false,
    column: [{
      label: "材料编号",
      prop: "yarnNo",
      width: 120
    },{
      label: "纱线名称",
      prop: "yarnName",
      width: 200,
      overHidden: true
    },{
      label: "供应商批号",
      prop: "batId",
      width: 130,
      overHidden: true
    },{
      label: "本厂批号",
      prop: "batchNo",
      width: 100
    },{
      label: "分配数量",
      prop: "allocQty",
      width: 120,
      cell: true,
      placeholder: " ",
      align: "right",
      formatter(r,v){
        return v && _this.$num2ThousandthFormat(v,2)
      }
    },{
      label: "分配营销单号",
      prop: "poNo",
      width: 150,
      type: "select",
      slot: true
    },{
      label: "备注",
      prop: "remarks",
      cell: true
    }]
  }
}


