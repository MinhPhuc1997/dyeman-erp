/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-22 16:42:22
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
        label: _this.$t("weaveJobCode") , //"织单號",
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
      },
      {
        label:  _this.$t("custName") ,//客戶名稱,
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        filterable: true
      },
      {
        label:  _this.$t("colorCode"), //色號,
        prop: "colorCode",
        span: 6,
        placeholder: " ",
        tip: "color number"
      },
      {
        label: _this.$t("workDate") ,//开单日期,
        prop: "startDate",
        width: 120,
        placeholder: " ",
        span: 6,
        type: "date",
        tip: "Ngày lên đơn",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: _this.$t("creator") ,//"制單人
        prop: "creator",
        span: 6,
        placeholder: " ",
        tip: "Lập đơn"
      }
    ]
  };
}


let cust = getDicT("basCustomer", "custName", "custCode", {} , "custName");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    // labelPosition: 'top',
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true,
      },
      {
        label: _this.$t("weaveJobCode") , //"织单號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
        fixed: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },

      {
        label:  _this.$t("weaveJob.outFactory"), // 加工厂
        prop: "outFactoryId",
        tip: "Xưởng gia công",
        span: 6,
        width: 150,
        overHidden: true,
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
        rules: [
          {
            required: true,
            message: "请選擇加工厂",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("weaveJob.workPrice"), // 加工单价
        prop: "workPrice",
        tip: "Giá gia công",
        span: 6,
        width: 100,
        type: "number",
        align: "right",
        overHidden: true
      },
      {
        label: _this.$t("weaveJob.includeTaxe"), // "含税",
        prop: "includeTaxe",
        tip: "Đã bao gồm thuế/bao gồm thuế",
        span: 6,
        width: 130,
        overHidden: true,
        type: "switch",
        dicData: [
          {
            value: false,
            label: _this.$t("public.false")
          },
          {
            value: true,
            label: _this.$t("public.true")
          }
        ]
      },
      {
        label: _this.$t("workDate") ,//开单日期,
        prop: "billDate",
        width: 120,
        span: 6,
        type: "date",
        tip: "Ngày lên đơn",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: "请選擇开单日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇开单日期",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("weaveJob.calicoDate"), // 胚布交期"
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: "请選擇出胚布交期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇胚布交期",
            trigger: "blur"
          }
        ],
        tip: "Kỳ hạn vải mộc"
      },
      {
        label: _this.$t("amount") ,//"織胚數量
        prop: "amount",
        width: 100,
        placeholder: "请输入織胚數量",
        span: 6,
        type: "number",
        align: "left",
        tip: "Số lượng vải mộc"
      },
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
        label: _this.$t("poNo") ,//生产单号,
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: "请選擇生产单号",
        sortable: true,
        overHidden: true
      },

      {
        label:  _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        placeholder: " ",
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
        ],
        overHidden: true
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
        label:  _this.$t("season") ,//季节,
        prop: "seasonCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Mùa hàng",
        hide: true
      },
      {
        label: _this.$t("fabName") ,//布類描述,
        prop: "fabricDesc",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
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
        label: _this.$t("fabElements") ,//纤维成份比例
        prop: "fiberComp",
        placeholder: " ",
        overHidden: true,
        width: 250,
        tip: "Tỷ lệ sơ sợi",
        span: 12,
        hide: true,
        placeholder: " "
      },
      {
        label: "其他要求" ,//生产单号,
        prop: "otherRequire",
        width: 180,
        span: 24,
        placeholder: "其他要求",
        sortable: true,
        overHidden: true,
        hide: true,
      },
      // {
      //   label: _this.$t("weaveState") ,//织单状态
      //   tip: "state",
      //   disabled: false,
      //   prop: "weaveState",
      //   type: "switch",
      //   dicData: [
      //     {
      //       label:  _this.$t("normal") ,//正常,
      //       value: 0
      //     },
      //     {
      //       label:  _this.$t("draft") ,//草稿,
      //       value: 1
      //     },
      //     {
      //       label: _this.$t("knitted") ,//已织完
      //       value: 2
      //     }
      //   ],
      //   // hide: true,
      //   width: 100,
      //   placeholder: " ",
      //   span: 6,
      // },
    ],
  };
}

