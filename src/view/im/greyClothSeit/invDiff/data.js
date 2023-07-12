/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:20:55
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-28 11:13:08
 */
import {
    getDIC,
  } from "@/config/index";

let invTypeDict = getDIC("whse_inventoryType")
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
      label: "盘点类型",
      prop: "invType",
      type: "select",
      dicData: invTypeDict,
      span: 4,
      placeholder: " ",
    },{
      label: "盘余单号",
      prop: "invDiffCode",
      span: 5,
      placeholder: " ",
    },{
      label: "布票号",
      prop: "noteCodes",
      span: 5,
      placeholder: " ",
    }
   ]
  };
}


export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    rowKey: "whseYarnPreAllocoid",
    column: [{
      label: "盘余单号",
      prop: "invDiffCode", 
      width: 140,
    },{
      label: "盘点类型",
      prop: "invType", 
      width: 100,
      align: "center",
      type: "select",
      dicData: invTypeDict,
    },{
      label: "布票号",
      prop: "noteCodes", 
      // width: 120,
      align: "center",
      overHidden: true
    },
    {
      label: "生成时间",
      prop: "sysCreated", 
      align: "center",
      overHidden: true,
      width: 120,
    }
  ]
  }
}




export function clothInvDiffFormDataOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
      label: "盘余编号",
      prop: "invDiffCode",
      span: 4,
      disabled: true
    },{
      label: "盘余类型",
      prop: "invType",
      type: "select",
      dicData: invTypeDict,
      span: 4,
      disabled: true
    },
    {
      label: "布票号",
      prop: "noteCode",
      span: 6,
      formslot: true
    },]
  };
}

export function clothInvDiffDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 245px)",
    rowKey: "whseClothInvDtloid",
    page: true,
    column: [
      {
        label: "织单号",
        prop: "proName",
        width: 120,
        overHidden: true,
      },
      {
        label: "本厂PO",
        prop: "poNo",
        width: 120,
        overHidden: true,
      },
      {
        label: "布飞名称",
        prop: "fabricName",
        overHidden: true,
        width: 150,
      },
      {
        label: "匹号",
        prop: "eachNumber",
        width: 120,
      },
      {
        label: "布票号",
        prop: "noteCode",
        width: 200,
        overHidden: true
      },
      {
        label: "原始库存",
        prop: "clothWeight",
        width: 120,
        align: "right",
        formatter(r,v){
          return v && _this.$num2ThousandthFormat(v,1)
        }
      },
      {
        label: "实际库存",
        prop: "realWeight",
        width: 120,
        align: "right",
        formatter(r,v){
          return v && _this.$num2ThousandthFormat(v,1)
        }
      },
      {
        label: "备注",
        prop: "remarks",
        overHidden: true
      },
    ]
  }
}


