<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-06 13:33:08
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container title="打印布飞記錄">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{
        this.$t("public.query")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"></avue-crud>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get } from "./api";
export default {
  name: "",
  components: {
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200, 500],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      let params = {
        poNo: "!^%" + (this.form.poNo || ""),
        noteCode: "!^%" + (this.form.noteCode || ""),
        customerName: this.form.customerName,
        eachNumber: this.form.eachNumber
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          // 加上过滤厂
          filterFactory: true
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
  },
  created() { },
  mounted() {

  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#name {
}
</style>