import {getDicT} from "../../../../../../config";

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

export function _queryForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: "",
      },
      {
        label: "成品编号",
        prop: "productNo",
        span: 6,
        placeholder: "",
      },
      {
        label: "操作时间",
        prop: "createTime",
        span: 12,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        type: "daterange",
        placeholder: "",
      },

    ],
  };
}

export function _leftOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: true,
    height: "calc(100vh - 265px)",
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
        name: "pidNo",
        type: "count"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum"
      },
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
        label: "缸号",
        prop: "vatNo",
        placeholder: "",
        align: "left",
        width: 200,
        overHidden: true,
      },
      {
        label: "匹数",
        prop: "pidNo",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "成品编号",
        prop: "productNo",
        placeholder: "",
        align: "left",
        width: 150,
        overHidden: true,
      },
      {
        label: "总重量(KG)",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },

      {
        label: "最后操作时间",
        prop: "updateTime",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
    ]
  };
}

export function _rightOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    height: "calc(100vh - 320px)",
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
        label: "成品编号",
        prop: "productNo",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "状态",
        prop: "effectName",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "重量",
        prop: "netWeight",
        placeholder: "",
        align: "center",
        width: 80,
        overHidden: true,
      },
      {
        label: "时间",
        prop: "createTime",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "操作人",
        prop: "creator",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
    ]
  };
}
