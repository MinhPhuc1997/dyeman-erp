import {getDicT} from "../../../../../config";

const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: false,
  excelBtn: false,
  showSummary: false,
  tree: true,
  rowKey: "index",
  page: true,
};

export function _storeCodeForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        span: 6,
        width: 140,
        hide: false,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: "成品布编号-Mã vải",
        prop: "productNo",
        span: 6,
        width: 140,
      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoadCode",
        span: 6,
        width: 140,
      },
      {
        label: "是否自动仓库-Kho tự động?",
        prop: "autoStorage",
        span: 4,
        type: "select",
        clearable: true,
        value: 1,
        dicData: [
          {
            value: 0,
            label: "是",
          },
          {
            value: 1,
            label: "否",
          },
        ],
        placeholder: " ",
      },
    ],
  };
}

export function _queryForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "类型 - Thể loại",
        prop: "actionEffect",
        span: 6,
        type: "select",
        clearable: true,
        dicData: getDicT("proActorAction", "actionDesc", "action", "sn"),
        placeholder: " ",
        change(val) {
          _this.changeActionType(val);
          _this.getActionCause(val);
        }, rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
      },
      {
        label: "事件起因 - Nguyên nhân",
        prop: "actionCause",
        span: 6,
        labelWidth: 210,
        type: "select",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        formslot: true,
      },

      {
        label: "事件描述-Mô tả",
        prop: "actionDesc",
        labelWidth: 130,
        span: 24,
        type: "textarea",
        minRows: 2,
        width: 140,
      },

    ],
  };
}

export function _storeCodeCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 360px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,

      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoadCode",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
        cell: true,
        slot: true,
      },
      {
        label: "货位-Vị trí",
        prop: "location",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "重量(KG)-Trọng lượng",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "重量(LBS)-Trọng lượng",
        prop: "sumWeightLbs",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
    ]
  };
}

export function _productDetail(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 270px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    selection: true,

    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "成品号码-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "定数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "重量(KG)-Trọng lượng",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "重量(LBS)-Trọng lượng",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "单位-Đơn vị",
        prop: "weightUnit",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
    ]
  };
}

export function _product(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 310px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "vatNo",
        type: "count"
      },
      {
        label: " ",
        name: "productNo",
        type: "count"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "成品号码-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "定数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "重量(KG)-Trọng lượng",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,

      },
      {
        label: "毛重",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,

      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "货位-Vị trí hàng",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
    ]
  };
}

export function _productchoice(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 360px)",

    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "成品号码-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "定数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,

      },
      {
        label: "重量(KG)-Trọng lượng",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "重量(LBS)-Trọng lượng",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "单位-Đơn vị",
        prop: "weightUnit",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
    ]
  };
}

export function _queryCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 250px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "载具编号-Mã pallet",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "匹数-Số cây",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "重量（KG）-Trọng lượng",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）-Trọng lượng",
        prop: "sd",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "货位-Vị trí",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "仓库类",
        prop: "weightUnit",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "状态-Trạng thái",
        prop: "weightUnit",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "状态-Trạng thái",
        prop: "123",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
    ]
  };
}

export function _importForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        span: 8,
        width: 140,
        hide: false,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: "批号",
        prop: "pidNo",
        span: 8,
        width: 140,
      },

    ],
  };
}

export function _crudHasStore(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(50vh - 100px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        cell: true,
        slot: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "重量（KG）-Trọng lượng",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,

      },
      {
        label: "重量（LBS）-Trọng lượng",
        prop: "sumWeightLbs",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,
      },
    ]
  };
}

export function _crudNotStore(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(50vh - 140px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "位置-Vị trí",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        cell: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "重量（KG）-Trọng lượng",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,

      },
      {
        label: "重量（LBS）",
        prop: "sumWeightLbs-Trọng lượng",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,
      },
    ]
  };
}

