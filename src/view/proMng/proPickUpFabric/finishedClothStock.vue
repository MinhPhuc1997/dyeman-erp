<template>
  <div class='finishedClothStock'>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false">
      <view-container title="选择库存成品布" :element-loading-text="$t('public.loading')" v-loading="wLoading">

        <div class="btnList">
          <el-button type="success" @click="handleCheckData">{{ this.$t("public.determine") }}</el-button>
          <el-button type="warning" @click="dialogVisible = false">{{ this.$t("public.close") }}</el-button>
        </div>

        <!-- <avue-form ref="form" :option="formOp" v-model="form"> </avue-form> -->

        <div class="crudBox" style="margin-top: 5px">
          <avue-crud ref="notecrud" :option="crudOp" :data="crud" @selection-change="selectionChange"></avue-crud>
        </div>

      </view-container>
    </el-dialog>
  </div>
</template>

<script>
import {stockFinisedClothForm, finishedCrud} from "./data.js";
import {fetchStockFinishedClothData} from "./api.js";

export default {
  data() {
    return {
      wLoading: false,
      dialogVisible: false,
      form: {},
      formOp: stockFinisedClothForm(this),
      crudOp: finishedCrud(this),
      crud: [],
      checkData: []
    }
  },
  methods: {
    initData(vatNo) {
      if (!vatNo) {
        this.$tip.warning("请先选择缸号!");
        this.dialogVisible = false;
        return;
      }
      this.dialogVisible = true;
      this.wLoading = true;
      fetchStockFinishedClothData({vatNo: vatNo, fabricState: 7, rows: 200}).then(res => {

        this.crud = res.data.sort((a, b) => a.pidNo - b.pidNo);
        this.crud.map((e, i) => {
          e.pidNo = Number(e.productNo.slice(-3))
          e.netWeightLbs = Number(e.netWeight * 2.2046).toFixed(1)
          e.storeSiteCode = e.storeLocal
          e.storeLoadCode = e.storeLoad
        })
      }).finally(_ => {
        this.wLoading = false;
        this.$refs.notecrud.doLayout();
      })
    },
    handleCheckData() {
      this.$emit("selectionChange", this.checkData);
      this.dialogVisible = false;
    },
    selectionChange(list) {
      this.checkData = list;
    }
  },
  created() {
    this.crudOp.height = "calc(100vh - 160px)";
    this.crudOp.selection = true;
    this.crudOp.delBtn = false;
    this.crudOp.menu = false;
  },
}
</script>

<style scoped>
.el-tag--mini {
  height: 30px !important;
}
</style>
