export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "系统编号",
        tip: "Mã vải",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "操作日期",
        tip: "Mã vải",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "处理状态",
        tip: "Mã vải",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "部门",
        tip: "Mã vải",
        prop: "vatNo",
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
    height: "calc(100vh - 245px)",
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
        display: false,
        fixed: "left"
      },


    ]
  };
}

