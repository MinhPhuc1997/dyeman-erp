/*
 * @Author: Lyl
 * @Date: 2022-09-24 14:12:01
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-26 16:08:10
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\data.js
 * @Description:
 */
const commonFormConfig = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 150
};

const commonCrudConfig = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  page: true,
  labelWidth: 120,
  selection: false,
  columnBtn: true
};

// 下栏定义
export function bottomColumnCrudOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 250px)",
    labelWidth: 120,
    index: true,
    column: [
      {
        label: _this.$t("quality.flatCardCode")  , // 码卡编号
        prop: "flatCardCode",
        span: 8,
        width: 160,
        fixed: true,
        overHidden: true,
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 8,
        width: 140,
        display: false,
      },
      {
        label: "松布程序"  , // 下栏序号
        prop: "sn",
        span: 8,
        width: 140,
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "runJobFk",
        span: 8,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: "松布程序"  , // 下栏序号
        width: 100,
        fixed: true,
        prop: "runJobFlatFk",
        hide: true,
        span: 8,
        type: "select",
        props: {
          label: "label",
          value: "platId"
        },
        dicData: [],
        rows: true,
        change: ({ value }) => {
          _this.handleFlatChange(value);
        },
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("revolve.lengthDsp"), // 长
        prop: "lengthDsp",
        width: 60,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label: _this.$t("revolve.widthDsp"), // 宽
        prop: "widthDsp",
        width: 60,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "amount",
        width: 100,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "sizeUnit",
        span: 8,
        type: "select",
        disabled: true,
        width: 100,
        placeholder: " ",
        hide: true,
        dicData: [
          {
            label: "CM",
            value: "CM"
          },
          {
            label: "INCH",
            value: "INCH"
          }
        ]
      },
      {
        label: _this.$t("bottomcol.actualLength")  , //实际长
        prop: "actualLength",
        span: 8,
        width: 80,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: _this.$t("bottomcol.actualWidth")  , //实际宽
        prop: "actualWidth",
        width: 80,
        span: 8,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "actualQty",
        width: 100,
        span: 8,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },

      {
        label: _this.$t("bottomcol.packNo")  , //包装序号
        prop: "packNo",
        width: 100,
        span: 8,
        type: "number",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        width: 100,
        prop: "packSize",
        span: 8,
        type: "number",
        precision: 0
      },

      {
        label: _this.$t("bottomcol.packNwKg")  , //包净重
        prop: "packNwKg",
        span: 8,
        width: 100,
        type: "number",
      },
      {
        label: _this.$t("bottomcol.packGwKg")  , //包毛重
        prop: "packGwKg",
        span: 8,
        width: 100,
        type: "number"
      },
      {
        label:  _this.$t("printedTime"), //打印时间,
        prop: "printDate",
        span: 8,
        width: 160,
        display: false,
        type: "datetime"
      },
      {
        label: _this.$t("createTime") ,//创建时间
        prop: "createTime",
        span: 8,
        width: 160,
        display: false,
        type: "datetime"
      }
    ]
  };
}

export function newbottomColumnCrudOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 250px)",
    labelWidth: 120,
    index: true,
    column: [
      {
        label: _this.$t("quality.flatCardCode")  , // 码卡编号
        prop: "flatCardCode",
        span: 8,
        width: 160,
        fixed: true,
        overHidden: true,
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 8,
        width: 140,
        display: false,
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "runJobFk",
        span: 6,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },

    ]
  };
}

export function queryFormOp(_this) {
  return {
    ...commonFormConfig,
    labelWidth: 100,
    column: [
      {
        label: _this.$t("quality.flatCardCode")  , // 码卡编号
        prop: "flatCardCode",
        span: 6
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        labelWidth: 70
      },
      {
        label: "松布程序"  , // 下栏序号
        prop: "sn",
        span: 6,
        type: "number"
      },
      {
        label: _this.$t("bottomcol.packNo")  , //包装序号
        prop: "packNo",
        span: 6
      }
    ]
  };
}

