<template>
  <view-container title="定型物料统计">
    <div class="btnList">
      <el-button type="primary" @click="query"> 查询/Tra cứu</el-button>
      <el-button type="success" @click="exportExcel" disabled> 导出/Xuất file</el-button>
      <div style="float: right;margin-right: 17px;margin-top: 5px">
        <el-switch
          @change="changePO"
          style="display: block"
          v-model="visiablePO"
          active-color="#13ce66"
          inactive-color="#499eff"
          active-text="以PO汇总"
          inactive-text="以缸号汇总"/>
      </div>
    </div>
    <el-row class="formBox">
      <template v-if="visiablePO">
        <avue-form ref="form" :option="fomOpPO" v-model="form"/>
      </template>
      <template v-else>
        <avue-form ref="form" :option="fomOp" v-model="form"/>
      </template>
    </el-row>
    <el-row>
      <el-col :span="13">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                   @current-row-change="cellClick"
        ></avue-crud>
      </el-col>
      <el-col :span="11">
        <avue-crud :option="crudOpDtl" :data="crudDtl"
        ></avue-crud>
      </el-col>
    </el-row>
  </view-container>
</template>
<script>
import {crudDetail, crudHasPO, crudMain, crudNotPO, formOption, formOptionPO} from "./data";
import {axiosGet} from "../../im/Wk/cc/actionCloth/api";
import {queryParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "index",
  data() {
    return {
      fomOp: formOption(this),
      form: {},
      fomOpPO: formOptionPO(this),
      crudOp: crudMain(this),
      crud: [],
      crudOpDtl: crudDetail(this),
      crudDtl: [],
      loading: false,
      visiablePO: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50, 100],
      },
    }
  }, methods: {
    async query() {
      this.loading = true;
      let uri = "/api/proFinishJob/materialStat";
      let uri2 = "/api/proFinishJob/materialStatPo";
      let params = queryParms(this.form, [], this.page)
      let res = await axiosGet((this.visiablePO) ? uri2 : uri, params);
      this.crud = res.data.records;
      this.page.total = res.data.total;
      this.page.current = res.data.current;

      !this.visiablePO && this.crud.sort((a, b) => {
        return Number(a.vatNo.substring(3, 11)) > Number(b.vatNo.substring(3, 11)) ? 1 : -1
      })
      this.visiablePO && this.crud.sort((a, b) => {
        return a.salPoNo >b.salPoNo ? 1 : -1
      })
      this.crud.map((e, i) => e.index = i + 1)
      this.$refs.crud.setCurrentRow(this.crud[0]);
      this.crudDtl = this.crud[0].pfjf;
      this.loading = false;
    },
    changePO() {
      this.crudOp.column = (this.visiablePO) ? crudHasPO : crudNotPO
      this.query();
    },
    cellClick(val) {
      this.crudDtl = val.pfjf;
      this.crudDtl.map((e, i) => e.index = i + 1)
    },
    exportExcel() {
      this.$message.warning("功能在开发中。。。。 . Tính năng đang biết triển")
    }
  }
}
</script>
