<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-27 11:24:55
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\index.vue
 * @Description:
-->

<template>
  <div class="abnormalDaily">
    <view-container :title="$t('abnormalDaily.title1')">
      <el-row class="btnList">
        <el-button type="success" @click="update" v-hasPerm="['quality:qcAbnormalDaily:edit']"> {{ $t("public.update") }} </el-button>
        <el-button type="primary" @click="add" v-hasPerm="['quality:qcAbnormalDaily:add']"> {{ $t("public.add") }} </el-button>
        <el-button type="danger" @click="del" v-hasPerm="['quality:qcAbnormalDaily:del']"> {{ $t("public.del") }} </el-button>
        <el-button type="success" @click="handleExport" v-hasPerm="['quality:qcAbnormalDaily:export']"> {{ $t("public.report") }} </el-button>
        <el-button type="warning" v-if="hasSplitVatTimes" @click="handleAutoSplitVat" > {{ $t('abnormalDaily.autoSplitVat') }} </el-button>
        <el-button type="primary" @click="query" v-hasPerm="['quality:qcAbnormalDaily:list']"> {{ $t("public.query") }} </el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
          :element-loading-text="$t('public.loading')" @on-load="query" @row-click="rowClick"
          @row-dblclick="handleRowDBLClick" :row-style="rowStyle">
          <template slot-scope="scope" slot="menu">
            <el-button type="primary" plain @click="handleCreateAbnormal(scope)">{{$t("abnormalDaily.report1")}}</el-button>
            <el-button type="primary" plain @click="handleCreateOrder(scope)">{{$t("abnormalDaily.report2")}}</el-button>
          </template>
        </avue-crud>
      </el-row>
    </view-container>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
      <tem-dlg ref="qcCheckPlanTem" @refresh="query" @close="temClose"> </tem-dlg>
    </el-dialog>
  </div>
</template>

