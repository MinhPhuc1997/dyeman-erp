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

// 物料出货码卡
export function mateFactCardPrintFormOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 250px)",
    labelWidth: 120,
    index: true,
    column: [{
        label: _this.$t("vatNo"), // 缸号
        prop: "vatNo",
        span: 8,
        width: 160,
        formslot: true
      },
      {
        label:  _this.$t("sendCustSpanPrint.labelType"), //标签类型
        prop: "labelType",
        span: 8,
        width: 100,
        type: "switch",
        dicData: [
          {
            label:  _this.$t("sendCustSpanPrint.labelType1"), //本厂
            value: 1
          },
          {
            label:  _this.$t("sendCustSpanPrint.labelType2"), //外发
            value: 2
          }
        ],
        row: true
      },
      {
        label: _this.$t("fabCode") ,//"布料编号,
        prop: "fabCode",
        span: 8,
        width: 200
      },
      {
        label:  _this.$t("fabName"), //布料描述
        prop: "fabrication",
        span: 16,
        width: 200
      },
      {
        label:  _this.$t("sendCustSpanPrint.widthWeight"), //幅宽/克重
        prop: "widthWeight",
        span: 8,
        width: 150
      },
      {
        label:  _this.$t("fabElements"), //布料成份
        prop: "content",
        span: 16,
        width: 200
      },
      
      {
        label:  _this.$t("remark"), //备注
        prop: "remark",
        span: 24,
        type: "textarea"
      }
    ],
  };
}

// 物料出货码卡
export function mateFactCardCrudOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 250px)",
    labelWidth: 120,
    index: true,
    column: [{
        label: _this.$t("vatNo"), // 缸号
        prop: "vatNo",
        span: 8,
        width: 160,
        formslot: true
      },
      // {
      //   label: "标题",
      //   prop: "labelTitle",
      //   span: 8,
      //   width: 140,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: "Spower",
      //       value: "Spower"
      //     },
      //     {
      //       label: "Sumtex",
      //       value: "Sumtex"
      //     }
      //   ],
      //   filterable: true,
      //   allowCreate: true,
      //   defaultFirstOption: true,
      // },
      {
        label:  _this.$t("sendCustSpanPrint.labelType"), //标签类型
        prop: "labelType",
        span: 8,
        width: 100,
        type: "switch",
        dicData: [
          {
            label:  _this.$t("sendCustSpanPrint.labelType1"), //本厂
            value: 1
          },
          {
            label:  _this.$t("sendCustSpanPrint.labelType2"), //外发
            value: 2
          }
        ]
      },
      {
        label: _this.$t("fabCode") ,//"布料编号,
        prop: "fabCode",
        span: 16,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("fabName"), //布料描述
        prop: "fabrication",
        span: 16,
        width: 250,
        overHidden: true
      },
      {
        label:  _this.$t("sendCustSpanPrint.widthWeight"), //幅宽/克重
        prop: "widthWeight",
        span: 8,
        width: 150,
        overHidden: true
      },
      {
        label:  _this.$t("fabElements"), //布料成份
        prop: "content",
        span: 16,
        width: 250,
        overHidden: true
      },

      {
        label:  _this.$t("remark"), //备注
        prop: "remark",
        span: 24,
        type: "textarea",
        overHidden: true
      },
      {
        label: _this.$t("createTime") ,//创建时间
        prop: "createTime",
        span: 8,
        width: 160,
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label:  _this.$t("creator"), //创建人"
        prop: "creator",
        span: 8,
        width: 100
      },
      {
        label:  _this.$t("updateTime"), //更新时间
        prop: "updateTime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 8,
        width: 160,
        display: false,
        type: "datetime"
      },
      {
        label:  _this.$t("updator"), //更新人
        prop: "updator",
        span: 8,
        width: 100
      }
    ]
  };
}

export function queryFormOp(_this) {
  return {
    ...commonFormConfig,
    labelWidth: 100,
    column: [{
        label: _this.$t("vatNo"), // 缸号
        prop: "vatNo",
        span: 6
      },
      {
        label:  _this.$t("sendCustSpanPrint.labelType"), //标签类型
        prop: "labelType",
        span: 6,
        width: 100,
        type: "select",
        dicData: [
          {
            label:  _this.$t("sendCustSpanPrint.labelType1"), //本厂
            value: 1
          },
          {
            label:  _this.$t("sendCustSpanPrint.labelType2"), //外发
            value: 2
          }
        ]
      },
      {
        label:  _this.$t("fabName"), //布料描述
        prop: "fabrication",
        span: 6,
      },
    ]
  };
}
