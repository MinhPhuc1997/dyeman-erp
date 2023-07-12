<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-07 10:10:28
 * @Description:
-->
<template>
  <div
    id="finishedCheck"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container :title="$t('codeCard.title1')">
      <el-row class="btnList">
        <el-button
          type="success"
          @click="pass"
          :disabled="!selectList.length || this.form.clothState === 2"
          v-hasPerm="['quality:finishedCheck:audit']"
          >{{$t("public.audit")}}</el-button
        >
        <el-button type="primary" @click="query" v-hasPerm="['quality:finishedCheck:list']">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="outExcel" v-hasPerm="['quality:finishedCheck:export']">{{$t("public.export")}}</el-button>
        <el-button type="primary" @click="print" :disabled="!selectList.length" v-hasPerm="['quality:finishedCheck:print']"
          >{{$t("public.print")}}</el-button
        >
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
          :summary-method="summaryMethod"
          @selection-change="selectionChange"
          @sort-change="sortChange"
        >
          <template slot="menu">
            <el-button
              size="small"
              type="primary"
              @click="passOne"
              :disabled="this.form.clothState != '1'"
              >{{$t("public.pass")}}</el-button
            >
          </template></avue-crud
        >
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {
  get,
  add,
  update,
  del,
  getJob,
  updateNote,
  addInWhse,
  addInDtla,
  addInDtlb,
} from "./api";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 1,
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      // let { prop, order } = this.sort;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      // order
      //   ? (this.form.sort = prop + (order == "descending" ? ",1" : ",0"))
      //   : (this.form.sort = "storeLoadCode,1");
      let r_clothCheckTime_r = "";
      if (this.form.clothCheckTime && this.form.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${this.form.clothCheckTime[0]} 07:30:00~${this.form.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      this.form.vatNo = "%" + (this.form.vatNo ? this.form.vatNo : "");
      this.form.clothChecker =
        "%" + (this.form.clothChecker ? this.form.clothChecker : "");
      let data = JSON.parse(JSON.stringify(this.form));
      data.clothCheckTime = null;
      get(
        Object.assign(data, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: 1, // 已打印
          cardType: 1,
          delFlag: false,
        }),
        r_clothCheckTime_r
      ).then((res) => {
        this.crud = res.data.records;
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.crud.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1;
        });
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        setTimeout(() => {
          if (this.form.vatNo.indexOf("%") != -1) {
            this.form.vatNo = this.form.vatNo.split("%")[1] || "";
          }
          if (this.form.clothChecker.indexOf("%") != -1) {
            this.form.clothChecker = this.form.clothChecker.split("%")[1] || "";
          }
          this.wLoading = false;
        }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
    },
    pass() {
      this.$tip
        .cofirm(this.$t("codeCard.passCofirm"))
        .then(() => {
          this.selectList.forEach((item, i) => {
            item.clothState = 2;
            update(item).then((res) => {
              if (i == this.selectList.length - 1) {
                this.setInWhse();
              }
            });
          });
        })
        .catch(() => {});
    },
    print() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.setCz();
        this.$tip.warning(this.$t('tipLabel.clientError'));
        return;
      }
      this.selectList.forEach((item, i) => {
        this.spowerClient.send("print=finishCard:" + item.cardId);
        if (i == this.selectList.length - 1) {
          this.$tip.success(this.$t('public.sendPrintTle'));
        }
      });
    },
    outExcel() {
      this.$refs.crud.rowExcel();
    },
    setInWhse() {
      baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
        let data = {
          yinId: res.data.data,
          sysCreated: this.$getNowTime("datetime"),
          yinDate: this.$getNowTime("date"),
          yinType: 1,
          yinStatus: 0,
          sysCreatedby: this.$store.state.userOid,
          finStatus: 0,
        };
        addInWhse(data).then((inwhse) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          const inwhseId = inwhse.data.data;
          baseCodeSupplyEx({ code: "cpb_in_whse" }).then((pbIn) => {
            this.selectList.forEach((item, i) => {
              addInDtla({
                batchNo: item.vatNo,
                weight: item.netWeight,
                countingNo: item.pidNo,
                weightUnit: item.weightUnit,
                whseFinishedclothinFk: inwhseId,
                locationCode: item.storeSiteCode,
              }).then((dtla) => {});
              if (i == this.selectList.length - 1) {
                this.query();
                this.$tip.success(this.$t("public.auditSuccess"));
              }
            });
            baseCodeSupply({ code: "cpb_in_whse" }).then((res) => {});
          });
        });
      });
    },
    passOne() {
      this.$tip
        .cofirm(this.$t("codeCard.passCofirm"))
        .then(() => {
          this.detail.clothState = 2;
          update(this.detail)
            .then((res) => {
              if (res.data.code == 200) {
                this.query();
                this.$tip.success(this.$t("public.auditSuccess"));
              } else {
                this.$tip.error(this.$t("public.auditFail"));
              }
            })
            .catch((e) => {
              this.$tip.error(this.$t("public.auditFail") + e);
            });
        })
        .catch(() => {});
    },
    save() {
      this.wLoading = true;
      this.crud.forEach((item, i) => {
        update(item).then((res) => {
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.save"));
            }, 200);
          }
        });
      });
    },
    group(arr, type) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai[type]]) {
          dest.push({
            [type]: ai[type],
            data: [ai],
          });
          map[ai[type]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[type] == ai[type]) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    cellClick(val) {
      this.detail = val;
    },
    sortChange(val) {
      this.sort = val;
      this.query();
    },
    selectionChange(list) {
      this.selectList = list;
    },
    summaryMethod({ columns, data }) {
      const sums = [];
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          if (index == 0) {
            sums[index] = this.$t("total");
          }
          if (index == 2) {
            let num = 0;
            this.selectList.forEach((item) => {
              num += Number(item.netWeight);
            });
            sums[index] = this.$t("note.weight4") + num.toFixed(1);
            this.checkSum = num.toFixed(1);
          }
        });
      }
      return sums;
    },
    setCz() {
      this.spowerClient = this.$store.state.spowerClient;
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
  created() {},
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setCz();
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#finishedCheck
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
</style>
