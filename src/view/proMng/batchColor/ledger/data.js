/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-22 09:07:55
 * @FilePath: \iot.vue\src\view\proMng\batchColor\ledger\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

let custList = getDicT("basCustomer", "custName", "custCode");


// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
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
  stripe: true
};

// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,

};

export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: _this.$t("ledger.appTime"), //"批色时间",
        prop: "appTime",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        span: 6,
        overHidden: true,
      },
      {
        label: _this.$t("ledger.appMileage"), // "批色工序",
        prop: "appMileage",
        span: 6,
        type: "select",
        dicData: [
          {
            label: _this.$t("ledger.appMileageDic1"), // "出缸批色",
            value: "BF"
          },
          {
            label: _this.$t("ledger.appMileageDic2"), //"定后批色",
            value: "AF"
          },
        ]
      },
      {
        label: _this.$t("ledger.appState"), //"批色结论",
        prop: "appState",
        span: 6,
        type: "select",
        dicData: [
          {
            label: _this.$t("ledger.appStateDic1"), //"通过",
            value: 1
          },
          {
            label: _this.$t("ledger.appStateDic2"), //"染缸返工",
            value: 2
          },
          {
            label:  _this.$t("ledger.appStateDic3"), //"定型加色",
            value: 3
          }
        ],
      },
    ]
  };
}


export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    menuWidth: 120,
    labelWidth: 100,
    height: "calc(100vh - 240px)",
    page: true,
    column: [
      {
        label:  _this.$t("ledger.appTime"), //"批色时间",
        prop: "appTime",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        fixed: true,
        display: false
      },
      {
        label: "编号", //"批色时间",
        prop: "appColorCode",
        width: 120,
        span: 4,
        placeholder: " ",
        overHidden: true,
        align: "center",
        disabled: true
      },
      {
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        placeholder: "  ",
        span: 5,
        width: 150,
        display: false,
        overHidden: true,
        fixed: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label:  _this.$t("vatNo"), //"缸号",
        prop: "runJobFk",
        placeholder: " ",
        span: 5,
        width: 130,
        hide: true,
        overHidden: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label:  _this.$t("custName"), //"客户",
        prop: "custCode",
        overHidden: true,
        disabled: true,
        width: 120,
        span: 5,
        placeholder: " ",
        type: "select",
        dicData: custList,
        tip: "Khách hàng"
      },
      {
        label:  _this.$t("poNo"), //"订单号",
        prop: "salPoNo",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: false
      },
      {
        label:  _this.$t("firstOrOther"), //"头缸/缸差",
        disabled: true,
        prop: "firstOrOther",
        span: 3,
        width: 100,
        type: "switch",
        dicData: [
          {
            label:  _this.$t("firstVat"), //"头缸",
            value: "1"
          },
          {
            label:  _this.$t("otherVat"), //"缸差",
            value: "2"
          }
        ],
        hide: true,
        placeholder: " "
      },

      {
        label: _this.$t("colorCode"), //"色号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("colorName"), //"颜色名称",
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        hide: true,
        overHidden: true,
      },
      {
        label: _this.$t("fabName"), // "布类名称",
        prop: "fabName",
        placeholder: " ",
        width: 200,
        overHidden: true,
        disabled: true,
        span: 12,
        hide: true
      },
      {
        label: _this.$t("pidCount"), // "疋数",
        prop: "pidCount",
        placeholder: " ",
        span: 6,
        disabled: true,
        align: "right",
        width: 60,
      },
      {
        label: _this.$t("poAmountKg"), //"订单数",
        prop: "poAmountKg",
        placeholder: " ",
        span: 6,
        disabled: true,
        width: 120,
        overHidden: true,
        align: "right",
        hide: true
      },
      {
        label: _this.$t("ledger.appMileage"), //"批色工序",
        prop: "appMileage",
        width: 100,
        placeholder: " ",
        span: 6,
        clearable: false,
        overHidden: true,
        type: "select",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        dicData: [
          {
            label: _this.$t("ledger.appMileageDic1"), // "出缸批色",
            value: "BF"
          },
          {
            label: _this.$t("ledger.appMileageDic2"), //"定后批色",
            value: "AF"
          },
        ]
      },
      {
        label: _this.$t("ledger.appState"), //"批色结论",
        prop: "appState",
        clearable: false,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: _this.$t("ledger.appStateDic1"), //"通过",
            value: 1
          },
          {
            label: _this.$t("ledger.appStateDic2"), //"染缸返工",
            value: 2
          },
          {
            label:  _this.$t("ledger.appStateDic3"), //"定型加色",
            value: 3
          }
        ],
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label:  _this.$t("ledger.vatOutTime"), // "出缸时间",
        prop: "vatOutTime",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: _this.$t("ledger.receiveTime"), // "收单时间",
        prop: "receiveTime",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: _this.$t("ledger.finishTime"), // "完成时间",
        prop: "finishTime",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },

      {
        label:  _this.$t("ledger.appStaff"), // "批色人",
        prop: "appStaff",
        width: 100,
        placeholder: " ",
        span: 6,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label:  _this.$t("remark"), //"备注",
        prop: "remark",
        width: 180,
        placeholder: " ",
        span: 24,
        overHidden: true,
      },
    ]
  };
}

