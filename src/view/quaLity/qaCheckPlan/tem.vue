<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-14 18:00:34
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\tem.vue
 * @Description:
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container :title="$t('checkPlan.title2')" :element-loading-text="$t('public.loading')" v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcCheckPlanFormOp" v-model="qcCheckPlanFormData">
          <template slot="vatNo">
            <el-select v-model="qcCheckPlanFormData.vatNo" filterable remote reserve-keyword clearable
              default-first-option :placeholder="$t('tipLabel.inputVatNo')" :remote-method="remoteMethod"
              :loading="vatLoading" @change="vatChange">
              <el-option v-for="item in vatOptions" :key="item.runJobId" :label="item.vatNo" :value="item.vatNo"/>
            </el-select>
          </template>
        </avue-form>
      </div>
      <view-container :title="$t('checkPlan.title3')">
        <div class="btnList">
          <!-- <el-button type="primary" @click="handleStoreAdd">{{ this.$t("public.add") }}</el-button> -->
          <el-button type="danger" @click="handleStoreDel">{{ this.$t("public.del") }}</el-button>
          <el-button type="primary" @click="handleStoreImport"> {{ $t("checkPlan.btn1") }} </el-button>
        </div>
        <div class="crudBox">
          <avue-crud ref="qcCheckStorePlanCrud" :option="qcCheckStorePlanCrudOp" :data="qcCheckStorePlanList"
            @row-click="handleStoreRowClick"></avue-crud>
        </div>
      </view-container>
    </view-container>
  </div>
</template>

