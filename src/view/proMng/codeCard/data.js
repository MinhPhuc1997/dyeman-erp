/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:58:01
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-27 19:07:12
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        props: {
          value: "custCode",
          label: "custName"
        }
      },
      {
        label:  _this.$t("ledger.appTime"), //缸號,
        prop: "appDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
      }
    ]
  };
}

let cust = getXDicT("basCustomer");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 8,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請输入缸號",
            trigger: "blur"
          }
        ],
        click: () => {
          // _this.choiceV = true;
        }
      },
      {
        label:  _this.$t("custCode"), //客戶名称,
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 8,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust,
        rules: [
          {
            required: true,
            message: "請选择客户名称",
            trigger: "blur"
          }
        ],
        props: {
          value: "custCode",
          label: "custName"
        }
      },
      // {
      //   label: "客戶编号",
      //   tip: "Khách hàng",
      //   prop: "custCode",
      //   overHidden: true,
      //   width: 150,
      //   span: 6,
      //   placeholder: " "
      // },

      {
        label:  _this.$t("ledger.appTime"), //缸號,
        prop: "appDate",
        width: 130,
        span: 8,
        tip: "Ngày lập đơn",
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇批色日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇批色日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("colorName"), //顏色名稱,
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 8,
        placeholder: " "
      },
      {
        label:  _this.$t("colorCode"), //色號,
        tip: "Số màu",
        prop: "colorNo",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: _this.$t("custBatchNo"), //"客批号",
        prop: "custBatchNo",
        tip: "Mã vải",
        span: 8,
        width: 180,
        placeholder: " ",
        overHidden: true,
        disabled: false
      },
      {
        label: _this.$t("weight"), //"重量",
        tip: "Tổng cộng(KG)",
        prop: "sumWeight",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請输入重量",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("fabName"), //"布類",
        prop: "fabricName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 16,
        placeholder: " "
      },

      {
        label: _this.$t("pidCount"), //"疋數",
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請输入疋數",
            trigger: "blur"
          }
        ]
        // row: _this.type == 1 ? false : true
      },
      {
        label: _this.$t("colorLights"), //"對色光源",
        tip: "Nguồn sáng so màu",
        prop: "colorLights",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 16,
        multiple: true,
        type: "select",
        dicData: getDIC("sal_colorLights")
      },
      {
        label: _this.$t("colorStandard"), // "对色标准",
        tip: "Tiêu chuẩn so màu/Số bồn nhuộm",
        prop: "colorStandard",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 8
      },
      {
        label:  _this.$t("comments"), // "评语",
        prop: "remark",
        tip: "Nhận xét",
        width: 100,
        span: 16,
        placeholder: " ",
        hide: true,
        minRows:2,
        type: "textarea"
      }
    ]
  };
}

