<template>
  <div id="loomSchedule-view" v-loading="loading" :element-loading-text="$t('public.loading')">
    <div class="formBox">
      <el-form class="form-wrapper" :model="queryParams" inline size="medium">
        <el-form-item :label="$t('outPut.searchMonth')">
          <el-date-picker v-model="queryParams.searchMonth" value-format="yyyy-MM" type="month" :placeholder="$t('outPut.checkMonth')">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery"> {{$t("public.query")}}</el-button>
          <!-- <el-button type="primary" @click="handleExport"> 报表</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="crudBox">
      <el-row>
        <el-col :span="24">
          <avue-crud ref="crud" :option="crudOp" :data="crudData" :page.sync="page" @on-load="getDataList"
            @cell-dblclick="cellClick">
          </avue-crud>
        </el-col>
      </el-row>
    </div>
    <el-drawer :title="$t('clothFly.title3')" :visible.sync="drawer" direction="rtl" append-to-body>
      <div style="padding: 20px; font-size: 24px;">
        <p>{{ $t("date") }}: {{cellData.workDate}}</p>
        <!-- <p>织单号: {{cellData.weaveJobCode}}</p> -->
        <p>{{ $t("loomNo") }}: {{cellData.equipmentCode}}</p>
        <!-- <p>班次: {{cellData.workdayType == 'D' ? '白班' : '晚班'}}</p> -->
      </div>

    </el-drawer>
  </div>
</template>

<script>
import { loomStaffCrudOp } from "./data";
import { fetchLoomScheduleDataByPage } from "./api"
import { getDicT } from "@/config";
export default {
  data() {
    return {
      queryParams: {
        searchMonth: "",
      },
      crudOp: loomStaffCrudOp(this),
      crudData: [],
      loading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      dicData: getDicT(
        "baseEquipment/list?areaId=layer5",
        "equipmentCode",
        "equId",
        {},
        "equipmentCode"
      ),
      drawer: false,
      cellData: {}
    }
  },
  watch: {
    "queryParams.searchMonth": {
      handler(value) {
        this.setCrudColProp(value);
      },
      immediate: false,
    }
  },
  methods: {
    handleQuery() {
      this.getDataList();
    },
    async initData() {
      await this.$nextTick();
      let [year, month] = this.getTarMonthDate();
      this.queryParams.searchMonth = `${year}-${month}`
      this.getDataList();
    },
    getDataList() {
      if (this.loading) return;
      this.loading = true;
      let params = {
        month: this.queryParams.searchMonth,
        rows: 200,
        start: 1,
      }
      fetchLoomScheduleDataByPage(params).then(res => {
        let resData = this.group(res.data.records).map((item) => {
          let data = item.baseEquipmentFk.map((equ) => equ.baseEquipmentFk);
          data = Array.from(new Set(data));
          return {
            ...item,
            baseEquipmentFk: data
          }
        })
        this.crudData = resData.map((item) => {
          return {
            opCode: item.opCode,
            opName: item.opName,
            [item.workDate]: item.baseEquipmentFk,
            // weaveJobCode: item.weaveJobCode,
            // workDate: item.workDate,
            // workdayType: item.workdayType
          }
        })
      }).finally(() => {
        this.$nextTick(() => {
          this.$refs.crud && this.$refs.crud.doLayout();
        });
        this.loading = false;
      })
    },
    // 赋值表格配置参数
    setCrudColProp(date) {
      let [year, month, day] = this.getTarMonthDate(date);
      let { column, sumColumnList } = loomStaffCrudOp(this);
      month = ('0' + month).slice(-2)
      new Array(day).fill(1).forEach((_, index) => {
        let day = ("0" + (index + 1)).slice(-2)
        let prop = `${year}-${month}-${day}`;
        column.push({
          label: `${month}/${day}`,
          prop: prop,
          align: "center",
          width: 150,
          type: "select",
          dicData: this.dicData,
          // multiple: true,
          overHidden: true
        });
        // 合计
        sumColumnList.push({
          name: prop,
          type: "count",
          label: " ",
        })
      })

      this.crudOp.sumColumnList = sumColumnList;
      this.crudOp.column = column;
      this.crudOp.column[0].hide = true;
      this.crudOp.column[2].hide = true;
      this.crudOp.column[3].hide = true;
      this.getDataList();

    },
    // 计算当前月份有多少天
    getTarMonthDate(date) {
      let now = date ? new Date(date) : new Date();
      let year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate();
      let days = new Date(year, month, 0).getDate();
      return [year, month, days, day]
    },
    cellClick(row, column, cell, event) {
      this.cellData =  {
        equipmentCode: row[`$${column.property}`],
        workDate: column.property,
      }
      this.drawer = true;
    },
    group(arr) {
      let map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.opCode + ai.workdayType + ai.workDate + ai.weaveJobCode]) {
          dest.push({
            ...ai,
            baseEquipmentFk: [ai],
            logId: [ai]
          });
          map[ai.opCode + ai.workdayType + ai.workDate + ai.weaveJobCode] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.opCode == ai.opCode && dj.workdayType == ai.workdayType && dj.weaveJobCode == ai.weaveJobCode && dj.workDate == ai.workDate) {
              dj.baseEquipmentFk.push(ai);
              dj.logId.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    }
  },
  created() {
    this.initData();
  },
  mounted() {
  },
}
</script>

<style>

</style>