<!--
 * @Author: Lyl
 * @Date: 2022-09-24 14:28:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-10-01 09:27:44
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\job-card.vue
 * @Description:
-->
<template>
  <div class="bottomColumn-list">
    <div class="btnList">
      <el-button type="warning" @click="update" :disabled="loading" v-hasPerm="['quality:qtyButtonColumn:update']"
                 style="margin-right: 7px">
        {{ this.$t("public.update") }}
      </el-button>
      <el-popconfirm :title="$t('tipLabel.pirntConfirm')" placement="top-start" @onConfirm="handlePrint"
                     style="margin-right: 10px" v-hasPerm="['quality:qtyButtonColumn:print2']">
        <el-button type="success" slot="reference" :disabled="!cellClickData.fcardId">{{
            this.$t("public.print")
          }}
        </el-button>
      </el-popconfirm>
      <el-button type="danger" @click="handleDel" :disabled="!cellClickData.fcardId" v-hasPerm="['quality:qtyButtonColumn:del2']">
        {{ this.$t("public.del") }}
      </el-button>
      <el-button type="warning" @click="handlePreview" :disabled="loading" v-hasPerm="['quality:qtyButtonColumn:preview']">
        {{ this.$t("public.preview") }}
      </el-button>
      <el-button type="primary" @click="handleQuery" :disabled="loading" v-hasPerm="['quality:qtyButtonColumn:list2']">
        {{ this.$t("public.query") }}
      </el-button>
      <el-button type="success" @click="handleExport" :disabled="loading" v-hasPerm="['quality:qtyButtonColumn:list2']">
        {{ this.$t("public.export") }}
      </el-button>
    </div>
    <el-row class="formBox">
      <avue-form ref="qeuryForm" :option="queryFormOp" v-model="queryForm"></avue-form>
    </el-row>
    <el-row class="crudBox">
      <avue-crud ref="jobCardCrud" v-loading="loading" :option="jobCardDataOp" :data="jobCardData"
                 :page.sync="page" @on-load="handleQuery" @row-click="rowClick" @row-dblclick="handOpen"></avue-crud>
    </el-row>
    <el-dialog id="colorMng_Dlg" :visible.sync="visiable" width="60%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false">
      <edit-card :data="cellClickData" v-if="visiable" @exit="exit" @reload="reload"/>
    </el-dialog>
  </div>
</template>

<script>
import {bottomColumnCrudOp, queryFormOp} from "./data";
import {fetchProProductFlatCardData} from "./api";
import EditCard from "./edit-card.vue";
import {API, axiosDel} from "../../im/Wk/cc/actionCloth/api";
import {queryParms, queryParmsNew} from "../../im/Wk/cc/actionCloth/process";

export default {
  components: {EditCard},
  props: {},
  data() {
    return {
      loading: false,
      queryFormOp: queryFormOp(this),
      queryForm: {
        sn: undefined
      },
      jobCardDataOp: bottomColumnCrudOp(this),
      jobCardData: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      visiable: false,
      cellClickData: {}
    };
  },
  watch: {},
  computed: {},
  created() {
    this.spowerClient = this.$store.state.spowerClient;
  },
  mounted() {
  },
  methods: {
    handOpen(val) {
      this.cellClickData = val;
      this.update();
    },
    update() {
      this.visiable = true;
    },
    exit() {
      this.visiable = false
    },
    reload() {
      this.handleQuery()
      this.visiable = false
    },
    handlePreview(){
      const url ="/api/proProductFlatCard/pdf"
      const obj ={id:this.cellClickData.fcardId}
      window.open(process.env.API_HOST + url + '?' +  new URLSearchParams(obj) )
    },
    handleQuery() {
      this.loading = true;
      let {flatCardCode, vatNo, sn, packNo} = this.queryForm;
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        flatCardCode: "%" + (flatCardCode || ''),
        vatNo: "%" + (vatNo || ''),
        cardType:1,
        sn,
        packNo
      }
      fetchProProductFlatCardData(params).then(res => {
        if (!res.data.total) {
          this.jobCardData = [];
          return
        }
        this.jobCardData = res.data.records;
        this.page.total = res.data.total;
        this.$refs.jobCardCrud.setCurrentRow(this.jobCardData[0]);
      }).finally(() => {
        this.loading = false;
      })
    },
    handleExport(){
     let params = new queryParmsNew(this.queryForm,"sn",null);
     if(params.sn===undefined){
       delete params.sn
     }
      window.open("http://192.168.5.1:91/api/proProductFlatCard/excel?"+new URLSearchParams(params));
    },
    async handleDel() {
      let url = "/api/proProductFlatCard"
      let res = await axiosDel(url, {fcardId: this.cellClickData.fcardId})
      if (res.data.code == 200) {
        this.handleQuery();
        this.$tip.success(res.data.msg)
      } else {
        this.$tip.error(res.data.msg)
      }
    },
    handleFlatChange() {

    },
    rowClick(val) {
      this.cellClickData = val;
    },
    async handlePrint() {
      if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
        this.$tip.warning(this.$t('tipLabel.clientError'));
        return;
      }
      this.spowerClient.send(
        "print=fcardId:" + this.cellClickData.fcardId
      );
      this.$tip.success(this.$t('tipLabel.printSuccess'));
    }
  },
};
</script>
<style scoped>
.bottomColumn-list {
}
</style>
