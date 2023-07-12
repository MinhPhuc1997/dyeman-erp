<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-21 16:23:08
 * @Description:
-->
<template>
  <div id="clothFlyPrint">
    <el-tabs type="border-card">
      <el-tab-pane label="漂染工作單打印" v-loading="wloading" :element-loading-text="$t('public.loading')">
        <el-row class="btnList">
          <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
            <el-button type="success" :disabled="!detail.bleadyeJobId" @click="handleRowDBLClick(detail)">{{
                $t("public.update")
            }}</el-button>
          </el-tooltip>
          <!-- <el-button type="warning" :disabled="!detail.bleadyeJobId" @click="addCopy">返工</el-button> -->
          <!-- </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
            <el-button type="primary" @click="print" :loading="wloading">{{$t("public.print")}}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
            <el-button type="primary" @click="query">{{
                $t("public.query")
            }}</el-button>
          </el-tooltip>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
            @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"></avue-crud>
        </el-row>
        <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
          :close-on-click-modal="false" :close-on-press-escape="false">
          <tem-dlg v-if="dialogVisible" ref="tem" :detail="detail" :isAdd="isAdd" :revolve="revolveData"
            :copyCtr="copyCtr" @close=" dialogVisible = false" @refresh="refresh"></tem-dlg>
        </el-dialog>
        <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
          :close-on-click-modal="false" :close-on-press-escape="false">
          <view-container :title="$t('public.printPreview')">
            <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
            <!--endprint-->
          </view-container>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('dye.unCreateJob')">
        <div class="btnList">
          <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
            <el-button type="success" @click="add(revolveChoose)">{{
                $t("public.sc")
            }}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
            <el-button type="primary" @click="revolveQuery">{{
                $t("public.query")
            }}</el-button>
          </el-tooltip>
        </div>
        <el-row class="formBox">
          <avue-form ref="revolveForm" :option="revolveFOp" v-model="revolveForm"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud ref="revolveCrud" id="revolveCrud" :option="revolveCOp" :data="revolves" :revolve="revolveChoose" v-loading="revolveLoading"
          @on-load="revolveQuery" :page.sync="revolvePage"  @row-dblclick="revolveDBLClick" @current-row-change="revolveCellClick" :row-style="rowStyle"></avue-crud>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="$t('dye.unCreateColorJob')">
        <batch-color-list ref="batchColorListRef"  @select="handleBackSelect" />
      </el-tab-pane>
      <el-tab-pane :label="$t('dye.unCreateQcJob')">
        <qc-back-list ref="qcBackListRef"  @select="handleBackSelect"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud, revolveForm, revolveCrud } from "./data";
import { get, del, getRevolve, fetchProBleadyeJobDataList } from "./api";
import tem from "./temDlg";
import BatchColorList from "./batchColorList.vue"
import QcBackList from "./qcBackList.vue"
export default {
  name: "",
  components: {
    temDlg: tem,
    "batch-color-list": BatchColorList,
    "qc-back-list": QcBackList
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      revolvePage: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      revolveLoading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      revolveFOp: revolveForm(this),
      revolveForm: {},
      revolveCOp: revolveCrud(this),
      revolveChoose: {},
      revolve: [],
      revolves: [],
      revolveData: {},
      copyCtr: false,
    };
  },
  watch: {},
  methods: {
    refresh() {
      console.log("is refresh")
      this.query();
      this.revolveQuery();
      this.$refs.batchColorListRef.getDataList();
      this.$refs.qcBackListRef.getDataList();
    },
    // 回修选择回调
    handleBackSelect(selData){
      let params = {
        vatNo: selData.vatNo
      }
      fetchProBleadyeJobDataList(params).then(res => {
        if(res && res.data && res.data[0]){
          this.detail = res.data[0];
          this.detail.sourceFk = selData.sourceFk;
          this.detail.sourceType = selData.type;
          this.addCopy();
        }else{
          this.$tip.warning(this.$t("dye.selectTle"))
        }

      })
    },
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      let parasm = {
        vatNo: "%" + (this.form.vatNo || ''),
        weaveJobCode: "%" + (this.form.weaveJobCode || ''),
        custCode: this.form.custCode || '',
        workDate: this.form.workDate || '',
        salPoNo: "%" + (this.form.salPoNo || ''),
        colorCode: "%" + (this.form.colorCode || ''),
        dyeMathine: "%" + (this.form.dyeMathine || ''),
        operator: "%" + (this.form.operator || ''),
        rows: this.page.pageSize,
        start: this.page.currentPage,
        // dataSortRules: "workDate|desc,vatNo"
        dataSortRules: "createTime|desc",
        // 过滤缸号为 B 和 W 系列值
        filterSplitBW: true
      }
      if(this.form.createTime!=null && this.form.createTime.length>1){
        parasm = {...parasm,
          createTime_begin:this.form.createTime[0]+" 00:00:00",
          createTime_end:this.form.createTime[1]+" 23:59:59" }
      }
      get(parasm).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.clothWeight = item.clothWeight ? item.clothWeight.toFixed(2) : 0;
          item.index = i + 1;
          item.mergVatNo = item.vatNos
        });
        if (this.crud.length > 0) this.$refs.crud.setCurrentRow(this.crud[0]);
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    revolveQuery() {
      this.revolveLoading = true;
      getRevolve({
        rows: this.revolvePage.pageSize,
        start: this.revolvePage.currentPage,
        // runState: "1",
        vatNo: "%" + (this.revolveForm.vatNo || ''),
        weaveJobCode: "%" + (this.revolveForm.weaveJobCode || ''),
        serviceOperator: "%" + (this.revolveForm.serviceOperator || '')
        // auditState: 1,
      }).then((res) => {
        this.revolves = res.data.records;
        this.revolves.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.revolve.length > 0) {
          this.$refs.revolveCrud.setCurrentRow(this.revolve[0]);
        }
        this.revolvePage.total = res.data.total;
        this.revolveLoading = false;
      });
    },
    revolveDBLClick(val) {
      if (val.runState == "0") {
        this.$tip.warning(this.$t("dye.selectTle2"));
        return;
      }
      this.revolveChoose = val;
      this.add(this.revolveChoose);
    },
    revolveCellClick(val) {
      this.revolveChoose = val;
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeJob/buildWorkOrder?id=" +
        this.detail.bleadyeJobId;
    },
    printOther(val) {
      if (val == 1) {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proBleadyeJob/buildWorkOrder2?id=" +
          this.detail.bleadyeJobId;
      } else {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proBleadyeJob/buildWorkOrder3?id=" +
          this.detail.bleadyeJobId;
      }
      this.pdfDlg = true;
    },
    add(val) {
      if (val.runState == "0") {
        this.$tip.warning(this.$t("dye.selectTle2"));
        return;
      }
      this.copyCtr = false;
      this.revolveData = val;
      // 添加类型
      this.revolveData.sourceType = 'a'
      this.revolveData.sourceFk = val.runJobId
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      if (parent.userID != this.detail.serviceOperator) {
        this.$tip.warning(this.$t("tipLabel.notPrmDel"));
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle7") +
          this.detail.dyeMathine +
          this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.bleadyeJobId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.query();
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    addCopy() {
      this.copyCtr = true;
      this.isAdd = true;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.detail = val;
    },
  },
  created() {
  },
  mounted() {

  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#clothFlyPrint {
  .el-tag {
    display: none !important;
  }
}
</style>
