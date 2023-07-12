/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-30 14:47:16
 * @Description:
 */

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        tip: "lô nhuộm",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("createTime") ,//"创建日期",
        prop: "createTime",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // labelPosition: "top",
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        tip: "số lô nhuộm",
        prop: "vatNo",
        overHidden: true,
        width: 140,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入缸号(số lô nhuộm)",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("colorNoSetting.reworkRemark"),  //"回修原因",
        prop: "reworkRemark",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false
      },
      {
        label: _this.$t("colorNoSetting.signature"),  // "签字",
        prop: "signPerson",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false
      },
      {
        label: _this.$t("colorNoSetting.approach"),  // "处理方法",
        prop: "workWay",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false
      },
      {
        label: _this.$t("createTime") ,//"创建日期",
        prop: "createTime",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        display: false,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      }
    ]
  };
}


