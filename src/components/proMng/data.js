/*
 * @Author: Lyl
 * @Date: 2021-05-03 13:03:03
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-30 09:24:39
 * @Description:
 */

import axios from "axios";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
let basHardware = getXDicT("basHardwarearticles");
let matUnit = getDIC("bas_matUnit");
let basChemical = getXDicT("BasChemicalmatNew");
let basPigment = getXDicT("basPigment");
let basProductivesupplies = getXDicT("basProductivesupplies");
let basFuel = getXDicT("basFuel");


export function fetchShipPlanData(params) {
  return axios({
    url: "/api/VwShipPlanData/page",
    method: "get",
    params: params
  });
}
export function shipPlanF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label:  "计划编号",
        prop: "spNo",
        span: 6,
      },
      {
        label:  "开始时间",
        prop: "beginLoadingDate",
        type: "date",
        align: "center",
        span: 6,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label:  "结束时间",
        prop: "endLoadingDate",
        type: "date",
        align: "center",
        span: 6,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd  HH:mm:ss"
      },
      {
        label: "货柜号",
        prop: "cabinet",
        span: 6,
      },
    ]
  };
}

export function shipPlanC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 250px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
      },
      {
        label:  "计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
      },
      {
        label:  "开始时间",
        prop: "beginLoadingDate",
        type: "date",
        align: "center",
        span: 6,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label:  "结束时间",
        prop: "endLoadingDate",
        type: "date",
        align: "center",
        span: 6,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "货柜号",
        prop: "cabinet",
        span: 6,
        placeholder: " "
      },
    ]
  };
}



export function fetchBomData(params) {
  return axios({
    url: "/api/salNewbomDtla/page",
    method: "get",
    params: params
  });
}
export function bomDataF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label:  _this.$t("bomId") ,//BOM编号,
        prop: "bomId",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDicT("salNewbom", "bomId", "salNewbomoid",{}, "bomId"),
        filterable: true,
      },
      // {
      //   label: "BOM状态",
      //   prop: "salPoNo",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDIC("sal_bomState")
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custId",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: "品牌",
        prop: "brandId",
        overHidden: true,
        disabled: false,
        width: 120,
        span: 6,
      },
      {
        label: "客布编号",
        prop: "guestFabId",
        span: 6,
        placeholder: " "
      },
    ]
  };
}

export function bomDataC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 210px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("custCode"), //客戶名称,
        prop: "custId",
        overHidden: true,
        disabled: false,
        width: 160,
        span: 6,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "品牌",
        prop: "brandId",
        overHidden: true,
        disabled: false,
        width: 120,
        span: 6,
      },
      {
        label: "客布编号",
        prop: "guestFabId",
        overHidden: true,
        width: 120,
      },
      {
        label:  _this.$t("bomId") ,//BOM编号,
        prop: "salNewbomFk",
        overHidden: true,
        width: 120,
        span: 6,
        sortable: true,
        type: "select",
        dicData: getDicT("salNewbom", "bomId", "salNewbomoid")
      },
      {
        label: "客人成分要求",
        prop: "guestComponents",
        width: 250,
        span: 6,
        overHidden: true
      },
      {
        label: "客布布名",
        prop: "guestFabNames",
        overHidden: true,
        width: 250,
      },
      {
        label: "客人布料描述",
        prop: "guestFabName",
        overHidden: true,
        width: 250,
      },
      
      {
        label: "布名称",
        prop: "fabName",
        overHidden: true,
        width: 250,
      },
      
      {
        label:  _this.$t("needleDist") ,//针距,
        prop: "needleDistance",
        width: 80,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("tubeDiam") ,//筒径
        prop: "syringeDiameter",
        width: 80,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("needleCount") ,//縂針數
        prop: "totalNeedle",
        width: 80,
        placeholder: " ",
        type: "number",
        span: 6,
      },
    ]
  };
}


export function energeStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      }
    ]
  };
}

export function energeStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    selection: true,
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "officeId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "officeName",
        type: "select",
        overHidden: true,
        width: 180
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "storageNo",
        cell: false,
        overHidden: true,
        width: 140
      }
    ]
  };
}

export function getEnergStock(params) {
  return axios({
    url: "/api/viewOfficeStock/page",
    method: "get",
    params: params
  });
}

export function equipmentStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      }
    ]
  };
}

export function equipmentStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    selection: true,
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "equipmentId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "equipmentName",
        type: "select",
        overHidden: true,
        width: 180
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "storageNo",
        cell: false,
        overHidden: true,
        width: 140
      }
    ]
  };
}

export function getEquipmentStock(params) {
  return axios({
    url: "/api/viewEquipmentStock/page",
    method: "get",
    params: params
  });
}


export function inWhseStoreF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "palletCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "货位码",
        prop: "storageId",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function inWhseStoreC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: false,
    page: true,
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 100,
        fixed: true
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        fixed: true
      },
      {
        label:  _this.$t("checkPlan.sumPid"), //总疋数
        prop: "piiCount",
        width: 80,
        span: 6,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "pidNos",
        width: 160,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storageId",
        cell: false,
        width: 120,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "客人訂單號",
        prop: "custPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "本厂訂單號",
        prop: "salPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label:  _this.$t("workDate") ,//开單日期,
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliveDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("fabCode") ,//"布料编号,
        prop: "fabricCode",
        width: 100,
        overHidden: true,
        // sortable: true,
        span: 6
      },
      {
        label:  _this.$t("fabName"), //布料名称
        prop: "fabName",
        width: 250,
        overHidden: true,
        span: 6
      },

      {
        label:  _this.$t("firstOrOther") ,//头缸/缸差,
        disabled: false,
        prop: "firstOrOther",
        width: 100,
        type: "switch",
        dicData: [
          {
            label:  _this.$t("firstVat") ,//头缸,
            value: "1"
          },
          {
            label:  _this.$t("otherVat") ,//缸差,
            value: "2"
          }
        ],
        hide: false,
        placeholder: " "
      },

      {
        label:  _this.$t("colorName"), //顏色,
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        width: 120,
        span: 8,
        cell: false,
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "breadth",
        width: 120,
        cell: false,
        span: 8,
        align: "left",
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}

export function getInWhseStore(params) {
  return axios({
    url: "/api/viewWmsTray/page",
    method: "get",
    params: params
  });
}