export function _fomOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        labelWidth: 150,
        span: 6,
        width: 140,
        placeholder: " ",
      },
      {
        label: "事件类型-Thể loại",
        prop: "actionEffect",
        span: 6,
        type: "select",
        labelWidth: 150,
        width: 200,
        clearable: true,
        dicData: getDicT("proActorAction", "actionDesc", "action", "sn"),
        placeholder: " ",
        change(val) {
          _this.getActionCause(val);
        },
      },

      {
        label: "事件编号-Mã sự kiện",
        prop: "actionCode",
        placeholder: " ",
        labelWidth: 180,
        span: 5,
        width: 140,
      },
      {
        label: "创建时间-T.Gian",
        prop: "createTime",
        span: 7,
        placeholder: " ",
        width: 100,
        labelWidth: 150,
        valueFormat: "yyyy-MM-dd",
        type: "datetimerange",

      },
      {
        label: "载具编号-Pallet",
        prop: "storeLoad",
        labelWidth: 150,
        placeholder: " ",
        span: 6,
        width: 140,
      },
      {
        label: "货位-Vị trí",
        prop: "storeLocal",
        labelWidth: 150,
        placeholder: " ",
        span: 6,
        width: 140,
      },
      {
        label: "创建人-Người tạo",
        prop: "creator",
        labelWidth: 180,
        placeholder: " ",
        span: 5,
        width: 140,
      },

      {
        label: "事件描述-Mô tả",
        prop: "actionDesc",
        labelWidth: 150,
        placeholder: " ",
        span: 7,
        width: 140,
      },

    ],
  };
}

export function _crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 295px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "事件编号-Mã số",
        prop: "actionCode",
        placeholder: "",
        align: "left",
        width: 170,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "left",
        width: 170,
        overHidden: true,
      },
      {
        label: "事件类型-Thể loại",
        prop: "actionEffect",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
        type: "select",
        dicData: getDicT("proActorAction", "actionDesc", "action")
      },
      {
        label: "事件原因",
        prop: "actionCause",
        placeholder: "",
        align: "left",
        width: 200,
        overHidden: true,
        type: "select",
        dicData: getDicT("whseFabricActionOption", "causeName", "actionCause")
      },
      {
        label: "总匹数-T.cây",
        prop: "pidNoS",
        placeholder: "",
        align: "center",
        width: 115,
        overHidden: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "left",
        width: 200,
        overHidden: true,
      },
      {
        label: "总重量净重",
        prop: "sumNetWeight",
        placeholder: "",
        align: "center",
        width: 120,
        overHidden: true,
      },
      {
        label: "总重量毛重",
        prop: "sumGrossWeight",
        placeholder: "",
        align: "center",
        width: 120,
        overHidden: true,
      },
      {
        label: "创建时间-Thời gian",
        prop: "createTime",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "载具编号-Pallet",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "货位-vị trí",
        prop: "storeLocal",
        placeholder: "",
        align: "left",
        width: 220,
        overHidden: true,
      },
      {
        label: "事件描述-Mô tả",
        prop: "actionDesc",
        placeholder: "",
        align: "left",
        width: 200,
        overHidden: true,
      },
      {
        label: "创建人-Người tạo",
        prop: "creator",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      // {
      //   label: "修改时间-Thời gian sửa",
      //   prop: "updateTime",
      //   placeholder: "",
      //   align: "center",
      //   width: 200,
      //   overHidden: true,
      // }, {
      //   label: "修改人-Người sửa",
      //   prop: "updator",
      //   placeholder: "",
      //   align: "center",
      //   width: 200,
      //   overHidden: true,
      // },

    ]
  }
}

export function _editProduct(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 360px)",
    submitBtn: false,
    emptyBtn: false,
    selection: true,
    labelWidth: 130,
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,

      },
      {
        label: "成品布",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "匹数",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "重量（KG）",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "重量（LBS）",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
    ]
  }
}

export function _editStore(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 360px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "载具编号",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        cell: true,
        slot: true
      },
      {
        label: "匹数",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "重量（KG）",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）",
        prop: "sumWeightLbs",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
    ]
  }
}

