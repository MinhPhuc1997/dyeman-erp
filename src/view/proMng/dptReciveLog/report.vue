<template>
  <view-container title="产量统计">
    <avue-crud style="margin: 5px" :option="crudOp" :data="crud"/>
  </view-container>
</template>

<script>
  import {reportCrud, reportForm} from "./data";
  import {API, axiosGet} from "../../im/Wk/cc/actionCloth/api";

  export default {
    name: "report",
    props: {
      vatNo: String
    },
    data() {
      return {
        crud: [],
        crudOp: reportCrud(this),
      }
    }, methods: {
      queryData() {
        axiosGet(API.outputStat, {vatNo: this.vatNo}).then(res => {
          this.crud = res.data;
          this.crud.map((e, i) => {
            e.index = i + 1;
            e.dayId = (e.dayId).toString().substring(0, 4) + "-" + (e.dayId).toString().substring(4, 6) + "-" + (e.dayId).toString().substring(6, 8)
          })
        })
      },
    }, mounted() {
      this.queryData()
    }
  }
</script>

<style scoped>

</style>
