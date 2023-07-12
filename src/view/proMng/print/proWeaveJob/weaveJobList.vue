<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-11 14:55:24
 * @Description:
-->
<template>
  <div id="clothFlyPrint" v-loading="wloading" :element-loading-text="$t('public.loading')">
      <el-row class="btnList">
        <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
          <el-button type="success" :disabled="!detail.weaveJobId" @click="handleRowDBLClick(detail)">{{ $t("public.update") }}</el-button>
        </el-tooltip>
        <template v-if="jobType==1">

         <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
          <el-button type="primary" @click="add">{{
            $t("public.add")
          }}</el-button>

        </el-tooltip>
        </template>
        <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
          <el-button type="danger" :disabled="!detail.weaveJobId" @click="del">{{ $t("public.del") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="in" placement="top-start">
          <el-button type="primary" @click="print" :loading="wloading" :disabled="detail.auditState === 0">{{ $t("public.print") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="copy" placement="top-start">
          <el-button type="primary" @click="copyEvent" :loading="wloading">{{ $t("public.copy") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="拆单" placement="top-start">
          <el-button type="primary" @click="splitWeave" :loading="wloading">{{ $t("public.splitOrder") }}</el-button>
        </el-tooltip>
        <el-button type="primary" @click="handleSendOrderClick" :loading="wloading">{{ $t("public.sendOrder") }}</el-button>
        <el-button type="primary" @click="handleFinish" :disabled="detail.weaveState == 2" >{{$t('knitted')}}</el-button>
        <!-- <el-popconfirm title="是否确定启动审批？" @onConfirm="approval">
          <el-button type="warning" :loading="wloading" slot="reference" style="margin: 0 10px"> 审批 </el-button>
        </el-popconfirm> -->
        <!-- <el-button type="primary" @click="flowTrack" :disabled="detail.auditDesc == 0" >流程跟踪</el-button> -->
        <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
          <el-button type="primary" @click="query">{{
            $t("public.query")
          }}</el-button>
        </el-tooltip>
        <div style="float: right; margin-right: 5px">
          {{$t('public.fuzzyQuery')}} <el-switch v-model="hasFuzzy" :active-text="$t('open')" :inactive-text="$t('public.close')">
          </el-switch>
        </div>
         <div style="float: right; margin-right: 30px">
          {{$t('public.hasAppendix')}} <el-switch v-model="isAnnex" :active-text="$t('open')" :inactive-text="$t('public.close')">
          </el-switch>
        </div>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" :row-style="rowStyle" @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"></avue-crud>
      </el-row>
      <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
        <tem-dlg ref="tem" :jobType="jobType" :detail="detail" :isAdd="isAdd" :isExtract="isExtract" :extractRows="extractRows" :copyC="copyC" :splitW="splitW" :audit="false" @close="dialogVisible = false" @refresh="query" v-if="dialogVisible"></tem-dlg>
      </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('public.printPreview')">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
    <!-- 收发单 -->
    <sendandreceive-order ref="sendandreceiveOrder" :typechangeable="false" :defaultParams="sendRecDefaultData" :remote="{ key: 'weaveJobId', value: 'weaveJobId', label: 'weaveJobCode', fetchApi: get }" dispathReceive="2" :runJobInfo="detail"></sendandreceive-order>
    <!-- <work-flow-track ref="workFlowTrack" :title="`织单【 ${detail.weaveJobCode}】 `" /> -->
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print, fetchUpdateWeaveState, startWorkFlow } from "./api";
import tem from "./temDlg";
import sendandreceiveOrder from "@/components/sendAndreceive-order.vue"
// import workFlowTrack from "@/components/work-flow-track/index"
export default {
  name: "",
  props: {
    jobType: String,
  },
  components: {
    temDlg: tem,
    sendandreceiveOrder,
    // workFlowTrack
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this, true,false,this.jobType),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {
        auditState: 0,
      },
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      copyC: false,
      splitW: false,
      hasFuzzy: true,
      isAnnex:false,
      // 数据抽取
      isExtract: false,
      extractRows: [],
      get,
      sendRecDefaultData: {
        sendProcessFk: 'sk',
        dptworkProcessFk: "peisha"
      }
    };
  },
  watch: {},
  methods: {
    // 发单
    async handleSendOrderClick() {
      this.loading = true;
      this.$refs.sendandreceiveOrder.dialogVisible = true;
      await this.$nextTick();
      this.$refs.sendandreceiveOrder.initData(); // 初始化发单信息
      this.loading = false;
    },
    // 已织完
    handleFinish(){
      // this.detail
      let {weaveState,weaveJobId, weaveJobCode } = this.detail;
      if(weaveState == 2){
        return this.$tip.warning(this.$t("weaveJob.finishedTle"));
      }
      this.$confirm(`${this.$t("weaveJob.finishedConfirm1")} ${weaveJobCode} ${this.$t("weaveJob.finishedConfirm2")}`,"提示",{type: "warning"}).then(res => {
        this.loading = true;
        fetchUpdateWeaveState(weaveJobId).then(res => {
          this.query();
        }).finally(() => {
          this.loading = false;
        })
      })
    },
    //  启动审批流程
    approval() {
      if (!this.detail.weaveJobId) {
        this.$tip.warning(this.$t("tipLabel.notCheckData"));
        return;
      }
      this.wloading = true;
      let params = {
        PKey: "pro_proc",
        busKey: this.detail.weaveJobId
      }
      startWorkFlow(params).then(res => {
        if(res.data.code == 500) {
          this.$tip.error(res.data.msg);
          return
        }
        this.query();
        this.$tip.success("启动审批成功!");
      }).finally(_ => {
        this.wloading = false;
      })
    },
    // 流程跟踪
    flowTrack() {
      if (!this.detail.weaveJobId) {
        this.$tip.warning(this.$t("tipLabel.notCheckData"));
        return;
      }
      this.$refs.workFlowTrack.initData(this.detail.weaveJobId);
    },
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "" && key != "auditState") {
          delete this.form[key];
        }
      }
      let params = JSON.parse(JSON.stringify(this.form));
      if (this.hasFuzzy) {
        params.weaveJobCode =
          "%" + (params.weaveJobCode ? params.weaveJobCode : "");
        params.salPoNo = "%" + (params.salPoNo ? params.salPoNo : "");
        params.fabricDesc = "%" + (params.fabricDesc || "");
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isWorkOut: 0,
          jobType: this.jobType,
          dataSortRules: "weaveJobCode|desc"
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.page.total = res.data.total;
        this.loading = false;
      });

       this.refreshUnCreateWeaveData()

    },
    // 刷新待生成通知单数据
    refreshUnCreateWeaveData(){
        if(this.isExtract){
            this.$emit("refresh-unCreate")
        }
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proWeaveJob/prinEntityPdf?id=" +
        this.detail.weaveJobId
        +"&isAnnex="+this.isAnnex;
    },
    copyEvent() {
      this.isAdd = true;
      this.copyC = true;
      this.splitW = false;
      this.dialogVisible = true;
    },
    add() {
      this.isAdd = true;
      this.splitW = false;
      this.detail = {};
      this.detail.auditState = 0;
      this.copyC = false;

      this.isExtract = false;
      this.extractRows = [];

      this.dialogVisible = true;
    },
    del() {
      // if (this.detail.creator != parent.userID) {
      //   this.$tip.warning("你无权限删除该条数据!");
      //   return;
      // }
      if (this.detail.auditState) {
        this.$tip.warning(this.$t("tipLabel.auditNotDel"));
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle7") +
            this.detail.weaveJobCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.weaveJobId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.query();
              } else {
                this.$tip.error(res.data.msg);
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
      this.isExtract = false;
      this.detail = val;
      // this.print();
    },
    cellClick(val) {
      this.detail = val;
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.weaveState === 1) {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      } else if (row.auditState === 0) {
        return {
          backgroundColor: "#F56C6C",
        };
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if(columnIndex != 3) return;
      if(row.auditDesc === "1") {
        return {
          color: "#F56C6C"
        }
      }else if(row.auditDesc === "2") {
        return {
          color: "#E6A23C"
        }
      }else if(row.auditDesc === "3") {
        return {
          color: "#67C23A"
        }
      }else {
        return {
          color: "#909399"
        }
      }
    },
    splitWeave() {
      this.isAdd = true;
      this.splitW = true;
      this.copyC = false;
      this.dialogVisible = true;
    },
    // 数据抽取赋值
    dataExtract(rows){
        this.add();
        this.isExtract = true;
        this.extractRows = rows;

    }
  },
  created() {},
  mounted() {
    // this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'></style>
