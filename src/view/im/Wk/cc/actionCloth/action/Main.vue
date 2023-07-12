<template>
  <div>
    <div class="btnList">
      <el-button type="success" @click="addNew" v-hasPerm="['whse:productAction:add']">{{ this.$t("public.add") }}</el-button>
      <el-button type="primary" @click="query" v-hasPerm="['whse:productAction:list']">{{ this.$t("public.query") }}</el-button>

<!--      <input type="file" ref="inputFile" @change="upload"/>-->
      <el-button type="success" @click="exportMain" v-hasPerm="['whse:productAction:export1']"> 汇总报表</el-button>
      <el-button type="warning" @click="exportDetail" v-hasPerm="['whse:productAction:export2']"> 明细报表</el-button>
    </div>

    <el-row class="formBox">
      <avue-form ref="form" :option="fomOp" v-model="form">
        <template slot="actionCause" slot-scope="scope">
          <el-select v-model="form.actionCause" filterable remote reserve-keyword clearable default-first-option
                     placeholder="输入缸号">
            <el-option v-for="item in optionsActionCause" :key="item.actionCause" :label="item.causeName"
                       :value="item.actionCause">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </el-row>

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
          @row-dblclick="showView"
        ></avue-crud>
      </el-row>
    </div>
    <el-dialog
      id="addNewRecord"
      :visible.sync="visiable"
      width="100%"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="visiable">
      <new-action @exit="visiable=false"/>
    </el-dialog>
    <el-dialog
      id="onlyview"
      :visible.sync="visiableView"
      width="80%"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="visiableView">
      <only-view @exit="visiableView=false" :data="dataView"/>
    </el-dialog>
    <el-dialog
      id="uploads"
      :visible.sync="visiableUpload"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="visiableUpload">
      <Compensation :data="dataUpload"/>
    </el-dialog>
  </div>
</template>

<script>

  import {_crudOp, _fomOp} from "../data";
  import {API, axiosGet} from "../api";
  import newAction from "./newAction";
  import OnlyView from "./onlyView";
  import {checkIncludes, compensation, queryParmsEx, readKaneTop, readOTO} from "../process";
  import * as XLSX from "xlsx";
  import Compensation from "../core/compensation";

  export default {
    name: "Main",
    components: {
      Compensation,
      OnlyView,
      "new-action": newAction
    },
    data() {
      return {
        fomOp: _fomOp(this),
        form: {},
        crudOp: _crudOp(this),
        crud: [],
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
          pageSizes: [10, 20, 50, 100],
        },
        loading: false,
        visiable: false,
        visiableView: false,
        dataView: null,
        optionsActionCause: [],
        dataUpload: [],
        visiableUpload: false,
      }
    },
    methods: {
      exportMain() {
        let url = '/api/whseFabricChangeAction/report';
        let params = queryParmsEx(this.form, ["actionEffect", "actionCause"], "createTime", null);
        if (this.form.createTime != null && this.form.createTime.length === 2) {
          params = Object.assign({
            createTime_begin: `${this.form.createTime[0]} 00:00:00`,
            createTime_end: `${this.form.createTime[1]} 23:59:59`
          }, params)
        }
        this.$tip.cofirm("您确定需要导出数据吗？").then(() => {
          if (Object.keys(params).length === 0) {
            window.open(process.env.API_HOST + url);
          } else {
            const obj = new URLSearchParams(params).toString();
            window.open(process.env.API_HOST + url + '?' + obj)
          }
        })
      },
      exportDetail() {
        let url = '/api/whseFabricChangeAction/reportDetailed'
        let params = queryParmsEx(this.form, ["actionEffect", "actionCause"], "createTime", null);
        if (this.form.createTime != null && this.form.createTime.length === 2) {
          params = Object.assign({
            createTime_begin: `${this.form.createTime[0]} 00:00:00`,
            createTime_end: `${this.form.createTime[1]} 23:59:59`
          }, params)
        }
        this.$tip.cofirm("您确定需要导出数据吗？").then(() => {
          if (Object.keys(params).length === 0) {
            window.open(process.env.API_HOST + url);
          } else {
            const obj = new URLSearchParams(params).toString();
            window.open(process.env.API_HOST + url + '?' + obj)
          }
        })
      },
      query() {
        this.loading = true;
        let params = queryParmsEx(this.form, ["actionEffect", "actionCause"], "createTime", this.page);
        if (this.form.createTime != null && this.form.createTime.length === 2) {
          params = Object.assign({
            createTime_begin: `${this.form.createTime[0]} 00:00:00`,
            createTime_end: `${this.form.createTime[1]} 23:59:59`
            // r_createTime_r: `(${this.form.createTime[0]} 00:00:00~${this.form.createTime[1]} 23:59:59)`
          }, params)
        }
        axiosGet(API.whseFabricChangeActionView, params).then((res) => {
          this.crud = res.data.records;
          this.crud.sort((a, b) => {
            return a.createTime > b.createTime ? 1 : -1
          })
          this.crud.map((e, i) => e.index = i + 1);
          this.page.total = res.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 300)
        })
      },
      addNew() {
        this.visiable = true;
      },
      cellClick(val) {
        this.dataView = val;
      },
      showView(val) {
        this.dataView = val;
        this.visiableView = true;
      },
      async getActionCause(val) {
        this.vatLoading = true;
        let result = await axiosGet(API.whseFabricActionOption, {actionEffect: val.value});
        let arr = [];
        result.data.map((e, i) => {
          if (e.sn > 100) {
            arr.push(e)
          }
        })
        this.optionsActionCause = arr;
        this.vatLoading = false;
      },
      upload(e) {

        const inputFile = this.$refs.inputFile;
        if (!inputFile) {
          return;
        }

        const file = inputFile.files[0];

        if (!file || !file.type.match(/application\/vnd.ms-excel|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/)) {
          console.error("Invalid file type. Please select an Excel file.");
          this.$tip.warning("Vui lòng chọn file excel, 请选择Excel文件")
          return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, {type: "binary"});
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          console.log(XLSX.utils.sheet_to_json(worksheet, {header: 1}))
          this.dataUpload = await compensation(XLSX.utils.sheet_to_json(worksheet, {header: 1}));

          this.visiableUpload=true;
        };
        reader.readAsBinaryString(file);
        this.$nextTick(() => {
          if (this.$refs.fileInput) {
            this.$refs.fileInput.value = '';
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
