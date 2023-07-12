import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let unit = getDIC("bas_matUnit"); // 單位
let basChemicalmat = getXDicT("BasChemicalmatNew"); // 化工原料
let basPigment = getXDicT("basPigment"); // 颜料

// console.log(basChemicalmat);
export function rhl1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },

      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },

      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus")
      }
    ]
  };
}
export function rhl2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        disabled: false,
        display: true,
        dicData: getDIC("whse_yinstatus")
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("whseField.czy"), // "操作员",
        prop: "sysCreatedby",
        display: true,
        disabled: true,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === "6" ? false : true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      }
    ]
  };
}
export function rhl1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "化工原料入仓OID",
        prop: "whseChemicalinoid",
        hide: true
      },
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("createTime") ,//"创建日期",
        prop: "sysCreated",
        hide: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      },
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        width: 100,
        type: "select",
        dicData:
          _this.data === _this.$t("iaoMng.hgyl") ||
          _this.data === _this.$t("iaoMng.yl")
            ? getDIC("Whse_CalicoType")
            : getDIC("Whse_AccessoriesType")
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        cell: false,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 120,
        align: "center"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        cell: false,
        width: 160
      },
      {
        label: _this.$t("whseField.gysbh"), // "供應商编号",
        prop: "suppId",
        cell: false,
        width: 110,
        type: "select",
        dicData:
          _this.data === _this.$t("iaoMng.sx")
            ? getDicT("purYarnspo", "suppId", "poNo")
            : _this.data === _this.$t("iaoMng.pb")
            ? getDicT("purCalicopo", "suppId", "poNo")
            : _this.data === _this.$t("iaoMng.yl")
            ? getDicT("purDelivery", "suppId", "deliNo", { deliType: "dyes" })
            : getDicT("purChemicalpo", "suppId", "poNo")
      },
      {
        label: _this.$t("whseField.gysmc"), //"供應商名稱",
        prop: "$suppId",
        cell: false,
        width: 280,
        type: "select",
        dicData: getDicT("basSupplier", "suppName", "suppId")
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        cell: false,
        width: 160
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        cell: false,
        width: 135,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("whseField.czy"), //"操作员",
        prop: "sysCreatedby",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        width: 110
      },
      {
        label: "授权用户",
        prop: "sysReplacement",
        hide: true
      },
      {
        label: "所属岗位",
        prop: "sysPostn",
        hide: true
      },
      {
        label: "所属部门",
        prop: "sysDivision",
        hide: true
      },
      {
        label: "所属组织",
        prop: "sysOrg",
        hide: true
      },
      {
        label: "最后修改用户",
        prop: "sysLastUpdBy",
        hide: true,
        width: 150
      },
      {
        label: "最后修改日期",
        prop: "sysLastUpd",
        hide: true,
        type: "date",
        width: 180,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      }
    ]
  };
}
// let Chemicalmat = getXDicT("basChemicalmat/v1.0/list");
export function rhl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 314px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      },
      {
        label: " ",
        name: "poQty",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label:
          _this.datas === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylbh")
            : _this.$t("whseField.ylbh1"),
        prop: "chemicalId",
        cell: false,
        width: 180,
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label:
          _this.datas === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylmc")
            : _this.$t("whseField.ylmc1"),
        prop: "chemicalName",
        cell: false,
        width: 180,
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        cell: false,
        width: 180,
        hide: _this.datas === _this.$t("iaoMng.scfl") ? false : true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chinName",
        cell: false,
        width: 180,
        hide: _this.datas === _this.$t("iaoMng.scfl") ? false : true,
        type: "select",
        props: {
          label: "chinName",
          value: "hardwareId"
        }
        // dicData: getDicT("basHardwarearticles", "chinName", "hardwareId")
      },
      {
        label: _this.$t("whseField.clzl"),
        prop: "materialType",
        cell: false,
        width: 180,
        hide: true
      },
      // {
      //   label: "化工原料英文名稱 ",
      //   prop: "bcMatengname",
      //   cell: false,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      //   props: {
      //     label: "bcMatengname",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: Chemicalmat
      // },
      // {
      //   label: "色光",
      //   prop: "bcColor",
      //   cell: false,
      //   width: 100,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      //   props: {
      //     label: "bcColor",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: Chemicalmat
      // },
      // {
      //   label: "力份 ",
      //   prop: "bcForce",
      //   width: 100,
      //   props: {
      //     label: "bcForce",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: Chemicalmat
      // },
      // {
      //   label: _this.$t("whseField.scdh"),
      //   prop: "prodNo",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: _this.$t("whseField.mkh"),
      //   prop: "fabticket",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNos",
        cell: false,
        width: 220
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: false,
        width: 100,
        align: "right",
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: unit,
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: false,
        width: 100,
        align: "right",
        hide:
          _this.datas != _this.$t("iaoMng.hgyl") &&
          _this.datas != _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: false,
        width: 100,
        type: "select",
        dicData: unit,
        hide:
          _this.datas != _this.$t("iaoMng.hgyl") &&
          _this.datas != _this.$t("iaoMng.yl")
            ? false
            : true
      }
    ]
  };
}
export function sx2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 314px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "cartNum",
        type: "sum"
      },
      {
        label: " ",
        name: "netWei",
        type: "sum"
      },
      {
        label: " ",
        name: "whseNum",
        type: "sum"
      },
      {
        label: " ",
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: false,
        width: 130
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: false,
        overHidden: true,
        width: 350,
        type: "select",
        overHidden: true,
        // props: {
        //   label: "yarnsName",
        //   value: "yarnsId"
        // },
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNos",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.shdxs"), //"送貨單箱數",
        prop: "cartonNum", //cartNum
        cell: false,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.shdzl"), //"送貨單重量",
        prop: "cartonWei", // netWei
        cell: false,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.rcxs"), // "入倉箱數",
        prop: "whseNum",
        cell: true,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.rczl"), //"入倉重量",
        prop: "weight",
        cell: true,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit", // weiUnit
        cell: false,
        width: 80,
        type: "select",
        dicData: unit
      },
      {
        label: _this.$t("whseField.mxds"), //"每箱釘數",
        prop: "everySpindle",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.wxds"), //"尾箱釘數",
        prop: "tailSpindle",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.sp"), //"紗牌",
        prop: "yarnsCard",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.cd"), //"產地",
        prop: "placeOrigin",
        cell: false,
        width: 100
      }
    ]
  };
}
export function pb2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 314px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.pbbh"), //"胚布編號",
        prop: "calicoId",
        cell: false,
        width: 100
      },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "clothName",
        cell: false,
        overHidden: true,
        width: 450,
        overHidden: true,
        type: "select",
        // props: {
        //   label: "yarnsName",
        //   value: "yarnsId"
        // },
        dicData: getDicT("basCalico", "calicoName", "calicoId")
      }
    ]
  };
}

