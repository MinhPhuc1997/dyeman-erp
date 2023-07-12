/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-09 07:53:33
 * @Description:
 */
var baseUrl = "http://192.168.5.1:91";
import {getDIC, getDicT, getXDicT, postDicT} from "@/config";

let cust = getDicT("basCustomer", "custName", "custCode");
const vatList = getDicT("proBleadyeRunJob/page", "vatNo", "runJobId");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("vatNo"),//"缸号",
        prop: "vatNo",
        span: 8,
        placeholder: " "
        // type: "select",
        // filterable: true,
        // dicData: vatList
      }
      // {
      //   label: "接收人",
      //   prop: "acceptStaff",
      //   span: 6,
      //   placeholder: " "
      // },
      // {
      //   label: "接收日期",
      //   prop: "acceptDate",
      //   width: 130,
      //   span: 6,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   placeholder: " "
      // }
    ]
  };
}

export function weaveForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("weaveJobCode"),//织单号,
        prop: "weaveJobCode",
        span: 8,
        placeholder: " "
      }
    ]
  };
}

export function yarnForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t('dptReciveLog.yarntestNote'),
        prop: "yarntestNote",
        span: 8,
        placeholder: " "
      }
    ]
  };
}

export function dlgForm(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    column: [
      {
        label: _this.$t('dptReciveLog.dispathReceive'), // 收/发单,
        prop: "dispathReceive",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        clearable: false,
        tip: "nhận đơn / gửi đơn",
        rules: [
          {
            required: true,
            message: "請选择收/发单",
            trigger: "blur"
          }
        ],
        dicData: [
          {
            value: 1,
            label: "收单(nhận đơn)"
          },
          {
            value: 2,
            label: "发单(gửi đơn)"
          }
        ],
        change: val => {
          if (val.value == 1) {
            _this.form.dptworkProcessFk = _this.userId || "";
            _this.form.acceptStaff = parent.userID;
            _this.form.sendProcessFk = "";
            _this.form.sendStaff = "";
            _this.form.sendProcessFk = _this.lastLog.sendProcessFk;
            _this.$store.getters.isSk && (_this.formOp.column[9].display = true);
          } else {
            _this.form.dptworkProcessFk = "";
            _this.form.acceptStaff = "";
            _this.form.sendProcessFk = _this.userId || "";
            _this.form.sendStaff = parent.userID;
            _this.formOp.column[9].display = false;
          }
        }
      },
      {
        label: _this.$t("vatNo"),//"缸号",
        prop: "runJobFk",
        span: 6,
        tip: "Số lô nhuộm",
        placeholder: " ",
        type: "select",
        tipPlacement: "right",
        display: _this.tabs == "rd" ? true : false,
        filterable: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "請选择缸號",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.getLogWeight(val.value);
        }
      },

      {
        label: _this.$t("weaveJobCode"),//织单号,
        display: _this.tabs == "zd" ? true : false,
        prop: "weaveJobId",
        type: "select",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: _this.$t("dptReciveLog.aloYarntestNo"),//"试纱单号",
        display: _this.tabs == "ssd" ? true : false,
        prop: "aloYarntestoid",
        type: "select",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: _this.$t('dptReciveLog.planOutput'), // 计划产量,
        prop: "planOutput",
        span: 6,
        type: "number",
        tip: "sản lượng kế hoạch",
        tipPlacement: "right",
        placeholder: " "
      },
      {
        label: _this.$t('dptReciveLog.realOutput'), // 实际产量,
        prop: "realOutput",
        type: "number",
        span: 6,
        tipPlacement: "right",
        tip: "sản lượng thực tế",
        placeholder: " "
      },

      {
        label: _this.$t('dptReciveLog.sendProcess'), // 发单部门,
        prop: "sendProcessFk",
        tipPlacement: "right",
        span: 6,
        tip: "bộ phận gửi đơn",
        placeholder: " ",
        type: "select",

        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            if (_this.form.dispathReceive == 2) {
              _this.remoteMethodCX();
            }
          })
        },
      },

      {
        label: _this.$t('dptReciveLog.dptworkProcess'), // 收单部门,
        prop: "dptworkProcessFk",
        span: 6,
        tip: "bộ phận nhận đơn",
        placeholder: " ",
        tipPlacement: "right",
        type: "select",

        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            if (_this.form.dispathReceive == 1) {
              _this.remoteMethodCX();
            }
          })
        },
      },
      {
        label: _this.$t('dptReciveLog.stepName'), // 工序,
        prop: "stepId",
        type: "select",
        span: 6,
        tip: "quá trình",
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: "是否完结",
        prop: "isend",
        span: 6,
        type: "switch",
        display: false,
        dicData: [
          {
            label: "否",
            value: 0
          },
          {
            label: "是",
            value: 1
          }
        ],

      },
      {
        label: _this.$t('dptReciveLog.acceptDesc'), // 说明,
        prop: "acceptDesc",
        tipPlacement: "right",
        span: 24,
        tip: "remark",
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
    height: "calc(100vh - 275px)",
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
        display: false,
        fixed: true,
      },
      {
        label: _this.$t("vatNo"), //缸號,
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        fixed: true,
        span: 6,
        disabled: false,
        sortable: true,
      },
      {
        label: _this.$t("weaveJobCode"), //"生產單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        formslot: true,
        placeholder: "請選擇織造生產單號",
      },

      {
        label: _this.$t("workDate"),//开單日期,
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
      },
      {
        label: _this.$t("custName"), //"客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        sortable: true,
        width: 140,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
      },
      {
        label: _this.$t("poNo"),//生产单号,
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 140,
        span: 6,
        placeholder: " ",
        sortable: true,
        // sortable: true,
        overHidden: true
      },
      {
        label: _this.$t("custPoNo"),//客人PO,
        prop: "custPoNo",
        tip: "PO khách hàng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
      },
      {
        label: _this.$t("contractNo"),//合同号,
        prop: "contractNo",
        tip: "Số hiệu hợp đồng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
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
    height: "calc(100vh - 310px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    index: true,
    labelWidth: 130,
    column: [
      {
        label: _this.$t('dptReciveLog.dispathReceive'), // 收/发单,
        prop: "dispathReceive",
        span: 8,
        placeholder: " ",
        width: 80,
        type: "select",
        clearable: false,
        dicData: [
          {
            value: 1,
            label: "收单"
          },
          {
            value: 2,
            label: "发单"
          }
        ]
      },
      {
        label: _this.$t('dptReciveLog.stepName'), // 工序名称,
        prop: "stepName",
        width: 160,
        overHidden: true
      },
      // {
      //   label:  _this.$t('dptReciveLog.stepName'), // 工序,
      //   prop: "stepId",
      //   overHidden: true,
      //   span: 16,
      //   width: 120,
      //   placeholder: " ",
      //   type: "select",
      //   props: {
      //     label: "stepName",
      //     value: "stepId"
      //   },
      //   dicUrl: `${baseUrl}/api/baseWorkStep`
      // },
      {
        label: _this.$t('dptReciveLog.sendProcess'), // 发单部门,
        prop: "sendProcessFk",
        tipPlacement: "right",
        span: 6,
        tip: "bộ phận gửi đơn",
        placeholder: " ",
        type: "select",
        overHidden: true,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        width: 120,

      },
      {
        label: _this.$t('dptReciveLog.sendStaff'), // 发单人,
        prop: "sendStaff",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        tip: "người gửi đơn",
        disabled: false,
        type: "select",
        overHidden: true,
        width: 100,
        dicData: getDicT("ucmlUser", "employeename", "usrLogin"),
        filterable: true
      },
      {
        label: _this.$t('dptReciveLog.dptworkProcess'), // 收单部门,
        prop: "dptworkProcessFk",
        span: 6,
        tip: "bộ phận nhận đơn",
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        width: 120,
        overHidden: true,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],

      },
      {
        label: _this.$t('dptReciveLog.acceptStaff'), // 收单人,
        prop: "acceptStaff",
        tipPlacement: "right",
        span: 6,
        tip: "người nhận đơn",
        placeholder: " ",
        width: 100,
        type: "select",
        overHidden: true,
        dicData: getDicT("ucmlUser", "employeename", "usrLogin"),
        disabled: false,
        filterable: true
      },
      {
        label: _this.$t('acceptDate'), // 操作日期,
        prop: "acceptDate",
        width: 160,
        overHidden: true,
        sortable: true,
        span: 8,
        type: "datetime",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "投胚数量", // 说明,
        prop: "planOutput",
        overHidden: true,
        span: 16,
        placeholder: " ",
        width: 100
      },
      {
        label: "实际产量(KG)", // 说明,
        prop: "realOutput",
        overHidden: true,
        span: 16,
        placeholder: " ",
        width: 120
      },
      {
        label: _this.$t('dptReciveLog.acceptDesc'), // 说明,
        prop: "acceptDesc",
        overHidden: true,
        span: 16,
        placeholder: " ",
        width: 250
      }
    ]
  };
}

