/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-19 08:21:00
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getXDicT("basCustomer");
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
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
        // formslot: true,
        // slot: true,
        // type: "select",
        // tip: "MS đơn sản xuất bp Dệt"
      },
      // {
      //   label: _this.$t("poNo"), //"訂單號",
      //   prop: "poNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Số đơn hàng"
      // },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        span: 6,
        placeholder: " "
        // tip: "Mã vải"
      },
      // {
      //   label: "机號",
      //   prop: "loomNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Mã máy"
      // },
      // {
      //   label:  _this.$t("eachNumber"), //"匹號",
      //   prop: "eachNumber",
      //   width: 80,
      //   align: "right",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Số cây vải"
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
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 267px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        // type: "select",
        // dicData: getDicT("proBleadyeJob", "vatNo", "vatNo", {}, "vatNo"),
        // filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        placeholder: "請输入缸號",
        type: "select",
        formslot: true,
        rules: [
          {
            required: true,
            message: "請输入缸號",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "pidNo",
        width: 70,
        span: 6,
        type: "number",
        tip: "Số cây",
        align: "left",
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        // tip: "Số lô nhuộm",
        overHidden: true,
        placeholder: " ",
        width: 160,
        span: 6
      },
      {
        label:  _this.$t("note.yardLength"), //码长
        tip: "Chiều dài sợi",
        prop: "yardLength",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        minRows: 0,
        placeholder: " "
      },
      {
        label:  _this.$t("note.grossWeight1"), //浮重(KG)
        tip: "Trọng lượng bì(KG)",
        prop: "grossWeight",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label:  _this.$t("note.paperTube1"), //纸筒重量
        tip: "Trọng lượng thoi giấy",
        prop: "paperTube",
        width: 100,
        span: 6,
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
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label:  _this.$t("note.netWeight1"), //净重
        tip: "trọng lượng tịnh(KG)",
        prop: "netWeight",
        width: 100,
        span: 6,
        precision: 1,
        type: "number",
        minRows: 0,
        align: "left",
        placeholder: " "
      },
      {
        label:  _this.$t("note.grossWeightLbs1"), //浮重(磅
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " ",
        change: () => {}
      },
      {
        label:  _this.$t("note.netWeightLbs1"), //净重(磅)
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",

        placeholder: " "
      },
      {
        label:  _this.$t("note.weightUnit"), //重量单位
        tip: "đơn vị trọng lượng",
        prop: "weightUnit",
        width: 100,
        span: 6,
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
        label:  _this.$t("po.poNo1"), //订单编号
        prop: "poNo",
        tip: "SỐ P.O",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 6
      },
      {
        label:  _this.$t("codeCard.custPoNo"), //客人订单号
        prop: "custPoNo",
        tip: "PO khách hàng",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 6
      },
      {
        label:  _this.$t("custCode"), //客戶名称,
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust,
        props: {
          value: "custCode",
          label: "custName"
        }
      },
      {
        label:  _this.$t("codeCard.styleNo"), //款号
        tip: "#STLYLE NO",
        prop: "styleNo",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      // {
      //   label: "客布代码",
      //   // tip: "Số màu",
      //   prop: "guestFabId",
      //   width: 150,
      //   span: 6,
      //   overHidden: true,
      //   placeholder: " "
      // },

      {
        label:  _this.$t("colorName"), //顏色名稱,
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6
      },
      // {
      //   label:  _this.$t("codeCard.custColorNo"), //客色号
      //   tip: "Số màu",
      //   prop: "custColorNo",
      //   placeholder: " ",
      //   width: 180,
      //   overHidden: true,
      //   span: 6
      // },
      // {
      //   label:  _this.$t("codeCard.factoryColorNo"), //工厂色号
      //   tip: "Số màu nhà máy",
      //   prop: "factoryColorNo",
      //   placeholder: " ",
      //   width: 180,
      //   overHidden: true,
      //   span: 6
      // },
      // {
      //   label:  _this.$t("fabName"), //布类名称,
      //   tip: "Loại vải",
      //   prop: "fabName",
      //   width: 100,
      //   span: 12,
      //   placeholder: " ",
      //   overHidden: true
      // },
      // {
      //   label:  _this.$t("codeCard.guestComponents"), //成份要求
      //   tip: "Thành phần",
      //   prop: "guestComponents",
      //   width: 100,
      //   span: 12,
      //   placeholder: " ",
      //   overHidden:true
      // },

      {
        label:  _this.$t("codeCard.gramWeight"), //克重(
        tip: "Trọng lượng trước giặt",
        prop: "gramWeight",
        overHidden: true,
        width: 120,
        span: 6,
        // type: "number",
        align: "left",
        placeholder: " "
        // change: () => {
        // _this.codeLength();
        //  }
      },
      {
        label:  _this.$t("codeCard.afterWeightDsp"), //克重(
        tip: "Trọng lượng sau giặt",
        prop: "afterWeightDsp",
        width: 120,
        span: 6,
        overHidden: true,
        // type: "number",
        align: "left",
        placeholder: " "
        // change: () => {
        // _this.codeLength();
        //  }
      },
      {
        label:  _this.$t("note.realGramWeight1"), //实际克重
        tip: "Trọng lượng thực tế",
        prop: "realGramWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("codeCard.gramWeightUnit"), //克重单位
        tip: "Đơn vị trọng lượng",
        prop: "gramWeightUnit",
        width: 100,
        span: 6,
        type: "select",
        overHidden: true,
        // dicData: matUnit,
        dicData: [
          {
            label: "g/m²",
            value: "g"
          }
          // {
          //   label: "Kg/m²",
          //   value: "Kg"
          // }
        ],
        placeholder: " ",
        change: () => {
          // _this.$nextTick(() => {
          //   _this.codeLength();
          // });
        }
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 100,
        span: 6,
        // type: "number",
        align: "left",
        overHidden: true,
        placeholder: " "
        // change: () => {
        //   _this.codeLength();
        // }
      },
      {
        label:  _this.$t("codeCard.clothWidth"), //实际幅宽
        tip: "Khổ rộng vải mộc",
        prop: "clothWidth",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true,
        change: () => {
          // _this.$nextTick(() => {
          //   _this.codeLength();
          // });
        }
      },
      {
        label:  _this.$t("codeCard.widthUnit"), //幅宽单位
        tip: "Đơn vị khổ rộng",
        prop: "widthUnit",
        width: 100,
        span: 6,
        type: "select",
        // dicData: matUnit,
        dicData: getDIC("sal_breadthUnit"),
        placeholder: " ",
        change: () => {
          // _this.$nextTick(() => {
          //   _this.codeLength();
          // });
        }
      },

      // {
      //   label: "布封",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "clothWidth",
      //   width: 100,
      //   span: 6,
      //   type: "number",
      //   align: "left",
      //   placeholder: " "
      // },
      // {
      //   label: "布封单位",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "widthUnit",
      //   width: 100,
      //   span: 6,
      //   type: "select",
      //   dicData: getDIC("sal_breadthUnit"),
      //   placeholder: " "
      // },

      {
        label:  _this.$t("codeCard.etNo"), //ET号
        prop: "etNo",
        tip: "mã ET",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false
      },
      {
        label:  _this.$t("contractNo") ,//合同号,
        prop: "contractNo",
        tip: "Số hợp đồng",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        overHidden: true
      },
      {
        label:  _this.$t("codeCard.originPlace"), //产地
        prop: "originPlace",
        tip: "xưởng sản xuất",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        type: "select",
        dicData: getDIC("bas_yarnorigin")
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "storeLoadCode",
        tip: "Mã lồng thép",
        width: 100,
        span: 6,
        overHidden: true,
        align: "left",
        placeholder: " "
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storeSiteCode",
        tip: "Vị trí lưu trữ",
        width: 100,
        span: 6,
        placeholder: " ",
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label:  _this.$t("clothFly.clothChecker"), //验布工号
        prop: "clothChecker",
        tip: "Số thẻ người kiểm tra",
        span: 6,
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.clothCheckTime"), //"验布时间
        prop: "clothCheckTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        tip: "thời gian in",
        placeholder: " ",
        align: "center",
        width: 180
      },
      // {
      //   label:  _this.$t("codeCard.basePrintTemplate"), //打印模板
      //   // tip: "Tổng cộng(KG)",
      //   prop: "basePrintTemplateFk",
      //   tip: "In mẫu",
      //   width: 100,
      //   span: 6,
      //   type: "select",
      //   props: {
      //     label: "tempTitle",
      //     value: "tempId"
      //   },
      //   dicData: getXDicT("basePrintTemplate/list"),
      //   placeholder: " "
      // },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        width: 250,
        tip: "ghi chú",
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
        // dicData: getDicT("qcClothCheckItem", "itemName", "itemName")
        dicData: []
      }
    ]
  };
}