export function _editLocation(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 360px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "货位",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        cell: true,
        change(val) {
          _this.updateStore(val);
        }
      },
      {
        label: "匹数",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "重量（KG）",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）",
        prop: "sumWeightLbs",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
    ]
  }
}


export function _rcForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 12,
        width: 140,
        type: "select",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        formslot: true,
      }
    ]
  }
}

export function _rcCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(80vh - 250px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "成品编号-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "重量（KG）-TL",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）-TL",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 180,
        overHidden: true,

      },
      {
        label: "货位-Vị trí",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
    ]
  };
}

export function _ortherForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        width: 140,
        type: "select",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        formslot: true,
      },
      {
        label: "载具编号",
        prop: "storeLoad",
        span: 6,
        width: 140,
        type: "select",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        formslot: true,
      },
      {
        label: "成品布",
        prop: "productNo",
        span: 6,
        width: 140,
      },
    ]
  }
}

export function _ortherCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(80vh - 250px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    selection: true,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "成品编号-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "重量（KG）-TL",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）-TL",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 180,
        overHidden: true,

      },
      {
        label: "货位-Vị trí",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
    ]
  };
}

export function _onlyviewForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "类型",
        prop: "actionEffect",
        span: 6,

        type: "select",
        // clearable: true,
        dicData: getDicT("proActorAction", "actionDesc", "action"),
        //  placeholder: " ",
      },
      {
        label: "事件起因",
        prop: "actionCause",
        span: 6,
        width: 140,
        type: "select",
        dicData: getDicT("whseFabricActionOption", "causeName", "actionCause"),
        // rules: [
        //   {
        //     required: true,
        //     trigger: "blur"
        //   }
        // ],
      },
      {
        label: "时间操作",
        prop: "createTime",
        span: 6,
        width: 140,
        disabled: true
      },
      {
        label: "操作人",
        prop: "creator",
        span: 6,
        width: 140,
        disabled: true
      },
      {
        label: "修改事件",
        prop: "updateTime",
        span: 6,
        width: 140,
        disabled: true
      },
      {
        label: "修改人",
        prop: "updator",
        span: 6,
        width: 140,
        disabled: true
      },
      {
        label: "事件描述",
        prop: "actionDesc",
        span: 12,
        width: 140,
      },

    ],
  };
}

export function _onlyviewCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 285px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "vatNo",
        type: "count"
      },
      {
        label: " ",
        name: "productNo",
        type: "count"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "成品号码",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "定数",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,

      },
      {
        label: "重量(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,

      },
      {
        label: "毛重",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,

      },
      {
        label: "载具编号",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "货位",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
    ]
  };
}

export function _queryMainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        labelWidth: 130,
        span: 5,
      },
      {
        label: "匹数-Mã cây vải",
        prop: "productNo",
        labelWidth: 150,
        span: 5,
      },
      {
        label: "状态",
        prop: "fabricState",
        span: 4,
        type: "select",
        labelWidth: 120,
        dicData: [ //-1维持不动 0创建 1落布 2检验 3返修 4剪办 5盘点 6移库 7暂存 8作为库存存仓  9已经销售出厂
          // {
          //   value: 0,
          //   label: "创建",
          // },
          {
            value: 1,
            label: "已入库-Đã nhập kho",
          },
          // {
          //   value: 2,
          //   label: "检验",
          // },
          // {
          //   value: 3,
          //   label: "返修",
          // },
          // {
          //   value: 4,
          //   label: "剪办",
          // },{
          //   value: 5,
          //   label: "盘点",
          // },
          // {
          //   value: 6,
          //   label: "移库",
          // },
          {
            value: 7,
            label: "已出库-Đã xuất kho",
          },
          // {
          //   value: 8,
          //   label: "作为库存存仓",
          // },
          {
            value: 9,
            label: "已经销售出厂-Hàng đã bán",
          },
        ]
      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoad",
        labelWidth: 170,
        span: 5,
      },
      {
        label: "货位编号-Mã vị trí",
        prop: "storeLocal",
        labelWidth: 150,
        span: 5,
      },
    ]
  }
}