export function hgyl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 314px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.ylbh"),
        prop: "chemicalId", // bcCode
        cell: false,
        width: 140
      },
      {
        label: _this.$t("whseField.ylmc"),
        prop: "chemicalName", //CNNameLong
        cell: false,
        overHidden: true,
        width: 250,
        overHidden: true
      },
      {
        label: _this.$t("whseField.ywmc"),
        prop: "ennamelong",
        cell: false,
        width: 250,
        overHidden: true,
        props: {
          label: "ennamelong",
          value: "bcCode"
        },
        type: "select",
        dicData: basChemicalmat
      },
      {
        label: _this.$t("whseField.xh"),
        prop: "modeltype",
        cell: false,
        width: 120,
        props: {
          label: "modeltype",
          value: "bcCode"
        },
        type: "select",
        dicData: basChemicalmat
      },
      {
        label: _this.$t("whseField.hglhl"), //"含固力/活力",
        prop: "vitality",
        cell: false,
        width: 120,
        props: {
          label: "vitality",
          value: "bcCode"
        },
        type: "select",
        dicData: basChemicalmat
      }
    ]
  };
}

export function yl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 314px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.ylbh1"),
        prop: "chemicalId", // bcCode
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.ylmc1"),
        prop: "chemicalName", //CNNameLong
        cell: false,
        width: 250,
        overHidden: true
      },
      {
        label: _this.$t("whseField.ywmc"),
        prop: "ennamelong",
        cell: false,
        width: 250,
        overHidden: true,
        props: {
          label: "ennamelong",
          value: "bcCode"
        },
        type: "select",
        dicData: basPigment
      },
      {
        label: _this.$t("whseField.sg"), //"色光",
        prop: "bcColor",
        cell: false,
        width: 120,
        props: {
          label: "bcColor",
          value: "bcCode"
        },
        type: "select",
        dicData: basPigment
      },
      {
        label: _this.$t("whseField.lf"), //"力份",
        prop: "bcForce",
        cell: false,
        width: 120,
        props: {
          label: "bcForce",
          value: "bcCode"
        },
        type: "select",
        dicData: basPigment
      }
    ]
  };
}
export function rhl3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 274px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    roykey: "whseChemicalinDtlboid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNos",
        cell: true,
        width: 220
      },
      {
        label: _this.$t("whseField.cd"),
        prop: "origin",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("Whse_Origin")
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: unit
      }
    ]
  };
}

