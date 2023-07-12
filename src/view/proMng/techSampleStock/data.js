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
  index: false,
  page: true,
}

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "办布库存ID",
        tip: "Mã vải",
        prop: "samStockId",
        span: 6,
        placeholder: " ",
        display: false,
      },
      {
        label: "缸号",
        tip: "Mã vải",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        maxLength: 50
      },
      {
        label: "疋数",
        tip: "Số cây",
        prop: "pidCount",
        span: 6,
        placeholder: " ",
      },
      {
        label: "创建人",
        tip: "Người chỉnh sửa",
        prop: "creator",
        span: 6,
        placeholder: " ",
        maxLength: 200
      },
      {
        label: "创建日期",
        tip: "Người chỉnh sửa",
        prop: "createTime",
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
        span: 6,
        placeholder: " ",
      },
      {
        label: "A3",
        tip: "a3",
        prop: "a3",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "A4",
        tip: "a4",
        prop: "a4",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "A5",
        tip: "a5",
        prop: "a5",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "备注",
        tip: "Ghi chú",
        prop: "remark",
        span: 6,
        placeholder: " ",
      },

    ]
  };
}

export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [
      {
        label: "#",
        prop: "index",
        width: 70,
        align:"center",
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 200,
      },
      {
        label: "疋数",
        prop: "pidCount",
        width: 80,
      },
      {
        label: "重量",
        prop: "nwKg",
        width: 120,
      },
      {
        label: "剩余码数",
        prop: "lenthLbs",
        width: 100,
      },
      {
        label: "A3",
        prop: "a3",
        width: 80,
      },
      {
        label: "A4",
        prop: "a4",
        width: 80,
      },
      {
        label: "A5",
        prop: "a5",
        width: 80,
      },
      {
        label: "存放位置",
        prop: "place",
        width: 200,
      },
      {
        label: "创建人",
        prop: "creator",
        width: 200,
      },
      {
        label: "创建日期",
        prop: "createTime",
        align:"center",
        width: 200,
      },
      {
        label: "修改时间",
        prop: "updator",
        align:"center",
        width: 200,
      },
      {
        label: "修改人",
        prop: "updateTime",
        width: 200,
      },
      {
        label: "备注",
        tip: "Ghi chú",
        prop: "remark",
        span: 6,
        placeholder: " ",
      },
    ]
  };
}

export function modifyForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "办布库存ID",
        tip: "Mã vải",
        prop: "samStockId",
        span: 6,
        placeholder: " ",
        display: false,
      },
      {
        label: "缸号",
        tip: "Mã vải",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        maxLength: 50
      },
      {
        label: "疋数",
        tip: "Số cây",
        prop: "pidCount",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "重量",
        prop: "nwKg",
        span: 6,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "剩余码数",
        prop: "lenthLbs",
        span: 6,
        placeholder: " ",
      },
      {
        label: "A3",
        tip: "a3",
        prop: "a3",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "A4",
        tip: "a4",
        prop: "a4",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "A5",
        tip: "a5",
        prop: "a5",
        type: "number",
        span: 6,
        placeholder: " ",
      },
      {
        label: "存放位置",
        prop: "place",
        width: 200,
        span: 6,
      },
      {
        label: "创建人",
        tip: "Người chỉnh sửa",
        prop: "creator",
        span: 6,
        disabled:true,
        placeholder: " ",
        maxLength: 200
      },
      {
        label: "创建日期",
        tip: "Người chỉnh sửa",
        prop: "createTime",
        type: "datetime",
        disabled:true,
        valueFormat: "yyyy-MM-dd",
        span: 6,
        placeholder: " ",
      },
      {
        label: "修改人",
        tip: "Người chỉnh sửa",
        prop: "updator",
        span: 6,
        disabled:true,
        placeholder: " ",
        maxLength: 200
      },
      {
        label: "修改时间",
        tip: "Người chỉnh sửa",
        prop: "updateTime",
        type: "datetime",
        disabled:true,
        valueFormat: "yyyy-MM-dd",
        span: 6,
        placeholder: " ",
      },

      {
        label: "备注",
        tip: "Ghi chú",
        prop: "remark",
        span: 24,
        type:'textarea',
        placeholder: " ",
        minRows:3,
        maxRows:5
      },

    ]
  };
}

