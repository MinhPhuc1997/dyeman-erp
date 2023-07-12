/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-27 16:47:17
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        tip: "lô nhuộm",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("markMng.markNo"), //唛头编号
        // tip: "markNo",
        prop: "markNo",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("po.poNo1"), //订单编号
        tip: "Mã số đơn hàng",
        prop: "poNo",
        span: 6,
        placeholder: " "
        // type: "select",
        // dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      }
    ]
  };
}

export function dlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "poNo",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("po.poStatus") ,//"订单狀態,
        prop: "poStatus",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

let cust = getDicT("basCustomer", "custName", "custCode");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // labelPosition: "top",
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        tip: "số lô nhuộm",
        prop: "vatNo",
        overHidden: true,
        width: 140,
        span: 6,
        rules: [
          {
            required: true,
            message: "请选择缸号(số lô nhuộm)",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = _this.$t('choiceTem.choiceTle');
          _this.choiceV = true;
        }
      },
      {
        label:  _this.$t("markMng.markNo"), //唛头编号
        prop: "markNo",
        overHidden: true,
        width: 150,
        span: 6,
        disabled: false,
        // rules: [
        //   {
        //     required: true,
        //     message: "请输入唛头编号",
        //     trigger: "blur"
        //   }
        // ],
        placeholder: " "
      },
      {
        label:  _this.$t("po.poNo1"), //订单编号
        tip: "Mã số đơn hàng",
        prop: "poNo",
        span: 6,
        placeholder: " ",
        width: 140,
        overHidden: true
        // type: "select",
        // dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        type: "select",
        dicData: cust,
        tip: "Khách hàng"
      },
      {
        label:  _this.$t("markMng.markCount"), //唛头数量
        // tip: "开单数量(Số lượng lập đơn)",
        prop: "markCount",
        width: 120,
        placeholder: " ",
        type: "number",
        minRows: 0,
        align: "right",
        span: 6
        // rules: [
        //   {
        //     required: true,
        //     message: "请输入唛头数量",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label:  _this.$t("markMng.fabricCode"), //面料编号
        tip: "mã vải",
        prop: "fabricCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " "
      },
      {
        label:  _this.$t("markMng.fabComponents"), //总成份
        tip: "thành phần",
        prop: "fabComponents",
        width: 250,
        overHidden: true,
        placeholder: " ",
        span: 12
      },

      {
        label: _this.$t("fabFabrics") ,//布种,
        tip: "mô tả vải",
        prop: "fabFabrics",
        width: 250,
        placeholder: " ",
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("colorName") ,//颜色,
        tip: "Màu",
        prop: "colorName",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label:  _this.$t("codeCard.factoryColorNo"), //工厂色号
        tip: "mã màu nhà máy",
        prop: "factoryColor",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("codeCard.custColorNo"), // "客户色号",
        tip: "mã màu KH",
        prop: "custColor",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label:  _this.$t("breadthBorder"), //连边门幅
        tip: "khổ rộng liền biên",
        prop: "sideFabWidth",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("breadthActual"), //实用门幅
        prop: "realFabWidth",
        tip: "khổ rộng thực dụng",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("gramWeightBefor") ,//洗前克重,
        prop: "beforeGramWeight",
        tip: "TL trước giặt",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("gramWeightAfter"), // 洗后克重
        prop: "afterGramWeight",
        tip: "TL sau giặt",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("codeCard.originPlace"), //产地
        tip: "nơi sản xuất",
        prop: "originPlace",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_yarnorigin")
      },
      {
        label:  _this.$t("remark") ,//备注,
        tip: "ghi chú",
        prop: "remark",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false,
        placeholder: " "
      },

      {
        label:  _this.$t("printedTime") ,//打印日期,
        tip: "打印日期(Ngày in)",
        prop: "markDate",
        placeholder: " ",
        width: 160,
        overHidden: true,
        hide: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      }
    ]
  };
}