export function rhl4C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height:
      _this.datas === _this.$t("iaoMng.yl") ||
      _this.datas === _this.$t("iaoMng.hgyl")
        ? "calc(50vh - 198px)"
        : "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "applyNum",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.sgdh"),
        prop: "appId",
        cell: true,
        width: 220
      },
      {
        label: _this.$t("whseField.fpsl"),
        prop: "applyNum",
        cell: true,
        width: 120,
        align: "right"
      }
    ]
  };
}
export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.chdh"),
        prop: "poNo",
        span: 6,
        placeholder: " ",
        disabled: _this.upDate
      },
      // {
      //   label: "供应商",
      //   prop: "suppId",
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: _this.upDate
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        span: 6,
        placeholder: " ",
        display: _this.data === _this.$t("iaoMng.sx")
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        span: 6,
        placeholder: " ",
        display: _this.data === _this.$t("iaoMng.pb")
      },
      {
        label: _this.$t("whseField.ylbh"),
        prop: "bcCode",
        span: 6,
        placeholder: " ",
        display:
          _this.data === _this.$t("iaoMng.hgyl") ||
          _this.data === _this.$t("iaoMng.yl")
      }
    ]
  };
}
export function planCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.upDate ? "calc(100vh - 180px)" : "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 40,
        align: "center"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "poNo",
        cell: false,
        width: 170
      },
      // {
      //   label: "供應商",
      //   prop: "suppId",
      //   cell: false,
      //   width: 120,
      //   type: "select",
      //   dicData: getDicT("purSinglepo", "suppName", "suppId")
      // },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        cell: false,
        width: 170
      },
      // {
      //   label: _this.$t('whseField.shrq'),
      //   prop: "deliDate",
      //   type: "date",
      //   width: 120,
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   align: "center",
      // },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: false,
        width: 130,
        hide: _this.data != _this.$t("iaoMng.sx")
      },
      {
        label: _this.$t("whseField.sxmc"), //"紗線名稱",
        prop: "yarnsName",
        cell: false,
        overHidden: true,
        hide: _this.data != _this.$t("iaoMng.sx")
        // width: 150,
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        cell: false,
        width: 120,
        hide: _this.data != _this.$t("iaoMng.pb")
      },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "calicoName",
        cell: false,
        hide: _this.data != _this.$t("iaoMng.pb")
        // width: 150,
      },
      {
        label:
          _this.data === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylbh")
            : _this.$t("whseField.ylbh1"),
        prop: "bcCode",
        cell: false,
        width: 140,
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl")
      },
      {
        label:
          _this.data === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylmc")
            : _this.$t("whseField.ylmc1"),
        prop: "cnnamelong",
        cell: false,
        overHidden: true,
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl"),
        width: 350
      },

      {
        label: _this.$t("whseField.zl"),
        prop: "deliQty",
        cell: false,
        width: 80,
        align: "right",
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl")
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "deliUnit",
        cell: false,
        width: 60,
        type: "select",
        dicData: unit,
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl")
      },
      {
        label: _this.$t("whseField.xs"),
        prop: "cartNum",
        cell: false,
        width: 80,
        overHidden: true,
        align: "right",
        hide: _this.data != _this.$t("iaoMng.sx")
      },

      {
        label:
          _this.data === _this.$t("iaoMng.sx")
            ? _this.$t("whseField.zl")
            : _this.$t("whseField.zl"),
        prop: "netWei",
        cell: false,
        width: 80,
        align: "right",
        hide:
          _this.data != _this.$t("iaoMng.sx") &&
          _this.data != _this.$t("iaoMng.pb")
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weiUnit",
        cell: false,
        width: 60,
        type: "select",
        hide:
          _this.data != _this.$t("iaoMng.sx") &&
          _this.data != _this.$t("iaoMng.pb"),
        dicData: unit
      },

      {
        label:  _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNos",
        cell: false,
        width: 180
      }
    ]
  };
}
