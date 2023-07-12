/*
 * @Author: Lyl
 * @Date: 2022-01-12 15:46:05
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-02 09:11:06
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
const inExit = [
  {
    label: "A出入库口(7001扫码)",
    value: "A"
  },
  {
    label: "B出入库口",
    value: "B"
  },
  {
    label: "C出入库口(7002扫码)",
    value: "C"
  },
  {
    label: "D出入库口(7003扫码)",
    value: "D"
  },
  {
    label: "D1空笼暂存口",
    value: "D1"
  },
  {
    label: "F出入库口",
    value: "F"
  },
  {
    label: "G出入库口(7004扫码)",
    value: "G"
  },
  {
    label: "S12",
    value: "S12"
  }
];
const outExit = [
  {
    label: "A出入库口(7001扫码)",
    value: "A"
  },
  {
    label: "B出入库口",
    value: "B"
  },
  {
    label: "C出入库口(7002扫码)",
    value: "C"
  },
  {
    label: "D出入库口(7003扫码)",
    value: "D"
  },
  {
    label: "D1空笼暂存口",
    value: "D1"
  },
  {
    label: "E出库口",
    value: "E"
  },
  {
    label: "F出入库口",
    value: "F"
  },
  {
    label: "G出入库口(7004扫码)",
    value: "G"
  },
  {
    label: "S12",
    value: "S12"
  }
];

const crudCommonConfig = {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: true,
    showSummary: true,
}
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "操作类型",
        prop: "type",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        clearable: false,
        dicData: [
          {
            label: "正常入库",
            value: 1
          },
          {
            label: "正常出库",
            value: 2
          },
        ],
        change: val => {
          _this.typeChange(val.value);
        }
      },
      {
        label: "物料类别",
        prop: "goodsType",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ],
        change: val => {
          _this.changeGoodsType(val.value);
        }
      },
      {
        label: "出/入库口",
        prop: "exit",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: []
      },
      {
        label: "载具状态",
        prop: "storageState",
        clearable: false,
        span: 5,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "switch",
        dicData: [
          {
            label: "空",
            value: 1
          },
          {
            label: "占用",
            value: 0
          }
        ]
      },
      {
        label: _this.$t("weaveJobCode") , //"織單號",
        prop: "weaveJobCode",
        display: false,
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        display: false,
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        span: 6,
        // filterable: true,
        // multiple: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        // type: "select",
        placeholder: " ",
        width: 125,
        sortable: true,
        // dicData: [],
        overHidden: true
      },
      {
        label: "货位码",
        prop: "storeSiteCode",
        display: false,
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label: "层数",
        prop: "layer",
        span: 6,
        placeholder: " ",
        width: 125,
        type: "select",
        dicData: [
          {
            label: "一层",
            value: 1
          },
          {
            label: "二层",
            value: 2
          }
        ]
      }
    ]
  };
}

export function finishedCrud(_this) {
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
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    menuTitle: "称重",
    rowKey: "id",
    tree: true,
    defaultExpandAll: true,
    expandLevel: 2,
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
      {
        label: "#",
        prop: "index",
        width: 80,
        align: "center",
        display: false
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 140
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        cell: false,
        width: 120,
        placeholder: " "
        // type: "select",
        // filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        // dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("note.yardLength"), //码长
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        // precision: 1,
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("netWeight") ,//净重,
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
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: true
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
        label:  _this.$t("codeCard.originPlace"), //产地
        prop: "originPlace",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        hide: true
      },

      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: false,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
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

export function finishedStockOp(_this) {
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
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    menuTitle: "称重",
    rowKey: "id",
    tree: true,
    defaultExpandAll: true,
    expandLevel: 2,
    showSummary: false,
    sumColumnList: [],
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

export function clothCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "storeLoadCode",
        type: "count"
      },
      {
        label: " ",
        name: "clothWeight",
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
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "货位码",
        prop: "storageId",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: _this.$t("weaveJobCode") , //"織單號",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "pidNos",
        width: 150,
        align: "right",
        // sortable: true,
        span: 6,
        type: "number",
        precision: 0
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
        label: "成品期",
        prop: "productDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "胚布期",
        prop: "calicoDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("fabCode") ,//"布料编号,
        prop: "custFabricCode",
        width: 100,
        overHidden: true,
        span: 6
      },
      {
        label:  _this.$t("fabName"), //布料名称
        prop: "fabricDesc",
        width: 250,
        overHidden: true,
        span: 6
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


    ]
  };
}

export function taskForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "指令类型",
        prop: "orderType",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "正常入库",
            value: 1
          },
          {
            label: "正常出库",
            value: 2
          },
          {
            label: "验布出库",
            value: 3
          },
          {
            label: "验布入库",
            value: 4
          },
          {
            label: "松布出库",
            value: 5
          },
          {
            label: "松布入库",
            value: 6
          }
        ],
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },

      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: _this.$t("public.true"),
            value: 1
          },
          {
            label: _this.$t("public.false"),
            value: 0
          }
        ]
      },
      {
        label: _this.$t("revolve.finishState"), // 完成状态
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      }
    ]
  };
}

export function taskCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: false,
    column: [
      {
        label: "指令类型",
        prop: "orderType",
        clearable: false,
        span: 5,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "正常入库",
            value: 1
          },
          {
            label: "正常出库",
            value: 2
          },
          {
            label: "验布出库",
            value: 3
          },
          {
            label: "验布入库",
            value: 4
          },
          {
            label: "松布出库",
            value: 5
          },
          {
            label: "松布入库",
            value: 6
          }
        ],
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        width: 120,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },
      {
        label: "货位码",
        prop: "storageCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: _this.$t("public.true"),
            value: 1
          },
          {
            label: _this.$t("public.false"),
            value: 0
          }
        ]
      },
      {
        label: _this.$t("revolve.finishState"), // 完成状态
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      },
      {
        label: "完成的信息",
        prop: "finishInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "返回的信息",
        prop: "returnInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "请求返回结果",
        prop: "returnStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: _this.$t("createTime") ,//创建时间
        prop: "createTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "响应时间",
        prop: "updateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "完成时间",
        prop: "endTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      }
    ]
  };
}

export function inWhseFinishedCrud(_this) {
  return {
    ...crudCommonConfig,
    sumColumnList: [
      {
        label: " ",
        name: "vatNo",
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
      {
        label: "#",
        prop: "index",
        width: 60,
        align: "center",
        display: false
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
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120
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
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "realGramWeight",
        width: 120,
        span: 8,
        cell: false,
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "actualSideBreadth",
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

export function inWhseNoteCrud(_this) {
  return {
    ...crudCommonConfig,
    sumColumnList: [
      {
        label: " ",
        name: "vatNo",
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
      {
        label: "#",
        prop: "index",
        width: 60,
        align: "center",
        display: false
      },
      {
        label: "織單號",
        prop: "proName",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "布票號",
        prop: "noteCode",
        width: 180,
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "eachNumber",
        width: 105,
        align: "right",
        sortable: true,
        span: 6,
        type: "number"
      },
      {
        label:  _this.$t("grossWeight") ,//毛重,
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
      },
      {
        label:  _this.$t("scan.qcTakeOuts"), //QC扣减数量
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
      },
      {
        label:  _this.$t("note.clothLengthValue"), //米长
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        cell: false,
        width: 220,
        placeholder: " ",
        type: "select",
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "称重",
    sumColumnList: [
      {
        label: "共",
        name: "vatNo",
        type: "count",
        decimals: 1
      },
      {
        label: " ",
        name: "yardLength",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "netWeightLbs",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "grossWeightLbs",
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

      {
        label:  _this.$t("note.vatNo"), //缸号
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.poNo"), //訂單號
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("note.custCode"), //客戶
        prop: "custCode",
        width: 150,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label:  _this.$t("note.fabricName"), //布类名称
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        hide: true
      },
      // {
      //   label: "客布代码",
      //   // tip: "Số màu",
      //   prop: "guestFabId",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
      // {
      //   label:  _this.$t("codeCard.guestComponents"), //成份要求
      //   // tip: "Tổng cộng(KG)",
      //   prop: "guestComponents",
      //   width: 100,
      //   span: 16,
      //   placeholder: " ",
      //   hide: true
      // },
      // {
      //   label:  _this.$t("codeCard.styleNo"), //款号
      //   // tip: "Số màu",
      //   prop: "styleNo",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
      {
        label:  _this.$t("note.colorName"), //顏色
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("note.originPlace"), //产地
        prop: "originPlace",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label:  _this.$t("note.eachNumber"), //匹號
        prop: "pidNo",
        width: 100,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("note.yardLength1"), //码长
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        // precision: 1,
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("note.grossWeight"), //浮重
        prop: "grossWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        type: "number",
        minRows: 0,
        precision: 1,
        placeholder: " "
        // change: () => {}
        // type: "number",
        // precision: 1
      },
      {
        label:  _this.$t("note.grossWeightLbs"), //浮重
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("note.netWeight"), //净重
        prop: "netWeight",
        width: 150,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label:  _this.$t("note.netWeightLbs"), //净重
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("note.paperTube"), //纸管重量
        prop: "paperTube",
        width: 180,
        align: "right",
        minRows: 0,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },

      {
        label:  _this.$t("note.qcTakeOut"), //QC扣减数量
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },
      {
        label:  _this.$t("note.storeLoadCode"), //载具编号(Mã lồng thép
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 160
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        cell: true,
        width: 220,
        placeholder: " ",
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
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
      },
      {
        label:  _this.$t("note.realGramWeight"), //克重
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 130,
        span: 8,
        cell: true,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("note.actualSideBreadth"), //幅宽
        // tip: "Tổng cộng(KG)",
        prop: "actualSideBreadth",
        width: 120,
        cell: true,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
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

      {
        label:  _this.$t("note.clothChecker"), //验布员工号
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.clothCheckTime1"), //验布时间
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200
      }
    ]
  };
}

export function mainCrudSelect(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc( 100vh - 250px )",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: true,
    labelWidth: 120,
    index: false,
    column: [
      {
        label: "#", //
        prop: "index",
        width: 70,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "订单号", //
        prop: "poNo",
        width: 110,
        align: "left",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "缸号", //
        prop: "vatNo2",
        width: 170,
        align: "left",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "匹数", //
        prop: "pidNo",
        width: 60,
        align: "left",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "成品编号", //
        prop: "productNo2",
        width: 200,
        align: "left",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "净重(KG)", //
        prop: "netWeight2",
        width: 120,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "净重(LBS)", //
        prop: "netWeightLbs2",
        width: 120,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "毛重", //
        prop: "grossWeight2",
        width: 100,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "单位", //
        prop: "unit",
        width: 70,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6,
        value: "KG"
      },
      {
        label: "吗长", //
        prop: "yardLength",
        width: 70,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "用户名称", //
        prop: "custName",
        width: 170,
        align: "left",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "克重", //
        prop: "actualGramWeight",
        width: 100,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "幅宽", //
        prop: "actualSideBreadth",
        width: 100,
        align: "center",
        disabled: true,
        overHidden: true,
        span: 6
      },
    ]
  };
}

