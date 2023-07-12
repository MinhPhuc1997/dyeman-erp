/*
 * @Author: Yang 
 * @Date: 2022-03-11 16:49:19 
 * @Last Modified by: Lyl
 * @Last Modified time: 2022-10-31 16:26:30
 */
import {  getDicT } from "@/config";
let cust =  getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
    return {
      submitBtn: false,
      emptyBtn: false,
      labelWidth: 100,
      column: [
        {
            label:  _this.$t("custName"), //"客戶",
            prop: "custId",
            span: 6,
            placeholder: " ",
            type: "select",
            dicData: cust
        },
        {
            label:  _this.$t("proRpt.posDate"), // "起始月份",
            prop: "posDate",
            span: 6,
            placeholder: " ",
            type: "month",
            format:'yyyy-MM',
            valueFormat:'yyyy-MM',
        },
        {
            label: _this.$t("proRpt.poeDate"), //  "结束月份",
            prop: "poeDate",
            span: 6,
            placeholder: " ",
            type: "month",
            format:'yyyy-MM',
            valueFormat:'yyyy-MM',
        },
      ]
    };
  }