export function cpForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "连边幅宽(inch)",
        tip: "连边幅宽(Khổ rộng Tiếp giáp)",
        prop: "proBreadthSide",
        width: 90,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "实用幅宽(inch)",
        tip: "实用幅宽(Thực dụng Tiếp giáp)",
        prop: "proBreadthActual",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("gramWeightBefor") ,//洗前克重(,
        tip: "洗前克重(Trước giặt Trọng lượng)",
        prop: "proWeightBefore",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
       label: _this.$t("gramWeightAfter") ,//洗后克重
        tip: "洗后克重(Sau giặt Trọng lượng)",
        prop: "proWeightAfter",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("shrinkLenth") ,//缩水-直缩(%)",
        tip: "缩水-直缩(Co rút ngang)",
        prop: "proShrinkVertical",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("shrinkWidth") ,//缩水-横缩(%)",
        tip: "缩水-横缩(Co rút ngang)",
        prop: "proShrinkHorizontal",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("shrinkNear") ,//扭度(%)"
        tip: "缩水-扭度(Độ méo)",
        prop: "proShrinkTwist",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("shrinkRotate") ,//缩水-循环(inch),
        tip: "缩水-循环(Tuần hoàn)",
        prop: "proShrinkLoop",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: _this.$t("hangDry") ,//缩水-挂干
        tip: "缩水-挂干(Treo khô)",
        prop: "proShrinkHangDry",
        width: 120,
        hide: true,
        span: 12,
        type: "switch",
        dicData: [
          {
            label: _this.$t("public.false"),
            value: false
          },
          {
            label: _this.$t("public.true"),
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: _this.$t("flatDry") ,//缩水-平干
        tip: "缩水-平干(Phơi phẳng)",
        prop: "proShrinkSafeDry",
        width: 120,
        hide: true,
        span: 12,
        type: "switch",
        dicData: [
          {
            label: _this.$t("public.false"),
            value: false
          },
          {
            label: _this.$t("public.true"),
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: _this.$t("throwDry") ,//缩水-抛干
        tip: "缩水-抛干(Vắt khô)",
        prop: "proShrinkThrowDry",
        width: 120,
        hide: true,
        span: 12,
        type: "switch",
        dicData: [
          {
            label: _this.$t("public.false"),
            value: false
          },
          {
            label: _this.$t("public.true"),
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: _this.$t("finalizeDesign.proShrinkWashDryCount") ,//洗抛次数
        tip: "缩水-洗抛次数(Số lần giặt và vắt)",
        prop: "proShrinkWashDryCount",
        width: 120,
        hide: true,
        span: 12,
        type: "number",
        placeholder: " "
      }
    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    rowKey: "salPooid",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true
      },
      {
        label: _this.$t("custName") ,//"客人名稱,
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("po.poDate") ,//"订单日期,
        prop: "poDate",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("po.poType") ,//"订单类别,
        prop: "poType",
        width: 110,
        type: "select",
        dicData: getDIC("sal_poType")
      },

      {
        label: _this.$t("po.poStatus") ,//"订单狀態,
        prop: "poStatus",
        width: 110,
        type: "select",
        dicData: getDIC("Status")
      }
    ]
  };
}
// compCrud
export function gyCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      // {
      //   label: _this.$t("loomSchedule.opCode") , //编号
      //   prop: "itemCode",
      //   width: 120,
      //   span: 6,
      //   cell: true
      // },
      {
        label:  _this.$t("testName") ,//项目,
        prop: "itemName",
        width: 400,
        span: 6,
        cell: true
      },
      // {
      //   label: "数据类型",
      //   prop: "dataStyle",
      //   width: 120,
      //   span: 6,
      //   cell: true,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: "string",
      //       label: "输入框"
      //     },
      //     {
      //       value: "boolean",
      //       label: "选择框"
      //     }
      //   ]
      // },
      {
        label: _this.$t("finalizeDesign.itemSet") ,//设定,
        prop: "itemSet",
        width: 120,
        span: 6,
        cell: true,
        slot: true,
        type: "number",
        precision: 2
        // overHidden: true,
      },
      {
        label: _this.$t("finalizeDesign.itemActual") ,//实际,
        prop: "itemActual",
        slot: true,
        width: 120,
        span: 6,
        type: "number",
        precision: 2,
        cell: true
        // overHidden: true,
      }
    ]
  };
}

export function pfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: _this.$t("finalizeDesign.materialCode") ,//物料编码
        prop: "materialCode",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " ",
        cell: true
      },
      {
        label: _this.$t("finalizeDesign.materialName") ,//物料名称
        prop: "materialName",
        width: 180,
        // overHidden: true,
        placeholder: " ",
        span: 6,
        cell: true
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "useAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("finalizeDesign.waterRatio") ,//浴比
        prop: "waterRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            _this.chooseData.waterAmount = Number(
              (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
            );
          });
        }
      },

      {
        label: _this.$t("finalizeDesign.waterAmount") ,//水量
        prop: "waterAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("finalizeDesign.diluteRatio") ,//开稀比例
        prop: "diluteRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("finalizeDesign.deliveryQuantity") ,//输送数量
        prop: "deliveryQuantity",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      }
    ]
  };
}
