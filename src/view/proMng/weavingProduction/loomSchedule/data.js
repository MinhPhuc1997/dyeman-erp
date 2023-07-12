import { getDIC, getDicT } from "@/config";
import i18n from "@/lang/index";
const commonFormOp = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 90
};

const commonCrudOp = {
  menu: false,
  addBtn: true,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  page: true,
  labelWidth: 120,
  index: true,
  stripe: true
};

let enableFlagDicData = [
  {
    label: i18n.t("loomSchedule.enable"),
    value: 0
  },
  {
    label: i18n.t("loomSchedule.notEnable"),
    value: 1
  }
];

let workdayTypeDicData = [
  {
    label: i18n.t("clothFly.d") ,//白班
    value: "D"
  },
  {
    label: i18n.t("clothFly.n") ,//班
    value: "N"
  }
];

let allowFlagDicData = [
  {
    label: i18n.t("loomSchedule.confirmed") ,// "已确认",
    value: 1
  },
  {
    label: i18n.t("loomSchedule.unConfirmed") ,// "待确认",
    value: 0
  }
];

/* 机台排期配置 */
export function loomScheduleFormOp(_this) {
  return {
    ...commonFormOp,
    column: [
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        span: 6
      },
      {
        label: _this.$t("clothFly.mathineCode") ,//织机
        prop: "baseEquipmentFk",
        type: "select",
        span: 6,
        dicData: getDicT(
          "baseEquipment/list?areaId=layer5",
          "equipmentCode",
          "equId",
          {},
          "equipmentCode"
        ),
        filterable: true
      },

      {
        label: _this.$t("sysCreatedby") ,//操作员
        prop: "proOpFk",
        span: 6,
        type: "select",
        dicData: getDicT(
          "proOperator?enableFlag=1",
          "opName",
          "opId",
          {},
          "opCode"
        ),
        filterable: true
      },
      {
        label: _this.$t("clothFly.workdayType") ,//班次
        prop: "workdayType",
        span: 6,
        type: "select",
        dicData: workdayTypeDicData
      },
      {
        label: _this.$t("loomSchedule.state") , //状态
        prop: "allowFlag",
        overHidden: true,
        width: 100,
        span: 6,
        type: "select",
        dicData: allowFlagDicData
      },
      {
        label: _this.$t("public.date") , //日期
        prop: "workDate",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      }
    ]
  };
}

export function loomScheduleCrudOp(_this, audit = false) {
  return {
    ...commonCrudOp,
    height: "calc(100vh - 290px)",
    stripe: false,
    index: false,
    column: [
      {
        label: _this.$t("clothFly.workDate") ,//工作日期
        prop: "workDate",
        width: 130,
        clearable: false,
        span: 6,
        disabled: audit,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        cell: true,
        valueFormat: "yyyy-MM-dd",
        sortable: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("clothFly.workdayType") ,//班次
        prop: "workdayType",
        overHidden: true,
        clearable: false,
        width: 100,
        cell: true,
        sortable: true,
        span: 6,
        type: "select",
        dicData: workdayTypeDicData,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t('weaveJobCode'),//"织造通知单",
        prop: "weaveJobFk",
        overHidden: true,
        width: 160,
        span: 6,
        cell: true,
        type: 'select',
        // props: {
        //     label: "weaveJobCode",
        //     value: "weaveJobId"
        // },
        slot: true,

      },
      {
        label: _this.$t("clothFly.mathineCode") ,//织机
        prop: "baseEquipmentFk",
        overHidden: true,
        span: 6,
        // width: 140,
        type: "select",
        cell: true,
        dicData: getDicT(
          "baseEquipment/list?areaId=layer5",
          "equipmentCode",
          "equId",
          {},
          "equipmentCode"
        ),
        multiple: true,
        filterable: true,
      },
      
    ]
  };
}

/* 员工配置 */

export function loomStaffFormOp(_this, tc) {
  return {
    ...commonFormOp,
    column: [
      {
        label: _this.$t("loomSchedule.opCode") , //编号
        prop: "opCode",
        span: 6,
        labelWidth: 80
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "opName",
        span: 6,
        labelWidth: 60
      },
      {
        label: _this.$t("loomSchedule.enableFlag") , //启用状态
        prop: "enableFlag",
        span: 6,
        type: "select",
        display:  tc,
        dicData: enableFlagDicData
      },
      {
        label: _this.$t("clothFly.workDate") ,//工作日期
        prop: "workDate",
        width: 130,
        span: 6,
        display:  !tc,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        cell: true,
        valueFormat: "yyyy-MM-dd",
      },
    ]
  };
}

export function loomStaffCrudOp(_this) {
  return {
    ...commonCrudOp,
    height: "calc(100vh - 245px)",
    sumColumnList: [],
    column: [
      {
        label: _this.$t("loomSchedule.opCode") , //编号
        prop: "opCode",
        width: 160,
        // fixed: true,
        span: 6,
        sortable: true,
        cell: true,
        fixed: true
      },
      {
        label:  _this.$t("weaveJob.name"), //称
        prop: "opName",
        overHidden: true,
        width: 250,
        span: 6,
        cell: true,
        fixed: true
      },
      {
        label: _this.$t("loomSchedule.enableFlag") , //启用状态
        prop: "enableFlag",
        span: 6,
        width: 100,
        type: "select",
        hide: false,
        dicData: enableFlagDicData,
        cell: true
      },
      {
        label: _this.$t("createTime") ,//"创建日期",
        prop: "publishDate",
        width: 170,
        hide: false,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        sortable: true,
        cell: false
      }
    ]
  };
}