export function mainYJCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    // labelPosition: 'top',
    page: true,
    labelWidth: 130,
    column: [
    ],
    group: [
      {
        icon: "el-icon-toilet-paper",
        label:  _this.$t("weaveJob.group1"), // 织厂信息
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
            label:  _this.$t("gramWeight"), //克重,
            prop: "gramWeightValue",
            width: 120,
            minRows: 0,
            hide: true,
            span: 4,
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            rules: [
                {
                  required: true,
                  message: "",
                  trigger: "blur"
                }
              ],
              change: () =>{
                _this.handleGramWeightChange()
              }
          },
          {
            label:  _this.$t("unit") ,//单位,
            prop: "gramWeightUnit",
            labelWidth: 50,
            clearable: false,
            formslot: true,
            hide: true,
            span: 2,
            type: "select",
            dicData: getDIC("sal_gramUnit"),
            placeholder: " ",
            defaultIndex: 1,
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleGramWeightChange()
            }
          },
          {
            label: "+",
            prop: "gwMaxValue",
            labelWidth: 20,
            minRows: 0,
            hide: true,
            span: 2,
            type: "number",
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleGramWeightChange()
            }
          },
          {
            label: "-",
            prop: "gwMinValue",
            labelWidth: 20,
            hide: true,
            minRows: 0,
            type: "number",
            span: 2,
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleGramWeightChange()
            }
          },

          {
            label:  _this.$t("unit") ,//单位,
            prop: "gmAcceptUnit",
            labelWidth: 50,
            hide: true,
            span: 2,
            type: "select",
            dicData: [
              {
                label: "%",
                value: "%"
              }
            ],
            placeholder: " ",
            defaultIndex: 1,
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleGramWeightChange()
            }
          },
          {
            label:  _this.$t("breadthActual"), // 門幅(實用)"
            prop: "breadthValue",
            tip: "Thực dụng",
            width: 90,
            // minRows: 0,
            hide: true,
            span: 4,
            type: "number",
            placeholder: " ",
            rules: [
                {
                  required: true,
                  message: "",
                  trigger: "blur"
                }
              ],
              change: () =>{
                _this.handleBreathChange();
              }
          },
          {
            label:  _this.$t("unit") ,//单位,
            prop: "breadthUnit",
            labelWidth: 50,
            hide: true,
            span: 2,
            clearable: false,
            type: "select",
            dicData: getDIC("sal_breadthUnit"),
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleBreathChange();
            }
          },
          {
            label: "+",
            prop: "breadthUpper",
            labelWidth: 20,
            hide: true,
            minRows: 0,
            span: 2,
            type: "number",
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleBreathChange();
            }
          },
          {
            label: "-",
            prop: "breadthLower",
            labelWidth: 20,
            hide: true,
            minRows: 0,
            span: 2,
            type: "number",
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleBreathChange();
            }
          },
          {
            label:  _this.$t("unit") ,//单位,
            prop: "breadthAcceptUnit",
            labelWidth: 50,
            hide: true,
            span: 2,
            type: "select",
            dicData: [
              {
                label: "%",
                value: "%"
              }
            ],
            placeholder: " ",
            tip: "Trọng lượng trước giặt",
            change: () =>{
              _this.handleBreathChange();
            }
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
            label:  _this.$t("sideBreadth"), // 門幅(邊至邊)
            prop: "sideBreadth",
            tip: "Thực dụng",
            width: 90,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
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
          {
            label: _this.$t("calicoMiddle") ,//胚重
            prop: "calicoMiddle",
            tip: "Trọng lượng vải mộc giữa",
            width: 90,
            placeholder: " ",
            hide: true,
            span: 6
          },
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
            label: _this.$t("rotaSpeed") ,//轉速/重量/匹
            tip: "Số đường dệt/trọng lượng/cây",
            prop: "rotaSpeed",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
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
            label: _this.$t("transPlate") ,//輸送盤資料
            tip: "Thông số đĩa dây Cu-roa",
            prop: "transPlate",
            hide: true,
            placeholder: " ",
            span: 12
          },
          {
            label: _this.$t("weaveJob.techReview") ,// "工艺复核",
            tip: "Duyệt lại bảo trì máy",
            prop: "techReview",
            hide: true,
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
          },
          {
            label: "",
            tip: "công nghệ lên máy",
            prop: "operatProcess",
            hide: true,
            span: 6,
            formslot: true,
            placeholder: " ",
            click: ()=>{
              if (!_this.form.weaveJobId) {
                _this.$tip.warning(_this.$t('tipLabel.plsSaveWeaveData'))
                return
              }
              _this.gytDlg = true
            }
          },
        ]
      }
    ]
  }
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
    height: "calc(100vh - 135px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 80,
        align: "center",
        display: false,
        cell: true, //audit ? false : _this.detail.auditState ? false : true,
        placeholder: " "
      },
      {
        label:  _this.$t("yarnCode"), //纱线编号
        prop: "yarnCode",
        width: 120,
        span: 6,
        cell: false // audit ? false : _this.detail.auditState ? false : true
      },
      {
        label:  _this.$t("yarnName"), //纱线名称
        prop: "yarnName",
        width: 300,
        overHidden: true,
        span: 6,
        cell: false //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label:  _this.$t("yarnCard"), //纱牌,
        prop: "yarnBrand",
        width: 150,
        span: 6,
        cell: false, // audit ? false : _this.detail.auditState ? false : true,
        type: "select",
        dicData: getDIC("bas_yarnBrand"),
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
        prop: "yarnBatch",
        width: 120,
        span: 6,
        cell: false,
        overHidden: true,
        placeholder: " "
      },
      {
        label:  _this.$t("factoryYarnBatch"), //本厂纱批号
        prop: "factoryYarnBatch",
        width: 120,
        span: 6,
        cell: false,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.yarnActual"), //实测纱支
        prop: "yarnActual",
        width: 120,
        // overHidden: true,
        span: 6,
        cell: true //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label:  _this.$t("weaveJob.yarnRatio"), //用纱比例
        prop: "yarnRatio",
        width: 100,
        span: 6,
        type: "number",
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " "
      },

      {
        label:  _this.$t("weaveJob.yarnLength"), //纱长
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "right",
        cell: true,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.yarnLengthChanged"), //变更纱长
        prop: "yarnLengthChanged",
        width: 120,
        span: 6,
        align: "right",
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.lineTension"), //输送张力
        prop: "lineTension",
        width: 120,
        cell: true, //audit ? false : _this.detail.auditState ? false : true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("energy.sl") ,//数量
        prop: "amount",
        width: 120,
        align: "right",
        span: 6,
        placeholder: " ",
        cell: true //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label:  _this.$t("unit") ,//单位,
        prop: "unit",
        width: 100,
        span: 6,
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_matUnit")
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
        width: 50,
        align: "center"
      },
      {
        label: "批次分組名稱",
        prop: "groupName",
        width: 120,
        span: 6,
        cell: true
      },
      {
        label: "更換批次時間",
        prop: "changeBatchTime",
        width: 180,
        span: 6,
        cell: true,
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      }
    ]
  };
}

