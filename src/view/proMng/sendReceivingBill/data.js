import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: _this.$t('dptReciveLog.dispathReceive'), // 收/发单,
        prop: "dispathReceive",
        span: 6,
        type: "select",
        clearable: false,
        tip: "nhận đơn / gửi đơn",
        dicData: [{
            value: 1,
            label: "收单(nhận đơn)"
          },
          {
            value: 2,
            label: "发单(gửi đơn)"
          }
        ],
        change: async () => {
          await _this.$nextTick();
          !_this.loading && _this.handleQuery();
        }
      },
      {
        label: "业务类型",
        prop: "workOrderType",
        span: 6,
        type: "select",
        clearable: false,
        dicData: [{
            value: 1,
            label: " 运转单"
          },
          {
            value: 2,
            label: "织单"
          },
          {
            value: 3,
            label: "试纱单"
          }
        ],
        change: async () => {
          await _this.$nextTick();
          !_this.loading && _this.handleQuery();
        }
      },
      {
        label: "工作单编号",
        prop: "workOrderNo",
        span: 6,
      },
      {
        label: "操作部门",
        prop: "dpt",
        span: 6,
        width: 180,
        overHidden: true,
        type: "select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
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
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 110,
    index: true,
    selection: true,
    column: [{
        label: "工作单编号",
        prop: "workOrderNo",
        width: 180,
        overHidden: true
      },
      {
        label: "发单部门",
        prop: "sendProcessFk",
        width: 180,
        overHidden: true,
        type: "select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      {
        label: "发单人",
        prop: "sendStaff",
        width: 140,
        overHidden: true
      },
      {
        label: "收单部门",
        prop: "dptworkProcessFk",
        width: 180,
        overHidden: true,
        type: "select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      {
        label: "收单人", //缸号
        prop: "acceptStaff",
        width: 140,
        overHidden: true
      },
      {
        label: "日期", //缸号
        prop: "acceptDate",
        width: 160,
        overHidden: true
      },

    ]
  };
}
