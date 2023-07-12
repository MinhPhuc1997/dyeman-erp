/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-16 08:31:42
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode", {}, "custName");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        span: 6,
      },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        span: 6,
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "customerName",
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6
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
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        width: 180,
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "customerName",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 300,
        overHidden: true
      },
      {
        label: _this.$t("colorName"), //顏色,
        prop: "proColor",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true
      },

      {
        label:  _this.$t("yarnBatch"), //纱批,
        prop: "spi",
        width: 90,
        hide: true,
        span: 6
      },

      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "sp",
        width: 90,
        hide: true,
        span: 6
      },
      // {
      //   label: "机台編號",
      //   prop: "machineCode",
      //   width: 110,
      //   hide: false,
      //   span: 6,
      //   disabled: true,

      // },
      {
        label:  _this.$t("loomNo"), //机号,
        prop: "loomNo",
        width: 100,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true
      },
      {
        label:  _this.$t("workNo"), //值机工号,
        prop: "workNo",
        width: 90,
        hide: false,
        span: 6,
        disabled: true,
        rules: [
          {
            required: true,
            message: "请输入值机工号",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "breadth",
        width: 80,
        align: "right",
        span: 6,

        overHidden: true,
        rules: [
          {
            required: true,
            message: "请输入幅宽",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 80,
        align: "center",
        span: 6
      },
      // {
      //   label:  _this.$t("unit"), //單位
      //   prop: "weightUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      // {
      //   label: "長度",
      //   prop: "clothLength",
      //   width: 80,
      //   display: false
      // },

      // {
      //   label:  _this.$t("unit"), //單位
      //   prop: "lenUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        width: 80,
        align: "right",
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入克重",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6
      },
      {
        label:  _this.$t("isPrinted"), //已打印,
        prop: "isPrinted",
        type: "select",
        disabled: true,
        dicData: [
          {
            value: true,
            label: _this.$t("public.true")
          },
          {
            value: false,
            label: _this.$t("public.false")
          }
        ],
        span: 6
      },
      {
        label:  _this.$t("printedTime"), //打印时间,
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        width: 180
      }
    ]
  };
}
