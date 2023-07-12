/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-22 11:03:58
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        // formslot: true,
        // slot: true,
        // type: "select",
        tip: "MS đơn sản xuất bp Dệt"
      },
      // {
      //   label: _this.$t("poNo"), //"訂單號",
      //   prop: "poNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Số đơn hàng"
      // },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        width: 150,
        placeholder: " ",
        span: 6,
        overHidden: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust,
        tip: "Khách hàng"
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        tip: "Số cây vải"
      },
      // {
      //   label: _this.$t("driving.carriageStorageCode"), //载具编号,
      //   tip: "Mã lồng thép",
      //   prop: "storeLoadCode",
      //   span: 6,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120
      // },
      {
        label:  _this.$t("note.clothState"), //成品布状态
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
            label: "已称重(Cân nặng)",
            value: 1
          },
          {
            label: "已入仓(Vào nhà kho)",
            value: 2
          }
        ],
        change: () => {
          // _this.$nextTick(() => {
          //   _this.query();
          // });
        }
      },
      {
        label:  _this.$t("clothFly.clothChecker"), //验布员工号
        prop: "clothChecker",
        span: 6,
        placeholder: " ",
        width: 180,
        overHidden: true
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
      // {
      //   label:  _this.$t("note.clothCheckTime"), //"验布时间
      //   prop: "clothCheckTime",
      //   type: "date",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   span: 6,
      //   tip: "thời gian in",
      //   placeholder: " ",
      //   align: "center",
      //   width: 180
      // }
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
    sumColumnList: [],
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },

      {
        label:  _this.$t("note.vatNo"), //缸号
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.poNo"), //訂單號
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("note.custCode"), //客戶
        prop: "custCode",
        width: 150,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true,
        type: "select",
        dicData: cust,
      },
      {
        label:  _this.$t("note.fabricName"), //布类名称
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: true
      },
      // {
      //   label: "客布代码",
      //   // tip: "Số màu",
      //   prop: "guestFabId",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
      // {
      //   label:  _this.$t("codeCard.guestComponents"), //成份要求
      //   // tip: "Tổng cộng(KG)",
      //   prop: "guestComponents",
      //   width: 100,
      //   span: 16,
      //   placeholder: " ",
      //   hide: true
      // },
      {
        label:  _this.$t("codeCard.styleNo"), //款号
        // tip: "Số màu",
        prop: "styleNo",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("note.colorName"), //顏色
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("codeCard.originPlace"), //产地
        prop: "originPlace",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label:  _this.$t("note.yardLength1"), //码长
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("note.eachNumber"), //匹號
        prop: "pidNo",
        width: 85,
        align: "right",
        // sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("note.grossWeight"), //浮重
        prop: "grossWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
        // type: "number",
        // precision: 1
      },
      {
        label:  _this.$t("note.paperTube"), //纸管重量
        prop: "paperTube",
        width: 140,
        align: "right",
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
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label:  _this.$t("note.netWeight"), // "净重(trọng lượng tịnh(KG)",
        prop: "netWeight",
        width: 140,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label:  _this.$t("note.storeLoadCode"), //载具编号(Mã lồng thép
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 160
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
      {
        label:  _this.$t("note.realGramWeight"), //克重
        // tip: "Tổng cộng(KG)",
        prop: "gramWeight",
        width: 140,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("note.actualSideBreadth"), //幅宽
        // tip: "Tổng cộng(KG)",
        prop: "breadth",
        width: 140,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
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
        label:  _this.$t("note.clothChecker"), //验布员工号
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.clothCheckTime1"), //验布时间
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200
      },
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
      }
    ]
  };
}
