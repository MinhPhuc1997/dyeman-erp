<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-13 16:24:51
 * @Description:
-->
<template>
  <div id="runJob-container">
    <el-tabs v-model="tabName" type="border-card">
      <el-tab-pane name="runjob" :label="$t('revolve.title1')">
        <run-job-list ref="runJobListRef" @refresh-unCreate="handleRefreshUnCreate" />
      </el-tab-pane>
      <!-- <el-tab-pane name="autoSplit" lazy>
        <div slot="label">
          <span>{{ $t("revolve.unConfrimBtn")}}</span>
          <span class="tab-value" v-if="unConfrimCount">{{ unConfrimCount }}</span>
        </div>
        <run-job-list ref="autoSplitList" :isAutoSplit="true" @refresh="handleRefreshMain" @setUnConfirmCount="val => unConfrimCount = val" />
      </el-tab-pane> -->
      <el-tab-pane name="unCreate" :label="$t('revolve.title10')" lazy>
        <un-create-list  ref="unCreateListRef" @select-create="handleSelectCreate" />
      </el-tab-pane>
      <el-tab-pane name="unSplit" :label="$t('revolve.title11')" lazy>
        <un-split-list  ref="unSplitListRef" @select-create="handleSelectSplitCreate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import RunJobList from "./runJobList.vue"
import UnCreateList from "./unCreateList.vue"
import UnSplitList from "./unSplitList.vue"
export default {
  name: "runJob",
  components: {
    RunJobList,
    "un-create-list": UnCreateList,
    "un-split-list": UnSplitList
  },
  data() {
    return {
        tabName: "runjob",
        unConfrimCount: 0,
    };
  },
  watch: {},
  methods: {
    // 刷新主列表
    handleRefreshMain(){
      this.$refs.runJobListRef.handleQuery();
    },
    handleRefreshUnCreate(){
      this.$refs.unCreateListRef.handleQuery();
      this.$refs.unSplitListRef.handleQuery();
    },
    handleSelectCreate(row){
      this.$refs.runJobListRef.dataExtract(row)
    },
    handleSelectSplitCreate(row){
      this.$refs.runJobListRef.initSplitData(row)
    }
  },
  created() {},
  mounted() {
    // this.handleQuery();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus' scoped>
  .tab-value{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    text-align: center;
    line-height: 15px;
    background: red;
    color: #fff;
    font-size: 12px;
    position relative;
    top: -8px;
  }
</style>
