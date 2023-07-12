/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-09 09:52:17
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from "@/config";

let cust = getDicT("basCustomer", "custName", "custCode", {}, "custName");
let proDptworkProcessList = getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn");
// 染布类容 1衫身 2下栏
const dyeMatter = [{
    value: 1,
    label: "衫身"
  },
  {
    value: 2,
    label: "下栏"
  }
]
const partNameDic = [{
    value: "领",
    label: "领"
  },
  {
    value: "袖",
    label: "袖"
  }
];
const commonFormConfig = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 150
};

const commonCrudConfig = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  page: true,
  labelWidth: 120,
  selection: true,
  columnBtn: true
};

export function mainForm(_this) {
  return {
    ...commonFormConfig,
    labelWidth: 120,
    column: [{
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
      },
      {
        label: _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        span: 6,
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 6
      },
      {
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        tip: "Thành phần",
        overHidden: true,
        span: 6,
      },


      {
        label: _this.$t("colorCode") ,//工厂色號,
        prop: "colorCode",
        span: 6,
      },
      {
        label:  _this.$t("gramWeight") ,//克重,
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        // hide: true,
        span: 6,
        // type: "number",
      },
      {
        label: _this.$t("auditState") ,//审核状态 ,//,
        prop: "auditState",
        span: 6,
        width: 90,
        type: "select",
        dicData: [
          {
            label: _this.$t("audited") ,//已审核,
            value: 1
          },
          {
            label: _this.$t("pendingReview") ,//待审核,
            value: 0
          }
        ]
      },
      {
        label: _this.$t("workDate") ,//开单日期,
        prop: "workDate",
        span: 12,
        type: "daterange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "染布类型" ,//染布类型,
        prop: "dyeMatter",
        span: 6,
        type: "select",
        dicData: [
          {
            label: "衫身",
            value: 1
          },
          {
            label: "下栏",
            value: 2
          }
        ]
      },
      // {
      //   label: _this.$t("orderMan") ,//开单员,
      //   prop: "serviceOperator",
      //   span: 6,
      //   placeholder: " "
      // }
      // {
      //   label: "第三方订单号",
      //   prop: "thirdPo",
      //   placeholder: " ",
      //   tip: "Mã đặt hàng thứ 3",
      //   overHidden: true,
      //   width: 250,
      //   span: 6
      // },
      // {
      //   label: "第三方订识别码",
      //   prop: "thirdSn",
      //   placeholder: " ",
      //   tip: "Mã nhận dạng thứ 3",
      //   overHidden: true,
      //   width: 250,
      //   span: 6
      // },

      // {
      //   label: _this.$t("auditState") ,//审核状态,
      //   prop: "auditState",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: [
      //     {
      //       value: 1,
      //       label: _this.$t("audited") ,//已审核
      //     },
      //     {
      //       value: 0,
      //       label: _this.$t("pendingReview") ,//待审核
      //     }
      //   ]
      // }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}

export function dlgForm(_this) {
  return {
    ...commonFormConfig,
    column: [{
        label: _this.$t("poNo") ,//生产单号,
        prop: "poNo",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
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
    height: "calc(100vh - 330px)",
    refreshBtn: false,
    page: true,
    labelWidth: 130,
    selection: true,
    columnBtn: true,
    selectable: (row, index) => {
      return row.auditState != 1 && row.serviceOperator == parent.userID;
    },
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: "clothWeight",
      type: "sum",
      decimals: 1
    }],
    column: [{
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },

      {
        label: _this.$t("weaveJobCode") , //"织單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 150,
        span: 6,
        disabled: false,
        formslot: true,
        placeholder: "請選擇織造生產單號",
        rules: [{
          required: true,
          message: "请输入织單號",
          trigger: "blur"
        }]
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 160,
        span: 6,
        disabled: true,
        sortable: true,
        rules: [{
          required: true,
          message: "請輸入缸號",
          trigger: "blur"
        }],
        fixed: true
      },
      {
        label: _this.$t("auditState") ,//审核状态 ,//,
        prop: "auditState",
        span: 6,
        placeholder: " ",
        fixed: true,
        width: 90,
        display: false,
        type: "select",
        dicData: [
          {
            label: _this.$t("audited") ,//已审核,
            value: 1
          },
          {
            label: _this.$t("pendingReview") ,//待审核,
            value: 0
          }
        ]
      },
      // {
      //   label: "审批状态",
      //   prop: "auditDesc",
      //   placeholder: " ",
      //   width: 90,
      //   fixed: true,
      //   display: false,
      //   type: "select",
      //   dicData: getDIC("act_audit_desc")
      // },
      {
        label:  _this.$t("workDate") ,//开單日期,
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇發單日期",
        sortable: true,
        disabled: true,
        rules: [{
          required: true,
          message: "请選擇發單日期",
          trigger: "blur"
        }]
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "deliveDate",
        tip: "Ngày giao hàng",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇交货日期",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇交货日期",
          trigger: "blur"
        }]
      },

      {
        label:  _this.$t("custName"), //"客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        sortable: true,
        width: 150,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust,
        disabled: true
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        sortable: true,
        formslot: true,
        // sortable: true,
        overHidden: true,
        disabled: true,
        change: ({
          value
        }) => {
          _this.$nextTick(() => {
            if (_this.hasSplitB) {
              _this.handlePoChange(value);
            }
          })
        }
      },
      {
        label: _this.$t("custPoNo") ,//客人PO,
        prop: "custPoNo",
        tip: "PO khách hàng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("contractNo") ,//合同号,
        prop: "contractNo",
        tip: "Số hiệu hợp đồng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("colorName"), //顏色名稱,
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        sortable: true,
        // formslot: true,
        overHidden: true,
        span: 6,
        disabled: true
      },
      {
        label: _this.$t("colorCode") ,//工厂色號,
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        sortable: true,
        span: 6,
        overHidden: true,
        placeholder: " ",
        disabled: true
      },
      {
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        // hide: true,
        disabled: true
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 24,
        disabled: true
      },
      {
        label:  _this.$t("dyeMatter") ,//染布类型,
        prop: "dyeMatter",
        span: 6,
        width: 90,
        type: "select",
        dicData: dyeMatter,
        placeholder: " ",
      },
      {
        label:  _this.$t("guestColorNo") ,//客色號,
        tip: "khách hàng số màu",
        prop: "custColorNo",
        width: 120,
        span: 6,
        sortable: true,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "FEPO",
        prop: "thirdPo",
        tip: "Mã đặt hàng",
        span: 6,
        hide: true,
        width: 100,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "No",
        prop: "thirdSn",
        tip: "Mã nhận diện",
        span: 6,
        hide: true,
        width: 100,
        overHidden: true,
        sortable: true,
        placeholder: " "
      },
      {
        label:  _this.$t("poAmountKg") ,//訂單數量,
        tip: "Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        },
        change: () => {
          if (_this.form.poAmountKg) {
            return;
          }
        }
      },
      {
        label:  _this.$t("embryosNumber") ,//投胚数量,
        tip: "Tổng cộng(KG)",
        prop: "clothWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        rules: [{
          required: true,
          message: "请输入投胚数量",
          trigger: "blur"
        }],
        change: val => {
          if (val.value && _this.form.avgEachWeightKg) {
            _this.$nextTick(() => {
              _this.form.pidCount = Number(
                _this.form.clothWeight / _this.form.avgEachWeightKg
              ).toFixed(0);
              _this.form.pidCount =
                _this.form.pidCount == "0" ? 1 : _this.form.pidCount;
            });
          }
          if (
            _this.form.dyeVatType &&
            val.value > Number(_this.form.dyeVatType)
          ) {
            _this.$nextTick(() => {
              _this.form.clothWeight = Number(_this.form.dyeVatType);
              _this.$tip.warning(_this.$t("revolve.warning1"));
            });
          }
        },
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        },
      },
      {
        label:  _this.$t("dyeClothWeight") ,//染整数量,
        prop: "dyeClothWeight",
        tip: "Số lượng vải mộc",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        type: "number",
        hide: true,
        rules: [{
          required: true,
          message: "请输入染整数量",
          trigger: "blur"
        }],
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        },
      },
      {
        label:  _this.$t("divdWeight") ,//拆缸重量,
        prop: "divdCw",
        overHidden: true,
        align: "right",
        width: 100,
        span: 6,
        disabled: false,
        type: "number",
        placeholder: " ",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        },
      },
      {
        label:  _this.$t("eachWeight") ,//疋重,
        // tip: "state",
        disabled: false,
        prop: "avgEachWeightKg",
        width: 80,
        align: "right",
        type: "switch",
        dicData: [{
            label: "30",
            value: 30
          },
          {
            label: "58",
            value: 58
          }
        ],
        hide: false,
        placeholder: " ",
        span: 6,
        change: val => {
          if (val.value && _this.form.clothWeight) {
            _this.$nextTick(() => {
              _this.form.pidCount = Number(
                _this.form.clothWeight / _this.form.avgEachWeightKg
              ).toFixed(0) || 0;
            });
          }
        }
      },
      {
        label:  _this.$t("pidCount") ,//疋數,
        prop: "pidCount",
        tip: "Cây",
        width: 80,
        span: 6,
        type: "number",
        minRows: 1,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "wmUnit",
        tip: "unit",
        width: 80,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [{
            label: "KG",
            value: "KG"
          },
          {
            label: "LBS",
            value: "LBS"
          },
          {
            label: "套/Bộ",
            value: "SET"
          }
        ]
      },
      {
        label:  _this.$t("fabCode") ,//布类代码,
        prop: "fabricCode",
        tip: "Fabric Code",
        span: 6,
        width: 120,
        placeholder: " ",
        sortable: true,
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("batchNo") ,//批号,
        prop: "yarnBatchNo",
        tip: "Mã vải",
        span: 6,
        width: 120,
        placeholder: " ",
        sortable: true,
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("yarnCylinder") ,//紗缸,
        tip: "Lô sợi nhà máy",
        prop: "yarnCylinder",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        sortable: true,
        hide: true
      },
      {
        label:  _this.$t("yarnCard") ,//紗牌,
        prop: "yarnCard",
        tip: "Nhãn hiệu sợi",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("yarnBatch") ,//紗批,
        tip: "Lót sợi",
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label:  _this.$t("mergVatNo") ,//合染缸號,
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        hide: true,
        type: "select",
        dicData: [],
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveFactoryName") ,//织厂,
        tip: "Xưởng dệt",
        prop: "weaveFactoryName",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: [{
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
        label:  _this.$t("address") ,//交货地址,
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: false,
        placeholder: " "
      },
      {
        label:  _this.$t("styleNo") ,//STLYLE款号,
        prop: "styleNo",
        tip: "#STLYLE 款号",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label:  _this.$t("season") ,//季节,
        prop: "custStyleCode",
        // tip: "MÃ CODE VẢI XUẤT HÀNG 代码",
        span: 6,
        hide: true,
        width: 60,
        placeholder: " "
      },
      {
        label:  _this.$t("poColorCount") ,//顏色種類數量,
        tip: "Số lượng màu",
        prop: "poColorCount",
        width: 120,
        span: 6,
        type: "number",
        hide: true,
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("poVatCount") ,//訂單總缸數,
        prop: "poVatCount",
        tip: "TC ? Bồn",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("vatIndex") ,//当前第幾缸,
        prop: "vatIndex",
        tip: "Bồn thứ",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("tubeDiam") ,//筒徑(Inch,
        prop: "tubeDiam",
        tip: "Khổ máy",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label:  _this.$t("needleDist") ,//针距,
        tip: "Gauge",
        prop: "needleDist",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label:  _this.$t("yarnLength") ,//紗長,
        tip: "Độ dài sợi",
        prop: "yarnLength",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80
        // tyep: "number"
      },
      {
        label:  _this.$t("breadth") ,//幅寬(Inch),
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 90,
        // hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("gramWeight") ,//克重,
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        sortable: true,
        // hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("compVatNo") ,//对色标准/缸号,
        tip: "Tiêu chuẩn so màu / số bồn nhuộm",
        prop: "compVatNo",
        width: 120,
        hide: true,
        span: 12,
        placeholder: " "
      },
      {
        label:  _this.$t("specParam") ,//规格参考,
        tip: "Tiêu chuẩn chất lượng",
        prop: "specParam",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " "
      },

      {
        label:  _this.$t("dyeVatType") ,//生产用机种,
        prop: "dyeVatType",
        tip: "Mô hình",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "select",
        dicData: getDicT(
          "baseEquipmentCategoryList",
          "categoryName",
          "setCapacity", {
            parentId: "dev-12"
          }
        )
      },

      {
        label:  _this.$t("compLightSource") ,//对色光源,
        tip: "Nguồn sáng so màu",
        prop: "compLightSource",
        width: 120,
        hide: true,
        span: 12,
        placeholder: " ",
        multiple: true,
        type: "select",
        dicData: getDIC("sal_colorLights")
      },
      {
        label:  _this.$t("firstOrOther") ,//头缸/缸差,
        // tip: "state",
        disabled: false,
        prop: "firstOrOther",
        width: 100,
        type: "radio",
        dicData: [{
            label:  _this.$t("firstVat") ,//头缸,
            value: "1"
          },
          {
            label:  _this.$t("otherVat") ,//缸差,
            value: "2"
          },
          {
            label:  _this.$t("turnOverVat") ,//翻单头缸,
            value: "3"
          }
        ],
        hide: false,
        placeholder: " ",
        span: 8,
        change: () => {
          _this.$nextTick(() => {
            _this.typeChange();
          });
        }
      },
      {
        label:  _this.$t("salType") ,//办单/大货,
        tip: "Hàng mẫu / Hàng đại trà",
        disabled: false,
        prop: "salType",
        width: 150,
        type: "switch",
        dicData: [{
            label:  _this.$t("salSample") ,//办单(Hàng mẫu),
            value: "sample"
          },
          {
            label:  _this.$t("salBig") ,//大货(Hàng đại trà),
            value: "big"
          }
        ],
        hide: false,
        placeholder: " ",
        overHidden: true,
        span: 10,
        change: () => {
          _this.$nextTick(() => {
            _this.typeChange();
          });
        }
      },
      {
        label:  _this.$t("revolveState") ,//运转单状态,
        tip: "state",
        disabled: false,
        prop: "runState",
        width: 120,
        type: "switch",
        dicData: [{
            label:  _this.$t("normal") ,//正常,
            value: "1"
          },
          {
            label:  _this.$t("draft") ,//草稿,
            value: "0"
          },
          {
            label:  _this.$t("isPrinted"), //已打印,
            value: "3"
          }
        ],
        hide: false,
        placeholder: " ",
        span: 6
      },
      // {
      //   label: "第三方订单号",
      //   prop: "thirdPo",
      //   placeholder: " ",
      //   tip: "Mã đặt hàng thứ 3",
      //   width: 150,
      //   span: 6,
      //   disabled: true,
      //   display: false,
      //   overHidden: true
      // },
      // {
      //   label: "第三方订识别码",
      //   prop: "thirdSn",
      //   placeholder: " ",
      //   tip: "Mã nhận dạng thứ 3",
      //   width: 150,
      //   span: 6,
      //   disabled: true,
      //   display: false,
      //   overHidden: true
      // },
      {
        label: _this.$t("orderMan") ,//开单员,
        tip: "开单员",
        prop: "serviceOperator",
        width: 80,
        span: 6,
        disabled: true,
        display: false,
        overHidden: true,
        // hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("printedTime") ,//打印日期,
        prop: "printDate",
        span: 6,
        placeholder: " ",
        width: 150,
        overHidden: true,
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label:  _this.$t("qcComments") ,//QC评语,
        prop: "qcComments",
        tip: "Nhận xét",
        type: "textarea",
        minRows: 1,
        span: 24,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label:  _this.$t("acceptRequirement") ,//收货要求,
        tip: "Nhận hàng yêu cầu",
        prop: "acceptRequirement",
        span: 24,
        hide: true,
        type: "textarea",
        minRows: 1,
        width: 80,
        placeholder: " "
      },
      {
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        tip: "Ghi chú",
        type: "textarea",
        minRows: 1,
        span: 24,
        hide: true,
        width: 80,
        placeholder: " "
      }
    ],
    group: [{
        icon: "el-icon-info",
        label: "拆单原因 Lý do chia món",
        prop: "splitRes",
        display: false,
        column: [{
            label: _this.$t("revolve.splitReason"), //"拆单原因",
            prop: "splitReason",
            tip: "Lý do chia món",
            hide: true,
            span: 24,
            minRows: 2,
            type: "textarea",
            placeholder: " ",
            rules: [{
              required: true,
              message: "请输入拆单原因",
              trigger: "blur"
            }]
          },
          {
            label:  _this.$t("ColorDefine.chargeDpt"), //责任部门
            prop: "dutyDep",
            tip: "Lỗ hổng",
            hide: true,
            type: "select",
            multiple: true,
            span: 12,
            placeholder: " ",
            dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
            rules: [{
              required: true,
              message: "请输入责任部门",
              trigger: "blur"
            }]
          },
          {
            label:  _this.$t("revolve.procMethod"), // "处理方法",
            prop: "procMethod",
            tip: "Phương pháp xử lý",
            hide: true,
            span: 12,
            placeholder: " ",
            rules: [{
              required: true,
              message: "请输入处理方法",
              trigger: "blur"
            }]
          }
        ]
      },
      {
        icon: "el-icon-info",
        label: "成品规格 Quy cách thành phẩm Y/C",
        prop: "basic1",
        column: [{
            label:  _this.$t("breadthActual") ,//實用幅寬,
            prop: "breadthActual",
            tip: "Khổ rộng Thực dụng ",
            width: 90,
            hide: false,
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label:  _this.$t("breadthBorder") ,//連邊幅寬,
            tip: "Khổ rộng Tiếp giáp",
            prop: "breadthBorder",
            width: 90,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label:  _this.$t("gramWeightBefor") ,//洗前克重,
            tip: "Trọng lượng Giặt trước",
            prop: "gramWeightBefor",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },

          {
            label:  _this.$t("gramWeightAfter") ,//洗後克重,
            tip: "Trọng lượng Giặt sau",
            prop: "gramWeightAfter",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },

          {
            label:  _this.$t("shrinkLenth") ,//直縮,
            tip: "Co rút thẳng (L)",
            prop: "shrinkLenth",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },
          {
            label:  _this.$t("shrinkWidth") ,//橫縮,
            tip: "Co rút ngang(W)",
            prop: "shrinkWidth",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },

          {
            label:  _this.$t("shrinkNear") ,//縮水(扭度),
            tip: "Độ méo (N)",
            prop: "shrinkNear",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },
          {
            label:  _this.$t("shrinkRotate") ,//縮水(循環),
            tip: "Tuần hoàn(R)",
            prop: "shrinkRotate",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },

          {
            label:  _this.$t("hangDry") ,//挂干,
            tip: "Treo khô ",
            prop: "hangDry",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            // type: "switch",
            // dicData: [{
            //     label: _this.$t("public.false"),
            //     value: 0
            //   },
            //   {
            //     label: _this.$t("public.true"),
            //     value: 1
            //   }
            // ]
          },
          {
            label:  _this.$t("flatDry") ,//平干,
            tip: "Phơi phẳng ",
            prop: "flatDry",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            // type: "switch",
            // dicData: [{
            //     label: _this.$t("public.false"),
            //     value: 0
            //   },
            //   {
            //     label: _this.$t("public.true"),
            //     value: 1
            //   }
            // ]
          },
          {
            label:  _this.$t("throwDry") ,//拋干,
            tip: " Vắt khô ",
            prop: "throwDry",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          }
        ]
      },

      {
        icon: "el-icon-info",
        label: "备布要求 Sự yêu cầu chuẩn bị vải",
        prop: "basic2",
        column: [{
            label:  _this.$t("forClothSeparatePipe") ,//分管,
            tip: "Phân ống",
            prop: "forClothSeparatePipe",
            span: 6,
            hide: true,
            width: 80,
            type: "number",
            placeholder: " "
          },

          {
            label:  _this.$t("forClothLockJoin") ,//锁布头,
            tip: "Khóa đầu vải",
            prop: "forClothLockJoin",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          },
          {
            label:  _this.$t("forClothTurnOver") ,//翻布,
            tip: " Lật vải",
            prop: "forClothTurnOver",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          },
          {
            label:  _this.$t("forClothTogetherVat") ,//合缸标记,
            tip: " Ký hiệu số bồn nhuộm",
            prop: "forClothTogetherVat",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          },
          {
            label:  _this.$t("forClothOrderHair") ,//顺毛,
            tip: "Chiều lông xuôi",
            prop: "forClothOrderHair",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          },
          {
            label:  _this.$t("forClothAgainstHair") ,//逆毛,
            tip: "Chiều lông ngược ",
            prop: "forClothAgainstHair",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          }
        ]
      },
      {
        icon: "el-icon-info",
        label: "包装要求 Sự yêu cầu đóng gói",
        prop: "basic3",
        column: [{
            label:  _this.$t("packBag") ,//胶袋,
            tip: "Bọc nylon",
            prop: "packBag",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },

          {
            label:  _this.$t("packPaperTube") ,//纸筒(KG),
            tip: "Thoi giấy",
            prop: "packPaperTube",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label:  _this.$t("packLabel") ,//标签,
            prop: "packLabel",
            tip: "Tem",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label:  _this.$t("grossWeight") ,//毛重,
            prop: "packGw",
            tip: "Sợi nặng ",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          },
          {
            label:  _this.$t("netWeight") ,//净重,
            prop: "packNw",
            tip: "TL tịnh",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [{
                label: _this.$t("public.false"),
                value: false
              },
              {
                label: _this.$t("public.true"),
                value: true
              }
            ]
          },
          {
            label:  _this.$t("proOther") ,//其他,
            prop: "packOther",
            tip: "Khác ",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          }
        ]
      }
    ]
  };
}