export function _queryMainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 315px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "成品号码-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        sortable: true,
        width: 200,
        overHidden: true,
      },
      {
        label: "成品布状态-Trạng thái",
        prop: "fabricState",
        placeholder: "",
        align: "center",
        width: 230,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [ //-1维持不动 0创建 1落布 2检验 3返修 4剪办 5盘点 6移库 7暂存 8作为库存存仓  9已经销售出厂
          {
            value: 0,
            label: "创建",
          },
          {
            value: 7,
            label: "已入库-Đã nhập kho",
          },
          {
            value: 2,
            label: "检验",
          },
          {
            value: 3,
            label: "返修",
          },
          {
            value: 4,
            label: "剪办",
          }, {
            value: 5,
            label: "盘点",
          },
          {
            value: 6,
            label: "移库",
          },
          {
            value: 2,
            label: "已出库-Đã xuất kho",
          },
          {
            value: 8,
            label: "作为库存存仓",
          },
          {
            value: 9,
            label: "已经销售出厂-Hàng đã bán",
          },
        ]
      },
      {
        label: "事件类型",
        prop: "actionEffect",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        type: "select",
        dicData: getDicT("proActorAction", "actionDesc", "action")
      },
      {
        label: "事件原因",
        prop: "actionCause",
        placeholder: "",
        align: "center",
        width: 250,
        overHidden: true,
        type: "select",
        dicData: getDicT("whseFabricActionOption", "causeName", "actionCause")
      },
      {
        label: "净重-T.Lượng thực",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "毛重-T.Lượng cả bì",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,

      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeLoad",
        sortable: true,
        placeholder: "",
        align: "center",
        width: 190,
        overHidden: true,
      },

      {
        label: "货位编号-Vị trí",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "最后修改时间-Thời gian sửa",
        prop: "updateTime",
        placeholder: "",
        align: "center",
        sortable: true,
        width: 250,
        overHidden: true,
      },
      {
        label: "最后修改人-Người sửa",
        prop: "updator",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,
      },
    ]
  };
}

export function _pro_storage_op(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        span: 20,
        width: 140,
        hide: false,
        formslot: true,
        rules: [
          {
            message: "",
            trigger: "blur"
          }
        ]
      },
    ]
  }
}

export function _pro_storage_crudop_ss(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    height: "170px",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "表名-Tên biểu",
        prop: "tableName",
        placeholder: "",
        align: "left",
        width: 150,
        overHidden: true,
      },
      {
        label: "总匹数-T.cây",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        sortable: false,
        width: 130,
        overHidden: true,
      },
      {
        label: "总重量-(KG)",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "总重量-(Lbs)",
        prop: "sumWeightLbs",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "总吗长-(yard)",
        prop: "sumLength",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
    ]
  };
}

export function _pro_storage_crudop_result(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    height: "60vh",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 50,
        overHidden: true,
      },
      {
        label: "成品布",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "匹数",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 120,
        overHidden: true,
      },
      {
        label: "重量(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "重量(LBS)",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
    ]
  };
}

export function _pro_storage_crudop_detail(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    height: "150px",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "表名-Tên biểu",
        prop: "tableName",
        placeholder: "",
        align: "left",
        width: 170,
        overHidden: true,
      },
      {
        label: "总匹数-T.số cây",
        prop: "pidCount",
        placeholder: "",
        align: "center",
        sortable: true,
        width: 170,
        overHidden: true,
      },
      {
        label: "总重量-T.Trọng lượng(KG)",
        prop: "sumWeight",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,
      },
      {
        label: "总重量-T.Trọng lượng(Lbs)",
        prop: "sumWeightLbs",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,
      },
      {
        label: "总重量-T.Chiều dài(Lbs)",
        prop: "sumLength",
        placeholder: "",
        align: "center",
        width: 220,
        overHidden: true,
      },
    ]
  };
}

