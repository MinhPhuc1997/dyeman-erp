<template>
  <div id="cloth_note_query">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane label="入库查询-Nhập kho" name="tabs1" v-hasPerm="['whse:cloth_query:tab1']">
        <cloth-note-input  />
      </el-tab-pane>
      <el-tab-pane label="出库查询-Xuất kho" name="tabs2" v-hasPerm="['whse:cloth_query:tab2']" lazy>
        <cloth-note-export/>
      </el-tab-pane>
      <el-tab-pane label="库存查询-Tồn kho" name="tabs3" v-hasPerm="['whse:cloth_query:tab3']" lazy>
        <cloth-note-in-stock/>
      </el-tab-pane>
      <el-tab-pane label="胚布历史-Lịch sử" name="tabs4" v-hasPerm="['whse:cloth_query:tab4']" lazy>
        <cloth-note-history/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import history from "./history";
import outputGoods from "./outputGoods";
import inStock from "./inStock";
import inputGoods from "./inputGoods";

export default {
  name: "greyClothVeh",
  components: {
    "cloth-note-history": history,
    "cloth-note-export": outputGoods,
    "cloth-note-input": inputGoods,
    "cloth-note-in-stock": inStock
  },
  data() {
    return {
      tabs: 'tabs1'
    };
  },
  methods: {},
};
</script>
