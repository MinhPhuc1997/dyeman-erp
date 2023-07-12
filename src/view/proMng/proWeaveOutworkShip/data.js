import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("weaveJobCode") , //"生产织单号",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("proCollarAccount.deliveryNo") ,//送货单号
        prop: "deliCode",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("proWeaveOutworkShip.outworkFactory"), // 加工单位
        prop: "outworkFactory",
        span: 6,
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
        filterable: true,
        placeholder: " "
      },
      // {
      //   label:  _this.$t("deliveDate") ,//交货日期,
      //   prop: "deliDate",
      //   width: 120,
      //   placeholder: " ",
      //   overHidden: true,
      //   span: 6
      // }
      {
        label: _this.$t("auditState") ,//审核状态,
        prop: "isAudit",
        span: 6,
        type: "select",
        dicData: [
          {
            value: true,
            label: _this.$t("audited") ,//已审核
          },
          {
            value: false,
            label: _this.$t("pendingReview") ,//待审核
          }
        ],
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
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    selection: true,
    labelWidth: 125,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("weaveJobCode") , //"生产织单号",
        prop: "weaveJobCode",
        width: 130,
        overHidden: true,
        disabled: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入生产织单号",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("proCollarAccount.deliveryNo") ,//送货单号
        prop: "deliCode",
        width: 150,
        overHidden: true,
        disabled: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入送货单号",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("proWeaveOutworkShip.outworkFactory"), // 加工单位
        prop: "outworkFactory",
        width: 220,
        overHidden: true,
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
        span: 6,
        // rules: [
        //   {
        //     required: true,
        //     message: "請选择加工单位",
        //     trigger: "blur"
        //   }
        // ]
      },

      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliDate",
        width: 160,
        span: 6,
        type: "datetime",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },

      {
        label:  _this.$t("proWeaveOutworkShip.deliQty"), // 汇总数量
        prop: "deliQty",
        width: 120,
        overHidden: true,
        type: "number",
        span: 6,
        align:"right"
      },
      {
        label: _this.$t("auditState") ,//审核状态,
        prop: "isAudit",
        span: 6,
        width: 120,
        display: false,
        type: "select",
        dicData: [
          {
            value: true,
            label: _this.$t("audited") ,//已审核
          },
          {
            value: false,
            label: _this.$t("pendingReview") ,//待审核
          }
        ],
        placeholder: " "
      }
    ]
  };
}

export function noteCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    selection: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "noteCode",
        type: "count"
      },
      {
        label: " ",
        name: "rw",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "noteCode",
        width: 180,
        overHidden: true,
        cell: false,
        placeholder: " ",
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入布票号",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("grossWeight") ,//毛重,
        prop: "gw",
        width: 120,
        type: "number",
        placeholder: " ",
        cell: true,
        overHidden: true,
        span: 6,
        align:"right"
      },
      {
        label:  _this.$t("netWeight") ,//净重,
        prop: "nw",
        width: 120,
        placeholder: " ",
        cell: true,
        type: "number",
        overHidden: true,
        span: 6,
        align:"right"
      },
      {
        label:  _this.$t("proWeaveOutworkShip.rw"), // 实收重量
        prop: "rw",
        width: 120,
        placeholder: " ",
        cell: true,
        type: "number",
        span: 6,
        align:"right"
      },
      {
        label:  _this.$t("proWeaveOutworkShip.proDate"), // 生产日期
        prop: "proDate",
        width: 180,
        placeholder: " ",
        span: 6,
        cell: true,
        type: "datetime",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "請輸入生产日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("proWeaveOutworkShip.loomCode"), // 机台号
        prop: "loomCode",
        cell: true,
        width: 120,
        placeholder: " ",
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        cell: true,
        width: 130,
        placeholder: " ",
        overHidden: true,
        span: 6
      },
      {
        label:  _this.$t("proWeaveOutworkShip.storeSiteCode"), // 货位
        prop: "storeSiteCode",
        cell: true,
        width: 130,
        placeholder: " ",
        overHidden: true,
        span: 6
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        cell: true,
        // width: 250,
        placeholder: " ",
        overHidden: true,
        span: 6
      }
    ]
  };
}
