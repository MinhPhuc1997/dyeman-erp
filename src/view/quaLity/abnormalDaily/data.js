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
  labelWidth: 100,
};

export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [{
        label:  _this.$t("abnormalDaily.checkDate")  , // 汇总日期
        prop: "checkDate",
        span: 8,
        type: "datetimerange",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        span: 5,
        labelWidth: 70
      },
      {
        label: _this.$t("abnormalDaily.qcChecker")  , // 反馈人员
        prop: "qcChecker",
        span: 5,
      },
      {
        label:  _this.$t("ColorDefine.chargeDpt"), //责任部门
        prop: "chargeDpt",
        width: 150,
        span: 5,
        overHidden: true,
        type: "select",
        multiple: false,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
    ]
  };
}

export function qcAbnormalRemarkFormOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 310px)",
    index: true,
    labelWidth: 120,
    column: [{
        label:  _this.$t("problemDesc"), //问题表述
        prop: "problemDesc",
        width: 180,
        span: 24,
        maxRows: 4,
        minRows: 2,
        overHidden: true,
        type: "textarea",
        rules: []
      },
      {
        label:  _this.$t("problemContent"), //详细情况
        prop: "problemContent",
        width: 180,
        span: 24,
        overHidden: true,
        maxRows: 4,
        minRows: 2,
        type: "textarea",
      },
      {
        label:  _this.$t("solution"), //处理方案
        prop: "solution",
        width: 180,
        span: 24,
        overHidden: true,
        type: "textarea",
        maxRows: 4,
        minRows: 2,
      },
      {
        label:  _this.$t("chargeSuggest"), //分析/措施
        prop: "chargeSuggest",
        width: 200,
        span: 24,
        maxRows: 4,
        minRows: 2,
        overHidden: true,
        type: "textarea",
      },
      {
        label: _this.$t("remark"), //备注,
        prop: "remark",
        width: 200,
        span: 24,
        maxRows: 4,
        minRows: 2,
        overHidden: true,
        type: "textarea",
      },
    ]
  }
}