export function officeStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      }
    ]
  };
}
export function officeStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    selection: true,
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "officeId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "officeName",
        type: "select",
        overHidden: true,
        width: 180
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "storageNo",
        cell: false,
        overHidden: true,
        width: 140
      }
    ]
  };
}
export function getOfficeStock(params) {
  return axios({
    url: "/api/viewOfficeStock/page",
    method: "get",
    params: params
  });
}

export function hardwareStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      }
    ]
  };
}
export function hardwareStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    selection: true,
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "accessoriesId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "accessoriesName",
        type: "select",
        overHidden: true,
        width: 180
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "storageNo",
        cell: false,
        overHidden: true,
        width: 140
      }
    ]
  };
}
export function getHardwareStock(params) {
  return axios({
    url: "/api/viewHardwareStock/page",
    method: "get",
    params: params
  });
}

export function scflStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      }
    ]
  };
}
export function scflStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    selection: true,
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "accessoriesId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "accessoriesName",
        type: "select",
        overHidden: true,
        width: 180
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: false,
        overHidden: true,
        width: 140
      }
    ]
  };
}
export function getScflStock(params) {
  return axios({
    url: "/api/viewAccessoriesStock/page",
    method: "get",
    params: params
  });
}

export function getFinishedNote(params) {
  return axios({
    url: "/api/proFinalProductCard/page",
    method: "get",
    params: params
  });
}
export function finishedNoteF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "poNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        span: 6,
        placeholder: " ",
        // type: "select",
        // dicData: getDicT("proBleadyeRunJob","vatNo","vatNo"),
        // filterable: true
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "pidNo",
        tip: "Số cây vải",
        span: 6,
        placeholder: " "
      },
      {
        label: "选中集合",
        prop: "pidNos",
        span: 6,
        placeholder: " ",
        change: val => {
          if (!val.value) {
            return;
          }
          _this.$refs.proChoice.toggleSelection();
          _this.$nextTick(() => {
            val.value.split(",").forEach(item => {
              let data = _this.crud.filter(val => val.pidNo == Number(item))[0];
              // let data = _this.crud[Number(item) - 1];
              if (data) {
                _this.$refs.proChoice.toggleRowSelection(data);
              }
            });
          });
        }
      }
    ]
  };
}

export function finishedNoteC(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 260px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    selectable: (row, index) => {
      return  _this.choiceQ.hasWhseVouch ?  row.whseVouch !== 9   : true
    },
    menuTitle: "称重",
    rowKey: "cardId",
    showSummary: false,
    sumColumnList: [
      {
        label: " ",
        name: "productNo",
        type: "count"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      // {
      //   label: _this.$t("driving.carriageStorageCode"), //载具编号,
      //   prop: "storeLoadCode",
      //   span: 8,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   sortable: true,
      //   width: 140
      // },
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "poNo",
        span: 6,
        placeholder: " ",
        width: 150,
        overHidden: true
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 60,
        align: "right",
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 170,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.netWeight1"), //净重
        prop: "netWeight",
        width: 100,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label:  _this.$t("note.netWeightLbs1"), //净重
        prop: "netWeightLbs",
        width: 100,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label:  _this.$t("unit"), //單位
        prop: "weightUnit",
        width: 80,
        display: false,
        placeholder: " ",
        span: 6,
        type: "select",
        dicData: matUnit
      },
      {
        label:  _this.$t("note.yardLength"), //码长
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 80,
        span: 8,
        type: "number",
        align: "right",
        // precision: 1,
        minRows: 0,
        placeholder: " "
      },

      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("colorName"), //顏色,
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label:  _this.$t("gramWeight"), //克重,
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 120,
        span: 8,
        cell: false,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        // tip: "Tổng cộng(KG)",
        prop: "actualSideBreadth",
        width: 120,
        cell: false,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("clothFly.clothChecker"), //验布员工号
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.clothCheckTime"), //"验布时间
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 160
      }
    ]
  };
}

export function getBaseStepPackage(params) {
  return axios({
    url: "/api/baseWorkPackage/page",
    method: "get",
    params: params
  });
}
export function baseStepPackageF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "包编号",
        prop: "packageCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "包名称",
        prop: "packageName",
        span: 6,
        placeholder: " "
      },
      {
        label: "工作包类型",
        prop: "packageType",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "染整",
            value: "dye"
          },
          {
            label: "织造",
            value: "weave"
          },
          {
            label: "印花",
            value: "printing"
          }
        ]
      }
    ]
  };
}

export function baseStepPackageC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 162px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    // tree: true,
    selection: true,
    // rowKey: "stepId",
    column: [
      // {
      //   label: "#",
      //   prop: "sn",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      {
        label: "包编号",
        prop: "packageCode",
        span: 6,
        width: 120,
        placeholder: " "
      },
      {
        label: "包名称",
        prop: "packageName",
        span: 6,
        width: 140,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "工作包类型",
        prop: "packageType",
        span: 6,
        width: 120,
        placeholder: " ",
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "染整",
            value: "dye"
          },
          {
            label: "织造",
            value: "weave"
          },
          {
            label: "印花",
            value: "printing"
          }
        ]
      },
      {
        label: "包描述",
        prop: "packageDesc",
        span: 6,
        width: 350,
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}

export function getBaseStep(params) {
  return axios({
    url: "/api/baseWorkStep/page",
    method: "get",
    params: params
  });
}
export function baseStepF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("loomSchedule.opCode") , //编号
        prop: "stepCode",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "stepName",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function baseStepC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 162px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    // tree: true,
    selection: true,
    // rowKey: "stepId",
    column: [
      // {
      //   label: "#",
      //   prop: "sn",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      {
        label: _this.$t("loomSchedule.opCode") , //编号
        prop: "stepCode",
        span: 6,
        width: 120,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "stepName",
        span: 6,
        width: 550,
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("ProWorkflow.stepDescribe"), //描述信息
        prop: "stepDescribe",
        span: 6,
        width: 350,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "标准公式",
        prop: "standardFormula",
        span: 6,
        width: 350,
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}

