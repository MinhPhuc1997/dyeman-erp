<template>
  <view-container>
    <div class="btnList">
      <el-button type="warning" @click="exit">{{ this.$t("public.close") }}</el-button>
    </div>
    <div>
      <el-row class="formBox">
        <avue-form ref="form" :option="queryForm" v-model="form"/>
      </el-row>
      <el-row class="crudBox">
        <view-container title="成品布明细">
          <avue-crud
            ref="crudLeft"
            :option="crudop"
            :data="crud"
            :page.sync="page"
            @on-load="initData"
            v-loading="loading"/>
        </view-container>

      </el-row>
    </div>
  </view-container>
</template>

<script>
import {_onlyviewCrud, _onlyviewForm} from "../data";
import {API, axiosGet} from "../api";

export default {
  name: "onlyView",
  props: {
    data: Object
  },
  data() {
    return {
      queryForm: _onlyviewForm(this),
      form: {
        actionId: undefined
      },
      crudop: _onlyviewCrud(this),
      crud: [],
      loading: false,
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      }
    }
  }, methods: {
    initData() {
      this.loading = true;
      console.log(this.data);
      this.form = this.data; //actionId
      axiosGet(API.whseFinishedFabricLogPage, {
        actionFk: this.form.actionId,
        rows: this.page.pageSize,
        start: this.page.currentPage
      }).then((res) => {
        console.log(res);
        this.crud = res.data.records;
        this.crud.sort((a, b) => {
          return a.productNo < b.productNo ? -1 : 1
        });
        this.crud.map((e, i) => {
          e.index = i + 1,
            e.pidNo = Number(e.productNo.slice(-3))
        });
        this.page.currentPage = res.data.current;
        this.page.total = res.data.total;

      })
      setTimeout(() => {
        this.loading = false;
      }, 300)
    },
    exit() {
      this.$emit("exit")
    }
  }, mounted() {
    this.initData();
  }
}
</script>

<style scoped>

</style>
