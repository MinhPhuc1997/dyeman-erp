<!--
 * @Description:
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:23
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-07 11:49:12
-->
<template>
  <div id="stkin-memo-container">
    <div class="btnList">
      <el-button type="danger" @click="handleDelete" :disabled="hasEdit" v-hasPerm="['quality:stkinMemo:del']">{{ this.$t("public.del") }}</el-button>
      <el-button type="primary" @click="handleQuery" v-hasPerm="['quality:stkinMemo:list']">{{ this.$t("public.query") }}</el-button>
      <el-button type="primary" @click="handleExport" v-hasPerm="['quality:stkinMemo:export']">{{$t("public.report")}}</el-button>
      <el-button type="warning" v-if="isAdmin" @click="handleReverse" :disabled="!hasEdit" v-hasPerm="['quality:stkinMemo:sync']">{{$t("proClothStkinMemo.dataBack")}}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
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
      ></avue-crud>
    </div>
  </div>
</template>
<script>
import {  stkinMemoCrudOp, stkinMemoQueryFormOp } from "./data"
import { fetchProClothStkinMemeByPage, delterStkinMemoData, fetchDataReverse } from "./api"
import { fetchFineReportUrl } from "@/config/index"
export default {
  name: "stkinMemo",
  props:{
    imWkType:{
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      loading: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      queryFormOp:stkinMemoQueryFormOp(this),
      queryForm:{},
      crudOp:stkinMemoCrudOp(this),
      crudDataList:[],
      curSelectRow: {},
    };
  },
  computed:{
      hasEdit(){
          return Boolean(this.curSelectRow.yinDate);
      },
      isAdmin(){
         return (parent.userID || '').toLocaleUpperCase() === 'ADMIN'
      }
  },
  methods: {
    // 数据回溯
    async handleReverse(){
      let { memoNo }  = this.curSelectRow;
      if(!memoNo) return this.$tip.warning(this.$t("tipLabel.notCheckData"));
      let isConfirm = await this.$tip.cofirm(`${this.$t("proClothStkinMemo.confirm1")} ${memoNo} ${this.$t("proClothStkinMemo.confirm2")}`).then(() => true).catch(() => false);
      if(!isConfirm) return;
      this.loading = true;
      fetchDataReverse(memoNo).then(res => {
        this.$tip.success(this.$t("proClothStkinMemo.success1"));
        this.getDataList();
      }).finally(() => {
        this.loading = false;
      })
    },
    // 导出报表
    handleExport(){
      let { proClothStkinMemooid }  = this.curSelectRow;
      if(!proClothStkinMemooid) return  this.$tip.warning(this.$t("proClothStkinMemo.warning1"));
      let queryData = {
        module: "PRO",
        id: "PRO_STKIN_MEMO",
      };
      fetchFineReportUrl(queryData).then(res => {
        if (res.data) {
          let data = res.data.url.split(":")[2]
          let url = "http:" + window.location.origin.split(":")[1] + ":" + data;
          // 参数枚举
          url += "&stkinOid=" + proClothStkinMemooid
          console.log(url);
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          this.$tip.warning(this.$t("tipLabel.noreport"));
        }
      })

    },
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList()
    },
    getDataList() {
      this.loading = true;
      let { memoDate,weaveJobCode } = this.queryForm;
      let params = {
        start: this.page.currentPage,
        rows: this.page.pageSize,
        weaveJobCode: weaveJobCode ? '%' + weaveJobCode : ""
        // dataSortRules: "memoDate|desc,memoNo|desc"
        // dataSortRules: "sysCreated|desc"
      };
      if(memoDate && memoDate.length == 2){
        Object.assign(params,{
          memoDate_begin: memoDate[0],
          memoDate_end: memoDate[1]
        })
      }
      fetchProClothStkinMemeByPage(params).then(res => {
        this.page.total = res.data.total;
        this.crudDataList = res.data.records;
      }).finally(() => {
        this.loading = false;
      })
    },
    async handleDelete(){
      let {proClothStkinMemooid, memoNo} = this.curSelectRow;
      if(!proClothStkinMemooid) return this.$tip.warning(this.$t("tipLabel.notCheckData"));
      this.loading = true;
      let isComfirn = await this.$tip.cofirm(`${this.$t("tipLabel.delCode")}${memoNo}${this.$t("tipLabel.delEnd")}`).then(res => true).catch(err => false);
      if(!isComfirn) return false;
      delterStkinMemoData({id:proClothStkinMemooid}).then(res => {
        this.$tip.success(this.$t('public.sccg'));
        this.getDataList();
      }).finally(() => {
        this.loading = false
      })
    },
    handleRowDBLClick(row) {
      this.$emit("click-row",row)
    },
    handleCellClick(row) {
      this.curSelectRow = row;
    },

  }
};
</script>
<style lang="stylus">
  #stkin-memo-container{
    .avue-crud__menu {
      min-height: 5px !important;
      height: 5px !important;
    }
  }

</style>
