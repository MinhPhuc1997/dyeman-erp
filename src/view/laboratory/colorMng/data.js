import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.khmc"),
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "颜色编号",
        prop: "colorBh",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("weaveJob.colorChnName"), // 颜色中文
        prop: "colorChn",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("weaveJob.colorEngName"), // 颜色英文
        prop: "colorEngName",
        span: 6,
        placeholder: " "
      },
      {
        label:  _this.$t("codeCard.custColorNo"), //客色号
        prop: "custColorBh",
        span: 6,
        placeholder: " "
      },
      {
        label: "面料",
        prop: "fabricDesc",
        span: 12,
        placeholder: " "
      },
      
    ]
  };
}
export function popupForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 125,
    column: [
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        rules: [
          {
            required: true,
            message: "請輸入色号",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("colorDept"), //颜色深度
        prop: "colorDepth",
        span: 6,
        placeholder: "请选择颜色深度",
        type: "select",
        // disabled: !_this.isAdd,
        disabled: false,
        dicData: getDIC("bas_colorclTepth"),
        change: () => {
          _this.depth();
        },
        rules: [
          {
            required: true,
            message: "请选择颜色深度",
            trigger: "blur"
          }
        ]
      },
      {
        label: "染料份量(％)",
        prop: "dyeWeight",
        span: 6,
        placeholder: " ",
        align: "right",
        type: "number",
        minRows: _this.minRows,
        maxRows: _this.maxRows,
        // disabled: true
        disabled: false
        // change: () => {
        //   // if (_this.form.colorDepth == '') {
        //   //   _this.form.dyeWeight = 0
        //   //   _this.$tip.warning("请先选择颜色深度!")
        //   // }
        // }
      },
      {
        label: "颜色鲜度",
        prop: "salColorfresh",
        span: 6,
        type: "select",
        dicData: getDIC("sal_colorFresh")
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custCode",
        span: 6,
        placeholder: "请选择客户",
        disabled: !_this.isAdd,
        click: () => {
          _this.dlgWidth = "60%";
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custCode";
          // _this.choiceQ.purType = '5'
          _this.choiceTarget = _this.form;
          _this.choiceTle = _this.$t("choicDlg.xzkh");
        },
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        rules: [
          {
            required: true,
            message: "請选择客户",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("public.date") , //日期
        prop: "colorDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center"
      },
      {
        label: _this.$t("weaveJob.colorEngName"), // 颜色英文
        prop: "colorEngName",
        span: 6,
        rules: [
          {
            required: true,
            message: "請輸入颜色英文",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("loomSchedule.state") , //状态
        prop: "colorState",
        span: 6,
        placeholder: "请选择状态",
        type: "select",
        dicData: [
          {
            value: false,
            label: "未确定"
          },
          {
            value: true,
            label: "确定"
          }
        ]
      },
      {
        label: "颜色编号",
        prop: "colorBh",
        span: 6,
        placeholder: "请选择颜色编号",
        disabled: !_this.isAdd,
        click: () => {
          if (!_this.isAdd) {
            return;
          }
          _this.dlgWidth = "60%";
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "colorBh";
          // _this.choiceQ.purType = '5'
          _this.choiceTarget = _this.form;
          _this.choiceTle = _this.$t("choicDlg.xzshxx");
        }
      },
      {
        label: _this.$t("weaveJob.colorChnName"), // 颜色中文
        prop: "colorChn",
        span: 6
      },
      {
        label: "颜色来源",
        prop: "colorSource",
        span: 6,
        placeholder: "请选择颜色来源",
        type: "select",
        dicData: getDIC("sal_colorSource")
      },
      {
        label:  _this.$t("codeCard.custColorNo"), //客色号
        prop: "custColorBh",
        span: 6,
        disabled: !_this.isAdd
      },
      {
        label:  _this.$t("markMng.fabricCode"), //面料编号
        prop: "fabCode",
        span: 6,
        placeholder: "请选择面料",
        disabled: !_this.isAdd,
        click: () => {
          // _this.dlgWidth = "100%";
          // _this.choiceV = !_this.choiceV;
          // _this.choiceField = "fabCode";
          // // _this.choiceQ.purType = '5'
          // _this.choiceTarget = _this.form;
          // _this.choiceTle = "胚布編碼";
        }
      },
      {
        label: "面料中文描述",
        prop: "fabricDesc",
        span: 12
      },
      {
        label: "面料来源",
        prop: "fabSource",
        span: 6,
        placeholder: "请选择面料来源",
        type: "select",
        dicData: getDIC("LAP_FABSOURCE")
      },
      {
        label: _this.$t("revolve.one"), // 第一光源
        prop: "colorLights",
        span: 6,
        placeholder: "请选择第一光源",
        type: "select",
        dicData: getDIC("sal_colorLights"),
        disabled: !_this.isAdd,
        change: () => {
          // _this.form.deputyLights = "";
          // _this.form.threeLights = "";
          _this.lights();
        },
        rules: [
          {
            required: true,
            message: "請选择第一光源",
            trigger: "blur"
          }
        ]
      },
      {
        label: "面料英文描述",
        prop: "fabricDescEng",
        span: 12,
        rules: [
          {
            required: true,
            message: "請輸入面料英文描述",
            trigger: "blur"
          }
        ]
      },
      {
        label:  _this.$t("weaveJob.dyeClass"), //染色类别
        prop: "lapDyetype",
        span: 6,
        placeholder: "请选择染色类别",
        type: "select",
        dicData: getDIC("LAP_DYETYPE"),
        rules: [
          {
            required: true,
            message: "請选择染色类别",
            trigger: "blur"
          }
        ]
      },

      {
        label: _this.$t("revolve.two"), // 第二光源
        prop: "deputyLights",
        span: 6,
        placeholder: " ",
        tags: false,
        type: "select",
        disabled: true,
        change: () => {
          // _this.form.threeLights = "";
          _this.lights();
        },
        dicData: getDIC("sal_colorLights"),
        // rules: [
        //   {
        //     required: true,
        //     message: "請选择第二光源",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: _this.$t("revolve.three"), // 第三光源
        prop: "threeLights",
        span: 6,
        placeholder: " ",
        tags: false,
        type: "select",
        disabled: true,
        typeslot: true,
        dicData: getDIC("sal_colorLights")
      },
      {
        label:  _this.$t("colorStandard"), //对色标准,
        prop: "colorStandard",
        span: 6,
        placeholder: "请选择对色标准",
        type: "select",
        dicData: getDIC("Sal_contrastType"),
        rules: [
          {
            required: true,
            message: "請选择对色标准",
            trigger: "blur"
          }
        ]
      },
      {
        label: "是否双染",
        prop: "doubleFlag",
        span: 6,
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
        label: "RGB颜色",
        prop: "colorRgb",
        span: 6,
        type: "color",
        formslot: true,
        placeholder: " ",
      },
      {
        label: "档案编号",
        prop: "recN0",
        span: 6,
        // disabled: !_this.isAdd,
        rules: [
          {
            required: true,
            message: "請輸入档案编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("energy.bz"),
        prop: "remarks",
        span: 12
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
    height: "calc(100vh - 325px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "RGB颜色",
        prop: "colorRgb",
        width: 100,
        type: "color",
        formslot: true,
        placeholder: " ",
      },
      {
        label: _this.$t("colorCode") ,//"色号",
        prop: "colorNo",
        width: 130
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custCode",
        width: 220,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "颜色编号",
        prop: "colorBh",
        width: 140
      },
      {
        label: _this.$t("weaveJob.colorChnName"), // 颜色中文
        prop: "colorChn",
        width: 160,
        overHidden: true
      },
      {
        label: _this.$t("weaveJob.colorEngName"), // 颜色英文
        prop: "colorEngName",
        width: 150,
        overHidden: true
      },
      {
        label:  _this.$t("codeCard.custColorNo"), //客色号
        prop: "custColorBh",
        width: 130,
        overHidden: true
      },
      {
        label:  _this.$t("markMng.fabricCode"), //面料编号
        prop: "fabCode",
        width: 110,
        overHidden: true
      },
      {
        label: "面料",
        prop: "fabricDesc",
        width: 400,
        overHidden: true
      },
      {
        label: "面料来源",
        prop: "fabSource",
        width: 120,
        type: "select",
        dicData: getDIC("LAP_FABSOURCE")
      },
      {
        label:  _this.$t("weaveJob.dyeClass"), //染色类别
        prop: "lapDyetype",
        width: 120,
        type: "select",
        dicData: getDIC("LAP_DYETYPE")
      },
      {
        label: "是否双染",
        prop: "doubleFlag",
        width: 100,
        type: "select",
        dicData: [
          {
            value: true,
            label: _this.$t("public.true")
          },
          {
            value: false,
            label: _this.$t("public.false")
          }
        ]
      }
    ]
  };
}
