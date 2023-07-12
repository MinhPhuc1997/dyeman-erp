<template>
  <view-container title="选择胚布出库">
    <div class="btnList" style="margin-left: 12px">
      <el-button type="success" @click="choice">{{ $t('public.choose') }}</el-button>
      <el-button type="primary" @click="query">{{ $t('public.query') }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud ref="crud" :option="crudOp" :data="crud" v-loading="loading" @on-load="query"
                 @selection-change="selection"/>
    </div>
  </view-container>
</template>

<script>
import {selectCrud, selectForm} from "./data";
import {axiosGet} from "../actionCloth/api";
import {queryParmsV2} from "../actionCloth/process";

export default {
  name: "select",
  props:{
    detail:String,
  },
  data() {
    return {
      formOp: selectForm(this),
      form: {},
      crud: [],
      crudOp: selectCrud(this),
      loading: false,
      choices:[]
    }
  },
  methods: {
    async query() {
      this.loading = true;
      let res = await axiosGet("/api/proClothNote", {
        proName: this.detail,
        clothState: 2, ...queryParmsV2(this.form)
      })
      this.crud = res.data
      this.crud.sort((a,b)=>{
        return a.noteCode>b.noteCode?1:11;
      })
      this.crud.map((e, i) => e.index = i + 1)
      setTimeout(() => {
        this.loading = false;
      }, 500)
    },
    selection(val) {
      this.choices=val;
    },
    choice(){
      this.$emit("selected",this.choices)
    }
  },mounted() {
    this.query();
  }
}
</script>

<style scoped>

</style>
