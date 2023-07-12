/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-12 14:58:07
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        tip: "缸号(số lô nhuộm)",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("custName")  ,//"客户名称",
        tip: "Khách hàng",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: _this.$t("weaveJobCode") , //"织造通知单",
        prop: "weaveJobCode",
        tip: "织造通知单(Mã đơn dệt)",
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("workDate") ,//开单日期,
        tip: "开单日期(Ngày lập đơn)",
        prop: "startJobDate",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " "
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
        prop: "custId",
        span: 6,
        placeholder: " ",
        type: "tree",
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

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelPosition: "top",
    labelWidth: 130,
    index: true,
    column: [
      {
        label: _this.$t("vatNo") ,//"缸号",
        tip: "缸号(số lô nhuộm)",
        prop: "vatNo",
        overHidden: true,
        width: 140,
        fixed: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入缸号(số lô nhuộm)",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = _this.$t('choiceTem.runJob');
          _this.choiceV = true;
        }
      },
      {
        label: _this.$t("weaveJobCode") , //"织造通知单",
        prop: "weaveJobCode",
        tip: "织造通知单(Mã đơn dệt)",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " "
        // click: () => {
        //   _this.choiceTle = _this.$t("choiceTem.weaveJobCode");
        //   _this.choiceV = true;
        // }
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
        rules: [
          {
            required: true,
            message: "请输入客户",
            trigger: "blur"
          }
        ],
        tip: "客户(Khách hàng)"
      },
      {
        label: _this.$t("workDate") ,//开单日期,
        tip: "开单日期(Ngày lập đơn)",
        prop: "startJobDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇开单日期(Ngày lập đơn)",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("clothWeight") , // "开单数量(kg)",
        tip: "开单数量(Số lượng lập đơn)",
        prop: "jobAmount",
        width: 120,
        placeholder: " ",
        type: "number",
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入开单数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("poAmountKg") , //"订单数(kg)",
        tip: "订单数(Số lượng đơn hàng)",
        prop: "salPpAmount",
        width: 100,
        placeholder: " ",
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入订单数",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("pidCount")  ,//"疋数,
        tip: "疋数(Cây)",
        prop: "pidCount",
        width: 80,
        placeholder: " ",
        align: "right",
        type: "number",
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请输入疋数",
        //   trigger: "blur"
        // }],
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        tip: "交货日期(Ngày giao hàng)",
        prop: "goodsDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true
        // rules: [{
        //   required: true,
        //   message: "请選擇交货日期",
        //   trigger: "blur"
        // }],
      },
      {
        label: _this.$t("poVatCount") ,// "总缸数",
        tip: "总缸数(Tổng cộng Lô nhuộm)",
        prop: "vatCount",
        width: 90,
        placeholder: " ",
        align: "right",
        type: "number",
        span: 6
      },
      {
        label:  _this.$t("vatIndex") ,// "第几缸",
        tip: "第几缸(Bồn thứ Một vài Lô nhuộm)",
        prop: "vatIndex",
        width: 110,
        placeholder: " ",
        align: "right",
        type: "number",
        span: 6
      },
      {
        label:  _this.$t("address") ,//交货地址,
        tip: "交货地址(Địa chỉ giao hàng)",
        prop: "deliveryAddress",
        width: 250,
        placeholder: " ",
        overHidden: true,
        span: 12
      },

      {
        label: _this.$t("colorName") ,//颜色,
        tip: "颜色(Màu)",
        prop: "colorName",
        width: 100,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("colorCode") ,//"色号",
        tip: "色号(Số màu)",
        prop: "colorCode",
        width: 120,
        overHidden: true,
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("poColorCount") ,//"颜色数量",
        tip: "颜色数量(Tổng cộng Màu)",
        prop: "colorCount",
        labelWidth: 130,
        width: 100,
        placeholder: " ",
        align: "right",
        type: "number",
        span: 4
      },
      {
        label: _this.$t("finalizeDesign.styleDptRework") ,//"定型部返工",
        prop: "styleDptRework",
        labelWidth: 120,
        width: 120,
        placeholder: " ",
        align: "right",
        type: "switch",
        dicData: [
          {
            label: _this.$t("public.false"),
            value: false
          },
          {
            label: _this.$t("public.true"),
            value: true
          },
        ],
        span: 4
      },
      {
        label: _this.$t("finalizeDesign.finishJobOption") ,//"定型类型",
        tip: "成品/干布(thành phẩm/vải khô)",
        prop: "finishJobOption",
        width: 120,
        labelWidth: 100,
        hide: true,
        span: 4,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: "成品",
            label:  _this.$t("finalizeDesign.finishJobOptionDic1") ,//"成品"
          },
          {
            value: "干布",
            label: _this.$t("finalizeDesign.finishJobOptionDic2") ,//"干布"
          },
          {
            value: "预定",
            label: _this.$t("finalizeDesign.finishJobOptionDic3") ,//"预定"
          },
          {
            value: "成品加色",
            label: _this.$t("finalizeDesign.finishJobOptionDic4") ,//"成品加色"
          },
          {
            value: "颜色回修",
            label: _this.$t("finalizeDesign.finishJobOptionDic5") ,//"颜色回修"
          }
        ]
      },

      {
        label: _this.$t("finalizeDesign.dyeAfterBreadth") ,//"出缸幅宽(inch)",
        prop: "dyeAfterBreadth",
        width: 120,
        hide: true,
        align: "right",
        type: "number",
        span: 6,
        placeholder: " ",
        tip: "出缸幅宽(Khổ rộng)"
      },
      {
        label:  _this.$t("finalizeDesign.dyeAfterWeight") ,//"出缸克重(g/m2)",
        prop: "dyeAfterWeight",
        width: 120,
        hide: true,
        align: "right",
        type: "number",
        span: 6,
        placeholder: " ",
        tip: "出缸克重(Trọng lượng )"
      },
      {
        label: _this.$t("fabName") ,//""布类
        tip: "布类(Loại vải)",
        prop: "fabricName",
        width: 250,
        placeholder: " ",
        overHidden: true,
        span: 12
      },
      {
        label:  _this.$t("finalizeDesign.dryClothBreadth") ,// "干布幅宽(inch)",
        prop: "dryClothBreadth",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "干布幅宽(Khổ rộng)"
      },
      {
        label:  _this.$t("finalizeDesign.dryClothWeight") ,//  "干布克重(g/m2)",
        prop: "dryClothWeight",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "干布克重(Trọng lượng )"
      },
      {
        label: _this.$t("fabElements") ,// "成份",
        tip: "成份(Thành phần)",
        prop: "fabricCompone",
        width: 250,
        hide: true,
        placeholder: " ",
        span: 12
      },

      {
        label: _this.$t("finalizeDesign.dryClothItems") ,//  "干布交后整",
        prop: "dryClothItems",
        tip: "干布交后整(Sau khi vải khô giao hoàn chỉnh)",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: "抓毛",
            label: _this.$t("finalizeDesign.dryClothItemsDic1") ,// "抓毛"
          },
          {
            value: "磨毛",
            label: _this.$t("finalizeDesign.dryClothItemsDic2") ,//"磨毛"
          },
          {
            value: "剪毛",
            label: _this.$t("finalizeDesign.dryClothItemsDic3") ,//"剪毛"
          },
          {
            value: "刷毛",
            label: _this.$t("finalizeDesign.dryClothItemsDic4") ,//"刷毛"
          },
          {
            value: "烧毛",
            label: _this.$t("finalizeDesign.dryClothItemsDic5") ,//"烧毛"
          },
          {
            value: "特殊手感",
            label: _this.$t("finalizeDesign.dryClothItemsDic6") ,//"特殊手感"
          }
        ]
      },
      {
        label:  _this.$t("finalizeDesign.setStyleTemp") ,//"温度(°C)",
        prop: "setStyleTemp",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "温度(Nhiệt độ)"
      },
      {
        label:  _this.$t("finalizeDesign.plungeWaterPascal") ,//"轧车压力(Mpa)",
        prop: "plungeWaterPascal",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "轧车压力(Áp lực xe)"
      },
      {
        label:  _this.$t("finalizeDesign.mustPreshrunk") ,//"是否预缩",
        tip: "是否预缩(Trước khi thu nhỏ)",
        prop: "mustPreshrunk",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " ",
        type: "switch",
        dicData: [
          [
            {
              label: _this.$t("public.false"),
              value: false
            },
            {
              label: _this.$t("public.true"),
              value: true
            }
          ]
        ]
      },
      {
        label: _this.$t("finalizeDesign.skewDegree") ,//"斜度",
        prop: "skewDegree",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
        // tip: "轧车压力(Áp lực xe)"
      },
      {
        label: _this.$t("finalizeDesign.skewDegreeUnit") ,//"斜度单位",
        prop: "skewDegreeUnit",
        width: 120,
        hide: true,
        span: 6,
        type: "select",
        dicData: getDIC("sal_breadthUnit"),
        placeholder: " "
        // tip: "轧车压力(Áp lực xe)"
      },
      {
        label:  _this.$t("weaveFactoryName") ,//织厂,
        prop: "weaveFactoryCode",
        tip: "织厂(Xưởng dệt)",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "S.POWER",
            value: "S.POWER"
          },
          {
            label: "Rise Sun",
            value: "Rise Sun"
          }
        ]
      },
      {
        label: _this.$t("finalizeDesign.auditor") ,//"审批",
        tip: "审批(Xét duyệt)",
        prop: "auditor",
        width: 100,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("orderMan") ,//开单员,
        tip: "开单员(Người lập đơn)",
        prop: "jobCreator",
        width: 100,
        placeholder: " ",
        span: 6,
        disabled: true
      },

      {
        label:  _this.$t("printDate") ,//"列印日期",
        tip: "列印日期(Ngày in)",
        prop: "printDate",
        placeholder: " ",
        width: 160,
        disabled: true,
        overHidden: true,
        hide: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: true
      },
      {
        label:  "批色编号" ,//备注,
        // tip: "审批(Xét duyệt)",
        prop: "remark",
        type:"select",
        width: 100,
        placeholder: " ",
        span: 6
      },
      {
        label:  _this.$t("remark") ,//备注,
        // tip: "审批(Xét duyệt)",
        prop: "remark",
        width: 100,
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("createTime") ,//創建日期,
        prop: "createTime",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      },

      {
        label: _this.$t("updateTime") ,//修改日期,
        prop: "upateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
        hide: true,
        display: false
      }
    ],
    group: [
      {
        icon: "el-icon-s-order",
        label:_this.$t("finalizeDesign.group1") ,// "织造通知单信息",
        prop: "group1",
        column: [
          {
            label: _this.$t("tubeDiam") ,//筒径,
            tip: "筒径(Khổ máy)",
            prop: "tubeDiam",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            // type: "number",
            align: "right"
          },
          {
            label: _this.$t("needleDist") ,//"针距(G)",
            tip: "针距(Khoảng cách kim)",
            prop: "needleDist",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            // type: "number",
            align: "right"
          },
          {
            label:  _this.$t("yarnLength") ,//紗長,
            tip: "紗長(Độ dài sợi)",
            prop: "yarnLength",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },
          {
            label:  _this.$t("yarnCard"), //纱牌,
            tip: "纱牌(Nhãn hiệu sợi)",
            prop: "yarnCard",
            span: 6,
            width: 120,
            placeholder: " ",
            hide: true
          },
          {
            label:  _this.$t("yarnBatch"), //纱批,
            tip: "纱批(Lot sợi)",
            prop: "yarnNumber",
            span: 6,
            width: 120,
            placeholder: " ",
            hide: true
          },
          {
            label: _this.$t("factoryYarnBatch") ,//本厂纱批
            tip: "本厂纱批(Lot sợi nhà máy)",
            prop: "yarnCylinderNumber",
            span: 6,
            width: 120,
            placeholder: " ",
            hide: true
          },
          {
            label: _this.$t("clothBreadth") ,//"胚布幅宽(inch)",
            tip: "胚布幅宽(Khổ rộng vải mộc)",
            prop: "calicoBreadth",
            width: 90,
            hide: true,
            span: 6,
            // type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: _this.$t("clothGramWeight") ,// "胚布克重(g/m2)",
            tip: "胚布克重(Trọng lượng vải mộc)",
            prop: "calicoWeight",
            width: 120,
            hide: true,
            span: 6,
            align: "right",
            // type: "number",
            placeholder: " "
          }
        ]
      },
      {
        icon: "el-icon-s-order",
        label:  _this.$t("finalizeDesign.group2") ,//"成品规格要求",
        prop: "group2",
        column: [
          {
            label: _this.$t("breadthBorder"),  //"连边幅宽(inch)",
            tip: "连边幅宽(Khổ rộng Tiếp giáp)",
            prop: "proBreadthSide",
            width: 90,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: _this.$t("breadthActual"), // "实用幅宽(inch)",
            tip: "实用幅宽(Thực dụng Tiếp giáp)",
            prop: "proBreadthActual",
            width: 120,
            hide: true,
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
            // type: "switch",
            // dicData: [
            //   {
            //     label: _this.$t("public.false"),
            //     value: false
            //   },
            //   {
            //     label: _this.$t("public.true"),
            //     value: true
            //   }
            // ],
            placeholder: " "
          },
          {
            label: _this.$t("flatDry") ,//缩水-平干
            tip: "缩水-平干(Phơi phẳng)",
            prop: "proShrinkSafeDry",
            width: 120,
            hide: true,
            span: 6,
            // type: "switch",
            // dicData: [
            //   {
            //     label: _this.$t("public.false"),
            //     value: false
            //   },
            //   {
            //     label: _this.$t("public.true"),
            //     value: true
            //   }
            // ],
            placeholder: " "
          },
          {
            label: _this.$t("throwDry") ,//缩水-抛干
            tip: "缩水-抛干(Vắt khô)",
            prop: "proShrinkThrowDry",
            width: 120,
            hide: true,
            span: 6,
            // type: "switch",
            // dicData: [
            //   {
            //     label: _this.$t("public.false"),
            //     value: false
            //   },
            //   {
            //     label: _this.$t("public.true"),
            //     value: true
            //   }
            // ],
            placeholder: " "
          },
          {
            label: _this.$t("finalizeDesign.proShrinkWashDryCount") ,//洗抛次数
            tip: "缩水-洗抛次数(Số lần giặt và vắt)",
            prop: "proShrinkWashDryCount",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            placeholder: " "
          }
        ]
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
        prop: "sn",
        width: 50,
        align: "center",
        cell: true,
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
    height: "calc(50vh - 100px)",
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
        label: _this.$t("finalizeDesign.bleadyeType") ,//工艺类型
        prop: "bleadyeType",
        // overHidden: true,
        width: 120,
        span: 6,
        cell: true,
        type: "select",
        clearable: false,
        dicData: [
          {
            label: _this.$t("finalizeDesign.add_chemicalmat") ,//增加助剂
            value: "add_chemicalmat"
          },
          {
            label: _this.$t("finalizeDesign.add_pigment") ,//加颜料
            value: "add_pigment"
          },
          {
            label: _this.$t("finalizeDesign.run") ,//运行
            value: "run"
          }
        ],
        // change: (val) => {
        //   if (val == 'run') {
        //     return
        //   }
        //   _this.$nextTick(() => {
        //     _this.remoteMethod1(_this.chooseData.materialCode)
        //   })
        // }
      },
      {
        label: _this.$t("finalizeDesign.materialCode") ,//物料编码
        prop: "materialCode",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: " ",
        // cell: true
      },
      {
        label: _this.$t("finalizeDesign.materialName") ,//物料名称
        prop: "materialName",
        width: 400,
        // overHidden: true,
        placeholder: " ",
        span: 6,
        cell: true,
        orverHidden:true,
        slot: true,
      },
      {
        label: _this.$t("finalizeDesign.formulaFactor") ,//"配方(g/L)",
        prop: "formulaFactor",
        width: 120,
        placeholder: " ",
        type: "number",
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            if (_this.chooseData.formulaFactor === 0) {
              _this.chooseData.waterAmount = 0;
            } else {
              if(_this.chooseData.waterAmount!==0){
                _this.chooseData.useAmount = Number(
                  ((_this.chooseData.formulaFactor * _this.chooseData.waterAmount) /1000).toFixed(1)
                );
              }else if(_this.chooseData.useAmount!==0){
                _this.chooseData.waterAmount = Number(
                  (
                    (_this.chooseData.useAmount * 1000) /
                    _this.chooseData.formulaFactor
                  ).toFixed(1)
                );
              }
            }
          });
        }
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "useAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            if (_this.chooseData.formulaFactor === 0) {
              _this.chooseData.waterAmount = 0;
            } else {
              _this.chooseData.waterAmount = Number(
                (
                  (_this.chooseData.useAmount * 1000) /
                  _this.chooseData.formulaFactor
                ).toFixed(1)
              );
            }
          });
          //   _this.chooseData.waterAmount = Number(
          //     (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
          //   );
        }
      },
      {
        label: _this.$t("finalizeDesign.waterRatio") ,//浴比
        prop: "waterRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          // _this.$nextTick(() => {
          //   _this.chooseData.waterAmount = Number(
          //     (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
          //   );
          // });
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
        // maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            if (_this.chooseData.formulaFactor != 0 || _this.chooseData.waterAmount!=0) {
              _this.chooseData.useAmount = Number(
                ((_this.chooseData.formulaFactor * _this.chooseData.waterAmount) /1000).toFixed(1)
              );
            }
          });
          //   _this.chooseData.waterAmount = Number(
          //     (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
          //   );
        }
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
