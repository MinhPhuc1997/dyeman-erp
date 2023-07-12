/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-30 13:53:00
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

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
        label: _this.$t("auditState") ,//审核状态,
        prop: "whseVouch",
        width: 120,
        type: "select",
        span: 6,
        dicData: [
          {
            value: 0,
            label:  _this.$t("checkPlan.unaudit") ,// "未审核"
          },
          {
            value: 1,
            label: _this.$t("checkPlan.reject") ,// "拒收"
          },
          {
            value: 9,
            label: _this.$t("audited") ,//已审核
          }
        ],
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        span: 6,
        placeholder: " "
      },

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
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "称重",
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
        width: 160,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
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
      }
    ]
  };
}
export function mainCrud(_this) {
  return {
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 245px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    menu: true,
    showSummary: false,
    menuTitle: "称重",
    column: [
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
        label: "版本",
        prop: 'verId',
        align: "center",
        width: 60,
        fixed: true,
        formatter: (r,v) => {
          return v + 1;
        }
      },
      {
        label: _this.$t("auditState") ,//审核状态,
        prop: "whseVouch",
        width: 110,
        type: "select",
        dicData: [
          {
            value: 0,
            label:  _this.$t("checkPlan.unaudit") ,// "未审核"
          },
          {
            value: 1,
            label: _this.$t("checkPlan.reject") ,// "拒收"
          },
          {
            value: 9,
            label: _this.$t("audited") ,//已审核
          }
        ],
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("dyeDeliveryNote.reviewer"), //审核人
        prop: "whseVoucher",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
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
        label:  _this.$t("checkPlan.whseVouchTime"), //审核日期
        prop: "whseVouchTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200,
        overHidden: true
      },
      {
        label: _this.$t("createTime") , //日期
        prop: "checkoutDate",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200,
        overHidden: true
      },
      {
        label: _this.$t("updateTime") , //日期
        prop: "updateTime",
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

export function mainCrud1(_this) {
  return {
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 245px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    menu: true,
    showSummary: false,
    menuTitle: "称重",
    column: [
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
        label: "织造单编号" ,//"缸号",
        prop: "weaveJobCode",
        width: 160,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true
      },
      {
        label: "细码单编号" ,//"缸号",
        prop: "checkoutCode",
        width: 160,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true
      },
      {
        label: "版本",
        prop: 'verId',
        align: "center",
        width: 60,
        fixed: true,
        formatter: (r,v) => {
          return v + 1;
        }
      },
      {
        label: _this.$t("auditState") ,//审核状态,
        prop: "whseVouch",
        width: 110,
        type: "select",
        dicData: [
          {
            value: 0,
            label:  _this.$t("checkPlan.unaudit") ,// "未审核"
          },
          {
            value: 1,
            label: _this.$t("checkPlan.reject") ,// "拒收"
          },
          {
            value: 9,
            label: _this.$t("audited") ,//已审核
          }
        ],
        overHidden: true,
        sortable: true
      },
      {
        label:  _this.$t("dyeDeliveryNote.reviewer"), //审核人
        prop: "whseVoucher",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
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
        label:  _this.$t("checkPlan.whseVouchTime"), //审核日期
        prop: "whseVouchTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200,
        overHidden: true
      },
      {
        label: _this.$t("createTime") , //日期
        prop: "checkoutDate",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200,
        overHidden: true
      },
      {
        label: _this.$t("updateTime") , //日期
        prop: "updateTime",
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

export function newImpForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "缸号"  , // 缸号
        prop: "vatNo",
        span: 4,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      // {
      //   label: _this.$t("quality.flatCardCode")  , // 码卡编号
      //   prop: "flatCardCode",
      //   span: 4
      // },
      // {
      //   label: _this.$t("bottomcol.sn")  , // 下栏序号
      //   prop: "sn",
      //   span: 4,
      //   type: "number"
      // },
      {
        label: _this.$t("bottomcol.packNo")  , //包装序号
        prop: "packNo",
        span: 4
      },
      {
        label: "打印时间",
        tip: "Mã vải",
        prop: "printDate",
        span: 8,
        type:"daterange",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        maxLength:40
      },
    ]
  };
}

const commonCrudConfig = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  page: true,
  labelWidth: 120,
  selection: false,
  columnBtn: true
};

export function bottomColumnCrudOp(_this) {
  return {
    ...commonCrudConfig,
    height: "calc(100vh - 230px)",
    labelWidth: 120,
    index: true,
    column: [
      {
        label: _this.$t("quality.flatCardCode")  , // 码卡编号
        prop: "flatCardCode",
        span: 8,
        width: 160,
        fixed: true,
        overHidden: true,
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 8,
        width: 140,
        display: false,
      },
      {
        label: _this.$t("bottomcol.sn")  , // 下栏序号
        prop: "sn",
        span: 8,
        width: 140,
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "runJobFk",
        span: 8,
        width: 140,
        hide: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("bottomcol.sn")  , // 下栏序号
        width: 100,
        fixed: true,
        prop: "runJobFlatFk",
        hide: true,
        span: 8,
        type: "select",
        props: {
          label: "label",
          value: "platId"
        },
        dicData: [],
        rows: true,
        change: ({ value }) => {
          _this.handleFlatChange(value);
        },
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("revolve.lengthDsp"), // 长
        prop: "lengthDsp",
        width: 60,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label: _this.$t("revolve.widthDsp"), // 宽
        prop: "widthDsp",
        width: 60,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "amount",
        width: 100,
        span: 8,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "sizeUnit",
        span: 8,
        type: "select",
        disabled: true,
        width: 100,
        placeholder: " ",
        hide: true,
        dicData: [
          {
            label: "CM",
            value: "CM"
          },
          {
            label: "INCH",
            value: "INCH"
          }
        ]
      },
      {
        label: _this.$t("bottomcol.actualLength")  , //实际长
        prop: "actualLength",
        span: 8,
        width: 80,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: _this.$t("bottomcol.actualWidth")  , //实际宽
        prop: "actualWidth",
        width: 80,
        span: 8,
        // rules: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "actualQty",
        width: 100,
        span: 8,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },

      {
        label: _this.$t("bottomcol.packNo")  , //包装序号
        prop: "packNo",
        width: 100,
        span: 8,
        type: "number",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("ReturnYarnsNotice.packSize"), //包装规格
        width: 100,
        prop: "packSize",
        span: 8,
        type: "number",
        precision: 0
      },

      {
        label: _this.$t("bottomcol.packNwKg")  , //包净重
        prop: "packNwKg",
        span: 8,
        width: 100,
        type: "number",
      },
      {
        label: _this.$t("bottomcol.packGwKg")  , //包毛重
        prop: "packGwKg",
        span: 8,
        width: 100,
        type: "number"
      },
      {
        label:  _this.$t("printedTime"), //打印时间,
        prop: "printDate",
        span: 8,
        width: 160,
        display: false,
        type: "datetime"
      },
      {
        label: _this.$t("createTime") ,//创建时间
        prop: "createTime",
        span: 8,
        width: 160,
        display: false,
        type: "datetime"
      }
    ]
  };
}

