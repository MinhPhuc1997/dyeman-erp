<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-07 10:08:54
 * @Description: 
-->
<template>
  <div id="codeCard">
    <el-row>
      <el-col :span="16">
        <view-container :title="$t('codeCard1.title1')" v-loading="wloading"
          :element-loading-text="$t('public.loading')">
          <el-row class="formBox">
            <avue-form ref="form" :option="crudOp" v-model="form" style="margin-top: 15px"></avue-form>
          </el-row>
          <el-row style="text-align: center; width: 98%; margin: 0 auto; line-height: 80px">
            <span>{{ $t("sheetNumber") }}:</span>
            <el-input v-model="sheetNum" type="number" style="width: 70px; margin-right: 20px"></el-input>
            <el-button type="primary" @click="query" :disabled="!form.vatNo">{{ $t("public.query") }}</el-button>
            <el-button type="primary" :disabled="!form.vatNo" @click="print(1)">{{ $t("codeCard1.outVat") }}</el-button>
            <el-button type="primary" :disabled="!form.vatNo" @click="print(2)">{{ $t("codeCard1.deciAfter") }}</el-button>
          </el-row>
        </view-container>
      </el-col>
      <el-col :span="8">
        <view-container :title="$t('historyRecord')">
          <el-card class="border-card" style="height: calc(100vh - 120px); overflow: auto" id="history">
            <div class="historyText" v-for="item in history" :key="item.noteId" style="border-bottom: 1px solid #eee">
              <el-tooltip class="item" effect="dark"
                :content="$t('vatNo') + item.vatNo + ' ' + $t('weight') + item.sumWeight" placement="top">
                <div class="history">
                  <span>{{ $t("vatNo") }}: {{ item.vatNo }}</span>
                  <span> {{ $t("weight") }}: {{ item.sumWeight }}</span>
                  <el-tag style="float: right; margin-top: 14px; margin-right: 5px">{{ item.appState == 1 ?
                      $t("codeCard1.outVat") : $t("codeCard1.deciAfter")
                  }}</el-tag>
                </div>
              </el-tooltip>
            </div>
          </el-card>
        </view-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print, getJob, getWeave } from "./api";
export default {
  name: "",
  components: {
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      vatForm: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200, 500],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      sheetNum: 1,
      loading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      spowerClient: null,
      tabs: "form",
      history: [],
    };
  },
  watch: {},
  created() {
    this.form.appDate = this.$getNowTime("date");
  },
  methods: {
    query() {
      this.wloading = true;
      this.detail = {};
      if (!this.form.vatNo) {
        this.wloading = false;
        this.$tip.warning(this.$t("tipLabel.noData"));
        return;
      }
      getJob({
        vatNo: this.form.vatNo,
      }).then((res) => {
        if (res.data.length > 0) {
          let val = res.data[0];
          this.form = res.data[0];
          this.form.vatNo = val.vatNo;
          this.form.custName = val.custName;
          this.form.colorName = val.colorName;
          this.form.colorNo = val.colorCode;
          this.form.custCode = val.custCode;
          this.form.fabricName = val.fabName;
          this.form.sumWeight = val.clothWeight;
          this.form.pidCount = val.pidCount;
          this.form.colorStandard = val.compVatNo;
          this.form.colorLights = val.compLightSource;
          this.form.custBatchNo = val.salPoNo;
          this.$tip.success(this.$t("public.cxcg"));
        } else {
          this.form.vatNo = "";
          this.form.custName = "";
          this.form.colorName = "";
          this.form.colorNo = "";
          this.form.custCode = "";
          this.form.fabricName = "";
          this.form.pidCount = null;
          this.form.sumWeight = null;
          this.form.custBatchNo = "";
          this.$tip.warning(this.$t("tipLabel.noData"));
        }
        setTimeout(() => {
          this.wloading = false;
        }, 200);
      });
    },
    print(type) {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.$tip
              .cofirm(
                this.$t("codeCard1.printTle1") +
                this.form.vatNo +
                this.$t("codeCard1.printTle2") +
                (type == 1 ? this.$t("codeCard1.outVat") : this.$t("codeCard1.deciAfter")) +
                this.$t("codeCard1.codeCard"))
              .then(() => {
                get({
                  vatNo: this.form.vatNo,
                  appState: type,
                }).then((res) => {
                  if (res.data.length) {
                    // 更新数据
                    let data = JSON.parse(JSON.stringify(this.form));
                    data.cardId = res.data[0].cardId;
                    data.appState = res.data[0].appState;
                    if (data.appDate && data.appDate.indexOf(" ") < 0) {
                      data.appDate += " 00:00:00";
                    }
                    update(data).then((res) => { });
                    this.history.unshift(data);
                    this.history = this.$unique(this.history, "cardId");
                    // 发送打印请求
                    console.log("print=appColor:" + res.data[0].cardId  + '&' +  this.sheetNum);
                    this.spowerClient.send("print=appColor:" + res.data[0].cardId  + '&' +  this.sheetNum);
                    this.$tip.success(this.$t('public.sendPrintTle'));
                    // this.$tip.success("已发送全部打印请求!");
                    done();
                  } else {
                    // 新增后再发送请求
                    let data = JSON.parse(JSON.stringify(this.form));
                    if (data.appDate && data.appDate.indexOf(" ") < 0) {
                      data.appDate += " 00:00:00";
                    }
                    data.custName = data.$custCodex;
                    data.appState = type;
                    add(data).then((res) => {
                      if (res.data.code == 200) {
                        data.cardId = res.data.data;
                        this.history.unshift(data);
                        this.history = this.$unique(this.history, "cardId");
                        console.log("print=appColor:" + res.data.data  + '&' +  this.sheetNum);
                        this.spowerClient.send("print=appColor:" + res.data.data +  '&' +  this.sheetNum) ;
                      }
                      done();
                    });
                  }
                });
              })
              .catch((err) => {
                done();
                this.$tip.warning(this.$t("public.qxcz"));
              });
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.warning(this.$t("codeCard1.saveWarningTle"));
        }
      });
    },
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.spowerClient = vm.$store.state.spowerClient;
      let self = vm;
      document.onkeydown = function (e) {
        let ev = document.all ? window.event : e;
        if (ev.keyCode === 13) {
          self.query();
        }
      };
    });
  },
  beforeRouteLeave(to, from, next) {
    document.onkeydown = null;
    next();
  },
};
</script>
<style lang="stylus">
#codeCard
  .el-tag
    font-size 16px
  .avue-form .el-input--mini input
    height 48px !important
    line-height 48px !important
  .el-input__inner, .el-form-item__label
    font-size 22px !important
    line-height 45px !important
  .el-button, .el-button--mini.is-round
    padding 8px 12px 8px 12px !important
    font-size 20px !important
    margin-left 20px
  .historyText
    font-size 22px
    text-align left
    // text-indent: 1em;
    margin-left 10px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    height 46px
    line-height 46px
  .item
    // margin-bottom: 18px;
</style>