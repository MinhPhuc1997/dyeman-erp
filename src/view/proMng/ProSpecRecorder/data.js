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


export function getColorData(val) {
  let arrColor = [
    {value: 1, color: "rgba(178, 135, 244, 1)"},
    {value: 2, color: "rgba(255, 255, 255, 1)"},
    {value: 3, color: "rgba(253, 240, 69, 1)"},
    {value: 4, color: "rgba(82, 201, 230, 1)"},
    {value: 5, color: "rgba(253, 87, 69, 1)"}
  ]
  return  arrColor[arrColor.findIndex((e)=>e.value==val)].color
}

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "记录ID",
        prop: "specRecId",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "记录ID",
      },
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "缸号",
      },
      {
        label: "运转单ID",
        prop: "runJobId",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "运转单ID",
      },
      {
        label: "胚布洗前幅宽",
        prop: "beforBreath",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "胚布洗前幅宽",
      },
      {
        label: "胚布洗前斜度",
        prop: "beforSlope",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "胚布洗前斜度",
      },
      {
        label: "胚布洗前克重",
        prop: "beforGramWeight",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "胚布洗前克重",
      },
      {
        label: "洗后幅宽",
        prop: "afterBreath",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "洗后幅宽",
      },
      {
        label: "洗后克重",
        prop: "afterGramWeight",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "洗后克重",
      },
      {
        label: "洗后斜度",
        prop: "afterSlope",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "洗后斜度",
      },
      {
        label: "出缸（甩干）幅宽",
        prop: "spinDryBreath",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "出缸（甩干）幅宽",
      },
      {
        label: "出缸（甩干）克重",
        prop: "spinDryGramWeight",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "出缸（甩干）克重",
      },
      {
        label: "出缸（甩干）斜度",
        prop: "spinDrySlope",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "出缸（甩干）斜度",
      },
      {
        label: "定后幅宽",
        prop: "stableBreath",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "定后幅宽",
      },
      {
        label: "定后克重",
        prop: "stableGramWeight",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "定后克重",
      },
      {
        label: "定后斜度",
        prop: "stableSlope",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "定后斜度",
      },
      {
        label: "缩水后幅宽",
        prop: "shrinkBreath",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "缩水后幅宽",
      },
      {
        label: "缩水后克重",
        prop: "shrinkWeight",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "缩水后克重",
      },
      {
        label: "缩水后斜度",
        prop: "shrinkSlope",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "缩水后斜度",
      },
      {
        label: "横缩",
        prop: "shrinkHorizonta",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "横缩",
      },
      {
        label: "直缩",
        prop: "shrinkVertical",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "直缩",
      },
      {
        label: "扭度",
        prop: "twist",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "扭度",
      },
      {
        label: "规格建议",
        prop: "specTips",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "规格建议",
      },
      {
        label: "创建日期",
        prop: "createTime",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "创建日期",
      },
      {
        label: "创建人",
        prop: "creator",
        span: 6,
        display: true,
        placeholder: " ",
        tip: "创建人",
      },
      {
        label: "修改日期",
        prop: "updateTime",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "修改日期",
      },
      {
        label: "修改人",
        prop: "updator",
        span: 6,
        display: false,
        placeholder: " ",
        tip: "修改人",
      }
    ]
  };
}

