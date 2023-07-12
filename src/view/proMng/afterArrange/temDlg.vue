<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-17 14:25:54
 * @Description: 
-->
<template>
  <div id="afterArrangeDlg">
    <view-container :title="(isAdd ? $t('public.add') : $t('public.update')) +  $t('afterArrange.tab2')"
      :element-loading-text="$t('public.loading')" v-loading="wLoading">
      <div class="btnList">
        <el-button type="success" @click="save">{{
        $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="print" :loading="wLoading" :disabled="!detail.finishJobId">{{
        $t("public.print")
        }}</el-button>
        <el-button type="warning" @click="close">{{
        this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-tabs v-model="tabs" type="border-card">
        <el-tab-pane :label="$t('afterArrange.tab1')" name="0"> </el-tab-pane>
        <el-tab-pane :label="$t('afterArrange.tab2')" name="1"> </el-tab-pane>
        <el-tab-pane :label="$t('afterArrange.tab3')" name="2"> </el-tab-pane>
        <el-tab-pane :label="$t('afterArrange.tab4')" name="3"> </el-tab-pane>
        <el-tab-pane :label="$t('afterArrange.tab5')" name="4"> </el-tab-pane>
        <el-tab-pane :label="$t('afterArrange.tab6')" name="5"> </el-tab-pane>
        <el-tab-pane :label="$t('afterArrange.tab7')" name="6"> </el-tab-pane>
      </el-tabs>
      <div style="height: calc(100vh - 375px); padding-top: 10px">
        <avue-form ref="form1" :option="form1Op" v-model="form"></avue-form>
      </div>
    </view-container>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container ::title="$t('public.printPreview')">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
      @close="choiceV = false" v-if="choiceV"></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  form1,
  form2,
  form3,
  form4,
  form5,
  form6,
  form7,
} from "./data";
import { add, update } from "./api";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    dialogVisible: Boolean,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      form1Op: form1(this),
      form1: {},
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      chooseData: {},
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: this.$t('choiceTem.choiceTle'),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        sortF: "vatNo"
      },
      code: "",
      group: [],
      chooseDtlData: {},
      tabs: "0",
      pdfDlg: false,
      pdfUrl: "",
    };
  },
  watch: {
    tabs(n, o) {
      switch (n) {
        case "0":
          this.form1Op = form1(this);
          break;
        case "1":
          this.form1Op = form2(this);
          break;
        case "2":
          this.form1Op = form3(this);
          break;
        case "3":
          this.form1Op = form4(this);
          break;
        case "4":
          this.form1Op = form5(this);
          break;
        case "5":
          this.form1Op = form6(this);
          break;
        case "6":
          this.form1Op = form7(this);
          break;
        default:
          break;
      }
    },
  },
  methods: {
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.orderMan = parent.userID;
          this.form.isRaise = false;
          this.form.isSanding = false;
          this.form.isBrush = false;
          this.form.isBurn = false;

          this.form.isDry = false;
          this.form.sandingPress1State = false;
          this.form.sandingRoller1State = false;
          this.form.sandingPress2State = false;

          this.form.sandingRoller2State = false;
          this.form.sandingPress3State = false;
          this.form.sandingRoller3State = false;
          this.form.sandingPress4State = false;

          this.form.sandingRoller4State = false;
          this.form.sandingPress5State = false;
          this.form.sandingRoller5State = false;
          this.form.sandingPress6State = false;

          this.form.sandingRoller6State = false;
          this.form.raiseDownOpen = false;
          this.form.raiseUpOpen = false;
          this.form.burnFire1 = false;

          this.form.burnFire2 = false;
          this.form.burnFan1Switch = false;
          this.form.burnFire3 = false;
          this.form.burnFire4 = false;

          this.form.burnFan2Switch = false;
          this.form.burnBlowerSwitch = false;
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        for (let key in this.form) {
          if (this.form[key] == "undefined" || !this.form[key]) {
            delete this.form[key];
          }
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            Object.keys(this.form).forEach((item) => {
              if (this.isEmpty(this.form[item])) {
                delete this.form[item];
              }
            });
            if (this.form.finishJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.finishJobId = res.data.data;
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error(this.$t("afterArrange.saveWarnTip"));
          return;
        }
      });
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == this.$t("choiceTem.choiceTle")) {
        this.form = val;
        this.form.proBleadyeJobFk = val.bleadyeJobId;
      }

      this.choiceV = false;
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === "" ||
        obj === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeFinishJob/bleadyeFinishPdf?id=" +
        this.form.finishJobId;
    },
  },
  created() { },
  mounted() {
    this.getData();
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
.el-tooltip__popper {
  font-size: 16px !important;
}

#afterArrangeDlg {
  overflow: hidden;

  .avue-checkbox .el-checkbox, .avue-radio .el-radio {
    margin-right: 30px;
  }

  .avue-group__header {
    margin-bottom: 15px !important;
    // margin-top: -5px;
    height: 30px;
  }

  .formBox {
    // height: calc(100vh - 75px) !important;
    overflow: auto;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px !important;
  }
}

#colorMng_Dlg {
  .is-fullscreen {
    overflow: hidden !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>