export function calicoCrud(_this) {
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
        label:  _this.$t("weight") ,//重量,
        prop: "weight",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },

      {
        label:  _this.$t("breadth"), //门幅
        prop: "breadth",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.wpiSpace"), //间距
        prop: "wpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label:  _this.$t("weaveJob.cpiSpace"), //间距
        prop: "cpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      }
    ]
  };
}

export function strainCrud(_this) {
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
        label:  _this.$t("weaveJob.lineTension"), //輸送張力
        prop: "lineTension",
        width: 120,
        cell: true,
        align: "right",
        span: 6
      }
    ]
  };
}
export function machineCrud(_this) {
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
      // {
      //   label: _this.$t("mathineCode") ,//"機號
      //   prop: "mathineCode",
      //   width: 140,
      //   cell: true,
      //   filterable: true,
      //   type: "select",
      //   dicData: postDicT(
      //     "baseEquipmentList?categoryId=dev-3",
      //     "equipmentCode",
      //     "equipmentCode"
      //   ),
      //   span: 6
      // },
      {
        label:  _this.$t("weaveJob.userName"), //记录人
        prop: "userName",
        width: 140,
        cell: false,
        span: 6
      },
      {
        label:  _this.$t("weaveJob.recordTime"), //记录时间
        prop: "recordTime",
        width: 160,
        cell: false,
        span: 6,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      }
    ]
  };
}

// --- Yang 2022.06.25

// 织胚明细数据
export function meaveEmbyroDtlCrud(_this){
  return {
    height: "calc(100vh - 148px)",
    page: false,
    menu: false,
    border: true,
    showHeader: false,
    column: [
      {
        prop: "key",
        label:  _this.$t("weaveJob.oneLine"), //第一列
        width: 150,
        align: "center"
      },
      {
        prop: "prop_1",
        label:  _this.$t("weaveJob.twoLine"), //第二列
        width: 150,
        cell: true,
        placeholder: " "
      }
    ]
  }
}

// 设备
export function machineInfoCrud(_this) {
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
        prop: "$index",
        width: 50,
        align: "center",
        display: false,
        formatter(row,col,value){
          return Number(value) + 1
        },
      },
      {
        label: _this.$t("mathineCode") ,//"機號
        prop: "mathineCode",
        width: 140,
        cell: true,
        filterable: true,
        type: "select",
        dicData: [],
        span: 6
      },
      {
        label:  _this.$t("weaveJob.recordTime1"), //开机时间
        prop: "recordTime",
        width: 180,
        cell: true,
        span: 6,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label:  _this.$t("weaveJob.userName"), //记录人
        prop: "userName",
        width: 140,
        cell: false,
        span: 6
      },
    ]
  };
}
