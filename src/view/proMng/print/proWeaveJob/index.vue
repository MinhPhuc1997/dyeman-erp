<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-30 09:11:03
 * @Description:
-->
<template>
  <div id="pro-weave-job-container">
    <el-tabs v-model="tabName" type="border-card">
      <el-tab-pane name="print" :label="$t('weaveJob.title1')">
        <weave-job-list ref="weaveJobListRef" v-bind="$props" @refresh-unCreate="handleRefreshUnCreate" />
      </el-tab-pane>
      <el-tab-pane name="unCreate" :label="$t('weaveJob.title2')" lazy>
        <un-create-list ref="unCreateListRef" v-bind="$props" @select-create="handleSelectCreate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import UnCreateList from "./unCreateList.vue"
import WeaveJobList from "./weaveJobList.vue"
export default {
  name: "proWeaveJob",
  props: {
    jobType: String
  },
  components: {
    UnCreateList,
    WeaveJobList
  },
  data() {
    return {
      tabName: "print",
    }
  },
  watch: {
    jobType(n, o) {
      this.$nextTick(() => {
        this.$refs.weaveJobListRef.$refs.form.resetForm();
        this.$refs.weaveJobListRef.query();
        this.$refs.unCreateListRef.handleQuery();
      })
    }
  },
  methods: {
    // 生产织单回调
    handleSelectCreate(rows) {
      this.$refs.weaveJobListRef.dataExtract(rows);
    },
    // 刷新未生成数据
    handleRefreshUnCreate() {
      this.$refs.unCreateListRef.handleQuery();
    },
  }

};
</script>
<style lang='stylus'></style>
