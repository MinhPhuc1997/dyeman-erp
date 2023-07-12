/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-20 10:49:02
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

const unit = getDIC("sal_breadthUnit");
let cust = getDicT("basCustomer", "custName", "custCode", {} , "custName");

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
        placeholder: " "
      },

      {
        label: _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label:  _this.$t('dptReciveLog.issuDate'), // 发单日期,
        prop: "workDate",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.dyeMathine"), //染缸機台號
        prop: "dyeMathine",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.operator"), //值機員
        prop: "operator",
        span: 6,
        placeholder: " "
      },
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
      {
        label: "创建时间",//"制單人
        prop: "createTime",
        span: 6,
        type:"daterange",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd",
        tip: "Thời gian tạo đơn"
      },
    ]
  };
}

export function mainEasyForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
    ]
  };
}

export function revolveForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: _this.$t("weaveJobCode") ,//织造生產單號,
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: _this.$t("orderMan") ,//开单员,
        prop: "serviceOperator",
        span: 6,
        placeholder: " ",
      }
    ]
  };
}

export function revolveCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    selection: false,
    page: true,
    labelWidth: 120,
    columnBtn: true,
    showSummary: true,
    sumColumnList: [
      {
        label: _this.$t("total"), //"合计:",
        name: "clothWeight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },

      {
        label: _this.$t("weaveJobCode") , //"生產單號",
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
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入缸號",
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
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
        label:  _this.$t("custName"), //"客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        sortable: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
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
        width: 80,
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
        formslot: true,
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
      },
      {
        label:  _this.$t("eachWeight") ,//疋重,
        // tip: "state",
        disabled: false,
        prop: "avgEachWeightKg",
        width: 120,
        labelWidth: 60,
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
        span: 4,
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "wmUnit",
        tip: "unit",
        labelWidth: 60,
        width: 80,
        span: 4,
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
        labelWidth: 70,
        width: 100,
        span: 4,
        type: "number",
        align: "right",
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
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        hide: true
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
        hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label:  _this.$t("gramWeight") ,//克重,
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        hide: true,
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
      // {
      //   label: "审核",
      //   // tip:"Nhận hàng yêu cầu",
      //   prop: "auditor",
      //   width: 80,
      //   span: 6,
      //   hide: true,
      //   placeholder: " "
      // },
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
        label:  _this.$t("qcComments") ,//QC评语,
        prop: "qcComments",
        tip: "Nhận xét",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      // {
      //   label: "列印時間",
      //   prop: "printDate",
      //   placeholder: " ",
      //   width: 90,
      //   hide: true,
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   disabled: true,
      //   display: true
      // },

      {
        label:  _this.$t("styleNo") ,//STLYLE款号,
        prop: "styleNo",
        tip: "#STLYLE 款号",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      // {
      //   label: _this.$t("revolve.etSn") ,//ET序号
      //   prop: "etSn",
      //   tip: "ET序号",
      //   span: 6,
      //   hide: true,
      //   width: 80,
      //   placeholder: " "
      // },
      {
        label:  _this.$t("season") ,//季节,
        prop: "custStyleCode",
        // tip: "MÃ CODE VẢI XUẤT HÀNG 代码",
        span: 5,
        hide: true,
        width: 60,
        placeholder: " "
      },
      {
        label:  _this.$t("firstOrOther") ,//头缸/缸差,
        // tip: "state",
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
        width: 80,
        span: 6,
        disabled: true,
        display: false,
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
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 335px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
      //   label:  _this.$t("dye.dyeMathine"), //染缸機台號
      //   prop: "dyeMathine",
      //   overHidden: true,
      //   tip: "Mã máy",
      //   width: 130,
      //   span: 6,
      //   disabled: false,
      //   sortable: true,
      //   type: "select",
      //   filterable: true,
      //   dicData: postDicT(
      //     "baseEquipmentList?categoryId=dev-12",
      //     "equipmentCode",
      //     "equipmentCode"
      //   )
      //   // rules: [{
      //   //   required: true,
      //   //   message: "請輸入染缸機台號",
      //   //   trigger: "blur"
      //   // }],
      // },
      {
        label:  _this.$t("dye.dyeMathine"), //染缸機台號
        tip: "Số bồn nhuộm chung",
        prop: "dyeMathine",
        overHidden: true,
        width: 130,
        span: 6,
        disabled: true,
        type: "select",
        dicData: [],
        formslot: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " ",
        hide: true,
        rules: [
          {
            required: true,
            message: "請選擇染缸機台號",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        overHidden: true,
        tip: "Số lô nhuộm",
        width: 140,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
        rules: [
          {
            required: true,
            message: "請選擇缸號",
            trigger: "blur"
          }
        ]
        // click: () => {
        //   if (!_this.copyCtr) {
        //     _this.choiceTle = _this.$t('choiceTem.dyeFinishingRun');
        //     _this.choiceQ.runState = "1";
        //     _this.choiceV = true;
        //   }
        // }
      },
      {
        label:  _this.$t("workDate"), //發單日期
        prop: "workDate",
        tip: "Ngày lập đơn",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: "请選擇發單日期",
        sortable: true,
        disabled: true,
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
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: "请選擇交货日期",
        sortable: true,
        disabled: true,
        rules: [
          {
            required: true,
            message: "请選擇交货日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("dye.tubeCount") ,// "染缸管数",
        prop: "tubeCount",
        tip: "",
        overHidden: true,
        width: 100,
        span: 6,
        disabled: true,
        placeholder: " ",
        type: "number",
        align: "right",
        hide: true
      },
      {
        label: _this.$t("dye.dyeJarCount") ,// "管數量",
        prop: "dyeJarCount",
        tip: "Số lượng ống",
        overHidden: true,
        width: 100,
        span: 6,
        disabled: false,
        placeholder: " ",
        type: "number",
        align: "right",
        hide: true
        // type: "select",
        // dicData: getDicT(
        //   "baseEquipmentCategoryList",
        //   "categoryName",
        //   "categoryCode",
        //   { parentId: "dev-12" }
        // )
        // rules: [
        //   {
        //     required: true,
        //     message: "請輸入管數量",
        //     trigger: "blur"
        //   }
        // ],
      },
      {
        label:  _this.$t("pidCount") ,//疋數,
        tip: "Cây",
        prop: "pidCount",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        disabled: true,
        placeholder: " "
      },
      {
        label:  _this.$t("weight") ,//重量,
        tip: "Trọng lượng",
        prop: "clothWeight",
        width: 100,
        disabled: true,
        span: 6,
        type: "number",
        disabled: true,
        align: "right",
        placeholder: " ",
        // precision: 1,
        rules: [
          {
            required: true,
            message: "请输入重量",
            trigger: "blur"
          }
        ],
        change: () => {
          // _this.$nextTick(() => {
          //   _this.form.dyeJarCount =
          //     Number(_this.form.clothWeight) / 350 >= 4
          //       ? 4
          //       : Math.ceil(Number(_this.form.clothWeight) / 350);
          // });
        },
        formatter(r, v){
          return v && _this.$num2ThousandthFormat(v, 1)
        }
      },

      {
        label:  _this.$t("address"), //交貨地址
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 180,
        disabled: true,
        span: 12,
        placeholder: " "
      },
      {
        label: _this.$t("weaveJobCode") , //"織造生產單號",
        tip: "MS dệt sản xuất",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        disabled: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },

      {
        label:  _this.$t("custName") ,//客戶名稱,
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: cust
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.custCode = _this.form.custName
        //   })

        // }
      },

      {
        label: _this.$t("poNo") ,//生产单号,
        tip: "Mã số đơn hàng",
        prop: "salPoNo",
        disabled: true,
        width: 180,
        span: 6,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },

      {
        label:  _this.$t("poAmountKg") ,//訂單數量,
        tip: " Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        disabled: true,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            _this.form.poAmountLb = (_this.form.poAmountKg * 2.2046226).toFixed(
              2
            );
          });
        },
        formatter(r, v){
          return v && _this.$num2ThousandthFormat(v, 1)
        }
      },
      {
        label: _this.$t("poAmountLb") ,//"訂單數量(p)",
        prop: "poAmountLb",
        tip: " Số lượng đơn hàng",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        hide: true,
        disabled: true,
        change: () => {
          // _this.$nextTick(() => {
          //   _this.form.poAmountKg = _this.form.poAmountKg * 2.2046226
          // })
        }
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        tip: "Loại vải",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        disabled: true,
        placeholder: " "
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
      },

      {
        label:  _this.$t("fabElements") ,//布类成份,
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        disabled: true,
        span: 6
      },

      {
        label:  _this.$t("yarnBatch"), //紗線批號
        tip: "Lô sợi nhà máy",
        prop: "yarnBatchNo",
        span: 6,
        width: 120,

        placeholder: " ",
        disabled: true,
        hide: true
      },
      {
        label:  _this.$t("yarnNumber"), //紗牌紗批
        tip: "Lót sợi",
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: true,
        hide: true
      },
      {
        label:  _this.$t("yarnCard") ,//紗牌,
        prop: "yarnCard",
        tip: "Brand",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: true,
        hide: true
      },

      {
        label:  _this.$t("colorName"), //顏色名稱,
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6,
        disabled: true,
        placeholder: " "
        // rules: [{
        //   required: true,
        //   message: "请選擇顏色名稱",
        //   trigger: "blur"
        // }],
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        tip: "Số màu",
        width: 150,
        span: 6,
        overHidden: true,
        disabled: true,
        placeholder: " "
      },
      {
        label:  _this.$t("mergVatNo") ,//合染缸號,
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: true,
        type: "select",
        dicData: [],
        formslot: true,
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },

      {
        label:  _this.$t("breadth"), //幅寬
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        disabled: true,
        // type: "number",
        placeholder: " "
      },

      // {
      //   label: "幅寬單位",
      //   prop: "breadthUnit",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 80,
      //   type: "select",
      //   dicData: unit
      // },

      {
        label:  _this.$t("yarnLength") ,//紗長,
        prop: "yarnLength",
        tip: "Sợi dài",
        span: 6,
        hide: true,
        placeholder: " ",
        disabled: true,
        width: 80
        // tyep: "number"
      },

      // {
      //   label: "筒徑單位",
      //   prop: "tubeDiamUnit",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 80,
      //   type: "select",
      //   dicData: unit
      // },

      {
        label:  _this.$t("needleDist"), //針距
        prop: "needleDist",
        tip: "Khoảng cách kim",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        disabled: true,
        type: "number"
      },
      // {
      //   label: "針距單位",
      //   prop: "needleDistUnit",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 80,
      //   type: "select",
      //   dicData: unit
      // },
      {
        label:  _this.$t("tubeDiam"), //筒徑"
        prop: "tubeDiam",
        tip: "kính thoi",
        span: 6,
        hide: true,
        disabled: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },

      // {
      //   label: "紗長單位",
      //   prop: "yarnLengthUnit",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 80,
      //   type: "select",
      //   dicData: unit
      // },

      {
        label:  _this.$t("gramWeight"), //克重,
        prop: "gramWeight",
        tip: "Trọng lượng vải mộc",
        width: 120,
        disabled: true,
        hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },

      {
        label:  _this.$t("poColorCount"), //顏色數量
        prop: "poColorCount",
        tip: "Số lượng màu",
        disabled: true,
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("poVatCount") ,//訂單總缸數,
        prop: "poVatCount",
        disabled: true,
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
        tip: "Thứ ? Bồn",
        width: 120,
        disabled: true,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },

      {
        label:  _this.$t("compVatNo") ,//对色标准/缸号,
        tip: "Tiêu chuẩn so màu/Số bồn nhuộm",
        prop: "compVatNo",
        width: 120,
        hide: true,
        placeholder: " ",
        disabled: true,
        span: 6
      },
      {
        label:  _this.$t("colorLights"), //對色光源,
        tip: "Nguồn sáng so màu",
        prop: "compLightSource",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6,
        disabled: true,
        multiple: true,
        type: "select",
        dicData: getDIC("sal_colorLights")
      },

      {
        label:  _this.$t("specParam"), //規格參考
        prop: "specParam",
        tip: "Quy cách tham khảo",
        width: 120,
        hide: true,
        disabled: true,
        placeholder: " ",
        span: 12
      },
      // {
      //   label: _this.$t("revolve.etSn") ,//ET序号
      //   prop: "etSn",
      //   tip: "ET序号",
      //   width: 120,
      //   hide: true,
      //   placeholder: " ",
      //   span: 6
      // },
      {
        label:  _this.$t("dye.mateStockMan"), //稱料員
        prop: "mateStockMan",
        tip: "Thợ cân",
        disabled: true,
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.operator"), //值機員
        prop: "operator",
        tip: "Công nhân đứng máy",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label:  _this.$t("dye.chargeWeave"), //工廠負責人
        prop: "chargeWeave",
        tip: "Người phụ trách",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("printDate"), //打印時間
        prop: "printDate",
        tip: "Ngày in",
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
        label:  "创建时间", //打印時間
        prop: "createTime",
        width: 200,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        disabled: true
      }
    ],
    group: [
      {
        icon: "el-icon-s-order",
        label: "成品规格要求 quy cách thành phẩm Y/C",
        prop: "group1",
        column: [
          {
            label:  _this.$t("breadthActual") ,//實用幅寬,
            tip: "Khổ rộng Thực dụng",
            prop: "breadthActual",
            width: 90,
            hide: true,
            span: 6,
            disabled: true,
            // type: "number",
            placeholder: " "
          },
          {
            label:  _this.$t("breadthBorder") ,//連邊幅寬,
            tip: "Khổ rộng Tiếp giáp",
            prop: "breadthBorder",
            width: 90,
            hide: true,
            disabled: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label: _this.$t("gramWeightBefor") ,//洗前(克重)",
            tip: "Trọng lượng Giặt trước",
            prop: "gramWeightBefor",
            width: 120,
            hide: true,
            span: 6,
            disabled: true,
            // type: "number",
            placeholder: " "
          },
          {
            label: _this.$t("gramWeightAfter") ,//成品/洗後(克重)
            prop: "gramWeightAfter",
            width: 120,
            tip: "Trọng lượng Giặt sau",
            hide: true,
            span: 6,
            disabled: true,
            // type: "number",
            placeholder: " "
          },
          {
            label:  _this.$t("shrinkLenth") ,//直縮,
            tip: "co rút thẳng",
            prop: "shrinkLenth",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            disabled: true
            // type: "number"
          },
          {
            label:  _this.$t("shrinkWidth") ,//橫縮,
            tip: "Co rút ngang",
            prop: "shrinkWidth",
            span: 6,
            hide: true,
            disabled: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },

          {
            label:  _this.$t("shrinkNear") ,//縮水(扭度),
            prop: "shrinkNear",
            tip: "Độ méo",
            span: 6,
            hide: true,
            disabled: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },
          {
            label:  _this.$t("shrinkRotate") ,//縮水(循環),
            prop: "shrinkRotate",
            tip: "Tuần hoàn",
            span: 6,
            hide: true,
            width: 80,
            disabled: true,
            placeholder: " ",
            type: "number"
          },

          {
            label:  _this.$t("hangDry"), //縮水(掛幹)
            prop: "hangDry",
            tip: "Treo khô",
            span: 6,
            hide: true,
            disabled: true,
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
            label:  _this.$t("flatDry"), //縮水(平幹)
            prop: "flatDry",
            tip: "Phơi phẳng",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            disabled: true,
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
            label:  _this.$t("throwDry"), //縮水(拋幹)
            prop: "throwDry",
            tip: "Vắt khô",
            span: 6,
            hide: true,
            disabled: true,
            width: 80,
            placeholder: " "
          }
        ]
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
        valueFormat: "yyyy-MM-dd HH:mm:ss"
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

export function longCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label:  _this.$t("weaveJob.yarnLength"), //纱长
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "right",
        cell: true
      },
      {
        label:  _this.$t("weaveJob.signDate"), //時間
        prop: "signDate",
        type: "datetime",
        width: 200,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
        cell: true
      }
    ]
  };
}

export function yarnCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 112px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false,
      // },
      {
        label:  _this.$t("yarnCode"), //紗線編號
        prop: "yarnCode",
        width: 120,
        span: 6,
        cell: true
      },
      {
        label:  _this.$t("yarnName"), // "紗線名稱",
        prop: "yarnName",
        width: 400,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label:  _this.$t("batchNo"), //  "批號",
        prop: "yarnBatch",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: _this.$t("factoryBatch"), //  "本厂批號",
        prop: "factoryYarnBatch",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label:  _this.$t("yarnCard") ,//紗牌,
        prop: "yarnBrand",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label:  _this.$t("quantity") ,// "數量",
        prop: "amount",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },
      {
        label:  _this.$t("unit"), //單位
        prop: "unit",
        width: 100,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: unit
      }
    ]
  };
}

