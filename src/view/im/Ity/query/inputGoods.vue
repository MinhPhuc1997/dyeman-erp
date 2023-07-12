<template>
  <div id="">
    <div class="btnList">
      <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      <el-button type="success" @click="handleExport">得出报表</el-button>
    </div>
    <avue-form ref="queryFormRef" :option="queryFormOp" v-model="queryForm">
      <template slot="weaveJobCode" slot-scope="scope">
        <el-select v-model="queryForm.weaveJobCode" filterable remote reserve-keyword clearable default-first-option
                   placeholder="请输织单号" :remote-method="remoteMethodproBatch" :loading="vatLoading">
          <el-option v-for="item in options.weaveJobCode" :key="item.weaveJobCode" :label="item.weaveJobCode"
                     :value="item.weaveJobCode">
          </el-option>
        </el-select>
      </template>
    </avue-form>
    <view-container title="查询结果">
      <avue-crud
        ref="mainCrudRef"
        :table-loading="loading"
        :option="mainCrudOp"
        :data="crudDataList"
        :page.sync="page"
        @on-load="query"
      />
    </view-container>


  </div>
</template>
<script>
import { clothNoteOp, importFormOp, vehicleOp, importCrud } from "./data";
import {
  getProBleadyeRunJob,
  getProBleadyeRunJobCalico,
  getProWeaveJobPage,
  getWhseMaterialPage,
  getclothNoteInStorage,
} from "./api";

export default {
  name: "inputGoods",
  component: {},
  data() {
    return {
      loading: false,
      queryFormOp: importFormOp(this),
      queryForm: {
        weaveJobCode:""
      },
      mainCrudOp: importCrud(this),
      vehicleOp: vehicleOp(this),
      clothNoteOp: clothNoteOp(this),
      crudDataList: [],
      page: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200, 500],
      },
      addFormVisible: false,
      vatLoading: false,
      options: [],
    };
  },
  methods: {
    query() {
      this.loading = true;
      this.crudDataList = [];
      let {  yinDate } = this.queryForm;
      let params = { weaveJobCode: (this.queryForm.weaveJobCode) ? this.queryForm.weaveJobCode : "%" };
      if (yinDate && yinDate.length === 2) {
        let yinDate_begin = yinDate[0];
        let yinDate_end =  yinDate[1];
        params = Object.assign({
          yinDate_begin: yinDate_begin,
          yinDate_end: yinDate_end,
        }, params);
      };
      params = Object.assign({
        rows: this.page.pageSize,
        start: this.page.currentPage,
      }, params);
      getclothNoteInStorage(params).then((res) => {
        this.crudDataList = res.data.records;
        this.crudDataList.map((e, i) => e.index = i + 1);
        this.page.total = res.data.total;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    handleExport() {
      let url = "http://192.168.5.1:91/api/clothNoteInStorage/reportExport?";
      let {  yinDate } = this.queryForm;
      if (yinDate && yinDate.length === 2) {
        let yinDate_begin = `${yinDate[0]} 00:00:00`;
        let yinDate_end = `${yinDate[1]} 23:59:59`;
        url=url+"yinDate_begin="+yinDate_begin+"&yinDate_end="+yinDate_end;
      }
      if(this.queryForm.weaveJobCode){
        if (yinDate && yinDate.length === 2) {
          url=url+"&";
        }
        url=url+"weaveJobCode="+(this.queryForm.weaveJobCode);
      }
      window.open(url);
    },
    remoteMethodproBatch(val) {
      this.vatLoading = true;
      getProWeaveJobPage({ weaveJobCode: "!^%" + val, degFlag: 0 }).then((res) => {
        this.options.weaveJobCode = res.data.records;
        this.vatLoading = false;
      });
    },

  },
  mounted() {
    this.query();
  },
};
</script>
