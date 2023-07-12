/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-27 13:54:05
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\data.js
 * @Description:
 */
import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");

function fillZero(row, value) {
  return value && value.toFixed(2);
}


// 表格通用配置
const mainCrudOpCommon = {
  menu: true,
  addBtn: false,
  delBtn: false,
  editBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 120,
};

export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        span: 6,
        labelWidth: 70
      },
      {
        label: _this.$t("weaveJobCode")  , // 反馈人员
        prop: "weaveJobCode",
        span: 6,
      },
      {
        label:  _this.$t("dye.bleadyeType"), //工藝類型
        prop: "bleadyeType",
        width: 90,
        span: 6,
        align: "center",
        type: "select",
        dicData: [
          {
            label: _this.$t("finalizeDesign.add_chemicalmat") ,//增加助剂
            value: "add_chemicalmat"
          },
          {
            label: _this.$t("finalizeDesign.add_pigment") ,//加颜料
            value: "add_pigment"
          },
          {
            label: _this.$t("finalizeDesign.run") ,//运行
            value: "run"
          }
        ]
      },
    ]
  };
}

export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth: 120,
    showSummary: false,
    menu: false,
    menuWidth: 80,
    height: "calc(100vh - 280px)",
    column: [
      {
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        span: 6,
        width: 150,
        fixed: true,
      },
      {
        label: _this.$t("weaveJobCode"), //"缸号",
        prop: "weaveJobCode",
        span: 6,
        width: 150,
        overHidden: true,
      },
      // {
      //   label:  _this.$t("deliveDate") ,//交货日期,
      //   prop: "deliveDate",
      //   width: 120,
      //   span: 6,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd"
      // },
      // {
      //   label:  _this.$t("workDate") ,//开單日期,
      //   tip: "Ngày lập đơn",
      //   prop: "workDate",
      //   width: 120,
      //   span: 6,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd"
      // },
      {
        label:  _this.$t("pidCount") ,//疋數,
        prop: "pidCount",
        tip: "Cây",
        width: 60,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 90,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      
      {
        label: "合染重量", //总水量
        prop: "mergClothWeight",
        width: 90,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
      },
      {
        label:  _this.$t("checkPlan.sumNw"), //总重量
        prop: "totalClothWeight",
        width: 90,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
      {
        label:  _this.$t("dye.totalWater"), //总水量
        prop: "totalWater",
        width: 90,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
      },
      {
        label: "颜料用量(g)",
        prop: "usePigment",
        width: 110,
        align: "right",
        formatter: (r,v) => {
          return Number(v).toFixed(2);
        }
      },
      {
        label: "助剂用量(kg)",
        prop: "useChemicalmat",
        align: "right",
        width: 120,
        formatter: (r, v) => {
          return Number(v).toFixed(2);
        }
      },
      {
        label:  _this.$t("mergVatNo") ,//合染缸號,
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
      },
    ]
  };
}


export function detailCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth: 120,
    showSummary: false,
    menu: false,
    page: false,
    height: "calc(100vh - 244px)",
    column: [
      {
        label:  _this.$t("dye.bleadyeType"), //工藝類型
        prop: "bleadyeType",
        width: 90,
        span: 6,
        placeholder: " ",
        align: "center",
        // slot: true,
        type: "select",
        dicData: [
          {
            label: _this.$t("finalizeDesign.add_chemicalmat") ,//增加助剂
            value: "add_chemicalmat"
          },
          {
            label: _this.$t("finalizeDesign.add_pigment") ,//加颜料
            value: "add_pigment"
          },
          {
            label: _this.$t("finalizeDesign.run") ,//运行
            value: "run"
          }
        ]
      },
      {
        label:  _this.$t("dye.mateCode"), //物料编号
        prop: "mateCode",
        width: 100,
        span: 6,
        placeholder: " ",
      },
      {
        label:  _this.$t("dye.mateName"), //物料名稱
        prop: "mateName",
        width: 200,
        span: 6,
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("dye.mateBatchNo"), //物料批次
        prop: "mateBatchNo",
        width: 100,
        span: 6,
        placeholder: " "
      },
      // {
      //   label:  _this.$t("dye.formulaAmount"), //配方用量
      //   prop: "formulaAmount",
      //   width: 90,
      //   type: "number",
      //   align: 'center',
      //   span: 6,
      //   placeholder: " ",

      // },
      // {
      //   label:  _this.$t("dye.measureType"), //材料度量
      //   prop: "measureType",
      //   width: 90,
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   align: "center",
      //   dicData: [
      //     {
      //       label: "%",
      //       value: "%"
      //     },
      //     {
      //       label: "X%",
      //       value: "X%"
      //     },
      //     {
      //       label: "g/L",
      //       value: "g/L"
      //     }
      //   ]
      // },
      {
        label:  _this.$t("dye.useAmount"), //材料用量
        prop: "useAmount",
        width: 90,
        type: "number",
        span: 6,
        placeholder: " ",
        align: "right"
      },
      {
        label:  _this.$t("unit"), //單位
        prop: "formulaUnit",
        width: 60,
        span: 6,
        align: "left",
        type: "select",
        dicData: [
          {
            label: "KG",
            value: "KG"
          },
          {
            label: "g",
            value: "g"
          },
          {
            label: "L",
            value: "L"
          }
        ],
        placeholder: " ",
      },
      
      // {
      //   label:  _this.$t("dye.runTemp"), //溫度
      //   prop: "runTemp",
      //   width: 80,
      //   type: "number",
      //   span: 6,
      //   placeholder: " "
      // },
      // {
      //   label:  _this.$t("dye.runTime"), //時間(分鐘
      //   prop: "runTime",
      //   width: 100,
      //   type: "number",
      //   span: 6,
      //   placeholder: " "
      // },
      // {
      //   label:  _this.$t("dye.dilutionRate"), //開稀比例
      //   prop: "dilutionRate",
      //   width: 90,
      //   type: "number",
      //   span: 6,
      //   placeholder: " "
      // },
      {
        label:  _this.$t("dye.deliveryQuantity"), //輸送數量
        prop: "deliveryQuantity",
        width: 90,
        type: "number",
        align: "right",
        span: 6,
        placeholder: " "
      }
    ]
  };
}