export function salPoF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true
      },
      {
        label: "客户名稱",
        prop: "custBrandId",
        overHidden: true,
        width: 250,
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("po.poDate") ,//"订单日期,
        prop: "poDate",
        width: 130,
        type: "date",
        align: "center",
        span: 6,
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("po.poType") ,//"订单类别,
        prop: "poType",
        width: 110,
        span: 6,
        type: "select",
        dicData: getDIC("sal_poType")
      },

      {
        label: _this.$t("po.poStatus") ,//"订单狀態,
        prop: "poStatus",
        width: 110,
        type: "select",
        span: 6,
        dicData: getDIC("sal_poStatus")
      }
    ]
  };
}
export function salPoC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    rowKey: "sn",
    tree: true,
    // childrens: "sdc",
    // children: "sdc",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true,
        overHidden: true
      },
      {
        label: "客户訂單號",
        prop: "custPoNo",
        width: 150,
        span: 6,
        overHidden: true,
        sortable: true
      },

      {
        label: "客户名稱",
        prop: "custBrandId",
        overHidden: true,
        width: 150,
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("po.poDate") ,//"订单日期,
        prop: "poDate",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("po.poType") ,//"订单类别,
        prop: "poType",
        width: 110,
        type: "select",
        dicData: getDIC("Sal_newPoType")
      },

      {
        label: _this.$t("po.poStatus") ,//"订单狀態,
        prop: "poState",
        width: 110,
        type: "select",
        dicData: getDIC("sal_poStatus")
      }
    ]
  };
}
export function getSalPo(params) {
  return axios({
    url: "/api/salNewpo/page", //pages
    method: "get",
    params: params
  });
}

export function hgylStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      }
    ]
  };
}
export function hgylStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: false,
    selection: true,
    // sumColumnList: [
    //   {
    //     label: " ",
    //     name: "stock",
    //     type: "sum"
    //   }
    // ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      // {
      //   label: "材料种类",
      //   prop: "kindId",
      //   width: 100,
      //   type: "select",
      //   dicData: kindId
      // },
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "storageNo",
        cell: false,
        width: 150,
        align: "center"
      }
    ]
  };
}
export function getHgylStock(params) {
  return axios({
    url: "/api/viewChemicalStock/page",
    method: "get",
    params: params
  });
}

export function ylStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId",
        width: 140,
        placeholder: " ",
        span: 6
      }
    ]
  };
}
export function ylStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    selection: true,
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    selectable: (row, index) => {
      return row.stock > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      // {
      //   label: "材料种类",
      //   prop: "kindId",
      //   width: 100,
      //   type: "select",
      //   dicData: kindId
      // },
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}
export function getYlStock(params) {
  return axios({
    url: "/api/viewDyestuffStock/page",
    method: "get",
    params: params
  });
}

export function sxStockF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label:  _this.$t("yarnCode"), //纱线编号
        prop: "yarnsId",
        cell: false,
        placeholder: " ",
        span: 4
      },
      {
        label:  _this.$t("yarnName"), //纱线名称
        prop: "yarnsName",
        cell: false,
        placeholder: " ",
        span: 4
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        disabled: false,
        span: 4
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: false,
        placeholder: " ",
        span: 4
      },
      {
        label: _this.$t("whseField.glkkc"),
        prop: "filterEmpty",
        type: "switch",
        span: 4,
        change(value){
          setTimeout(() => {
            _this.query();
          }, 300);
         
        }
      }
    ]
  };
}
export function sxStockC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: false,
    selection: true,
    // sumColumnList: [
    //   {
    //     label: " ",
    //     name: "weight",
    //     type: "sum"
    //   }
    // ],
    selectable: (row, index) => {
      return _this.choiceQ.isOut ? true :  row.weight > 0;
    },
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      // {
      //   label: "材料种类",
      //   prop: "kindId",
      //   width: 100,
      //   type: "select",
      //   dicData: kindId
      // },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        width: 140,
        overHidden: true
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: _this.$t("whseField.sp"),
        prop: "yarnsCard",
        type: "select",
        overHidden: true,
        width: 120
      },
      {
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "batId",
        type: "select",
        overHidden: true,
        width: 120
      },
      {
        label:  _this.$t("factoryYarnBatch"), //本厂纱批号
        prop: "batchNo",
        cell: false,
        width: 180,
        overHidden: true
      },
      {
        label: "库存数量",
        prop: "weight",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: false,
        overHidden: true,
        width: 120
      }
    ]
  };
}
export function getSxStock(params) {
  return axios({
    url: "/api/viewYarnStock/page",
    method: "get",
    params: params
  });
}

export function cpbInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.gh"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: true,
        span: 6,
        width: 180
      }
    ]
  };
}
export function cpbInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.gh"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      // {
      //   label: _this.$t("whseField.bph"),
      //   prop: "fabticket",
      //   cell: true,
      //   width: 230
      // },
      {
        label: _this.$t("whseField.ph2"),
        prop: "countingNo",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        align: "right",
        width: 120
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("revolve.etSn") ,//ET序号
        prop: "etSn",
        cell: false,
        width: 200,
        overHideen: true
      }
    ]
  };
}
export function getCpbIn(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}

export function rlInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      }
    ]
  };
}
export function rlInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName", //CNNameLong
        cell: true,
        width: 350,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "chinName" : "engName",
          value: "hardwareId"
        },
        dicData: basFuel
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      }
    ]
  };
}
export function getRlIn(params) {
  return axios({
    url: "/api/whseEnergyDtl/page",
    method: "get",
    params: params
  });
}

export function hgylInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId", //CNNameLong
        cell: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalName", //CNNameLong
        cell: true,
        width: 120,
        span: 6,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "chinName" : "engName",
          value: "hardwareId"
        },
        dicData: basChemical
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      }
    ]
  };
}
export function hgylInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId", //CNNameLong
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalName", //CNNameLong
        cell: true,
        width: 350,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "chinName" : "engName",
          value: "hardwareId"
        },
        dicData: basChemical
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      }
    ]
  };
}
export function getHgylIn(params) {
  return axios({
    url: "/api/whseChemicalinDtla/v1.0/listByPage",
    method: "get",
    params: params
  });
}

export function xzInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      }
    ]
  };
}
export function xzInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName", //CNNameLong
        cell: true,
        width: 350,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "chinName" : "engName",
          value: "hardwareId"
        },
        dicData: basHardware
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      }
    ]
  };
}
export function getXzIn(params) {
  return axios({
    url: "/api/whseOfficeDtl/page",
    method: "get",
    params: params
  });
}

