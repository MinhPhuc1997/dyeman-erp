import {getDIC, getDicT, getXDicT, postDicT} from "@/config";

let userList = getDicT("ucmlUser", "employeename", "ucmlUseroid");
let whseUserList = getDicT("accountNum", "employeename", "ucmlUseroid",{id:"0006B5A9-0000-0091-0000-0000055CD89B"});

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: _this.$t("dyeDeliveryNote.outCode"), // "出货编号",
        prop: "outCode",
        span: 6,
      },
      {
        label: '货运计划', //
        prop: "shipPlanno",
        width: 140,
        disabled: false,
        overHidden: true,
        span: 6,
      },
      {
        label: _this.$t("dyeDeliveryNote.containNo"), //货柜编号
        prop: "containNo",
        span: 6,
      },
      {
        label: _this.$t("dyeDeliveryNote.applicant"), //申请人
        prop: "applicant",
        span: 6,
        filterable: true,
       // type: "select",
       // dicData: userList
      },
      {
        label: _this.$t("dyeDeliveryNote.reviewer"), //审核人
        prop: "reviewer",
        width: 120,
        overHidden: true,
        span: 6,
       // type: "select",
        filterable: true,
     //   dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "状态", //状态
        prop: "orderState",
        span: 6,
        type: "select",
        dicData: getDIC("outfact_State")
      },
      {
        label: _this.$t("dyeDeliveryNote.outDate"), //出货日期
        prop: "outDate",
        width: 160,
        span: 6,
        type: "date",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      }
    ]
  };
}

export function mainFormSelect(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "订单号", // "出货编号",
        prop: "poNo",
        span: 6,
      },
      {
        label: "缸号", // "出货编号",
        prop: "vatNo2",
        span: 6,
      },
      {
        label: "匹数", //货柜编号
        prop: "pidNo",
        span: 6,
      },
    ]
  };
}

export function mainFormSelect1(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "缸号", // "出货编号",
        prop: "vatNo",
        span: 6,
      },
    ]
  };
}

export function mainCrudSelect1(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(50vh)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: true,
    labelWidth: 120,
    index: false,
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
    ]
  };
}

export function mainCrudSelect(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(50vh)",
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

export function mainDlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("dyeDeliveryNote.outCode"), //
        prop: "outCode",
        width: 130,
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("dyeDeliveryNote.outDate"), //出货日期
        prop: "outDate",
        width: 160,
        span: 6,
        type: "date",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: '货运计划', //
        prop: "shipPlanno",
        width: 130,
        disabled: false,
        overHidden: true,
        span: 6,
        click: () => {
          _this.choiceVs = true;
        }
      },
      {
        label: _this.$t("dyeDeliveryNote.containNo"), //货柜编号
        prop: "containNo",
        width: 130,
        disabled: false,
        overHidden: true,
        span: 6,
        // click: () => {
        //   _this.choiceVs = true;
        // }
      },
      {
        label: _this.$t("dyeDeliveryNote.applicant"), //申请人
        prop: "applicant",
        width: 120,
        overHidden: true,
        filterable: true,
        span: 6,
        display: false,
        rules: [
          {
            required: true,
            message: "請輸入申请人",
            trigger: "blur"
          }
        ],
        type: "select",
        dicData: userList
      },
      {
        label: _this.$t("dyeDeliveryNote.wareMana"), //仓管员
        prop: "wareMana",
        width: 120,
        filterable: true,
        overHidden: true,
        span: 6,
        type: "select",
        dicData: whseUserList

      },
      {
        label: _this.$t("dyeDeliveryNote.reviewer"), //审核人
        prop: "reviewer",
        width: 120,
        overHidden: true,
        span: 6,
        type: "select",
        filterable: true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        display: false,
      },
      {
        label: _this.$t("dyeDeliveryNote.receiver"), //收货人
        prop: "receiver",
        width: 120,
        filterable: true,
        overHidden: true,
        span: 6,
        // type: "select",
        // dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "状态", //状态
        prop: "orderState",
        span: 6,
        placeholder: " ",
        type: "select",
        disabled: true,
        dicData: getDIC("outfact_State"),
      },
      {
        label: _this.$t("remark"),
        prop: "remark",
        span: 6,
        overHidden: true
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 335px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    index: true,
    column: [
      {
        label: _this.$t("dyeDeliveryNote.outCode"), //
        prop: "outCode",
        width: 130,
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("dyeDeliveryNote.outDate"), //出货日期
        prop: "outDate",
        width: 160,
        span: 6,
        type: "date",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: '货运计划', //
        prop: "shipPlanno",
        width: 140,
        disabled: false,
        overHidden: true,
        span: 6,
      },
      {
        label: _this.$t("dyeDeliveryNote.containNo"), //货柜编号
        prop: "containNo",
        width: 130,
        disabled: false,
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("dyeDeliveryNote.applicant"), //申请人
        prop: "applicant",
        width: 120,
        overHidden: true,
        filterable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請輸入申请人",
            trigger: "blur"
          }
        ],
        type: "select",
        dicData: userList
      },
      {
        label: _this.$t("dyeDeliveryNote.wareMana"), //仓管员
        prop: "wareMana",
        width: 120,
        filterable: true,
        overHidden: true,
        span: 6,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: _this.$t("dyeDeliveryNote.reviewer"), //审核人
        prop: "reviewer",
        width: 120,
        overHidden: true,
        span: 6,
        type: "select",
        filterable: true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: _this.$t("dyeDeliveryNote.receiver"), //收货人
        prop: "receiver",
        width: 120,
        filterable: true,
        overHidden: true,
        span: 6,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "状态", //状态
        prop: "orderState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("outfact_State"),
        width: 110,
        overHidden: true,
        formatter(r, v) {
          return String(v)
        }
      },
      {
        label: _this.$t("remark"),
        prop: "remark",
        overHidden: true
      }
    ]
  };
}

