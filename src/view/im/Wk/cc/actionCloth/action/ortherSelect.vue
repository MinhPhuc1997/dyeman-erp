<template>
  <view-container title="选择成品布">
    <div class="btnList">
      <el-button type="success" :disabled="!selectionList.length" @click="save">{{ this.$t("public.choose") }}</el-button>
      <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      <el-button type="warning" @click="exit">{{ this.$t("public.close") }}</el-button>
    </div>
    <el-row class="formBox">
      <avue-form ref="form" :option="queryForm" v-model="form">
        <template slot="vatNo" slot-scope="scope">
          <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                     placeholder="输入缸号" :remote-method="remoteMethodVat" :loading="vatLoading" @change="query">
            <el-option v-for="item in optionsVat" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
            </el-option>
          </el-select>
        </template>
        <template slot="storeLoad" slot-scope="scope">
          <el-select v-model="form.storeLoad" filterable remote reserve-keyword clearable default-first-option
                     placeholder="输入缸号" :remote-method="remoteMethodLoad" :loading="vatLoading">
            <el-option v-for="item in optionsLoad" :key="item.storeLoad" :label="item.storeLoad" :value="item.storeLoad">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </el-row>
    <el-row class="crudBox">
      <avue-crud
        ref="crud"
        :option="crudOption"
        :data="crud"
        :page.sync="page"
        v-loading="loading"
        @on-load="query"
        @selection-change="selectionChange"/>
    </el-row>
  </view-container>
</template>

<script>
import {_ortherCrud, _ortherForm} from "../data";
import {checkResultPage} from "../process";
import {API, axiosGet} from "../api";

export default {
  name: "ortherSelect",
  data() {
    return {
      queryForm: _ortherForm(this),
      form: {},
      crudOption: _ortherCrud(this),
      crud: [],
      vatLoading: false,
      optionsVat: [],
      optionsLoad:[],
      loading: false,
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      },
      selectionList: [],
    }
  },
  methods: {
    query() {
      if(!this.form.productNo&&!this.form.storeLoad&&!this.form.vatNo){
        return;
      }
      let params = {
        productNo: this.form.productNo ? "%" + this.form.productNo : "%",
        storeLoad: this.form.storeLoad ? this.form.storeLoad : "%",
        vatNo: this.form.vatNo ? this.form.vatNo : "%",
        fabricState:7,
        rows:this.page.pageSize,
        start:this.page.currentPage
      }
      axiosGet(API.whseFinishedFabricShot, params).then((res) => {
        let data = checkResultPage(res);
        if (!data.success) {
          this.$tip.warning(data.msg);
        }
        this.crud=data.records;
        this.crud.map((e,i)=>{
          e.pidNo=Number(e.productNo.slice(-3))
          e.netWeightLbs=(Number(e.netWeight)*2.2046).toFixed(2)
        })
        this.page.total=data.total;
        this.page.currentPage=res.data.current;
        this.crud.sort((a,b)=>{ return a.productNo<b.productNo?-1:1})
        this.crud.map((e,i)=>e.index=i+1);
      })
    },
    save(){
      this.$emit("save",this.selectionList)
    },
    selectionChange(val) {
      this.selectionList = val;
    },
    async remoteMethodLoad(val){
      this.vatLoading = true;
      let result = await axiosGet(API.whseFinishedFabricShot, {storeLoad: "%" + val,rows:300,start:1});
      let data = checkResultPage(result);
      if (!data.success) {
        this.$tip.warning(data.msg);
      }
      let arr=[];
      data.records.map((e)=>{
        if(arr.findIndex((item)=>item.storeLoad==e.storeLoad)==-1){
          arr.push({
            storeLoad:e.storeLoad
          })
        }
      })
      this.optionsLoad = arr;
      this.vatLoading = false;
    },
    async remoteMethodVat(val) {
      this.vatLoading = true;
      let result = await axiosGet(API.whseFinishedFabricShot, {vatNo: "%" + val,rows:300,start:1});
      let data = checkResultPage(result);
      if (!data.success) {
        this.$tip.warning(data.msg);
      }
      let arr=[];
      data.records.map((e)=>{
        if(arr.findIndex((item)=>item.vatNo===e.vatNo)===-1){
          arr.push({
            vatNo:e.vatNo
          })
        }
      })
      this.optionsVat = arr;
      this.vatLoading = false;
    },
    exit() {
      this.$emit("exit");
    }
  }
}
</script>

<style scoped>

</style>
