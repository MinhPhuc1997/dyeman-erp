<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-15 19:04:12
 * @Description: 
-->
<template>
  <div id="dyeNotice">
    <view-container
      title="染整通知单"
      v-loading="wloading"
      :element-loading-text="$t('public.loading')"
    >
      <el-row class="btnList">
        <el-button
          type="success"
          :disabled="!detail.dyeOrderId"
          @click="handleRowDBLClick(detail)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" :disabled="!detail.dyeOrderId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button type="primary" @click="print" :loading="wloading"
          >打印</el-button
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
          <!-- <div class="btnList">
            <el-button type="warning" @click="pdfDlg = false">{{
              this.$t("public.close")
            }}</el-button>
            <el-button type="primary" @click="print2">打印</el-button>
          </div> -->
          <!--startprint-->
          <embed
            id="pdf"
            style="width: 100vw; height: calc(100vh - 80px)"
            :src="pdfUrl"
          />
          <!--endprint-->
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

      this.form.orderNo = "!^%" + (this.form.orderNo ? this.form.orderNo : "");
      this.form.po = "%" + (this.form.po ? this.form.po : "");
      // if (this.form.dyeDate && this.form.dyeDate.indexOf(":") == -1) {
      //   this.form.dyeDate += " 00:00:00";
      // }
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      )
        .then((res) => {
          this.crud = res.data.records;
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.page.total = res.data.total;

          if (this.form.orderNo.indexOf("!^%") != -1) {
            this.form.orderNo = this.form.orderNo.split("!^%")[1] || "";
          }
          if (this.form.po.indexOf("%") != -1) {
            this.form.po = this.form.po.split("%")[1] || "";
          }

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
        "/api/proDyeFinishOrder/exportpdf?id=" +
        this.detail.dyeOrderId;
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip
        .cofirm(
          "是否删除指令编号为【 " +
            this.detail.orderNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.dyeOrderId)
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
#dyeNotice {
}
</style>