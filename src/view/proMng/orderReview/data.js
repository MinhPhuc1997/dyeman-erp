/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-21 08:04:12
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
        label: _this.$t("auditState") ,//审核状态,
        prop: "auditState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 0,
            label: _this.$t("pendingReview") ,//"待审核"
          },
          {
            value: 1,
            label:  _this.$t("audited") ,//"已审核"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label:  _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("weaveJobCode") , //"织單號",
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
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("orderMan") ,//开单员,
        prop: "serviceOperator",
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
    columnBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 315px)",
    refreshBtn: false,
    page: true,
    labelWidth: 130,
    selection: true,
    showSummary: true,
    sumColumnList: [
      {
        label:  _this.$t("weight") ,//重量,
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
        label: _this.$t("weaveJobCode") , //"织單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        sortable: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: "請選擇織造生產單號",
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = _this.$t("choiceTem.weaveJobCode");
          _this.choiceV = true;
        }
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
        label:  _this.$t("totalWeight") ,// "合计数量",
        tip: "Tổng cộng(KG)",
        prop: "clothWeight",
        width: 150,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label:  _this.$t("custName"), //"客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        sortable: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 180,
        sortable: true,
        span: 6,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },
      {
        label: _this.$t("custPoNo") ,//客人PO,
        prop: "contractNo",
        tip: "Số hợp đồng",
        span: 6,
        hide: true,
        width: 80,
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
        sortable: true,
        width: 180,
        overHidden: true,
        span: 6
      },
      {
        label:  _this.$t("colorCode"), //色號,
        sortable: true,
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 12,
        sortable: true
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
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
        label:  _this.$t("batchNo") ,//批号,
        prop: "yarnBatchNo",
        tip: "Mã vải",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
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
        label:  _this.$t("pidCount") ,//疋數,
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },

      {
        label:  _this.$t("mergVatNo") ,//合染缸號,
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: false,
        type: "select",
        dicData: [],
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
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
          _this.$nextTick(() => {
            _this.form.dyeVatType =
              Number(_this.form.poAmountKg) / 350 >= 4
                ? "4"
                : Math.ceil(Number(_this.form.poAmountKg) / 350) + "";
          });
        }
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.poAmountLb = (_this.form.poAmountKg * 2.2046226).toFixed(2)
        //   })
        // }
      },
      // {
      //   label: "訂單數量(磅)",
      //   prop: "poAmountLb",
      //   width: 120,
      //   span: 6,
      //   type: "number",
      //   align: "right",
      //   placeholder: " ",
      //   hide: true,
      //   disabled: true,
      // },
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
        label:  _this.$t("yarnCylinder") ,//紗缸,
        tip: "Lô sợi nhà máy",
        prop: "yarnCylinder",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label:  _this.$t("poColorCount") ,//顏色種類數量,
        tip: "Số lượng màu",
        prop: "poColorCount",
        width: 120,
        span: 6,
        type: "number",
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
        label:  _this.$t("dyeVatType") ,//生产用机种,
        prop: "dyeVatType",
        tip: "Mô hình",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "1T",
            value: "1"
          },
          {
            label: "2T",
            value: "2"
          },
          {
            label: "3T",
            value: "3"
          },
          {
            label: "4T",
            value: "4"
          }
        ]
      },
      {
        label: _this.$t("orderMan") ,//开单员,
        tip: "开单员",
        prop: "serviceOperator",
        width: 100,
        span: 6,
        disabled: true,
        sortable: true,
        // hide: true,
        placeholder: " "
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
        label: _this.$t("revolve.etSn") ,//ET序号
        prop: "etSn",
        tip: "ET序号",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },

      {
        label: _this.$t("styleNo") ,//"#STLYLE 款号",
        prop: "styleNo",
        tip: "#STLYLE 款号",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label:  _this.$t("season") ,//季节" / 代码",
        prop: "custStyleCode",
        tip: "MÃ CODE VẢI XUẤT HÀNG 代码",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
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
        label:  _this.$t("remark") ,//备注,
        prop: "remark",
        tip: "Ghi chú",
        span: 24,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: _this.$t("createTime") ,//创建时间
        prop: "createTime",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        overHidden: true,
        placeholder: "创建时间",
        sortable: true
      },
      {
        label: _this.$t("updateTime") ,//修改时间
        prop: "modifiDate",
        width: 130,
        span: 6,
        type: "date",
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        placeholder: "修改时间",
        sortable: true
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
            label: _this.$t("gramWeightBefor") ,//洗前(克重)",
            tip: "Trọng lượng Giặt trước",
            prop: "gramWeightBefor",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },

          {
            label: _this.$t("gramWeightAfter") ,//成品/洗後(克重)
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

export function mainWForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("auditState") ,//审核状态,
        prop: "auditState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 0,
            label: _this.$t("pendingReview") ,//待审核
          },
          {
            value: 1,
            label: _this.$t("audited") ,//已审核
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label: _this.$t("weaveJobCode") , //"织單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      // {
      //   label: _this.$t("startMachineDate") ,//"開機日期
      //   prop: "startDate",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Sắp xếp ngày dệt"
      // },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " ",
        tip: "color number"
      },
      {
        label: _this.$t("mathineCode") ,//"機號
        prop: "mathineCode",
        span: 6,
        placeholder: " ",

        tip: "Mã số máy dệt"
      },
      {
        label: _this.$t("creator") ,//"制單人
        prop: "creator",
        span: 6,
        placeholder: " ",
        tip: "Lập đơn"
      }
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