export function wjInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      }
    ]
  };
}
export function wjInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName", //CNNameLong
        cell: true,
        width: 350,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "chinName" : "engName",
          value: "hardwareId"
        },
        dicData: basHardware
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      }
    ]
  };
}
export function getWjIn(params) {
  return axios({
    url: "/api/whseHardwareDtl/page",
    method: "get",
    params: params
  });
}

export function scflInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      }
    ]
  };
}
export function scflInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName", //CNNameLong
        cell: true,
        width: 350,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "chinName" : "engName",
          value: "hardwareId"
        },
        dicData: basProductivesupplies
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      }
    ]
  };
}
export function getScflIn(params) {
  return axios({
    url: "/api/whseAccessoriesDtl/page",
    method: "get",
    params: params
  });
}

export function ylInF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.ylbh1"),
        prop: "chemicalId", //CNNameLong
        cell: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("whseField.ylmc1"),
        prop: "chemicalName", //CNNameLong
        cell: true,
        width: 350,
        // slot: true,
        span: 6
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        span: 6,
        width: 230
      }
    ]
  };
}
export function ylInC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.ylbh1"),
        prop: "chemicalId", //CNNameLong
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.ylmc1"),
        prop: "chemicalName", //CNNameLong
        cell: true,
        width: 350,
        type: "select",
        props: {
          label: _this.$store.state.lang === "1" ? "cnnamelong" : "ennamelong",
          value: "bcCode"
        },
        dicData: basPigment
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.cd"),
        prop: "origin",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("bas_yarnorigin")
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        width: 120
      }
    ]
  };
}
export function getYlIn(params) {
  return axios({
    url: "/api/whseDyesalInDtla/page",
    method: "get",
    params: params
  });
}

export function resolveF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label:  _this.$t('dptReciveLog.issuDate'), // 发单日期,
        prop: "workDate",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("orderMan") ,//开单员,
        prop: "serviceOperator",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 8,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}
export function resolveC(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 8,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入缸號",
            trigger: "blur"
          }
        ]
      },

      {
        label:  _this.$t("workDate") ,//开單日期,
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 130,
        span: 8,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇發單日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇發單日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliveDate",
        tip: "Ngày giao hàng",
        width: 130,
        span: 8,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇交货日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇交货日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 180,
        span: 8,
        disabled: false,
        placeholder: "請選擇織造生產單號",
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = _this.$t("choiceTem.weaveJobCode");
          _this.choiceV = true;
        }
      },
      {
        label:  _this.$t("custName"), //"客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 8,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 180,
        span: 8,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("colorCode"), //色號,
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("address") ,//交货地址,
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 180,
        span: 16,
        disabled: false,
        placeholder: " "
      },

      {
        label:  _this.$t("colorName"), //顏色名稱,
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 8
      },
      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 16
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
      },
      {
        label:  _this.$t("batchNo") ,//批号,
        prop: "yarnBatchNo",
        tip: "Mã vải",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 16,
        hide: true
      },
      {
        label:  _this.$t("weaveFactoryName") ,//织厂,
        tip: "Xưởng dệt",
        prop: "weaveFactoryName",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("mergVatNo") ,//合染缸號,
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 16,
        disabled: false,
        type: "select",
        dicData: [],
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },
      {
        label:  _this.$t("pidCount") ,//疋數,
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "合计",
        tip: "Tổng cộng(KG)",
        prop: "clothWeight",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },

      {
        label:  _this.$t("poAmountKg") ,//訂單數量,
        tip: "Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 130,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.poAmountLb = (_this.form.poAmountKg * 2.2046226).toFixed(2)
        //   })
        // }
      },
      // {
      //   label: "訂單數量(磅)",
      //   prop: "poAmountLb",
      //   width: 120,
      //   span: 8,
      //   type: "number",
      //   align: "right",
      //   placeholder: " ",
      //   hide: true,
      //   disabled: true,
      // },
      {
        label:  _this.$t("yarnCard") ,//紗牌,
        prop: "yarnCard",
        tip: "Nhãn hiệu sợi",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("yarnBatch") ,//紗批,
        tip: "Lót sợi",
        prop: "yarnNumber",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("yarnCylinder") ,//紗缸,
        tip: "Lô sợi nhà máy",
        prop: "yarnCylinder",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label:  _this.$t("poColorCount") ,//顏色種類數量,
        tip: "Số lượng màu",
        prop: "poColorCount",
        width: 120,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("poVatCount") ,//訂單總缸數,
        prop: "poVatCount",
        tip: "TC ? Bồn",
        width: 120,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("vatIndex") ,//当前第幾缸,
        prop: "vatIndex",
        tip: "Bồn thứ",
        width: 120,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("tubeDiam") ,//筒徑(Inch,
        prop: "tubeDiam",
        tip: "Khổ máy",
        span: 8,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label:  _this.$t("needleDist") ,//针距,
        tip: "Gauge",
        prop: "needleDist",
        span: 8,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label:  _this.$t("yarnLength") ,//紗長,
        tip: "Độ dài sợi",
        prop: "yarnLength",
        span: 8,
        hide: true,
        placeholder: " ",
        width: 80
        // tyep: "number"
      },
      {
        label:  _this.$t("breadth") ,//幅寬(Inch),
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 8,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("gramWeight") ,//克重,
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 8,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("compVatNo") ,//对色标准/缸号,
        tip: "Tiêu chuẩn so màu / số bồn nhuộm",
        prop: "compVatNo",
        width: 120,
        hide: true,
        span: 8,
        placeholder: " "
      },
      {
        label:  _this.$t("compLightSource") ,//对色光源,
        tip: "Nguồn sáng so màu",
        prop: "compLightSource",
        width: 120,
        hide: true,
        span: 8,
        placeholder: " ",
        type: "select",
        dicData: getDIC("sal_colorLights")
      },
      {
        label:  _this.$t("specParam") ,//规格参考,
        tip: "Tiêu chuẩn chất lượng",
        prop: "specParam",
        width: 120,
        hide: true,
        span: 16,
        placeholder: " "
      },
      {
        label: _this.$t("orderMan") ,//开单员,
        tip: "开单员",
        prop: "serviceOperator",
        width: 80,
        span: 8,
        hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("acceptRequirement") ,//收货要求,
        tip: "Nhận hàng yêu cầu",
        prop: "acceptRequirement",
        span: 16,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "审核",
        // tip:"Nhận hàng yêu cầu",
        prop: "auditor",
        width: 80,
        span: 8,
        hide: true,
        placeholder: " "
      },

      {
        label:  _this.$t("qcComments") ,//QC评语,
        prop: "qcComments",
        tip: "Nhận xét",
        span: 16,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "列印時間",
        prop: "printDate",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 8,
        disabled: true,
        display: true
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        tip: "Ghi chú",
        span: 16,
        hide: true,
        width: 80,
        placeholder: " "
      }
    ]
  };
}
export function getResolve(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

export function dyeF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label:  _this.$t('dptReciveLog.issuDate'), // 发单日期,
        prop: "workDate",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.dyeMathine"), //染缸機台號
        prop: "dyeMathine",
        span: 6,
        placeholder: " "
      },

      {
        label:  _this.$t("dye.operator"), //值機員
        prop: "operator",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}
