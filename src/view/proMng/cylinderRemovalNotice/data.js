/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-04 14:35:05
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-04 15:57:53
 */
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  showSummary: false,
  tree: false,
  rowKey: "index",
  index: true,
  page: false,
}

export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 90,
    column: [{
        label: _this.$t('vatNo'), //"缸号",
        prop: "vatNo",
        span: 5,
        labelWidth: 70,
      },
      {
        label: _this.$t("loomSchedule.state"), //状态 //"缸号",
        prop: "convertFlag",
        type: "select",
        labelWidth: 70,
        dicData: [{
            label: "待拆缸",
            value: 1
          },
          {
            label: "未开启",
            value: 0
          },
          {
            label: "已拆缸",
            value: 9
          }
        ],
        span: 5,
      },
      {
        label: _this.$t('creator'),
        prop: "creator",
        span: 5,
      },
      {
        label: "转换时间",
        prop: "convertTime",
        type: "daterange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 9,
      },
    ]
  };
}

export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    menu: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    page: true,
    height: "calc(100vh - 275px)",
    column: [{
      label: _this.$t('vatNo'),
      prop: "vatNo",
      width: 160,
    }, {
      label: _this.$t('revolve.splitTle3'),
      prop: "convertVatNo",
      width: 190,
    }, {
      label: _this.$t("loomSchedule.state"), //状态
      prop: "convertFlag",
      width: 80,
      overHidden: true,
      type: "select",
      dicData: [{
          label: "待拆缸",
          value: 1
        },
        {
          label: "未开启",
          value: 0
        },
        {
          label: "已拆缸",
          value: 9
        }
      ]
    }, {
      label: _this.$t('creator'),
      prop: "creator",
      width: 80,
      overHidden: true,
    }, {
      label: "转换时间",
      prop: "convertTime",
      width: 180,
      align: "center",
      overHidden: true
    }, {
      label: _this.$t('remark'), //
      prop: "noteRemark",
      // width: 250,
      overHidden: true,
    }, ]
  }
}



export function detailCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 239px)",
    index: false,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "productNo",
        type: "count"
      }
    ],
    column: [{
      label: _this.$t('eachNumber'),
      prop: "pidNo",
      width: 60,
      align: 'right'
    }, {
      label: _this.$t('productNo'),
      prop: "productNo",
      width: 160,
    }, {
      label: _this.$t('createTime'),
      prop: "createTime",
      width: 170,
      align: "center",
      overHidden: true
    }, ]
  }
}
