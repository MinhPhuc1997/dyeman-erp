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
  height: "calc(100vh - 260px)",
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

function fillZero(row, value) {
    return value && value.toFixed(2);
  }
  

// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
  
};

// 批色回修单
export function unCreate2BatColFromOp(_this) {
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
    ]
  };
}


export function unCreate2BatColCurdOp(_this) {
  return {
    ...mainCrudOpCommon,
    menuWidth: 120,
    labelWidth: 100,
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
        label: _this.$t("vatNo"), //"缸号",
        prop: "vatNo",
        placeholder: " ",
        span: 6,
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
        span: 6,
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
        span: 6,
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
        span: 6,
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



export function unCreate2QcFormOp(_this) {
    return {
      ...formOpCommon,
      column: [
        {
          label:  _this.$t("ColorDefine.checkDate"),//"汇总日期",
          prop: "checkDate",
          span: 8,
          type: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
        },
        {
          label: _this.$t("vatNo") ,//"缸号",
          prop: "vatNo",
          span: 5,
        },
        {
          label: _this.$t("ColorDefine.qcChecker"), //"反馈人员",
          prop: "qcChecker",
          span: 5,
        },
      ]
    };
  }
  

export function unCreate2QcCurdOp(_this) {
return {
    ...mainCrudOpCommon,
    labelWidth:120,
    showSummary: true,
    menuWidth: 200,
    sumColumnList: [
    {
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
    column: [
    {
        label: _this.$t("ColorDefine.checkDate"),// "汇总日期",
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
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        width: 140,
        fixed: true,
        overHidden: true,
        formslot: true,
        rules: [
        {
            required: true,
            message: '',
            trigger: "blur"
        }
        ]
    },
    {
        label: _this.$t("custName") ,//"客户,
        prop: "custId",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        disabled: true,
        readonly: true,
        dicData: custList,
        tip: "Khách hàng"
    },

    {
        label:  _this.$t("fabName"), //布类名称,
        tip: "Tên loại vải",
        prop: "fabName",
        readonly: true,
        span: 6,
        width: 200,
        overHidden: true,
        hide: true
    },
    {
        label:  _this.$t("batchNo") ,//批号,
        tip: "Tên loại vải",
        prop: "salPo",
        readonly: true,
        span: 6,
        width: 100,
        overHidden: true,
    },
    {
        label: _this.$t("deliveDate"), //"交货期",
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
        label: _this.$t("colorName"), // "颜色名称",
        prop: "colorName",
        readonly: true,
        width: 150,
        span: 6,
        overHidden: true,
    },
    {
        label:  _this.$t("ColorDefine.chargeDpt"), // "责任部门",
        prop: "chargeDpt",
        width: 150,
        span: 6,
        overHidden: true,
        type: "select",
        multiple: true,
        hide: true,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
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
        label: _this.$t("ColorDefine.qcChecker"), //"反馈人员",
        prop: "qcChecker",
        width: 180,
        readonly: true,
        span: 6,
        overHidden: true,
    },
    {
        label:  _this.$t("ColorDefine.checkPcount"), //检验疋数
        prop: "checkPcount",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        formatter: fillZero,
        rules: [
        {
            required: true,
            message: '',
            trigger: "blur"
        }
        ]
    },
    {
        label:  _this.$t("ColorDefine.chkTrblPcount"), //不OK疋数
        prop: "chkTrblPcount",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        formatter: fillZero,
        rules: [
        {
            required: true,
            message: '',
            trigger: "blur"
        }
        ]
    },
    {
        label:  _this.$t("ColorDefine.chkQty"), //检验数量(kg)
        prop: "chkQty",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        rules: [
        {
            required: true,
            message: '',
            trigger: "blur"
        }
        ]
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
        dicData: [
        {
            label:  _this.$t("false"), 
            value: "0"
        },
        
        {
            label:  _this.$t("true"), 
            value: "1"
        }
        ],
        change: ({value}) => {
        _this.$nextTick(() =>{
            _this.qcCheckPlanFormOp.column[17].display = value ==  "1" ? true : false;
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
        rules: [
        {
            required: true,
            message: '',
            trigger: "blur"
        }
        ]

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

    {
        label:  _this.$t("remark") ,//备注,
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
  