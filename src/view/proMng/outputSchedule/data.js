/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:03:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-27 16:24:03
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import i18n from "@/lang/index";
const DIC = {
  VAILD: [
  {
      label:  i18n.t("true"), //是'
      value: '1'
  }, {
      label:  i18n.t("false"), //否'
      value: '0'
  }],
}
export function mainForm(_this) {
  return {
    submitBtn: true,
    submitText: "查询",
    emptyBtn: false,
    labelWidth: 150,
    menuSpan: 6,
    menuPostion: "right",
    menuBtn: true,
    column: [
      {
        label: _this.$t("weaveJobCode") , //"织造生产单号",
        prop: "weaveJobCode",
        width: 220,
        overHidden: true,
        sortable: true,
        fixed: false,
        span: 8
      },
      {
        label: "是否外发单",
        placeholder:" ",
        width: 170,
        prop: "isWorkOut",
        type: "select",
        dicData: DIC.VAILD,
        span:4,
        mock:{
          type:'dic',
        },
    },
    ]
  };
}

function num2Thousadth(r,v){
  return  v && Number(v).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 249px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },
      {
        label:_this.$t("weaveJobCode") ,//"织单号",
        prop: "weaveJobCode",
        width: 150,
        overHidden: true,
        fixed: true
      },
      {
        label: "是否外发单",
        prop: "isWorkOut",
        width: 110,
        type: "select",
        dicData: DIC.VAILD,
        formatter(r,v){
          return v && v.replace(/\B(?=[\d]{2}$)/g,"-")
        }
      },
      {
        label: "要求织胚数",
        prop: "amount",
        width: 110,
        align: "right",
        formatter: num2Thousadth,
      },
      // {
      //   label: "生产月份",
      //   prop: "recordMonth",
      //   width: 100,
      //   formatter(r,v){
      //     return v && v.replace(/^[\d]{4}(\B)[\d]{2}&/,"-")
      //   }
      // },
      {
        label: "总毛重",
        prop: "grossWeight",
        overHidden: true,
        width: 120,
        span: 6,
        align: "right",
        formatter: num2Thousadth
      },
      {
        label: "总净量",
        prop: "clothWeight",
        width: 100,
        overHidden: true,
        span: 6,
        align: "right",
        formatter: num2Thousadth
      },
      {
        label: "已称重",
        prop: "weightedQty",
        width: 100,
        overHidden: true,
        formatter: num2Thousadth,
        align: "right",
      },
      {
        label:  _this.$t("retMatNotice.isInStock"), //已入仓
        prop: "inStockQty",
        width: 100,
        overHidden: true,
        formatter: num2Thousadth,
        align: "right",
      },
      {
        label:  _this.$t("quality.hasOut"), //已出仓
        prop: "outStockQty",
        width: 100,
        overHidden: true,
        formatter: num2Thousadth,
        align: "right",
      },
      {
        label:  _this.$t("scan.qcTakeOuts"), //QC扣减数量
        prop: "qcDeductQty",
        overHidden: true,
        width: 120,
        align: "right",
        formatter: num2Thousadth,
      },
      {
        label: "订单与生产差额",
        prop: "diffQty",
        overHidden: true,
        width: 160,
        span: 6,
        align: "right",
        sortable: true,
        formatter: num2Thousadth,
        cell: true
        
      },

    ]
  };
}


