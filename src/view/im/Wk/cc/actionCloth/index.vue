<template>
  <div id="mainView">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="tab1" label="成品出入仓-Nhập xuất kho" v-hasPerm="['whse:productAction:tab1']">
        <Main/>
      </el-tab-pane>
      <el-tab-pane name="tab2" label="成品出入库查询-Tra cứu" v-hasPerm="['whse:productAction:tab2']" lazy>
        <IndexQueryView/>
      </el-tab-pane>
      <el-tab-pane name="tab3" label="库存查询-Tồn kho" v-hasPerm="['whse:productAction:tab3']" lazy>
        <Inventory/>
      </el-tab-pane>
      <el-tab-pane name="tab4" label="库存-Tổng trọng lượng còn lại" v-hasPerm="['whse:productAction:tab4']" lazy>
        <Total/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import Weave from "./action/newAction";
import Main from "./action/Main"
import IndexQueryView from "./query/IndexQueryView";
import Inventory from "./Inventory/index.vue"
import Total from "./total/Total.vue"

export default {
  name: "index",
  components: {
    IndexQueryView,
    Inventory,
    Weave,
    Main,
    Total
  },
  data() {
    return {
      tabs: "tab1"
    }
  }
}
</script>

<style scoped>

</style>