export function dyeC(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("dye.dyeMathine"), //染缸機台號
        prop: "dyeMathine",
        overHidden: true,
        width: 130,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入染缸機台號",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入缸號",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("workDate"), //發單日期
        prop: "workDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇發單日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇發單日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliveDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇交货日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇交货日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("dye.dyeJarCount"), //管數量
        prop: "dyeJarCount",
        overHidden: true,
        width: 100,
        span: 6,
        disabled: false,
        rules: [
          {
            required: true,
            message: "請輸入管數量",
            trigger: "blur"
          }
        ],
        type: "number",
        align: "right"
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "clothWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        precision: 2,
        rules: [
          {
            required: true,
            message: "请输入重量",
            trigger: "blur"
          }
        ]
      },

      {
        label:  _this.$t("address"), //交貨地址
        prop: "address",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: false
      },
      {
        label: _this.$t("weaveJobCode") , //"織造生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: "請選擇織造生產單號"
      },
      {
        label:  _this.$t("pidCount") ,//疋數,
        prop: "pidCount",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.custCode = _this.form.custName
        //   })

        // }
      },

      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },

      {
        label: "訂單數量(公斤)",
        prop: "poAmountKg",
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "訂單數量(磅)",
        prop: "poAmountLb",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        hide: true,
        disabled: true,
        change: () => {
          // _this.$nextTick(() => {
          //   _this.form.poAmountKg = _this.form.poAmountKg * 2.2046226
          // })
        }
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
      },

      {
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 6
      },

      {
        label:  _this.$t("yarnBatch"), //紗線批號
        prop: "yarnBatchNo",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("yarnNumber"), //紗牌紗批
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("yarnCard") ,//紗牌,
        prop: "yarnCard",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label:  _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请選擇顏色名稱",
        //   trigger: "blur"
        // }],
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("mergVatNo") ,//合染缸號,
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: false,
        type: "select",
        dicData: [],
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },

      {
        label:  _this.$t("breadth"), //幅寬
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("breadthActual") ,//實用幅寬,
        prop: "breadthActual",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("breadthBorder") ,//連邊幅寬,
        prop: "breadthBorder",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "幅寬單位",
        prop: "breadthUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label:  _this.$t("tubeDiam"), //筒徑"
        prop: "tubeDiam",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label: "筒徑單位",
        prop: "tubeDiamUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: matUnit
      },

      {
        label:  _this.$t("needleDist"), //針距
        prop: "needleDist",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        tyep: "number"
      },
      {
        label: "針距單位",
        prop: "needleDistUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label:  _this.$t("yarnLength") ,//紗長,
        prop: "yarnLength",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        tyep: "number"
      },
      {
        label: "紗長單位",
        prop: "yarnLengthUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: matUnit
      },

      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("gramWeightBefor") ,//洗前(克重)",
        prop: "gramWeightBefor",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },

      {
        label:  _this.$t("poColorCount") ,//顏色種類數量,
        prop: "poColorCount",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("poVatCount") ,//訂單總缸數,
        prop: "poVatCount",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("vatIndex") ,//当前第幾缸,
        prop: "vatIndex",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("gramWeightAfter") ,//成品/洗後(克重)
        prop: "gramWeightAfter",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "對色缸號",
        prop: "compVatNo",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label:  _this.$t("colorLights"), //對色光源,
        prop: "compLightSource",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label:  _this.$t("shrinkLenth") ,//直縮,
        prop: "shrinkLenth",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },
      {
        label:  _this.$t("shrinkWidth") ,//橫縮,
        prop: "shrinkWidth",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },

      {
        label:  _this.$t("shrinkNear") ,//縮水(扭度),
        prop: "shrinkNear",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },
      {
        label:  _this.$t("shrinkRotate") ,//縮水(循環),
        prop: "shrinkRotate",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },

      {
        label:  _this.$t("hangDry"), //縮水(掛幹)
        prop: "hangDry",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },
      {
        label:  _this.$t("flatDry"), //縮水(平幹)
        prop: "flatDry",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },
      {
        label:  _this.$t("throwDry"), //縮水(拋幹)
        prop: "throwDry",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "number"
      },

      {
        label:  _this.$t("dye.mateStockMan"), //稱料員
        prop: "mateStockMan",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("specParam"), //規格參考
        prop: "specParam",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 12
      },
      {
        label:  _this.$t("dye.operator"), //值機員
        prop: "operator",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label:  _this.$t("dye.chargeWeave"), //工廠負責人
        prop: "chargeWeave",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label:  _this.$t("printDate"), //打印時間
        prop: "printDate",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      }
    ]
  };
}
export function getDye(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page", // proBleadyeJob
    method: "get",
    params: params
  });
}