export function bfOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 145px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    showSummary: true,
    // sumColumnList: [{
    //     label: " ",
    //     name: "clothWeight",
    //     type: "sum"
    //   },
    //   {
    //     label: " ",
    //     name: "clothNoteCode",
    //     type: "count"
    //   }
    // ],
    column: [{
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("noteCode") ,//布票号,
        prop: "clothNoteCode",
        overHidden: true,
        // width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        cell: false
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "clothWeight",
        overHidden: true,
        width: 140,
        span: 6,
        placeholder: " ",
        align: "right",
        hide: false,
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        }
      }
    ]
  };
}

export function cpbOp(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 145px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    showSummary: true,
    sumColumnList: [{
        label: " ",
        name: "netWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "productNo",
        type: "count"
      }
    ],
    index: true,
    column: [
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        overHidden: true,
        span: 6,
        width: 200,
        overHidden: true,
        disabled: false,
        sortable: true,
        cell: false
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "netWeight",
        overHidden: true,
        width: 100,
        span: 6,
        placeholder: " ",
        align: "right",
        hide: false
      }
    ]
  };
}

export function testOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 5.466667rem)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [{
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("testName") ,//项目,
        prop: "testName",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        cell: true
      },
      {
        label:  _this.$t("testItemName") ,//标准,
        prop: "testItemName",
        overHidden: false,
        width: 160,
        span: 6,
        disabled: false,
        placeholder: " ",
        cell: true
      },
      {
        label:  _this.$t("testItemContent") ,//要求,
        prop: "testItemContent",
        overHidden: false,
        // width: 140,
        span: 6,
        placeholder: " ",
        cell: true
      }
    ]
  };
}

