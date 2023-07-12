/*
 * @Author: Lyl
 * @Date: 2021-04-01 14:08:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-24 14:44:51
 * @Description:
 */

export function quality(_this) {
  return [
    {
      menuName: "一.胚布质检",
      index: "weightCheck",
      icon: "el-icon-set-up",
      children: [
        {
          menuName: "1.胚布称重",
          index: "scanWeight"
        },
        // {
        //   menuName: "2.胚布审核入库",
        //   index: "checkInWhse"
        // },
        {
          menuName: "2.胚布台账",
          index: "weight"
        },
        {
          menuName: "3.QC验布",
          index: "clothQc"
        },
        {
          menuName: "4.入仓通知单",
          index: "stkinMemo"
        }
      ]
    },
    {
      menuName: "二.成品质检",
      index: "finalCheck",
      icon: "el-icon-set-up",
      children: [
        {
          menuName: "1.成品码卡",
          index: "finalCard"
        },
        {
          menuName: "2.成品审核入库",
          index: "finishedCheck"
        },
        {
          menuName: "3.成品台账",
          index: "finishedCodeCard"
        },
        {
          menuName: "4.QA码卡打印",
          index: "codeCardQa"
        },
        {
          menuName: "5.QC验布",
          index: "finishedQc"
        },
        {
          menuName: "6.验布报告",
          index: "qcTestReport"
        },
        {
          menuName: "7.修改成品布",
          index: "modifyFinished"
        },
        {
          menuName: "8.入库细码单",
          index: "qcDetailReport"
        },
        {
          menuName: "9.QA计划进度",
          index: "qaCheckPlan"
        },
        {
          menuName: "10.QA产能统计",
          index: "qaProductionCapacity"
        },
        {
          menuName: "11.Excel细码表",
          index: "qcDetailReportByExcel"
        },
        {
          menuName: "12.异常报告总表",
          index: "qcAbnormalDaily"
        },
        {
          menuName: "13.QA剪办记录",
          index: "shearingBoard"
        },
        {
          menuName: "14.成品布合并",
          index: "clothMerge"
        },
        {
          menuName: "15.入仓通知单",
          index: "finishStkinMemo"
        },
        {
            menuName: "16.下栏码卡",
            index: "qtyButtonColumn"
        }
      ]
    },
    // {
    //   menuName: "三." + _this.$t("caidan.zlxmgl"),
    //   index: "qualityMng",
    //   icon: "el-icon-set-up"
    // },
    // {
    //   menuName: "四." + _this.$t("caidan.hysjc"),
    //   index: "Laboratory",
    //   icon: "el-icon-set-up"
    // },
    // {
    //   menuName: "五." + _this.$t("caidan.psgl"),
    //   index: "Color",
    //   icon: "el-icon-set-up"
    // },
    // {
    //   menuName: "六." + _this.$t("caidan.jctj"),
    //   index: "Count",
    //   icon: "el-icon-set-up"
    // },
    // {
    //   menuName: "七.质量检验标准",
    //   index: "Standard",
    //   icon: "el-icon-set-up"
    // },
    // {
    //   menuName: "八.检测项目基础定义",
    //   index: "testItem",
    //   icon: "el-icon-set-up"
    // },
    {
      menuName: "三.跟单管理",
      index: "ShipmentMng",
      icon: "el-icon-set-up",
      children: [
        {
          menuName: "1.唛头打印",
          index: "MarkMng"
        },
        {
          menuName: "2.码卡打印",
          index: "shipmentCodeCard"
        },
        {
          menuName: "3.送客办标签打印",
          index: "sendCustSpanPrint"
        },
        {
          menuName: "4.松布码卡",
          index: "qtyButtonColumn2"
        }
      ]
    }
    // {
    //   menuName: "十.成品码卡",
    //   index: "finishedCodeCard",
    //   icon: "el-icon-set-up"
    // }
  ];
}
