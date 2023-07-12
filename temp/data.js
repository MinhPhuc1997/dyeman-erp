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
  index: false,
}
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [

    ]
  };
}

export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: true,
    height: "calc(100vh - 285px)",
    column: [

    ]
  };
}

export function itemForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [

    ]
  };
}