<script>
import temDlg from "./tem.vue";
import { fetchQcCheckClothDayDetailByPage, removeQcCheckClothDayDetail, fetchQcClothBackRepairByPage, addQcClothBackRepair, updateQcClothBackRepair, createRepairPdf } from './api.js'
import { fetchSplitVatByDetail, fetchUpdateVatNoByType, fetchHasAutoSplitTimes } from "./api"
import { mainForm, mainCrud } from "./data.js";
export default {
  components: {
    temDlg,
  },
  props: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      curIdx: null,
      wloading: false,
      loading: false,
      dialogVisible: false,
      detailId: {},
      // 是否在自动拆缸区间内
      hasSplitVatTimes: false,
    };
  },
  watch: {},
  computed: {
    hasAutoSplit(){
      let { divdVatFlag, hasRunJob } = (this.crud[this.curIdx - 1] || {})
      console.log(divdVatFlag, hasRunJob)
      return divdVatFlag == 0 || hasRunJob == 1
    }
  },
  created() {
    this.getHasSplitTime();
  },
  mounted() { },
  methods: {
    // 获取是否拆缸时间区间内
    getHasSplitTime(){
      fetchHasAutoSplitTimes().then(res => {
        this.hasSplitVatTimes = (parent.userID === 'ZHANGW') || res.data.data;
      })
    },
    // 自动拆缸
    async handleAutoSplitVat(){
      let row = this.crud[this.curIdx - 1];
      if(!row){
        return  this.$tips.warning(this.$t("tipLabel.notCheckData"))
      }
      let isConfirm = await this.$tip.cofirm(`${this.$t("abnormalDaily.warning1")}${row.vatNo}${this.$t("abnormalDaily.warning2")}`).then(res => true).catch(err => false);
      if(!isConfirm) return;
      let splitTypeEnum = {
        "01": "A",
        "02": "R",
        "03": "W",
        "06": "B",
        "07": "L",
      }
      // 拆缸
      if(splitTypeEnum[row.divdVatType]){
         let params = {
          vatNo: row.vatNo,
          detailFk: row.detailId,
          splitType: splitTypeEnum[row.divdVatType],
          operator: parent.userID
        };
        this.loading = true;
        fetchSplitVatByDetail(params).then(res => {
          let {code, msg} = res.data;
          if(code == 200){
            this.$tip.success(msg);
            this.query();
          }else {
            this.$tip.warning(msg)
          }
        }).finally(() => {
          this.loading = false;
        })
      };

      let updateTypeEnum = {
        "04": "R",
        "05": "W"
      }
      // 改缸
      if(updateTypeEnum[row.divdVatType]){
        this.loading = true;
        fetchUpdateVatNoByType(updateTypeEnum[row.divdVatType], row.vatNo, row.detailId).then(res => {
          if(res.data.data){
            this.$tip.success(this.$t("public.czcg"));
            this.query();
          }
        }).finally(() => {
          this.loading = false;
        })
      }


    },
    query() {
      this.loading = true;
      let params = {};
      if (this.form.checkDate !== undefined) {
        params = {
          vatNo: "%" + (this.form.vatNo || ''),
          checkDate_begin: this.form.checkDate[0],
          checkDate_end: this.form.checkDate[1],
          qcChecker: "%" + (this.form.qcChecker || ''),
          dataSortRules: 'checkDate|desc,yind',

        }
      } else {
        params = {
          vatNo: "%" + (this.form.vatNo || ''),
          qcChecker: "%" + (this.form.qcChecker || ''),
          dataSortRules: 'checkDate|desc,yind'
        }
      }

      if (this.form.chargeDpt !== undefined) {
        params = Object.assign(params, {
          chargeDpt: this.form.chargeDpt,
        })
      }

      fetchQcCheckClothDayDetailByPage(Object.assign(params, {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        delFlag: 0
      })).then(async res => {
        let { records, total } = res.data;
        this.crud = records;
        this.page.total = total;
        this.$refs.crud.setCurrentRow();
        await this.$nextTick();
        this.$refs["crud"].doLayout();
        this.curIdx = null;
      }).finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      })
    },
    async update() {
      if (!this.curIdx) {
        this.$tip.warning(this.$t("tipLabel.notCheckData"));
        return
      }
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData(this.crud[this.curIdx - 1].detailId);
    },
    async add() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData()
    },
    async del() {

      if (!this.curIdx) { return this.$tip.warning(this.$t("tipLabel.notCheckData")) }
      let idx = this.curIdx - 1;
      if(this.crud[idx].hasRunJob) {
        this.$tip.warning(this.$t("abnormalDaily.warning3"));
        return
      }
      let cofResult = await this.$tip.cofirm(this.$t("tipLabel.delVat") + this.crud[idx].vatNo + this.$t("tipLabel.delEnd")).then(() => { return true }).catch((e) => { return false });
      if (!cofResult) return false;
      this.loading = true;
      removeQcCheckClothDayDetail(this.crud[idx].detailId).then(res => {
        this.query();
        this.$tip.success(this.$t('public.sccg'));
      }).finally(() => { this.loading = false });
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
    },
    handleRowDBLClick(row) {
      this.curIdx = row.$index + 1;
      this.update()
    },
    temClose(hasRefresh) {
      this.dialogVisible = false;
      hasRefresh && this.query();
    },
    handleCreateAbnormal({ row }) {
      window.open(process.env.API_HOST + '/api/qcCheckClothDayDetail/qaDailyPdf?id=' + row.detailId);
    },
    async handleCreateOrder({ row }) {
      this.wloading = true
      let detailRes = await fetchQcClothBackRepairByPage({ dayDetailfFk: row.detailId })
      let params = {
        noticeDate: row.checkDate,
        dayDetailfFk: row.detailId,
        ...row
      }
      if (detailRes.data.total) {
        await updateQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + detailRes.data.records[0].repairId)
      } else {
        let addRes = await addQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + addRes.data.data)
      }
    },
    handleReport(command) {
      let dayId = new Date().getFullYear() + '' + (command < 10 ? '0' + command : command);
      let name = encodeURI(
        "http:" +
        process.env.API_HOST.split(":")[1] +
        ":92/api/qaDayOutput/qareport?dayId=" + dayId
      );
      window.open(name);
      this.wloading = false;
    },
    handleExport() {
      let url = "";

      if (this.form.checkDate.length > 0) {
        url = "http://192.168.5.1:91/api/qcCheckClothDayDetail/qaDailyXlsx?" +
          `vatNo=%25${this.form.vatNo}&` +
          `checkDate_begin=${this.form.checkDate[0]}&` +
          `checkDate_end= ${this.form.checkDate[1]}&` +
          `qcChecker=${this.form.qcChecker}`
      } else {
        url = "http://192.168.5.1:91/api/qcCheckClothDayDetail/qaDailyXlsx?" +
          `vatNo=%25${this.form.vatNo}&` +
          `qcChecker=${this.form.qcChecker}`
      };
      if (this.form.chargeDpt !== undefined) {
        url = url + "&chargeDpt=" + this.form.chargeDpt
      }
      let oA = document.createElement("a");
      oA.href = url;
      oA.target = "_blank";
      oA.click();
      this.loading = false;
      this.$tip.success(this.$t("public.dccg"))
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.divdVatFlag == "0") {
        return;
      }
      if (row.hasRunJob) {
        return {
          backgroundColor: "#67C23A",
        };
      } else {
        return {
          backgroundColor: "#FBD295"
        };
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.abnormalDaily {
  >>>.el-table__fixed-right {
    z-index: 99;
  }
}
</style>