export function mainWCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    columnBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 315px)",
    refreshBtn: false,
    selection: true,
    // labelPosition: 'top',
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
        label: _this.$t("weaveJobCode") , //"织單號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: "请選擇生产单号",
        sortable: true,
        overHidden: true
        // rules: [
        //   {
        //     required: true,
        //     message: "请選擇生产单号",
        //     trigger: "blur"
        //   }
        // ]
        // click: () => {
        //   _this.visible = true
        // }
      },
      {
        label:  _this.$t('dptReciveLog.calicoDate'), // 齐胚期,
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇出胚布日期",
            trigger: "blur"
          }
        ],
        tip: "Kỳ hạn vải mộc"
      },
      {
        label:  _this.$t('dptReciveLog.productDate'), // 成品交期",
        prop: "productDate",
        width: 120,
        span: 6,
        type: "date",
        tip: "Kỳ hạn thành phẩm",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇成品期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇成品期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t('marketOrder'), // 营销单号,
        prop: "marketOrder",
        tip: "Mã số dệt bộ phận Sales",
        span: 6,
        width: 200,
        overHidden: true
      },
      {
        label:  _this.$t("custName"), //"客戶",
        prop: "custCode",
        overHidden: true,
        disabled: false,
        type: "select",
        dicData: cust,
        tip: "Khách hàng",
        width: 120,
        span: 6,
        placeholder: "请選擇客戶名稱",
      },

      {
        label: _this.$t("startMachineDate") ,//"開機日期
        prop: "startDate",
        width: 120,
        type: "date",
        align: "center",
        tip: "Sắp xếp ngày dệt",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请選擇開機日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("amount") ,//"織胚數量
        prop: "amount",
        width: 100,
        placeholder: "请输入織胚數量",
        span: 6,
        // rules: [
        //   {
        //     required: true,
        //     message: "请输入織胚數量",
        //     trigger: "blur"
        //   }
        // ],
        type: "number",
        align: "left",
        tip: "Số lượng vải mộc"
      },
      {
        label: _this.$t("custPoNo") ,//客户批号
        prop: "custPoNo",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Ckhách hàng PO",
        hide: true
      },
      {
        label:  _this.$t("fabCode") ,//布类代码,
        prop: "custFabricCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Fabric Code",
        hide: true
      },
      {
        label:  _this.$t("season") ,//季节,
        prop: "seasonCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Mùa hàng",
        hide: true
      },

      // {
      //   label:  _this.$t("yarnCard"), //纱牌,
      //   prop: "yarnBrand",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Nhà cung cấp sợi",
      //   hide: true
      // },
      // {
      //   label:  _this.$t("yarnBatch"), //纱批,
      //   prop: "yarnBatchNo",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Lót sợi",
      //   hide: true
      // },
      // {
      //   label: "纱缸",
      //   prop: "yarnCylinder",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Lô sợi nhà máy",
      //   hide: true
      // },
      {
        label: _this.$t("yarnAmount") ,//纱线数量
        prop: "yarnAmount",
        width: 100,
        placeholder: "请输入纱线数量",
        span: 6,
        type: "number",
        align: "left",
        tip: " Số lượng sợi "
      },
      {
        label: _this.$t("contractAmount") ,//合同数量
        prop: "contractAmount",
        width: 100,
        placeholder: "请输入合同数量",
        span: 6,
        type: "number",
        align: "left",
        tip: "Số lượng của hợp đồng"
      },

      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabricDesc",
        overHidden: true,
        width: 250,
        span: 12,
        sortable: true,
        placeholder: "请選擇布類描述",
        rules: [
          {
            required: true,
            message: "请選擇布類描述",
            trigger: "blur"
          }
        ],
        tip: "Loại vải "
      },
      {
        label:  _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        tip: "Màu sắc",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [
          {
            required: true,
            message: "请選擇顏色名稱",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        placeholder: " ",
        width: 150,
        span: 6,
        overHidden: true,
        tip: "Số màu"
        // row: true
      },

      {
        label: _this.$t("fabElements") ,//纤维成份比例
        prop: "fiberComp",
        placeholder: " ",
        overHidden: true,
        width: 250,
        tip: "Tỷ lệ sơ sợi",
        span: 12,
        hide: true
      },
      {
        label: _this.$t("createTime") ,//创建时间
        prop: "createTime",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        overHidden: true,
        placeholder: "创建时间",
        sortable: true
      },
      {
        label: _this.$t("updateTime") ,//修改时间
        prop: "upateTime",
        width: 130,
        span: 6,
        type: "date",
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        placeholder: "修改时间",
        sortable: true
      }
    ],
    group: [
      {
        icon: " ",
        label: " ",
        prop: "group1",
        column: [
          {
            label: _this.$t("calicoFabricRequire") ,//胚布要求
            prop: "calicoFabricRequire",
            placeholder: " ",
            overHidden: true,
            width: 250,
            hide: true,
            type: "switch",
            tip: "Yêu cầu khác",
            dicData: [
              {
                value: "开幅",
                label: "开幅(Xẻ biên)"
              },
              {
                value: "圆筒",
                label: "圆筒(Không xẻ biên)"
              }
            ],
            span: 6
          },
          {
            label: _this.$t("calicoShap") ,//抽針/圓筒",
            prop: "calicoShap",
            width: 90,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                value: "1",
                label: _this.$t("calicoShap1") ,//抽針",
              },
              {
                value: "2",
                label: _this.$t("calicoShap2") ,//圆筒",
              }
            ]
          },
          {
            label: _this.$t("gramWeightAfter") ,//成品/洗後(克重)
            prop: "gramWeight",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " ",
            tip: "Trọng lượng trước giặt"
          },
          {
            label: _this.$t("breadth") ,//門幅",
            prop: "breadth",
            tip: "Thực dụng",
            width: 90,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label: _this.$t("shrinkWidth") ,//橫縮"
            prop: "horizonShrink",
            tip: "Co rút ngang",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: _this.$t("shrinkLenth") ,//直縮"
            prop: "verticalShrink",
            tip: "Co rút thẳng",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " "
          },
          {
            label: _this.$t("mathineCode") ,//"機號
            prop: "mathineCode",
            span: 12,
            width: 180,
            tip: "Mã số máy dệt",
            placeholder: " ",
            overHidden: true,
            readonly: true,
            click: () => {
              if (_this.form.weaveJobId) {
                _this.tabs = _this.$t("weaveJob.tabs2") ;
                _this.crudOp = machineCrud(_this);
                _this.visible = true;
              } else {
                _this.$tip.warning(_this.$t("tipLabel.plsSaveWeaveData"));
              }
            }
            // rules: [
            //   {
            //     required: true,
            //     message: "请輸入機號",
            //     trigger: "blur"
            //   }
            // ]
          },
          {
            label: _this.$t("tubeDiam") ,//筒径,
            tip: "Khổ máy ",
            prop: "cylinderInch",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "number"
          },

          {
            label: _this.$t("needleDist") ,//针距
            tip: "Số kim mỗi inch",
            prop: "guage",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "number"
          },
          {
            label: _this.$t("otherRequire") ,//其他要求
            prop: "otherRequire",
            tip: "Yêu cầu khác",
            placeholder: " ",
            hide: true,
            span: 12,
            placeholder: " "
          },
          {
            label: _this.$t("needleInch") ,//針寸數
            prop: "needleInch",
            tip: "Tổng số kim",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " "
            // type: "number",
          },
          {
            label: _this.$t("needleCount") ,//縂針數
            tip: "縂針數",
            prop: "needleNumber",
            width: 80,
            placeholder: " ",
            type: "number",
            span: 6,
            hide: true
          },
          {
            label:  _this.$t("yarnLength") ,//紗長,
            tip: "Độ dài sợi",
            prop: "yarnLength",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },
          // {
          //   label: "更改紗長",
          //   prop: "yarnLenghtChanged",
          //   tip: "Thay đổi độ dài sợi",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6,
          //   click: () => {
          //     if (!_this.form.weaveJobId) {
          //       _this.$tip.error("請先保存通知單信息!");
          //       return;
          //     }
          //     _this.crudOp = longCrud(_this);
          //     _this.visible = true;
          //     _this.tabs = "更改紗長";
          //   }
          // },
          // {
          //   label: "胚重(左)",
          //   prop: "calicoLeft",
          //   tip: "Trọng lượng vải mộc trái",
          //   width: 90,
          //   hide: true,
          //   span: 6,
          //   placeholder: " "
          // },
          {
            label: _this.$t("calicoMiddle") ,//胚重
            prop: "calicoMiddle",
            tip: "Trọng lượng vải mộc giữa",
            width: 90,
            placeholder: " ",
            hide: true,
            span: 6
          },

          // {
          //   label: "胚重(右)",
          //   prop: "calicoRight",
          //   tip: "Trọng lượng vải mộc phải",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },
          {
            label: _this.$t("readyMadeFabric") ,//成衣面
            prop: "readyMadeFabric",
            tip: "Mặt thành vải",
            width: 120,
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: _this.$t("fallCloth") ,//落布封度
            prop: "fallCloth",
            tip: "Độ lớn cuộn vải",
            span: 6,
            placeholder: " ",
            hide: true,
            width: 90
          },

          {
            label: _this.$t("mathineSpeed") ,//機速
            prop: "mathineSpeed",
            tip: "Tốc độ máy",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: _this.$t("cylinderHeight") ,//筒口高度
            tip: "Độ hở mâm trên dưới",
            prop: "cylinderHeight",
            span: 6,
            hide: true,
            placeholder: " ",
            width: 80
          },

          {
            label: _this.$t("weaveEnter") ,//織機食位度
            prop: "weaveEnter",
            tip: "Vị trí kim dệt",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },

          {
            label: _this.$t("clothRackWidth") ,//布架寬度
            prop: "clothRackWidth",
            tip: "Khổ vải trên giá vải",
            placeholder: " ",
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: _this.$t("operatProcess") ,//上機工藝
            tip: "công nghệ lên máy",
            prop: "operatProcess",
            hide: true,
            span: 12,
            placeholder: " "
          },
          {
            label: _this.$t("loopSpace") ,//循環(自動間)
            tip: "Tuần hoàn (vải sọc tự động)",
            prop: "loopSpace",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: _this.$t("clothRackDesc") ,//布架資料
            prop: "clothRackDesc",
            tip: "Thông số giá vải",
            hide: true,
            span: 6,
            placeholder: " "
          },
          {
            label: _this.$t("transPlate") ,//輸送盤資料
            tip: "Thông số đĩa dây Cu-roa",
            prop: "transPlate",
            hide: true,
            placeholder: " ",
            placeholder: " ",
            span: 12
          },
          {
            label: _this.$t("rotaSpeed") ,//轉速/重量/匹
            tip: "Số đường dệt/trọng lượng/cây",
            prop: "rotaSpeed",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          // {
          //   label: "開單複核",
          //   prop: "reviewer",
          //   span: 6,
          //   hide: true,
          //   placeholder: " ",
          //   width: 90,
          // },

          // {
          //   label: "矯機人簽名",
          //   prop: "machineCalibration",
          //   width: 80,
          //   span: 6,
          //   placeholder: " ",
          //   hide: true,
          // },
          // {
          //   label: "最終評語",
          //   prop: "evaluateComment",
          //   hide: true,
          //   placeholder: " ",
          //   span: 12
          // },
          // {
          //   label: "機修復核人",
          //   prop: "machineMaintenance",
          //   placeholder: " ",
          //   hide: true,
          //   span: 6
          // },
          // {
          //   label: "質檢複核",
          //   prop: "qcReviewer",
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },
          // {
          //   label: "運轉複核",
          //   prop: "transfer",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },

          // {
          //   label: "評語簽名",
          //   prop: "appraiser",
          //   span: 6,
          //   hide: true,
          //   placeholder: " ",
          //   width: 80,
          // },
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
          },
          {
            label: _this.$t("weaveState") ,//织单状态
            tip: "state",
            disabled: false,
            prop: "weaveState",
            type: "switch",
            dicData: [
              {
                label:  _this.$t("normal") ,//正常,
                value: 0
              },
              {
                label:  _this.$t("draft") ,//草稿,
                value: 1
              }
            ],
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: _this.$t("creator") ,//製單人
            prop: "creator",
            span: 6,
            hide: false,
            width: 100,
            tip: "Lập đơn",
            disabled: true,
            rules: [
              {
                required: true,
                message: "请输入制单人",
                trigger: "blur"
              }
            ]
            // type: "select",
            // dicData:
            //   postDicT('ucmlUser', 'employeename', 'ucmlUseroid')
          }
        ]
      }
    ]
  };
}
