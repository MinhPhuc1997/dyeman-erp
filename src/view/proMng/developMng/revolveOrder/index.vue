<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-14 10:47:07
 * @Description:
-->
<template>
  <div class="developRunJob">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="created" :label="$t('revolve.title1')" v-loading="wloading"
        :element-loading-text="$t('public.loading')">
        <el-row class="btnList">
          <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
            <el-button type="success" :disabled="!detail.runJobId" @click="handleRowDBLClick(detail)">{{
                $t("public.update")
            }}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
            <el-button type="primary" @click="add">{{ this.$t("public.add") }}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
            <el-button type="danger" :disabled="!selectList.length" @click="del">{{ $t("public.del") }}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
            <el-button type="primary" @click="print" :loading="wloading"
              :disabled="detail.runState == '0' || !detail.runJobId">{{ $t("public.print") }}</el-button>
          </el-tooltip>
          <el-button type="primary" @click="exhaustPrint" :loading="wloading">{{ $t("exhaustCard") }}</el-button>
          <el-tooltip class="item" effect="dark" content="copy" placement="top-start">
            <el-button type="primary" :disabled="!detail.runJobId" @click="copyEvent" :loading="wloading">
              {{ $t("public.copy") }}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
            <el-button type="primary" @click="handleQuery">{{ $t("public.query") }}</el-button>
          </el-tooltip>
          <el-dropdown split-button type="primary" @click="splitVatNo('A')" :disabled="!detail.runJobId"
            :loading="wloading" style="margin: 0 10px">
            {{ $t("public.splitVat") }}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="splitVatNo('A')">{{ $t("revolve.changVatA") }}</el-dropdown-item>
              <el-dropdown-item @click.native="splitVatNo('R')">{{ $t("revolve.changVatR") }}</el-dropdown-item>
              <el-dropdown-item @click.native="splitVatNo('W')">{{ $t("revolve.changVatW") }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" @click="handleOpenSendOrder">{{ $t("public.sendOrder") }}</el-button>
          <el-button type="primary" @click="reportingData">{{ $t("public.allDataReport") }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
            :row-style="rowStyle" @on-load="handleQuery" @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick" @selection-change="selectionChange">
          </avue-crud>
        </el-row>
        <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
          :close-on-click-modal="false" :close-on-press-escape="false">
          <tem-dlg ref="revolveOrderTem" :detail="detail" :isAdd="isAdd" :copyC="copyC" :isSplit="isSplit"
            :isExtract="isExtract" :splitType="splitType" @close="dialogVisible = false" @print="print"
            @refresh="handleQuery"></tem-dlg>
        </el-dialog>
        <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
          :close-on-click-modal="false" :close-on-press-escape="false" @close="pdfClose">
          <view-container :title="$t('public.printPreview')">
            <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
          </view-container>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane name="unCreate" label="待排染整生产运转单清单" lazy>
        <un-create-list ref="unCreateListRef" @select-create="handleSelectCreate" />
      </el-tab-pane>
    </el-tabs>
    <!-- 收发单 -->
    <sendandreceive-order ref="sendandreceiveOrder" :disPropValue="sendDisProps" :defaultParams="sendRecDefaultData"
      :typechangeable="false" :remote="{ key: 'runJobId', value: 'runJobId', label: 'vatNo', fetchApi: get }"
      dispathReceive="2" :runJobInfo="detail"></sendandreceive-order>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, update, del, delDye, getDye } from "../../revolve/api";
import tem from "./temDlg";
import sendandreceiveOrder from "@/components/sendAndreceive-order"
import unCreateList from "./unCreateList.vue"
export default {
  name: "developRunJob",
  components: {
    temDlg: tem,
    sendandreceiveOrder,
    unCreateList
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        salPoNo: "",
        colorCode: "",
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200, 500],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      isSplit: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      copyC: false,
      selectList: [],
      splitType: "A",
      hasFinied: 0,
      isExhaust: false,
      get,
      tabs: "created",
      sendRecDefaultData: {
        sendProcessFk: 'kf',
        dptworkProcessFk: "rs"
      },
      isExtract: false,
      sendDisProps: ["sendProcessFk"]
    };
  },
  watch: {},
  methods: {
    handleQuery() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "" && key != "auditState") {
          delete this.form[key];
        }
      }
      let params = {
        vatNo: "!^%" + (this.form.vatNo || ""),
        weaveJobCode: "%" + (this.form.weaveJobCode || ""),
        salPoNo: "%" + (this.form.salPoNo || ""),
        colorCode: "%" + (this.form.colorCode || ""),
        serviceOperator: "%" + (this.form.serviceOperator || ""),
        fabName: "%" + (this.form.fabName || ""),
        gramWeight: "%" + (this.form.gramWeight || ""),
        fabElements: "%" + (this.form.fabElements || ""),
        auditState: this.form.auditState
      };

      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          pages: this.page.currentPage,
          workDate: this.form.workDate ? this.form.workDate + " 07:00:00" : '',
          custCode: this.form.custCode,
          jobType: 1,
          delFlag: 0,
          dataSortRules: "workDate|desc,vatNo",

        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.length > 0 && this.$refs.crud.setCurrentRow(this.crud[0]);
        this.page.total = res.data.total;
      }).finally(() => {
        this.loading = false;
      })
    },
    print() {
      this.pdfDlg = true;
      this.isExhaust = false;
      let url = (this.detail.dyeMatter==1)?"/api/proBleadyeRunJob/createBleadyeRunJobPdf":"/api/proBleadyeRunJob/flatPdf"
      this.pdfUrl =
        process.env.API_HOST + url+"?id=" +this.detail.runJobId + '&UserName=' + parent.userID;
    },
    reportingData() {
      window.open("http://192.168.5.1:91/api/proBleadyeRunJob/reportingData");
    },
    exhaustPrint() {
      this.pdfDlg = true;
      this.isExhaust = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/smallCard?id=" +
        this.detail.runJobId;
    },
    async handleSelectCreate(row) {
      this.add();
      this.isExtract = true;
      await this.$nextTick();
      this.$refs.revolveOrderTem.setGstDataExtract(row);
    },
    async handleOpenTem() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.revolveOrderTem.getData();
    },
    async handleOpenSendOrder() {
      this.loading = true;
      this.$refs.sendandreceiveOrder.dialogVisible = true;
      await this.$nextTick();
      this.$refs.sendandreceiveOrder.initData(); // 初始化发单信息
      this.loading = false;
    },
    copyEvent() {
      this.isAdd = true;
      this.splitType = "A";
      this.copyC = true;
      this.isSplit = false;
      this.handleOpenTem();
    },
    add() {
      this.isSplit = false;
      this.isAdd = true;
      this.copyC = false;
      this.handleOpenTem();
    },
    splitVatNo(type) {
      if (!this.detail.runJobId) return this.$tip.warning(this.$t("revolve.splitTle")); //"请选择一条运转单!"
      this.splitType = type;
      this.isSplit = true;
      this.isAdd = true;
      this.copyC = true;
      this.handleOpenTem();
    },
    del() {
      this.$tip
        .cofirm(this.$t("tipLabel.deleteConfirm"))
        .then(() => {
          this.wloading = true;
          this.selectList.forEach((item, i) => {
            del(item.runJobId).then((res) => {
              getDye({ vatNo: item.vatNo }).then((dye) => {
                if (dye.data.length) {
                  delDye(dye.data[0].bleadyeJobId).then((delDye) => { });
                }
                if (i == this.selectList.length - 1) {
                  setTimeout(() => {
                    this.$tip.success(this.$t("public.sccg"));
                    this.wloading = false;
                    this.handleQuery();
                  }, 200);
                }
              });
            });
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
        };
      } else if (row.auditState === 0) {
        return {
          backgroundColor: "#F56C6C"
        };
      }
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.handleOpenTem();
    },
    cellClick(val) {
      this.detail = val;
    },
    selectionChange(val) {
      this.selectList = val;
    },
    pdfClose() {
      if (this.detail.runState == "1" && !this.isExhaust) {
        this.$tip
          .cofirm(
            this.$t("tipLabel.updatePrintStatus")
          )
          .then(() => {
            this.detail.printDate = this.$getNowTime("datetime");
            this.detail.modifiDate = this.detail.printDate;
            this.detail.runState = "3";
            update(this.detail).then((res) => {
              if (res.data.code == 200) {
                this.$tip.success(this.$t("public.bccg"));
                this.pdfDlg = false;
              } else {
                this.$tip.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.pdfDlg = false;
          });
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.crud.doLayout();
    });
  },
  created() { },
  mounted() {
    this.handleQuery();
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
.developRunJob {
  .avue-crud__tip {
    display: none !important;
    height: 0px !important;
  }

  .avue-crud__menu {
    height: 35px !important;
  }
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
  font-size: 15px !important;
  line-height: 28px !important;
}
</style>
