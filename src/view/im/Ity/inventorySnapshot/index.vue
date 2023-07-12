<!--
 * @Description:
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:57:57
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-04-04 10:03:07
-->
<template>
  <div id="ityInventoryList">
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="inventory" label="盘点清单">
          <stock-inventory ref="stockInventoryRef"></stock-inventory>
        </el-tab-pane>
        <!-- <el-tab-pane name="inventoryLog" label="库存快照" lazy>
          <stock-snapshot-log ref="stock-snapshot-logRef"></stock-snapshot-log>
        </el-tab-pane> -->
        <el-tab-pane name="monthEndBalance" label="月末结存" lazy>
          <month-end-balance ref="monthEndBalanceRef" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import StockInventory from "./stockInventory.vue"
import MonthEndBalance from "./monthEndBalance.vue"
// import StockSnapshotLog from "./stockSnapshotLog.vue"
export default {
  name: "",
  components: {
    "stock-inventory": StockInventory,
    // "stock-snapshot-log": StockSnapshotLog,
    "month-end-balance": MonthEndBalance
  },
  data() {
    return {
     tabName: "inventory"
    };
  },
  computed:{

  },
  created() {},
  updated() {

  },
  methods: {

  },

};
</script>
<style lang='stylus'>

</style>