export function groupCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 70,
        cell: true,
        placeholder: " ",
        align: "center"
      },
      {
        label: _this.$t("dye.jobItemName"), // "项目名称 Mục sản xuất",
        prop: "jobItemName",
        width: 500,
        span: 6,
        cell: true
        // type: "select",
        // dicData: []
        // overHidden: true
      },
      {
        label:  _this.$t("remark") ,//备注说明,
        prop: "remark",
        width: 500,
        span: 6,
        cell: true
        // overHidden: true
      }
    ]
  };
}

export function testCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label:  _this.$t("dye.testItemCode"), //  "测试项目编号",
        prop: "testItemCode",
        width: 140,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("dye.testName"), //  "测试项目名称 Mục",
        prop: "testName",
        width: 300,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: _this.$t("dye.testItemName"), // "测试标准 Tiêu chuẩn",
        prop: "testItemName",
        width: 300,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: _this.$t("dye.testItemContent"), // "测试要求 Yêu cầu ",
        prop: "testItemContent",
        width: 300,
        span: 6,
        cell: true,
        placeholder: " "
      }
    ]
  };
}

export function dyeCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label: _this.$t("dye.vatParamCode"), // "染缸参数编号",
        prop: "vatParamCode",
        width: 100,
        cell: true,
        span: 6
      },
      {
        label: _this.$t("dye.vatParamName"), // "项目名称 Mục",
        prop: "vatParamName",
        width: 400,
        cell: true,
        span: 6
      },
      // {
      //   label: "数据格式",
      //   prop: "dataStyle",
      //   width: 120,
      //   cell: true,
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: _this.$t("dye.bleachSet"), // "练漂设定值 Tẩy luyện Cài đặt",
        prop: "bleachSet",
        slot: true,
        width: 130,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "number"
      },
      {
        label: _this.$t("dye.bleachFact"), // "练漂实际值 Tẩy luyện Thực tế",
        prop: "bleachFact",
        slot: true,
        width: 140,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "number"
      },
      {
        label: _this.$t("dye.dyeSet"), // "染色设定值 Nhuộm Cài đặt",
        prop: "dyeSet",
        slot: true,
        width: 130,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "number"
      },
      {
        label: _this.$t("dye.dyeFact"), // "染色实际值 Nhuộm Thực tế",
        prop: "dyeFact",
        slot: true,
        width: 130,
        cell: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("dye.soapSet"), // "皂洗设定值 Giặt xà phòng Cài đặt",
        prop: "soapSet",
        slot: true,
        width: 145,
        cell: true,
        type: "number",
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("dye.soapFact"), // "皂洗实际值 Giặt xà phòng Thực tế",
        prop: "soapFact",
        slot: true,
        width: 150,
        type: "number",
        cell: true,
        placeholder: " ",
        span: 6
      }
    ]
  };
}

