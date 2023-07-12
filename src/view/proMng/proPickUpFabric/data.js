import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from "@/config";

let userList = getDicT("ucmlUser", "employeename", "ucmlUseroid");
let orgnameList = getDicT("ucmlOrganize", "orgname", "ucmlOrganizeoid",);

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: '抽布编号',
      prop: "pickupCode",
      span: 6,
    },
      {
        label: _this.$t("vatNo"), //缸号
        prop: "vatNo",
        span: 6,
      },
      {
        label: "抽布日期",
        prop: "pickupDate",
        span: 6,
        filterable: true,
        overHidden: true,
        align: "center",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"

      },
      {
        label: "申请部门",
        prop: "demanDpt",
        width: 120,
        overHidden: true,
        span: 6,
        type: "select",
        filterable: true,
        dicData: orgnameList

      },
      {
        label: "申请人",
        prop: "creator",
        span: 6,
        // filterable: true,
        // type: "select",
        // dicData: userList
      },
      {
        label: "原因",
        prop: "demandCause",
        span: 12,

      },
    ]
  };
}

export function mainDlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
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
        rules: [{
          required: true,
          message: "請輸入接收日期",
          trigger: "blur"
        }]
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
        width: 200,
        overHidden: true,
        filterable: true,
        span: 6,
        display: false,
        rules: [{
          required: true,
          message: "請輸入申请人",
          trigger: "blur"
        }],
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
        dicData: getDIC("outfact_State"),
      },
      {
        label: _this.$t("remark"),
        prop: "remark",
        span: 12,
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
    height: "calc(100vh - 300px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    index: true,
    rowKey: 'pickupId',
    column: [{
      label: "申请编号",
      prop: "pickupCode",
      width: 130,
      disabled: true,
      overHidden: true,
      placeholder: ' ',
      span: 6,
      fixed: true
    },
      {
        label: "申请日期",
        prop: "pickupDate",
        width: 160,
        span: 6,
        type: "date",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        rules: [{
          required: true,
          message: "請輸入申请日期",
          trigger: "blur"
        }]
      },

      {
        label: "申请人",
        prop: "creator",
        span: 6,
        width: 200,
        disabled: true,
        filterable: true,
        type: "select",
        dicData: userList,
        rules: [{
          required: true,
          message: "請輸入申请人",
          trigger: "blur"
        }]
      },
      {
        label: "申请部门",
        prop: "demanDpt",
        width: 120,
        overHidden: true,
        span: 6,
        type: "select",
        filterable: true,
        disabled: true,
        dicData: orgnameList,

      },
      {
        label: "交接人员",
        prop: "reciveStaff",
        span: 6,
        width: 140,
        type: "select",
        filterable: true,
        dicData: userList,
        overHidden: true,
      },
      {
        label: "交接时间",
        prop: "recieveTime",
        width: 160,
        span: 6,
        type: "datetime",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        rules: [{
          required: true,
          message: "請輸入交接时间",
          trigger: "blur"
        }]
      },
      {
        label: "交接地点",
        prop: "handoverLocal",
        span: 6,
        width: 150,
        type: "select",
        dicData: [{
          label: "2楼-Lầu 2",
          value: "2楼-Lầu 2"
        },
          {
            label: "3楼-Lầu 3",
            value: "3楼-Lầu 3"
          },
          {
            label: "4楼-Lầu 4",
            value: "4楼-Lầu 4"
          },
          {
            label: "QC",
            value: "QC"
          },
          {
            label: "生空-PCC",
            value: "PCC"
          },
          {
            label: "技术部",
            value: "技术中心"
          },],
        rules: [{
          required: true,
          message: "請輸入接收日期",
          trigger: "blur"
        }]
      },
      {
        label: "经手人",
        prop: "pickupStaff",
        span: 6,
        width: 120,
        type: "select",
        overHidden: true,
        filterable: true,
        dicData: userList,
      },
      {
        label: "申请原因",
        prop: "demandCause",
        overHidden: true,
        span: 24,
        width: 150,
        formslot: true,
        rules: [{
          required: true,
          message: "請輸入缸号",
          trigger: "blur"
        }],
        fixed: true
        // dicData: [{
        //   value: "抽布返修-Rút vải sửa chữa lại",
        //   label: "抽布返修-Rút vải sửa chữa lại"
        // }, {
        //   value: "剪办-Cắt mẫu",
        //   label: "剪办-Cắt mẫu"
        // }],
        // rules: [{
        //   required: true,
        //   message: "請輸入缸号",
        //   trigger: "blur"
        // }],

      },
      {
        label: _this.$t("vatNo"), //缸号
        prop: "vatNo",
        width: 150,
        disabled: false,
        overHidden: true,
        span: 6,
        formslot: true,
        rules: [{
          required: true,
          message: "請輸入缸号",
          trigger: "blur"
        }],
        fixed: true
      },
      {
        label: "总重量(kg)",
        prop: "netWeight",
        span: 6,
        type: "number",
        width: 120,
        disabled: true
      },
      {
        label: "总重量(lbs)",
        prop: "netWeightLbs",
        span: 6,
        type: "number",
        width: 120,
        disabled: true
      }, {
        label: "码长",
        prop: "fabLength",
        span: 6,
        type: "number",
        width: 120,
        disabled: true
      }, {
        label: "颜色",
        prop: "colorName",
        span: 6,
        width: 120,
        disabled: true,
        overHidden: true
      }, {
        label: "布料名称",
        prop: "fabName",
        span: 18,
        width: 180,
        disabled: true,
        overHidden: true
      }, {
        label: "仓库审核",
        prop: "storeAdmin",
        span: 6,
        width: 120,
        display: false,
        type: "select",
        dicData: [
          {
            label: "待审核",
            value: 0
          },
          {
            label: "已审核",
            value: 1
          }
        ]
      },

    ]
  };
}


export function finishedCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 384px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,
    showSummary: true,
    index: true,
    sumColumnList: [{
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
        name: "yardLength",
        type: "sum"
      }
    ],
    menu: true,
    menuWidth: 120,
    addBtn: false,
    editBtn: false,
    column: [
      {
        label: _this.$t("productNo"), //成品编号,
        prop: "productNo",
        width: 220,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },

      {
        label: _this.$t("dyeDeliveryNote.netWeight1"), //"净重(KG)",
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
        label: _this.$t("dyeDeliveryNote.netWeightLbs1"), //"净重(LBS)",
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
        label: _this.$t("dyeDeliveryNote.yardLength1"), //"码长",
        prop: "yardLength",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      }, {
        label: "储存货位",
        prop: "storeSiteCode",

        overHidden: true
      }, {
        label: "载具编号",
        prop: "storeLoadCode",

        overHidden: true
      }
    ]
  };
}


export function stockFinisedClothForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 60,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "储存货位",
        prop: "storeSiteCode",
        width: 150,
        span: 6,
        overHidden: true
      }, {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 150,
        span: 6,
        overHidden: true
      }
    ]
  };
}

