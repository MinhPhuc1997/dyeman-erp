<template>
  <view-container>
    <div class="btnList">
      <el-button type="success">新增</el-button>
      <el-button type="warning">修改</el-button>
      <el-button type="danger">删除</el-button>
      <el-button type="success">IT 审批</el-button>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                 @row-click="rowClick"/>
    </div>
  </view-container>
</template>

<script>
import {mainCrud, mainForm} from "./data";

export default {
  name: "index",
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      page: {},
      crud: [],
      loading: false,
    }
  }, methods: {
    query() {

    },
    rowClick() {

    }
  }
}
</script>

<style scoped>

</style>
