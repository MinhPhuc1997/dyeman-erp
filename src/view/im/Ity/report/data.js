const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: false,
  excelBtn: false,
  showSummary: true,
  tree: true,
  rowKey: "index",
  page: false,

};

export function _optinCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 177px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    sumColumnList: [
      {
        label: " ",
        name: "import1",
        type: "sum"
      },
      {
        label: " ",
        name: "import2",
        type: "sum"
      },
      {
        label: " ",
        name: "export1",
        type: "sum"
      },
      {
        label: " ",
        name: "export2",
        type: "sum"
      }
    ],
    column: [
      {
        label: "日期 Ngày tháng",
        prop: "date",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "Nhập kho - 入库 (KG)",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 430,
        overHidden: true,
        children: [{
          label: '本厂-Tại xưởng',
          prop: 'import1',
          align: "center",
          display: false
        }, {
          label: '外发-Gia công',
          prop: 'import2',
          align: "center",
          display: false
        }]
      },
      {
        label: "Xuất kho - 出库 (KG)",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 430,
        overHidden: true,
        children: [{
          label: '本厂-Tại xưởng',
          prop: 'export1',
          align: "center",
          display: false
        }, {
          label: '外发-Gia công',
          prop: 'export2',
          align: "center",
          display: false
        }]
      },
      {
        label: "回仓数-Trả kho (KG)",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 430,
        overHidden: true,
        children: [{
          label: '本厂-Tại xưởng',
          prop: 'reImp1',
          align: "center",
          display: false
        }, {
          label: '外发-Gia công',
          prop: 'reImp12',
          align: "center",
          display: false
        }]
      },

    ]
  };
}

export function _optinCrud1(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 177px)",
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    sumColumnList: [
      {
        label: " ",
        name: "import1",
        type: "sum"
      },
      {
        label: " ",
        name: "import2",
        type: "sum"
      },
      {
        label: " ",
        name: "export1",
        type: "sum"
      },
      {
        label: " ",
        name: "export2",
        type: "sum"
      }
    ],
    column: [
      {
        label: "日期 Ngày tháng",
        prop: "date",
        placeholder: "",
        align: "center",
        width: 200,
        overHidden: true,
      },
      {
        label: "Nhập kho - 入库 (KG)",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 430,
        overHidden: true,
        children: [{
          label: '本厂-Tại xưởng',
          prop: 'import1',
          align: "center",
          display: false
        }, {
          label: '外发-Gia công',
          prop: 'import2',
          align: "center",
          display: false
        }]
      },
      {
        label: "Xuất kho - 出库 (KG)",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 430,
        overHidden: true,
        children: [{
          label: '本厂-Tại xưởng',
          prop: 'export1',
          align: "center",
          display: false
        }, {
          label: '外发-Gia công',
          prop: 'export2',
          align: "center",
          display: false
        }]
      },
      {
        label: "出货 - Xuất hàng",
        prop: "drawWeight",
        placeholder: "",
        align: "center",
        width: 150,
        overHidden: true,
      },
      {
        label: "回仓数-Trả kho (KG)",
        prop: "index",
        placeholder: "",
        align: "center",
        width: 430,
        overHidden: true,
        children: [{
          label: '本厂-Tại xưởng',
          prop: 'reImp1',
          align: "center",
          display: false
        }, {
          label: '外发-Gia công',
          prop: 'reImp12',
          align: "center",
          display: false
        }]
      },

    ]
  };
}
