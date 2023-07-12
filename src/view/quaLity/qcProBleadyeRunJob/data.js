/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-23 10:36:15
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-19 16:48:15
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: _this.$t("workDate") ,//开单日期,
        prop: "workDate",
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
        span: 12,
        placeholder: " ",
      },
    ]
  };
}

export function cutFormOp(_this) {
    return {
      submitBtn: false,
      emptyBtn: false,
      labelWidth: 100,
      column: [
        {
            label: "裁剪布票号",
            prop: "noteId",
            span: 12,
            type: "select",
            props: {
                label: "noteCode",
                value: "noteId"
            },
            dicData: [],
            change: ({value}) => {
                _this.cutNoteCodeChange(value);
            }
        },
        {
            label: "原重量",
            prop: "clothWeight",
            span: 12,
            type: "number",
            disabled: true,
            minRows: 0,
            // maxRows: _this.cutCheckData.clothWeight,
        },
        {
            label: "新布票号",
            prop: "nclothNoteCode",
            disabled: true,
            span: 12
        },
        {
            label: "新布票重量",
            prop: "nclothWeight",
            span: 12,
            type: "number",
            minRows: 0,
            // maxRows: _this.cutCheckData.clothWeight,
            change: ({value}) => {
                _this.$nextTick(() => {
                    if (value > _this.cutCheckData.clothWeight) {
                      _this.$tip.warning("回仓数量不能大于原胚布重量!");
                      _this.cutFormData.nclothWeight = _this.cutCheckData.clothWeight;
                      return;
                    }
                    if (value <= 0) {
                      _this.cutFormData.nclothWeight = 1;
                      _this.$tip.warning("回仓数量不能小于0!");
                      return;
                    }
                    _this.cutFormData.clothWeight =  (_this.cutCheckData.clothWeight - value).toFixed(1);
                });
            }
        },
      ]
    };
  }

const  crudOption = {
  menu: false,
  addBtn: false,
  cancelBtn: false,
  editBtn: false,
  delBtn: false,
  menuWidth: 80,
  border: true,
  index: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 245px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  labelWidth: 100,
  selection: false,
  showSummary: false,
}

export function mainCrud(_this) {
  return {
    ...crudOption,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "pidCount",
        type: "sum"
      }
    ],
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140,
        overHidden: true,
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: 130,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: _this.$t("orderNo") ,//"订单号",,
        prop: "salPoNo",
        width: 150,
        overHidden: true,
      },
      {
        label: _this.$t("workDate") ,//开单日期,
        prop: "workDate",
        width: 110,
        formatter: (row, value) => {
          return value && (value.slice(0,10))
        }
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliveDate",
        width: 110,
        formatter: (row, value) => {
          return value && (value.slice(0,10))
        }
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "clothWeight",
        width: 110,
        align: "right",
        formatter: (row, value) => {
          return value && Number(value).toFixed(2);
        }
      },
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "clothNoteCode",
        width: 150,
        overHidden: true,
      },
      {
        label:  _this.$t("pidCount")  ,//"疋数,
        prop: "pidCount",
        width: 100,
        align: "right",
        formatter: (row, value) => {
          return value || "0"
        }
      },
      {
        label:  _this.$t("qcProBleadyeRunJob.preCalicoWeight")  ,// "备布重量",
        prop: "preCalicoWeight",
        width: 150,
        align: "right",
        formatter: (row, value) => {
          return (+value || 0).toFixed(1)
        }
      },
      
    ]
  };
}