export function itemOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 5.466667rem)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    sortable:'custom',
    labelWidth: 130,
    column: [{
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("testName") ,//项目名称,
        prop: "jobItemName",
        overHidden: false,
        // width: 140,
        span: 6,
        disabled: false,
        // sortable: true,
      //  cell: true
      },
      {
        label:  _this.$t("remark") ,//备注说明,
        prop: "remark",
        overHidden: false,
        span: 6,
        placeholder: " ",
        align: "center",
     //   cell: true
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
    height: "calc(100vh - 5.2rem)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    rowKey: "salPooid",
    column: [{
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

// TODO 颜色选择
export function colSelCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 5.2rem)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [{
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: "130",
        overHidden: true
      },
      {
        label: _this.$t("colorName") ,//颜色,
        prop: "colorName",
        width: "140",
        overHidden: true
      },
      {
        label:  _this.$t("weavePoQty") ,//排织数量,
        prop: "weavePoQty",
        width: "100",
        overHidden: true,
        align: "right"
      },
      {
        label:  _this.$t("revolveSumWeight") ,//已排运转单,
        prop: "clothWeight",
        width: "120",
        overHidden: true,
        align: "right"
      },
      {
        label:  _this.$t("balWeight") ,//余胚,
        prop: "balWeight",
        width: "100",
        overHidden: true,
        align: "right"
      },
      {
        label:  _this.$t("poNo") ,//生产通知单号,
        prop: "poNo",
        width: "130",
        overHidden: true
      },
      {
        label:  _this.$t("bomId") ,//BOM编号,
        prop: "bomId",
        width: "120",
        overHidden: true
      },
      {
        label:  _this.$t("specParam") ,//规格参考,
        prop: "okGh",
        width: "120",
        overHidden: true
      },
      {
        label:  _this.$t("factoryColorNo") ,//本厂色号,
        prop: "colorNo",
        width: "100",
        overHidden: true
      },
      {
        label: "OK LD",
        prop: "okLd",
        width: "100",
        overHidden: true
      },
      {
        label:  _this.$t("oneRem") ,//头缸描述,
        prop: "oneRem",
        width: "100",
        overHidden: true
      },
      {
        label:  _this.$t("twoRem") ,//缸差描述,
        prop: "twoRem",
        width: "100",
        overHidden: true
      },
      {
        label:  _this.$t("thrRem") ,//测试办描述,
        prop: "thrRem",
        width: "120",
        overHidden: true
      },
      {
        label:  _this.$t("fourRem") ,//PP办描述,
        prop: "fourRem",
        width: "100",
        overHidden: true
      },
      {
        label:  _this.$t("colorStandard"), //对色标准,
        prop: "light",
        width: "100",
        overHidden: true
      }
    ]
  };
}

// 排期工作包
export function scheduleDtlCrudOp(_this) {
  return {
    ...commonCrudConfig,
    page: false,
    labelWidth: 100,
    height: "calc(100vh - 375px)",
    showSummary: true,
    stripe: true,
    tree: true,
    index: true,
    rowKey: "schSn",
    sumColumnList: [{
      label: " ",
      name: "workName",
      type: "count"
    }],
    column: [{
        label:  _this.$t('dptReciveLog.stepName'), // 工序名称,
        prop: "workName",
        align: "left",
        width: 220,
        display: false,
        overHidden: true,
        span: 6,
        fixed: true
      },

      {
        label: _this.$t("vatNo") ,//"缸号",
        prop: "stepCode",
        hide: true,
        align: "left",
        width: 140,
        span: 6,
        overHidden: true,
        disabled: true
      },
      {
        label: _this.$t("colorName") ,//颜色,
        prop: "colorName",
        // hide: true,
        disabled: true,
        align: "left",
        width: 140,
        overHidden: true,
        span: 6,
        cell: false,
        hide: true
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "workAmount",
        disabled: true,
        type: "number",
        align: "right",
        width: 100,
        overHidden: true,
        span: 6,
        hide: true
      },
      {
        label:  _this.$t("weaveJob.realAmount"), //际数量
        prop: "realAmount",
        type: "number",
        align: "right",
        cell: true,
        overHidden: true,
        width: 100,
        span: 6,
        rules: [{
          required: true,
          message: "",
          trigger: "blur"
        }]
      },
      {
        label: _this.$t("revolve.planStart"), // "计划开始",
        prop: "planStart",
        width: 160,
        span: 6,
        cell: true,
        type: "datetime",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        overHidden: true,
        sortable: true,
        rules: [{
          required: true,
          message: "",
          trigger: "blur"
        }]
      },
      {
        label: _this.$t("revolve.planEnd"), // "计划结束
        prop: "planEnd",
        width: 160,
        cell: true,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        sortable: true,
        rules: [{
          required: true,
          message: "",
          trigger: "blur"
        }]
      },
      {
        label: _this.$t("revolve.exampleUseTime"), // 估算耗时
        prop: "exampleUseTime",
        type: "number",
        align: "right",
        cell: true,
        width: 100,
        span: 6
      },
      {
        label: _this.$t("revolve.realUseTime"), // 实际耗时
        prop: "realUseTime",
        type: "number",
        align: "right",
        width: 100,
        cell: true,
        span: 6
      },
      {
        label: _this.$t("revolve.broadTime"), // 宽放时间
        prop: "broadTime",
        type: "number",
        cell: true,
        width: 100,
        align: "right",
        span: 6
      },
      {
        label: _this.$t("revolve.realBroad"), // 实际宽放
        prop: "realBroad",
        type: "number",
        width: 100,
        align: "right",
        cell: true,
        span: 6
      },
      {
        label: _this.$t("revolve.transferTime"), // 转场时间
        prop: "transferTime",
        type: "number",
        width: 100,
        align: "right",
        cell: true,
        span: 6
      },
      {
        label: _this.$t("revolve.finishProportion"), // 完成比例
        prop: "finishProportion",
        type: "number",
        align: "right",
        width: 100,
        cell: true,
        span: 6
      },
      {
        label: _this.$t("revolve.finishState"), // 完成状态
        prop: "finishState",
        width: 100,
        align: "right",
        span: 6,
        cell: true,
        type: "select",
        dicData: [{
            label: _this.$t("revolve.finished"), // 完成
            value: 1
          },
          {
            label: _this.$t("revolve.undone"), // 未完成
            value: 0
          }
        ]
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "workUnit",
        width: 100,
        align: "left",
        type: "select",
        cell: true,
        dicData: getDIC("bas_matUnit"),
        span: 6
      }
    ]
  };
}

export function dispathReceiveForm(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    column: [{
        label:  _this.$t('dptReciveLog.dispathReceive'), // 收/发单,
        prop: "dispathReceive",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        clearable: false,
        tip: "nhận đơn / gửi đơn",
        disabled: !_this.typechangeable,
        rules: [{
          required: true,
          message: "請选择收/发单",
          trigger: "blur"
        }],
        dicData: [{
            value: 1,
            label: "收单(nhận đơn)"
          },
          {
            value: 2,
            label: "发单(gửi đơn)"
          }
        ],
        change: val => {
          // if (val.value == 1) {
          //   _this.dispathReceiveFormData.dptworkProcessFk = _this.userId || "";
          //   _this.dispathReceiveFormData.acceptStaff = parent.userID;
          //   _this.dispathReceiveFormData.sendProcessFk = "";
          //   _this.dispathReceiveFormData.sendStaff = "";
          //   _this.dispathReceiveFormData.sendProcessFk = _this.lastLog.sendProcessFk;
          // } else {
          //   _this.dispathReceiveFormData.dptworkProcessFk = "";
          //   _this.dispathReceiveFormData.acceptStaff = "";
          //   _this.dispathReceiveFormData.sendProcessFk = _this.userId || "";
          //   _this.dispathReceiveFormData.sendStaff = parent.userID;
          // }
        }
      },
      {
        label: _this.$t("revolve.runJobFk"), // 单号
        prop: "runJobFk",
        span: 6,
        tip: "Số lô nhuộm",
        placeholder: " ",
        type: "select",
        tipPlacement: "right",
        formslot: true
      },
      {
        label:  _this.$t('dptReciveLog.planOutput'), // 计划产量,
        prop: "planOutput",
        span: 6,
        type: "number",
        tip: "sản lượng kế hoạch",
        tipPlacement: "right",
        placeholder: " "
      },
      {
        label:  _this.$t('dptReciveLog.realOutput'), // 实际产量,
        prop: "realOutput",
        type: "number",
        span: 6,
        tipPlacement: "right",
        tip: "sản lượng thực tế",
        placeholder: " "
      },

      {
        label:  _this.$t('dptReciveLog.sendProcess'), // 发单部门,
        prop: "sendProcessFk",
        tipPlacement: "right",
        span: 6,
        tip: "bộ phận gửi đơn",
        placeholder: " ",
        type: "select",
        dicData: proDptworkProcessList,
        rules: [{
          required: true,
          message: "請选择部门",
          trigger: "blur"
        }],
        change: () => {
          if (_this.dispathReceive == 2) {
            _this.remoteMethodCX();
          }
        }
      },
      {
        label:  _this.$t('dptReciveLog.dptworkProcess'), // 收单部门,
        prop: "dptworkProcessFk",
        span: 6,
        tip: "bộ phận nhận đơn",
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        dicData: proDptworkProcessList,
        rules: [{
          required: true,
          message: "請选择部门",
          trigger: "blur"
        }],
        change: () => {
          if (_this.dispathReceive == 1) {
            _this.remoteMethodCX();
          }
        }
      },
      {
        label:  _this.$t('dptReciveLog.stepName'), // 工序,
        prop: "stepId",
        type: "select",
        span: 6,
        tip: "quá trình",
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: _this.$t("revolve.priorityId"), // 优先级
        prop: "priorityId",
        tipPlacement: "right",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_PriorityId")
      },
      {
        label:  _this.$t('dptReciveLog.acceptDesc'), // 说明,
        prop: "acceptDesc",
        tipPlacement: "right",
        span: 24,
        tip: "remark",
        placeholder: " "
      }
    ]
  };
}

