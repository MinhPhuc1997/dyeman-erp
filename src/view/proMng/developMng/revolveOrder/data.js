/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-14 10:07:05
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
import i18n from "@/lang/index";
// 染布类容 1衫身 2下栏 
const dyeMatter = [
  {
    value: 1,
    label: i18n.t("shirtBody") //"衫身"
  },
  {
    value: 2,
    label: i18n.t("lowerColumn") //"下栏"
  }
]

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
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
        label: _this.$t("poNo") ,//"生产单号",
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
        span: 6,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
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
    height: "calc(100vh - 365px)",
    refreshBtn: false,
    index: true,
    page: true,
    labelWidth: 130,
    selection: true,
    columnBtn: true,
    selectable: (row, index) => {
      return row.auditState != 1 && row.serviceOperator == parent.userID;
    },
    showSummary: true,
    sumColumnList: [
      {
        label: ' ', //"合计:",
        name: "clothWeight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        fixed: true,
        rules: [
          {
            required: true,
            message: "請輸入缸號",
            trigger: "blur"
          }
        ]
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
      {
        label: _this.$t("weaveJobCode"), //"生產單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        formslot: true,
        placeholder: "請選擇織造生產單號",
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
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
        rules: [
          {
            required: true,
            message: "请選擇發單日期",
            trigger: "blur"
          }
        ]
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
        rules: [
          {
            required: true,
            message: "请選擇交货日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: " ",
        sortable: true,
        // sortable: true,
        overHidden: true
      },
      {
        label:  _this.$t("custName"), //"客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        sortable: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        type: "select",
        dicData: cust
      },
      
      {
        label: _this.$t("custPoNo") ,//客人PO,
        prop: "custPoNo",
        tip: "PO khách hàng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
      },
      {
        label:  _this.$t("contractNo") ,//合同号,
        prop: "contractNo",
        tip: "Số hiệu hợp đồng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
      },
      {
        label: "FEPO",
        prop: "thirdPo",
        tip: "Mã đặt hàng",
        span: 6,
        hide: true,
        width: 90,
        overHidden: true,
        sortable: true,
        placeholder: " "
      },
      {
        label: "No",
        prop: "thirdSn",
        tip: "Mã nhận diện",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
      },
      {
        label:  _this.$t("address") ,//交货地址,
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " "
      },
      {
        label:  _this.$t("colorName"), //顏色名稱,
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true,
        span: 6
      },
      {
        label: _this.$t("colorCode") ,//工厂色號,
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        sortable: true,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("guestColorNo") ,//客色號,
        tip: "khách hàng số màu",
        prop: "custColorNo",
        width: 150,
        span: 6,
        sortable: true,
        overHidden: true,
        placeholder: " "
      },

      {
        label:  _this.$t("poAmountKg") ,//訂單數量,
        tip: "Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
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
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        
        rules: [
          {
            required: true,
            message: "请输入投胚数量",
            trigger: "blur"
          }
        ],
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
              _this.$tip.error("合计重量不能大于设定生产机种重量!");
            });
          }
        }
      },
      {
        label:  _this.$t("eachWeight") ,//疋重,
        // tip: "state",
        disabled: false,
        prop: "avgEachWeightKg",
        width: 120,
        
        type: "switch",
        dicData: [
          {
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
              ).toFixed(0);
            });
          }
        }
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "wmUnit",
        tip: "unit",
        width: 80,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
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
        label:  _this.$t("pidCount") ,//疋數,
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        minRows: 1,
        placeholder: " "
      },
      {
        label:  _this.$t("dyeClothWeight") ,//染整数量,
        prop: "dyeClothWeight",
        tip: "Số lượng vải mộc",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true,
        rules: [
          {
            required: true,
            message: "请输入染整数量",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("divdWeight") ,//拆缸重量,
        prop: "divdCw",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        type: "number",
        placeholder: " "
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
        span: 12,
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
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 12
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
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("gramWeight") ,//克重,
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        span: 6,
        sortable: true,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("compVatNo") ,//对色标准/缸号,
        tip: "Tiêu chuẩn so màu / số bồn nhuộm",
        prop: "compVatNo",
        width: 120,
        hide: true,
        span: 6,
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
          "setCapacity",
          { parentId: "dev-12" }
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
        label:  _this.$t("acceptRequirement") ,//收货要求,
        tip: "Nhận hàng yêu cầu",
        prop: "acceptRequirement",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      
      {
        label:  _this.$t("dyeMatter") ,//染布类型,
        prop: "dyeMatter",
        span: 6,
        width: 100,
        type: "select",
        dicData: dyeMatter,
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
        label:  _this.$t("qcComments") ,//QC评语,
        prop: "qcComments",
        tip: "Nhận xét",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label:  _this.$t("season") ,//季节,
        prop: "custStyleCode",
        span: 5,
        hide: true,
        width: 60,
        placeholder: " "
      },
      {
        label:  _this.$t("firstOrOther") ,//头缸/缸差,
        disabled: false,
        prop: "firstOrOther",
        width: 100,
        type: "radio",
        dicData: [
          {
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
        span: 6,
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
        dicData: [
          {
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
        span: 7,
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
        dicData: [
          {
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
      {
        label: _this.$t("orderMan") ,//开单员,
        tip: "开单员",
        prop: "serviceOperator",
        width: 100,
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
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        tip: "Ghi chú",
        type: "textarea",
        minRows: 2,
        span: 24,
        hide: true,
        width: 80,
        placeholder: " "
      }
    ],
    group: [
      {
        icon: "el-icon-info",
        label: "成品规格 Quy cách thành phẩm Y/C",
        prop: "basic1",
        column: [
          {
            label:  _this.$t("breadthActual") ,//實用幅寬,
            prop: "breadthActual",
            tip: "Khổ rộng Thực dụng ",
            width: 90,
            hide: true,
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
            type: "switch",
            dicData: [
              {
                label: _this.$t("public.false"),
                value: 0
              },
              {
                label: _this.$t("public.true"),
                value: 1
              }
            ]
          },
          {
            label:  _this.$t("flatDry") ,//平干,
            tip: "Phơi phẳng ",
            prop: "flatDry",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: _this.$t("public.false"),
                value: 0
              },
              {
                label: _this.$t("public.true"),
                value: 1
              }
            ]
          },
          {
            label:  _this.$t("flatDry") ,//拋干,
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
        column: [
          {
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
            dicData: [
              {
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
            dicData: [
              {
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
            dicData: [
              {
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
            dicData: [
              {
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
            dicData: [
              {
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
        column: [
          {
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
            dicData: [
              {
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
            dicData: [
              {
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
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 145px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "clothNoteCode",
        type: "count"
      }
    ],
    column: [
      {
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
        width: 70,
        span: 6,
        placeholder: " ",
        align: "right",
        hide: false
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
    height: "calc(100vh - 189px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    selection: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "neiWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "productNo",
        type: "count"
      }
    ],
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label:  _this.$t("productNo") ,//成品编号,
        prop: "productNo",
        overHidden: true,
        span: 6,
        disabled: false,
        sortable: true,
        cell: false
      },
      {
        label:  _this.$t("weight") ,//重量,
        prop: "netWeight",
        overHidden: true,
        width: 70,
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
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 5.466667rem)",
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
        display: false
      },
      {
        label:  _this.$t("testName") ,//项目,
        prop: "testName",
        overHidden: true,
        type: "textarea",
        minRows: 2,
        maxRows: 4,
        width: 160,
        span: 6,
        disabled: false,
        cell: true
      },
      {
        label:  _this.$t("testItemName") ,//标准,
        prop: "testItemName",
        overHidden: false,
        type: "textarea",
        minRows: 2,
        maxRows: 4,
        // width: 160,
        span: 6,
        disabled: false,
        placeholder: " ",
        cell: true
      },
      {
        label:  _this.$t("testItemContent") ,//要求,
        prop: "testItemContent",
        overHidden: false,
        width: 160,
        minRows: 2,
        maxRows: 4,
        type: "textarea",
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
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 5.466667rem)",
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
        display: false
      },
      {
        label:  _this.$t("testName") ,//项目名称,
        prop: "jobItemName",
        overHidden: false,
        span: 6,
        disabled: false,
        cell: true
      },
      {
        label:  _this.$t("remark") ,//备注说明,
        prop: "remark",
        overHidden: false,
        span: 6,
        placeholder: " ",
        align: "center",
        cell: true
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


// TODO 颜色选择
export function colSelCrudOp(_this){
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 5.2rem)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column:[
      {
        label:  _this.$t("weaveJobCode") ,//织单号,
        prop: "weaveJobCode",
        width: "130",
        overHidden: true,
      },
      {
        label: _this.$t("colorName") ,//颜色,
        prop: "colorName",
        width: "140",
        overHidden: true,
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
        overHidden: true,
      },
      {
        label:  _this.$t("bomId") ,//BOM编号,
        prop: "bomId",
        width: "120",
        overHidden: true,
      },
      {
        label:  _this.$t("specParam") ,//规格参考,
        prop: "okGh",
        width: "120",
        overHidden: true,
      },
      {
        label:  _this.$t("factoryColorNo") ,//本厂色号,
        prop: "colorNo",
        width: "100",
        overHidden: true,
      },
      {
        label: "OK LD",
        prop: "okLd",
        width: "100",
        overHidden: true,
      },
      {
        label:  _this.$t("oneRem") ,//头缸描述,
        prop: "oneRem",
        width: "100",
        overHidden: true,
      },
      {
        label:  _this.$t("twoRem") ,//缸差描述,
        prop: "twoRem",
        width: "100",
        overHidden: true,
      },
      {
        label:  _this.$t("thrRem") ,//测试办描述,
        prop: "thrRem",
        width: "120",
        overHidden: true,
      },
      {
        label:  _this.$t("fourRem") ,//PP办描述,
        prop: "fourRem",
        width: "100",
        overHidden: true,
      },
      {
        label:  _this.$t("colorStandard"), //对色标准,
        prop: "light",
        width: "100",
        overHidden: true,
      },
    ]
  }
}




