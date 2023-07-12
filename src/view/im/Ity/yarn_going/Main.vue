<template>
  <div>
    <div class="btnList">

      <el-button type="success" v-hasPerm="['whse:yarn_outgoing:add']" @click="add">{{
          this.$t("public.add")
        }}
      </el-button>
      <el-button type="warning" v-hasPerm="['whse:yarn_outgoing:update']" @click="cellDBClick" :disabled="currentRow==null">{{
          this.$t("public.update")
        }}
      </el-button>
      <el-button type="danger" v-hasPerm="['whse:yarn_outgoing:del']" @click="del" :disabled="currentRow==null" >{{
          this.$t("public.del")
        }}
      </el-button>
      <el-button type="primary" v-hasPerm="['whse:yarn_outgoing:pdf']" @click="openPDF" :disabled="currentRow==null">{{
          this.$t("public.report")
        }}
      </el-button>
      <el-button type="primary" v-hasPerm="['whse:yarn_outgoing:list']" @click="query">{{
          this.$t("public.query")
        }}
      </el-button>
    </div>
    <div>
      <el-row class="formBox">
        <avue-form ref="form" :option="fomOp" v-model="form"/>
      </el-row>
    </div>
    <div style="margin-top: 15px">
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @current-row-change="cellClick"
          @row-dblclick="cellDBClick"
        ></avue-crud>
      </el-row>
    </div>
    <el-dialog
      id="addNewRecord"
      :visible.sync="visiable"
      width="80%"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="visiable">
      <Modify @close="visiable=false" :data="currentRow" :new="newData"/>
    </el-dialog>
  </div>
</template>

<script>
import {_YarnOutGoingCrud, _YarnOutGoingForm} from "./data";
import {queryParms} from "../../Wk/cc/actionCloth/process";
import {axiosDel, axiosGet} from "../../Wk/cc/actionCloth/api";
import Modify from "./Modify";

export default {
  name: "Main",
  components: {Modify},
  data() {
    return {
      form: {},
      fomOp: _YarnOutGoingForm(this),
      crudOp: _YarnOutGoingCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50, 100],
      },
      loading: false,
      currentRow: null,
      visiable:false,
      newData:false
    }
  }, methods: {
    async query() {
      this.loading = true;
      let uri = "/api/whseYarnOutgoing/page"
      let params = Object.assign({
        dataSortRules: "outCode|desc"
      }, queryParms(this.form, [], this.page)) 
      let res = await axiosGet(uri, params);
      this.crud = res.data.records;
      this.page.total = res.data.total;
      this.page.current = res.data.current;
      this.crud.map((e, i) => e.index = i + 1)
      this.loading = false;
    },
    add(){
      this.newData=true;
      this.visiable=true;

    },
    async del() {
      let uri = "/api/whseYarnOutgoing"
      let result = await axiosDel(uri, {outId:this.currentRow.outId})
      if( result.data.code ==200){
        this.$tip.success(result.data.msg)
      }else{
        this.$tip.danger(result.data.msg)
      }
      this.query()
      if(this.crud.length>0){

        this.$refs.crud.setCurrentRow(this.crud[0]);
        this.currentRow = this.crud[0]
      }
    },
    openPDF() {
      // let uri ="http://192.168.5.1:91/api/whseYarnOutgoing/pdf?id="
      let uri ="http://10.0.168.128:91/api/whseYarnOutgoing/pdf?id="
      window.open(uri+this.currentRow.outId)
    },
    cellClick(val) {

      this.currentRow = val;
    },
    cellDBClick() {
      this.newData=false;
      this.visiable=true;
    },
  }
}
</script>

<style scoped>

</style>
