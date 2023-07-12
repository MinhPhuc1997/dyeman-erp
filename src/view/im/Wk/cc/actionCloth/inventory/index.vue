<template>
  <div class="mainSreen">
    <el-row>
      <div style="float: left;padding: 10px">
        <el-button type="primary" @click="getData" v-hasPerm="['whse:productAction:list2']"> 查询</el-button>
        <el-button type="success" @click="reportMain" v-hasPerm="['whse:productAction:export3']"> 导出汇总</el-button>
        <el-button type="warning" @click="reportDetail" v-hasPerm="['whse:productAction:export4']"> 导出明细</el-button>
      </div>
    </el-row>
    <el-row class="formStyle">
      <avue-form ref="form" :option="formOp" v-model="form"/>
    </el-row>
    <el-row class="crudStyle">
      <el-col :span="14">
        <avue-crud
          ref="crud"
          :option="crudMainOp"
          :data="crudMain"
          :page.sync="page"
          @row-click="getDetail"
          :table-loading="loading"
          @on-load="getData"
        />
      </el-col>
      <el-col :span="10">
        <avue-crud ref="crud2" :option="crudDetailOp" :data="crudDetail"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {_invenCrud1, _invenCrud2, _invForm,} from "../data";
import {exportExcel, queryParms, queryParmsV1} from "../process";
import {axiosGet} from "../api";
import axios from "axios";

export default {
  name: "index",
  data() {
    return {
      form: {},
      formOp: _invForm(this),
      crudMainOp: _invenCrud1(this),
      crudMain: [],
      crudDetailOp: _invenCrud2(this),
      crudDetail: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      },
      loading: false,
      loadingDetail: false,
    }
  }, methods: {
    getData() {
      this.loading = true;
      this.crudDetail = [];
      this.report = this.form;
      let api = "/api/whseFinishedFabricShot/cpInventory";
      let params = queryParmsV1(this.form, ["custCode"], this.page, ["fabName"]);
      axiosGet(api, params).then((res) => {
        this.crudMain = res.data.records;
        this.page.total = res.data.total;
        this.page.currentPage = res.data.current;
        this.crudMain.map((e, i) => e.index = i + 1);
        if (res.data.records.length > 0) {
          this.getDetail(this.crudMain[0])
          this.$refs.crud.setCurrentRow(this.crudMain[0]);
        }
        setTimeout(() => {
          this.loading = false;
        }, 300)
      })
    },
    getDetail(val) {
      this.loadingDetail = true;
      let api = "/api/whseFinishedFabricShot";
      axiosGet(api, {vatNo: val.vatNo, fabricState: 7}).then((res) => {
        this.crudDetail = res.data;
        this.crudDetail.map((e, i) => {
          e.pidNo = Number(e.productNo.slice(-3))
        });
        this.crudDetail.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1
        })
        this.crudDetail.map((e, i) => e.index = i + 1)
        setTimeout(() => {
          this.loadingDetail = false;
        }, 300)
      })
    },
    reportMain() {
      this.$tip.cofirm("您确定需要导出报表吗？").then(() => {
        let params = queryParmsV1(this.form, ["custCode"], this.page, ["fabName"]);
        params = Object.assign({type: 1}, params)
        exportExcel(params, '/erp/exportCPInventoryMain', "成品库存-汇总")
      })
    },
    reportDetail() {
      this.$tip.cofirm("您确定需要导出报表吗？").then(() => {
        let params = queryParmsV1(this.form, ["custCode"], this.page, ["fabName"]);
        params = Object.assign({type: 2}, params)
        exportExcel(params, '/erp/exportCPInventoryMain', "成品库存-明细")
      });
    }
  }
}
</script>

<style scoped>
.mainSreen {
  height: calc(100vh - 120px);
}

.formStyle {
  margin-left: 10px;
  margin-right: 10px;
}

.crudStyle {
  margin-top: 10px;
}
</style>
