const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: true,
  showSummary: false,
  tree: true,
  rowKey: "index",
  page: true,
};

export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label:  _this.$t("shearingBoard.invDate"), //盘点时间
      prop: "invDate",
      span: 5,
      placeholder: " ",
      type: "daterange",
      require: true,
    },
      {
        label: "盘点位置",
        prop: "invLocation",
        span: 6,
        placeholder: " ",

      },
      {
        label:  _this.$t("shearingBoard.invStoreLoadCode"), //盘点载具号"
        prop: "invStoreLoadCode",
        span: 5,
        placeholder: " ",
      },
      {
        label:  _this.$t("note.clothState"), //"胚布状态
        prop: "clothState",
        span: 6,
        type: "select",
        clearable: true,
        dicData: [
          {
            value: 0,
            label:  _this.$t("quality.notWeight"), //未称重
          },
          {
            value: 1,
            label:  _this.$t("quality.weighed"), //已称重装笼
          },
          {
            value: 2,
            label: "已入库",
          },
          {
            value: 3,
            label: "已出库",
          },
        ],
        placeholder: " ",
      },
    ],
  };
}

export function inStockCrud(_this) {
  return {
   ...mainCrudOpCommon,
    height: "calc(100vh - 255px)",
    column: [
      {
        label:  _this.$t("sn"), //序号
        prop: "index",
        width: 90,
        span: 6,
        placeholder: " ",
        disabled: true,
        align: "center",
        overHidden: true,
        sortable: true,
      },
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        align: "center",
        overHidden: true,
        sortable: true,
      },
      {
        label: "用户",
        prop: "customerName",
        width: 150,
        placeholder: " ",
        overHidden: true,
        align: "left",
        sortable: true,
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        width: 300,
        span: 6,
        placeholder: " ",
        disabled: true,
        align: "left",
        overHidden: true,
        sortable: true,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "proBatchNumber",
        width: 170,
        disabled: true,
        placeholder: " ",
        span: 6,
        align: "center",
        sortable: true,
        overHidden: true,

      },
      {
        label: "布飞编号",
        prop: "noteCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        align: "left",
        overHidden: true,
        hide: false,
        sortable: true,
      },
      {
        label: _this.$t("quality.pidNo")  , // 匹号
        prop: "eachNumber",
        disabled: true,
        placeholder: " ",
        span: 6,
        align: "center",
        width: 120,
        overHidden: true,
        sortable: true,

      },

      {
        label: _this.$t("colorName") ,//颜色,
        prop: "proColor",
        width: 150,
        align: "center",
        span: 6,
        sortable: true,
        overHidden: true,
      },

      {
        label:  _this.$t("weight") ,//重量,
        prop: "clothWeight",
        width: 100,
        align: "center",
        sortable: true,
        span: 6
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "weightUnit",
        span: 8,
        placeholder: " ",
        width: 70,
        align: "center",
        sortable: true,
        overHidden: true
      },
      {
        label: "QC剪办",
        prop: "qcTakeOut",
        span: 8,
        placeholder: " ",
        width: 120,
        align: "center",
        sortable: true,
        overHidden: true
      },
      {
        label: "载具号",
        prop: "invStoreLoadCode",
        width: 105,
        align: "center",
        sortable: true,
        span: 6,
        type: "number"
      },
      {
        label: "位置",
        prop: "invLocationCode",
        width: 120,
        align: "center",
        span: 6,
        cell: false,
        placeholder: " "
      },
    ]
  };
}

export function inStockGroupCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 255px)",
    column: [
      {
        label:  _this.$t("sn"), //序号
        prop: "index",
        width: 60,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "invStoreLoadCode",
        width: 100,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
      },
      {
        label: "载具位置",
        prop: "invLocationCode",
        width: 100,
        placeholder: "",
        overHidden: true,
        align: "left",
        sortable: true,
      },
      {
        label:  _this.$t("shearingBoard.invDate"), //盘点时间
        prop: "invDate",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
        sortable: true,
      },
    ]
  };
}

export function inStockDetailCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 255px)",
    column: [
      {
        label:  _this.$t("sn"), //序号
        prop: "index",
        width: 60,
        span: 6,
        placeholder: " ",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        align: "center",
        overHidden: true,
        sortable: true,
      },
      {
        label: "用户",
        prop: "customerName",
        width: 150,
        placeholder: " ",
        overHidden: true,
        align: "left",
        sortable: true,
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        align: "left",
        overHidden: true,
        sortable: true,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "proBatchNumber",
        width: 150,
        disabled: true,
        placeholder: " ",
        span: 6,
        align: "center",
        sortable: true,
        overHidden: true,

      },
      {
        label: "布飞编号",
        prop: "noteCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        align: "left",
        overHidden: true,
        hide: false,
        sortable: true,
      },
      {
        label: _this.$t("quality.pidNo")  , // 匹号
        prop: "eachNumber",
        disabled: true,
        placeholder: " ",
        span: 6,
        align: "center",
        width: 70,
        overHidden: true,

      },

      {
        label: _this.$t("colorName") ,//颜色,
        prop: "proColor",
        width: 120,
        align: "center",
        span: 6,
        sortable: true,
        overHidden: true,
      },

      {
        label:  _this.$t("weight") ,//重量,
        prop: "clothWeight",
        width: 100,
        align: "center",
        sortable: true,
        span: 6
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "weightUnit",
        span: 8,
        placeholder: " ",
        width: 70,
        align: "center",
      },
      {
        label: "QC剪办",
        prop: "qcTakeOut",
        span: 8,
        placeholder: " ",
        width: 90,
        align: "center",
        overHidden: true
      },
      {
        label: "位置",
        prop: "invLocationCode",
        width: 120,
        align: "center",
        span: 6,
        cell: false,
        placeholder: " "
      },
    ]
  };
}

