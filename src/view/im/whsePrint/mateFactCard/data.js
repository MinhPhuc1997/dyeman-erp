/*
 * @Author: Lyl
 * @Date: 2022-09-24 14:12:01
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-26 16:08:10
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\data.js
 * @Description:
 */

import {
  getDIC
} from "@/config";

const commonFormConfig = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 150
};
const commonCrudConfig = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  page: true,
  labelWidth: 120,
  selection: false,
  columnBtn: true
};


export const materialTypeDic = {
  "1": "wj_in_whse",
  "2": "xz_in_whse",
  "3": "scfl_in_whse",
  "4": "sx_in_whse",
  "5": "hgyl_in_whse",
  "6": "pb_in_whse",
  "7": "cpb_in_whse",
  "8": "yl_in_whse",
  "9": "rl_in_whse",
  "10": "equ_in_whse",
}
export function formGroupOp(_this, sn) {
  return {
    prop: "group" + sn,
    label: "包装信息",
    icon: "el-icon-truck",
    column: [{
        label: _this.$t("dye.mateName"), //物料编号
        prop: "mateCnName",
        span: 6,
        width: 160,
        overHidden: true,
      },
      {
        label: _this.$t('factoryBatch'), //本厂批号,
        prop: "factBatchNo",
        span: 6,
        width: 140,
        placeholder: " ",
        // disabled: true,
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }]
      },
      {
        label: "生产批号",
        prop: "supplyBatchNo",
        span: 6,
        width: 140,
      },
      {
        label: _this.$t("proWeaveOutworkShip.proDate"), // 生产日期
        prop: "prodDate",
        span: 6,
        width: 160,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      }, {
        label: _this.$t("netWeight"), //净重,
        prop: "nw",
        width: 60,
        span: 6,
        type: "number",
        change: ({value}) => {
          console.log(value);
          _this.printForm.gw = value;
        }

      },
      {
        label: _this.$t("grossWeight"), //毛重,
        prop: "gw",
        width: 60,
        type: "number",
        span: 6,
      },
      {
        label: _this.$t("unit"), //单位,
        prop: "unit",
        clearable: false,
        span: 6,
        type: "select",
        width: 100,
        placeholder: " ",
        hide: true,
        dicData: getDIC("bas_matUnit")
      },
      {
        label: "有效日期",
        prop: "expireDate",
        span: 6,
        width: 160,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "包装编号",
        prop: "pakeageNo",
        span: 6,
        width: 140,
      },
      {
        label: _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        prop: "pakageSize",
        span: 6,
        width: 140,
        type: "number"
      },

    ]
  }
}


// 物料出货码卡
export function mateFactCardPrintFormOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 250px)",
    labelWidth: 120,
    index: true,
    // column: [{
    //   label: "物料类型",
    //   prop: "type",
    //   type: "switch",
    //   span: 7,
    //   width: 140,
    //   dicData: [{
    //       label: "化工原料",
    //       value: 1
    //     },
    //     {
    //       label: "染料",
    //       value: 2
    //     }
    //   ]
    // }, ],
    group: [{
        prop: "group1",
        label: "物料信息",
        icon: "el-icon-set-up",
        column: [{
            label: "采购单号",
            prop: "poNo",
            width: 140,
            formslot: true,
            span: 8
          },
          {
            label: "品牌",
            prop: "brand",
            placeholder: " ",
            disabled: true,
            span: 8,
            width: 140,
            labelWidth: 70,
            overHidden: true,
          },
          {
            label: "供应商名称",
            placeholder: " ",
            prop: "suplyName",
            disabled: true,
            span: 8,
            width: 140,
          },
          {
            label: "备注",
            placeholder: " ",
            prop: "deliRemark",
            disabled: false,
            span: 24,
            width: 140,
          },
          // {
          //   label: "中文名称",
          //   prop: "mateCnName",
          //   span: 8,
          //   width: 140,
          //   fixed: true,
          //   overHidden: true,
          // },
          // {
          //   label: "英文名称",
          //   prop: "mateEnName",
          //   span: 8,
          //   width: 140,
          //   overHidden: true,
          // },
          // {
          //   label: "越文名称",
          //   prop: "mateVtName",
          //   span: 8,
          //   width: 140,
          //   overHidden: true,
          // },


        ]
      },

      // {
      //   prop: "group3",
      //   label: "打印信息",
      //   icon: "el-icon-printer",
      //   column: [


      //     {
      //       label: "打印次数",
      //       prop: "printCount",
      //       span: 8,
      //       width: 120,
      //       type: "number"
      //     },
      //     {
      //       label:  _this.$t("printedTime"), //打印时间,
      //       prop: "printTime",
      //       span: 8,
      //       width: 160,
      //       type: "datetime",
      //       format: "yyyy-MM-dd HH:mm:ss",
      //       valueFormat: "yyyy-MM-dd HH:mm:ss",
      //     },
      //     {
      //       label: _this.$t("createTime") ,//创建时间
      //       prop: "createTime",
      //       span: 8,
      //       width: 160,
      //       display: false,
      //       type: "datetime",
      //       format: "yyyy-MM-dd HH:mm:ss",
      //       valueFormat: "yyyy-MM-dd HH:mm:ss",
      //     },
      //     {
      //       label:  _this.$t("creator"), //创建人"
      //       prop: "creator",
      //       span: 8,
      //       width: 100
      //     },
      //     {
      //       label:  _this.$t("updateTime"), //更新时间
      //       prop: "updateTime",
      //       format: "yyyy-MM-dd HH:mm:ss",
      //       valueFormat: "yyyy-MM-dd HH:mm:ss",
      //       span: 8,
      //       width: 160,
      //       display: false,
      //       type: "datetime"
      //     },
      //     {
      //       label:  _this.$t("creator"), //创建人"
      //       prop: "updator",
      //       span: 8,
      //       width: 100
      //     }
      //   ]
      // }
    ]
  };
}

