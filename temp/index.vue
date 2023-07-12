<template>
  <view-container title="%">
    <div class="btnList">
      <el-button type="success" @click="add">{{ $t("public.add") }}</el-button>
      <el-button type="warning" @click="edit">{{ $t("public.update") }}</el-button>
      <el-button type="danger" @click="del">{{ $t("public.del") }}</el-button>
      <el-button type="primary" @click="query">{{ $t("public.query") }}</el-button>
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
                 @row-click="rowClick"/>
    </div>
    <el-dialog id="item"  :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
      <item ref="tem" :detail="currentRow" :isAdd="isAdd" @refresh="query" @close="dialogVisible = false"
            v-if="dialogVisible" @exit="dialogVisible=false" @refe="query"></item>
    </el-dialog>

  </view-container>
</template>

<script>
import {mainForm,mainCrudOp} from "./data"
import item from "./item.vue";
import {queryParmsEx} from "../src/view/im/Wk/cc/actionCloth/process";
export default {
  name: "index",
  components:{
    item
  },
  data() {
    return {
      url: "",
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrudOp(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible:false,
      currentRow:{},
      isAdd:false,
    }
  },
  methods: {
    async query() {
      this.loading = true;
      let res = await axiosGet(this.url, queryParms(this.form, [], this.page))
      this.crud = res.data.records;
      this.page.total=res.data.total
      this.page.currentPage=res.data.current
      try {
        if (this.crud.length > 0) {
         // this.crud.sort((a,b)=>{return a.sn>b.sn?1:-1})
          this.crud.map((e, i) => {e.index = i + 1})
        }
      } catch (e) {
        console.error("Lỗi sắp xếp", e)
      }
      setTimeout(()=>{ this.loading = false;},300)
    },
    add() {
      this.isAdd=true;
      this.dialogVisible=true;
    },
    edit() {
      this.isAdd=false;
      this.dialogVisible=true;
    },
    async del() {
      let res = await axiosDel(this.url, this.form.vatNo)
      try {
        if(res.data.code!=200){
          this.$tip.danger(res.data.msg);
        }else{
          this.$tip.success(res.data.msg);
          this.query();
        }
      }catch (e) {
        console.error("Lỗi xóa dữ liệu",e)
      }
    },
    rowClick(val) {
      this.currentRow=val
    }
  }
}
</script>