export function _pro_storage_op1(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "最新的版本-Phiên bản",
        prop: "verId",
        span: 12,
        placeholder: " ",
        labelWidth: 200,
        disabled: true
      },
      {
        label: "更新时间-T.G chỉnh sữa",
        prop: "updateTime",
        span: 12,
        placeholder: " ",
        labelWidth: 200,
        disabled: true
      },
      {
        label: "更新的人-Người sửa",
        prop: "updator",
        span: 12,
        placeholder: " ",
        labelWidth: 200,
        disabled: true
      },
      {
        label: "载具编号-Mã pallet",
        prop: "storeCodes",
        span: 12,
        placeholder: " ",
        labelWidth: 200,
      },
      {
        label: "布料名称",
        prop: "fabricName",
        span: 24,
        placeholder: " ",
        type: "textarea",
        labelWidth: 200,
        minRows: 2
      },
    ]
  }
}

export function _salesCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 115px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    selection: false,
    page: false,
    column: [
      {
        label: "序号-STT",
        prop: "index",
        placeholder: " ",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 180,
        overHidden: true,
      },
      {
        label: "成品编号-Mã vải",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "匹数-Số cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "重量（KG）-TL",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）-TL",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,

      },
      {
        label: "重量（LBS）-TL",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "对比结果 - Đối chiều?",
        prop: "isExist",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        type: "select",
        sortable: true,
        dicData: [ //-1维持不动 0创建 1落布 2检验 3返修 4剪办 5盘点 6移库 7暂存 8作为库存存仓  9已经销售出厂
          {
            value: 0,
            label: "K.có vải",
          },
          {
            value: 1,
            label: "OK",
          },
          {
            value: 2,
            label: "Số kg ko khớp",
          },
        ]
      },
      {
        label: "成品台账",
        prop: "ledger",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
        type: "select",
        sortable: true,
        dicData: [ //-1维持不动 0创建 1落布 2检验 3返修 4剪办 5盘点 6移库 7暂存 8作为库存存仓  9已经销售出厂
          {
            value: 0,
            label: "K.có vải",
          },
          {
            value: 1,
            label: "OK",
          },
          {
            value: 2,
            label: "Số kg ko khớp",
          },
        ]
      },
      {
        label: "Ghi chú",
        prop: "note",
        placeholder: "",
        align: "center",
        width: 150,
        sortable: true,
        overHidden: true,
      },
    ]
  };
}

export function _exportTotalCrud(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    height: "calc(100vh - 280px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "vatNo",
        type: "count"
      },
      {
        label: " ",
        name: "pidNos",
        type: "sum"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "netWeightLbs",
        type: "sum"
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum"
      }
    ],
    column: [

      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "left",
        width: 140,
        overHidden: true,
      },

      {
        label: "匹数-T.cây",
        prop: "pidNos",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "净重-T.lượng(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "净重-T.lượng(LBS)",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "净重-T.lượng(LBS)",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
    ]
  }
}

export function _exportDetailCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 295px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    showSummary: false,
    column: [
      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "left",
        width: 140,
        overHidden: true,
      },
      {
        label: "成品编号-P.No",
        prop: "productNo",
        placeholder: "",
        align: "left",
        width: 160,
        overHidden: true,
      },
      {
        label: "匹数-T.cây",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "净重-T.lượng(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "净重-T.lượng(LBS)",
        prop: "netWeightLbs",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "净重-T.lượng(LBS)",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
    ]
  }
}

