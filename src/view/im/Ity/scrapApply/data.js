/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:20:55
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-09 13:58:12
 */
import {
    getDIC,
    getDicT,
    getDicNS
  } from "@/config/index";

let matTypeDict = getDIC("bas_censorshipVarieties");
console.log("matTypeDict", matTypeDict)
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
      label: "物料类型",
      prop: "matType",
      type: "select",
      dicData: matTypeDict,
      span: 4,
      placeholder: " ",
    },{
      label: "申请单号",
      prop: "applyCode",
      span: 4,
      placeholder: " ",
    },{
      label: "物料批号",
      prop: "batchNo",
      span: 4,
      placeholder: " ",
    },
    {
      label: "是否确认",
      prop: "hasConfirm",
      span: 4,
      placeholder: " ",
      type: "select",
      dicData: [
        {value: 0, label: "未确认"},
        {value: 1, label: "已确认"},
      ]
    },
   ]
  };
}


export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    rowKey: "whseYarnPreAllocoid",
    column: [{
      label: "申请单号",
      prop: "applyCode", 
      width: 120,
    },{
      label: "物料类型",
      prop: "matType", 
      width: 100,
      align: "center",
      type: "select",
      dicData: matTypeDict,
    },{
      label: "申请日期",
      prop: "applyDate", 
      width: 120,
      align: "center",
    },{
      label: "申请部门",
      prop: "applyDpt", 
      width: 100,
      align: "center",
      overHidden: true
    },{
      label: "申请人",
      prop: "applyer", 
      width: 100,
      align: "center",
      type: "select",
      dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
    },{
      label: "本厂批号",
      prop: "batchNos",
      width: 120,
      overHidden: true
    },{
      label: "报废原因",
      prop: "scrapReason", 
      // width: 100,
      overHidden: true,
      align: "center",
    },{
      label: "建议处理方案",
      prop: "solveMethod", 
      // width: 100,
      overHidden: true,
      align: "center",
    },
    {
      label: "是否确认",
      prop: "hasConfirm", 
      width: 100,
      type: "switch",
      align: "center",
      slot: true
    },
    // {
    //   label: "操作用户",
    //   prop: "sysCreatedby", 
    //   overHidden: true,
    //   width: 90,
    //   type: "select",
    //   dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
    // }
  ]
  }
}




export function scrapApplyFormDataOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
      label: "申请单号",
      prop: "applyCode",
      span: 4,
      placeholder: " ",
      disabled: true
    },{
      label: "物料类型",
      prop: "matType",
      type: "select",
      dicData: matTypeDict,
      span: 5,
      placeholder: " ",
    },{
      label: "申请日期",
      prop: "applyDate",
      type: "date",
      valueformat: "yyyy-MM-dd",
      span: 5,
      placeholder: " ",
    },{
      label: "申请部门",
      prop: "applyDpt",
      span: 5,
      placeholder: " ",
      formslot: true
    },{
      label: "申请人",
      prop: "applyer",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
      disabled: true,
    },{
      label: "报废原因",
      prop: "scrapReason",
      span: 24,
      placeholder: " ",
    },{
      label: "建议处理方案",
      prop: "solveMethod",
      span: 24,
      placeholder: " ",
    }]
  };
}

export function scrapApplyDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 265px)",
    rowKey: "whsePreAllocDtloid",
    page: false,
    column: [
    {
      label: "来源",
      prop: "inputType",
      width: 120,
      type: "select",
      align: "center",
      dicData: getDIC("whse_scrap_type")
    },{
      label: "物料编号",
      prop: "matCode",
      width: 120,
      slot: true
    },{
      label: "物料名称",
      prop: "matName",
      width: 300,
      overHidden: true,
      slot: true
    },{
      label: "纱牌",
      prop: "yarnBoard",
      width: 100,
      hide: _this.whseMatScrapApplyData && _this.whseMatScrapApplyData.matType != "SX",
      overHidden: true,
      slot: true
    },{
      label: "供应商批号",
      prop: "batId",
      width: 130,
      overHidden: true,
      hide: false,
      slot: true
    },{
      label: "本厂批号",
      prop: "batchNo",
      width: 100,
      slot: true
    },{
      label: "报废数量",
      prop: "scrapAmount",
      width: 120,
      cell: true,
      placeholder: " ",
      align: "right",
      formatter(r,v){
        return v && _this.$num2ThousandthFormat(v,2)
      }
    },{
      label: "备注",
      prop: "remarks",
      cell: true
    }]
  }
}