export function editFormOp(_this) {
  return {
    ...commonFormConfig,
    labelWidth: 100,
    column: [
      {
        label: "fcardId"  , // 码卡编号
        prop: "fcardId",
        span: 8,
        width: 160,
        overHidden: true,
        display: false,
        disabled: true
      },
      {
        label: _this.$t("quality.flatCardCode")  , // 码卡编号
        prop: "flatCardCode",
        span: 8,
        width: 160,
        overHidden: true,
        disabled: true
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 8,
        width: 140,
        display: true,
        disabled: true
      },
      {
        label: "松布程序"  , // 下栏序号
        prop: "sn",
        span: 8,
        width: 140,
        display: false,
        disabled: true
      },

      {
        label: _this.$t("energy.sl") ,//数量
        prop: "amount",
        width: 100,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "sizeUnit",
        span: 8,
        type: "select",
        disabled: true,
        width: 100,
        placeholder: " ",
        hide: true,
        dicData: [
          {
            label: "CM",
            value: "CM"
          },
          {
            label: "INCH",
            value: "INCH"
          }
        ]
      },
      {
        label: _this.$t("bottomcol.actualLength")  , //实际长
        prop: "actualLength",
        span: 8,
        width: 80,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: _this.$t("bottomcol.actualWidth")  , //实际宽
        prop: "actualWidth",
        width: 80,
        span: 8,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "actualQty",
        width: 100,
        span: 8,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },

      {
        label: _this.$t("bottomcol.packNo")  , //包装序号
        prop: "packNo",
        width: 100,
        span: 8,
        disabled: true,
        type: "number",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        width: 100,
        prop: "packSize",
        span: 8,
        type: "number",
        precision: 0
      },

      {
        label: _this.$t("bottomcol.packNwKg")  , //包净重
        prop: "packNwKg",
        span: 8,
        width: 100,
        type: "number",
      },
      {
        label: _this.$t("bottomcol.packGwKg")  , //包毛重
        prop: "packGwKg",
        span: 8,
        width: 100,
        type: "number"
      },
    ]
  };
}
const partNameDic = [{
  value: "领",
  label: "领"
},
  {
    value: "袖",
    label: "袖"
  }
];
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    height: "calc(100vh - 230px)",
    highlightCurrentRow: true,
    refreshBtn: false,
    selection: false,
    columnBtn: true,
    page:false,
    labelWidth: 100,
    column: [{
      label: "#",
      prop: "sn",
      width: 50,
      align: "center",
      fixed: true,
      type: "number"
    },
      {
        label: _this.$t("weaveJob.partName"), //"部位名称",
        prop: "partName",
        width: 100,
        placeholder: " ",
        type: "select",
        dicData: partNameDic,
        clearable: false
      },
      {
        label: _this.$t("revolve.lengthDsp"), // 长
        prop: "lengthDsp",
        width: 80,
        placeholder: " ",
        align: "center",
        clearable: false
      },
      {
        label: "X",
        prop: "X",
        width: 40,
        align: "center",
        slot: true
      },
      {
        label: _this.$t("revolve.widthDsp"), // 宽
        prop: "widthDsp",
        width: 80,
        placeholder: " ",
        align: "center",
        clearable: false
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "sizeUnit",
        width: 100,
        placeholder: " ",
        type: "select",
        clearable: false,
        dicData: [{
          label: "CM",
          value: "CM"
        },
          {
            label: "INCH",
            value: "INCH"
          }
        ]
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "amount",
        width: 100,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("revolve.nw"), // 要求重量
        prop: "nw",
        width: 100,
        placeholder: " ",
        type: "number"
      },
      {
        label: _this.$t("revolve.packageCount"), // 打包数量
        prop: "packageCount",
        width: 100,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("bottomcol.actualLength")  , //实际长
        prop: "actualLength",
        span: 8,
        cell:true,
        width: 80,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: _this.$t("bottomcol.actualWidth")  , //实际宽
        prop: "actualWidth",
        width: 80,
        span: 8,
        cell:true,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "actualQty",
        width: 100,
        span: 8,
        cell:true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },

      {
        label: _this.$t("bottomcol.packNo")  , //包装序号
        prop: "packNo",
        width: 100,
        span: 8,
        type: "number",
        cell:true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        width: 100,
        prop: "packSize",
        span: 8,
        cell:true,
        type: "number",
        precision: 0
      },

      {
        label: _this.$t("bottomcol.packNwKg")  , //包净重
        prop: "packNwKg",
        span: 8,
        width: 100,
        cell:true,
        type: "number",
      },
      {
        label: _this.$t("bottomcol.packGwKg")  , //包毛重
        prop: "packGwKg",
        span: 8,
        width: 100,
        cell:true,
        type: "number"
      },
    ]
  };
}


