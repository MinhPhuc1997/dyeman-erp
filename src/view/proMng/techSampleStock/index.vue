<template>
  <div>
    <div class="btnList">
      <el-button type="success" @click="add" v-hasPerm="['proMng:techSampleStock:add']">{{ $t("public.add") }}</el-button>
      <el-button type="warning" @click="edit" v-hasPerm="['proMng:techSampleStock:edit']">{{ $t("public.update") }}</el-button>
      <el-button type="danger" @click="del" v-hasPerm="['proMng:techSampleStock:del']">{{ $t("public.del") }}</el-button>
      <el-button type="primary" @click="query" v-hasPerm="['proMng:techSampleStock:query']">{{ $t("public.query") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox" style="margin-top: 10px">
      <avue-crud ref="crud"
                 :option="crudOp"
                 :data="crud"
                 :page.sync="page"
                 v-loading="loading"
                 @on-load="query"
                 @row-click="rowClick"
                 @row-dblclick="rowDbClick"/>
    </div>
    <el-dialog id="item" :visible.sync="dialogVisible" width="70%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
      <item ref="tem" :detail="currentRow" :isAdd="isAdd" @refresh="query" @close="dialogVisible = false"
            v-if="dialogVisible" @exit="dialogVisible=false" @refe="query"></item>
    </el-dialog>
  </div>
</template>

<script>
import { queryParmsNew} from "../../im/Wk/cc/actionCloth/process";
import {axiosDel, axiosGet} from "../../im/Wk/cc/actionCloth/api";
import item from "./item.vue";
import {crudOp, mainForm} from "./data";

export default {
  name: "index",
  components: {
    item
  },
  data() {
    return {
      url: "/api/techSampleStock",
      formOp: mainForm(this),
      form: {},
      crudOp: crudOp(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      currentRow: {},
      isAdd: false,
    }
  },
  methods: {
    async query() {
      this.loading = true;
      let res = await axiosGet(this.url + "/page", queryParmsNew(this.form, ["a3", "a4", "a5"], "createTime", this.page))
      this.crud = res.data.records;
      this.page.total = res.data.total
      this.page.currentPage = res.data.current
      try {
        if (this.crud.length > 0) {

          this.crud.sort((a, b) => {
            return a.vatNo > b.vatNo ? 1 : -1
          })
          this.crud.map((e, i) => {
            e.index = i + 1
          })
          this.$refs.crud.setCurrentRow(this.crud[0])
          this.currentRow=this.crud[0]
        }
      } catch (e) {
        console.error("Lỗi sắp xếp", e)
      }
      setTimeout(() => {
        this.loading = false;
      }, 300)
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    edit() {
      this.isAdd = false;
      this.dialogVisible = true;

    },
    async del() {
      if(this.crud.length==0){
        return
      }
      this.$tip.cofirm("Bạn có chắc muốn xóa không?您确定需要删除吗？").then(async () => {
        let res = await axiosDel(this.url,{samStockId:this.currentRow.samStockId})
        try {
          if (res.data.code != 200) {
            this.$tip.danger(res.data.msg);
          } else {
            this.$tip.success(res.data.msg);
            this.query();
          }
        } catch (e) {
          console.error("Lỗi xóa dữ liệu", e)
        }
      }).catch()
    },
    rowClick(val) {
      this.currentRow = val
    },
    rowDbClick(val) {
      this.currentRow = val
      this.edit();
    },
  },
  mounted() {
    this.query()
  }
}
</script>
