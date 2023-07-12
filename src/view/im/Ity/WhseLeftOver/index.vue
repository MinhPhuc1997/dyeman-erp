<template>
  <div>
    <div class="btnList">
      <el-button type="primary" @click="query">{{ $t("public.query") }}</el-button>
      <div style="float: right">
        <el-switch
          style="display: block"
          v-model="language"
          active-color="#13ce66"
          active-text="Tiếng việt"
          inactive-text="中文"
          @change="changeLan"
        >
        </el-switch>
      </div>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox" style="margin-top: 7px">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                 @row-dblclick="DBLClick" @current-row-change="cellClick">
        <template slot-scope="{ row }" slot="workProgress">
          <el-progress :percentage="Number(row.workProgress.toFixed(0))"
                       :status="(row.workProgress===100)?'success':'exception'"/>
        </template>
      </avue-crud>
    </div>
    <el-dialog id="item" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
      <item ref="tem" :detail="currentRow" :isAdd="isAdd" @refresh="query" @close="dialogVisible = false"
            v-if="dialogVisible" @exit="dialogVisible=false" @refe="query"></item>
    </el-dialog>
  </div>
</template>

<script>
import item from "./item";
import {mainForm, mainCrud} from "./data"
import {axiosGet} from "../../Wk/cc/actionCloth/api";
import {queryParms} from "../../Wk/cc/actionCloth/process";

export default {
  name: "index.js",
  components: {
    item,
  },
  data() {
    return {
      language:0,
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      currentRow: {},
      loading: false,
      dialogVisible: false,
      isAdd: true,
    }
  }, methods: {
    async query() {
      this.loading = true;
      let result = await axiosGet("/api/proLeftOverOrder/page/ex", queryParms(this.form, [""], this.page))
      if (result.data.total == 0) {
        this.loading = false;
        this.$tip.warning("Không tìm thấy dữ liệu!")
        return;
      }
      this.crud = result.data.records;
      this.crud.sort((a, b) => {
        return a.orderCode > b.orderCode ? -1 : 1
      })
      this.crud.map((e, i) => {
        e.index = i + 1;
      })
      this.page.total = result.data.total
      this.page.currentPage = result.data.current
      this.$refs.crud.setCurrentRow(this.crud[0]);
      this.currentRow = this.crud[0]
      this.loading = false;
    },
    DBLClick(val) {
      this.isAdd = false
      this.currentRow = val;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.currentRow = val
    },
    changeLan(val){
     // this.$i18n.locale= (val===true)?"3":"1"
    }

  }
}
</script>