let bleadyeCode = getXDicT("proBleadyeTechCode");

export function techargueCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 60,
        cell: true,
        align: "center",
        display: false
      },
      {
        label: _this.$t("dye.techCode"), // "工艺代碼",
        prop: "proBleadyeTechCodeFk",
        width: 90,
        cell: false,
        span: 6,
        props: {
          label: "bleadyeCode",
          value: "bleadyeCodeId"
        },
        type: "select",
        dicData: bleadyeCode
      },
      {
        label: _this.$t("dye.techName"), // "工艺名稱",
        prop: "bleadyeCode",
        width: 120,
        cell: false,
        overHidden: true,
        span: 6,
        props: {
          label: "bleadyeName",
          value: "bleadyeCodeId"
        },
        type: "select",
        dicData: bleadyeCode,
      },

      {
        label: _this.$t("finalizeDesign.waterRatio") ,//浴比
        prop: "liquorRatio",
        width: 60,
        cell: true,
        type: "number",
        align: "right",
        span: 6,
        change: val => {
          if (!val.value) {
            _this.$nextTick(() => {
              _this.chooseData.liquorRatio = 0;
            });
          }
          if (_this.mathCtr) {
            _this.$nextTick(() => {
              _this.chooseData.totalWater = Number(
                Number(_this.vatWeight) *
                Number(_this.chooseData.liquorRatio)
              );
              _this.chooseData.totalWater = _this.chooseData.totalWater.toFixed(
                0
              );
            });
          }
        }
      },
      {
        label:  _this.$t("dye.totalWater"), //总水量
        prop: "totalWater",
        width: 80,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          if (!val.value) {
            _this.$nextTick(() => {
              _this.chooseData.totalWater = 0;
            });
          }
          if (_this.mathCtr) {
            if (!_this.chooseData.list) {
              _this.$nextTick(() => {
                _this.$set(
                  _this.chooseData,
                  "haltWater",
                  Number(
                    Number(_this.chooseData.totalWater) -
                    Number(_this.chooseData.wetClothWater) *
                    0.01 *
                    _this.vatWeight -
                    Number(_this.chooseData.shotgunWater)
                  ).toFixed(0)
                );
                // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
              });
            } else {
              _this.$nextTick(() => {
                _this.$set(
                  _this.chooseData,
                  "haltWater",
                  Number(
                    Number(_this.chooseData.totalWater) -
                    Number(_this.chooseData.wetClothWater) *
                    0.01 *
                    _this.vatWeight -
                    Number(_this.chooseData.shotgunWater)
                  ).toFixed(0)
                );
                // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
                _this.chooseData.list.forEach(item => {
                  if (item.measureType && item.measureType.indexOf("g") != -1) {
                    if (item.formulaUnit == "KG") {
                      item.useAmount = Number(
                        (
                          Number(
                            item.formulaAmount * _this.chooseData.totalWater
                          ) * 0.001
                        ).toFixed(2)
                      );
                    } else {
                      item.useAmount = Number(
                        Number(
                          item.formulaAmount * _this.chooseData.totalWater
                        ).toFixed(2)
                      );
                    }
                    isNaN(item.useAmount) ? (item.useAmount = 0) : "";
                  }
                });
              });
            }
          }
        }
      },
      {
        label:  _this.$t("dye.wetClothWater"), //布含水量(%)
        prop: "wetClothWater",
        width: 110,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          if (!val.value) {
            _this.$nextTick(() => {
              _this.chooseData.wetClothWater = 0;
            });
          }
          if (_this.mathCtr) {
            _this.$nextTick(() => {
              _this.$set(
                _this.chooseData,
                "haltWater",
                Number(
                  Number(_this.chooseData.totalWater) -
                  Number(_this.chooseData.wetClothWater) *
                  0.01 *
                  _this.vatWeight -
                  Number(_this.chooseData.shotgunWater)
                ).toFixed(0)
              );
              // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
            });
          }
        }
      },
      {
        label:  _this.$t("dye.shotgunWater"), //副缸外加水量
        prop: "shotgunWater",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          // if (!val.value) {
          //   _this.$nextTick(() => {
          //     console.log(val);
          //     return;
          //     _this.chooseData.shotgunWater = 0;
          //   });
          // }
          if (_this.mathCtr) {
            _this.$nextTick(() => {
              _this.$set(
                _this.chooseData,
                "haltWater",
                Number(
                  Number(_this.chooseData.totalWater) -
                  Number(_this.chooseData.wetClothWater) *
                  0.01 *
                  _this.vatWeight -
                  Number(_this.chooseData.shotgunWater)
                ).toFixed(0)
              );
              // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
            });
          }
        }
      },
      {
        label:  _this.$t("dye.haltWater"), //停机水量
        prop: "haltWater",
        width: 85,
        cell: true,
        type: "number",
        span: 6,
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          if (!val.value || val.value < 0) {
            _this.$nextTick(() => {
              _this.chooseData.haltWater = 0;
            });
          }
          _this.$nextTick(() => {
            if (isNaN(_this.chooseData.haltWater)) {
              _this.chooseData.haltWater = 0;
            }
          });
        }
      }
    ]
  };
}

