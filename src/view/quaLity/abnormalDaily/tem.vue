<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-17 09:13:58
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\tem.vue
 * @Description:
-->
<template>
  <div class="qcAbnormalDaily">
    <view-container :title="$t('abnormalDaily.title2')" :element-loading-text="$t('public.loading')"
                    v-loading="loading">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Lưu lại" placement="bottom">
          <el-button type="success" @click="handleSave">{{ $t("public.save") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="In báo cáo bất thường" placement="bottom">
          <el-button type="primary" @click="handleCreateAbnormal" v-if="qcCheckPlanFormData.detailId">
            {{ $t("abnormalDaily.print1") }}
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="In đơn sửa chữa" placement="bottom">
          <el-button type="primary" @click="handleCreateOrder" v-if="qcCheckPlanFormData.detailId">
            {{ $t("abnormalDaily.print2") }}
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
          <el-button type="warning" @click="handleClose">{{ $t("public.close") }}</el-button>
        </el-tooltip>
      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcCheckPlanFormOp" v-model="qcCheckPlanFormData">
          <template slot-scope="scope" slot="vatNo">
            <el-select v-model="qcCheckPlanFormData.vatNo" filterable remote reserve-keyword clearable
                       default-first-option :placeholder="$t('tipLabel.inputVatNo')" :remote-method="remoteMethod"
                       :loading="vatLoading" @change="handleVatnoChange">
              <el-option v-for="item in options" :key="item.runJobId" :label="item.vatNo" :value="item.vatNo">
              </el-option>
            </el-select>
          </template>
        </avue-form>
        <el-row class="qcAbnormalDaily-list">
          <el-col :span="qcCheckPlanFormData.divdVatFlag == '1' ? 18 : 24">
            <avue-form :option="qcAbnormalForm" v-model="qcCheckPlanFormData" style="margin-top: -10px"></avue-form>
          </el-col>
          <el-col :span="6" v-if="qcCheckPlanFormData.divdVatFlag =='1'">
            <div class="qcAbnormalDaily-button">
              <i class="el-icon-circle-plus-outline" @click="handleAdd"></i>
              <i class="el-icon-remove-outline" @click="handleDel"></i>
            </div>
            <avue-crud ref="qcAbnormalDailyCrud" :option="abnormalDailyCrudOp" :data="abnormalDailyCrudData"
                       @row-click="rowClick">
            </avue-crud>
          </el-col>
        </el-row>
      </div>
      <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
              @close="choiceV = false" v-if="choiceV"></choice>
    </view-container>
  </div>
</template>
<script>
import {
  fetchQcCheckClothDayDetailByPage,
  addQcCheckClothDayDetail,
  updateQcCheckClothDayDetail,
  getRunJobByPage,
  getFinishedNoteList,
  fetchQcClothBackRepairByPage,
  updateQcClothBackRepair,
  addQcClothBackRepair,
  saveOrupdateDayDetailCard,
  fetchQcCheckClothDayDetailCardData,
  removeQcCheckClothDayDetailCard
} from "./api.js";
import choice from "@/components/proMng/index";
import {mainCrud, qcAbnormalRemarkFormOp, qcAbnormalCrud} from "./data.js";
import {get as fetchQcCheckoutFabricByPage} from "../qcDetailReport/api"
import v1 from "uuid/v1";

export default {
  components: {
    choice
  },
  props: {},
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcAbnormalForm: qcAbnormalRemarkFormOp(this),
      qcCheckPlanFormOp: mainCrud(this),
      qcCheckPlanFormData: {},
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false,
      options: [],
      abnormalDailyCrudOp: qcAbnormalCrud(this),
      abnormalDailyCrudData: [],
      choiceV: false,
      choiceTle: this.$t("choiceTem.finishedNote"),
      choiceQ: {},
      cellClickData: {}
    };
  },
  watch: {
    abnormalDailyCrudData(n, o) {
      if (n.length) {
        this.$nextTick(() => {
          this.$refs.qcAbnormalDailyCrud.doLayout();
        })
      }
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.remoteMethod("");
  },
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
        page: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.qcCheckPlanFormData.custId = res.data.records[0].custCode;
            this.qcCheckPlanFormData.fabName = res.data.records[0].fabName;
            this.qcCheckPlanFormData.colorName = res.data.records[0].colorName;
            this.getVatNoWeightAndSumpid(res.data.records[0].vatNo)
          } else {
            this.vatLoading = false;
          }
        });
      });
    },
    handleVatnoChange(vatNo) {
      this.loading = true
      this.abnormalDailyCrudData = [];
      getRunJobByPage({
        vatNo,
        rows: 10,
        start: 1,
        page: 1,
      }).then((vatRes) => {
        if (vatRes.data.records.length) {
          let data = vatRes.data.records[0];
          this.qcCheckPlanFormData.salPo = data.salPoNo;
          this.qcCheckPlanFormData.deliveryDate = data.deliveDate;
          this.qcCheckPlanFormData.custId = data.custCode;
          this.qcCheckPlanFormData.fabName = data.fabName;
          this.qcCheckPlanFormData.colorName = data.colorName;
          this.getVatNoWeightAndSumpid(data.vatNo)
        } else {
          this.loading = false
        }
      })
    },
    getVatNoWeightAndSumpid(vatNo) {
      getFinishedNoteList({vatNo: vatNo, cardType: 1, delFlag: 0}).then(res => {
        if (!res.data.length) {
          this.qcCheckPlanFormData.chkQty = 0
          this.qcCheckPlanFormData.checkPcount = 0
          this.vatLoading = false;
          this.loading = false
          return
        }
        this.qcCheckPlanFormData.chkQty = res.data.reduce((pre, cur) => {
          return pre + cur.netWeight
        }, 0)
        this.qcCheckPlanFormData.checkPcount = res.data.length
        this.vatLoading = false;
        this.loading = false
      })
    },
    async initData(detailId) {
      this.loading = true;
      this.abnormalDailyCrudData = [];
      fetchQcCheckClothDayDetailByPage({
        detailId,
      })
        .then(async (res) => {
          if (!res.data.total) {
            this.handleClose();
            return;
          }
          res.data.total && (this.qcCheckPlanFormData = res.data.records[0]);
          this.$nextTick(() => {
            this.qcCheckPlanFormOp.column[18].display = this.qcCheckPlanFormData.divdVatFlag == "0" ? false : true;
            this.qcAbnormalForm.column[0].rules = this.qcCheckPlanFormData.divdVatFlag == "1" ? [{
              required: true,
              message: '',
              trigger: "blur"
            }] : []
            this.qcAbnormalForm.column[2].rules = this.qcCheckPlanFormData.divdVatFlag == "1" ? [{
              required: true,
              message: '',
              trigger: "blur"
            }] : []
          })
          this.abnormalDailyCrudData = await fetchQcCheckClothDayDetailCardData({detailIdFk: this.qcCheckPlanFormData.detailId}).then(res => res.data)
          this.abnormalDailyCrudData = this.abnormalDailyCrudData.sort((a, b) => a.pidNo - b.pidNo);
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    addAndcreateData(detailId) {
      if (detailId) {
        return this.initData(detailId);
      }
      this.abnormalDailyCrudData = [];
      // 初始化新增数据
      this.qcCheckPlanFormData = {
        detailId: '',
        checkPcount: null,
        chkTrblPcount: null,
        chkQty: null,
        sumTrblQty: null,
        salPo: '',
        vatNo: '',
        colorName: '',
        problemContent: '',
        custId: '',
        fabName: '',
        chargeDpt: '',
        problemDesc: '',
        solution: '',
        remark: '',
        divdVatFlag: false,
        followDpt: '',
        qcChecker: parent.userID,
        qcConfirDate: this.$getNowTime("datetime"),

      };
    },
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },
    handleSave() {
      this.$refs.qcCheckPlanForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.warning(this.$t("abnormalDaily.warning4"));
            return;
          }
          if (this.qcCheckPlanFormData.divdVatFlag == '1' && !this.qcCheckPlanFormData.problemDesc) {
            this.$tip.warning(this.$t("abnormalDaily.warning5"));
            done();
            return;
          }
          if (this.qcCheckPlanFormData.divdVatFlag == '1' && !this.qcCheckPlanFormData.solution) {
            this.$tip.warning(this.$t("abnormalDaily.warning6"));
            done();
            return;
          }
          if (this.qcCheckPlanFormData.divdVatFlag == '1' && this.qcCheckPlanFormData.divdVatType !== "07" && this.qcCheckPlanFormData.divdVatType !== "04" && this.qcCheckPlanFormData.divdVatType !== "05" && !this.abnormalDailyCrudData.length) {
            this.$tip.warning(this.$t("abnormalDaily.warning7"));
            done();
            return;
          }
          this.loading = true;
          let detailId = this.qcCheckPlanFormData.detailId;
          if (this.qcCheckPlanFormData.chargeDpt instanceof Array) {
            this.qcCheckPlanFormData.chargeDpt = this.qcCheckPlanFormData.chargeDpt.join(',')
          }

          if (detailId) {
            await updateQcCheckClothDayDetail(this.qcCheckPlanFormData)
          } else {
            this.qcCheckPlanFormData.checkDate = this.$getNowTime("datetime")
            let resData = await addQcCheckClothDayDetail(this.qcCheckPlanFormData);
            if (resData.data.code != 200) {
              setTimeout(() => {
                this.loading = false;
                done();
              }, 200);
              return this.$tip.warning(resData.data.msg);
            }
            detailId = resData.data.data
            this.qcCheckPlanFormData.detailId = detailId;
          }
          this.abnormalDailyCrudData.forEach((item) => {
            item.detailIdFk = detailId
          })
          if (this.abnormalDailyCrudData.length) {
            await saveOrupdateDayDetailCard(this.abnormalDailyCrudData);
          }
          this.hasRefresh = true;
          await this.initData(detailId);
          this.$tip.success(this.$t("public.bccg"));
          setTimeout(() => {
            this.loading = false;
            done();
          }, 200);
        } catch (err) {
          this.loading = false;
          this.$tip.error(err);
        }
      });
    },
    handleCreateAbnormal() {
      window.open(process.env.API_HOST + '/api/qcCheckClothDayDetail/qaDailyPdf?id=' + this.qcCheckPlanFormData.detailId); //row.detailId
    },
    async handleCreateOrder() {
      this.loading = true;
      let detailRes = await fetchQcClothBackRepairByPage({dayDetailfFk: this.qcCheckPlanFormData.detailId})
      let params = {
        dayDetailfFk: this.qcCheckPlanFormData.detailId,
        ...this.qcCheckPlanFormData
      }
      if (detailRes.data.total) {
        await updateQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + detailRes.data.records[0].repairId)
      } else {
        let addRes = await addQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + addRes.data.data)
      }
      this.loading = false;
    },
    rowClick(val) {
      this.cellClickData = val;
    },
    async handleAdd() {
      if (!this.qcCheckPlanFormData.vatNo) {
        this.$tip.warning(this.$t("tipLabel.notCheckVat"));
        return
      }
      // let checkoutFabric = await fetchQcCheckoutFabricByPage({vatNo: this.qcCheckPlanFormData.vatNo }).then(res => res.data.records);
      // if(checkoutFabric.length && checkoutFabric[0].whseVouch == 9) {
      //    return this.$tip.warning("该缸号已审核入仓,请联系仓库管理员退仓!")
      // }
      this.choiceQ = {
        vatNo: this.qcCheckPlanFormData.vatNo,
        productNo: "^^%",
        delFlag: false,
        fuzzy: "poNo",
        cardType: 1,
        hasWhseVouch: false
      }
      this.choiceV = true;
    },
    async handleDel() {
      if (!this.cellClickData || this.cellClickData.$index == undefined) {
        this.$tip.warning(this.$t("public.delTle"));
        return
      }
      if (!this.cellClickData.qcCheckClothDayDetailCardoid) {
        this.abnormalDailyCrudData.splice(this.cellClickData.$index, 1);
        this.$refs.qcAbnormalDailyCrud.setCurrentRow();
        this.cellClickData = null;
      } else {
        try {
          this.$tip.cofirm(this.$t("tipLabel.deleteConfirm"))
            .then(async () => {
              this.loading = true;
              let delRes = await removeQcCheckClothDayDetailCard(this.cellClickData.qcCheckClothDayDetailCardoid);
              if (delRes.data.code == 200) {
                this.abnormalDailyCrudData.splice(this.cellClickData.$index, 1);
                this.$refs.qcAbnormalDailyCrud.setCurrentRow();
                this.cellClickData = null;
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
              this.loading = false;
            })
            .catch((err) => {
              this.$tip.warning(this.$t("public.qxcz"));
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async choiceData(list) {
      if (!list.length) {
        this.$tip.warning(this.$t("tipLabel.notCheckData"))
        return;
      }
      let addData = list.map((item, i) => {
        return {
          cardIdFk: item.cardId,
          detailIdFk: this.qcCheckPlanFormData.detailId,
          pidNo: item.pidNo,
          netWeight: item.netWeight,
          qcCheckClothDayDetailCardoid: v1()
        }
      })
      this.abnormalDailyCrudData = this.$unique(this.abnormalDailyCrudData.concat(addData), "cardIdFk");
      this.choiceV = false;
    },
    handleClose() {
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    },
  },
};
</script>
<style lang="stylus">

.qcAbnormalDaily {
  .el-form .avue-group, {
    border: none !important;
  }

  .qcAbnormalDaily-button {
    font-size: 28px;
    color: #409EFF

    i {
      padding: 0 2px
    }
  }
}
</style>