export function getClothNote1(params) {
  return axios({
    url: "/api/proClothNote/matching",
    method: "get",
    params: params
  });
}
export function getClothNote(params) {
  return axios({
    url: "/api/proClothNote/page",
    method: "get",
    params: params
  });
}
export function clothNoteF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
    //   {
    //     label: "織單號",
    //     prop: "proName",
    //     span: 6,
    //     placeholder: " ",
    //     // formslot: true,
    //     // slot: true,
    //     // type: "select",
    //     tip: "MS đơn sản xuất bp Dệt"
    //   },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        tip: "Mã lồng thép",
        prop: "storeLoadCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        change: () => {
          // _this.filterList();
        }
      },
      // {
      //   label: _this.$t("poNo"), //"訂單號",
      //   prop: "poNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Số đơn hàng"
      // },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
        tip: "Mã vải",
        change: () => {
          // _this.filterList();
        }
      },
      {
        label: "机號",
        prop: "loomNo",
        span: 6,
        placeholder: " ",
        tip: "Mã máy",
        change: () => {
          // _this.filterList();
        }
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        tip: "Số cây vải",
        change: () => {
          // _this.filterList();
        }
      }

      // {
      //   label:  _this.$t("note.clothState"), //"胚布状态
      //   tip: "clothState",
      //   prop: "clothState",
      //   span: 6,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120,
      //   type: "select",
      //   defaultIndex: 0,
      //   valueDefault: 0,
      //   dicData: [
      //     // {
      //     //   label:  _this.$t("quality.notWeight"), //未称重
      //     //   value: 0
      //     // },
      //     {
      //       label: "已入库",
      //       value: 2
      //     },
      //   ],
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.query()
      //     })
      //   }
      // },
      // {
      //   label:  _this.$t("note.clothCheckTime"), //"验布时间
      //   prop: "clothCheckTime",
      //   type: "date",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   span: 6,
      //   tip: "thời gian in",
      //   placeholder: " ",
      //   align: "center",
      //   width: 180
      // }
    ]
  };
}
export function clothNoteC(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 210px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "trọng lượng",
    sumColumnList: [
      {
        label: " ",
        name: "weaveJobCode",
        type: "count"
      },
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("note.proName"), //織單號
        prop: "proName",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },

      {
        label:  _this.$t("note.storeLoadCode"), //载具编号(Mã lồng thép
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      // {
      //   label:  _this.$t("note.poNo"), //訂單號
      //   prop: "poNo",
      //   width: 150,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true
      // },
      {
        label:  _this.$t("note.noteCode"), //布票號
        prop: "noteCode",
        width: 170,
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true,
        overHidden: true
      },
      // {
      //   label:  _this.$t("custName"), //"客戶",
      //   prop: "customerName",
      //   width: 150,
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   display: false,
      //   overHidden: true
      // },
      {
        label:  _this.$t("note.fabricName"), //布类名称
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("note.colorName"), //顏色
        prop: "proColor",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label: "纱批(Lô sợi)",
        prop: "spi",
        width: 90,
        hide: true,
        span: 6
      },

      {
        label: "纱牌(Nhãn hiệu sợi)",
        prop: "sp",
        width: 90,
        hide: true,
        span: 6
      },
      // {
      //   label: "机台編號",
      //   prop: "machineCode",
      //   width: 110,
      //   hide: false,
      //   span: 6,
      //   disabled: true,

      // },
      {
        label: "机號(Mã máy)",
        prop: "loomNo",
        width: 95,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true,
        sortable: true
      },
      {
        label:  _this.$t("note.workNo"), //值机工号
        prop: "workNo",
        span: 8,
        placeholder: " ",
        width: 150,
        overHidden: true
      },
      // {
      //   label:  _this.$t("workNo"), //值机工号,
      //   prop: "workNo",
      //   width: 90,
      //   hide: false,
      //   span: 6,
      //   disabled: true,
      //   rules: [{
      //     required: true,
      //     message: "请输入值机工号",
      //     trigger: "blur"
      //   }],
      // },
      {
        label:  _this.$t("note.eachNumber"), //匹號
        prop: "eachNumber",
        width: 105,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("note.realWeight"), //毛重
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
        // type: "number",
        // precision: 1
      },
      {
        label: _this.$t("whseField.zl") + "(trọng lượng)",
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      // {
      //   label:  _this.$t("note.qcTakeOut"), //QC扣减数量
      //   prop: "qcTakeOut",
      //   width: 160,
      //   align: "center",
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   precision: 1
      // },

      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        cell: true,
        width: 220,
        placeholder: " ",
        type: "select",
        props: {
          label: "locationCode",
          value: "locationCode"
        },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getXDicT("whseLocation", "locationCode", "locationCode")
      },
      // {
      //   label:  _this.$t("unit"), //單位
      //   prop: "weightUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      // {
      //   label: "長度",
      //   prop: "clothLength",
      //   width: 80,
      //   display: false
      // },

      // {
      //   label:  _this.$t("unit"), //單位
      //   prop: "lenUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },

      // {
      //   label:  _this.$t("isPrinted"), //已打印,
      //   prop: "isPrinted",
      //   type: "select",
      //   disabled: true,
      //   dicData: [
      //     {
      //       value: true,
      //       label: _this.$t("public.true")
      //     },
      //     {
      //       value: false,
      //       label: _this.$t("public.false")
      //     }
      //   ],
      //   span: 6,
      // },
      {
        label:  _this.$t("note.remark"), //备注(
        prop: "remark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      }
      // {
      //   label:  _this.$t("quality.printedTime"), //打印时间
      //   prop: "printedTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // },
      // {
      //   label:  _this.$t("note.clothCheckTime1"), //验布时间
      //   prop: "clothCheckTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // }
    ]
  };
}

export function getWeaveJob(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}
export function weaveJobF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("weaveJobCode") , //"生產單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("startMachineDate") ,//"開機日期
        prop: "startDate",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("mathineCode") ,//"機號
        prop: "mathineCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("creator") ,//"制單人
        prop: "creator",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}