export function pfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(60vh - 10px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("finalizeDesign.bleadyeType") ,//工艺类型
        prop: "bleadyeType",
        // overHidden: true,
        width: 120,
        span: 6,
        cell: true,
        type: "select",
        clearable: false,
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
        ],
        change: (val) => {
          if (val == 'run') {
            return
          }
          _this.$nextTick(() => {
            _this.remoteMethod1(_this.chooseData.materialCode)
          })
        }
      },
      {
        label: _this.$t("finalizeDesign.materialCode") ,//物料编码
        prop: "materialCode",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " ",
        // cell: true
      },
      {
        label: _this.$t("finalizeDesign.materialName") ,//物料名称
        prop: "materialName",
        width: 300,
        // overHidden: true,
        placeholder: " ",
        span: 6,
        overHidden: true,
        cell: true,
        slot: true,
      },
      {
        label: _this.$t("finalizeDesign.formulaFactor") ,//"配方(g/L)",
        prop: "formulaFactor",
        width: 120,
        placeholder: " ",
        type: "number",
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            if (_this.chooseData.formulaFactor === 0) {
              _this.chooseData.waterAmount = 0;
            } else {
              if(_this.chooseData.waterAmount!==0){
                _this.chooseData.useAmount = Number(
                  ((_this.chooseData.formulaFactor * _this.chooseData.waterAmount) /1000).toFixed(1)
                );
              }else if(_this.chooseData.useAmount!==0){
                _this.chooseData.waterAmount = Number(
                  (
                    (_this.chooseData.useAmount * 1000) /
                    _this.chooseData.formulaFactor
                  ).toFixed(1)
                );
              }
            }
          });
        }
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "useAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            if (_this.chooseData.formulaFactor === 0) {
              _this.chooseData.waterAmount = 0;
            } else {
              _this.chooseData.waterAmount = Number(
                (
                  (_this.chooseData.useAmount * 1000) /
                  _this.chooseData.formulaFactor
                ).toFixed(1)
              );
            }
          });
          //   _this.chooseData.waterAmount = Number(
          //     (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
          //   );
        }
      },
      {
        label: _this.$t("finalizeDesign.waterRatio") ,//浴比
        prop: "waterRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          // _this.$nextTick(() => {
          //   _this.chooseData.waterAmount = Number(
          //     (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
          //   );
          // });
        }
      },

      {
        label: _this.$t("finalizeDesign.waterAmount") ,//水量
        prop: "waterAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            if (_this.chooseData.formulaFactor != 0 || _this.chooseData.waterAmount!=0) {
              _this.chooseData.useAmount = Number(
                ((_this.chooseData.formulaFactor * _this.chooseData.waterAmount) /1000).toFixed(1)
              );
            }
          });
          //   _this.chooseData.waterAmount = Number(
          //     (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
          //   );
        }
      },
      {
        label: _this.$t("finalizeDesign.diluteRatio") ,//开稀比例
        prop: "diluteRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("finalizeDesign.deliveryQuantity") ,//输送数量
        prop: "deliveryQuantity",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      }
    ]
  };
}

