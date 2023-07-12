import { getDIC, getDicT, postDicT, getXDicT, getDbDicT } from "@/config";

let matUnit = getDIC("bas_matUnit");
let rlData = getXDicT("basFuel");
let user = getDicT("ucmlUser", "employeename", "ucmlUseroid");
export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出倉编号",
        prop: _this.hide === "1" ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? false : true
      },
      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        span: 6,
        placeholder: " ",
        // disabled: !_this.isPlan && !_this.isAdd,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      // {
      //   label: "出倉日期",
      //   prop: "stockDate",
      //   span: 6,
      //   placeholder: " ",
      //   type: "datetime",
      //   display: _this.hide === "6" ? false : true,
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      // },

      // {
      //   label: "出倉类型",
      //   prop: "retType",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: _this.hide === '1' ? getDIC("whse_stock_type") : getDIC('Whse_out_type'),
      //   // display: _this.hide === "1" ? true : false
      // },
      {
        label: "领用人",
        prop: "leader",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: user,
        filterable: true,
        display:
          _this.hide === "6" || _this.hide === "1" || _this.hide === "2"
            ? true
            : false
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_outStatus"),
        // hide: _this.hide != "6",
        width: 120
      }
      // {
      //   label: _this.$t("whseField.czy"),
      //   prop: "sysCreatedby",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: user
      // }
    ]
  };
}
export function rsxkr2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出倉编号",
        prop: _this.hide === "1" ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        span: 6,
        placeholder: " ",
        // disabled: !_this.isPlan && !_this.isAdd,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "出仓方式",
        prop: "stockType",
        span: 6,
        type: "select",
        change: val => {
          _this.changeRet(val.value);
        },
        disabled: _this.hide === "1" && _this.isAdd ? false : true,
        display: _this.hide != "1" ? false : true,
        dicData: getDIC("whse_stock_type")
      },

      {
        label: "申購單",
        prop: "appId",
        span: 6,
        click: () => {
          if (_this.form.stockType === "2") {
            return;
          }

          _this.choiceField = "spNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.mx = [];
          if (_this.form.stockType === "1") {
            _this.choiceQ.purCategory = "9";
            _this.choiceTle = _this.$t("choicDlg.xzsgd");
          } else {
            _this.choiceQ.type = "9";
            _this.choiceTle = _this.$t("choicDlg.xzsqlyd");
            _this.choiceQ.applyState = "3";
            _this.choiceQ.collectSucceed = 0;
          }
          _this.choiceV = !_this.choiceV;
        },
        placeholder: " ",
        display: _this.hide === "2" || _this.hide === "1" ? true : false,
        disabled: !_this.isAdd
      },
      {
        label: "领用人",
        prop: "leader",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: user,
        filterable: true,
        // click: () => {
        //   _this.choiceV = !_this.choiceV;
        //   _this.choiceQ = {};
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.form;
        //   _this.choiceTle = _this.$t("choicDlg.xzlyr");
        // },
        display:
          _this.hide === "6" || _this.hide === "1" || _this.hide === "2"
            ? true
            : false
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        span: 6,
        type: "select",
        dicData: user,
        disabled: true
        // hide: _this.hide === '6' || _this.hide === '1' ? false : true
      },
      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        span: 6,
        display: _this.hide != "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        span: 6,
        display: _this.hide != "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },

      {
        label: _this.$t("energy.bz"),
        prop: _this.hide === "4" ? "retRemarks" : "traRemarks",
        span: 12,
        placeholder: " ",
        display: _this.hide === "4" || _this.hide === "5"
      }
    ]
  };
}
export function rsxkr1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 202px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "whseMaterialoid",
        prop: "whseMaterialoid",
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
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center"
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true
      },
      {
        label: _this.$t("whseField.ccbh"),
        prop: _this.hide === "1" ? "stockId" : "retCode",
        cell: true,
        width: 180,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: _this.$t("whseField.ccbh"),
        prop: "woOutno",
        cell: true,
        width: 180,
        hide: _this.hide != "6" ? true : false
      },
      {
        label: "出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        width: 100,
        dicData: getDIC("Whse_out_type")
      },
      {
        label: "出倉方式",
        prop: "stockType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("whse_stock_type"),
        hide: _this.hide != "1"
      },

      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        cell: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
        width: 200,
        hide: _this.hide === "6"
      },
      // {
      //   label: "出倉日期",
      //   prop: "stockDate",
      //   cell: true,
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   align: "center",
      //   hide: _this.hide != '6',
      //   width: 200,
      // },

      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "领用人",
        prop: "leader",
        cell: true,
        width: 140,
        type: "select",
        dicData: user,
        hide: _this.hide === "1" ? false : true
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_outStatus"),
        // hide: _this.hide != "6",
        width: 120
      },

      {
        label: _this.$t("energy.bz"),
        prop: _this.hide === "4" ? "retRemarks" : "traRemarks",
        span: 6,
        cell: true,
        placeholder: " ",
        hide: _this.hide == "4" || _this.hide == "5" ? false : true,
        width: 500
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        type: "select",
        dicData: user
        // hide: _this.hide === '6' || _this.hide === '1' ? false : true
      }
    ]
  };
}
export function rsxkr2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "stockQty",
        type: "sum"
      }
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "材料編號",
        prop: "materialId",
        cell: false,
        width: 100
      },
      {
        label: "材料名稱",
        prop: "materialName",
        cell: false,
        width: 300,
        overHidden: true
      },
      {
        label: "大類名稱",
        prop: "bcClass",
        cell: false,
        width: 120,
        hide: true,
        type: "select",
        props: {
          label: "basFuelDtlFk",
          value: "hardwareId"
        },
        dicData: rlData
      },
      {
        label: "大類名稱",
        prop: "$bcClass",
        cell: false,
        width: 150,
        type: "select",
        overHidden: true,
        // props: {
        //   label: "bcClass",
        //   value: "bcCode"
        // },
        dicData: getDicT("basFuelDtl", "topcategoryName", "basFuelDtloid")
      },
      {
        label: _this.$t("whseField.xh"),
        prop: "model",
        cell: false,
        width: 150,
        hide: false,
        overHidden: true,
        type: "select",
        props: {
          label: "model",
          value: "hardwareId"
        },
        dicData: rlData
      },

      {
        label: _this.$t("whseField.gg"),
        prop: "itemspec",
        hide: false,
        width: 150,
        type: "select",
        overHidden: true,
        props: {
          label: "itemspec",
          value: "hardwareId"
        },
        dicData: rlData
      },
      // {
      //   label: _this.$t("whseField.gg"),
      //   prop: "$itemspec",
      //   hide: false,
      //   width: 150,
      //   type: "select",
      //   overHidden: true,
      //   // props: {
      //   //   label: "bcColor",
      //   //   value: "bcCode"
      //   // },
      //   dicData: getDIC("bas_ColorLight")
      // },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        hide: false,
        width: 150,
        overHidden: true
      },
      {
        label: "申购数量",
        prop: "applyNum",
        hide: false,
        width: 90,
        align: "right"
      },
      // {
      //   label: "申购单位",
      //   prop: "company",
      //   hide: false,
      //   width: 90,
      //   type: "select",
      //   dicData: matUnit
      // },

      {
        label: "出货数量",
        prop: "stockQty",
        hide: false,
        cell: true,
        width: 120,
        align: "right",
        type: "number",
        placeholder: " ",
        change: val => {
          if (val.value > _this.chooseData.applyNum) {
            _this.$nextTick(() => {
              _this.$nextTick(() => {
                _this.chooseData.stockQty = _this.chooseData.applyNum;
                _this.$tip.warning("出货数量不能大于申购数量!");
              });
            });
          }
        }
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "stockUnit",
        hide: false,
        width: 90,
        cell: false,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}
