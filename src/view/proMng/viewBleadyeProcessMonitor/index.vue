<template>
  <div>
    <div class="btnList">
      <el-button type="primary" @click="query">{{ $t("public.query") }}</el-button>
      <el-button type="success" @click="sync" :disabled="!crud.length">更新</el-button>
      <el-button type="primary" @click="excel" :disabled="!crud.length">导出</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox" style="margin-top: 7px">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                 @row-click="rowClick"/>
    </div>
  </div>
</template>

<script>
import {mainForm, mainCrud} from "./data"
import {axiosGet, axiosPut, axiosPutEx} from "../../im/Wk/cc/actionCloth/api";
import {queryParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "index",
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      currentRow: {},
      loading: false,
      dialogVisible: false,
      isAdd: true,
    }
  },
  methods: {
    excel(){
      window.open( "http://192.168.5.1:91/api/viewBleadyeProcessMonitor/excel?"+ new URLSearchParams(queryParms(this.form, [], null)) )
    },
    async query() {
      this.loading = true;
      let result = await axiosGet("/api/viewBleadyeProcessMonitor/page", queryParms(this.form, [], this.page))
      this.crud = result.data.records;
      this.crud.map((e, i) => e.index = i + 1)
      this.page.total = result.data.total
      this.page.currentPage = result.data.current
      this.$refs.crud.setCurrentRow(this.crud[0]);
      this.loading = false;
    },
    async sync() {
      let result = await axiosPut("/api/proDtpWorkAnalytic/vat", {vatNo: this.currentRow.vatNo})
      if (result.data.code == 200) {
        this.query();
        this.$tip.success(result.data.msg)
      } else {
        this.$tip.error(result.data.msg)
      }
    },
    rowClick(val) {
      this.currentRow = val;
    }
  },
}
</script>

<style scoped>

</style>
