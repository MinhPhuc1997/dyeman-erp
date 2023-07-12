<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-26 08:16:31
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane  :label="$t('clothFly.title1')" name="1">
        <el-row class="btnList">
          <el-button type="primary" @click="query">{{$t("public.query") }}</el-button>
          <el-button type="primary" @click="print">{{$t("public.print")}}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            :row-style="rowStyle"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
          ></avue-crud>
        </el-row>
        <el-dialog
          id="colorMng_Dlg"
          :visible.sync="dialogVisible"
          fullscreen
          width="100%"
          append-to-body
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          v-if="dialogVisible"
        >
          <tem-dlg ref="tem" :detail="detail" @close="dialogVisible = false" v-if="dialogVisible"></tem-dlg>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('clothFly.title2')" name="2">
        <com-print></com-print>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get } from "./api";
import tem from "./temDlg";
import comPrint from "./print";
export default {
  name: "",
  components: {
    temDlg: tem,
    comPrint
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
      loading: false,
      dialogVisible: false,
      detail: {},
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      tabs: "1"
    };
  },
  computed:{
    isOutFactory(){
        return this.$store.getters.isOutFactory
    }
  },
  methods: {
    query() {
      this.loading = true;
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      let params = {
        weaveJobCode: "!^%" + (this.form.weaveJobCode || ''),
        salPoNo: "%" + (this.form.salPoNo || ''),
        mathineCode: "%" + (this.form.mathineCode || ''),
      }
      if(this.isOutFactory) {
        params.isWorkOut = 1
      }else{
        delete params.isWorkOut
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      if (this.detail.weaveState === 1) {
        this.$tip.warning(this.$t("clothFly.printWarning"));
        return;
      }
      // else if(this.detail.weaveState === 2) {
      //   this.$tip.warning("该织单为已织完状态,无法进行打印操作!");
      //   return;
      // }
      if (Object.keys(this.detail).length === 0) {
        return;
      }
      this.detail.pz = 25;
      this.detail.qsph = 1;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.print();
    },
    cellClick(val) {
      this.detail = val;
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.weaveState == 1) {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
    },
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>