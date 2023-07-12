/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-02 10:37:44
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

const unit = getDIC("sal_breadthUnit");
let matUnit = getDIC("bas_matUnit");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 110,
    column: [
      {
        label: _this.$t("techCode.bleadyeCode") , // 工艺编号
        prop: "bleadyeCode",
        span: 6,
      },
      {
        label: _this.$t("techCode.bleadyeName") , //工艺名称
        prop: "bleadyeName",
        span: 6,
      },
      {
        label: _this.$t("techCode.techPart") , //工艺分类
        prop: "techPart",
        overHidden: true,
        width: 120,
        span: 6,
        type: "select",
        dicData: getDIC("pro_techCode"),
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      }
    ]
  };
}

export function dlgForm(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        overHidden: true,
        width: 120,
        span: 6,
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
        label: _this.$t("techCode.basMateId") , //物料代碼
        prop: "basMateId",
        overHidden: true,
        width: 120,
        span: 6
      },
      {
        label: _this.$t("finalizeDesign.materialName") ,//物料名称
        prop: "mateName",
        width: 300,
        span: 6,
        overHidden: true
      },
      {
        label: _this.$t("techCode.useAmount") , //用量
        prop: "useAmount",
        width: 140,
        span: 6
      },
      {
        label: _this.$t("techCode.measureType") , //度量單位
        prop: "measureType",
        width: 120,
        span: 6
      },
      {
        label: _this.$t("techCode.runTemp") , //行温度
        prop: "runTemp",
        span: 6,
        width: 120
      },
      {
        label: _this.$t("techCode.runTime") , //运行时间(分钟)
        prop: "runTime",
        span: 6,
        width: 140
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 236px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label: _this.$t("techCode.bleadyeCode") , // 工艺编号
        prop: "bleadyeCode",
        overHidden: true,
        width: 130,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入工艺编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("techCode.bleadyeName") , //工艺名称
        prop: "bleadyeName",
        overHidden: true,
        width: 350,
        span: 12,
        disabled: false,
        rules: [
          {
            required: true,
            message: "請輸入工艺名称",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("techCode.liquorRatio") , //建议水比
        prop: "liquorRatio",
        overHidden: true,
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("techCode.techPart") , //工艺分类
        prop: "techPart",
        overHidden: true,
        width: 120,
        span: 6,
        type: "select",
        dicData: getDIC("pro_techCode")
      },
      {
        label: _this.$t("techCode.bleadyeImageId") , //工艺图片
        prop: "bleadyeImageId",
        width: 100,
        span: 6,
        placeholder: " ",
        hide: false,
        display: false,
        align: "center",
        // slot: true,
        overHidden: true
      },
      {
        label: _this.$t("techCode.remark") , //工艺备注
        prop: "remark",
        overHidden: true,
        // width: 250,
        span: 12
      },

      {
        label: _this.$t("techCode.btn") , //选择工艺图片
        prop: "btn",
        width: 180,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: true,
        click: () => {
          _this.$refs.input.click();
        }
      }
    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 455px)",
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
        change:(val)=>{
          if (val == 'run') {
            return
          }
          _this.$nextTick(() =>{
            _this.remoteMethod(_this.chooseData.basMateId)
          })
        }
      },
      {
        label: _this.$t("techCode.basMateId") , //材料代碼
        prop: "basMateId",
        width: 120,
        span: 6,
        // formslot: true,
        cell: false
      },
      {
        label: _this.$t("techCode.mateName") , //材料名称
        prop: "mateName",
        width: 350,
        span: 6,
        slot: true,
        // overHidden: true,
        cell: true
      },
      {
        label:  _this.$t("dye.formulaAmount"), //配方用量
        prop: "formulaAmount",
        width: 120,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        align: "right"
      },

      {
        label:  _this.$t("dye.measureType"), //材料度量
        prop: "measureType",
        width: 120,
        span: 6,
        // overHidden: true,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "%",
            value: "%"
          },
          {
            label: "X%",
            value: "X%"
          },
          {
            label: "g/L",
            value: "g/L"
          }
        ]
      },
      {
        label:  _this.$t("unit"), //單位
        prop: "formulaUnit",
        width: 100,
        span: 6,
        cell: true,
        type: "select",
        dicData: [
          {
            value: "KG",
            label: "KG"
          },
          {
            value: "g",
            label: "g"
          },
          {
            value: "L",
            label: "L"
          }
        ],
        placeholder: " "
      },
      {
        label: _this.$t("techCode.runTemp") , //运行温度(℃)
        prop: "runTemp",
        span: 6,
        width: 120,
        cell: true,
        placeholder: " ",
        type: "number"
      },

      {
        label: _this.$t("techCode.runTime") , //运行时间(分钟)
        prop: "runTime",
        span: 6,
        width: 140,
        cell: true,
        placeholder: " ",
        type: "number"
      }
    ]
  };
}