<script>
import {
  fetchQcCheckPlanByPage,
  fetchBleadyeRunJobByPage,
  fetchFinishedNote,
  removeQcCheckStoreData,
  addQcCheckPlanData,
  updateQcCheckPlanData,
  fetchQcCheckStorePlan,
  addQcCheckStorePlanData,
  updateQcCheckStorePlanData,
  fetchInWhseStore,
} from "./api.js";
import { mainCrud, qcCheckStorePlanCrud } from "./data.js";
export default {
  components: {
  },
  props: {
    planId: String,
  },
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcCheckPlanFormOp: mainCrud(this),
      qcCheckPlanFormData: {},
      qcCheckStorePlanCrudOp: qcCheckStorePlanCrud(this),
      qcCheckStorePlanList: [],
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false,
      choiceV: false,
      choiceTle: "选择在库载具",
      noteList: []
    };
  },
  watch: {
    qcCheckStorePlanList(n, o) {
      n.forEach((item, i) => {
        item.waitOutSn = i + 1;
      });
      this.qcCheckPlanFormOp.column[8].dicData = n.reduce((pre, cur) => {
        return pre.concat(cur.piNos.split(",").map(item => { return { label: item, value: item } }));
      }, [])
    },
  },
  computed: {},
  created() { },
  mounted() {
  },
  methods: {
    async initData(planId) {
      this.loading = true;
      fetchQcCheckPlanByPage({
        planId,
      })
        .then(async (res) => {
          res.data.total && (this.qcCheckPlanFormData = res.data.records[0]);
          this.qcCheckStorePlanList = [];
          let storeRes = await fetchQcCheckStorePlan({
            qcCheckPlanFk: this.qcCheckPlanFormData.planId,
          });
          if (storeRes.data.length) {
            this.qcCheckStorePlanList = storeRes.data
              .sort((a, b) => a.waitOutSn - b.waitOutSn)
              .map((item) => Object.assign(item, { $cellEdit: true }));
            await this.$nextTick();
            this.$refs["qcCheckStorePlanCrud"].doLayout();
          }
          this.dtlCurIdx = null;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    addAndcreateData(planId) {
      if (planId) {
        return this.initData(planId);
      }
      // 初始化新增数据
      let planDate, planStart, planEnd;
      planDate = planStart = planEnd = this.$getNowTime("datetime");
      this.qcCheckPlanFormData = {
        planDate,
        planStart,
        planEnd,
        storeCodes: "",
        sumPid: "",
        samplCount: 0,
        vatNo: "",
        planId: null,
        sumNw: null,
        planRate: null,
        overQty: null,
        overPidCount: null,
        pidNos: null,
        exceptQty: null,
        exceptDesc: "",
        inFlag: false,
        exceptPidCount: null
      };
      this.qcCheckStorePlanList = [];
    },
    async remoteMethod(val) {
      this.vatLoading = true;
      fetchBleadyeRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
        delFlag: false,
      }).then((res) => {
        this.vatOptions = res.data.records;
        this.vatLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.loading = true;
            this.qcCheckPlanFormData.vatNo = res.data.records[0].vatNo;
            this.vatChange();
          }
        });
      });
    },
    vatChange(val) {
      fetchBleadyeRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
      })
        .then(async (res) => {
          // 总疋数,总重量
          this.vatList = res.data.records;
          let params = { vatNo: this.qcCheckPlanFormData.vatNo, cardType: 1 };
          this.noteList = await fetchFinishedNote(params).then(res => { return res.data });
          this.qcCheckPlanFormData.sumPid = this.noteList.length;
          this.qcCheckPlanFormData.sumNw = (this.noteList.reduce((pre, cur) => { return pre + cur.netWeight }, 0)).toFixed(2)
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },
    handleSave() {
      this.$refs.qcCheckPlanForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.warning(this.$t("checkPlan.warning1"));
            return;
          }
          this.loading = true;
          let planId = this.qcCheckPlanFormData.planId;
          this.qcCheckPlanFormData.pidNos = this.qcCheckPlanFormData.pidNos.toString();
          if (planId) {
            updateQcCheckPlanData(this.qcCheckPlanFormData)
              .finally(() => {
                done();
              })
          } else {
            planId = await addQcCheckPlanData(this.qcCheckPlanFormData).then(
              (res) => {
                return res.data.data;
              }
            ).finally(() => {
              done();
            })
            this.qcCheckPlanFormData.planId = planId;
          }
          this.hasRefresh = true;
          this.$tip.success(this.$t("public.bccg"));
          await this.saveCheckStorePlan();
          await this.initData(planId);
          this.loading = true;

        } catch (err) {
          this.loading = false;
          this.$tip.error(err);
        }
      });
    },
    async saveCheckStorePlan() {
      let proList = [];
      this.qcCheckStorePlanList.forEach((item) => {
        if (item.subPlanId) {
          proList.push(updateQcCheckStorePlanData(item));
        } else {
          item.qcCheckPlanFk = this.qcCheckPlanFormData.planId;
          proList.push(addQcCheckStorePlanData(item));
        }
      });
      return Promise.all(proList);
    },
    handleStoreAdd() {
      this.qcCheckStorePlanList.push({
        waitOutSn: this.qcCheckStorePlanList.length + 1,
        outFlag: false,
        returnFlag: false,
        $cellEdit: true,
        outTime: "",
        returnTime: "",
      });
    },
    async handleStoreDel() {
      if (!this.dtlCurIdx) {
        return this.$tip.warning(this.$t("public.delTle"));
      }
      let idx = this.dtlCurIdx - 1;
      if (!this.qcCheckStorePlanList[idx].subPlanId) {
        this.qcCheckStorePlanList.splice(idx, 1);
        this.dtlCurIdx = null;
        this.$refs.qcCheckStorePlanCrud.setCurrentRow();
        return;
      }
      let cofResult = await this.$tip
        .cofirm(
          this.$t("checkPlan.delTle") +
          this.qcCheckStorePlanList[idx].storeLoadCode +
          this.$t("tipLabel.delEnd")
        )
        .then(() => {
          return true;
        })
        .catch((e) => {
          return false;
        });
      if (!cofResult) return false;
      this.loading = true;
      removeQcCheckStoreData(this.qcCheckStorePlanList[idx].subPlanId)
        .then((res) => {
          let delRes = res.data;
          if (delRes.code != 200) {
            this.$tip.error(this.$t("public.scsb") + res.data.msg);
            return;
          }
          this.qcCheckStorePlanList.splice(idx, 1);
          this.$tip.success(this.$t('public.sccg'));
          this.dtlCurIdx = null;
          this.$refs.qcCheckStorePlanCrud.setCurrentRow();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async handleStoreImport() {
      if (!this.qcCheckPlanFormData.vatNo) {
        this.$tip.warning(this.$t("tipLabel.notCheckVat"));
        return;
      }
      let inWhseStoreList = await fetchInWhseStore({ vatNo: this.qcCheckPlanFormData.vatNo }).then(res => { return res.data });
      !inWhseStoreList.length && this.$tip.warning(this.$t("checkPlan.warning2"));
      this.qcCheckPlanFormData.inFlag = inWhseStoreList.length ? true : false;
      inWhseStoreList.forEach((item) => {
        this.qcCheckStorePlanList.push({
          waitOutSn: this.qcCheckStorePlanList.length + 1,
          storeLoadCode: item.palletCode,
          pidCount: item.piiCount,
          piNos: item.pidNos,
          outFlag: false,
          returnFlag: false,
          $cellEdit: true,
          outTime: "",
          returnTime: "",

        });
      });
      this.qcCheckStorePlanList = this.$unique(
        this.qcCheckStorePlanList,
        "storeLoadCode"
      );
    },
    handleClose() {
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    },
  },
};
</script>
<style lang="stylus">
</style>
