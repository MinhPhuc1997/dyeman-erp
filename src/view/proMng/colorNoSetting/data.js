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
      labelWidth: 120,
      column: [{
        label: _this.$t('po.poNo'), //"生产通知单号",
        prop: "poNo",
        span: 5,
        placeholder: " ",
      }]
    };
  }

export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 235px)",
    column: [{
      label:  _this.$t('poNo'), //"生产通知单号",
      prop: "poNo",
      width: 120,
    }, {
      label:  _this.$t('fabName'), //"面料描述",
      prop: "fabName",
      width: 400,
      overHidden: true,
    }, {
      label:  _this.$t('guestColorNo'), // "客人颜色编号",
      prop: "colorCode",
      width: 120,
      overHidden: true,
    }, {
      label:  _this.$t('colorEng'), //"颜色(英文)",
      prop: "colorEngName",
      width: 130,
      overHidden: true,
    }, {
      label:  _this.$t('colorCn'), //"颜色(中文)",
      prop: "colorChnName",
      width: 130,
      overHidden: true,
    }, {
      label:  _this.$t('factoryColorNo'), //"本厂色号",
      prop: "colorNo",
      width: 140,
      cell: true,
    }]
  }
}