export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth: 120,
    showSummary: true,
    menu: true,
    menuWidth: 200,
    sumColumnList: [{
        label: " ",
        name: "checkPcount",
        type: "sum"
      },
      {
        label: " ",
        name: "chkQty",
        type: "sum"
      },
      {
        label: " ",
        name: "chkTrblPcount",
        type: "sum"
      },
      {
        label: " ",
        name: "sumTrblQty",
        type: "sum"
      }
    ],
    height: "calc(100vh - 240px)",
    column: [{
        label: _this.$t("abnormalDaily.checkDate")  , // 汇总日期
        prop: "checkDate",
        width: 160,
        span: 6,
        overHidden: true,
        sortable: true,
        align: "center",
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        fixed: true
      },
      {
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        span: 6,
        width: 140,
        fixed: true,
        overHidden: true,
        formslot: true,
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }]
      },
      {
        label: _this.$t("custName"), //"客户,
        prop: "custId",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        disabled: true,
        readonly: true,
        dicData: cust,
        tip: "Khách hàng"
      },

      {
        label: _this.$t("fabName"), //布类名称,
        tip: "Tên loại vải",
        prop: "fabName",
        readonly: true,
        span: 12,
        width: 200,
        overHidden: true,
        hide: true
      },
      {
        label: _this.$t("abnormalDaily.deliveryDate")  , // 交货期
        prop: "deliveryDate",
        width: 160,
        span: 6,
        overHidden: true,
        readonly: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: _this.$t("batchNo"), //批号,
        tip: "Tên loại vải",
        prop: "salPo",
        readonly: true,
        span: 6,
        width: 100,
        overHidden: true,
      },
      
      {
        label: _this.$t("colorName") ,//"颜色名称
        prop: "colorName",
        readonly: true,
        width: 150,
        span: 6,
        overHidden: true,
      },
      {
        label: _this.$t("abnormalDaily.qcChecker")  , // 反馈人员
        prop: "qcChecker",
        width: 180,
        // readonly: true,
        span: 6,
        overHidden: true,
      },
     
      {
        label:  _this.$t("ColorDefine.checkPcount"), //checkPcount
        prop: "checkPcount",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        formatter: fillZero,
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }]
      },
      {
        label:  _this.$t("ColorDefine.chkTrblPcount"), //不OK疋数
        prop: "chkTrblPcount",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        formatter: fillZero,
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }]
      },
      {
        label:  _this.$t("ColorDefine.chkQty"), //检验数量(kg)
        prop: "chkQty",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }]
      },
      {
        label:  _this.$t("ColorDefine.sumTrblQty"), //不Ok数量(kg)
        prop: "sumTrblQty",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
      },
      {
        label:  _this.$t("ColorDefine.chargeDpt"), //责任部门
        prop: "chargeDpt",
        width: 150,
        span: 6,
        overHidden: true,
        type: "select",
        multiple: true,
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }],
        hide: true,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        change: ({value}) => {
          _this.$nextTick(() => {
            if(value && value.length && !_this.qcCheckPlanFormData.followDpt) {
              _this.qcCheckPlanFormData.followDpt = Array.isArray(value) ? value[0] :  value.split(",")[0]
            }
          })
        }
      },
     
      {
        label:  _this.$t("ColorDefine.chargeDpt"), //责任部门
        prop: "chargeDptName",
        display: false,
        width: 150,
        span: 6,
        overHidden: true,
        
      },
      {
        label: _this.$t("abnormalDaily.followDpt")  , // 跟进部门
        prop: "followDpt",
        width: 150,
        span: 6,
        overHidden: true,
        type: "select",
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }],
        hide: false,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      {
        label:  _this.$t("ColorDefine.storeSeat"), //存放位置
        prop: "storeSeat",
        width: 100,
        overHidden: true,
        span: 6,
      },
      {
        label:  _this.$t("driving.carriageStorageCode"), //布笼号
        prop: "storageCode",
        width: 100,
        overHidden: true,
        span: 6,
      },
      {
        label:  _this.$t("divdVatFlag"), //是否拆缸
        prop: "divdVatFlag",
        width: 100,
        overHidden: true,
        span: 6,
        type: "switch",
        dicData: [{
            label:  _this.$t("false"), 
            value: "0"
          },

          {
            label:  _this.$t("true"), 
            value: "1"
          }
        ],
        change: ({
          value
        }) => {
          _this.$nextTick(() => {
            value == "0" && (_this.$set(_this.qcCheckPlanFormData, "divdVatType", "")); 
            _this.qcCheckPlanFormOp.column[18].display = value == "1" ? true : false;
            _this.qcAbnormalForm.column[0].rules = value == "1" ? [{
              required: true,
              message: '',
              trigger: "blur"
            }] : []
            _this.qcAbnormalForm.column[2].rules = value == "1" ? [{
              required: true,
              message: '',
              trigger: "blur"
            }] : []
          })
        }
      },
      {
        label:  _this.$t("divdVatType"), //拆缸类型
        prop: "divdVatType",
        width: 100,
        overHidden: true,
        display: false,
        span: 6,
        type: "select",
        dicData: getDIC("QC_DIVFVAT_TYPE"),
        rules: [{
          required: true,
          message: '',
          trigger: "blur"
        }]

      },
      {
        label:  _this.$t("problemDesc"), //问题表述
        prop: "problemDesc",
        width: 180,
        span: 24,
        maxRows: 4,
        minRows: 2,
        overHidden: true,
        type: "textarea",
        display: false
      },
      {
        label:  _this.$t("problemContent"), //详细情况
        prop: "problemContent",
        width: 180,
        span: 24,
        overHidden: true,
        maxRows: 4,
        minRows: 2,
        type: "textarea",
        display: false
      },
      {
        label:  _this.$t("solution"), //处理方案
        prop: "solution",
        width: 180,
        span: 24,
        overHidden: true,
        type: "textarea",
        maxRows: 4,
        minRows: 2,
        display: false
      },

      // {
      //   label: "qc负责人",
      //   prop: "qcMan",
      //   width: 180,
      //   placeholder: " ",
      //   span: 6,
      //   overHidden: true,
      // },
      // {
      //   label: _this.$t("public.date") , //日期
      //   prop: "qcConfirDate",
      //   width: 160,
      //   span: 6,
      //   placeholder: " ",
      //   overHidden: true,
      //   align: "center",
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      // },
      {
        label:  _this.$t("chargeSuggest"), //分析/措施
        prop: "chargeSuggest",
        width: 200,
        span: 24,
        maxRows: 4,
        minRows: 2,
        overHidden: true,
        type: "textarea",
        display: false
      },
      // {
      //   label: "部门负责人",
      //   prop: "chargeMan",
      //   width: 180,
      //   placeholder: " ",
      //   span: 6,
      //   overHidden: true,
      // },


      {
        label: _this.$t("remark"), //备注,
        prop: "remark",
        width: 200,
        span: 24,
        maxRows: 4,
        minRows: 2,
        overHidden: true,
        type: "textarea",
        display: false
      },
    ]
  };
}

export function qcAbnormalCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 390px)",
    index: false,
    menu: false,
    page: false,
    sumColumnList: [{
        label: _this.$t("quality.sumWeight")  + ":",
        name: "netWeight",
        type: "sum"
      },
      {
        label: _this.$t("quality.sumPidNo")  + ":",
        name: "pidNo",
        type: "count"
      },
    ],
    showSummary: true,
    index: true,
    column: [{
        label: _this.$t("quality.pidNo")  , // 匹号
        prop: "pidNo",
        span: 6,
        width: 120,
        align: "right",
        overHidden: true
      },
      {
        label: _this.$t("netWeight")  , //  "净重",
        prop: "netWeight",
        align: "right",
        span: 6,
        width: 180,
        type: "number",
        overHidden: true,
        formatter(r, v) {
          return (+v || 0).toFixed(1)
        }
      },
    ]
  };
}