// 物料出货码卡
export function mateFactCardCrudOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 330px)",
    labelWidth: 120,
    index: true,
    selection: true,
    column: [{
        label: "包装编号",
        prop: "pakeageNo",
        span: 8,
        width: 140,
        overHidden: true
      },{
        label: _this.$t("dye.mateCode"), //物料编号
        prop: "mateCode",
        span: 24,
        width: 100,
        formslot: true,
        fixed: true,
        overHidden: true,
      },
      {
        label: "中文名称",
        prop: "mateCnName",
        span: 8,
        width: 160,
        fixed: true,
        overHidden: true,
      },
      {
        label: "英文名称",
        prop: "mateEnName",
        span: 8,
        width: 160,
        overHidden: true,
      },
      {
        label: "越文名称",
        prop: "mateVtName",
        span: 8,
        width: 160,
        overHidden: true,
      },


      {
        label: "品牌",
        prop: "brand",
        span: 8,
        width: 120,
        overHidden: true,
      },
      {
        label: "供应商名称",
        prop: "suplyName",
        span: 8,
        width: 160,
        overHidden: true,

      },
      {
        label: _this.$t('factoryBatch'), //本厂批号,
        prop: "factBatchNo",
        span: 8,
        width: 120,
        overHidden: true,
      },
      {
        label: "生产批号",
        prop: "supplyBatchNo",
        span: 8,
        overHidden: true,
        width: 120,
      },
      {
        label: _this.$t("proWeaveOutworkShip.proDate"), // 生产日期
        prop: "prodDate",
        span: 8,
        width: 160,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: _this.$t("netWeight"), //净重,
        prop: "nw",
        width: 80,
        span: 8,
        align: "right",

      },
      {
        label: _this.$t("grossWeight"), //毛重,
        prop: "gw",
        width: 80,
        span: 8,
        align: "right"
      },
      {
        label: _this.$t("unit"), //单位,
        prop: "unit",
        clearable: false,
        span: 8,
        type: "select",
        width: 80,
        placeholder: " ",
        dicData: getDIC("bas_matUnit")
      },

      {
        label: _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        prop: "pakageSize",
        span: 8,
        width: 140,
        overHidden: true
      },
      {
        label: "有效日期",
        prop: "expireDate",
        span: 8,
        width: 160,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "打印次数",
        prop: "printCount",
        span: 8,
        width: 120,
        type: "number"
      },
      {
        label: _this.$t("printedTime"), //打印时间,
        prop: "printTime",
        span: 8,
        width: 160,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: _this.$t("createTime"), //创建时间
        prop: "createTime",
        span: 8,
        width: 160,
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label:  _this.$t("creator"), //创建人"
        prop: "creator",
        span: 8,
        width: 100
      },
      {
        label:  _this.$t("updateTime"), //更新时间
        prop: "updateTime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 8,
        width: 160,
        display: false,
        type: "datetime"
      },
      {
        label:  _this.$t("updator"), //更新人
        prop: "updator",
        span: 8,
        width: 100
      }
    ]
  };
}

export function queryFormOp(_this) {
  return {
    ...commonFormConfig,
    labelWidth: 100,
    column: [{
        label: _this.$t("dye.mateCode"), //物料编号
        prop: "mateCode",
        span: 6
      },
      {
        label: "中文名称",
        prop: "mateCnName",
        span: 6,
      },
      {
        label: "包装编号",
        prop: "pakeageNo",
        span: 6,
        width: 140,
        overHidden: true
      },
      {
        label: "品牌",
        prop: "brand",
        labelWidth: 60,
        span: 6,
      },
      {
        label: _this.$t('factoryBatch'), //本厂批号,
        prop: "factBatchNo",
        span: 6
      },
      {
        label: "生产批号",
        prop: "supplyBatchNo",
        span: 6,
        width: 120,
      },
      {
        label: _this.$t("proWeaveOutworkShip.proDate"), // 生产日期
        prop: "prodDate",
        span: 6,
        width: 160,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
    ]
  };
}