export function noteCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "vatNo",
        type: "count"
      },
      {
        label: " ",
        name: "pidNo",
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
      },
      {
        label: " ",
        name: "yardLength",
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
        label: _this.$t("vatNo"),//"缸号",
        prop: "vatNo",
        width: 140,
        overHidden: true,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("po.poNo1"), //订单编号
        prop: "poNo",
        width: 140,
        overHidden: true,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("dyeDeliveryNote.pidNo"), //"总匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: _this.$t("dyeDeliveryNote.netWeight"), // "总净重(KG)",
        prop: "netWeight",
        width: 120,
        align: "right",
        span: 6,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: _this.$t("dyeDeliveryNote.grossWeight"), //"总毛重(KG)",
        prop: "grossWeight",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("dyeDeliveryNote.yardLength"), //"总码长",
        prop: "yardLength",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label:"备注",
        prop: "remarks",
        span: 8,
        minRows: 0,
        align: "left",
        placeholder: " ",
        cell:true
      }
    ]
  };
}

export function finishedCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 284px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,
    showSummary: true,
    sumColumnList: [
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
        name: "netWeightLbs",
        type: "sum"
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "yardLength",
        type: "sum"
      },

    ],
    column: [
      {
        label: _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 60,
        align: "right",
        // sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: _this.$t("productNo"),//成品编号,
        prop: "productNo",
        width: 160,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: _this.$t("dyeDeliveryNote.netWeight1"),//"净重(KG)",
        prop: "netWeight",
        width: 110,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: _this.$t("dyeDeliveryNote.netWeightLbs1"),//"净重(LBS)",
        prop: "netWeightLbs",
        width: 110,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("dyeDeliveryNote.grossWeight1"),//"毛重(KG)",
        prop: "grossWeight",
        width: 110,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("dyeDeliveryNote.yardLength1"),//"码长",
        prop: "yardLength",
        width: 110,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        prop: "pccFlag",
        label: "生控确认",
        width: 120,
        type: "select",
        dicData: [{
          value: 1,
          label: "已确认"
        },
          {
            value: 0,
            label: "未确认"
          }
        ]
      },
      {
        prop: "pccStalker",
        label: "生控确认人",
        width: 120
      },
      {
        prop: "pccTime",
        label: "确认时间",
        width: 140,
        overHidden: true
      },
      {
        prop: "truckFlag",
        label: "装车确认",
        width: 120,
        type: "select",
        dicData: [{
          value: 1,
          label: "已确认"
        },
          {
            value: 0,
            label: "未确认"
          }
        ]
      },
      {
        prop: "truckTime",
        label: "确认时间",
        width: 140,
        overHidden: true
      },
      {
        prop: "truckStalker",
        label: "装车确认人",
        width: 120
      },
    ]
  };
}
