/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-26 08:15:41
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT, getDicNS } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
import i18n from "@/lang/index";

const commonCrudOp = {
  menu: false,
  addBtn: true,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  page: true,
  labelWidth: 120,
  index: true,
  stripe: true
};

let workdayTypeDicData = [
  {
    label: i18n.t("clothFly.d") ,//白班
    value: "D"
  },
  {
    label: i18n.t("clothFly.n") ,//班
    value: "N"
  }
];

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("weaveJobCode") , //"生產單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("mathineCode") ,//"機號
        prop: "mathineCode",
        span: 6,
        placeholder: " "
      }
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
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
        display: false,
        fixed: true
      },

      {
        label: _this.$t("weaveJobCode") , //"生產單號",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
        disabled: true,
        sortable: true,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ],
        fixed: true
      },
      {
        label: _this.$t("isWorkOut") ,//外发厂
        prop: "isWorkOut",
        width: 110,
        span: 6,
        display: false,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: _this.$t("public.true"),
            value: true
          },
          {
            label: _this.$t("public.false"),
            value: false
          }
        ]
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        disabled: true,
        overHidden: true,
        width: 120,
        span: 6,
        placeholder: "请選擇生产单号",
        sortable: true
      },
      {
        label: _this.$t("custCode") ,//客戶編號
        prop: "custCode",
        overHidden: true,
        disabled: true,
        width: 100,
        span: 6,
        placeholder: "请選擇客戶編號",
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("amount") ,//織單數量",
        prop: "amount",
        disabled: true,
        width: 100,
        placeholder: "请输入織單數量",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入織單數量",
            trigger: "blur"
          }
        ],
        align: "right"
      },
      {
        label: _this.$t("startMachineDate") ,//"開機日期
        prop: "startDate",
        disabled: true,
        width: 120,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请選擇開機日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        disabled: true,
        width: 180,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [
          {
            required: true,
            message: "请選擇顏色名稱",
            trigger: "blur"
          }
        ],
        overHidden: true
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabricDesc",
        overHidden: true,
        disabled: true,
        width: 250,
        span: 12,
        placeholder: "请選擇布類描述",
        rules: [
          {
            required: true,
            message: "请選擇布類描述",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "breadth",
        width: 90,
        disabled: true,
        align: "right",
        span: 6,
        hide: true
      },
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        width: 90,
        overHidden: true,
        align: "right",
        disabled: true,
        hide: true,
        span: 6
      },
      {
        label: _this.$t("mathineCode") ,//"機號
        prop: "mathineCode",
        disabled: false,
        span: 6,
        // width: 120,
        placeholder: " ",
        type: "select",
        dicData: [],
        rules: [
          {
            required: true,
            message: "请輸入機號",
            trigger: "blur"
          }
        ],
        overHidden: true,
        change: () => {
          _this.$nextTick(() => {
            // if (Number(data[0].sn) === 1) {
            _this.form.bph = _this.form.mathineCode;
            _this.getBf();
          });
        }
      },
      {
        label: _this.$t("weaveState") ,//织单状态
        tip: "state",
        prop: "weaveState",
        type: "switch",
        dicData: [
          {
            label:  _this.$t("normal") ,//正常,
            value: 0
          },
          {
            label:  _this.$t("draft") ,//草稿,
            value: 1
          },
          {
            label: _this.$t("knitted") ,//已织完
            value: 2
          }
        ],
        display: false,
        width: 100,
        placeholder: " ",
        span: 6,
      },
      {
        label: _this.$t("clothFly.pz") ,//平均匹重
        prop: "pz",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入平均匹重",
            trigger: "blur"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.form.ps = Math.ceil(_this.form.amount / _this.form.pz);
          });
        }
      },

      {
        label: _this.$t("clothFly.qsph") ,//起始疋号
        prop: "qsph",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入起始疋号",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("clothFly.ps") ,//匹数
        prop: "ps",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入匹数",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("workNo"), //值机工号,
        prop: "zjgh",
        width: 90,
        hide: true,
        span: 6
      },
      {
        label: _this.$t("clothFly.clothChecker") ,//验布员
        prop: "clothChecker",
        span: 6,
        hide: true
      }
    ]
  };
}