export function techargueCrudEx(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 60,
        cell: true,
        align: "center",
        display: false
      },
      {
        label: _this.$t("dye.techCode"), // "工艺代碼",
        prop: "bleadyeCode",
        width: 90,
        span: 6,
        type: "select",
      },
      {
        label: _this.$t("dye.techName"), // "工艺名稱",
        prop: "bleadyeName",
        width: 200,
       // overHidden: true,
        span: 6,
      },

      {
        label: _this.$t("finalizeDesign.waterRatio") ,//浴比
        prop: "liquorRatio",
        width: 60,
        cell: true,
        type: "number",
        align: "right",
        span: 6,
        change: val => {
          if (!val.value) {
            _this.$nextTick(() => {
              _this.chooseData.liquorRatio = 0;
            });
          }
          if (_this.mathCtr) {
            _this.$nextTick(() => {
              _this.chooseData.totalWater = Number(
                Number(_this.vatWeight) *
                Number(_this.chooseData.liquorRatio)
              );
              _this.chooseData.totalWater = _this.chooseData.totalWater.toFixed(
                0
              );
            });
          }
        }
      },
      {
        label:  _this.$t("dye.totalWater"), //总水量
        prop: "totalWater",
        width: 80,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          if (!val.value) {
            _this.$nextTick(() => {
              _this.chooseData.totalWater = 0;
            });
          }
          if (_this.mathCtr) {
            if (!_this.chooseData.list) {
              _this.$nextTick(() => {
                _this.$set(
                  _this.chooseData,
                  "haltWater",
                  Number(
                    Number(_this.chooseData.totalWater) -
                    Number(_this.chooseData.wetClothWater) *
                    0.01 *
                    _this.vatWeight -
                    Number(_this.chooseData.shotgunWater)
                  ).toFixed(0)
                );
                // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
              });
            } else {
              _this.$nextTick(() => {
                _this.$set(
                  _this.chooseData,
                  "haltWater",
                  Number(
                    Number(_this.chooseData.totalWater) -
                    Number(_this.chooseData.wetClothWater) *
                    0.01 *
                    _this.vatWeight -
                    Number(_this.chooseData.shotgunWater)
                  ).toFixed(0)
                );
                // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
                _this.chooseData.list.forEach(item => {
                  if (item.measureType && item.measureType.indexOf("g") != -1) {
                    if (item.formulaUnit == "KG") {
                      item.useAmount = Number(
                        (
                          Number(
                            item.formulaAmount * _this.chooseData.totalWater
                          ) * 0.001
                        ).toFixed(2)
                      );
                    } else {
                      item.useAmount = Number(
                        Number(
                          item.formulaAmount * _this.chooseData.totalWater
                        ).toFixed(2)
                      );
                    }
                    isNaN(item.useAmount) ? (item.useAmount = 0) : "";
                  }
                });
              });
            }
          }
        }
      },
      {
        label:  _this.$t("dye.wetClothWater"), //布含水量(%)
        prop: "wetClothWater",
        width: 110,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          if (!val.value) {
            _this.$nextTick(() => {
              _this.chooseData.wetClothWater = 0;
            });
          }
          if (_this.mathCtr) {
            _this.$nextTick(() => {
              _this.$set(
                _this.chooseData,
                "haltWater",
                Number(
                  Number(_this.chooseData.totalWater) -
                  Number(_this.chooseData.wetClothWater) *
                  0.01 *
                  _this.vatWeight -
                  Number(_this.chooseData.shotgunWater)
                ).toFixed(0)
              );
              // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
            });
          }
        }
      },
      {
        label:  _this.$t("dye.shotgunWater"), //副缸外加水量
        prop: "shotgunWater",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          // if (!val.value) {
          //   _this.$nextTick(() => {
          //     console.log(val);
          //     return;
          //     _this.chooseData.shotgunWater = 0;
          //   });
          // }
          if (_this.mathCtr) {
            _this.$nextTick(() => {
              _this.$set(
                _this.chooseData,
                "haltWater",
                Number(
                  Number(_this.chooseData.totalWater) -
                  Number(_this.chooseData.wetClothWater) *
                  0.01 *
                  _this.vatWeight -
                  Number(_this.chooseData.shotgunWater)
                ).toFixed(0)
              );
              // _this.chooseData.haltWater = Number(_this.chooseData.totalWater) - Number(_this.chooseData.wetClothWater) - Number(_this.chooseData.shotgunWater)
            });
          }
        }
      },
      {
        label:  _this.$t("dye.haltWater"), //停机水量
        prop: "haltWater",
        width: 85,
        cell: true,
        type: "number",
        span: 6,
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        change: val => {
          if (!val.value || val.value < 0) {
            _this.$nextTick(() => {
              _this.chooseData.haltWater = 0;
            });
          }
          _this.$nextTick(() => {
            if (isNaN(_this.chooseData.haltWater)) {
              _this.chooseData.haltWater = 0;
            }
          });
        }
      }
    ]
  };
}