export function weaveJobC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 250px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("weaveJobCode") , //"生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: "请選擇生产单号",
        sortable: true,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请選擇生产单号",
            trigger: "blur"
          }
        ]
        // click: () => {
        //   _this.visible = true
        // }
      },
      {
        label: "胚布期",
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇出胚布日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "成品期",
        prop: "productDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇成品期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇成品期",
            trigger: "blur"
          }
        ]
      },
      // {
      //   label:  _this.$t("custName") ,//客戶名稱,
      //   prop: "custName",
      //   overHidden: true,
      //   width: 200,
      //   span: 6,
      //   placeholder: "请選擇客戶名稱",
      //   type: "select",
      //   dicData: cust,
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.form.custCode = _this.form.custName
      //     })

      //   }
      // },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        overHidden: true,
        disabled: false,
        width: 180,
        span: 6,
        placeholder: "请選擇客戶名稱",
        rules: [
          {
            required: true,
            message: "请選擇客戶名稱",
            trigger: "blur"
          }
        ],
        type: "select",
        dicData: cust
        // change: () => {
        //   if (_this.isAdd) {
        //     _this.$nextTick(() => {
        //       _this.form.weaveJobCode = _this.form.custCode + '-' + _this.code
        //     })
        //   }
        // }
      },
      {
        label: _this.$t("amount") ,//織單數量",
        prop: "amount",
        width: 100,
        placeholder: "请输入織單數量",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入織單數量",
            trigger: "blur"
          }
        ],
        type: "number",
        align: "left"
      },
      {
        label: _this.$t("startMachineDate") ,//"開機日期
        prop: "startDate",
        width: 120,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请選擇開機日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("mathineCode") ,//"機號
        prop: "mathineCode",
        span: 6,
        width: 120,
        hide: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请輸入機號",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("creator") ,//製單人
        prop: "creator",
        span: 6,
        hide: false,
        width: 100,
        disabled: false,
        rules: [
          {
            required: true,
            message: "请输入制单人",
            trigger: "blur"
          }
        ]
        // type: "select",
        // dicData:
        //   postDicT('ucmlUser', 'employeename', 'ucmlUseroid')
      },
      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabricDesc",
        overHidden: true,
        width: 250,
        span: 12,
        placeholder: "请選擇布類描述",
        rules: [
          {
            required: true,
            message: "请選擇布類描述",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [
          {
            required: true,
            message: "请選擇顏色名稱",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        width: 150,
        span: 6,
        overHidden: true
      },

      {
        label: _this.$t("gramWeightAfter") ,//成品/洗後(克重)
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("breadth") ,//門幅",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("calicoShap") ,//抽針/圓筒",
        prop: "calicoShap",
        width: 90,
        span: 6,
        hide: true,
        placeholder: " ",
        type: "switch",
        dicData: [
          {
            value: "1",
            label: _this.$t("calicoShap1") ,//抽針",
          },
          {
            value: "2",
            label: _this.$t("calicoShap2") ,//圆筒",
          }
        ]
      },

      {
        label: _this.$t("needleInch") ,//針寸數
        prop: "needleInch",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
        // type: "number",
      },
      {
        label: _this.$t("needleCount") ,//縂針數
        prop: "needleNumber",
        width: 80,
        placeholder: " ",
        type: "number",
        span: 6,
        hide: true
      },
      {
        label:  _this.$t("yarnLength") ,//紗長,
        prop: "yarnLength",
        width: 80,
        placeholder: " ",
        span: 6,
        hide: true
      },
      {
        label: "更改紗長",
        prop: "yarnLenghtChanged",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6,
        click: () => {
          // if (!_this.form.weaveJobId) {
          //   _this.$tip.error("請先保存通知單信息!");
          //   return;
          // }
          // _this.crudOp = longCrud(_this);
          // _this.visible = true;
          // _this.tabs = "更改紗長";
        }
      },

      {
        label: _this.$t("readyMadeFabric") ,//成衣面
        prop: "readyMadeFabric",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("shrinkWidth") ,//橫縮"
        prop: "horizonShrink",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: _this.$t("shrinkLenth") ,//直縮"
        prop: "verticalShrink",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label: "胚重(左)",
        prop: "calicoLeft",
        width: 90,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "胚重(中)",
        prop: "calicoMiddle",
        width: 90,
        placeholder: " ",
        hide: true,
        span: 6
      },
      {
        label: _this.$t("otherRequire") ,//其他要求
        prop: "otherRequire",
        placeholder: " ",
        hide: true,
        span: 12
      },

      {
        label: "胚重(右)",
        prop: "calicoRight",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("fallCloth") ,//落布封度
        prop: "fallCloth",
        span: 6,
        placeholder: " ",
        hide: true,
        width: 90
      },
      {
        label: _this.$t("operatProcess") ,//上機工藝
        prop: "operatProcess",
        hide: true,
        span: 12,
        placeholder: " "
      },

      {
        label: _this.$t("cylinderHeight") ,//筒口高度
        prop: "cylinderHeight",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80
      },
      {
        label: _this.$t("weaveEnter") ,//織機食位度
        prop: "weaveEnter",
        width: 80,
        placeholder: " ",
        span: 6,
        hide: true
      },
      {
        label: _this.$t("transPlate") ,//輸送盤資料
        prop: "transPlate",
        hide: true,
        placeholder: " ",
        span: 12
      },
      {
        label: _this.$t("clothRackWidth") ,//布架寬度
        prop: "clothRackWidth",
        placeholder: " ",
        hide: true,
        span: 6
      },
      {
        label: _this.$t("clothRackDesc") ,//布架資料
        prop: "clothRackDesc",
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("loopSpace") ,//循環(自動間)
        prop: "loopSpace",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("rotaSpeed") ,//轉速/重量/匹
        prop: "rotaSpeed",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "機數",
        prop: "mathineSpeed",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },

      // {
      //   label: "開單複核",
      //   prop: "reviewer",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 90,
      // },

      // {
      //   label: "矯機人簽名",
      //   prop: "machineCalibration",
      //   width: 80,
      //   span: 6,
      //   placeholder: " ",
      //   hide: true,
      // },
      // {
      //   label: "最終評語",
      //   prop: "evaluateComment",
      //   hide: true,
      //   placeholder: " ",
      //   span: 12
      // },
      // {
      //   label: "機修復核人",
      //   prop: "machineMaintenance",
      //   placeholder: " ",
      //   hide: true,
      //   span: 6
      // },
      // {
      //   label: "質檢複核",
      //   prop: "qcReviewer",
      //   hide: true,
      //   placeholder: " ",
      //   span: 6
      // },
      // {
      //   label: "運轉複核",
      //   prop: "transfer",
      //   width: 90,
      //   hide: true,
      //   placeholder: " ",
      //   span: 6
      // },

      // {
      //   label: "評語簽名",
      //   prop: "appraiser",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 80,
      // },
      {
        label: _this.$t("createTime") ,//創建日期,
        prop: "createTime",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      },

      {
        label: _this.$t("updateTime") ,//修改日期,
        prop: "upateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
        hide: true,
        display: false
      }
    ]
  };
}