export function weavecrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    // labelPosition: 'top',
    page: true,
    labelWidth: 120,
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
        label: _this.$t("weaveJobCode"), //"生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        fixed: true,
        width: 160,
        span: 6,
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
      },
      {
        label: _this.$t("poNo"),//生产单号,
        prop: "salPoNo",
        width: 140,
        span: 6,
        placeholder: " ",
        sortable: true,
        overHidden: true
      },
      {
        label: _this.$t('dptReciveLog.calicoDate'), // 齐胚期,
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
        tip: "Kỳ hạn vải mộc"
      },
      {
        label: _this.$t('dptReciveLog.productDate'), // 成品交期",
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
      },
      {
        label: _this.$t('marketOrder'), // 营销单号,
        prop: "marketOrder",
        tip: "Mã số dệt bộ phận Sales",
        span: 6,
        width: 140,
        overHidden: true,
        placeholder: " "
      },
      {
        label: _this.$t('custPoNo'), // 客人生产单号,
        prop: "custPoNo",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Ckhách hàng PO",
        hide: true
      },

      {
        label: _this.$t("custName"),//客戶名稱,
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        tip: "Khách hàng",
        filterable: true,
      },

      {
        label: _this.$t("colorName"), //顏色名稱,
        prop: "colorName",
        tip: "Màu sắc",
        width: 140,
        span: 6,
        placeholder: "请選擇顏色名稱",
        overHidden: true
      },
      {
        label: _this.$t("colorCode"), //色號,
        prop: "colorCode",
        placeholder: " ",
        width: 140,
        span: 6,
        overHidden: true,
        tip: "Số màu"
      }
    ]
  };
}

