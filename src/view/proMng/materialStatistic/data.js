export function formOption(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号-Mã hàng",
        prop: "vatNo",
        span: 7,
        width: 140,
        placeholder: " ",
        clearable: true,
      },
      {
        labelWidth: 200,
        label: "织造单号-Mã đơn dệt",
        prop: "weaveJobCode",
        span: 7,
        width: 140,
        placeholder: " ",
        clearable: true,
      },
    ],
  };
}

export function formOptionPO(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "本厂po",
        prop: "salPoNo",
        span: 7,
        width: 140,
        placeholder: " ",
        clearable: true,
      },
    ],
  };
}


const defaultValue = {
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

export function crudMain(_this) {
  return {
    ...defaultValue,
    height: "calc( 100vh - 255px )",
    column: [
      {
        label: "#",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 50,
      },
      {
        label: "缸号",
        prop: "vatNo",
        placeholder: "",
        align: "left",
        width: 150,
        overHidden: true,
      },
      {
        label: "织造生产单号",
        prop: "weaveJobCode",
        placeholder: "",
        align: "left",
        width: 130,
      },
      {
        label: "疋数",
        prop: "pidCount",
        placeholder: "",
        align: "left",
        width: 70,
        overHidden: true,
      },
      {
        label: "开单数量",
        prop: "jobAmount",
        placeholder: "",
        align: "left",
        width: 90,
        overHidden: true,
      },
      {
        label: "总使用水量",
        prop: "waterAmount",
        placeholder: "",
        align: "center",
        width: 115,
        overHidden: true,
      },
      {
        label: "总物料使用数量",
        prop: "useAmount",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "颜料使用数量",
        prop: "amountPigment",
        placeholder: "",
        align: "center",
        width: 130,
        overHidden: true,
      },
      {
        label: "总颜料使用数量",
        prop: "amountChemicalmat",
        placeholder: "",
        align: "center",
        width: 135,
        overHidden: true,
      },
    ]
  };
}

export const crudNotPO =  [
  {
    label: "#",
    prop: "index",
    placeholder: "",
    align: "center",
    width: 50,
  },
  {
    label: "缸号",
    prop: "vatNo",
    placeholder: "",
    align: "left",
    width: 150,
    overHidden: true,
  },
  {
    label: "织造生产单号",
    prop: "weaveJobCode",
    placeholder: "",
    align: "left",
    width: 130,
  },
  {
    label: "疋数",
    prop: "pidCount",
    placeholder: "",
    align: "left",
    width: 70,
    overHidden: true,
  },
  {
    label: "开单数量",
    prop: "jobAmount",
    placeholder: "",
    align: "left",
    width: 90,
    overHidden: true,
  },
  {
    label: "总使用水量",
    prop: "waterAmount",
    placeholder: "",
    align: "center",
    width: 115,
    overHidden: true,
  },
  {
    label: "总物料使用数量",
    prop: "useAmount",
    placeholder: "",
    align: "center",
    width: 150,
    overHidden: true,
  },
  {
    label: "颜料使用数量",
    prop: "amountPigment",
    placeholder: "",
    align: "center",
    width: 130,
    overHidden: true,
  },
  {
    label: "总颜料使用数量",
    prop: "amountChemicalmat",
    placeholder: "",
    align: "center",
    width: 135,
    overHidden: true,
  },
]

export const crudHasPO =  [
  {
    label: "#",
    prop: "index",
    placeholder: "",
    align: "center",
    width: 50,
  },
  {
    label: "本厂po",
    prop: "salPoNo",
    placeholder: "",
    align: "left",
    width: 250,
    overHidden: true,
  },
  {
    label: "疋数",
    prop: "pidCount",
    placeholder: "",
    align: "left",
    width: 70,
    overHidden: true,
  },
  {
    label: "开单数量",
    prop: "jobAmount",
    placeholder: "",
    align: "left",
    width: 90,
    overHidden: true,
  },
  {
    label: "总使用水量",
    prop: "waterAmount",
    placeholder: "",
    align: "center",
    width: 115,
    overHidden: true,
  },
  {
    label: "总物料使用数量",
    prop: "useAmount",
    placeholder: "",
    align: "center",
    width: 150,
    overHidden: true,
  },
  {
    label: "颜料使用数量",
    prop: "amountPigment",
    placeholder: "",
    align: "center",
    width: 130,
    overHidden: true,
  },
  {
    label: "总颜料使用数量",
    prop: "amountChemicalmat",
    placeholder: "",
    align: "center",
    width: 135,
    overHidden: true,
  },
]

export function crudDetail(_this) {
  return {
    ...defaultValue,
    page:false,
    height: "calc( 100vh - 255px )",
    column: [
      {
        label:"#",
        prop:"index",
        width: 70,
        align: "center"
      },
      {
        label:  _this.$t("dye.bleadyeType"), //工藝類型
        prop: "bleadyeType",
        width: 90,
        span: 6,
        placeholder: " ",
        align: "center",
        // slot: true,
        type: "select",
        dicData: [
          {
            label: _this.$t("finalizeDesign.add_chemicalmat") ,//增加助剂
            value: "add_chemicalmat"
          },
          {
            label: _this.$t("finalizeDesign.add_pigment") ,//加颜料
            value: "add_pigment"
          },
          {
            label: _this.$t("finalizeDesign.run") ,//运行
            value: "run"
          }
        ]
      },
      {
        label:  _this.$t("dye.mateCode"), //物料编号
        prop: "materialCode",
        width: 100,
        span: 6,
        placeholder: " ",
      },
      {
        label:  _this.$t("dye.mateName"), //物料名稱
        prop: "materialName",
        width: 200,
        span: 6,
        placeholder: " ",
        overHidden: true
      },
      {
        label:  "配方", //物料批次
        prop: "formulaFactor",
        width: 100,
        span: 6,
        placeholder: " "
      },
      {
        label:  "使用数量", //材料用量
        prop: "useAmount",
        width: 90,
        type: "number",
        span: 6,
        placeholder: " ",
        align: "right"
      },

      {
        label:  "浴比", //輸送數量
        prop: "waterRatio",
        width: 90,
        type: "number",
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label:  "水量", //輸送數量
        prop: "waterAmount",
        width: 90,
        type: "number",
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.deliveryQuantity"), //輸送數量
        prop: "diluteRatio",
        width: 90,
        type: "number",
        align: "right",
        span: 6,
        placeholder: " "
      },
    ]
  };
}