export function bfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 450px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    column: [
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "eachNumber",
        width: 60,
        align: "right",
        span: 6
      },
      {
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true,
        disabled: true
      },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        width: 180,
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true
      },
      {
        label: _this.$t("custName") ,//客戶編號
        prop: "customerName",
        width: 120,
        disabled: true,
        placeholder: " ",
        type: "select",
        dicData: cust,
        span: 6,
        display: false
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 300,
        overHidden: true
      },
      {
        label:  _this.$t("colorName"), //顏色,
        prop: "proColor",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 150,
        overHidden: true
      },

      {
        label:  _this.$t("yarnBatch"), //纱批,
        prop: "spi",
        width: 90,
        hide: true,
        span: 6
      },

      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "sp",
        width: 90,
        hide: true,
        span: 6
      },
      {
        label:  _this.$t("loomNo"), //机号,
        prop: "loomNo",
        width: 100,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true
      },
      {
        label:  _this.$t("workNo"), //值机工号,
        prop: "workNo",
        width: 120,
        hide: false,
        span: 6,
        cell: true,
        disabled: false,
        rules: [
          {
            required: true,
            message: "请输入值机工号",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("clothFly.clothChecker") ,//验布员
        prop: "clothChecker",
        width: 120,
        hide: false,
        cell: true
      },

      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 80,
        align: "center",
        span: 6,
        cell: true,
        type: "number"
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "breadth",
        width: 80,
        align: "right",
        span: 6,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请输入幅宽",
            trigger: "blur"
          }
        ],
        type: "number"
      },
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        overHidden: true,
        width: 80,
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入克重",
            trigger: "blur"
          }
        ]
      },

      {
        label:  _this.$t("isPrinted"), //已打印,
        prop: "isPrinted",
        type: "select",
        disabled: true,
        dicData: [
          {
            value: true,
            label: _this.$t("public.true")
          },
          {
            value: false,
            label: _this.$t("public.false")
          }
        ],
        span: 6
      },
      {
        label:  _this.$t("printedTime"), //打印时间,
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        width: 180
      }
    ]
  };
}

export function clothflyPrintFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label:  _this.$t("workNo"), //值机工号,
        prop: "proOpFk",
        span: 6,
        type: "select",
        dicData: getDicT(
          "proOperator?enableFlag=1",
          "opName",
          "opId",
          {},
          "opCode"
        ),
        filterable: true
      },
      {
        label: _this.$t("clothFly.mathineCode") ,//织机号
        prop: "mathineCode",
        labelWidth: 80,
        span: 6,
        type: "select",
        dicData: getDicT(
          "baseEquipment/list?areaId=layer5",
          "equipmentCode",
          "equId",
          {},
          "equipmentCode"
        ),
        filterable: true,
        change: async () => {
          await _this.$nextTick();
          _this.handleQuery();
        }
      },
      {
        label: _this.$t("weaveJobCode") , //"织造通知单",
        prop: "weaveJobCode",
        overHidden: true,
        labelWidth: 120,
        width: 160,
        span: 6
      }
    ]
  };
}

export function clothflyPrintCrudOp(_this) {
  return {
    ...commonCrudOp,
    height: "calc(100vh - 276px)",
    stripe: false,
    column: [
      {
        label:  _this.$t("workNo"), //值机工号,
        prop: "proOpFk",
        span: 6,
        type: "select",
        dicData: getDicT(
          "proOperator?enableFlag=1",
          "opName",
          "opId",
          {},
          "opCode"
        ),
        filterable: true,
        width: 250,
      },
      {
        label: _this.$t("clothFly.mathineCode") , //"织机",
        prop: "baseEquipmentFk",
        overHidden: true,
        width: 120,
        span: 6,
        sortable: true,
        type: "select",
        dicData: getDicT(
          "baseEquipment/list?areaId=layer5",
          "equipmentCode",
          "equId",
          {},
          "equipmentCode"
        ),
        filterable: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("weaveJobCode") , //"织造通知单",
        prop: "weaveJobCode",
        overHidden: true,
        width: 150,
        span: 6
      },
      {
        label: _this.$t("clothFly.workdayType") ,//班次
        prop: "workdayType",
        overHidden: true,
        width: 100,
        span: 6,
        sortable: true,
        type: "select",
        dicData: workdayTypeDicData,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("clothFly.workDate") ,//工作日期
        prop: "workDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        sortable: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      }
    ]
  };
}

export function clothflyPrintHistroyCrudOp(_this) {
  return {
    ...commonCrudOp,
    height: "calc(100vh - 240px)",
    stripe: false,
    page: false,
    index: false,
    addBtn: false,
    delBtn: false,
    editBtn: false,
    menu: true,
    menuWidth: 70,
    column: [
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "noteCode",
        overHidden: true,
        width: 160,
        span: 6
      },
      {
        label: _this.$t('weaveJobCode'), // "织造通知单",
        prop: "proName",
        overHidden: true,
        width: 140,
        span: 6
      },
      {
        label: _this.$t("clothFly.mathineCode") ,//织机
        prop: "machineCode",
        overHidden: true,
        width: 100,
        span: 6
      }
    ]
  };
}
