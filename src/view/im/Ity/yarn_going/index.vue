<template>
  <div id="mainView">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="tab1" label="外发纱线出库-Xuất kho chỉ gia công" v-hasPerm="['whse:yarn_outgoing:screen']">
        <Main/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Main from "./Main"

export default {
  name: "index.vue",
  components: {
    Main,
  },
  data(){
    return{
      tabs:"tab1"
    }
  }
}
</script>

<style scoped>

</style>
