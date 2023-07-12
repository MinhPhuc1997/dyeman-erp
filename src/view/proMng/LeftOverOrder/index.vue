<template>
  <div>
    <div class="btnList">
      <el-button type="success" @click="add">{{ $t("public.add") }}</el-button>
      <el-button type="primary" @click="query">{{ $t("public.query") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox" style="margin-top: 7px">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                 @row-dblclick="DBLClick" @current-row-change="cellClick">
        <template slot-scope="{ row }" slot="workProgress">
          <el-progress :percentage="Number(row.workProgress)"
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
import {API, axiosGet} from "../../im/Wk/cc/actionCloth/api";
import {queryParms, SaveParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "index.js",
  components: {
    item,
  },
  data() {
    return {
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
      this.currentRow=this.crud[0]
      this.loading = false;
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip.cofirm("Bạn chắc chắn muốn xóa? 您确定需要删除吗？").then(() => {
      })
    },
    print() {
      const obj = new URLSearchParams({id: this.currentRow.orderId}).toString();
      window.open(process.env.API_HOST + "/api/proLeftOverOrder/pdf" + '?' + obj)
    },
    DBLClick(val) {
      this.isAdd = false
      this.currentRow = val;
      this.dialogVisible = true;

    },
    cellClick(val) {
      this.currentRow = val
    }
  }
}
</script>
