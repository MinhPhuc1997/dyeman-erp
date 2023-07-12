/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-05 08:01:16
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        tip: "Mã lồng thép",
        prop: "storeLoadCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120
      },
      {
        label: _this.$t("weaveJobCode") , //"織單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        // formslot: true,
        // slot: true,
        // type: "select",
        tip: "MS đơn sản xuất bp Dệt"
      },
      {
        label:  _this.$t("quality.outworkFlag"), //
        prop: "outworkFlag",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: _this.$t("public.true"),
            value: true
          },
          {
            label: _this.$t("public.false"),
            value: false
          },
          
        ],
      },
      // {
      //   label: _this.$t("poNo"), //"訂單號",
      //   prop: "poNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Số đơn hàng"
      // },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
        tip: "Mã vải"
      },
      // {
      //   label: "机號",
      //   prop: "loomNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Mã máy"
      // },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        tip: "Số cây vải"
      },

      {
        label:  _this.$t("note.clothState"), //"胚布状态
        tip: "Cloth state",
        prop: "clothState",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "已称重装笼(Cân nặng)",
            value: 1
          },
          {
            label: "已入仓(Vào nhà kho)",
            value: 2
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label:  _this.$t("note.clothCheckTime"), //"验布时间
        prop: "clothCheckTime",
        type: "datetimerange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 12,
        tip: "thời gian in",
        placeholder: " ",
        align: "center",
        width: 180
      }
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 290px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "审核",
    sumColumnList: [
      {
        label:  _this.$t("grossWeight") ,//毛重,
        name: "clothWeight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      {
        label:  _this.$t("note.storeLoadCode"), //载具编号(Mã lồng thép
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: _this.$t("weaveJobCode") , //"織單號(MS đơn sản xuất bp Dệt)",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.perching"), //验布记录
        prop: "perching",
        width: 250,
        placeholder: " ",
        overHidden: true,

      },
      {
        label:  _this.$t("note.noteCode"), //布票號
        prop: "noteCode",
        width: 170,
        disabled: true,
        placeholder: " ",
        span: 6,
        // sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.fabricName"), //布类名称
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("note.loomNo"), //机号
        prop: "loomNo",
        width: 95,
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
        // sortable: true,
      },
      {
        label:  _this.$t("note.workNo"), //值机工号
        prop: "workNo",
        span: 8,
        placeholder: " ",
        width: 160,
        overHidden: true
      },
      {
        label:  _this.$t("note.clothChecker"), //员工号
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 160,
        sortable: true,
        overHidden: true
      },
      // {
      //   label:  _this.$t("workNo"), //值机工号,
      //   prop: "workNo",
      //   width: 90,
      //   hide: false,
      //   span: 6,
      //   disabled: true,
      //   rules: [{
      //     required: true,
      //     message: "请输入值机工号",
      //     trigger: "blur"
      //   }],
      // },
      {
        label:  _this.$t("note.eachNumber"), //匹號
        prop: "eachNumber",
        width: 105,
        align: "right",
        // sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("note.realWeight"), //毛重
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
        // type: "number",
        // precision: 1
      },
      {
        label: _this.$t("whseField.zl") + "(trọng lượng)",
        prop: "clothWeight",
        width: 120,
        align: "center",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label:  _this.$t("note.qcTakeOut"), //QC扣减数量
        prop: "qcTakeOut",
        width: 160,
        align: "center",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label:  _this.$t("note.clothLengthValue"), //米长
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        // sortable: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        cell: true,
        width: 220,
        placeholder: " ",
        type: "select",
        props: {
          label: "locationCode",
          value: "locationCode"
        }
      },
      // {
      //   label:  _this.$t("unit"), //單位
      //   prop: "weightUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      // {
      //   label: "長度",
      //   prop: "clothLength",
      //   width: 80,
      //   display: false
      // },

      // {
      //   label:  _this.$t("unit"), //單位
      //   prop: "lenUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },

      // {
      //   label:  _this.$t("isPrinted"), //已打印,
      //   prop: "isPrinted",
      //   type: "select",
      //   disabled: true,
      //   dicData: [
      //     {
      //       value: true,
      //       label: _this.$t("public.true")
      //     },
      //     {
      //       value: false,
      //       label: _this.$t("public.false")
      //     }
      //   ],
      //   span: 6,
      // },
      {
        label:  _this.$t("note.remark"), //备注(
        prop: "remark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      },
      // {
      //   label:  _this.$t("quality.printedTime"), //打印时间
      //   prop: "printedTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // },
      {
        label:  _this.$t("note.clothCheckTime1"), //验布时间
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      }
    ]
  };
}
