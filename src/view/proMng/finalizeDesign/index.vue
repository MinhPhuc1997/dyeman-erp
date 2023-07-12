<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-10 11:21:00
 * @Description: 
-->
<template>
  <div id="finalizeDesign">
    <view-container
      title="定型指令单"
      v-loading="wloading"
      :element-loading-text="$t('public.loading')"
    >
      <el-row class="btnList">
        <el-button
          type="success"
          :disabled="!detail.finishJobId"
          @click="handleRowDBLClick(detail)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" :disabled="!detail.finishJobId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button
          type="primary"
          @click="print"
          :loading="wloading"
          :disabled="!detail.finishJobId"
          >{{$t("public.print")}}</el-button
        >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        ></avue-crud>
      </el-row>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="dialogVisible"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-if="dialogVisible"
      >
        <tem-dlg
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          @close="dialogVisible = false"
          @refresh="query"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="pdfDlg"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <view-container :title="$t('public.printPreview')">
          <embed
            id="pdf"
            style="width: 100vw; height: calc(100vh - 80px)"
            :src="pdfUrl"
          />
        </view-container>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print } from "./api";
import tem from "./temDlg";
export default {
  name: "",
  components: {
    temDlg: tem,
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
      loading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      let { vatNo, weaveJobCode, custCode, startJobDate} = this.form;
      let params = {
        vatNo: "%" + (vatNo || ''),
        weaveJobCode: "%" + (weaveJobCode || ''),
        custCode,
        startJobDate,
        // 过滤 缸号为 B W系列
        filterSplitBW: true
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          dataSortRules: "startJobDate|desc,vatNo"
        })
      )
        .then((res) => {
          this.crud = res.data.records;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.page.total = res.data.total;
          this.loading = false;
        })
        .catch((e) => {
          this.$tip.error(e);
          this.loading = false;
          console.log(e);
        });
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proFinishJob/proFinishPdf?id=" +
        this.detail.finishJobId;
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip
        .cofirm(
          this.$t("tipLabel.delVat") + this.detail.vatNo + this.$t("iaoMng.delTle2"),
         )
        .then(() => {
          del(this.detail.finishJobId)
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
    handleRowDBLClick(val) {
      this.dialogVisible = true;
      this.isAdd = false;
      this.detail = val;
      // this.print();
    },
    cellClick(val) {
      this.detail = val;
    },
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#finalizeDesign {
}
</style>