let rsxkr3CDic = getXDicT("whseAccessoriesIn");
let basWjxz = getDbDicT("basHardwarearticles", "basAdsuppliesarticles");
// 退供应商、客人明细
export function rsxkr3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "retTotalpi",
        type: "sum"
      },
      {
        label: " ",
        name: "retTotalweight",
        type: "sum"
      }
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "whseRetreatDtloid",
        prop: "whseRetreatDtloid",
        hide: true
      },
      {
        label: _this.$t("whseField.rcbh"),
        prop: "$whseAccessoriesinFk",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseAccessoriesIn", "yinId", "whseAccessoriesinoid"),
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.rcbh"),
        prop: "whseAccessoriesinFk",
        cell: false,
        width: 500,
        type: "select",
        hide: false,
        props: {
          label: "whseAccessoriesinFk",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        cell: false,
        width: 120,
        type: "select",
        props: {
          label: "materialNum",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName",
        cell: false,
        width: 140,
        props: {
          label: "chinName",
          value: "hardwareId"
        },
        dicData: basWjxz
        // type: "select",
        // dicData: getDicT("whseYarninDtl/v1.0/list", "yarnsId", "whseYarninDtloid"),
      },
      {
        label: _this.$t("whseField.xh"),
        prop: "model",
        cell: false,
        width: 250,
        props: {
          label: "model",
          value: "hardwareId"
        },
        dicData: basWjxz,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.gg"),
        prop: "itemspec",
        cell: false,
        width: 280,
        props: {
          label: "itemspec",
          value: "hardwareId"
        },
        dicData: basWjxz,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 150,
        type: "select",
        props: {
          label: "batchNo",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.rcsl"),
        prop: "poQty",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "poQty",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: "退回數量",
        prop: "retQty",
        cell: true,
        width: 110,
        align: "right",
        hide: _this.hide === "5" ? true : false
      },
      {
        label: "调仓數量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != "5" ? true : false
      },
      {
        label: _this.$t("whseField.dw"),
        prop: _this.hide === "4" ? "retCompany" : "traCompany",
        cell: false,
        width: 100,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}
// 本廠配料
export function planCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 202px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "whseMaterialPlanoid",
        prop: "whseMaterialPlanoid",
        hide: true
      },
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        width: 180,
        cell: true
      },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1' ? true : false,

      // },
      // {
      //   label: _this.$t("labour.sbmc"),
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1' ? true : false
      // },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.flbh"),
        prop: "matId",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.flmc"),
        prop: "matName",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 160
      },
      {
        label: _this.$t("energy.sl"),
        prop: "qty",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "qtyUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}
// 外廠配料
export function PlanOutCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 202px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "VWhseRetyarninoutPlanoid",
        prop: "VWhseRetyarninoutPlanoid",
        hide: true
      },
      // {
      //   label: "外厂配料计划编号",
      //   prop: "retBatch",
      //   cell: true,
      //   width: 150,

      // },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'

      // },
      // {
      //   label: _this.$t("labour.sbmc"),
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'
      // },
      // {
      //   label: _this.$t("whseField.wfcdh"),
      //   prop: "refCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '2'

      // },
      // {
      //   label: _this.$t("whseField.wfcmc"),
      //   prop: "refName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '2'
      // },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 140
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: true,
        width: 250
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100
      }
    ]
  };
}

export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("ProWorkflowInfo.sbbh"),
        prop: "equCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false
      },
      {
        label: _this.$t("whseField.gcdh"),
        prop: "refCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false
      },
      // {
      //   label: _this.$t("whseField.scdh"),
      //   prop: "prOn",
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

// 退客人纱
export function whseRetreatCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 202px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true
      },
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        cell: true,
        width: 120
      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: true,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: true,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: true,
        width: 250
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100
      }
    ]
  };
}
