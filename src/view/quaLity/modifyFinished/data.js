/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-21 15:38:03
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
        label: "拆缸缸号",
        prop: "vatNo1",
        span: 8,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt",
        formslot: true
      },
      {
        label: "目标缸号",
        prop: "vatNo2",
        span: 8,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt",
        formslot: true
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

export function secondForm(_this) {
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
            label: "已称重装笼(Cân nặng)",
            value: 1
          },
          {
            label: "已入仓(Vào nhà kho)",
            value: 2
          },
          {
            label: "已出仓(hết hàng)",
            value: 3
          }
        ]
      },
      {
        label: _this.$t("modifyFinished.delFlag"), // "删除状态",
        tip: "delete state",
        prop: "delFlag",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        clearable: false,
        dicData: [
          {
            label:  _this.$t("modifyFinished.notDelete") , // 未删除",
            value: false
          },
          {
            label:  _this.$t("modifyFinished.deleted") , // "已删除",
            value: true
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            if (!_this.tloading) {
              _this.query();
            }
          });
        }
      }
    ]
  };
}
export function secondCrud(_this) {
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
    showSummary: false,
    menuTitle: "称重",
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
        overHidden: true
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
        minRows: 0,
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
        overHidden: true,
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

export function splitForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    group: [
      {
        label: "原色布",
        prop: "old",
        icon: "el-icon-edit-outline",
        column: [
          {
            label:  _this.$t("codeCard.pidNo"), //疋号
            prop: "pidNo",
            span: 6,
            placeholder: " ",
            disabled: true
          },

          {
            label:  _this.$t("note.netWeight1"), //净重
            prop: "netWeight",
            span: 6,
            placeholder: " ",
            overHidden: true,
            precision: 1,
            clearable: false,
            type: "number",
            disabled: true,
            minRows: 0
            // change: val => {
            //   _this.$nextTick(() => {
            //     if (val.value >= _this.detail.netWeight) {
            //       _this.splitF.netWeightNew = 0;
            //       _this.splitF.netWeightNewLbs = 0;
            //       _this.splitF.netWeight = _this.detail.netWeight;
            //       _this.splitF.netWeightLbs = _this.splitF.netWeight * 2.2046;
            //       return;
            //     }
            //     _this.splitF.netWeightNew = Number(
            //       (_this.detail.netWeight - _this.splitF.netWeight).toFixed(1)
            //     );
            //     _this.splitF.netWeightNewLbs =
            //       _this.splitF.netWeightNew * 2.2046;
            //     _this.splitF.netWeightLbs = _this.splitF.netWeight * 2.2046;
            //   });
            // }
          },
          {
            label:  _this.$t("note.netWeightLbs1"), //净重
            prop: "netWeightLbs",
            span: 6,
            placeholder: " ",
            overHidden: true,
            clearable: false,
            type: "number",
            precision: 1,
            minRows: 0,
            disabled: true,
            change: val => {
              // _this.$nextTick(() => {
              //   if (val.value >= _this.detail.netWeight) {
              //     _this.splitF.netWeightNew = 0;
              //     _this.splitF.netWeight = _this.detail.netWeight;
              //     return;
              //   }
              //   _this.splitF.netWeightNew = Number(
              //     (_this.detail.netWeight - _this.splitF.netWeight).toFixed(1)
              //   );
              // });
            }
          },
          {
            label:  _this.$t("unit") ,//单位,
            prop: "weightUnit",
            span: 6,
            placeholder: " ",
            type: "select",
            clearable: false,
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
            change: val => {
              _this.$nextTick(() => {
                if (!val.value) {
                  return;
                }
                if (val.value == "KG") {
                  _this.splitOp.group[1].column[1].disabled = false;
                  _this.splitOp.group[1].column[2].disabled = true;
                } else {
                  _this.splitOp.group[1].column[1].disabled = true;
                  _this.splitOp.group[1].column[2].disabled = false;
                }
              });
            }
          }
        ]
      },
      {
        label: "新色布",
        prop: "new",
        icon: "el-icon-edit-outline",
        column: [
          {
            label:  _this.$t("codeCard.pidNo"), //疋号
            prop: "pidNoNew",
            span: 6,
            placeholder: " ",
            disabled: true
          },
          {
            label:  _this.$t("note.netWeight1"), //净重
            prop: "netWeightNew",
            span: 6,
            placeholder: " ",
            precision: 1,
            overHidden: true,
            clearable: false,
            disabled: false,
            type: "number",
            minRows: 0,
            change: val => {
              _this.$nextTick(() => {
                if (_this.splitF.weightUnit == "LBS") {
                  return;
                }
                if (val.value >= _this.detail.netWeight) {
                  _this.splitF.netWeight = 0;
                  _this.splitF.netWeightLbs = 0;
                  _this.splitF.netWeightNew = _this.detail.netWeight;
                  _this.splitF.netWeightNewLbs = _this.detail.netWeightLbs;
                  return;
                }
                _this.splitF.netWeight = Number(
                  (_this.detail.netWeight - val.value).toFixed(1)
                );
                _this.splitF.netWeightLbs = _this.splitF.netWeight * 2.2046;
                _this.splitF.netWeightNewLbs = val.value * 2.2046;
              });
            }
          },
          {
            label:  _this.$t("note.netWeightLbs1"), //净重
            prop: "netWeightNewLbs",
            span: 6,
            placeholder: " ",
            overHidden: true,
            clearable: false,
            type: "number",
            minRows: 0,
            disabled: false,
            precision: 1,
            change: val => {
              _this.$nextTick(() => {
                if (_this.splitF.weightUnit == "KG") {
                  return;
                }
                if (val.value >= _this.detail.netWeightLbs) {
                  _this.splitF.netWeight = 0;
                  _this.splitF.netWeightLbs = 0;
                  _this.splitF.netWeightNew = _this.detail.netWeight;
                  _this.splitF.netWeightNewLbs = _this.detail.netWeightLbs;
                  return;
                }
                _this.splitF.netWeightLbs = Number(
                  (_this.detail.netWeightLbs - val.value).toFixed(1)
                );
                _this.splitF.netWeight = _this.splitF.netWeightLbs / 2.2046;
                _this.splitF.netWeightNew = val.value / 2.2046;
              });
            }
          }
        ]
      }
    ]
  };
}
