<template>
  <div>
    <div class="btnList" style="margin-left: 12px">
      <el-button type="primary" @click="query">{{ $t('public.query') }}</el-button>
      <el-button type="warning">{{ $t('public.close') }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <el-row>
      <el-col :span="6">
        <div class="crudBox" style="margin-top: -17px">
          <avue-crud ref="cruds" :option="crudOp" :data="crud"  v-loading="loading" @on-load="query"/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="btnList" style="margin-top: 17px">
          <el-button type="success">{{ $t('public.query') }}</el-button>
          <el-button type="primary">{{ $t('public.query') }}</el-button>
          <el-button type="warning">{{ $t('public.close') }}</el-button>
        </div>
        <div class="crudBox" style="margin-top: -27px">
          <avue-crud ref="crud"
                     :option="crudOp"
                     :data="crud"
                     v-loading="loading"
                     @on-load="query"

          />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {dataCrud, dataCrudDtl, dataForm} from "./data";
import {axiosGet} from "../actionCloth/api";

export default {
  name: "custom-data",
  data() {
    return {
      formOp:dataForm(this),
      form:{},
      crudOp:dataCrud(this),
      crud:[],
      crudOpDtl:dataCrudDtl(this),
      crudDtl:[],
      loading:false,
    }
  },
  methods:{
    async query() {
      let res = await axiosGet("/api/getcodeValue", {classCode:"cc_pbck"});
    }
  }
}
</script>

<style scoped>

</style>
