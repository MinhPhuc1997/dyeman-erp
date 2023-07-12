/*
 * @Author: PMP
 * @Date: 2022-07-13 12:55:12
 * @LastEditors: 
 * @LastEditTime: 
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "MS đơn sản xuất bp Dệt"

      },
      {
        label: _this.$t("clothMerge.mergeProductNo") ,// "合并后成品编号",
        prop: "productNo",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      {
        label:  _this.$t("clothMerge.pidNo") ,// "疋号",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      {
        label:  _this.$t("clothMerge.title3") ,// "所在部门",
        prop: "handDtp",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      {
        label:  _this.$t("clothMerge.mergeStaff") ,// "合并人",
        prop: "mergeStaff",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      // {
      //   label: "合并日期",
      //   prop: "mergeDate",
      //   width: 80,
      //   align: "right",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: false,
      //   tip: "Số cây vải",
      //   type: "date",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss"
      // },

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
    tree: true,
    showOverflowTooltip: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    // sumColumnList: [],
    column: [
      {
        label:  _this.$t("clothMerge.mergeDate") ,// "合并日期",
        prop: "mergeDate",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200
      },
      {
        label:  _this.$t("note.vatNo"), //缸号
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.productNo1"), //合并后成品编号
        prop: "productNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.pidNo"), //疋号(Số cuộn vải)
        prop: "pidNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeGwKg"), //合并后毛重(公斤)
        prop: "margeGwKg",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeGwLbs"), //合并后毛重(磅)
        prop: "margeGwLbs",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeNwKg"), //合并后净重(公斤)
        prop: "margeNwKg",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeNwLbs"), //合并后净重(磅
        prop: "margeNwLbs",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("note.yardLength"), //码长
        prop: "yardLength",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.handDtp"), //所在部门
        prop: "handDtp",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeRemark"), //合并原因
        prop: "margeRemark",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.mergeStaff1"), //合并人
        prop: "mergeStaff",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },


    ]
  };
}

export function recordCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    tree: true,
    showOverflowTooltip: true,
    highlightCurrentRow: true,
    height: "calc(30vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    // sumColumnList: [],
    column: [
      // {
      //   label: "合并日期",
      //   prop: "mergeDate",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   // sortable: true,
      //   width: 200
      // },
      {
        label:  _this.$t("note.vatNo"), //缸号
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },

      {
        label:  _this.$t("clothMerge.productNo1"), //合并后成品编号
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("note.yardLength"), //码长
        prop: "yardLength",
        align: "right",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        align: "right",
        sortable: true

      },
      {
        label:  _this.$t("clothMerge.margeGwKg"), //合并后毛重(公斤)
        prop: "margeGwKg",
        align: "right",
        width: 100,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeGwLbs"), //合并后毛重(磅)
        prop: "margeGwLbs",
        align: "right",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeNwKg"), //合并后净重(公斤)
        prop: "margeNwKg",
        align: "right",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.margeNwLbs"), //合并后净重(磅
        prop: "margeNwLbs",
        align: "right",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("clothMerge.pidNo"), //疋号(Số cuộn vải)
        prop: "pidNo",
        align: "right",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },

      // {
      //   label:  _this.$t("clothMerge.handDtp"), //所在部门
      //   prop: "handDtp",
      //   width: 180,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },
      // {
      //   label:  _this.$t("clothMerge.margeRemark"), //合并原因
      //   prop: "margeRemark",
      //   width: 180,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },
      // {
      //   label:  _this.$t("clothMerge.mergeStaff1"), //合并人
      //   prop: "mergeStaff",
      //   width: 150,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },


    ]
  };
}

export function detailCrud(_this) {
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
    height: "calc(50vh - 140px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    column: [

      {
        label:  _this.$t("note.vatNo"), //缸号
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
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
        label:  _this.$t("note.yardLength1"), //码长
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        // precision: 1,
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("note.grossWeight"), //浮重
        prop: "grossWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        type: "number",
        minRows: 0,
        precision: 1,
        placeholder: " "
        // change: () => {}
        // type: "number",
        // precision: 1
      },
      {
        label:  _this.$t("note.grossWeightLbs"), //浮重
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("note.netWeight"), //净重
        prop: "netWeight",
        width: 150,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label:  _this.$t("note.netWeightLbs"), //净重
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("note.paperTube"), //纸管重量
        prop: "paperTube",
        width: 180,
        align: "right",
        minRows: 0,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },

    ]
  };
}

export function dlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label:  _this.$t("productNo"), //成品号码
        prop: "productNo",
        span: 6,
        placeholder: " ",
        tip: "Mã thành phẩm",
        remote: true,
        rules: [
          {
            required: false,
            message: "",
            trigger: "blur"
          }
        ],
        formslot: true
      },

      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        tip: "Số lô nhộm",
        remote: true,
        rules: [
          {
            required: false,
            message: "",
            trigger: "blur"
          }
        ],
        formslot: true
      },

      // {
      //   label: "所在部门",
      //   prop: "handDtp",
      //   tipPlacement: "right",
      //   span: 8,
      //   tip: "Bộ phận cắt",
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      //   rules: [
      //     {
      //       required: true,
      //       message: "請选择部门",
      //       trigger: "blur"
      //     }
      //   ],
      // },
      // {
      //   label: "合并人",
      //   prop: "mergeStaff",
      //   span: 8,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请输入选合并人",
      //       trigger: "blur"
      //     }
      //   ],
      // },
      // {
      //   label: "合并原因",
      //   prop: "margeRemark",
      //   span: 16,
      //   rules: [
      //     {
      //       required: false,
      //       message: "请输入合并原因",
      //       trigger: "blur"
      //     }
      //   ],
      // },

    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: true,
    addBtn: false,
    delBtn: false,
    editBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(90vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: false,
    tree: true,
    rowKey: "index",
    index: true,
    page: true,
    labelWidth: 120,
    showSummary: false,
    menu: true,
    menuWidth: 100,
    selection: false,
    sumColumnList: [
      {
        label: "共",
        name: "vatNo",
        type: "count",
        decimals: 1
      },
      {
        label: " ",
        name: "yardLength",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "netWeightLbs",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "grossWeightLbs",
        type: "sum",
        decimals: 1
      }
    ],
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
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
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
        label:  _this.$t("note.fabricName"), //布类名称
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
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
      // {
      //   label:  _this.$t("codeCard.styleNo"), //款号
      //   // tip: "Số màu",
      //   prop: "styleNo",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
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
        label:  _this.$t("note.originPlace"), //产地
        prop: "originPlace",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label:  _this.$t("note.eachNumber"), //匹號
        prop: "pidNo",
        width: 100,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label:  _this.$t("note.yardLength1"), //码长
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        // precision: 1,
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("note.grossWeight"), //浮重
        prop: "grossWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        type: "number",
        minRows: 0,
        precision: 1,
        placeholder: " "
        // change: () => {}
        // type: "number",
        // precision: 1
      },
      {
        label:  _this.$t("note.grossWeightLbs"), //浮重
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("note.netWeight"), //净重
        prop: "netWeight",
        width: 150,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label:  _this.$t("note.netWeightLbs"), //净重
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("note.paperTube"), //纸管重量
        prop: "paperTube",
        width: 180,
        align: "right",
        minRows: 0,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
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
        minRows: 0,
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },
      {
        label:  _this.$t("note.custCode"), //客戶
        prop: "custCode",
        width: 150,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
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
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
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
      },
      {
        label:  _this.$t("note.realGramWeight"), //克重
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 130,
        span: 8,
        cell: true,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("note.actualSideBreadth"), //幅宽
        // tip: "Tổng cộng(KG)",
        prop: "actualSideBreadth",
        width: 120,
        cell: true,
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
      }
    ]
  };
}

