/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-01-09 09:32:17
 * @Description:
 */
import { getDIC, getDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("weaveJobCode") , //"織單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
      },
      {
        label: _this.$t("poNo"), //"訂單號",
        prop: "poNo",
        span: 6,
        placeholder: " ",
        tip: "Số đơn hàng"
      },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
        tip: "Mã vải"
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
        label:  _this.$t("note.clothState"), //"胚布状态
        tip: "clothState",
        prop: "clothState",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label:  _this.$t("quality.notWeight"), //未称重
            value: 0
          },
          {
            label:  _this.$t("quality.weighed"), //已称重装笼
            value: 1
          },
          {
            label:  _this.$t("retMatNotice.isInStock"), //已入仓
            value: 2
          },
          {
            label:  _this.$t("quality.hasOut"), //已出仓
            value: 3
          }
        ],
        change: () => {
          _this.crud = [];
          _this.page.currentPage = 1;
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label:  _this.$t("quality.outworkFlag"), //
        prop: "outworkFlag",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: _this.$t("public.true"),
            value: true
          },
          {
            label: _this.$t("public.false"),
            value: false
          },

        ],
      },
      {
        label:  _this.$t("note.clothCheckTime"), //"验布时间
        prop: "clothCheckTime",
        type: "datetimerange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 12,
        tip: "thời gian in",
        placeholder: " ",
        align: "center",
        width: 180,
        sortable: true
      },
      {
        label:  _this.$t("shearingBoard.invStoreLoadCode"), //盘点载具号"
        tip: "Mã pallet",
        prop: "invStoreLoadCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120
      },
      {
        label:  _this.$t("shearingBoard.invLocationCode"), //盘点货位码
        tip: "Vị trí hàng",
        prop: "invLocationCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120
      },
      {
        label:  _this.$t("shearingBoard.invDate"), //盘点时间
        prop: "invDate",
        type: "datetimerange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 12,
        tip: "thời gian in",
        placeholder: " ",
        align: "center",
        width: 180,
        sortable: true
      },
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
    highlightCurrentRow: true,
    height: "calc(100vh - 350px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    index: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "trọng lượng",
    excelBtn: false,
    rowKey: "noteId",
    sumColumnList: [
      {
        label:  _this.$t("grossWeight") ,//毛重,
        name: "clothWeight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      {
        label: _this.$t("weaveJobCode") , //"織單號(MS đơn sản xuất bp Dệt)",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.perching"), //验布记录
        prop: "perching",
        width: 250,
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("note.poNo"), //訂單號
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.noteCode"), //布票號
        prop: "noteCode",
        width: 170,
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("note.fabricName"), //布类名称
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: false
      },
      {
        label:  _this.$t("note.colorName"), //顏色
        prop: "proColor",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("note.loomNo"), //机号
        prop: "loomNo",
        width: 95,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true,
        sortable: true
      },
      {
        label:  _this.$t("note.workNo"), //值机工号
        prop: "workNo",
        span: 8,
        placeholder: " ",
        width: 150,
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
        label:  _this.$t("note.eachNumber"), //匹號
        prop: "eachNumber",
        width: 105,
        align: "right",
        sortable: true,
        span: 6,
        type: "number"
      },
      {
        label:  _this.$t("note.realWeight"), //毛重
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.zl") + "(trọng lượng)",
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        formatter(r,v){
          return v || r.realWeight || 0
        },
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label:  _this.$t("note.qcTakeOut"), //QC扣减数量
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label:  _this.$t("note.clothLengthValue"), //米长
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("scan.outputValue"), //产值
        prop: "measureWage",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("note.storeLoadCode"), //载具编号(Mã lồng thép
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
        label:  _this.$t("quality.printedTime"), //打印时间
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label:  _this.$t("note.clothCheckTime1"), //验布时间
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label:  _this.$t("scan.invUser"), //盘点用户
        prop: "invUser",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("scan.invFlag"), //盘点确认标志
        prop: "invFlag",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("scan.invStoreLoadCode"), //盘点载具编号
        prop: "invStoreLoadCode",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("shearingBoard.invLocationCode"), //盘点货位码
        prop: "invLocationCode",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("shearingBoard.invDate"), //盘点时间
        prop: "invDate",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 200
      },
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
        label: _this.$t("weaveJobCode") , //"織單號",
        prop: "weaveJobCode",
        span: 8,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("noteCode"), //"布票編號",
        prop: "noteCode",
        span: 8,
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("note.clothLengthValue"), //米长
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        disabled: true,
        // sortable: true,
        type: "number",
        width: 100
      },
      {
        label:  _this.$t("grossWeight") ,//毛重,
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 8,
        cell: false,
        disabled: true,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            _this.clothLength();
          });
        },
        type: "number",
        // precision: 1
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 8,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut) + Number(_this.detail.paperTube || 0)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label:  _this.$t("note.paperTube1"), //纸筒重量
        prop: "paperTube",
        width: 160,
        align: "right",
        span: 8,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut) + Number(_this.detail.paperTube || 0)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label:  _this.$t("scan.qcTakeOuts"), //QC扣减数量
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 8,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut) + Number(_this.detail.paperTube || 0)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
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
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
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
    //hisId 
    //weightUnit machineCode  gramWeight loomNo workNo breadth madeDate isPrinted  printedTime breadthValue breadthUnit  outworkFlag  createTime creator  

    column: [
      {
        label: "机台编号(Mã máy)",
        prop: "machineCode",
        width: 90,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false
      },

      // {
      //   label: "机号(Số máy)",
      //   prop: "loomNo",
      //   width: 180,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },
      {
        label: "值机工号(Mã NV)",
        prop: "workNo",
        width: 90,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false
      },
      {
        label: "重量(Trọng lượng)",
        prop: "clothWeight",
        width: 100,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "重量单位(Đơn vị)",
        prop: "weightUnit",
        width: 90,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false
      },
      {
        label: "克重(Gam)",
        prop: "gramWeight",
        width: 100,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false
      },
      {
        label: "幅宽数值(Chiều rộng)",
        prop: "breadthValue",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "幅宽门幅单位(Đơn vị)",
        prop: "breadthUnit",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false
      },
      {
        label: "制票日期",
        prop: "madeDate",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "已打印(Đã in)",
        prop: "isPrinted",
        width: 80,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false,
        type: 'select',
        dicData: [
          {
            label:  _this.$t("true"), //是'
            value: true
          },
          {
            label:  _this.$t("false"), //否'
            value: false
          }
        ]
      },
      {
        label: "打印时间(TG in)",
        prop: "printedTime",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "外发标志",
        prop: "outworkFlag",
        width: 90,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: false,
        type: 'select',
        dicData: [
          {
            label:  _this.$t("true"), //是'
            value: true
          },
          {
            label:  _this.$t("false"), //否'
            value: false
          }
        ]
      },
      {
        label: "创建时间(Thời gian tạo)",
        prop: "createTime",
        width: 220,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      }
      ,
      {
        label: "创建人(Người tạo)",
        prop: "creator",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      }


    ]
  };
}
