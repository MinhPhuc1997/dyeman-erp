/*
 * @Author: Lyl
 * @Date: 2021-10-06 10:29:51
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-15 14:40:12
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 490px)",
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
        label: _this.$t("driving.carriageStorageCode"), //载具编号
        // tip: "缸号(số lô nhuộm)",
        prop: "whsCarriageStorageFk",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        dicData: getDicT(
          "whsCarriageStorage",
          "storageCode",
          "carriageStorageId"
        )
      },

      {
        label: _this.$t("driving.useTime"), //"使用时间",
        // tip: "开单日期(Ngày lập đơn)",
        prop: "useTime",
        width: 180,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      // {
      //   label: "使用类型",
      //   // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
      //   prop: "useType",
      //   width: 100,
      //   placeholder: " ",
      //   disabled: true,
      //   span: 6,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: 1,
      //       label: "出库"
      //     },
      //     {
      //       value: 2,
      //       label: "入库"
      //     },
      //     {
      //       value: 3,
      //       label: "周转"
      //     }
      //   ]
      // },
      {
        label:  _this.$t("driving.businessType"), //"业务类型",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "businessType",
        width: 100,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: [
          {
            value: "1",
            label:  _this.$t("driving.businessDic1"), //"送货单"
          },
          {
            value: "2",
            label:  _this.$t("driving.businessDic2"), //"入库单"
          },
          {
            value: "3",
            label:  _this.$t("driving.businessDic3"), //"发货单"
          },
          {
            value: "4",
            label:  _this.$t("driving.businessDic4"), //"织单"
          },
          {
            value: "5",
            label:  _this.$t("driving.businessDic5"), //"染单"
          }
        ]
      },
      {
        label: _this.$t("driving.businessCode"), //"业务编号",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "businessId",
        width: 180,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: getDicT("proBleadyeJob", "vatNo", "bleadyeJobId")
      }
    ]
  };
}

export function billCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 464px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
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
        label: _this.$t("driving.objectCode"), //"物品编号",
        // tip: "缸号(số lô nhuộm)",
        prop: "itemObjectId",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        dicData: getDicT("proBleadyeJob", "vatNo", "bleadyeJobId")
      },
      {
        label:  _this.$t("driving.objectType"), //"物品类型",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "itemSourceType",
        width: 100,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: [
          {
            value: "1",
            label: _this.$t("driving.businessDic5"), //"染整"
          }
          // {
          //   value: 2,
          //   label: "入库"
          // },
          // {
          //   value: 3,
          //   label: "周转"
          // }
        ]
      }
    ]
  };
}

let baseAreaZone = getDicT("baseAreaZone", "zoneName", "zoneCode");
export function taskCrud(_this) {
  return {
    menu: true,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 490px)",
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
      // {
      //   label: "任务类型",
      //   prop: "taskType",
      //   overHidden: true,
      //   width: 120,
      //   span: 6,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: 1,
      //       label: "出库"
      //     },
      //     {
      //       value: 2,
      //       label: "入库"
      //     },
      //     {
      //       value: 3,
      //       label: "周转"
      //     }
      //   ]
      // },
      {
        label: _this.$t("driving.sendTime"), //"发送时间",
        // tip: "开单日期(Ngày lập đơn)",
        prop: "sendTime",
        // width: 180,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      {
        label: _this.$t("driving.receiveTime"), //""响应时间",
        // tip: "开单日期(Ngày lập đơn)",
        prop: "receiveTime",
        // width: 180,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      {
        label: _this.$t("driving.taskState"), //"任务状态",
        prop: "taskState",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        dicData: [
          {
            value: 1,
            label: _this.$t("driving.taskDic1"), //"初始状态"
          },
          {
            value: 2,
            label: _this.$t("driving.taskDic2"), //"运输开始"
          },
          {
            value: 3,
            label: _this.$t("driving.taskDic3"), //"运输中"
          },
          {
            value: 99,
            label: _this.$t("driving.taskDic4"), //"已完成"
          }
        ]
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //"载具",
        prop: "carrierCode",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        overHidden: true,
        dicData: getDicT(
          "whsCarriageStorage",
          "storageCode",
          "carriageStorageId"
        )
      },
      {
        label: _this.$t("driving.taskStart"), //"起点",
        prop: "taskStart",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        dicData: baseAreaZone
      },
      {
        label: _this.$t("driving.taskEnd"), //"终点",
        prop: "taskEnd",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        dicData: baseAreaZone
      }
    ]
  };
}