export function yarnTestCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
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
        label: _this.$t('dptReciveLog.yarntestNote'),
        prop: "yarntestNote",
        overHidden: true,
        fixed: true,
        width: 140,
        span: 6,
        sortable: true,
      },
      {
        label: _this.$t('dptReciveLog.issuDate'), // 发单日期,
        prop: "issuDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
      },
      {
        label: _this.$t('factoryBatch'), //本厂批号,
        prop: "batchNo",
        width: 140,
        span: 6,
        placeholder: " ",
        sortable: true,
        overHidden: true
      },
      {
        label: _this.$t('dptReciveLog.yarnType'), //纱线类型,
        prop: "yarnType",
        span: 6,
        width: 140,
        overHidden: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yarntype")
      },
    ]
  };
}

export function reportForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("vatNo"),//"缸号",
        prop: "vatNo",
        span: 8,
        labelWidth: 100,
        placeholder: " "
      },
      {
        label: "投胚数量(公斤)",//"收单日期",
        prop: "planOutput",
        span: 8,
        placeholder: " "
      },
      {
        label: "实际产量(公斤)",//"统计日期",
        prop: "realOutput",
        span: 8,
        placeholder: " "
      },
    ]
  };
}

export function reportCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(50vh - 1px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,
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
        label: "缸号",
        prop: "vatNo",
        overHidden: true,
        fixed: true,
        width: 200,
        span: 6,
        sortable: true,
      },

      {
        label: "计划产量(公斤)",
        prop: "planOutput",
        width: 170,
        span: 6,
        align: "center",
        placeholder: " ",
        sortable: true,
        overHidden: true
      },
      {
        label: "实际产量(公斤)",
        prop: "realOutput",
        span: 6,
        width: 170,
        align: "center",
        overHidden: true,
        placeholder: " ",
      },
      {
        label: "收单时间", // 发单日期,
        prop: "acceptDate",
        width: 200,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        sortable: true,
      },
      {
        label: "统计日期", // 发单日期,
        prop: "dayId",
        width: 200,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        sortable: true,
      },
    ]
  };
}

export function reportKBCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 125px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,

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
        label: "部门",
        prop: "department",
        overHidden: true,
        fixed: true,
        width: 250,
        span: 6,
        sortable: true,
        type:"select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      {
        label: "缸号",
        prop: "vatNo",
        overHidden: true,
        fixed: true,
        width: 200,
        span: 6,
        sortable: true,
      },
      {
        label: "投胚数量",
        prop: "planOutput",
        width: 100,
        span: 6,
        align: "left",
        placeholder: " ",
      },
      {
        label: "实际产量",
        prop: "realOutput",
        span: 6,
        width: 100,
        align: "left",
        placeholder: " ",
      },
      {
        label: "收/发单",
        prop: "dispathReceive",
        span: 6,
        width: 100,
        align: "center",
        overHidden: true,
        placeholder: " ",
        type:"select",
        dicData:[
          {
            label:"收单",
            value:1
          },
          {
            label:"发单",
            value:2
          }
        ]
      },
      {
        label: "收单时间", // 发单日期,
        prop: "acceptDate",
        width: 200,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        sortable: true,
      },
      {
        label: "统计日期", // 发单日期,
        prop: "dayId",
        width: 170,
        span: 6,
      },
    ]
  };
}