export function getTechCode(params) {
  return axios({
    url: "/api/proBleadyeTechCode/page",
    method: "get",
    params: params
  });
}
export function techCodeF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "工艺代码编号",
        prop: "bleadyeCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("techCode.techPart") , //工艺分类
        prop: "techPart",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("pro_techCode"),
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
        // dicData: getDicT("basCustomer", "custName", "custCode")
      }
    ]
  };
}

export function techCodeC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("techCode.bleadyeCode") , // 工艺编号
        prop: "bleadyeCode",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        sortable: true
      },
      {
        label: _this.$t("techCode.bleadyeName") , //工艺名称
        prop: "bleadyeName",
        width: 300,
        span: 6,
        overHidden: true
      },
      {
        label: _this.$t("techCode.techPart") , //工艺分类
        prop: "techPart",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        dicData: getDIC("pro_techCode")
      },
      {
        label: _this.$t("techCode.liquorRatio") , //建议水比
        prop: "liquorRatio",
        width: 120,
        span: 6
      },
      // {
      //   label: "工艺流程图片",
      //   prop: "bleadyeImageId",
      //   span: 6,
      //   width: 250,
      // },
      {
        label: "備註",
        prop: "remark",
        span: 6
        // width: 250,
      }
    ]
  };
}

export function getTechItem(params) {
  return axios({
    url: "/api/proBleadyeCodeItem/page",
    method: "get",
    params: params
  });
}
export function TechItemF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("finalizeDesign.bleadyeType") ,//工艺类型
        prop: "bleadyeType",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: _this.$t("finalizeDesign.add_chemicalmat") ,//增加助剂
            value: "add_chemicalmat"
          },
          {
            label: _this.$t("finalizeDesign.add_pigment") ,//加颜料
            value: "add_pigment"
          },
          {
            label: _this.$t("finalizeDesign.run") ,//运行
            value: "run"
          }
        ]
      },
      {
        label: "物料編號",
        prop: "basMateId",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function TechItemC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("finalizeDesign.bleadyeType") ,//工艺类型
        prop: "bleadyeType",
        overHidden: true,
        width: 120,
        span: 6,
        type: "select",
        dicData: [
          {
            label: _this.$t("finalizeDesign.add_chemicalmat") ,//增加助剂
            value: "add_chemicalmat"
          },
          {
            label: _this.$t("finalizeDesign.add_pigment") ,//加颜料
            value: "add_pigment"
          },
          {
            label: _this.$t("finalizeDesign.run") ,//运行
            value: "run"
          }
        ]
      },
      {
        label: "物料編號",
        prop: "basMateId",
        overHidden: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("finalizeDesign.materialName") ,//物料名称
        prop: "mateName",
        width: 300,
        span: 6,
        overHidden: true
      },
      {
        label: _this.$t("techCode.useAmount") , //用量
        prop: "formulaAmount",
        width: 140,
        span: 6,
        align: "right"
      },
      {
        label:  _this.$t("unit"), //單位
        prop: "formulaUnit",
        width: 100,
        span: 6,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("techCode.measureType") , //度量單位
        prop: "measureType",
        width: 120,
        span: 6
      },
      {
        label: _this.$t("techCode.runTemp") , //行温度
        prop: "runTemp",
        span: 6,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("techCode.runTime") , //运行时间(分钟)
        prop: "runTime",
        span: 6,
        width: 140,
        align: "right"
      }
    ]
  };
}

export function getWorkStep(params) {
  return axios({
    url: "/api/baseWorkStep/tree",
    method: "get",
    params: params
  });
}

export function getBaseWorkStep(params) {
  return axios({
    url: "/api/baseWorkStep",
    method: "get",
    params: params
  });
}


export function WorkStepF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("loomSchedule.opCode") , //编号
        prop: "stepCode",
        span: 6,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            if (_this.form.stepCode != "") {
              _this.crud = _this.backups.filter(i => {
                return (
                  i.stepCode.indexOf(_this.form.stepCode) != -1 &&
                  i.stepName.indexOf(_this.form.stepName) != -1
                );
              });
            } else if (_this.form.stepName != "") {
              _this.crud = _this.backups.filter(i => {
                return i.stepName.indexOf(_this.form.stepName) != -1;
              });
            } else {
              _this.crud = _this.backups;
            }
          });
        }
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "stepName",
        span: 6,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            if (_this.form.stepName != "") {
              _this.crud = _this.backups.filter(i => {
                return (
                  i.stepCode.indexOf(_this.form.stepCode) != -1 &&
                  i.stepName.indexOf(_this.form.stepName) != -1
                );
              });
            } else if (_this.form.stepCode != "") {
              _this.crud = _this.backups.filter(i => {
                return i.stepCode.indexOf(_this.form.stepCode) != -1;
              });
            } else {
              _this.crud = _this.backups;
            }
          });
        }
      }
    ]
  };
}

export function WorkStepC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 175px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    // tree: true,
    selection: true,
    // rowKey: "stepId",
    column: [
      // {
      //   label: "#",
      //   prop: "sn",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      {
        label: _this.$t("loomSchedule.opCode") , //编号
        prop: "stepCode",
        span: 6,
        width: 120,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "stepName",
        span: 6,
        width: 550,
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("ProWorkflow.stepDescribe"), //描述信息
        prop: "stepDescribe",
        span: 6,
        width: 350,
        placeholder: " ",
        overHidden: true
      }
      // {
      //   label: "标准产能计算公式",
      //   prop: "stepCapacity",
      //   span: 6,
      //   width: 350,
      //   placeholder: " ",
      //   overHidden: true
      // },
    ]
  };
}

export function getTechargue(params) {
  return axios({
    url: "/api/baseBleadyeTechargue",
    method: "get",
    params: params
  });
}
export function techargueF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      // {
      //   label: "参数类型",
      //   prop: "paramType",
      //   span: 6,
      //   placeholder: " ",
      //   change: () => {

      //   }
      // },
      {
        label: "編號",
        prop: "paramKey",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function techargueC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 162px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    selection: true,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      // {
      //   label: "参数类型",
      //   prop: "paramType",
      //   span: 6,
      //   placeholder: " ",
      //   width: 120
      // },
      {
        label: "編號",
        prop: "paramKey",
        span: 6,
        width: 120,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "paramName",
        span: 6,
        width: 550,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "参数",
        prop: "paramDefault",
        span: 6,
        width: 120,
        placeholder: " ",
        align: "right"
      }
    ]
  };
}
