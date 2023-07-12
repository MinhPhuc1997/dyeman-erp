import {convertDateToNumber} from "../../../utils/tools";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "存仓指令编号",
        tip: "Mã cắt vải",
        prop: "orderCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "缸号",
        tip: "Mã cắt vải",
        prop: "vatNos",
        span: 6,
        placeholder: " ",
      },
      {
        label: "成品布",
        tip: "Mã cắt vải",
        prop: "productNo",
        span: 6,
        placeholder: " ",
      },

      {
        label: "要求完成时间",
        tip: "Mã cắt vải",
        prop: "finishTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",

      },
      {
        label: "指令发布日期",
        tip: "Mã cắt vải",
        prop: "orderDate",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
      },
      {
        label: "创建人",
        prop: "creator",
        maxLength:100,
        span: 6,
        placeholder: " ",
      },
      {
        label: "创建时间",
        prop: "creatTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "备注",
        tip: "Mã cắt vải",
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
        label: "存仓指令编号",
        prop: "orderCode",
        width: 170,
        align: "center",
        display: false
      },
      {
        label: "缸号",
        prop: "vatNos",
        width: 200,
        align: "left",
        display: false,
        overHidden: true,
      },
      {
        label: "成品编号",
        prop: "productNo",
        width: 250,
        align: "left",
        display: false,
        overHidden: true,
      },
      {
        label: "总疋数",
        prop: "pidCount",
        width: 70,
        align: "center",

      },
      {
        label: "总重量(KG)",
        prop: "sumWeight",
        width: 130,
        align: "left",
        display: false,
      },
      {
        label: "总重量(LBS)",
        prop: "sumNwLbs",
        width: 130,
        align: "left",
        display: false
      },
      {
        label: "要求完成时间",
        prop: "finishTime",
        width: 150,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false
      },
      {
        label: "创建人",
        prop: "creator",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: "创建时间",
        prop: "creatTime",
        width: 200,
        align: "center",
        display: false
      },
      {
        label: "完成进度",
        prop: "workProgress",
        width: 200,
        align: "center",
        slot: true,
      },
      {
        label: "备注",
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
        label: "存仓指令编号",
        tip: "Mã cắt vải",
        prop: "orderCode",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "要求完成时间",
        tip: "Mã cắt vải",
        prop: "finishTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
        label: "指令发布日期",
        tip: "Mã cắt vải",
        prop: "orderDate",
        type:"datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
      },
      {
        label: "申请人",
        tip: "Mã cắt vải",
        prop: "creator",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "总疋数",
        tip: "Mã cắt vải",
        prop: "pidCount",
        span: 6,
        placeholder: " ",
        disabled: true,

      },
      {
        label: "总重量",
        tip: "Mã cắt vải",
        prop: "sumWeight",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "紧急性",
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
        label: "申请时间",
        tip: "Mã cắt vải",
        prop: "creatTime",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "备注",
        tip: "Mã cắt vải",
        prop: "remark",
        span: 24,
        placeholder: " ",
        overHidden:true,
        type: "textarea",
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
        label: "缸号",
        prop: "vatNo",
        width: 170,
        align: "left",
        display: false
      },
      {
        label: "定数",
        prop: "pidNo",
        width: 70,
        align: "center",
        display: false
      },
      {
        label: "净重",
        prop: "netWeight",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: "出货重量",
        prop: "cutWeight",
        width: 100,
        align: "center",
        display: false,
        cell: true,
      },
      // {
      //   label: "净重(LBS)",
      //   prop: "netWeightLbs",
      //   width: 100,
      //   align: "center",
      //   display: false
      // },
      {
        label: "毛重(KG)",
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
        label: "码长",
        prop: "yardLength",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: "新的PO",
        prop: "leftPoNo",
        width: 200,
        align: "center",
        cell: true,
        slot: true,
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
        label: "缸号",
        prop: "vatNo",
        width: 200,
        align: "left",
        display: false
      },
      {
        label: "定数",
        prop: "pidNo",
        width: 70,
        align: "center",
        display: false
      },
      {
        label: "净重",
        prop: "netWeight",
        width: 100,
        align: "center",
        display: false
      },
      {
        label: "净重(LBS)",
        prop: "netWeightLbs",
        width: 120,
        align: "center",
        display: false
      },
      {
        label: "毛重(KG)",
        prop: "grossWeight",
        width: 120,
        align: "center",
        display: false
      },
      {
        label: "毛重(LBS)",
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
        label: "状态",
        prop: "status",
        width: 130,
        align: "center",
        display: false,
        type: "select",
        dicData: [
          {label: "出货/Xuất hàng", value: 0},
          {label: "存仓/Kho giữ lại", value: 1}
        ]
      },
    ]
  };
}
