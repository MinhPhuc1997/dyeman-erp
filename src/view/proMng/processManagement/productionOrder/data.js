import {
  getDIC,
  getDicT,
} from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode", {}, "custName");
// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  delBtn: false,
  editBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
};

export function queryForm(_this) {
  return {
    ...formOpCommon,
    column: [{
        label: "生产单类型",
        prop: "type",
        span: 6,
        type: "select",
        dicData: [{
            label: "织造通知单",
            value: 0
          },
          {
            label: "生产运转单",
            value: 1
          },
          {
            label: "生产漂染单",
            value: 3
          }
        ]
      },
      {
        label: "生产单号",
        prop: "orderNo",
        span: 6,
      },
      {
        label: "流程状态",
        prop: "state",
        span: 6,
        type: "select",
        dicData: [{
            label: "待审批",
            value: 0
          },
          {
            label: "通过",
            value: 1
          },
          {
            label: "审批中",
            value: 2
          },
          {
            label: "不通过",
            value: 3
          }
        ]
      },

    ]
  };
}

export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 270px)",
    page: true,
    menu: false,
    index: true,
    column: [{
        label: "生产单号",
        prop: "orderNo",
        span: 6,
        width: 120,
        align: "right",
        overHidden: true
      },
      {
        label: _this.$t("custName"), //客戶名稱,
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        width: 150,
        type: "select",
        dicData: cust,
        filterable: true
      },
      {
        label: _this.$t("po.poNo"), //"生产单号"
        prop: "salPoNo",
        width: 110,
        span: 6,
        placeholder: " ",
        sortable: true,
      },
      {
        label: _this.$t("fabName"), // "布類描述",
        prop: "fabricDesc",
        overHidden: true,
        width: 250,
        span: 12,
      },
      {
        label: _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        width: 120,
        span: 6,
        overHidden: true
      },
      {
        label: _this.$t("colorCode"), //色號,
        prop: "colorCode",
        width: 150,
        span: 6,
        overHidden: true
      },
      {
        label: "流程状态",
        prop: "state",
        span: 6,
        width: 120,
        type: "select",
        dicData: [{
            label: "待审批",
            value: 0
          },
          {
            label: "通过",
            value: 1
          },
          {
            label: "审批中",
            value: 2
          },
          {
            label: "不通过",
            value: 3
          }
        ]
      },
    ]
  };
}
