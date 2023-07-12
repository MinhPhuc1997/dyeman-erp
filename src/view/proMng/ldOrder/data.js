/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-15 16:21:27
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
        label: _this.$t("orderNo") ,//"订单号",
        tip: "Số đơn hàng",
        prop: "orderNo",
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("fabCode") ,//"布料编号,
        tip: "Mã vải",
        prop: "fabricCode",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("startDate") ,// "开始日期",
        tip: "Ngày bắt đầu nhận đơn",
        prop: "startDate",
        span: 6,
        placeholder: " ",
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
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

let cust = getDicT("basCustomer", "custName", "custCode");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 236px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelPosition: "top",
    labelWidth: 150,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },

      {
        label: _this.$t("custName") ,//"客户名称(Khách hàng)",
        tip: "客户名称(Khách hàng)",
        prop: "custName",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: cust,
        rules: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.$nextTick(() => {
            _this.form.custCode = _this.form.custName;
          });
        }
      },
      {
        label:  _this.$t("custCode") ,//"客户编号(Khách hàng số)",
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入客户编号",
            trigger: "blur"
          }
        ],
        tip: "客户编号(Khách hàng số)"
      },

      {
        label: _this.$t("startDate") ,//"开始日期(Ngày bắt đầu nhận đơn)",
        tip: "开始日期(Ngày bắt đầu nhận đơn)",
        prop: "startDate",
        width: 155,
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
            message: "请選擇出胚布日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("issuedDate") ,// "接单日期(Ngày đặt hàng)",
        tip: "接单日期(Ngày đặt hàng)",
        prop: "issuedDate",
        sortable: true,
        width: 140,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        // sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇接单日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("orderNo") ,// "订单号(Số đơn hàng)",
        prop: "orderNo",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        rules: [
          {
            required: true,
            message: "订单号(Số đơn hàng)",
            trigger: "blur"
          }
        ],
        tip: "订单号(Số đơn hàng"
      },
      {
        label:  _this.$t("ldOrder.po") ,// "客户单号(Đơn sản xuất)",
        tip: "客户单号(Đơn sản xuất)",
        prop: "po",
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true
      },
      {
        label: _this.$t("contractNo") ,// "合同号(Số hiệu hợp đồng)",
        tip: "合同号(Số hiệu hợp đồng)",
        prop: "contractNo",
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true
      },

      {
        label: _this.$t("deliveDate") ,// "交货日期(Ngày giao hàng cho khách)",
        tip: "交货日期(Ngày giao hàng cho khách)",
        prop: "custDeliveDate",
        width: 120,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
        // sortable: true,
      },

      {
        label: _this.$t("sendingSampleWeight") ,// "送办数量(Số lượng mẫu gửi)",
        tip: "送办数量(Số lượng mẫu gửi)",
        prop: "sendingSampleQuantity",
        width: 100,
        placeholder: " ",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入送办数量",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("sampleQuantity") ,// "办数量(Số lượng  mẫu)",
        tip: "办数量(Số lượng  mẫu)",
        prop: "sampleQuantity",
        width: 100,
        placeholder: " ",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入办数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("ldOrder.sampleSize") ,//  "送办大小(Kích thước mẫu)",
        tip: "送办大小(Kích thước mẫu)",
        prop: "sampleSize",
        width: 100,
        placeholder: " ",
        span: 6
      },

      {
        label: _this.$t("ldOrder.ldFinishDate") ,// "L/D完成日期(Ngày hoàn thành L/D)",
        tip: "L/D完成日期(Ngày hoàn thành L/D)",
        prop: "ldFinishDate",
        width: 180,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
      },
      {
        label:  _this.$t("ldOrder.issuedBy") ,// "接单人(Người lập)",
        prop: "issuedBy",
        width: 100,
        span: 6,
        tip: "接单人(Người lập)",
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.consider") ,// "跟单人(Người xem xét)",
        tip: "跟单人(Người xem xét)",
        prop: "consider",
        width: 100,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.approvedBy") ,//"批准人(Người xét duyệt)",
        tip: "批准人(Người xét duyệt)",
        prop: "approvedBy",
        width: 100,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.washingFastmess") ,//"洗水(Độ bền giặt)",
        tip: "洗水(Độ bền giặt)",
        prop: "washingFastmess",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.waterFastness") ,// "水牢度(Độ bền ngâm nước)",
        tip: "水牢度(Độ bền ngâm nước)",
        prop: "waterFastness",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("fabCode") ,//  "布料编号(Mã vải)",
        tip: "布料编号(Mã vải)",
        prop: "fabricCode",
        width: 140,
        span: 6,
        placeholder: " ",
        overHidden: true
      },
      {
        label:  _this.$t("ldOrder.greigeFabricLocation") ,//  "胚布面料(Nơi nhập kho vải mộc)",
        tip: "胚布面料(Nơi nhập kho vải mộc)",
        prop: "greigeFabricLocation",
        width: 300,
        span: 12,
        placeholder: " ",
        overHidden: true
      },

      {
        label:  _this.$t("ldOrder.dryRubbingFastness") ,//"干摩擦牢度(Độ bền cọ sát khô)",
        tip: "Dry rubbing fastness(Độ bền cọ sát khô)",
        prop: "dryRubbingFastness",
        overHidden: true,
        width: 180,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label:  _this.$t("ldOrder.wetRubbingFastness") ,//""湿摩擦牢度(Độ bền cọ sát ướt)",
        tip: "Wet rubbing fastness(Độ bền cọ sát ướt)",
        prop: "wetRubbingFastness",
        overHidden: true,
        width: 180,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("ldOrder.checkStandar") ,//"检验标准(Tiêu chuẩn kiểm tra)",
        tip: "检验标准(Tiêu chuẩn kiểm tra)",
        prop: "checkStandar",
        overHidden: true,
        width: 200,
        span: 12,
        hide: true,
        placeholder: " ",
        type: "checkbox",
        dicData: [
          {
            value: "AAT",
            label: "AAT"
          },
          {
            value: "ASTM",
            label: "ASTM"
          },
          {
            value: "ISO",
            label: "ISO"
          },
          {
            value: "M&S",
            label: "M&S"
          },
          {
            value: "OEKE-TEX",
            label: "OEKE-TEX"
          }
        ]
      },

      {
        label:  _this.$t("ldOrder.lightColor") ,//"浅色(Màu nhạt)",
        tip: "Light color(Màu nhạt)",
        prop: "lightColor",
        overHidden: true,
        disabled: false,
        hide: true,
        width: 120,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.perspirationFastnesss") ,//"耐汗渍色牢度(Độ bền mồ hôi)",
        tip: "Perspiration  fastnesss(Độ bền mồ hôi)",
        prop: "perspirationFastnesss",
        overHidden: true,
        width: 180,
        hide: true,
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("ldOrder.phValue") ,//"pH 值(Độ pH)",
        tip: "pH value",
        prop: "phValue",
        overHidden: true,
        hide: true,
        disabled: false,
        width: 120,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.colorChangeFastness") ,//"色牢度(Độ bền màu)",
        tip: "Color change fastness(Độ bền màu)",
        prop: "colorChangeFastness",
        overHidden: true,
        hide: true,
        width: 180,
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("ldOrder.darkColor") ,//"深色(Màu đậm)",
        tip: "Dark color(Màu đậm)",
        prop: "darkColor",
        overHidden: true,
        disabled: false,
        width: 120,
        hide: true,
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("ldOrder.dwbTest") ,//"防水dwr测试(Thử nghiệm chống thấm nước)",
        tip: "Durable water repellent DWR test(Thử nghiệm chống thấm nước)",
        prop: "dwbTest",
        overHidden: true,
        hide: true,
        width: 250,
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("ldOrder.capitalizationMethod") ,//"印花方法(Cách in hoa)",
        tip: "Capitalization method",
        prop: "capitalizationMethod",
        overHidden: true,
        disabled: false,
        width: 180,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("ldOrder.eliminateCapitalization") ,//"消除印花(Loại bỏ in hoa)",
        tip: "eliminateCapitalization",
        prop: "eliminateCapitalization",
        overHidden: true,
        disabled: false,
        hide: true,
        width: 180,
        span: 6,
        placeholder: " "
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

export function compCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 150px)",
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
        label: _this.$t("ldOrder.compType") , //" "类型(loại)",
        prop: "compType",
        width: 140,
        span: 6,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: [
          {
            label: "Body 1",
            value: "Body 1"
          },
          {
            label: "Trim 1",
            value: "Trim 1"
          }
        ]
      },
      {
        label: _this.$t("fabName") , //"布料描述(Vải mô tả)",
        prop: "fabricDisc",
        width: 400,
        span: 6,
        cell: true,
        overHidden: true
      },
      {
        label: _this.$t("fabElements") , //" "纤维组成(Cấu trúc sợi)",
        prop: "fiberComp",
        width: 400,
        span: 6,
        cell: true,
        overHidden: true
      }
    ]
  };
}

export function colorCrud(_this) {
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
        label: _this.$t("guestColorNo") , // "客色号(Số màu)",
        prop: "custColor",
        width: 160,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label: _this.$t("colorName") , // "布料颜色(Vải màu)",
        prop: "fabricColor",
        width: 160,
        overHidden: true,
        span: 6,
        cell: true
      },

      {
        label:  _this.$t("ldOrder.rawMaterials") , // "纱线材料组成(Chất liệu sợi)",
        prop: "rawMaterials",
        // width: 300,
        overHidden: true,
        span: 6,
        cell: true
      }
    ]
  };
}
