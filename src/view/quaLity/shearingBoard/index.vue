<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-19 16:22:42
 * @FilePath: \iot.vue\src\view\quaLity\shearingBoard\index.vue
 * @Description:
-->

<template>
  <div class="abnormalDaily">
    <view-container :title="$t('shearingBoard.title1')">
      <el-row class="btnList">
        <el-button type="success" @click="update" v-hasPerm="['quality:shearingBoard:edit']"> {{ $t("public.update") }}
        </el-button>
        <el-button type="primary" @click="add" v-hasPerm="['quality:shearingBoard:add']"> {{ $t("public.add") }} </el-button>
        <el-button type="danger" :disabled="chooseData.upFlag" @click="del" v-hasPerm="['quality:shearingBoard:del']"> {{ $t("public.del") }} </el-button>
        <el-popconfirm :title="$t('tipLabel.updateConfirm')" @onConfirm="handleUpdate" class="mh-small" v-hasPerm="['quality:shearingBoard:update']">
          <el-button slot="reference" type="primary" :disabled="chooseData.upFlag || !chooseData.cutId">{{$t("shearingBoard.btn1")}}</el-button>
        </el-popconfirm>
        <el-popconfirm :title="$t('tipLabel.pirntConfirm')" @onConfirm="handlePrint" class="mr-small" v-hasPerm="['quality:shearingBoard:print']">
          <el-button slot="reference" type="primary" :disabled="!chooseData.upFlag"> {{ $t("public.print") }}</el-button>
        </el-popconfirm>
        <el-button type="primary" @click="handleOutreport" v-hasPerm="['quality:shearingBoard:export']"> {{ $t("public.report") }} </el-button>
        <el-button type="primary" @click="query" v-hasPerm="['quality:shearingBoard:list']"> {{ $t("public.query") }} </el-button>

        <div style="float: right">
          <el-select v-model="printType" :placeholder="$t('codeCard.basePrintTemplate')">
            <el-option label="SPOWER 通用模板" value="1" />
            <el-option label="KANE TOP 定制码卡" value="2" />
          </el-select>
          {{$t("sheetNumber")}}：<el-input type="number" v-model="printCount" max="5" min="1" style="width: 80px;margin-right: 15px">
          </el-input>
          {{$t("shearingBoard.btn2")}}： <el-switch v-model="hasCardData" :active-text="$t('quality.show')" :inactive-text="$t('quality.hide')">
          </el-switch>
        </div>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <el-col :span="hasCardData ? 20 : 24">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" :element-loading-text="$t('public.loading')" @on-load="query" @row-click="rowClick" @row-dblclick="handleRowDBLClick">
          </avue-crud>
        </el-col>
        <el-col :span="4" v-if="hasCardData">
          <el-card class="box-card" style="">
            <div slot="header" class="clearfix">
              <span>{{$t("shearingBoard.btn2")}}</span>
            </div>
            <div class="cardData">
              <p><b>{{$t("po.custName")}}: </b> {{ cardData.custName }}</p>
              <p><b>{{$t("fabName")}}: </b>{{ cardData.fabName }}</p>
              <p><b>{{$t("colorName")}}: </b>{{ cardData.colorName }}</p>
              <p><b>{{$t("vatNo")}}: </b>{{ cardData.vatNo }}</p>
              <p><b>{{$t("quality.pidNo")}}: </b>{{ cardData.pidNo }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
      <tem-dlg ref="qcCheckPlanTem" @refresh="query" @close="temClose" v-if="dialogVisible"> </tem-dlg>
    </el-dialog>
  </div>
</template>

<script>
import temDlg from "./tem.vue";
import {
  fetchProFinalProductCardCutByPage,
  removeProFinalProductCardCut,
  getFinishedNoteByPage,
  updateFinishedNoteData,
  updateProFinalProductCardCut,
  fetchBasDefectList
} from "./api.js";
import { mainForm, mainCrud } from "./data.js";
import { getDIC } from '../../../config';
export default {
  components: {
    temDlg,
  },
  props: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      curIdx: null,
      wloading: false,
      loading: false,
      dialogVisible: false,
      cutId: {},
      cardData: {},
      hasCardData: true,
      spowerClient: null,
      chooseData: {},
      printCount: 5,
      printType: "1",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.initDefectAndSampleDicData()
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      let self = vm;
      self.spowerClient = self.$store.state.spowerClient;
    });
  },
  mounted() {},
  methods: {
    async initDefectAndSampleDicData(){
      let sampleData = await getDIC("bas_sampleType");
      let defectData = await fetchBasDefectList().then( res => res.data);
      let defectDicData = defectData.map((item) => { return { label: `${item.chnName}-${item.vetName}`, value: item.defectNo }})
      this.$set(this.crudOp.column[this.crudOp.column.length - 1],"dicData", sampleData.concat(defectDicData))
    },
    query() {
      this.loading = true;
      let params = {
        cutDept: "%" + (this.form.cutDept || ""),
        productNo: "%" + (this.form.productNo || ""),
        cutDate: this.form.cutDate,
        dataSortRules: "saveTime|desc,productNo|desc",
        rows: this.page.pageSize,
        start: this.page.currentPage
      };
      fetchProFinalProductCardCutByPage(params)
        .then(async (res) => {
          let { records, total } = res.data;
          this.cardData = {};
          this.crud = records;
          this.crud.forEach((item, i) => {
            item.netWeightLbs = item.netWeight * 2.2046;
            item.cutSamWeightLbs = item.cutSamWeight * 2.2046;
            item.cutDefeWeightLbs = item.cutDefeWeight * 2.2046;
          });
          this.page.total = total;
          this.chooseData = {};
          this.$refs.crud.setCurrentRow();
          await this.$nextTick();
          this.curIdx = null;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    async update() {
      if (!this.curIdx) {
        // this.$tip.warning("请先选择要修改的数据!");
        this.$tip.warning(this.$t("public.updateTle"));
        return;
      }
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData(
        this.crud[this.curIdx - 1].cutId
      );
      // this.$set(this.$refs.qcCheckPlanTem, "isBoard", this.crud[this.curIdx - 1].cutDefeWeight ? false : true)
      // this.$refs.qcCheckPlanTem.isBoard = this.crud[this.curIdx - 1].cutDefeWeight ? false : true
    },
    async add() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData();
    },
    async del() {
      if (!this.curIdx) {
        // return this.$tip.warning("请先选择要删除的数据!");
        this.$tip.warning(this.$t("public.delTle"));
      }
      let idx = this.curIdx - 1;
      let cofResult = await this.$tip
        .cofirm(
          this.$t("tipLabel.delProductCode") + this.crud[idx].productNo + this.$t("tipLabel.delEnd"))
        .then(() => { return true; })
        .catch((e) => { return false; });
      if (!cofResult) return false;
      this.loading = true;
      removeProFinalProductCardCut(this.crud[idx].cutId)
        .then((res) => {
          this.query();
          this.$tip.success(this.$t('public.sccg'));
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleOutreport() {
      let url = encodeURI(
        "http://" +
          document.domain +
          ":91/api/proFinalProductCardCut/exportForm?cutDept=" +
          (this.form.cutDept || "") +
          "&cutDate=" +
          (this.form.cutDate || "") +
          "&productNo=" +
          (this.form.productNo || "")
      );
      window.open(url);
    },
    async handlePrint() {
      if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0 ) {
        this.$tip.warning(this.$t('tipLabel.clientError'));
        return;
      }
      let printData = this.crud[this.curIdx - 1];
      printData.printTime = this.$getNowTime("datetime");
      printData.cutRemarks = printData.cutRemarks.toString();
      for (let i = 0; i < this.printCount; i++) {
        let sendTemp = (this.printType == 1 ? "print=finishCard:" : "print=finishCardCustomer:") + printData.proCardFk;
        console.log("printInfo:" + sendTemp);
        this.spowerClient.send(sendTemp);
      }
      await updateProFinalProductCardCut(printData);
      this.query();
      // this.$tip.success("已发送打印动作!");
      this.$tip.success(this.$t("tipLabel.printSuccess"));
    },
    handleUpdate() {
      let printData = this.crud[this.curIdx - 1];
      if (printData.upFlag) {
        this.$tip.warning(this.$t("shearingBoard.warning1"));
        return;
      }
      this.loading = true;
      let params = {
        cardId: printData.proCardFk,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      };
      getFinishedNoteByPage(params)
        .then(async (res) => {
          if (res.data.total) {
            //存在码卡信息，更新
            let data = res.data.records[0];
            if (!printData.upFlag) {
              // 打印过不再改变数量
              data.netWeight =
                data.netWeight -
                printData.cutSamWeight -
                printData.cutDefeWeight;
              data.grossWeight =
                data.grossWeight -
                printData.cutSamWeight -
                printData.cutDefeWeight;
              data.netWeightLbs = Number((data.netWeight * 2.2046).toFixed(1));
              data.grossWeightLbs = Number(
                (data.grossWeight * 2.2046).toFixed(1)
              );
              data.yardLength = printData.cutYds;
              let resData = await updateFinishedNoteData(data).then(res => res.data);
              if(resData.code !== 200) {
                // 更新失败
                this.$tip.error(this.$t("bottomcol.error1") + resData.msg);
                this.loading = false;
                return;
              }
              printData.upFlag = true;
              printData.upDate = this.$getNowTime("datetime");
              printData.cutRemarks = printData.cutRemarks.toString();
              await updateProFinalProductCardCut(printData);
              this.query();
              this.$tip.success(this.$t('bottomcol.success3'));
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
      this.chooseData = row;
      this.getCardData(row);
    },
    getCardData(row) {
      //  this.loading = true
      getFinishedNoteByPage({
        cardId: row.proCardFk,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      })
        .then((res) => {
          this.cardData = res.data.records[0];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleRowDBLClick(row) {
      this.curIdx = row.$index + 1;
      // if (row.upFlag) {
      //   this.$tip.warning("已更新码卡不可修改！");
      //   return;
      // }
      this.update();
    },
    temClose(hasRefresh) {
      this.dialogVisible = false;
      hasRefresh && this.query();
    },
    handleReport(command) {
      let dayId =
        new Date().getFullYear() +
        "" +
        (command < 10 ? "0" + command : command);
      let name = encodeURI(
        "http:" +
          process.env.API_HOST.split(":")[1] +
          ":92/api/qaDayOutput/qareport?dayId=" +
          dayId
      );
      window.open(name);
      this.wloading = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-card__header {
  padding: 8px 10px;
}

.cardData p span:first-child {
  font-weight: 600;
}

.box-card {
  text-align: left;
  padding-left: 10px;
  width: 97%;
  height: calc(100vh - 200px);
}
</style>