// TODO 待排染整运转单
export function unCreateFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: _this.$t("fabName"), // 布类描述
        prop: "fabName",
        span: 6
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "custId",
        span: 6,
        labelWidth: 100
      },
      {
        label:  _this.$t("poNo") ,//生产通知单号,
        prop: "poNo",
        span: 6,
        labelWidth: 90
      },
      {
        prop: "exDate",
        label:  _this.$t("weaveJob.daterange"), //货期
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
        span: 6,
        labelWidth: 60
      }
    ]
  };
}

// TODO 待拆染整运转单
export function unSplitFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: _this.$t("vatNo"), // 缸号
        prop: "vatNo",
        span: 6
      },
      {
        label:  _this.$t("divdVatType"), //拆缸类型
        prop: "divdVatTypeCode",
        span: 6,
        type: "select",
        dicData: getDIC("QC_DIVFVAT_TYPE")
      },
      {
        label: _this.$t("fabName"), // 布类描述
        prop: "fabName",
        span: 6
      },
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorCode",
        span: 6
      },
    ]
  };
}

export function unSplitGrudOp(_this) {
  return {
    ...commonCrudConfig,
    page: true,
    border: true,
    stripe: true,
    height: "calc(100vh - 290px)",
    selectable: (row, index) => {
      // true edit   false noEdit
      return _this.selectRows.length == 0 || row.id == _this.selectRows[0].id; //&& row.id != _this.selectRows[0].id
    },
    column: [{
        label:  _this.$t("vatNo") ,//生产通知单号,
        prop: "vatNo",
        width: 150,
        fixed: true,
        overHidden: true
      },
      {
        label: _this.$t("revolve.divdVatTypeCode"), // 拆缸类型,
        prop: "divdVatTypeCode",
        width: 90,
        overHidden: true,
        type: "select",
        dicData: getDIC("QC_DIVFVAT_TYPE")
      },
      {
        label: _this.$t("revolve.splitReason"), // "拆单原因",
        prop: "problemDesc",
        width: 160,
        overHidden: true,
      },
      {
        label:  _this.$t("ColorDefine.chargeDpt"), //责任部门
        prop: "chargeDpt",
        width: 160,
        overHidden: true,
        type: "select",
        multiple: false,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      {
        label: _this.$t("revolve.procMethod"), // 处理方法
        prop: "solution",
        width: 180,
        overHidden: true,
      },
      {
        label: _this.$t("fabName"), // 布类描述
        prop: "fabName",
        width: 350,
        overHidden: true
      },
      {
        label: _this.$t("colorName") ,//"颜色名称
        prop: "colorName",
        width: 180,
        overHidden: true
      },
      {
        label: _this.$t("colorCode") ,//工厂色號,
        prop: "colorCode",
        width: 140,
        overHidden: true
      },
      {
        label: _this.$t("revolve.piCount"), // 布匹数
        prop: "piCount",
        width: 80,
        overHidden: true,
        align: "right",
        type: "number",
      },
      {
        label: _this.$t("revolve.netWeight"), // 布匹重量
        prop: "netWeight",
        width: 120,
        overHidden: true,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        }
      }
    ]
  };
}

