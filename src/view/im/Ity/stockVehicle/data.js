/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:15
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-12 16:37:50
 * @Description:
 */

import { getDIC, getXDicT, getDicT, postDicT, getDbDicT } from "@/config/index";
const crudCommConfig = {
  menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 245px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
}

export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "类型",
        prop: "type",
        span: 6,
        type: "select",
        clearable: false,
        dicData: [
          {
            value: 1,
            label: "胚布"
          },
          {
            value: 2,
            label: "成品布"
          }
        ],
        placeholder: " ",
        change: ({ value }) => {
          _this.$nextTick(() =>{
            _this.crudOp = value == 1 ?  noteOp(_this) : crudOp(_this);
            _this.formOp.column[2].display = value == 1 ? false : true
            _this.formOp.column[3].display = value == 2 ? false : true
            _this.getData();
          })
        }
      },
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "palletCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        display: true
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        display: true,
        labelWidth: 130
      },

      {
        label: "货位码",
        prop: "storageId",
        span: 6,
        placeholder: " "
      },
    ]
  };
}

export function crudOp(_this) {
  return {
    ...crudCommConfig,
    index: true,
    column: [
      
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 100,
        fixed: true
      },
      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        fixed: true
      },
      {
        label:  _this.$t("checkPlan.sumPid"), //总疋数
        prop: "piiCount",
        width: 80,
        span: 6,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "pidNos",
        width: 160,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("checkPlan.sumNw"), //总重量
        prop: "sumWeight",
        width: 80,
        span: 6,
        align: "right",
        placeholder: " "
      },
      
      
      {
        label: "疋重量",
        prop: "pidWeight",
        width: 200,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "货位码",
        prop: "storageId",
        cell: false,
        width: 120,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "WMS状态",
        prop: "status",
        cell: false,
        width: 100,
        overHidden: true,
        type: "select",
        dicData: [
          {
            value: 1,
            label: "组盘中"
          },
          {
            value: 2,
            label: "组盘完成"
          },
          {
            value: 3,
            label: "入库中"
          },
          {
            value: 4,
            label: "出库中"
          },
          {
            value: 5,
            label: "移库中"
          },
          {
            value: 6,
            label: "盘点中"
          },
          {
            value: 7,
            label: "在库"
          },
          {
            value: 8,
            label: "不在库"
          }
        ]
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label:  _this.$t("fabName"), //布料名称
        prop: "fabName",
        width: 250,
        overHidden: true,
        span: 6
      },
      {
        label:  _this.$t("colorName"), //顏色,
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "客人訂單號",
        prop: "custPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "本厂訂單號",
        prop: "salPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("workDate") ,//开單日期,
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliveDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("fabCode") ,//"布料编号,
        prop: "fabricCode",
        width: 100,
        overHidden: true,
        // sortable: true,
        span: 6
      },
      

      {
        label:  _this.$t("firstOrOther") ,//头缸/缸差,
        disabled: false,
        prop: "firstOrOther",
        width: 100,
        type: "switch",
        dicData: [
          {
            label:  _this.$t("firstVat") ,//头缸,
            value: "1"
          },
          {
            label:  _this.$t("otherVat") ,//缸差,
            value: "2"
          }
        ],
        hide: false,
        placeholder: " "
      },

     
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        width: 120,
        span: 8,
        cell: false,
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "breadth",
        width: 120,
        cell: false,
        span: 8,
        align: "left",
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}

export function noteOp(_this) {
  return {
    ...crudCommConfig,
    index: true,
    column: [
      {
        label: _this.$t("driving.carriageStorageCode"), //载具编号,
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 100,
        fixed: true
      },
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        fixed: true
      },
      {
        label:  _this.$t("checkPlan.sumPid"), //总疋数
        prop: "pidCount",
        width: 80,
        span: 6,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("codeCard.pidNo"), //疋号
        prop: "pidNos",
        width: 160,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("note.storeSiteCode"), //存储位置
        prop: "storageId",
        cell: false,
        width: 120,
        overHidden: true,
        placeholder: " "
      },
      
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label: _this.$t("fabCode") ,//"布料编号,
        prop: "custFabricCode",
        width: 100,
        overHidden: true,
        // sortable: true,
        span: 6
      },
      {
        label:  _this.$t("fabName"), //布料名称
        prop: "fabricDesc",
        width: 250,
        overHidden: true,
        span: 6
      },


      {
        label:  _this.$t("colorName"), //顏色,
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "客人訂單號",
        prop: "custPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "本厂訂單號",
        prop: "salPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        width: 120,
        span: 8,
        cell: false,
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("breadth"), //幅宽,
        prop: "breadth",
        width: 120,
        cell: false,
        span: 8,
        align: "left",
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}
