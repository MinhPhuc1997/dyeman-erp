/*
 * @Description: 
 * @Version: 1.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:58:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-04-07 11:54:48
 */


import {
  getDIC
} from "@/config/index";

let kindId = getDIC("bas_censorshipVarieties");
let invTypeDict = getDIC("whse_inventoryType")
let matUnit = getDIC("bas_matUnit");
export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "物料种类",
        prop: "materialClass",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
      },
      {
        label: "盘点类型",
        prop: "inventoryType",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: invTypeDict,
      },
    ]
  };
}

export function queryFormOp_log(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "物料种类",
        prop: "materialClass",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
      },
    ]
  };
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


export function crudOp(_this) {
  return {
   ...mainCrudOpCommon,
    column: [{
        label: "盘点编号",
        prop: "inventoryNo",
        width: 160
      },
      {
        label: "物料类别",
        //   prop: "materialClass",
        prop: "materialClassName",
        type: "select",
        width: 100
      },
      {
        label: "计划盘点日期",
        prop: "inventoryDate",
        width: 150
      },
      {
        label: "盘点类型",
        // prop: "inventoryType",
        prop: "inventoryTypeName",
        width: 100
      },
      {
        label: "盘点状态",
        // prop: "inventoryState",
        prop: "inventoryStateName",
        width: 100
      },
    ]
  };
}

export function crudOp_log(_this) {
  return {
   ...mainCrudOpCommon,
    column: [{
        label: "盘点编号",
        prop: "inventoryNo",
        width: 160
      },
      {
        label: "物料类别",
        //   prop: "materialClass",
        prop: "materialClassName",
        type: "select",
        width: 100
      },
    ]
  };
}



export function editFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
        label: "盘点编号",
        prop: "inventoryNo",
        span: 12,
        disabled: true,
        placeholder: " ",
      },
      {
        label: "物料种类",
        prop: "materialClass",
        span: 12,
        placeholder: " ",
        type: "select",
        disabled: true,
        dicData: kindId,
      },
      {
        label: "计划盘点日期",
        prop: "inventoryDate",
        span: 12,
        placeholder: "请选择",
        type: "date",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "盘点类型",
        prop: "inventoryType",
        span: 12,
        placeholder: " ",
        type: "select",
        dicData: invTypeDict,
        change: () => {
          //   _this.$nextTick(() => {
          //     if (!_this.loading) {
          //       _this.page.currentPage = 1;
          //       _this.getData();
          //     }
          //   });
        }
      },
    ],
  }
}


function getQueryFieldName(type){
  switch(type){
    case "CPB" :
      return "缸号";
    case "PB" :
      return "布飞编号";
    default:
      return "材料编号";
  }
}

// 明细数据
// 查询框
export function dtlFormOp(_this,invType){
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column:[
      {
        label: "盘点编号",
        prop: "inventoryNo",
        span: 4,
        disabled: true,
        placeholder: " ",
      },
      {
        label: "盘点类型",
        prop: "inventoryTypeName",
        span: 4,
        disabled: true,
        placeholder: " ",
      },
      {
        label: getQueryFieldName(invType),
        prop: "matCode",
        span: 4,
        placeholder: " ",
      },
      {
        label: "差异显示",
        prop: "isFilterSameQty",
        type: "switch",
        span: 4,
        change: (r) => _this.filterSameQty(r, "isFilterSameQty")
      },
      {
        label: "过滤0库存",
        prop: "isFilterZeroStock",
        type: "switch",
        span: 4,
        change: (r) => _this.filterSameQty(r, "isFilterZeroStock")
      },
      {
        label: "过滤0实数",
        prop: "isFilterZeroWeight",
        type: "switch",
        span: 4,
        change: (r) => _this.filterSameQty(r, "isFilterZeroWeight")
      }
    ]
  }
}

// 公共配置
const commonOp = {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 210px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: false,
    rowKey: "index",
    index: true,
}
const invResultCol = (_this) => {
  return {
    label: "盈|亏",
    prop: "invResult",
    width: 120,
    type: "number",
    align: "right",
    hide: !_this.hasOperate,
    formatter: (row) => {
      let diffQty = row.inventoryQty - row.stockQty
      return (diffQty > 0 ? "+" : "") + (diffQty).toFixed(2);
    },
  }
}
// 纱线
export function sxCrudOp(_this){
  return {
    ...commonOp,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "yarnsId",
        width: 120,
        fixed: true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "yarnsName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "yarnsCard",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "batId",
        cell: false,
        width: 180,
        overHidden: true
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label: "库存数量",
        prop: "stockQty",
        cell: false,
        width: 100,
        type: "number",
        align: "right",
        precision: "2"
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
        hide: !_this.hasOperate
      },
      invResultCol(_this),
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationId",
        cell: false,
        width: 120
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remarks",
        cell: true,
        width: 150,
        placeholder: " ",
        hide: !_this.hasOperate,
      }
    ]
  }
}

