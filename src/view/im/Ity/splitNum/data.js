/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-25 14:52:28
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-28 11:48:19
 */


import {
    getDIC,
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
    rowKey: "index",
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
        label: "材料类型",
        prop: "materialType",
        span: 5,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_seitLoc_matType")
      }, {
        label:  "供应商批号", //本厂批号,
        prop: "oBatNo",
        span: 5,
        placeholder: " ",
      }, {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "oBatchNo",
        span: 5,
        placeholder: " ",
      }]
    };
  }
  
  
export function mainCrudOp(_this) {
    return {
        ...mainCrudOpCommon,
        labelWidth: "150",
        column: [{
                label: "拆数编号",
                prop: "splitNo", 
                width: 120,
                placeholder: " ",
                disabled: true,
                span: 6
            }, 
            {
                label: "材料类型",
                prop: "matType",
                width: 100,
                align: "center",
                type: "select",
                dicData: getDIC("whse_seitLoc_matType"),
                placeholder: " ",
                disabled: true,
                span: 6
            }, 
            {
                label: "物料名称",
                prop: "matName",
                width: 130,
                align: "center",
                overHidden: true,
                placeholder: " ",
                disabled: true,
                span: 6
            },
            {
                label: "物料编号",
                prop: "matCode",
                width: 100,
                placeholder: " ",
                disabled: true,
                span: 6
            },
            {
                label: "供应商批号",
                prop: "oldBatId",
                width: 180,
                overHidden: true,
                placeholder: " ",
                disabled: true,
                span: 6
            },
            {
                label: "本厂批号",
                prop: "oldBatchNo",
                width: 120,
                placeholder: " ",
                disabled: true,
                span: 6
            },
            {
                label: "供应商批号(拆出)",
                prop: "newBatId",
                width: 220,
                overHidden: true,
                placeholder: " ",
                span: 6
            },
            {
                label: "本厂批号(拆出)",
                prop: "newBatchNo",
                width: 140,
                placeholder: " ",
                disabled: true,
                span: 6
            },
            {
                label: _this.$t("loomSchedule.state") , //状态
                prop: "splitStatus",
                display: false,
                align: "center",
                width: 100,
                type: "select",
                dicData: getDIC("whse_split_status")
            },
        ]
    }
}


export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        column: [
            {
                label: "流水单号",
                prop: "whseCode",
                width: 140,
            },
            {
                label: "流水日期",
                prop: "whseDate",
                width: 120,
            },
            {
                label: "流水类型",
                prop: "whseType",
                width: 120,
            },
            {
                label: "原批号流水重量(KG)",
                prop: "oldWeight",
                width: 170,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v,2)
                }
            },
            {
                label: "拆数(KG)",
                prop: "spWeight",
                width: 120,
                cell: true,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v,2)
                }
            },
            {
                label: "被拆余数(KG)",
                prop: "beSpWeight",
                width: 120,
                align: "right",
                formatter(r,v){
                    let val = r.oldWeight - (r.spWeight || 0);
                    return val && _this.$num2ThousandthFormat(val,2)
                }
            },
            {
                label: "货位码",
                prop: "storageNo",
                width: 120,
                align: "right"
            }
        ]
    }
}