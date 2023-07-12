<template>
  <el-tabs type="border-card">
    <el-tab-pane label="选择成品布 - Vui lòng chọn vải xuất kho">

      <div class="btnBox" style="margin: 10px">
        <el-button type="success" @click="save"> 选择-Đồng ý</el-button>
        <el-button type="primary" @click="query"> 查询-Tìm kiếm</el-button>
        <el-button type="warning" @click="exit"> 取消-Thoát</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox" style="margin-top: 10px">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          @selection-change="selection"
          v-loading="loading"/>
      </div>

    </el-tab-pane>
    <el-tab-pane label="成品布出入记录-Lịch sử nhập xuất kho">
      <div class="btnBox" style="margin: 10px">
        <el-button type="primary" @click="query1"> 查询-Tìm kiếm</el-button>
        <el-button type="warning" @click="exit"> 取消-Thoát</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp1" v-model="form1"></avue-form>
      </div>
      <div class="crudBox" style="margin-top: 10px">
        <avue-crud
          ref="crud"
          :option="crudOp1"
          :data="crud1"
          :page.sync="page1"
          @selection-change="selection"
          v-loading="loading1"/>
      </div>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {mainCrudSelect, mainCrudSelect1, mainFormSelect, mainFormSelect1} from "./data";
import {queryParms} from "../../im/Wk/cc/actionCloth/process";
import {API, axiosGet} from "../../im/Wk/cc/actionCloth/api";

export default {
  name: "select",
  data() {
    return {
      crudOp: mainCrudSelect(this),
      crud: [],
      crudOp1: mainCrudSelect1(this),
      crud1: [],
      formOp: mainFormSelect(this),
      form: {},
      formOp1: mainFormSelect1(this),
      form1: {},
      loading: false,
      loading1:false,
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      page1: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      choice: []
    }
  }, methods: {
    query() {
      let params = queryParms(this.form, ["pidNo", "vatNo2"], this.page);
      let api = "/api/whseFinishedFabricShot/deliveryNote"
      axiosGet(api, Object.assign(params, {fabricState: 7})).then((res) => {
        this.page.total = res.data.total;
        this.page.currentPage = res.data.current;
        this.crud = res.data.records;
        this.crud.map((e, i) => {
          e.netWeightLbs2 = (Number(e.netWeight2) * 2.2046).toFixed(2)
          e.unit = "KG"
        });
        this.crud.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1
        })
        this.crud.map((e, i) => e.index = i + 1)
      })
    },
    query1() {
      this.loading1=true;
      axiosGet(API.whseFabricChangeActionView, queryParms(this.form1, [], this.page1)).then((res) => {
        this.crud1 = res.data.records
        this.page1.total = res.data.total
        this.page1.total = res.data.current
        this.page1.pageSize = res.data.size

        this.crud1.sort((a,b)=>{return a.createTime>b.createTime ?1:-1})
        this.crud1.map((e,i)=>{e.index=i+1})
        this.loading1=false;
      })
    },
    selection(val) {
      this.choice = val;
    },
    save() {
      if (this.choice.length == 0) {
        this.$tip.warning("Bạn chưa chọn vải,你还没选择成品布")
        return;
      }
      let arr = [];
      this.choice.map((e, i) => {
        arr.push({
          cardId: e.cardId,
          poNo: e.poNo,
          vatNo: e.vatNo2,
          pidNo: e.pidNo,
          productNo: e.productNo2,
          netWeight: e.netWeight2,
          netWeightLbs: e.netWeightLbs2,
          grossWeight: e.grossWeight2,
          yardLength: e.yardLength,
          custName: e.custName,
          actualGramWeight: e.actualGramWeight,
          actualSideBreadth: e.actualSideBreadth,
          weightUnit:"公斤/Kg"
        })
      })
      this.$emit("choiceData", arr)
    },
    exit() {
      this.$emit("close")
    },
  },
  mounted() {
    this.query();
  }
}
</script>

<style scoped>

</style>
