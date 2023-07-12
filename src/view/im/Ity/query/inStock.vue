<template>
  <div id="task1" v-loading="loading">
    <div class="btnList">
      <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      <el-button type="success" @click="exportExcel">导出报表</el-button>
      <div style="float: right;margin-right: 17px;">
        按照查询载具分组：
        <el-switch v-model="useGroup" inactive-text="关闭" active-text="打开"></el-switch>
      </div>
    </div>
    <avue-form ref="queryFormRef" :option="queryFormOp" v-model="queryForm">
      <template slot="proBatchNumber" slot-scope="scope">
        <el-select v-model="queryForm.proBatchNumber" filterable remote reserve-keyword clearable default-first-option
                   placeholder="请输织单号" :remote-method="remoteMethodproBatch" :loading="vatLoading">
          <el-option v-for="item in options.weaveJobCode" :key="item.weaveJobId" :label="item.weaveJobCode"
                     :value="item.weaveJobCode">
          </el-option>
        </el-select>
      </template>
      <template slot="noteCode" slot-scope="scope">
        <el-select v-model="queryForm.noteCode" filterable remote reserve-keyword clearable default-first-option
                   placeholder="请输入胚布编号" :remote-method="remoteMethodClothNote" :loading="vatLoading">
          <el-option
            v-for="item in options.noteCode"
            :key="item.noteCode"
            :label="item.noteCode"
            :value="item.noteCode">
          </el-option>
        </el-select>
      </template>
    </avue-form>
    <template v-if="useGroup">
      <div class="crudBox">
        <el-row>
          <el-col :span="6">
            <view-container title="载具信息">
              <avue-crud
                ref="mainCrudRef"
                :option="inStockGroupCrud"
                :data="groupCrud"
                @current-row-change="handleGroupClick"
                :page.sync="pageG"
                @on-load="query"
              />
            </view-container>
          </el-col>
          <el-col :span="18">
            <view-container title="胚布明细">
              <avue-crud
                ref="mainCrudRef"
                :option="inStockDetailCrud"
                :data="detailCrud"
                :page.sync="pageD"
                @on-load="loadDetail"
              />
            </view-container>
          </el-col>
        </el-row>
      </div>
    </template>
    <template v-else>
      <div class="formBox">
        <div class="crudBox">
          <avue-crud
            ref="mainCrudRef"
            :option="mainCrudOp"
            :data="crudDataList"
            :page.sync="page"
            @on-load="query"

          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { getproClothNotePage, getProWeaveJobPage } from "./api";
import { inStockCrud, inStockFormOp, inStockGroupCrud, inStockDetailCrud } from "./data";

export default {
  name: "inStock",
  component: {},
  data() {
    return {
      loading: false,
      queryFormOp: inStockFormOp(this),
      queryForm: {},
      mainCrudOp: inStockCrud(this),
      inStockGroupCrud: inStockGroupCrud(this),
      groupCrud: [],
      inStockDetailCrud: inStockDetailCrud(this),
      detailCrud: [],
      crudDataList: [],
      page: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      pageG: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      pageD: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      useGroup: false,
      addFormVisible: false,
      options: {
        noteCode: [],
        weaveJobCode: [],
      },
      groupID: "",
      vatLoading:false
    };
  },
  methods: {
    query() {
      this.loading = true;
      this.crudDataList = [];
      const params = {
        noteCode: (this.queryForm.noteCode) ? this.queryForm.noteCode : "%",
        proBatchNumber: (this.queryForm.proBatchNumber) ? this.queryForm.proBatchNumber : "%",
        clothState: 2,
        rows: this.page.pageSize,
        start: this.page.currentPage,
      };
      getproClothNotePage(params).then((res) => {
        this.page.total = res.data.total;
        this.crudDataList = res.data.records;
        this.crudDataList.map((e, i) => {
          e.index = i + 1;
        });

        this.groupData(this.crudDataList);
        this.loading = false;
      });

    },
    exportExcel() {
      let url = "http://192.168.5.1:91/api/proClothNote/clothNoteReport?clothState=2";
      if (this.queryForm.noteCode) {
        url = url + "&noteCode=" + this.queryForm.noteCode;
      }
      if (this.queryForm.proBatchNumber) {
        url = url + "&proBatchNumber=" + this.queryForm.proBatchNumber;
      }
      window.open(url);
    },
    remoteMethodproBatch(val) {
      this.vatLoading = true;
      console.log(val);
      getProWeaveJobPage({ weaveJobCode: "!^%" + val }).then((res) => {
        this.options.weaveJobCode = res.data.records;
        this.vatLoading = false;
      });
    },
    remoteMethodClothNote(val) {
      this.vatLoading = true;

      getproClothNotePage({ noteCode: "!^%" + val, clothState: 2 }).then((res) => {
        this.options.noteCode = res.data.records;
        this.vatLoading = false;
      });
    },
    handleGroupClick(val) {
      const { invStoreLoadCode } = val;
      this.groupID = invStoreLoadCode;
      this.loadDetail();
    },
    loadDetail() {
      if (this.groupID === "") {
        return;
      }

      getproClothNotePage({
        invStoreLoadCode: this.groupID,
        clothState: 2,
        rows: this.pageD.pageSize,
        start: this.pageD.currentPage,
      }).then((res) => {
        this.detailCrud = res.data.records;
        this.detailCrud.map((e, i) => {
          e.index = i + 1;
        });
        this.pageD.total = res.data.total;

      });
    },
    groupData(data) {
      let mainList = [];
      let detailList = [];
      if (data.length > 0) {
        data.map((e, i) => {
          if (mainList.findIndex(item => item.invStoreLoadCode === e.invStoreLoadCode) === -1) {
            mainList.push(e);
          }
        });
        detailList = data.filter((item) => item.invStoreLoadCode === mainList[0].invStoreLoadCode);
        this.groupCrud = mainList;
        this.detailCrud = detailList;
      }
    },
  },
  mounted() {
  },
};
</script>
