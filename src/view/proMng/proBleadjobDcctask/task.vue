<template>
  <div id="task" :element-loading-text="loadLabel" v-loading="loading">
    <div class="btnList">
      <el-tooltip class="item" effect="dark" content="Xóa" placement="bottom">
        <el-button type="danger" @click="deleleData()" :disabled="!detailID">{{ this.$t("public.del") }}
        </el-button>
      </el-tooltip>
      <el-button type="success" @click="handleSaveTaskState(1)" :disabled="!detailID">
        开始
      </el-button>
      <el-button type="warning" @click="handleSaveTaskState(9)" :disabled="!detailID">
        结束
      </el-button>
      <el-tooltip class="item" effect="dark" content="Tra cứu" placement="bottom">
        <el-button type="primary" @click="getData()">{{ this.$t("public.query") }}</el-button>
      </el-tooltip>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="FormOp" v-model="form">
        <template slot-scope="scope" slot="fdataid">
          <el-select v-model="form.fdataid" filterable remote clearable default-first-option
                     :placeholder="$t('proBleadjobDcctask.iptTle')">
            <el-option v-for="item in dyeMathineList" :key="item.equipmentCode" :label="item.equipmentCode"
                       :value="item.equipmentCode">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </div>
    <div class="crudBox">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
                 @row-dblclick="handleRowDBLClick" @row-click="handleCellClick" @on-load="getData"
                 :row-class-name="tableRowClassName"/>
    </div>
    <el-dialog id="choiceDlg" :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false"
               v-if="dialogVisible">
      <TaskDetail :vatNo="detailID" @close="dialogVisible = false"/>
    </el-dialog>
  </div>
</template>
<script>
import {taskCrud, mainForm} from "./data";
import {
  updateProBleadjobDcctask,
  getProBleadjobDcctaskView,
  getProBleadjobDccitem,
  deleteProBleadjobDccitem,
  deleteProBleadjobDcctask
} from "./api";
import TaskDetail from "./TaskDetail.vue";
import {postBaseEquipmentList} from "../print/dyeing/api";

export default {
  name: "task",
  components: {
    TaskDetail
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      FormOp: mainForm(this),
      crudOp: taskCrud(this),
      form: {},
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dialogVisible: false,
      detailID: "",
      currentRow: {},
      dyeMathineList: [],
      rowCellData: {}
    }
  },
  methods: {
    getData() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let params = Object.assign(this.form, {
        fmono: (this.form.fmono) ? `%${this.form.fmono}` : "%",
        fno: (this.form.fno) ? `%${this.form.fno}` : "%",
        rows: this.page.pageSize,
        start: this.page.currentPage,
      });
      getProBleadjobDcctaskView(params).then((res) => {
        this.crud = res.data.records;
        this.page.total = res.data.total;
        this.crud.sort((a, b) => {
          var c = new Date(a.fdate.replace(/-/g, "-")).getTime();
          var d = new Date(b.fdate.replace(/-/g, "-")).getTime();
          return d - c
        });
        this.crud.map((e, i) => {
          e.index = i + 1;
        })
      })
      if (this.form.fmono.indexOf("%") !== -1) {
        this.form.fmono = this.form.fmono.split("%")[1] || "";
      }
      if (this.form.fno.indexOf("%") !== -1) {
        this.form.fno = this.form.fno.split("%")[1] || "";
      }
      setTimeout(() => {
        this.loading = false;
      }, 300);

    },
    async deleleData() {
      //Tìm job_id
      //Tra cứu toàn bộ item
      //Xóa Item
      //Xóa nhóm
      let isComfirn = await this.$tip.cofirm(`${this.$t('proBleadjobDcctask.delTle')}${this.detailID}${this.$t('proBleadjobDcctask.delTle2')}`).then(res => true).catch(err => false);
      if (!isComfirn) return false;
      this.loading = true;
      // getProBleadjobDccitem({task_code: this.detailID}).then(async (res) => {
      //   ListTask = res.data;
      //   console.log(ListTask);
      //   if (ListTask.length > 0) {
      //     for (let index = 0; index < ListTask.length; index++) {
      //       const element = ListTask[index];
      //       try {
      //         await deleteProBleadjobDccitem(element.itemId).then((res) => {
      //           if (res.data.code != 200) {
      //             this.$tip.error(res.data.msg);
      //           }
      //         })
      //       } catch (error) {
      //         this.$tip.error(`${this.$t('proBleadjobDcctask.delTle3')}${error}`)
      //       }
      //     }
      //   }
      //
      //   return ;
      deleteProBleadjobDcctask(this.rowCellData.jobDccId).then((res) => {
        if (res.data.code != 200) {
          this.$tip.error(res.data.msg);
        } else {
          this.$tip.success(res.data.msg);
        }
      })
      this.getData();
      this.loading = false;
  },
  handleRowDBLClick() {
    this.dialogVisible = true;
  }
  ,
  handleCellClick(val) {
    this.detailID = val.fmono;
    this.rowCellData = val;
  }
  ,
  async handleSaveTaskState(taskState) {
    if (!this.rowCellData.jobDccId) return this.$tip.warning("请先选择数据!");
    let isComfirn = await this.$tip.cofirm(`是否确定${taskState == 1 ? '开始' : '结束'}选中的数据?`).then(res => true).catch(err => false);
    if (!isComfirn) return;
    if (this.rowCellData.taskState == taskState) return this.$tip.warning(`缸号【${this.detailID}】已${taskState == 1 ? '开始' : '结束'}`);
    let params = Object.assign(this.rowCellData, {
      taskState,
    })
    taskState == 1 ? params.startTime = this.$getNowTime("datetime") : params.finishTime = this.$getNowTime("datetime");
    updateProBleadjobDcctask(params).then(res => {
      if (res.data.code == 200) {
        this.getData();
        this.$tip.success(this.$t('public.bccg'));
      } else {
        this.$tip.error(this.$t('public.bcsb') + res.data.msg);
      }
    })
  }
  ,
  changeDyeMathine() {

  }
  ,
  datedif(date) {
    var date1 = new Date(date);
    var date2 = new Date();
    var diff = new Date(date2.getTime() - date1.getTime());
    return diff / (1000 * 60 * 60 * 24)
  }
  ,
  tableRowClassName({row, rowIndex}) {
    if (row.taskState == 0) {
      if (this.datedif(row.fDate) >= 2) {
        return 'danger-row';
      } else if (this.datedif(row.fDate) >= 1) {
        return 'warning-row';
      } else if (this.datedif(row.fDate) == 0) {
        return 'success-row';
      }
    }

    if (row.taskState == 1) {
      if (this.datedif(row.startTime) >= 2) {
        return 'danger-row';
      } else if (this.datedif(row.startTime) >= 1) {
        return 'warning-row';
      } else if (this.datedif(row.startTime) == 0) {
        return 'success-row';
      }
    }
    return '';
  }
}
,
mounted()
{
  postBaseEquipmentList().then((res) => {
    res.data.sort((a, b) => {
      {
        return (a.equIdentCode.replace(/[^0-9]/g, '') > b.equIdentCode.replace(/[^0-9]/g, '')) ? 1 : -1;
      }
    });
    this.dyeMathineList = res.data;
  })
  this.getData();
}
}
</script>
<style>
.avue-crud .el-table--mini .avue-crud__color {
  width: 30px !important;
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

.warning-row.hover-row td, .success-row.hover-row td {
  background-color: initial !important;
}
</style>
