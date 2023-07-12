/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-25 14:52:28
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-20 09:53:41
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
        label: "数据来源",
        prop: "inputType",
        span: 5,
        labelWidth: 100,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yarn_account_type")
      },
    //   {
    //     label: "纱线编号", //本厂批号,
    //     prop: "yarnsId",
    //     span: 5,
    //     placeholder: " ",
    //   },{
    //     label: "纱线名称", //本厂批号,
    //     prop: "yarnsName",
    //     span: 5,
    //     placeholder: " ",
    //   },{
    //     label:  _this.$t('factoryBatch'), //本厂批号,
    //     prop: "batchNo",
    //     span: 5,
    //     placeholder: " ",
    //   }
    ]
    };
  }
  
  
export function mainCrudOp(_this) {
    return {
        ...mainCrudOpCommon,
        height: "calc(100vh - 255px)",
        column: [
            // {
            //     label: "纱线编号",
            //     prop: "yarnsId", 
            //     width: 100,
            //     align: "center",
            // },
            // {
            //     label: "纱线名称",
            //     prop: "yarnsName", 
            //     // width: 120,
            //     align: "center",
            //     overHidden: true
            // },
            // {
            //     label: "本厂批号",
            //     prop: "batchNo", 
            //     width: 120,
            //     align: "center",
            // },
            {
                label: "交易日期",
                prop: "sysCreated", 
                width: 120,
                align: "center",
            },
            {
                label: "交易量",
                prop: "inputAmount", 
                width: 120,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v);
                }
            },
            {
                label: "数据来源",
                prop: "inputType", 
                width: 140,
                align: "center",
                type: "select",
                dicData: getDIC("whse_yarn_account_type"),
                overHidden: true
            },
            {
                label: "分配到预分配",
                align: "center",
                children: [{
                    label: "领料出仓",
                    prop: "preOutAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                },{
                    label: "分配到织单",
                    prop: "preWeaveAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                },{
                    label: "分配到PO",
                    prop: "prePoAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                }]
            },
            {
                label: "分配到织单",
                align: "center",
                children: [{
                    label: "已出仓",
                    prop: "weaveOutedAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                },{
                    label: "未出仓",
                    prop: "weaveUnoutAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                }]
            },
            {
                label: "退客人纱",
                align: "center",
                children: [{
                    label: "已出仓",
                    prop: "retOutedAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                },{
                    label: "未出仓",
                    prop: "retUnoutAmount", 
                    width: 120,
                    align: "right",
                    formatter(r,v){
                        return v && _this.$num2ThousandthFormat(v);
                    }
                }]
            },
            {
                label: "未分配",
                prop: "usableAmount", 
                width: 120,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v);
                }
            },
           
        ]
    }
}



export function queryTotalFormOp(_this) {
    return {
      submitBtn: false,
      emptyBtn: false,
      labelWidth: 100,
      column: [{
        label: "纱线编号", //本厂批号,
        prop: "yarnsId",
        span: 5,
        placeholder: " ",
      },{
        label: "纱线名称", //本厂批号,
        prop: "yarnsName",
        span: 5,
        placeholder: " ",
      },{
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        span: 5,
        placeholder: " ",
      },{
        label: "供应商批号",
        prop: "batId",
        span: 5,
        placeholder: " ",
      },{
        label: "显示0库存",
        prop: "filterZero",
        span: 3,
        type: "switch",
        change(value){
            setTimeout(() => {
                _this.handleQuery();
            }, 100);
        }
      }]
    };
  }
  

export function mainTotalCrudOp(_this) {
    return {
        ...mainCrudOpCommon,
        labelWidth: "150",
        column: [
            {
                label: "纱线编号",
                prop: "yarnsId", 
                width: 100,
                align: "center",
            },
            {
                label: "纱线名称",
                prop: "yarnsName", 
                width: 320,
                // align: "center",
                overHidden: true
            },
            {
                label: "本厂批号",
                prop: "batchNo", 
                width: 120,
                align: "center",
            },
            {
                label: "供应商批号",
                prop: "batId", 
                width: 120,
                align: "left",
                overHidden: true
            },
            {
                label: "纱牌",
                prop: "yarnsCard", 
                width: 100,
                align: "center",
                overHidden: true
            },
            {
                label: "库存数(KG)",
                prop: "stockAmount", 
                width: 120,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v,2)
                }
            },
            {
                label: "可用数(KG)",
                prop: "usableAmount", 
                width: 120,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v,2)
                }
            },
            {
                label: "占用数(KG)",
                prop: "unusableAmount", 
                width: 120,
                align: "right",
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v,2)
                }
            },
            {
                label: "更新日期",
                prop: "updateTime", 
                width: 120,
                align: "center",
            },
        ]
    }
}