export function codeItemCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 112px)",
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
        label:  _this.$t("dye.mateCode"), //物料编号
        prop: "mateCode",
        width: 100,
        cell: false,
        span: 6,
        placeholder: " ",
      },
      {
        label:  _this.$t("dye.mateName"), //物料名稱
        prop: "mateName",
        width: 200,
        cell: true,
        span: 6,
        // overHidden: true,
        slot: true,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.mateBatchNo"), //物料批次
        prop: "mateBatchNo",
        width: 100,
        cell: true,
        span: 6,
        slot: true,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.formulaAmount"), //配方用量
        prop: "formulaAmount",
        width: 90,
        cell: false,
        type: "number",
        align: 'center',
        span: 6,
        slot: true,
        placeholder: " ",
        change: () => {
          if (_this.mathCtr) {
            if (!_this.chooseDtlData.measureType) {
              return;
            }
            _this.$nextTick(() => {
              if (
                _this.chooseDtlData.measureType.indexOf("g") == -1 &&
                _this.chooseDtlData.measureType.indexOf("G") == -1
              ) {
                if (_this.chooseDtlData.formulaUnit == "KG") {
                  _this.chooseDtlData.useAmount = Number(
                    (
                      Number(_this.form.clothWeight) *
                      Number(_this.chooseDtlData.formulaAmount) *
                      0.01
                    ).toFixed(2)
                  );
                } else {
                  _this.chooseDtlData.useAmount = Number(
                    (
                      Number(_this.form.clothWeight) *
                      Number(_this.chooseDtlData.formulaAmount) *
                      10
                    ).toFixed(2)
                  );
                }
              } else {
                if (_this.chooseDtlData.formulaUnit == "KG") {
                  _this.chooseDtlData.useAmount = Number(
                    Number(
                      _this.chooseDtlData.formulaAmount *
                      _this.chooseData.totalWater *
                      0.001
                    ).toFixed(2)
                  );
                } else {
                  _this.chooseDtlData.useAmount = Number(
                    Number(
                      _this.chooseDtlData.formulaAmount *
                      _this.chooseData.totalWater
                    ).toFixed(2)
                  );
                }
              }
              isNaN(_this.chooseDtlData.useAmount)
                ? (_this.chooseDtlData.useAmount = 0)
                : "";
            });
          }
        }
      },
      {
        label:  _this.$t("dye.measureType"), //材料度量
        prop: "measureType",
        width: 90,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "select",
        align: "center",
        dicData: [
          {
            label: "%",
            value: "%"
          },
          {
            label: "X%",
            value: "X%"
          },
          {
            label: "g/L",
            value: "g/L"
          }
        ]
      },

      {
        label:  _this.$t("dye.useAmount"), //材料用量
        prop: "useAmount",
        width: 90,
        cell: false,
        type: "number",
        span: 6,
        slot: true,
        placeholder: " "
      },
      {
        label:  _this.$t("unit"), //單位
        prop: "formulaUnit",
        width: 80,
        cell: true,
        slot: true,
        span: 6,
        align: "center",
        type: "select",
        dicData: [
          {
            label: "KG",
            value: "KG"
          },
          {
            label: "g",
            value: "g"
          },
          {
            label: "L",
            value: "L"
          }
        ],
        placeholder: " ",
        change: val => {
          // if (val.value == '')
          //   _this.$nextTick(() => {
          //   })
        }
      },
      {
        label:  _this.$t("dye.bleadyeType"), //工藝類型
        prop: "bleadyeType",
        width: 90,
        cell: false,
        span: 6,
        placeholder: " ",
        align: "center",
        // slot: true,
        type: "select",
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
        ]
      },
      {
        label:  _this.$t("dye.runTemp"), //溫度
        prop: "runTemp",
        width: 80,
        cell: true,
        type: "number",
        span: 6,
        slot: true,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.runTime"), //時間(分鐘
        prop: "runTime",
        width: 100,
        cell: true,
        type: "number",
        span: 6,
        slot: true,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.dilutionRate"), //開稀比例
        prop: "dilutionRate",
        width: 90,
        cell: true,
        type: "number",
        span: 6,
        slot: true,
        placeholder: " "
      },
      {
        label:  _this.$t("dye.deliveryQuantity"), //輸送數量
        prop: "deliveryQuantity",
        width: 120,
        cell: false,
        type: "number",
        minRows: 1,
        span: 6,
        // slot: true,
        placeholder: " "
      }
    ]
  };
}

export function carCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label: _this.$t("dye.itemName"), // "长车加工项目 Mục",
        prop: "itemName",
        width: 300,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("dye.bleachVale"), // "练漂参数 Tẩy luyện",
        prop: "bleachVale",
        width: 180,
        span: 6,
        cell: true,
        type: "number",
        placeholder: " "
      },
      {
        label: _this.$t("dye.soapValue"), // "皂洗参数 Giặt xà phòng",
        prop: "soapValue",
        width: 200,
        span: 6,
        cell: true,
        type: "number",
        placeholder: " "
      }
    ]
  };
}
