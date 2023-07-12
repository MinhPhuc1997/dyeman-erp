<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-14 13:42:15
-->
<template>
  <div class="collar-account-container" :element-loading-text="loadLabel" v-loading="loading">
    <div class="btnList">
      <!-- <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button> -->
      <el-button type="success" @click="handleUpdate">{{ this.$t("public.update") }}</el-button>
      <el-button type="danger" :disabled="hasNotEdit" @click="handleDelete">{{ this.$t("public.del") }}</el-button>
      <el-button type="success" :disabled="hasNotEdit" @click="handleExamine">{{$t("public.audit")}}</el-button>
      <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="form"></avue-form>
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
    <collar-account-dtl ref="collarAccountDtlRef" :collarAccountData="collarAccountData" @dtlClose="handleDtlClose" @save-success="handleSaveSuccess"  />
  </div>
</template>

<script>
import { crudOp, queryFormOp } from "./data";
import { fetchProCollarAccDataByPage, removeProCollarAccById, fetchDataExamine } from "./api";
import CollarAccountDtl from "./collarAccountDtl.vue"
export default {
  name: "collarAccountList",
  components: {
    CollarAccountDtl
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

      collarAccountData: {},
      curRowSelect: {},
      visible: false
    };
  },
  computed:{
    hasNotEdit(){
      return this.curRowSelect.stockState == "2"
    }
  },
  methods: {
    
    // 初始化明细数据并抽取织单数据
    initAndExtractData(data){
      this.collarAccountData = {};
      let oDtlRef = this.$refs.collarAccountDtlRef;
     
      oDtlRef.extractDataByWeave(data)
    },
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList();
    },
    // 明细新增保存后
    handleSaveSuccess(){
      this.$emit("refresh-unCreate");
    },
    // 审核
    handleExamine(){
      let { proCollarAccountoid, receiveNo, stockState } = this.curRowSelect;
      if(stockState == 2) return this.$tip.warning(this.$t("tipLabel.examineWarning"))
      this.$tip
        .cofirm(`${this.$t("proCollarAccount.examineTle")}【${receiveNo}】`)
        .then(res => {
          this.loading = true;
          return fetchDataExamine(proCollarAccountoid)
        }).then(res => {
          if(res.data.data == true){
            this.$tip.success(res.data.msg)
            this.getDataList();
          }else{
            this.$tip.error(res.data.msg)
          }
        }).finally(() => {
          this.loading = false;
        })
      
    },
    //   关闭
    handleDtlClose(hasRefresh){
        this.$refs.collarAccountDtlRef.visible = false;
        hasRefresh && this.getDataList();
    },
    //  删除
    handleDelete() {
      let { proCollarAccountoid, receiveNo, stockState } = this.curRowSelect;
      if(stockState == 2) return this.$tip.warning(this.$t("tipLabel.examineWarning"))
      this.$tip
        .cofirm(`${this.$t("proCollarAccount.delTle")}${receiveNo}${this.$t("proCollarAccount.del2Tle")}`)
        .then(res => {
          this.loading = true;
          removeProCollarAccById(proCollarAccountoid)
            .then(res => {
              if (res.data.code == 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.getDataList();
                this.$emit("refresh-unCreate")
              }else{
              }
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
    //  修改
    handleUpdate() {
      this.collarAccountData = this.curRowSelect;
      this.$refs.collarAccountDtlRef.visible = true;
    },
    async handleAdd() {
      this.collarAccountData = {};
      this.$refs.collarAccountDtlRef.visible = true;
      //   await this.$nextTick();
      //   this.$refs.withDrawalDtlRef.initData();
    },
    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        stockState: this.form.stockState,
        dataSortRules: "receiveDate|desc,receiveNo"
      };
      let props = ["receiveNo","deliveryNo"];
      props.forEach(key => {
        if(this.form[key]){
          params[key] = '%' + this.form[key]
        }
      })
      let receiveDate = this.form.receiveDate
      if(receiveDate &&  receiveDate.length == 2){
        params.receiveDate_begin = receiveDate[0];
        params.receiveDate_end = receiveDate[1];
      }
      this.loading = true;
      fetchProCollarAccDataByPage(params)
        .then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    handleRowDBLClick(row) {
      this.collarAccountData = row;
      this.$refs.collarAccountDtlRef.visible = true;
    },
    handleCellClick(row) {
      this.curRowSelect = row;
    }
  }
};
</script>