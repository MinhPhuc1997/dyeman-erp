<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-01 16:42:13
 * @FilePath: \iot.vue\src\view\quaLity\qaProductionCapacity\index.vue
 * @Description:
-->

<template>
  <div class="qcCheckPlan">
    <view-container :title="$t('checkPlan.title4')">
      <el-row class="btnList">
        <el-button type="primary" @click="query" v-hasPerm="['quality:qaProductionCapacity:list']"> {{this.$t("public.query")}} </el-button>
        <el-dropdown size="small" split-button type="primary" style="margin-left: 10px" @command="getLatestData" @click="getLatestData(new Date().getMonth() + 1)" v-hasPerm="['quality:qaProductionCapacity:update']">
          {{$t("checkPlan.btn2")}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in 12" :key="item" :command="item">{{item + ' 月'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="small" split-button type="primary" style="margin-left: 10px" @command="handleReport" @click="handleReport(new Date().getMonth() + 1)" v-hasPerm="['quality:qaProductionCapacity:export']">
          {{$t("public.report")}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in 12" :key="item" :command="item">{{item + ' 月'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
          @on-load="query"
          @row-click="rowClick"
        >
        </avue-crud>
      </el-row>
    </view-container>
  </div>
</template>

<script>
import { fetchQaDayOutputByPage, upadQareport } from './api.js'
import { mainForm, mainCrud } from "./data.js";
export default {
  components: {
  },
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
      curIdx: null,
      wloading: false,
      loading: false,
      outId: {},
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    query() {
      this.loading = true;
      let params = {
        vatNo: "%" + (this.form.vatNo || ''),
        dataSortRules: 'dayId|desc',
        dayId: "%" + (this.form.dayId || ''),
      }
      fetchQaDayOutputByPage(params).then(async res => {
        let { records, total } = res.data;
        this.crud = records;
        this.page.total = total;
        this.$refs.crud.setCurrentRow();
        this.crud.forEach((item) =>{
          item.week = item.dayId
        })
        await this.$nextTick();
        this.$refs["crud"].doLayout();
        this.curIdx = null;
      }).finally(() =>{
        setTimeout(() => {
          this.loading = false;
        }, 200);
      })
    },
    async getLatestData(command){
      let dayId = new Date().getFullYear() + '' + (command < 10 ? '0' + command : command);
      let res =  await upadQareport({dayId});
      if (res.data.code == 200) {
        this.$tip.success(this.$t('bottomcol.success3'));
        this.query()
      }else{
        this.$tip.error(this.$t("bottomcol.error1") + res.data.msg);
      }
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
    },
    handleReport(command){
      let dayId = new Date().getFullYear() + '' + (command < 10 ? '0' + command : command);
      let name = encodeURI(
      "http:" +
        process.env.API_HOST.split(":")[1] +
        ":91/api/qaDayOutput/qareport?dayId=" + dayId
      );
      window.open(name);
      this.wloading = false;
      }
  },
};
</script>
<style lang="stylus" scoped>
.qcCheckPlan {
}
</style>
