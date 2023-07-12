<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-27 11:24:55
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\index.vue
 * @Description:
-->

<template>
  <div class="viewBleadyeWater">
    <view-container title="染单物料统计">
      <el-row class="btnList">
        <el-button type="primary" @click="handleReport"> {{ $t("public.report") }} </el-button>
        <el-button type="success" @click="handleQuery"> {{ $t("public.query") }} </el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>

      <el-row>
        <el-col :span="13">
          <view-container title="染单信息">
            <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
              :element-loading-text="$t('public.loading')" @on-load="handleQuery" @current-row-change="cellClick"
              style="margin-top: 2px ;">
            </avue-crud>
          </view-container>
        </el-col>
        <el-col :span="11">
          <view-container title="物料明细">
            <avue-crud ref="detailCrud" :option="detailCrudOp" :data="detailList" style="margin-top: 2px ;">
            </avue-crud>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>

<script>
import { fetchProBleadyeJobVbwByPage } from './api.js'
import { mainForm, mainCrud, detailCrudOp } from "./data.js";
export default {
  props: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detailList: [],
      detailCrudOp: detailCrudOp(this),
      tabs: "total",
    };
  },
  watch: {},
  computed: {
  },
  created() {
  },
  mounted() { },
  methods: {
    handleQuery() {
      this.loading = true;
      this.detailList = [];
      this.crud = [];
      let params = {
        vatNo: "!^%" + (this.form.vatNo || ''),
        weaveJobCode: "%" + (this.form.weaveJobCode || ''),
        rows: this.page.pageSize,
        start: this.page.currentPage
      }
      fetchProBleadyeJobVbwByPage(params).then(async res => {
        let { records, total } = res.data;
        this.crud = records;
        this.page.total = total;
      }).finally(() => {
        this.$refs.crud.setCurrentRow(this.crud[0]);
        this.loading = false;
      })
    },
    handleReport() {
      let reportUrl = encodeURI(process.env.API_HOST + "/api/proBleadyeJob/excelMate?vatNo=%" + this.form.vatNo + "&weaveJobCode=%" + this.form.weaveJobCode + "&bleadyeType=" + this.form.bleadyeType);
      window.open(reportUrl);
    },
    cellClick(val) {
      this.detailList = val.jobTechItems.sort((a, b) => a.mateCode > b.mateCode ? 1 : -1);
    }
  },
};
</script>
<style lang="stylus" scoped>
>>> .el-table__body-wrapper {
  z-index: 0 !important;
}
</style>
