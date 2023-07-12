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
      label: "织单号",
      prop: "weaveCode",
      span: 6,
    },
    {
      label: "缸号",
      prop: "vatNo",
      span: 6,
    },
    {
      label: "维修单号",
      prop: "taskCode",
      span: 6,
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
    stripe: true,
    column: [
      {
        label: "任务ID",
        prop: "id",
        width: 140,
      },
      {
        label: "任务类型",
        prop: "name",
        width: 140,
      },{
        label: "任务单号",
        prop: "order",
        span: 6,
        width: 160,
        overHidden: true
      },
      {
        label: "开始时间",
        prop: "startTime",
        width: 170,
        align: "center",
        overHidden: true

      },

      {
        label: "结束时间",
        prop: "endTime",
        width: 170,
        align: "center",
        overHidden: true

      },
      {
        label: "创建人",
        prop: "creator",
        width: 180,
        overHidden: true,
        type: 'select',
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      // {
      //   label: _this.$t("custName"), //客戶名稱,
      //   prop: "custCode",
      //   tip: "Khách hàng",
      //   span: 6,
      //   width: 160,
      //   type: "select",
      //   dicData: cust,
      //   filterable: true,
      //   overHidden: true
      // },
      // {
      //   label: _this.$t("po.poNo"), //"生产单号"
      //   prop: "salPoNo",
      //   width: 180,
      //   span: 6,
      //   placeholder: " ",
      //   sortable: true,
      //   overHidden: true
      // },
      // {
      //   label: _this.$t("fabName"), // "布類描述",
      //   prop: "fabricDesc",
      //   overHidden: true,
      //   width: 250,
      //   span: 12,
      // },
      // {
      //   label: _this.$t("colorName"), //顏色名稱,
      //   prop: "colorName",
      //   width: 120,
      //   span: 6,
      //   overHidden: true
      // },
      // {
      //   label: _this.$t("colorCode"), //色號,
      //   prop: "colorCode",
      //   width: 150,
      //   span: 6,
      //   overHidden: true
      // },
      // {
      //   label: "流程状态",
      //   prop: "state",
      //   span: 6,
      //   width: 120,
      //   type: "select",
      //   dicData: [{
      //       label: "待审批",
      //       value: 0
      //     },
      //     {
      //       label: "通过",
      //       value: 1
      //     },
      //     {
      //       label: "审批中",
      //       value: 2
      //     },
      //     {
      //       label: "不通过",
      //       value: 3
      //     }
      //   ]
      // },
    ]
  };
}
