<!--
 * @Author: Lyl
 * @Date: 2022-04-25 14:03:51
 * @LastEditors: PMP
 * @LastEditTime: 2022-07-21 11:07:24
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\index.vue
 * @Description:
-->
<template>
  <div class="transferLoad">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane label="出库" name="out" v-hasPerm="['whse:transferLoadQa:tab1']">
        <el-row class="btnList">
          <el-button type="primary" @click="query" v-hasPerm="['whse:transferLoadQa:list']">{{ this.$t("public.query") }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <div class="crudBox">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page"
            :element-loading-text="$t('public.loading')" v-loading="wloading" @cell-click="cellClick" @on-load="query">
            <template slot-scope="scope" slot="menu">
              <el-popover placement="left" width="160" trigger="click" ref="popoverYB">
                <p>请选择验布口</p>
                <el-select v-model="exit" placeholder="请选择验布口">
                  <el-option v-for="item in outExit" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div style="text-align: left; margin-top: 10px">
                  <!-- <el-button type="primary" size="mini" @click="handleOutWhse(scope,'3')">提交</el-button> -->
                  <el-button type="success" size="mini" @click="handleOutWhseTest(scope, '3')">提交</el-button>
                </div>
                <el-link type="primary" size="mini" slot="reference" @click="defaultWay(1)" style="margin-right: 17px;">
                  验布
                </el-link>
              </el-popover>
              <el-popover placement="left" width="160" trigger="click">
                <p>请选择验布口</p>
                <el-select v-model="exit" placeholder="请选择验布口">
                  <el-option v-for="item in sbExit" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div style="text-align: left; margin-top: 10px">
                  <!-- <el-button type="primary" size="mini" @click="handleOutWhse(scope,'5')">提交</el-button> -->
                  <el-button type="success" size="mini" @click="handleOutWhseTest(scope, '5')">提交</el-button>
                </div>
                <el-link type="success" size="mini" slot="reference" @click="defaultWay(2)" style="margin-left: 17px;">
                  松布
                </el-link>
              </el-popover>
            </template>
          </avue-crud>
        </div>
      </el-tab-pane>
      <el-tab-pane label="入仓" name="in" v-hasPerm="['whse:transferLoadQa:tab2']">
        <in-whse></in-whse>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="task" v-hasPerm="['whse:transferLoadQa:tab3']">
        <el-row class="btnList">
          <el-button type="primary" @click="queryTask" v-hasPerm="['whse:transferLoadQa:list3']">{{ this.$t("public.query") }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="taskFormOp" v-model="taskForm">
          </avue-form>
        </el-row>
        <view-container title="任务信息">
          <el-row class="crudBox" style="margin-top: 5px">
            <avue-crud ref="task" :option="taskCrudOp" :page.sync="taskpage" :data="task"
              :element-loading-text="$t('public.loading')" v-loading="wloading" @on-load="queryTask"
              @current-row-change="cellClick"></avue-crud>
          </el-row>
        </view-container>
      </el-tab-pane>
<!--      <el-tab-pane label="QA验布计划看板" name="plan" v-hasPerm="['whseMng:transferLoadQa:tab4']">-->
<!--        <qc-plan></qc-plan>-->
<!--      </el-tab-pane>-->
    </el-tabs>

  </div>
</template>

<script>
import { formOp, crudOp, taskForm, taskCrud, DlgtaskCrud } from "./data";
import { fetchStockVehicleByPage, sendTask, getTask, getWayIOState } from "./api";
import { sendTestTaskNoin } from "../whseInOutKB/api"
import qcPlan from "./qcPlan";
import inWhse from "./inWhse";
import axios from "axios";
export default {
  components: {
    qcPlan,
    inWhse
  },
  props: {},
  data() {
    return {
      wloading: false,
      crudOp: crudOp(this),
      crudDlgOp: DlgtaskCrud(this),
      crud: [],
      crudDlg: [],
      formOp: formOp(this),
      form: {
        type: 1,
        layer: 1
      },
      page: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      taskpage: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 200,
        currentPage: 1,
        total: 0,
      },
      dlgVisiable: false,
      exit: "",
      outExit: [],
      sbExit: [],
      visible: true,
      detail: {},
      taskFormOp: taskForm(this),
      taskForm: {},
      taskCrudOp: taskCrud(this),
      task: [],
      tabs: "out",
      visibleJB: false,
      visiblePB: false
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { this.getWayIO() },
  methods: {
    query() {
      this.wloading = true;
      this.crud = [];
      let query = JSON.parse(JSON.stringify(this.form));
      query.palletCode = "!^%" + (query.palletCode || "");
      query.vatNo = "%" + (query.vatNo || "");
      query.storageId = "%" + (query.storageId || "");
      fetchStockVehicleByPage(
        Object.assign(query, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        this.crud = res.data.records;
        this.crud.length === 0 && (this.wloading = false);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (this.crud.length - 1 === i) {
            setTimeout(() => {
              this.wloading = false;
            }, 200);
          }
        });
      });
    },
    queryTask() {
      this.wloading = true;
      this.taskForm.barCode = this.taskForm.barCode
        ? (this.taskForm.barCode = "%" + this.taskForm.barCode)
        : "";
      this.taskForm.orderId = "!^%";
      getTask(
        Object.assign(this.taskForm, {
          rows: this.taskpage.pageSize,
          start: this.taskpage.currentPage,
          page: this.taskpage.currentPage,
        })
      )
        .then((res) => {
          this.task = res.data.records;
          this.taskpage.total = res.data.total;
          if (this.task.length) {
            this.$refs.task.setCurrentRow(this.task[0]);
          }
          if (
            this.taskForm.barCode &&
            this.taskForm.barCode.indexOf("%") != -1
          ) {
            this.taskForm.barCode = this.taskForm.barCode.split("%")[1];
          }
        })
        .finally((res) => {
          setTimeout(() => {
            this.wloading = false;
          }, 200);
        });
    },
    cellClick(val) {
      this.detail = val;
    },
    handleOutWhse({ row }, orderType) {
      if (!row) {
        this.$tip.error("请先选择要出库的载具!");
        return;
      }
      if (!this.exit) {
        this.$tip.error("请先选择验布出口");
        return;
      }
      this.wloading = true;
      let taskParams = {
        barCode: row.palletCode, // 载具
        entrance: this.exit, // 验布出口
        isEmpty: 0,
        type: 2, //0原材料,1五金件,2成品
        orderType: Number(orderType) // 3 => 验布出库， 4 => 验布入库 5 => 松布出库
      };
      sendTask(taskParams)
        .then((sendRes) => {
          if (sendRes.data.code) {
            this.$tip.error(sendRes.data.data);
            return;
          }
          if (sendRes.data == "返回异常") {
            this.$tip.error(sendRes.data);
            return;
          }
          this.$tip.success(sendRes.data);
        })
        .finally((res) => {
          this.wloading = false;
        });
    },
    handleOutWhseTest({ row }, orderType) {
      if (!row) {
        this.$tip.error("请先选择要出库的载具!");
        return;
      }
      if (!this.exit) {
        this.$tip.error("请先选择验布出口");
        return;
      }
      this.wloading = true;
      let taskParams = {
        barCode: row.palletCode, // 载具
        entrance: this.exit, // 验布出口
        isEmpty: 0,
        type: 2, //0原材料,1五金件,2成品
        orderType: Number(orderType) // 3 => 验布出库， 4 => 验布入库 5 => 松布出库
      };
      sendTestTaskNoin(taskParams).then((res) => {
        this.wloading = false;
        if (res.data.code == 200) {
          this.$tip.success(res.data.msg);
        } else {
          this.$tip.error(res.data.msg);
        }
      })
    },
    handleInWhse({ row }) {
      if (!row) {
        this.$tip.error("请先选择要出库的载具!");
        return;
      }
      if (!this.exit) {
        this.$tip.error("请先选择验布出口");
        return;
      }
      this.wloading = true;
      let taskParams = {
        barCode: row.palletCode, // 载具
        entrance: this.exit, // 验布出口
        isEmpty: false,
        type: 2, //0原材料,1五金件,2成品
        orderType: 3, // 3 => 验布出库， 4 => 验布入库
      };
      alert("请求参数" + JSON.stringify(taskParams));
      console.info("sendParams", taskParams);
      sendTask()
        .then((res) => {
          if (res.status === 200) {
            this.$tip.success("提交成功!");
          } else {
            this.$tip.error(res.msg);
          }
        })
        .finally(() => {
          this.wloading = false;
        });
    },
    defaultWay(type) {
      if (type == 1) {
        this.exit = (this.outExit.length > 0) ? this.outExit[0].value : "";
      } else {
        this.exit = (this.sbExit.length > 0) ? this.sbExit[0].value : "";
      }
    },
    getWayIO() {
      getWayIOState().then((res) => {
        var outList = [];
        var sbList = [];
        if (res.data.length > 0) {
          res.data.map((e) => {
            if (e.useWay == 1) {
              outList.push({
                label: e.passwayName,
                value: e.passwayName,
                sn: e.sn
              })
            } else {
              sbList.push({
                label: e.passwayName,
                value: e.passwayName,
                sn: e.sn
              })
            }
          })
          outList.sort((a, b) => a.sn < b.sn);
          sbList.sort((a, b) => a.sn < b.sn);
          this.outExit = outList;
          this.sbExit = sbList;
        }
      })
    }
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-tag--mini {
  display: none !important;
}

.transferLoad {
  >>>.el-table__fixed-right {
    z-index: 99;
  }

  >>>.el-icon-view {
    font-size: 16px;
  }
}
</style>