// 待生成运转单
export function unCreateGrudOp(_this) {
  return {
    ...commonCrudConfig,
    page: true,
    border: true,
    stripe: true,
    height: "calc(100vh - 290px)",
    columnBtn: false,
    menu: false,
    menuBtn: false,
    selectable: (row, index) => {
      /**
       * 若不是扁机，只能选择一个；
       * 若是扁机，可在选择多个相同颜色的数据
       * */
      // true edit   false noEdit
      return _this.selectRows.length == 0 || (_this.selectRows[0].bjposition ? (row.colorNo == _this.selectRows[0].colorNo && row.poNo == _this.selectRows[0].poNo) : (row.id == _this.selectRows[0].id)); //&& row.id != _this.selectRows[0].id
    },
    column: [{
        label:  _this.$t("poNo") ,//生产通知单号,
        prop: "poNo",
        width: 120,
        fixed: true
      },
      {
        label: _this.$t("custName") ,//"客户,
        prop: "custName",
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("fabName"), // 布类描述
        prop: "fabName",
        width: 250,
        overHidden: true
      },

      {
        label: "BOM_ID",
        prop: "bomId",
        width: 120,
        hide: true
      },
      {
        label:  _this.$t("poAmountKg") ,//訂單數量,
        prop: "poQtyKg",
        width: 120,
        align: "right",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        }
      },
      {
        label:  _this.$t("deliveDate") ,//交货日期,
        prop: "exDate",
        width: 120,
        align: "center"
      },
      {
        label: _this.$t("revolve.dyeClothWeight"), // 计划染胚数量
        prop: "dyeClothWeight",
        width: 130,
        overHidden: true,
        align: "right",
        type: "number",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        }
      },
      {
        label: _this.$t("revolve.inClothQty"), // 投胚数"
        prop: "inClothQty",
        width: 120,
        overHidden: true,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        }
      },
      {
        label: _this.$t("revolve.totClothWeight"), // 已投胚数量"
        prop: "totClothWeight",
        width: 120,
        overHidden: true,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && _this.$num2ThousandthFormat(v, 1);
        }
      },
      {
        label: _this.$t("revolve.poVatCount"), // 预计总缸数
        prop: "poVatCount",
        width: 110,
        overHidden: true,
        align: "right",
      },
      {
        label: _this.$t("revolve.vatCount"), // 已排缸数
        prop: "vatCount",
        width: 100,
        overHidden: true,
        align: "right"
      },
      {
        label: _this.$t("fabCode"), // 布料代码"
        prop: "fabCode",
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("guestColorNo") ,//客色號,
        prop: "colorCode",
        width: 120
      },
      {
        label: _this.$t("weaveJob.colorEngName"), // 颜色英文
        prop: "colorEngName",
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("weaveJob.colorChnName"), // 颜色中文
        prop: "colorChnName",
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("colorCode") ,//工厂色號,
        prop: "colorNo",
        width: 120
      },
      {
        label: "扁机部位" ,//扁机部位,
        prop: "bjposition",
        width: 120
      },
      {
        label: "扁机尺寸" ,//扁机尺寸,
        prop: "bjsize",
        width: 120
      },
      {
        label: "OK LD",
        prop: "okLd",
        width: 70
      },
      {
        label: _this.$t("revolve.okRemarks"), // 客人备注
        prop: "okRemarks",
        width: 120,
        overHidden: true,
      },
      {
        label:  _this.$t("compVatNo") ,//对色标准/缸号,
        prop: "headCylinderRef",
        width: 140
      },
      {
        label:  _this.$t("specParam") ,//规格参考,
        prop: "okGh",
        width: 120,
        overHidden: true
      },
      {
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabConst",
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("breadthBorder"), // 幅宽连边
        prop: "fabWidth1",
        width: 90,
        overHidden: true,
        align: "right",
        formatter(r, v) {
          return v && v.split(";")[0];
        }
      },
      {
        label: _this.$t("breadthActual"), // 幅宽实用
        prop: "fabWidth2",
        width: 90,
        overHidden: true,
        align: "right",
        formatter(r, v) {
          return v && v.split(";")[0];
        }
      },
      {
        label:  _this.$t("gramWeightBefor") ,//洗前克重,
        prop: "fabWeight1",
        width: 90,
        overHidden: true,
        align: "right",
        formatter(r, v) {
          return v && v.split(";")[0];
        }
      },
      {
        label: _this.$t("gramWeightAfter"), // 洗后克重
        prop: "fabWeight2",
        width: 90,
        overHidden: true,
        align: "right",
        formatter(r, v) {
          return v && v.split(";")[0];
        }
      },
      {
        label:  _this.$t("shrinkWidth") ,//橫縮,
        prop: "shrinkHorizontal",
        width: 100,
        overHidden: true,
        align: "right",
        formatter(r, v) {
          return v && v.split(";")[2];
        }
      },
      {
        label:  _this.$t("shrinkLenth") ,//直縮,
        prop: "shrinkVertical",
        width: 100,
        overHidden: true,
        align: "right",
        formatter(r, v) {
          return v && v.split(";")[2];
        }
      },
      {
        label: _this.$t("shrinkNear"), // 缩水(扭度)
        prop: "spirality",
        align: "right",
        width: 100
      },
      {
        label: _this.$t("revolve.finishingItem"), // 生产项目
        prop: "finishingItem",
        width: 140,
        overHidden: true
      },

      {
        label: _this.$t("revolve.minQty"), // 允差最小数量
        prop: "minQty",
        width: 120,
        hide: true
      },
      {
        label: _this.$t("revolve.maxQty"), // 允差最大数量
        prop: "maxQty",
        width: 120,
        hide: true
      },

      {
        label:  _this.$t("contractNo") ,//合同号,
        prop: "contractNo",
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label: _this.$t("custPoNo") ,//客人PO,
        prop: "custOrderNo",
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label:  _this.$t("acceptRequirement") ,//收货要求,
        prop: "text1",
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label:  _this.$t("season") ,//季节,
        prop: "custSeason",
        width: 120,
        hide: true
      },
      {
        label:  _this.$t("styleNo") ,//STLYLE款号,
        prop: "custStyleNo",
        width: 120,
        hide: true
      },
      {
        label:  _this.$t("salType") ,//办单/大货,
        prop: "smKind",
        width: 120,
        type: "select",
        hide: true,
        dictData: [{
            label: _this.$t("revolve.smKind1") ,// "大货",
            value: "1"
          },
          {
            label: _this.$t("revolve.smKind2") ,// "办单",
            value: "0"
          }
        ]
      },
      {
        label: _this.$t("revolve.one"), // 第一光源
        prop: "one",
        width: 120,
        hide: true
      },
      {
        label: _this.$t("revolve.two"), // 第二光源
        prop: "two",
        width: 120,
        hide: true
      },
      {
        label: _this.$t("revolve.three"), // 第三光源
        prop: "three",
        width: 120,
        hide: true
      }
    ]
  };
}

