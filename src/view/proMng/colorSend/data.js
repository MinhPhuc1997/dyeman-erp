/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 15:40:56
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");

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
        label: _this.$t("custName") ,//"客户,
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("colorSend.appColorQc") ,// "批色员",
        prop: "appColorQc",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("colorSend.sendDate") ,//"送办日期",
        prop: "sendDate",
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
    labelWidth: 120,
    selection: true,
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
        ],
        click: () => {
          // _this.choiceTle = _this.$t('choiceTem.choiceTle');
          // _this.choiceV = true;
        }
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        type: "select",
        dicData: cust,
        tip: "Khách hàng"
      },
      {
        label: _this.$t("colorSend.sendDate") ,//"送办日期",
        prop: "sendDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("colorName") ,//颜色,
        tip: "Màu",
        prop: "colorName",
        width: 140,
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("fabFabrics") ,//布种,
        tip: "mô tả vải",
        prop: "fabFabrics",
        width: 250,
        overHidden: true,
        span: 6
      },

      {
        label: _this.$t("colorSend.sendCount") ,//"送办次数",
        prop: "sendCount",
        width: 90,
        overHidden: true,
        type: "number",
        span: 6
      },
      {
        label: _this.$t("colorSend.appColorQc") ,//"批色员",
        prop: "appColorQc",
        width: 140,
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("colorSend.isFristVat") , //"是否头缸",
        prop: "isFristVat",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        type: "switch",
        dicData: [
          {
            value: false,
            label: _this.$t("public.false")
          },
          {
            value: true,
            label: _this.$t("public.true")
          }
        ]
      },
      {
        label:  _this.$t("colorSend.custReplyDate"),//"客户回复日期",
        prop: "custReplyDate",
        width: 150,
        type: "date",
        span: 6,
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label:  _this.$t("colorSend.custComments"),//"客户评语",
        prop: "custComments",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false
      },

      {
        label: _this.$t("remark"),//"备注",
        tip: "ghi chú",
        prop: "remark",
        overHidden: true,
        width: 180,
        span: 24,
        disabled: false
      }
    ]
  };
}


