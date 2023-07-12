import {getDicT, getDIC} from "../../../../config";

const mainCrudOpCommon = {
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: false,
  excelBtn: false,
  showSummary: false,
  tree: true,
  rowKey: "index",
  page: true,
  delBtnText:'删除',

};

export function _YarnOutGoingForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "纱线外发编号",
        prop: "outCode",
        span: 6,
        width: 140,
        placeholder: " ",
        maxlength: 50
      },
      {
        label: "外发厂",
        prop: "outFact",
        span: 6,
        width: 140,
        placeholder: " ",
        maxlength: 36,
        type: "select",
        dicData:  getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
      },
      {
        label: "加工类型",
        prop: "processType",
        span: 6,
        width: 120,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_out_yarn_process_type")
      },
      {
        label: "发出时间",
        prop: "outDate",
        type:"datetime",
        span: 6,
        width: 140,
        placeholder: " ",

      },
      {
        label: "仓库发货人",
        prop: "wareSender",
        span: 6,
        width: 140,
        placeholder: " ",
        maxlength: 36
      },
      {
        label: "外发工厂收货人",
        prop: "outgoingReciver",
        span: 6,
        width: 140,
        placeholder: " ",
        maxlength: 36
      },
      {
        label: "批准人",
        prop: "approver",
        span: 6,
        width: 140,
        placeholder: " ",
        maxlength: 36
      },

    ],
  };
}

export function _YarnOutGoingDetail(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 140,
    column: [

      {
        label: "外发厂",
        prop: "outFact",
        span: 6,
        width: 140,
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
        filterable: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
      },
      {
        label: "发出时间",
        prop: "outDate",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        width: 140,
        placeholder: " ",
        // rules: [
        //   {
        //     required: true,
        //     trigger: "blur"
        //   }
        // ],
      },
      {
        label: "加工类型",
        prop: "processType",
        span: 4,
        width: 140,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_out_yarn_process_type")
      },
      {
        label: "仓库发货人",
        prop: "wareSender",
        span: 4,
        width: 140,
        placeholder: " ",
      },
      {
        label: "外发工厂收货人",
        prop: "outgoingReciver",
        span: 4,
        width: 140,
        placeholder: " ",
      },
      {
        label: "纱线外发编号",
        prop: "outCode",
        span: 6,
        width: 140,
        placeholder: " ",
        disabled: true
      },
      {
        label: "创建人",
        prop: "creator",
        span: 6,
        width: 140,
        placeholder: " ",
        disabled: true
      },
      {
        label: "创建时间",
        prop: "createTime",
        span: 6,
        width: 140,
        placeholder: " ",
        disabled: true
      },
      {
        label: "修改时间",
        prop: "updateTime",
        span: 6,
        width: 140,
        placeholder: " ",
        disabled: true
      },

    ],
  };
}

export function _YarnOutGoingCrud(_this) {
  return {
    ...mainCrudOpCommon,
    menu: false,
    selection: false,
    height: "calc(100vh - 315px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,

      },
      {
        label: "纱线外发编号",
        prop: "outCode",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "外发厂",
        prop: "outFact",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
      },
      {
        label: "加工类型",
        prop: "processType",
        width: 100,
        placeholder: " ",
        align: "center",
        type: "select",
        dicData: getDIC("whse_out_yarn_process_type")
      },
      {
        label: "发出时间",
        prop: "outDate",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "仓库发货人",
        prop: "wareSender",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "外发工厂收货人",
        prop: "outgoingReciver",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "创建人",
        prop: "creator",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "创建时间",
        prop: "createTime",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },
      {
        label: "修改人",
        prop: "updator",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "修改时间",
        prop: "updateTime",
        placeholder: "",
        align: "center",
        width: 170,
        overHidden: true,
      },

    ]
  };
}

export function _YarnOutGoingDetailCrud(_this) {
  return {
    ...mainCrudOpCommon,
    selection: false,
    height: "calc(100vh - 275px)",
    submitBtn: false,
    emptyBtn: false,
    editBtn:false,
    labelWidth: 130,
    menu:true,
    sumColumnList: [
      {
        name: "boxCount",
        type: "sum",
        label: " "
      },
      {
        name: "palletCount",
        type: "sum",
        label: " "
      },
      {
        name: "yarnAmount",
        type: "sum",
        label: " "
      },
    ],
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,

      },
      // {
      //   label: "明细编号",
      //   prop: "detailCode",
      //   placeholder: "",
      //   align: "center",
      //   width: 150,
      //   overHidden: true,
      // },
      {
        label: "订单号（织单号）",
        prop: "weaveJobCode",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "纱线名称",
        prop: "yarnName",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "纱批号",
        prop: "batchNo",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "箱/包件数",
        prop: "boxCount",
        placeholder: "",
        type:"number",
        align: "center",
        width: 100,
        overHidden: true,
        cell:true,
      },
      // {
      //   label: "卡板",
      //   prop: "palletCount",
      //   placeholder: "",
      //   align: "center",
      //   width: 120,
      //   overHidden: true,
      //   cell:true,
      // },
      // {
      //   label: "单位",
      //   prop: "unit",
      //   placeholder: "",
      //   align: "center",
      //   width: 150,
      //   overHidden: true,
      // },
      {
        label: "数量/KG",
        prop: "yarnAmount",
        placeholder: "",
        align: "center",
        width: 100,
        type:"number",
        cell:true,
        overHidden: true,
      },
      {
        label: "本厂纱批号",
        prop: "factBatchNo",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "外发日期",
        prop: "outDate",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "备注",
        prop: "remark",
        placeholder: "",
        align: "center",
        overHidden: true,
      },
    ]
  };
}

export function _YarnSelectForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "织造通知单",
        prop: "proWeaveJobFk",
        span: 8,
        labelWidth: 150,
        type: "select",
        rules: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        formslot: true,
      },
    ],
  };
}

export function _YarnSelectCrud(_this) {
  return {
    ...mainCrudOpCommon,
    selection: true,
    height: "calc(50vh - 25px)",
    submitBtn: false,
    emptyBtn: false,
    editBtn:false,
    labelWidth: 130,
    menu:false,
    column: [
      {
        label: "序号",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 70,
        overHidden: true,
      },
      {
        label: "纱线编号",
        prop: "yarnCode",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "纱线名称",
        prop: "yarnName",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "本厂纱批",
        prop: "factoryYarnBatch",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "纱损比例",
        prop: "lossRate",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "实际用纱量",
        prop: "realAmount",
        placeholder: "",
        align: "center",
        width: 120,
        overHidden: true,
      },
      {
        label: "重量单位",
        prop: "unit",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "实测纱支",
        prop: "yarnActual",
        placeholder: "",
        align: "center",
        width: 100,
        overHidden: true,
      },
      {
        label: "纱线批号",
        prop: "yarnBatch",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "纱线品牌",
        prop: "yarnBrand",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "纱长",
        prop: "yarnLength",
        placeholder: "",
        align: "center",
        overHidden: true,
      },
    ]
  };
}