// 下栏定义
export function bottomColumnCrud(_this) {
  return {
    ...commonCrudConfig,
    height: "250px",
    page: false,
    selection: false,
    column: [{
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        fixed: true,
        cell: true,
        type: "number"
      },
      {
        label: _this.$t("weaveJob.partName"), //"部位名称",
        prop: "partName",
        width: 100,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: partNameDic,
        clearable: false
      },
      {
        label: _this.$t("colorName") ,//颜色,
        prop: "colorName",
        width: 120,
        cell: true,
        placeholder: " "
      },
      {
        label: _this.$t("revolve.yarnDesc"), // 纱线描述
        prop: "yarnDesc",
        width: 150,
        cell: true,
        placeholder: " "
      },
      {
        label: _this.$t("revolve.lengthDsp"), // 长
        prop: "lengthDsp",
        width: 80,
        cell: true,
        placeholder: " ",
        align: "center",
        clearable: false
      },
      {
        label: "X",
        prop: "X",
        width: 40,
        cell: false,
        align: "center",
        slot: true
      },
      {
        label: _this.$t("revolve.widthDsp"), // 宽
        prop: "widthDsp",
        width: 80,
        cell: true,
        placeholder: " ",
        align: "center",
        clearable: false
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "sizeUnit",
        width: 100,
        cell: true,
        placeholder: " ",
        type: "select",
        clearable: false,
        dicData: [{
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
        label: "投胚条数" ,//投胚条数
        prop: "mateAmount",
        width: 100,
        cell: true,
        type: "number",
        placeholder: " "
      },
      {
        label: "投胚重量" ,//投胚重量
        prop: "mateNw",
        width: 100,
        cell: true,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "amount",
        width: 100,
        cell: true,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("revolve.nw"), // 要求重量
        prop: "nw",
        width: 100,
        cell: true,
        placeholder: " ",
        type: "number"
      },
      // {
      //     label:  _this.$t("grossWeight") ,//毛重,
      //     prop: "gw",
      //     width: 100,
      //     cell: true,
      //     placeholder: ' ',
      //     type: "number"
      // },
      {
        label: _this.$t("revolve.packageCount"), // 打包数量
        prop: "packageCount",
        width: 100,
        cell: true,
        type: "number",
        placeholder: " "
      }
    ]
  };
}
