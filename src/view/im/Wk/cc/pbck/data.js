export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "出货单号",
        tip: "Mã xuất kho",
        prop: "orderCode",
        span: 4,
        placeholder: " ",
      },
      {
        label: "织造单号",
        tip: "Mã cắt vải",
        prop: "vatNos",
        span: 4,
        placeholder: " ",
      },
      {
        label: "布类名称",
        tip: "Mã cắt vải",
        prop: "fabName",
        span: 4,
        placeholder: " ",
      },
      {
        label: "收货单位",
        tip: "Mã cắt vải",
        prop: "remark",
        span: 4,
        placeholder: " ",
      },
      {
        label: "出货日期",
        tip: "Mã cắt vải",
        prop: "outDate",
        span: 6,
        placeholder: " ",
        type: "daterange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
    height: "calc(100vh - 235px)",
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
        label: "出货单号",
        prop: "outWorkCode",
        width: 150,
        placeholder: " ",
      },
      {
        label: "织造单号",
        prop: "weaveJobCode",
        width: 130,
        placeholder: " ",
      },
      {
        label: "布类名称",
        prop: "fabName",

        overHidden:true,
        placeholder: " ",
      },
      {
        label: "收货单位",
        prop: "fromCompany",
        overHidden:true,
        width: 250,
        placeholder: " ",
      },
      {
        label: "收货单位",
        prop: "toCompany",
        overHidden:true,
        width: 250,
        placeholder: " ",
      },
      {
        label: "出货日期",
        prop: "outDate",
        width: 100,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "扫描状态",
        prop: "audit",
        align: "center",
        slot: true,
        width: 100,
        placeholder: " ",
      },
      {
        label: "创建人",
        prop: "creator",
        maxLength:100,
        width: 200,
        placeholder: " ",
      },
      {
        label: "创建时间",
        prop: "createTime",
        width: 200,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "审核状态",
        prop: "autditColor",
        align: "center",
        width: 100,
        placeholder: " ",
        slot: true,
      },
    ]
  };
}
export function itemForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "出货单号",
        tip: "Mã xuất kho",
        prop: "outWorkCode",
        span: 6,
        disabled: true,
        placeholder: " ",
      },
      {
        label: "织造单号",
        tip: "Mã cắt vải",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        formslot: true,
        rules: [
          {
            required: true,
            message: "请输入客户",
            trigger: "blur"
          }
        ],
      },
      {
        label: "布类名称",
        tip: "Mã cắt vải",
        prop: "fabName",
        span: 6,
        placeholder: " ",
        disabled:true,
      },
      {
        label: "出货日期",
        prop: "outDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "请输入客户",
            trigger: "blur"
          }
        ],
      },
      {
        label: "出货单位",
        prop: "fromCompany",
        span: 6,
        placeholder: " ",
        disabled: true,
        rules: [
          {
            required: true,
            message: "请输入客户",
            trigger: "blur"
          }
        ],
      },
      {
        label: "收货单位",
        prop: "toCompany",
        span: 6,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入客户",
            trigger: "blur"
          }
        ],
      },

      {
        label: "创建人",
        prop: "creator",
        maxLength:100,
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "创建时间",
        prop: "createTime",
        span: 6,
        placeholder: " ",
        type: "datetime",
        disabled: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
    ]
  };
}
export function itemCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelPosition: "top",
    labelWidth: 150,
    sumColumnList: [
      {
        name: 'clothWeight',
        type: 'sum'
      },
      {
        name: 'clothLength',
        type: 'sum'
      },
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
        label: "布票编号",
        prop: "noteCode",
        width: 200,
        placeholder: " ",
      },
      {
        label: "重量",
        prop: "clothWeight",
        width: 90,
        placeholder: " ",
      },
      {
        label: "重量单位",
        prop: "weightUnit",
        width: 100,
        placeholder: " ",
      },
      {
        label: "产品颜色",
        prop: "proColor",
        width: 150,
        placeholder: " ",
        overHidden:true,
      },
      {
        label: "布类名称",
        prop: "fabricName",
        width: 350,
        overHidden:true,
        placeholder: " ",
      },
      { label: "胚布状态",
        prop: "clothState",
        width: 90,
        type:"select",
        dicData:[
          {label:"未称重",value:1, },
          {label:"已入库",value:2, },
          {label:"已出库",value:3, }
        ],
        placeholder: " ",
      },
      {
        label: "盘点用户",
        prop: "invUser",
        width: 100,
        placeholder: " ",
      },
      {
        label: "盘点时间",
        prop: "invDate",
        width: 200,
        placeholder: " ",
      },
      {
        label: "盘点载具编号",
        prop: "invStoreLoadCode",
        width: 140,
        placeholder: " ",
      },
      {
        label: "原有布票号",
        prop: "invLocationCode",
        width: 140,
        placeholder: " ",
      },
      {
        label: "备注",
        prop: "remarks",
        cell:true,
      },
    ]
  };
}
export function selectForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    showSummary: true,

    column: [
      {
        label: "胚布编号",
        tip: "Mã xuất kho",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "载具编号",
        tip: "Mã cắt vải",
        prop: "invStoreLoadCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "货位",
        prop: "invLocationCode",
        span: 6,
        placeholder: " ",

      }, {
        label: "机号",
        prop: "machineCode",
        span: 6,
        placeholder: " ",

      },
    ]
  };
}
export function selectCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelPosition: "top",
    selection:true,
    labelWidth: 150,
    sumColumnList: [
      {
        name: 'clothWeight',
        type: 'sum'
      },
      {
        name: 'clothLength',
        type: 'sum'
      },
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
        label: "布票编号",
        prop: "noteCode",
        width: 200,
        placeholder: " ",
      },
      {
        label: "重量",
        prop: "clothWeight",
        width: 90,
        placeholder: " ",
      },
      {
        label: "重量单位",
        prop: "weightUnit",
        width: 100,
        placeholder: " ",
      },
      {
        label: "机号",
        prop: "machineCode",
        width: 100,
        placeholder: " ",

      },
      {
        label: "产品颜色",
        prop: "proColor",
        width: 150,
        overHidden:true,
      },
      {
        label: "盘点用户",
        prop: "invUser",
        width: 100,
        placeholder: " ",
      },
      {
        label: "盘点时间",
        prop: "invDate",
        width: 200,
        placeholder: " ",
      },
      {
        label: "盘点载具编号",
        prop: "invStoreLoadCode",
        width: 140,
        placeholder: " ",
      },
      {
        label: "原有布票号",
        prop: "invLocationCode",
        width: 140,
        placeholder: " ",
      }
    ]
  };
}

export function dataForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "名称",
        tip: "Mã xuất kho",
        prop: "orderCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "名称",
        tip: "Mã cắt vải",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
      },
    ]
  };
}

export function dataCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelPosition: "top",
    selection:false,
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
        label: "名称",
        prop: "CodeName",
        width: 200,
        placeholder: " ",
      },
      {
        label: "标识",
        prop: "ClassCode",
        width: 200,
        placeholder: " ",
      },
    ]
  };
}

export function dataCrudDtl(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelPosition: "top",
    selection:false,
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
        label: "名称",
        prop: "noteCode",
        width: 200,
        placeholder: " ",
      },
    ]
  };
}
