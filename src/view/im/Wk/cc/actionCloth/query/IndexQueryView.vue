<template>
  <div id="main">
    <div class="btnList">
      <el-button type="primary" @click="query" v-hasPerm="['whse:productAction:list2']">{{ this.$t("public.query") }}</el-button>
    </div>
    <div>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"/>
      </el-row>
      <el-row class="crudBox">
        <view-container title="成品布明细-Danh sách vải thành phẩm">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" @on-load="query" v-loading="loading"/>
        </view-container>
      </el-row>
    </div>
  </div>
</template>

<script>
import {API, axiosGet} from "../api";
import {checkResultPage, queryParms} from "../process";
import {_queryMainCrud, _queryMainForm} from "../data";

export default {
  name: "IndexQueryView",
  data() {
    return{
      formOp: _queryMainForm(this),
      form: {
        vatNo: "",
        creator: "",
        productNo: "",
        storeLoad: "",
        storeLocal: "",
        fabricState: "",
      },
      crudOp: _queryMainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      },
      loading: false
    }
  }, methods: {
    async query() {
      this.loading = true;
      this.crud = [];
      let params = queryParms(this.form, ["fabricState"],this.page)
      let data = await axiosGet(API.whseFinishedFabricShot, params);
      if (!checkResultPage(data).success) {
        this.$tip.warning(checkResultPage(data).msg);
        return this.loading = false;
      }
      this.page.total = data.data.total;
      this.page.currentPage = data.data.current;
      this.crud = data.data.records;
      this.crud.sort((a,b)=>{return a.updateTime<b.updateTime?1:-1})
      this.crud.map((e,i)=>e.index=i+1)
      setTimeout(()=>{
        this.loading = false;
      })
    }
  }
}
</script>

