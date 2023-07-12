<template>
  <div id="">
    <div class="btnList">
      <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      <el-button type="success" @click="handleExport">得出报表</el-button>
    </div>
    <avue-form ref="queryFormRef" :option="queryFormOp" v-model="queryForm">
      <template slot="poNo" slot-scope="scope">
        <el-select v-model="queryForm.weaveJobCode" filterable remote reserve-keyword clearable default-first-option
                   placeholder="请输织单号" :remote-method="remoteMethodproBatch" :loading="vatLoading">
          <el-option v-for="item in options.weaveJobCode" :key="item.weaveJobCode" :label="item.weaveJobCode"
                     :value="item.weaveJobCode">
          </el-option>
        </el-select>
      </template>
      <template slot="vatNo" slot-scope="scope">
        <el-select v-model="queryForm.vatNo" filterable remote reserve-keyword clearable default-first-option
                   :placeholder="$t('tipLabel.inputVatNo')" :remote-method="remoteMethod" :loading="vatLoading">
          <el-option v-for="item in options" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
          </el-option>
        </el-select>
      </template>
      <template slot="noteCode" slot-scope="scope">
        <el-select v-model="queryForm.noteCode" filterable remote reserve-keyword clearable default-first-option
                   placeholder="请输入胚布编号" :remote-method="remoteMethodClothNote" :loading="vatLoading"
                   @change="handleChange"
        >
          <el-option
            v-for="item in optionsNote"
            :key="item.noteId"
            :label="item.noteCode"
            :value="item.noteCode">
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
import { clothNoteOp, exportFormOp, vehicleOp, exportCrud } from "./data";
import {
  getclothNoteOutStorage,
  getproClothNotePage, getProWeaveJobPage,
} from "./api";
import { getRevolvePage } from "../../../quaLity/finalCard/api";

export default {
  name: "outputGoods",
  component: {},
  data() {
    return {
      loading: false,
      queryFormOp: exportFormOp(this),
      queryForm: {},
      mainCrudOp: exportCrud(this),
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
      optionsNote:[]
    };
  },
  methods: {
    query() {
      this.loading=true;
      this.crudDataList = [];
      let params = {
        vatNo: (this.queryForm.vatNo) ? this.queryForm.vatNo : "%",
        weaveJobCode: (this.queryForm.weaveJobCode) ? this.queryForm.weaveJobCode : "%",
        custTicket:(this.queryForm.noteCode) ? this.queryForm.noteCode+"%" : "%",
      };
      if (this.queryForm.retDate && this.queryForm.retDate.length === 2  ) {
        let invDate_start = `${this.queryForm.retDate[0]} 00:00:00`;
        let invDate_end = `${this.queryForm.retDate[1]} 23:59:59`;
        params = Object.assign({
          retDate_begin: invDate_start,
          retDate_end: invDate_end,
        }, params);
      }
      params = Object.assign({
        rows: this.page.pageSize,
        start: this.page.currentPage,
      }, params);
      getclothNoteOutStorage(params).then((res) => {
        console.log(res);
        this.page.total=res.data.total;
        this.crudDataList=res.data.records;
        setTimeout(()=>{
          this.loading=false;
        },500)
      });
    },
    handleExport(){
      let url = "http://192.168.5.1:91/api/clothNoteOutStorage/reportExport?";
      let {  retDate } = this.queryForm;
      if (retDate && retDate.length === 2) {
        let yinDate_begin = `${retDate[0]} 00:00:00`;
        let yinDate_end = `${retDate[1]} 23:59:59`;
        url=url+"retDate_begin="+yinDate_begin+"&retDate_end="+yinDate_end;
      }
      if(this.queryForm.weaveJobCode){
        if (retDate && retDate.length === 2) {
          url=url+"&";
        }
        url=url+"weaveJobCode="+(this.queryForm.weaveJobCode);
      }
      if(this.queryForm.vatNo){
        if (retDate && retDate.length === 2 || this.queryForm.weaveJobCode) {
          url=url+"&";
        }
        url=url+"vatNo="+(this.queryForm.vatNo);
      }
      window.open(url);
    },
    handleChange(val) {
      console.log(val);
    },
    remoteMethod(val) {
      this.vatLoading = true;
      getRevolvePage({ vatNo: "!^%" + val }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
    remoteMethodproBatch(val) {
      this.vatLoading = true;
      getProWeaveJobPage({ weaveJobCode: "!^%" + val }).then((res) => {
        this.options.weaveJobCode = res.data.records;
        this.vatLoading = false;
      });
    },
    remoteMethodClothNote(val) {
      this.vatLoading = true;
      getproClothNotePage({ noteCode: "!^%" + val }).then((res) => {
        this.optionsNote = res.data.records;
        this.vatLoading = false;
      });
    },
  },
  mounted() {
    this.query();
  },
};
</script>
