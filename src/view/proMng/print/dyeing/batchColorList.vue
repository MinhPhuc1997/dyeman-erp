<!--
 * @Description: 未生成漂染单的批色回修单
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-20 14:56:04
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-21 11:48:34
-->
<template>
  <div class="batch-color-container">
    <el-row class="btnList">
      <el-button type="success" @click="handleCreate"> {{ $t("public.sc") }} </el-button>
      <el-button type="primary" @click="handleQuery"> {{ $t("public.query") }} </el-button>
    </el-row>
    <el-row class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
    </el-row>
    <el-row class="crudBox">
      <avue-crud
        ref="crud"
        :option="crudOp"
        :data="crud"
        :page.sync="page"
        v-loading="loading"
        :element-loading-text="$t('public.loading')"
        @on-load="handleQuery"
        @row-click="handleRowClick"
      >
      </avue-crud>
    </el-row>
  </div>
</template>
<script>
import { unCreate2BatColFromOp, unCreate2BatColCurdOp } from "./data_tab";
import { fetchProBatchColorLedgerViewByPage } from "./api_tab"
export default {
  name: "dyeingBatchColor",
  data() {
    return {
      loading: false,
      formOp: unCreate2BatColFromOp(this),
      form: {},
      crudOp: unCreate2BatColCurdOp(this),
      crud: [],
      page: {
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      curSelRow: null,
    };
  },
  methods: {
    // 单击选择
    handleRowClick(row){
        this.curSelRow = row;
    },
    // 生成染整数据
    handleCreate(){
        if(!this.curSelRow) return this.$tip.warning(this.$t("tipLabel.notCheckData"))
        let params = {
            type: "b",
            vatNo: this.curSelRow.vatNo,
            sourceFk: this.curSelRow.recId
        }
        this.$emit("select", params)
    },
    // 查询
    handleQuery() {
      this.page.currentPage = 1;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      let params = {
        appMileage: this.form.appMileage || "",
        appState: "染缸返工",
        appTime: this.form.appTime || "",
        vatNo: "%" + (this.form.vatNo || ""),
        dataSortRules: "appTime|desc,vatNo|desc",
        rows: this.page.pageSize,
        start: this.page.currentPage,
        filterCreateJob: true
      };
      fetchProBatchColorLedgerViewByPage(params)
        .then(async (res) => {
          let { records, total } = res.data;
          this.cardData = {};
          this.crud = records;
          this.page.total = total;
          this.chooseData = {};
          this.$refs.crud.setCurrentRow();
          await this.$nextTick();
          this.curIdx = null;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },

  },
};
</script>