// 通用配置 （化工原料、燃料）
export function pubCrudOp(_this){
  return {
    ...commonOp,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialCode",
        width: 120,
        fixed: true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label: "库存数量",
        prop: "stockQty",
        cell: false,
        width: 100,
        type: "number",
        align: "right",
        precision: "2"
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
        hide: !_this.hasOperate,
      },
      invResultCol(_this),
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationId",
        cell: false,
        width: 120
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remarks",
        cell: true,
        width: 150,
        placeholder: " ",
        hide: !_this.hasOperate,
      }
    ]
  }
}


// 成品布
export function cpbCrudOp(_this){
  return {
    ...commonOp,
    column:[
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 180,
        overHidden: true,
      },
      {
        label: "布类名称" , 
        prop: "fabName",
        width: 250,
        overHidden: true,
      },
      {
        label: "客户编号", 
        prop: "cusName",
        width: 120,
        overHidden: true,
        align: "center"
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        cell: false,
        overHidden: true,
        width: 120,
        hide: _this.snapshotType == "2"
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 150,
        overHidden: true,
        hide: _this.snapshotType == "2"
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "locationCode",
        width: 120,
        overHidden: true,
        hide: _this.snapshotType == "2"
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "batchNo",
        width: 80,
        align: "right",
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "stockQty",
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      },
      {
        label: "实际重量",
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
        hide: !_this.hasOperate,
      },
      invResultCol(_this),
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remarks",
        cell: true,
        width: 200,
        placeholder: " ",
        hide: !_this.hasOperate,
      }
    ]
  }
}


// 胚布
export function pbCrudOp(_this){
  return {
    ...commonOp,
    column:[
      {
        label:  _this.$t("custName")  ,//"客户名称",
        prop: "custName",
        width: 100,
        overHidden: true,
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        width: 200,
        overHidden: true,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveNo",
        width: 150,
        overHidden: true,
      },
      {
        label: _this.snapshotType == "2" ? "疋数" : "疋號",
        prop: "batchNo",
        width: 80,
        align: "right",
      },
      {
        label: "布飞编号",
        prop: "clothCode",
        width: 170,
        overHidden: true,
        hide: _this.snapshotType == "2"
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        width: 100,
        overHidden: true,
        hide: _this.snapshotType == "2"
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "stockQty",
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      },
      {
        label: "实际重量",
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
        hide: !_this.hasOperate,
      },
      invResultCol(_this),
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label: "货位码",
        prop: "locationId",
        width: 100,
        overHidden: true,
        hide: _this.snapshotType == "2"
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remarks",
        cell: true,
        // width: 150,
        placeholder: " ",
        hide: !_this.hasOperate,
      }
    ]
  }
}




// ------------------ 月末结存 --------------------------
export function monthEndFormOp(_this){
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "物料种类",
        prop: "materialClass",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
      },
    ]
  };
}

export function monthEndEditFormOp(_this){
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "结余编号",
        prop: "inventoryNo",
        span: 12,
        placeholder: "自动生成",
        disabled: true
      },
      {
        label: "结余月份",
        prop: "inventoryDate",
        span: 12,
        placeholder: " ",
        type: "month",
        valueFormat: "yyyy-MM-15"
      },
      {
        label: "物料种类",
        prop: "materialClass",
        span: 12,
        placeholder: " ",
        type: "select",
        dicData: kindId.filter(item => ["SX","PB","CPB"].includes(item.value)),
      },
    ]
  };
}

export function monthEndCrudOp(_this){
  return {
    ...mainCrudOpCommon,
     column: [{
         label: "结余编号",
         prop: "inventoryNo",
         width: 160
       },
       {
        label: "结余月份",
        // prop: "materialClass",
        prop: "inventoryDate",
        width: 100,
        align: "center",
        formatter(r,v){
          return v && v.slice(0,7)
        }  
      },
      {
         label: "物料类别",
         // prop: "materialClass",
         prop: "materialClassName",
         type: "select",
         width: 100,
         align: "center"
       },
       {
         label: "状态",
         // prop: "inventoryState",
         prop: "inventoryStateName",
         align: "center",
         width: 100
       },
     ]
   };
}



