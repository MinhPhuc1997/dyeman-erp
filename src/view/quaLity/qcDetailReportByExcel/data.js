/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-30 14:28:43
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt",
        formslot: true
      },
      {
        label:  _this.$t("note.weightUnit"), //重量单位
        prop: "wmUnit",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: "KG",
            labek: "KG"
          },
          {
            value: "LBS",
            labek: "LBS"
          }
        ]
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        span: 12,
        placeholder: " "
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
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    menuTitle: "称重",
    // sumColumnList: [],
    column: [
      // {
      //   label: _this.$t("loomSchedule.opCode") , //编号
      //   prop: "checkoutCode",
      //   span: 6,
      //   align: "center",
      //   // sortable: true,
      //   width: 120,
      //   overHidden: true
      // },

      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true
      },
      {
        label:  _this.$t("fabName"), //布类名称,
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 180,
        overHidden: true
      },
      {
        label:  _this.$t("colorName"), //顏色,
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        overHidden: true
      },
      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "yarnBrand",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.yarnBatch"), //供应商纱批
        prop: "yarnBatch",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("factoryYarnBatch") ,//本厂纱批
        prop: "factBatch",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.calicoPidCount"), //落胚疋数
        prop: "calicoPidCount",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.calicoAmount"), //落胚重量
        prop: "calicoAmount",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.fabricPidCount"), //成品疋数
        prop: "fabricPidCount",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.weightKg"), //成品重量
        prop: "weightKg",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.weightLbs"), //成品重量
        prop: "weightLbs",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 130,
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.lossRate"), //成品损耗
        prop: "lossRate",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        overHidden: true
      },
      {
        label:  _this.$t("checkPlan.fabricLength"), //总长度
        prop: "fabricLength",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeCodes",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        overHidden: true
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        width: 250,
        placeholder: " ",
        overHidden: true,
        cell: true
      },
      {
        label: _this.$t("public.date") , //日期
        prop: "checkoutDate",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200,
        overHidden: true
      }
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
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 8,
        placeholder: " ",
        disabled: true,
        tip: "MS đơn sản xuất bp Dệt"
        // formslot: true,
        // slot: true,
        // type: "select",
      },
      {
        label:  _this.$t("eachNumber"), //"匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 8,
        placeholder: " ",
        disabled: true,
        type: "number",
        tip: "Số cây vải"
      },
      {
        label:  _this.$t("note.weightUnit"), //重量单位
        tip: "đơn vị trọng lượng",
        prop: "weightUnit",
        width: 100,
        span: 8,
        type: "select",
        // dicData: matUnit,
        dicData: [
          {
            label: "公斤",
            value: "KG"
          },
          {
            label: "磅",
            value: "LBS"
          }
        ],
        placeholder: " "
      },

      {
        label:  _this.$t("note.grossWeight1"), //浮重(KG)
        tip: "Trọng lượng bì(KG)",
        prop: "grossWeight",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("note.netWeight1"), //净重
        tip: "trọng lượng tịnh(KG)",
        prop: "netWeight",
        width: 100,
        span: 8,
        precision: 1,
        type: "number",
        minRows: 0,
        align: "left",
        placeholder: " ",
        disabled: false
      },
      {
        label:  _this.$t("note.paperTube1"), //纸筒重量
        tip: "Trọng lượng thoi giấy",
        prop: "paperTube",

        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label:  _this.$t("note.grossWeightLbs1"), //浮重
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("note.netWeightLbs1"), //净重
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },

      {
        label:  _this.$t("note.qcTakeOut1"), //QC扣减数
        tip: "trọng lượng QC cắt giảm",
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 8,
        cell: true,
        placeholder: " ",
        minRows: 0,
        type: "number",
        precision: 1
      },
      // {
      //   label:  _this.$t("gramWeight"), //克重,
      //   tip: "Trọng lượng trước giặt",
      //   prop: "realGramWeight",
      //   width: 100,
      //   span: 8,
      //   type: "number",
      //   align: "left",
      //   minRows: 0,
      //   placeholder: " "
      // },
      // {
      //   label:  _this.$t("breadth"), //幅宽,
      //   tip: "Khổ rộng vải mộc",
      //   prop: "clothWidth",
      //   width: 100,
      //   span: 8,
      //   type: "number",
      //   align: "left",
      //   minRows: 0,
      //   placeholder: " "
      // },
      {
        label:  _this.$t("note.yardLength"), //码长
        tip: "Chiều dài sợi",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "left",
        minRows: 0,
        placeholder: " "
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        cell: false,
        width: 220,
        placeholder: " ",
        span: 8,
        type: "select",
        // props: {
        //   label: "locationCode",
        //   value: "locationCode"
        // },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        width: 250,
        span: 24,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        props: {
          label: "itemName",
          value: "itemName"
        },
        dicData: [] //getDIC("QC_CLOTH_VISITING_REMOVE")
      }
    ]
  };
}

export function dlgCrud(_this) {
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
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    // sumColumnList: [],
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
        align: "left",
        placeholder: " "
      },
      // {
      //   label:  _this.$t("note.paperTube"), //纸管重量
      //   prop: "paperTube",
      //   width: 180,
      //   align: "right",
      //   minRows: 0,
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   precision: 1
      // },

      // {
      //   label:  _this.$t("note.qcTakeOut"), //QC扣减数量
      //   prop: "qcTakeOut",
      //   width: 160,
      //   align: "right",
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   minRows: 0,
      //   precision: 1
      // },
      // {
      //   label:  _this.$t("note.storeLoadCode"), //载具编号(Mã lồng thép
      //   prop: "storeLoadCode",
      //   span: 8,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   sortable: true,
      //   width: 160
      // },
      // {
      //   label:  _this.$t("note.storeSiteCode"), //存储位置
      //   prop: "storeSiteCode",
      //   cell: true,
      //   width: 220,
      //   placeholder: " ",
      //   type: "select",
      //   filterable: true,
      //   allowCreate: true,
      //   defaultFirstOption: true,
      //   dicData: getDicT("whseLocation", "locationCode", "locationCode")
      // },

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
        label:  _this.$t("note.clothChecker"), //验布员工号
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.clothCheckTime"), //"验布时间
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
