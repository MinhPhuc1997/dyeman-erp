export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 170,
    column: [
      {
        label: _this.$t("WhseLeftOver.orderCode"),// "存仓指令编号",
        tip: "Mã số",
        prop: "orderCode",
        span: 6,
        placeholder: " ",
      },
      {
        label:  _this.$t("WhseLeftOver.vatNos"),//"缸号-Mã hàng",
        tip: "Mã hàng",
        prop: "vatNos",
        span: 6,
        placeholder: " ",
      },
      {
        label:  _this.$t("WhseLeftOver.productNo"),//"成品布-Vải thành phẩm",
        tip: "Vải thành phẩm",
        prop: "productNo",
        span: 6,
        placeholder: " ",
      },

      {
        label:  _this.$t("WhseLeftOver.finishTime"),//"要求完成时间-T.G hoàn thành",
        tip: "Thời gian hoàn thành yêu cầu",
        prop: "finishTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",

      },
      {
        label: _this.$t("WhseLeftOver.orderDate"),// "指令发布日期-Ngày yêu cầu",
        tip: "Ngày yêu cầu",
        prop: "orderDate",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
      },
      {
        label: _this.$t("WhseLeftOver.creator"),// "创建人-N.Đăng ký",
        prop: "creator",
        maxLength:100,
        span: 6,
        placeholder: " ",
      },
      {
        label: _this.$t("WhseLeftOver.creatTime"),// "创建时间-T.G Đăng ký",
        prop: "creatTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label:  _this.$t("WhseLeftOver.remark"),//"备注-Ghi chú",
        tip: "Ghi chú",
        prop: "remark",
        span: 6,
        placeholder: " ",
      },
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 270px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelPosition: "top",
    labelWidth: 150,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("WhseLeftOver.orderCode"),//"存仓指令编号",
        prop: "orderCode",
        width: 170,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.vatNos"),// "缸号",
        prop: "vatNos",
        width: 200,
        align: "left",
        display: false,
        overHidden: true,
      },
      {
        label: _this.$t("WhseLeftOver.productNo"),// "成品编号",
        prop: "productNo",
        width: 250,
        align: "left",
        display: false,
        overHidden: true,
      },
      {
        label: _this.$t("WhseLeftOver.pidCount"),// "总疋数",
        prop: "pidCount",
        width: 70,
        align: "center",

      },
      {
        label: _this.$t("WhseLeftOver.sumWeight"),// "总重量(KG)",
        prop: "sumWeight",
        width: 130,
        align: "left",
        display: false,
      },
      {
        label: _this.$t("WhseLeftOver.sumNwLbs"),// "总重量(LBS)",
        prop: "sumNwLbs",
        width: 130,
        align: "left",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.finishTime"),// "要求完成时间",
        prop: "finishTime",
        width: 150,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.creator"),// "创建人",
        prop: "creator",
        width: 100,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("WhseLeftOver.creatTime"),//"创建时间",
        prop: "creatTime",
        width: 200,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("WhseLeftOver.workProgress"),//"完成进度",
        prop: "workProgress",
        width: 200,
        align: "center",
        slot: true,
      },
      {
        label:  _this.$t("WhseLeftOver.remark"),//"备注",
        prop: "remark",
        align: "center",
        display: false
      },


    ]
  };
}

