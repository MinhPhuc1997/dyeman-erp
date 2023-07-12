<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-19 16:43:26
 * @Description:
-->
<template>
  <div
    id="qcDeatilReport"
    :element-loading-text="$t('public.loading')"
    v-loading="wloading"
  >
    <view-container :title="$t('qcProBleadyeRunJob.title1')">
      <el-row class="btnList">
        <el-button type="primary" @click="handleExport">{{$t("public.export")}}</el-button>
        <!-- <el-button type="primary" @click="handleReturnNote">退换</el-button> -->
        <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="queryParams"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crudDataList"
          :page.sync="page"
          v-loading="loading"
          @on-load="handleLoadData"
          @current-row-change="cellClick"
        >
        </avue-crud>
      </el-row>
    </view-container>
    <return-note ref="returnNote"></return-note>
  </div>
</template>
<script>
import returnNote from "./return-note";
import { mainForm, mainCrud } from "./data";
import { fetchProBleadyeRunJobByPage, fetchFineReportUrl } from "./api";
export default {
  name: "qcDeatilReport",
  components: {
    returnNote
  },
  data() {
    return {
      formOp: mainForm(this),
      queryParams: {},
      crudOp: mainCrud(this),
      crudDataList: [],
      page: {
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wloading: false,
      loading: false,
      serachLoading: false,
      options: [],
      cellClickData: {}
    };
  },
  watch: {},
  methods: {
    // 导出
    handleExport(){
      let queryData = {
        module: "PRO",
        id: "PRO_BLEADYE_RUN_SUMMARY",
      };
      fetchFineReportUrl(queryData).then((res) => {
        if (res.data) {
          let url = res.data.url;
          // 参数枚举
          let workDate = this.queryParams.workDate
          if(workDate && workDate.length == 2){
            url += `&workDate_begin=${workDate[0]}`;
            url += `&workDate_end=${workDate[1]}`;
          }
          
          // let paramsKeys = ['vatNo','weaveJobCode','salPoNo'];
          // paramsKeys.forEach(key => {
          //   url += `&${key}=${this.queryParams[key]}`;
          // })
          
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          warning(this.$t("tipLabel.noreport"));
        }
      })
    },
    // 查询
    handleQuery(){
      this.page.currentPage = 1;
      this.handleLoadData();
    },
    // 获取数据
    handleLoadData(){
      this.loading = true ;
     
      let params = {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          includeDtlCount: true,
          includeDtl: true,
          dataSortRules: "workDate|desc,vatNo|desc,weaveJobCode|desc"
      };
      let workDate = this.queryParams.workDate
      if(workDate && workDate.length == 2){
        params.workDate_begin = workDate[0];
        params.workDate_end = workDate[1];
      }
      
      fetchProBleadyeRunJobByPage(params).then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records.map((item,index) => {
            if(item.children){
              item.id = index + 1;
              item.children.sort((a,b) => a.sn - b.sn).forEach((cItem,cIndex) => {
                cItem.id = `${index}-${cIndex}`;
                cItem.pidCount = cItem.sn
                // 属性值替换
                cItem.preCalicoWeight = cItem.clothWeight;
                cItem.clothWeight = ''
              })
            }
            return item;
          })
      }).finally(_ => {
          this.loading = false;
      })
    },
    cellClick(val) {
        this.cellClickData = val;
    },
    async handleReturnNote() {
        this.$refs.returnNote.dialogVisible = true;
        await this.$nextTick();
        this.$refs.returnNote.initData(this.cellClickData);
    }
  },
  updated(){
    if(this.crudDataList && this.crudDataList.length){
      this.$nextTick(() => {
        this.$refs["crud"].doLayout();
        });
    }
  }
};
</script>
<style lang='stylus'>
</style>