export function _invenCrud1(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 285px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "left",
        width: 170,
        overHidden: true,
      },
      {
        label: "疋数",
        prop: "pidsNo",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 100,
        overHidden: true,
      },
      {
        label: "净重(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 130,
        overHidden: true,
      },
      {
        label: "毛重(KG)",
        prop: "grossWeight",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 130,
        overHidden: true,
      },
      {
        label: "本厂PO",
        prop: "salPoNo",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 120,
        overHidden: true,
      },
      {
        label: "客户",
        prop: "custCode",
        width: 130,
        type: "select",
        labelWidth: 120,
        dicData: cust,
        placeholder: " ",
      },
      {
        label: "布类名称",
        prop: "fabName",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 200,
        overHidden: true,
      },
      {
        label: "颜色",
        prop: "colorName",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 200,
        overHidden: true,
      },
      // {
      //   label: "办单/大货",
      //   prop: "",
      //   placeholder: "",
      //   align: "left",
      //   sortable: true,
      //   width: 150,
      //   overHidden: true,
      // },
      {
        label: "开单日期",
        prop: "createTime",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 200,
        overHidden: true,
      },
      {
        label: "交货日期",
        prop: "deliveDate",
        placeholder: "",
        align: "left",
        sortable: true,
        width: 200,
        overHidden: true,
      },
    ]
  };
}

export function _invenCrud2(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 235px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    page: false,
    column: [
      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 50,
        overHidden: true,
      },
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "疋号",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "净重(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 90,
        overHidden: true,
      },
      {
        label: "毛重(KG)",
        prop: "grossWeight",
        placeholder: "",
        align: "center",
        width: 90,
        overHidden: true,
      },
      {
        label: "载具编号",
        prop: "storeLoad",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "货位",
        prop: "storeLocal",
        placeholder: "",
        align: "center",
        sortable: true,
        width: 200,
        overHidden: true,
      },
    ]
  };
}

let cust = getDicT("basCustomer", "custName", "custCode");

export function _invForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        labelWidth: 130,
        placeholder: " ",
        span: 6,
      },
      {
        label: "布类名称",
        prop: "fabName",
        labelWidth: 150,
        span: 6,
        placeholder: " ",
      },
      {
        label: "本厂PO",
        prop: "salPoNo",
        labelWidth: 150,
        span: 6,
        placeholder: " ",
      },
      {
        label: "客户",
        prop: "custCode",
        span: 6,
        type: "select",
        labelWidth: 120,
        dicData: cust,
        placeholder: " ",
      },

    ]
  }
}

export function _compensation(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 90px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    page: false,
    column: [
      {
        label: "类型",
        prop: "index",
        labelWidth: 130,
        placeholder: " ",
        align: "center",
        width: 80,
      },
      {
        label: "原因",
        prop: "vatNo",
        labelWidth: 130,
        placeholder: " ",
        width: 150,
      },
      {
        label: "备注",
        prop: "pidNo",
        labelWidth: 150,
        width: 70,
        placeholder: " ",
      },
      {
        label: "成品布编号",
        prop: "productNo",
        labelWidth: 150,
        width: 200,
        placeholder: " ",
      },
      {
        label: "净重(KG)",
        prop: "netWeight",
        labelWidth: 150,
        width: 150,
        placeholder: " ",
      },
      {
        label: "毛重(KG)",
        prop: "grossWeight",
        labelWidth: 150,
        width: 150,
        placeholder: " ",
      },
      {
        label: "载具编号",
        prop: "storeLoad",
        labelWidth: 150,
        width: 150,
        placeholder: " ",
      },
      {
        label: "货位",
        prop: "storeLocal",
        labelWidth: 150,
        width: 150,
        placeholder: " ",
      },
      {
        label: "吗长",
        prop: "yardLength",
        labelWidth: 150,
        width: 100,
        placeholder: " ",
      },
      {
        label: "备注",
        prop: "noteType",
        type: "select",
        dicData: [{
          value: 0,
          label: "QC台账没有"
        }, {
          value: 1,
          label: "已经被删除"
        },
          {
            value: 2,
            label: "可以入库"
          },
          {
            value: 3,
            label: "已经入库"
          }
        ],
        labelWidth: 150,
        width: 200,
        placeholder: " ",
      },
    ]
  }
}


