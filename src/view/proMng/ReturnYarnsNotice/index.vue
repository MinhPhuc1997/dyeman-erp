<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-15 16:56:13
-->
<template>
  <div id="return-yarns-notice-container">
    <view-container :title="$t('ReturnYarnsNotice.title1')" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
        <el-button type="success" @click="handleUpdate">{{ this.$t("public.update") }}</el-button>
        <el-button type="danger" :disabled="hasNotEdit" @click="handleDelete">{{ this.$t("public.del") }}</el-button>
        <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
        <el-button type="success" @click="handleReport">{{ this.$t("public.report") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="queryFormOp" v-model="form">
          <template v-for="(item,index) in queryFormOp.column.filter(c => c.labelslot)" :slot="item.prop + 'Label'">
            <div :key="index" style="line-height: 1.3; text-align: center">
              <div style="font-size: 13px; font-weight: bold">{{item.subLabel}}</div>
              <div>{{item.label}}</div>
            </div>
          </template>
        </avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crudDataList"
          :page.sync="page"
          v-loading="loading"
          @on-load="getDataList"
          @row-dblclick="handleRowDBLClick"
          @row-click="handleCellClick"
          :cell-style="handleCellStyle"
        >
          <template v-for="(item,index) in crudOp.column.filter(c => c.headerslot)" :slot="item.prop + 'Header'">
            <div :key="index">
              <div style="font-size: 13px; font-weight: bold">{{item.subLabel}}</div>
              <div>{{item.label}}</div>
            </div>
          </template>
        </avue-crud>
      </div>
    </view-container>

    <!-- 明细 -->
    <el-dialog :visible.sync="dltDialogVisible" fullscreen append-to-body>
      <with-drawal-dtl
        ref="withDrawalDtlRef"
        :withDatalData="withDatalData"
        @dtlClose="handleDtlClose"
        @refresh="handleRefresh"
      ></with-drawal-dtl>
    </el-dialog>
  </div>
</template>

<script>
import { crudOp, queryFormOp } from "./data";
import { fetchWithDrawalListByPage, removeWithDrawalById } from "./api";
import WithDrawalDtl from "./withDrawalDtl.vue";
import {fetchFineReportUrl} from "@/api/index.js"
export default {
  name: "returnYarnsNotice",
  components: {
    "with-drawal-dtl": WithDrawalDtl
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      queryFormOp: queryFormOp(this),
      form: {},
      crudOp: crudOp(this),
      crudDataList: [],

      withDatalData: {},
      curRowSelect: {},
      dltDialogVisible: false
    };
  },
  computed:{
    hasNotEdit(){
      return this.curRowSelect.isInStock
    }
  },
  methods: {
    // 导出报表
    async handleReport(){
      let {proYarnsWithdrawaloid: id, withdrawalNo} = this.curRowSelect
      if (!id) return this.$tip.warning("请选择数据");
      let confirmRes = await this.$tip.cofirm(`是否确认导出退纱通知单为${withdrawalNo}的数据`).then(_ => true).catch(_ => false);
      if (!confirmRes) return false;

      let parmas = {
        module: "PRO",
        id: "RET_YARN_NOTICE",
      }
      fetchFineReportUrl(parmas).then(res => {
        let url = res.data.url;
        url += `&oid=${id}`
        let oA = document.createElement('a');
        oA.target = "_blank";
        oA.href = url;
        oA.click();
      })
    },
    // 确认后刷新
    handleRefresh(){
      this.dltDialogVisible = false;
      this.getDataList();
    },
    handleCellStyle({row,column}){
      if(column.property == 'isInStock'){
        return {
          fontWeight: "bolder",
          color: row.isInStock ? "green" : "red"
        }
      }
    },
    //   关闭
    handleDtlClose(hasRefresh){
        this.dltDialogVisible = false;
        hasRefresh && this.getDataList();
    },
    //  删除
    handleDelete() {
      let { proYarnsWithdrawaloid, withdrawalNo } = this.curRowSelect;
      this.$tip
        .cofirm(`${this.$t("tipLabel.deleteConfirm1")}${withdrawalNo}${this.$t("ReturnYarnsNotice.delTle")}`)
        .then(res => {
          this.loading = true;
          removeWithDrawalById(proYarnsWithdrawaloid)
            .then(res => {
              if (res.data.code == 200) {
                this.$tip.success(this.$t('public.sccg'));
                this.getDataList();
              }
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
    //  修改
    handleUpdate() {
      this.withDatalData = this.curRowSelect;
      this.dltDialogVisible = true;
    },
    async handleAdd() {
      this.withDatalData = {};
      this.dltDialogVisible = true;
      //   await this.$nextTick();
      //   this.$refs.withDrawalDtlRef.initData();
    },
    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        withdrawalNo: "%" + (this.form.withdrawalNo || ""),
        happenDate: this.form.happenDate,
        weaveJobCode: "%" + (this.form.weaveJobCode || ""),
        typeOf: this.form.typeOf
      };
      this.loading = true;
      fetchWithDrawalListByPage(params)
        .then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    handleRowDBLClick(row) {
      this.withDatalData = row;
      this.dltDialogVisible = true;
    },
    handleCellClick(row) {
      this.curRowSelect = row;
    }
  }
};
</script>