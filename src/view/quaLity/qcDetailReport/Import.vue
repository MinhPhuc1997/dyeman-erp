<template>
  <view-container title="生成下栏入库单">
    <div class="btnList">
      <el-button type="success" @click="add" :disabled="!crud.length">{{ $t("public.save") }}</el-button>
      <el-button type="primary" @click="query">{{ $t("public.query") }}</el-button>
      <el-button type="warning" @click="exit">{{ $t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form">
        <template slot="vatNo" slot-scope="scope">
          <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                     :remote-method="remoteMethod" :loading="vatLoading">
            <el-option v-for="item in options" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </div>
    <div class="crudBox" style="margin-top: 10px">
      <avue-crud ref="crud"
                 :option="crudOp"
                 :data="crud"
                 :page.sync="page"
                 @on-load="query"
                 v-loading="loading"
      />
    </div>
  </view-container>
</template>

<script>
import {axiosGet, axiosPost, axiosPostEx, axiosPostV1, axiosPutEx} from "../../im/Wk/cc/actionCloth/api";
import {queryParms} from "../../im/Wk/cc/actionCloth/process";
import {bottomColumnCrudOp, newImpForm} from "./data";

export default {
  name: "Import",
  props:{
    state:Object,
    edit:Boolean,
  },
  data() {
    return {
      url: "/api/proProductFlatCard",
      formOp: newImpForm(this),
      form: {},
      crudOp: bottomColumnCrudOp(this),
      crud: [],
      page: {
        pageSize: 500,
        currentPage: 1,
        pageSizes:[500,1000],
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      currentRow: {},
      isAdd: false,
      options: []
    }
  },
  methods: {
    async query() {
      if(this.form.vatNo==null){
        return;
      }
      this.loading = true;
      let obj = {}
      if (this.form.printDate!=null &&this.form.printDate.length > 0) {
        obj = {
          printDate_begin: this.form.printDate[0] + " 00:00:00",
          printDate_end: this.form.printDate[1] + " 23:59:59"
        }
      }
      let res = await axiosGet(this.url + "/pageEx", Object.assign(queryParms(this.form, ["vatNo"], this.page), obj,))
      this.crud = res.data.records;
      this.page.total = res.data.total
      this.page.currentPage = res.data.current
      // if(!this.edit){
      //   this.crud=this.crud.filter((e)=>e.checkoutFk==null||e.checkoutFk=="")
      // }
      try {
        if (this.crud.length > 0) {
          this.crud.sort((a, b) => {
            return a.vatNo > b.vatNo ? 1 : -1
          })
          this.crud.map((e, i) => {
            e.index = i + 1
          })
        }
      } catch (e) {
        console.error("Lỗi sắp xếp", e)
      }
      setTimeout(() => {
        this.loading = false;
      }, 300)
    },
    async remoteMethod(val) {
      this.options = [];
      let res = await axiosGet("/api/proBleadyeRunJob/page", {vatNo: "%" + val, delFlag: 0,dyeMatter:2})
      res.data.records.map((e) => {
        this.options.push({
          vatNo: e.vatNo
        })
      })
    },
    async add() {
      this.state.flatCards = this.crud
      this.state.prodType = 2
      this.state.vatNo = this.form.vatNo;
      delete this.state.checkoutDate
      delete this.state.createTime
      for (let i = 0; i < this.state.flatCards.length; i++) {
        delete this.state.flatCards[i].printDate
        delete this.state.flatCards[i].createTime
      }
      let res =  (this.edit)?await axiosPutEx("/api/qcCheckoutFabric/flat", JSON.stringify(this.state)): await axiosPostEx("/api/qcCheckoutFabric/flat", JSON.stringify(this.state))
      if (res.data.code == 200) {
        this.$tip.success(res.data.msg);
      } else {
        this.$tip.warning(res.data.msg);
      }
    },
    exit() {
      this.$emit("exit")
    },
    rowClick(val) {
      this.currentRow = val
    },
    init(){
      if(this.edit){
        this.form.vatNo=this.state.vatNo;
        setTimeout(()=>{
          this.form.vatNo=this.state.vatNo;
        },300)
      }
    }
  },mounted() {
    this.init();
  }
}
</script>

