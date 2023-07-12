import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from "@/config";

let commonCrudOp = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  page: true,
  labelWidth: 130,
  index: true
}
// ---------送货单--------------
export function purDeliveryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
        label: "送货单号",
        prop: "deliNo",
        span: 6,
      },
      {
        label: "送货日期",
        prop: "deliDate",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      }
    ]
  };
}

export function purDeliveryCrudOp(_this, {
  height
}) {
  return {
    ...commonCrudOp,
    height: height || "calc(100vh - 240px)",
    column: [{
        label: "送货单号",
        prop: "deliNo",
        width: 160,
        overHidden: true
      },
      {
        label: "送货日期",
        prop: "deliDate",
        width: 120,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      },
      {
        label: "备注",
        prop: "deliRemark",
        overHidden: true
      },
    ]
  };
}

export function purDeliveryDtlCrudOp(_this, {
  height
}) {
  return {
    ...commonCrudOp,
    page: false,
    height: height || "calc(100vh - 240px)",
    showSummary: true,
    sumColumnList: [{
        label: " ",
        name: "deliQty",
        type: "sum"
      },
    ],
    column: [{
        label: "采购订单",
        prop: "purNo",
        width: 160,
        overHidden: true
      },
      {
        label: "物料名称",
        prop: "chinName",
        width: 160,
        overHidden: true
      },
      {
        label: "供应商批号",
        prop: "batId",
        width: 160,
        overHidden: true
      },
      {
        label: "数量",
        prop: "deliQty",
        width: 120,
        overHidden: true,
        type: "number",
        align: "right",
      },
      {
        label: "单位",
        prop: "deliUnit",
        width: 120,
        overHidden: true,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },

    ]
  };
}


// -----------------
