<template>
  <div class='sendReceivingBill'>
    <el-tabs v-model="tab" type="border-card">
      <el-tab-pane name="list" label="生产单进度">
        <div class="btnList">
          <el-popconfirm title="是否确定完结选中数据？" placement="top-start" @onConfirm="handleFinished">
            <el-button type="success" slot="reference" style="margin-right: 8px;">完结</el-button>
          </el-popconfirm>
          <el-button type="primary" @click="handleQuery">{{ $t("public.query") }}</el-button>
        </div>
        <div class="formBox">
          <avue-form ref="queryForm" :option="queryFormOp" v-model="queryFormData"></avue-form>
        </div>
        <div class="crudBox">
          <avue-crud ref="logCrud" :option="logOp" :data="logData" :page.sync="page" v-loading="loading"
                     @on-load="handleQuery" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"
                     @selection-change="selectionChange" :row-class-name="tableRowClassName">
          </avue-crud>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import {fetchLogData, updateLogData} from "./api.js";
  import {mainForm, mainCrud} from "./data.js";
  //import dptReciveLog from "../dptReciveLog_221202/index.vue";
  export default {
    components: {
      // dptReciveLog
    },
    data() {
      return {
        loading: true,
        queryFormOp: mainForm(this),
        queryFormData: {
          workOrderType: 1,
          dispathReceive: 1,
          workOrderNo: ''
        },
        logOp: mainCrud(this),
        logData: [],
        page: {
          pageSizes: [20, 50, 100, 200, 500],
          pageSize: 20,
          currentPage: 1,
          total: 0,
        },
        cellCheckData: {},
        selectList: [],
        tab: "list"
      }
    },
    methods: {
      handleQuery() {
        this.loading = true;
        this.selectList = [];
        let {workOrderNo, workOrderType, dispathReceive, dpt} = this.queryFormData;
        let params = {
          rows: this.page.pageSize,
          pages: this.page.currentPage,
          start: this.page.currentPage,
          workOrderNo: "%" + (workOrderNo || ''),
          logType:workOrderType,
          dispathReceive
        }
        dispathReceive == 1 ? params.dptworkProcessFk = dpt : params.sendProcessFk = dpt;
        fetchLogData(params).then(res => {
          this.logData = res.data.records;
          this.page.total = res.data.total;
        }).finally(_ => {
          this.loading = false;
        })
      },
      handleFinished() {
        if (!this.selectList.length) return this.$tip.warning("请勾选要完结的工作单!");
        this.loading = true;
        this.selectList.forEach((item, i) => {
          let params = {
            logId: item.logId,
            isend: 1
          }
          updateLogData(params).then(res => {
            if (res.data.code !== 200) {
              this.$tip.error(this.$t("public.bcsg"));
            } else {
              this.$tip.success(this.$t("public.bccg"));
            }
          }).finally(_ => {
            if (i == this.selectList.length - 1) {
              this.handleQuery();
            }
          })
        })
      },
      selectionChange(list) {
        this.selectList = list;
      },
      handleRowDBLClick(row) {
        this.cellCheckData = row;
      },
      cellClick(row) {
        this.cellCheckData = row;
      },
      datedif(date) {
        if(date==null){
          date="2020-01-01"
        }
        var date1 = new Date(date);
        var date2 = new Date();
        var diff = new Date(date2.getTime() - date1.getTime());
        return diff/(1000 * 60 * 60 * 24)
      },
      tableRowClassName({row, rowIndex}) {

        if (row.workOrderType != 1) {
          if (this.datedif(row.acceptDate) >= 2) {
            return 'danger-row';
          } else if (this.datedif(row.acceptDate) >= 1) {
            return 'warning-row';
          } else if (this.datedif(row.acceptDate) == 0) {
            return 'success-row';
          }
        }
        return '';
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang="stylus">

  .el-tag--mini {
    height: 30px !important;
  }

  .avue-crud__tip {
    margin: 7px 0 2px 0;
  }

  .avue-crud {
    text-align: left
  }

  .sendReceivingBill {

  }

  .danger-row {
    background-color: rgba(245, 108, 108, 0.99) !important;
    color: #fff;
  }

  .warning-row {
    background-color: rgba(246, 183, 100, 0.99) !important;
    color: #fff;
  }

  .success-row {
    background-color: rgba(103, 194, 58, 0.99) !important;
    color: #fff;
  }
</style>
