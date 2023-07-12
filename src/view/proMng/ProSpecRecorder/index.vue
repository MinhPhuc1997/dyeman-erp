<template>
  <view-container title="规格资料记录">
    <div class="btnList">
      <el-button type="success" @click="add" v-hasPerm="['vue:ProSpecRecorder:add']">{{ $t("public.add") }}</el-button>
      <el-button type="warning" @click="edit" v-hasPerm="['vue:ProSpecRecorder:edit']">{{
          $t("public.update")
        }}
      </el-button>
      <el-button type="danger" @click="del" v-hasPerm="['vue:ProSpecRecorder:del']">{{ $t("public.del") }}</el-button>
      <el-button type="primary" @click="query" v-hasPerm="['vue:ProSpecRecorder:query']">{{
          $t("public.query")
        }}
      </el-button>
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
                 @row-dblclick="rowDbClick"
                 @row-click="rowClick"/>
    </div>
    <el-dialog id="item" :visible.sync="dialogVisible" width="80%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
      <item ref="tem" :detail="currentRow" :isAdd="isAdd" @refresh="query" @close="dialogVisible = false"
            v-if="dialogVisible" @exit="dialogVisible=false" @refe="query"></item>
    </el-dialog>

  </view-container>
</template>

<script>
import {mainForm, mainCrudOp, getColorData} from "./data"
import item from "./item.vue";
import {axiosDel, axiosGet} from "../../im/Wk/cc/actionCloth/api";
import {queryParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "index",
  components: {
    item
  },
  data() {
    return {
      url: "/api/proSpecRecorder",
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
      dialogVisible: false,
      currentRow: {},
      isAdd: false,
    }
  },
  methods: {
    async query() {
      this.loading = true;
      let res = await axiosGet(this.url + "/page", queryParms(this.form, [], this.page))
      this.crud = res.data.records;
      this.page.total = res.data.total
      this.page.currentPage = res.data.current
      try {
        if (this.crud.length > 0) {
          // this.crud.sort((a,b)=>{return a.sn>b.sn?1:-1})
          this.crud.map((e, i) => {
            e.index = i + 1,
              e.color = getColorData(e.styleIndex)
          })
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
      if(this.currentRow.specRecId==null){
        return
      }
      this.$tip.cofirm("Bạn có muốn xóa không?您确定需要删除吗？").then(async () => {
        let res = await axiosDel(this.url, {specRecId: this.currentRow.specRecId})
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
      }).catch({})

    },
    rowClick(val) {
      this.currentRow = val
    },
    rowDbClick(val){
      this.currentRow = val
      this.edit();
    }
  }
}
</script>
<style>
.avue-crud .el-table--mini .avue-crud__color {
  width: 85px !important;
}
</style>
