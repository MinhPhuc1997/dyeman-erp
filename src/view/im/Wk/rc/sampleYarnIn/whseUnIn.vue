<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:36
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-29 11:49:47
-->
<template>
  <div id="whse-unIn-container">
    <div class="btnList">
      <el-button type="success" @click="handleCreateDtl">生成入仓单</el-button>
      <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="whseUnInRef"
        :option="crudOp"
        :data="crudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @select="handleSelect"
        @select-all="handleSelectAll"
      ></avue-crud>
    </div>
  </div>
</template>
<script>
import { yarnForSampleCrudOp } from "./data"
import { fetchPurYarnForSampleDataListByPage } from "./api"
export default {
  name: "whseUnIn",
  data() {
    return {
      loading: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      queryFormOp: {},
      queryForm: {},
      crudOp: yarnForSampleCrudOp(this),
      crudDataList: [],
      curYarnForSampleNote:""
    };
  },
  methods: {
    // 生成入库单号
    handleCreateDtl(){
      if(!this.curYarnForSampleNote) return this.$tip.warning("请选择数据~");
      this.$emit("select",this.curYarnForSampleNote);
      this.$refs.whseUnInRef.selectClear();
    },
    getDataList() {
        this.loading = true;
        this.curYarnForSampleNote = ""
        let params = {
            start: this.page.currentPage,
            rows: this.page.pageSize,
        }
        fetchPurYarnForSampleDataListByPage(params).then(res => {
            this.page.total = res.data.total;
            this.crudDataList = res.data.records;
        }).finally(() => {
          this.loading = false;
        })

    },
    // 全选回调
    handleSelectAll(){
      this.$refs.whseUnInRef.selectClear();
    },
    // 选中回调
    handleSelect(rows, row){
      let itemData = row;
      this.$refs.whseUnInRef.selectClear();
      if (itemData && itemData.yarnforsampleNote != this.curYarnForSampleNote) {
        let yarnforsampleNote = itemData.yarnforsampleNote;
        this.crudDataList.forEach(item => {
          item.yarnforsampleNote == yarnforsampleNote &&
            this.$refs.whseUnInRef.toggleRowSelection(item, true);
        });
        this.curYarnForSampleNote = itemData.yarnforsampleNote;
      } else {
        this.curYarnForSampleNote = "";
      }
    },
    // 审核
    handleExamine() {},
    // 关闭
    handleClose() {
      document.getElementsByClassName("el-dialog__headerbtn")[1].click();
    }
  }
};
</script>
<style lang="stylus">
  #whse-unIn-container{
    .avue-crud__menu {
      min-height: 5px !important;
      height: 5px !important;
    }
  }
</style>