export function inStockFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
      label:  _this.$t("weaveJobCode") ,//织单号,
      prop: "proBatchNumber",
      span: 5,
      width: 140,
        labelWidth: 120,
      hide: true,
      formslot: true,
      rules: [
        {
          message: "",
          trigger: "blur"
        }
      ]
    },
      {
        label: "胚布编号",
        prop: "noteCode",
        span: 5,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
    ],
  };
}

export function exportFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "出库时间",
      prop: "retDate",
      span: 6,
      placeholder: " ",
      valueFormat: "yyyy-MM-dd",
      type: "daterange",
    },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "poNo",
        span: 5,
        width: 140,
        labelWidth: 160,
        hide: true,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 4,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: "胚布编号",
        prop: "noteCode",
        span: 4,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
    ],
  };
}

export function exportCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 285px)",
    column: [
      {
        label:  _this.$t("sn"), //序号
        prop: "index",
        width: 60,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: "出仓编号",
        prop: "retCode",
        width: 170,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: "出仓时间",
        prop: "retDate",
        width: 200,
        valueFormat: "yyyy-MM-dd",
        span: 6,
        type:"datetime",
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "custTicket",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: "产品颜色",
        prop: "proColor",
        width: 150,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "weight",
        width: 70,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "weightUnit",
        width: 70,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "customerName",
        width: 150,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
      },
      {
        label:  _this.$t("note.qcTakeOut1"), //QC扣减数
        prop: "qcTakeOut",
        width: 120,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },

    ]
  };
}

export function importFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "出库时间",
      prop: "yinDate",
      span: 8,
      placeholder: " ",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
    },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        span: 5,
        labelWidth: 120,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
    ],
  };
}

export function importCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 285px)",
    column: [
      {
        label:  _this.$t("sn"), //序号
        prop: "index",
        width: 60,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: "入仓编号",
        prop: "yinId",
        width: 170,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: "入仓时间",
        prop: "yinDate",
        width: 200,
        valueFormat: "yyyy-MM-dd",
        span: 6,
        type:"datetime",
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "noteCode",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "poNo",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label: "产品颜色",
        prop: "proColor",
        width: 100,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "weight",
        width: 70,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "weightUnit",
        width: 70,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        width: 200,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "customerName",
        width: 150,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "left",
        overHidden: true,
      },
      {
        label:  _this.$t("note.qcTakeOut1"), //QC扣减数
        prop: "qcTakeOut",
        width: 120,
        span: 6,
        placeholder: "",
        disabled: true,
        align: "center",
        overHidden: true,
      },

    ]
  };
}

export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 255px)",
    column: [{
      label: _this.$t("orderNo") ,//"订单号",,
      prop: "po_no",
      width: 180,
    },
      {
        label: "用户",
        prop: "customer_name",
        width: 120,
        align: "center",
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "布飞编号",
        prop: "fabric_name",
        width: 160,
      },
      {
        label: _this.$t("quality.pidNo")  , // 匹号
        prop: "fabric_name",
        width: 160,
      },
      {
        label: _this.$t("colorName") ,//颜色,
        prop: "fabric_name",
        width: 160,
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "QC剪办",
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "载具号",
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "位置",
        prop: "fabric_name",
        width: 160,
      },
      {
        label:  _this.$t("shearingBoard.invStoreLoadCode"), //盘点载具号"
        prop: "fabric_name",
        width: 160,
      },
      {
        label:  _this.$t("shearingBoard.invDate"), //盘点时间
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "盘点账号",
        prop: "fabric_name",
        width: 160,
      },
    ],
  };
}

export function vehicleOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 285px)",
    column: [
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "po_no",
        width: 180,
      },
      {
        label: "用户",
        prop: "customer_name",
        width: 120,
        align: "center",
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "布飞编号",
        prop: "fabric_name",
        width: 160,
      },
    ],
  };
}

export function clothNoteOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 285px)",
    column: [
      {
      label: _this.$t("orderNo") ,//"订单号",,
      prop: "po_no",
      width: 180,
    },
      {
        label: "用户",
        prop: "customer_name",
        width: 120,
        align: "center",
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "布飞编号",
        prop: "fabric_name",
        width: 160,
      },
      {
        label: _this.$t("quality.pidNo")  , // 匹号
        prop: "fabric_name",
        width: 160,
      },
      {
        label: _this.$t("colorName") ,//颜色,
        prop: "fabric_name",
        width: 160,
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "QC剪办",
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "载具号",
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "位置",
        prop: "fabric_name",
        width: 160,
      },
      {
        label:  _this.$t("shearingBoard.invStoreLoadCode"), //盘点载具号"
        prop: "fabric_name",
        width: 160,
      },
      {
        label:  _this.$t("shearingBoard.invDate"), //盘点时间
        prop: "fabric_name",
        width: 160,
      },
      {
        label: "盘点账号",
        prop: "fabric_name",
        width: 160,
      },
    ],
  };
}

export function historyFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "胚布编号",
        prop: "noteCode",
        span: 8,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
    ],
  };
}

export function historyCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 255px)",
    column: [
      {
      label:  _this.$t("sn"), //序号
      prop: "index",
      width: 90,
    },
      {
        label: "胚布编号",
        prop: "clothNote",
        width: 220,
        align: "center",
      },
      {
        label: "内容",
        prop: "content",
        width: 200,
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "clothWeight",
        width: 100,
      },
      {
        label: "状态号码",
        prop: "clothState",
        width: 100,
      },
      {
        label: "操作时间",
        prop: "createTime",
        width: 200,
      },
      {
        label: "操作人",
        prop: "creator",
        width: 150,
      },

    ],
  };
}