export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: true,
    height: "calc(100vh - 285px)",
    column: [
      {
        label: "#",
        prop: "index",
        width: 70,
        hide: false,
        fixed: "left",
      },
      {
        label: '颜色',
        prop: 'color',
        width: 100,
        type: 'color',
        fixed: "left",
      },
      {
        label: "记录ID",
        prop: "specRecId",
        width: 100,
        hide: true,
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 175,
        fixed: "left",
      },
      {
        label: "运转单ID",
        prop: "runJobId",
        hide: true,
        width: 125,
      },
      {
        label: "胚布洗前",
        children: [
          {
            label: "幅宽",
            prop: "beforBreath",
            width: 80,
          },
          {
            label: "斜度",
            prop: "beforSlope",
            width: 80,
          },
          {
            label: "克重",
            prop: "beforGramWeight",
            width: 80,
          },
          {
            label: "循环间距",
            prop: "beforLoop",
            width: 100,
          },
        ]
      },
      {
        label: "胚布洗后",
        children: [
          {
            label: "幅宽",
            prop: "afterBreath",
            width: 80,
          },
          {
            label: "克重",
            prop: "afterGramWeight",
            width: 80,
          },
          {
            label: "斜度",
            prop: "afterSlope",
            width: 80,
          },
          {
            label: "循环间距",
            prop: "afterLoop",
            width: 100,
          },
        ]
      },
      {
        label: "缩水后",
        children: [
          {
            label: "幅宽",
            prop: "shrinkBreath",
            width: 80,
          },
          {
            label: "克重",
            prop: "shrinkWeight",
            width: 80,
          },
          {
            label: "斜度",
            prop: "shrinkSlope",
            width: 80,
          },
          {
            label: "横缩",
            prop: "shrinkHorizonta",
            width: 80,
          },
          {
            label: "直缩",
            prop: "shrinkVertical",
            width: 80,
          },
          {
            label: "循环间距",
            prop: "shrinkLoop",
            width: 100,
          },
        ]
      },
      {
        label: "出缸（甩干）",
        children: [
          {
            label: "幅宽",
            prop: "spinDryBreath",
            width: 80,
          },
          {
            label: "克重",
            prop: "spinDryGramWeight",
            width: 80,
          },
          {
            label: "斜度",
            prop: "spinDrySlope",
            width: 80,
          },
          {
            label: "循环间距",
            prop: "spinDryLoop",
            width: 100,
          },
        ]
      },
      {
        label: "定后",
        children: [
          {
            label: "幅宽",
            prop: "stableBreath",
            width: 80,
          },
          {
            label: "克重",
            prop: "stableGramWeight",
            width: 80,
          },
          {
            label: "斜度",
            prop: "stableSlope",
            width: 80,
          },
          {
            label: "循环间距",
            prop: "stableLoop",
            width: 100,
          },
        ]
      },

      {
        label: "扭度",
        prop: "twist",
        width: 80,
      },
      {
        label: "规格建议",
        prop: "specTips",
        overHidden: true,
        width: 200,
      },
      {
        label: "创建日期",
        prop: "createTime",
        width: 200,
      },
      {
        label: "创建人",
        prop: "creator",
        width: 100,
      },
      {
        label: "修改日期",
        prop: "updateTime",
        width: 200,
      },
      {
        label: "修改人",
        prop: "updator",
        width: 100,
      }
    ]
  };
}

export function itemForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 12,
        width: 50,
        placeholder: " ",
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "创建日期",
        prop: "createTime",
        placeholder: " ",
        span: 12,
        width: 100,
        disabled: true,
      },
      {
        label: "创建人",
        prop: "creator",
        placeholder: " ",
        span: 12,
        width: 75,
        disabled: true,
      },
      {
        label: "横缩",
        prop: "shrinkHorizonta",
        placeholder: " ",
        span: 12,
        width: 100,
        type:"number",
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.shrinkHorizonta = parseFloat(val.value).toFixed(2);
          }
        }
      },
      {
        label: "缩水后克重",
        prop: "gramWeight",
        placeholder: " ",
        type:"number",
        span: 12,
        width: 100,
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.gramWeight = parseFloat(val.value).toFixed(0);
          }
        }
      },
      {
        label: "缩水后斜度",
        prop: "slopeGrain",
        placeholder: " ",
        type:"number",
        span: 12,
        width: 100,
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.slopeGrain = parseFloat(val.value).toFixed(2);
          }
        }
      },
      {
        label: "直缩",
        prop: "shrinkVertical",
        placeholder: " ",
        type:"number",
        span: 12,
        width: 100,
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.shrinkVertical = parseFloat(val.value).toFixed(2);
          }
        }
      },
      {
        label: "缩水后循环间距",
        prop: "loopSpace",
        placeholder: " ",
        type:"number",
        span: 12,
        width: 100,
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.loopSpace = parseFloat(val.value).toFixed(2);
          }
        }
      },
      {
        label: "规格建议",
        prop: "specTips",
        placeholder: " ",
        type:"number",
        span: 12,
        width: 100,
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.specTips = parseFloat(val.value).toFixed(2);
          }
        }
      },
      {
        label: "缩水后幅宽",
        prop: "breath",
        placeholder: " ",
        type:"number",
        span: 12,
        width: 100,
        blur: val => {
          if (val.value !== "undefined") {
            _this.form.breath = parseFloat(val.value).toFixed(2);
          }
        }
      },
    ],
  };
}