export function itemForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("WhseLeftOver.orderCode"),// "存仓指令编号",
        tip: "Mã cắt vải",
        prop: "orderCode",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label:  _this.$t("WhseLeftOver.finishTime"),//"要求完成时间",
        tip: "Mã cắt vải",
        prop: "finishTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        disabled: true,
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        // change(val) {
        //   let diff = convertDateToNumber(val.value) - convertDateToNumber(this.$getNowTime())
        //   _this.levelFunction(diff, convertDateToNumber(val.value))
        // }
      },
      {
        label:  _this.$t("WhseLeftOver.orderDate"),//"指令发布日期",
        tip: "Mã cắt vải",
        prop: "orderDate",
        type:"datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
        disabled: true,
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
      },
      {
        label: _this.$t("WhseLeftOver.creator"),// "申请人",
        tip: "Mã cắt vải",
        prop: "creator",
        span: 6,
        placeholder: " ",

        disabled: true,
      },
      {
        label:  _this.$t("WhseLeftOver.pidCount"),//"总疋数",
        tip: "Mã cắt vải",
        prop: "pidCount",
        span: 6,
        placeholder: " ",

        disabled: true,

      },
      {
        label: _this.$t("WhseLeftOver.sumWeight"),// "总重量",
        tip: "Mã cắt vải",
        prop: "sumWeight",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label:  _this.$t("WhseLeftOver.level"),//"紧急性",
        tip: "Mã cắt vải",
        prop: "level",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {value: 0, label: "特急"},
          {value: 1, label: "紧急"},
          {value: 2, label: "常规"}
        ],
        disabled: true,
      },

      {
        label:  _this.$t("WhseLeftOver.creatTime"),//"申请时间",
        tip: "Mã cắt vải",
        prop: "creatTime",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: _this.$t("WhseLeftOver.remark"),// "备注",
        tip: "Mã cắt vải",
        prop: "remark",
        span: 24,
        placeholder: " ",
        overHidden:true,
        type: "textarea",
        disabled: true,
        minRows: 2
      },
    ]
  };
}

export function mainCrudLeft(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 400px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelPosition: "top",
    labelWidth: 150,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("WhseLeftOver.vatNo"),//"缸号",
        prop: "vatNo",
        width: 150,
        align: "left",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.pidNo"),// "定数",
        prop: "pidNo",
        width: 70,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("WhseLeftOver.netWeight"),//"净重",
        prop: "netWeight",
        width: 100,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("WhseLeftOver.cutWeight"),//"出货重量",
        prop: "cutWeight",
        width: 100,
        align: "center",
        display: false,
      },
      // {
      //   label: "净重(LBS)",
      //   prop: "netWeightLbs",
      //   width: 100,
      //   align: "center",
      //   display: false
      // },
      {
        label: _this.$t("WhseLeftOver.grossWeight"),// "毛重(KG)",
        prop: "grossWeight",
        width: 100,
        align: "center",
        display: false
      },
      // {
      //   label: "毛重(LBS)",
      //   prop: "grossWeightLbs",
      //   width: 100,
      //   align: "center",
      //   display: false
      // },
      {
        label: _this.$t("WhseLeftOver.yardLength"),// "码长",
        prop: "yardLength",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.confirmFlag"),// "状态",
        prop: "confirmFlag",
        width: 180,
        align: "center",
        dicData:[
          {value:0,label:"还没剪布/Chưa cắt"},
          {value:1,label:"已经多布/Đã cắt"}
        ],
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.confirmStaff"),// "确认的人",
        prop: "confirmStaff",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.confireTime"),// "确认时间",
        prop: "confireTime",
        width: 170,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.printer"),// "打印的人",
        prop: "printer",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.printTime"),// "打印时间",
        prop: "printTime",
        width: 170,
        align: "center",
        display: false
      },


    ]
  };
}

export function mainCrudRight(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 400px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelPosition: "top",
    labelWidth: 150,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.vatNo"),// "缸号",
        prop: "vatNo",
        width: 170,
        align: "left",
        display: false,
        overHidden:true
      },
      {
        label: _this.$t("WhseLeftOver.pidNo"),// "定数",
        prop: "pidNo",
        width: 65,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.netWeight"),// "净重",
        prop: "netWeight",
        width: 70,
        align: "center",
        display: false
      },
      {
        label: _this.$t("WhseLeftOver.netWeightLbs"),// "净重(LBS)",
        prop: "netWeightLbs",
        width: 100,
        align: "center",
        display: false
      },
      // {
      //   label: "毛重(KG)",
      //   prop: "grossWeight",
      //   width: 100,
      //   align: "center",
      //   display: false
      // },
      {
        label: _this.$t("WhseLeftOver.grossWeightLbs"),// "毛重(LBS)",
        prop: "grossWeightLbs",
        width: 120,
        align: "center",
        display: false
      },
      // {
      //   label: "码长",
      //   prop: "yardLength",
      //   width: 100,
      //   align: "center",
      //   display: false
      // },
      {
        label:  _this.$t("WhseLeftOver.status"),//"状态",
        prop: "status",
        width: 120,
        align: "center",
        display: false,
        type: "select",
        dicData: [
          {label: "出货/Xuất hàng", value: 0},
          {label: "存仓/Kho giữ", value: 1}
        ]
      },

    ]
  };
}
