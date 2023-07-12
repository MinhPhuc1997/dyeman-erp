/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-02 08:26:04
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 140,
    column: [
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "noteCode",
        tip: "布票号",
        span: 8,
        placeholder: "请扫描布票号条码",
        click: () => {
          _this.type = "bf";
        }
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "eachNumbers",
        tip: "重量",
        width: 80,
        span: 8,
        placeholder: "请打开称重应用"
      },
      {
        label:  _this.$t("clothFly.clothChecker"), //验布员工号
        prop: "clothCheckers",
        tip: "验布员工号",
        span: 8,
        placeholder: "请扫描员工条码",
        click: () => {
          _this.type = "yg";
        }
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCodes",
        tip: "载具编号",
        span: 8,
        placeholder: "请输入载具编号",
        click: () => {
          _this.type = "zj";
        }
      },
      {
        label:  _this.$t("note.paperTube1"), //纸筒重量
        prop: "paperTubes",
        tip: "纸筒重量",
        width: 80,
        type: "number",
        span: 8,
      },
      {
        label:  _this.$t("scan.qcTakeOuts"), //QC扣减数量
        prop: "qcTakeOuts",
        tip: "QC扣减数量",
        width: 80,
        // align: "left",
        type: "number",
        span: 8,
      },
      {
        label:  _this.$t("workNo"), //值机工号,
        prop: "workNos",
        tip: "值机工号",
        span: 8,
        placeholder: "请扫描值机工号",
        click: () => {
          _this.type = "yg";
        }
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        tip: "存储位置",
        prop: "storeSiteCodes",
        span: 8,
        placeholder: "请输入存储位置",
        type: "select",
        // props: {
        //   label: "locationCode",
        //   value: "locationCode"
        // },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode"),
        click: () => {
          _this.type = "yg";
        }
      },

      {
        label:  _this.$t("scan.qcClothCheckItem"), //QC查布
        prop: "qcClothCheckItem",
        span: 8,
        formslot: true
        // placeholder: "请选择QC查布",
        // readonly: true,
        // click: () => {
        //   _this.qcDlg = true;
        //   // _this.qcItem = [];
        // }
        // type: "select",
        // dicData: []
        // filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        // dicData: getDicT("qcClothCheckItem", "itemName", "itemCode")
      }
    ]
  };
}

export function qcForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 160,
    column: []
  };
}
