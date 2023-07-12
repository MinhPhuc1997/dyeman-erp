<!--
 * @Author: Lyl
 * @Date: 2022-08-31 08:20:31
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-01-06 10:21:27
 * @FilePath: \iot.vue\src\view\proMng\print\proWeaveJob\useYarns.vue
 * @Description:
-->
<template>
  <div class="useYarns">
    <el-dialog :visible.sync="visible" fullscreen append-to-body :element-loading-text="$t('public.loading')" v-loading="wLoading">
        <view-container :title="$t('weaveJob.useYarnTle')">
          <el-row class="btnList">
            <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
              <el-button @click="handleSave" type="success" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.save") }}</el-button>
            </el-tooltip>
            <template v-if="jobType==2">
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="handleAddUseYarn" type="primary" :disabled="weaveJobInfo.weaveState == 2" v-hasPerm="['proMng:proWeaveJob:useYarnAdd']">{{ $t("public.add") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="handleDelUseYarn" type="danger" :disabled="weaveJobInfo.weaveState == 2" v-hasPerm="['proMng:proWeaveJob:useYarnDel']">{{ $t("public.del") }}</el-button>
              </el-tooltip>
            </template>
            <template v-else>
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="handleAddUseYarn" type="primary" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.add") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="handleDelUseYarn" type="danger" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.del") }}</el-button>
              </el-tooltip>
            </template>
            <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
              <el-button @click="visible = false" type="warning">{{  $t("public.close") }}</el-button>
            </el-tooltip>
          </el-row>
          <avue-crud
            ref="useYarnsCrud"
            v-loading="useLoading"
            :option="useYarnsCrudOp"
            :data="useYarnsCrudData"
            :page.sync="page"
            @current-row-change="handleCellClick">
          </avue-crud>
        </view-container>
        <view-container :title="$t('weaveJob.useYarnTle1')">
          <el-row class="btnList"  v-if="isPeShaDpt">
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
              <el-button @click="handleAdd" type="primary" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.add") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDelYarnAllot" type="danger" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.del") }}</el-button>
            </el-tooltip>
          </el-row>
          <avue-crud
            ref="weaveJobyarnallotCrud"
            v-loading="allotLoading"
            :option="weaveJobyarnallotCrudOp"
            :data="rowSelectData.weaveJobyarnallotCrudData"
            @current-row-change="handleAllotCellClick">

            <template slot="factoryYarnBatch" slot-scope="{row}">
              <el-popover placement="right-end" width="200" trigger="hover" @show="handleShowTryResult(row)">
                <span>公司结论：{{ row.tryResult || '' }}</span>
                <span slot="reference" >{{ row.factoryYarnBatch }}</span>
              </el-popover>
            </template>
          </avue-crud>
        </view-container>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
      @close="choiceV = false" v-if="choiceV"></choice>
  </div>
</template>

<script>
import choice from "@/components/proMng/index";
import { yarnCrud, weaveJobyarnallotCrud } from "./data"
import { getYarn, addYarn, updateYarn, delYarn, fetchProWeaveJobYarnallotData, createProWeaveJobYarnallotData, updateProWeaveJobYarnallotData, removeProWeaveJobYarnallotData } from "./api"
import { judgeHasPsDpt, fetchResultByBatchNo } from "./api"
import {CheckPermissonDisabled} from "../../../../utils/tools";
export default {
  components: {
    choice
  },
  props: {
    weaveJobInfo: {},
    jobType:String
  },
  data() {
    return {
      visible: false,
      wLoading: true,
      useLoading: false,
      allotLoading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      useYarnsCrudOp: yarnCrud(this),
      useYarnsCrudData: [],
      weaveJobyarnallotCrudOp: weaveJobyarnallotCrud(this),
      weaveJobyarnallotCrudData: [],
      rowSelectData: {
        weaveJobyarnallotCrudData: []
      },
      allotRowSelectData: null,
      choiceV: false,
      choiceTle: this.$t("choiceTem.yarnStock"),
      choiceQ: {},

      // 是否为配纱部门
      isPeShaDpt: false,
    };
  },
  watch: {
    rowSelectData(n,o){
      if(this.jobType==2 &&  !CheckPermissonDisabled("proMng:proWeaveJob:editUseYarn")){
        if (n) n.$cellEdit = true;
        if (o) o.$cellEdit = false;
      }
      if(this.jobType!=2) {
        if (n) n.$cellEdit = true;
        if (o) o.$cellEdit = false;
      }
    },
    allotRowSelectData(n,o){
      if (n) n.$cellEdit = true;
      if (o) o.$cellEdit = false;
    }
  },
  computed: {},
  created() {
    this.judgeDptIsPeSha();
    console.log(this.weaveJobInfo);
  },
  mounted() {},
  updated() {
    this.$nextTick(() => {
      this.rowSelectData.weaveJobyarnallotCrudData && this.rowSelectData.weaveJobyarnallotCrudData.length && this.$refs["weaveJobyarnallotCrud"].doLayout();
    });
  },
  methods: {
    handleShowTryResult(row){
        if(row.tryResult) return;
        fetchResultByBatchNo({batchNo: row.factoryYarnBatch}).then(res => {
          this.$set(row, "tryResult", res.data.data || "无")
        })
    },
    // 判断是否为配纱部门
    judgeDptIsPeSha(){
      judgeHasPsDpt().then(res => {
        this.isPeShaDpt = res.data.data != 0
      })
    },
    async initData() {
      this.useLoading = true;
      this.rowSelectData = {};
      this.useYarnsCrudData = [];
      let params = {
        proWeaveJobFk: this.weaveJobInfo.weaveJobId,
        rows: this.page.pageSize,
        start: this.page.currentPage,
      }
      let yarnsData = await getYarn(params);
      this.useYarnsCrudData = yarnsData.data.records.sort((a,b) => a.sn - b.sn);
      this.page.total = yarnsData.data.total;
      this.useYarnsCrudData.length && this.$refs.useYarnsCrud.setCurrentRow();
      this.useLoading = false;
      this.wLoading = false;
    },
    async fetchYarnAllotData() {
      if(!this.rowSelectData.weaveJobyarnallotCrudData){
        this.rowSelectData.weaveJobyarnallotCrudData =  [];
      }
      if(!this.rowSelectData.useYarnId ){
        return
      }
      if(this.rowSelectData.weaveJobyarnallotCrudData.length > 0){
        this.rowSelectData.weaveJobyarnallotCrudData.length && this.$refs.weaveJobyarnallotCrud.setCurrentRow(this.rowSelectData.weaveJobyarnallotCrudData[0]);
        return;
      }
      this.allotLoading = true;
      let allotData = await fetchProWeaveJobYarnallotData( { jobYarnFk: this.rowSelectData.useYarnId });
      this.rowSelectData.weaveJobyarnallotCrudData = []
      this.rowSelectData.weaveJobyarnallotCrudData = allotData.data;
      this.rowSelectData.weaveJobyarnallotCrudData.forEach((item,i) =>{
        item.unit = this.rowSelectData.unit;
      })
      this.rowSelectData.weaveJobyarnallotCrudData.length && this.$refs.weaveJobyarnallotCrud.setCurrentRow(this.rowSelectData.weaveJobyarnallotCrudData[0]);
      this.allotLoading = false;
    },
    async handleSave() {
      // let validRes = await this.saveValid();
      // if(!validRes) return;
      if(!this.useYarnsCrudData.length) return;
      try {
          this.useYarnsCrudData.forEach(async (item, i) =>{
          this.wLoading = true;
          let data = JSON.parse(JSON.stringify(item));
          data.weaveJobyarnallotCrudData = [];
          if(data.useYarnId){
            await updateYarn(data);
            if (item.weaveJobyarnallotCrudData) {
              await item.weaveJobyarnallotCrudData.forEach(async (allot) =>{
              if(allot.detailId){
                updateProWeaveJobYarnallotData(allot);
              }else{
                allot.jobYarnFk = data.useYarnId;
                let allotRes = await createProWeaveJobYarnallotData(allot);
                allot.detailId = allotRes.data.data;
              }
            })
            }
          }else{
            data.proWeaveJobFk = this.weaveJobInfo.weaveJobId;
            let addRes = await addYarn(data);
            item.useYarnId = addRes.data.data;
            if (item.weaveJobyarnallotCrudData) {
              await item.weaveJobyarnallotCrudData.forEach(async (allot) =>{
                if(allot.detailId){
                  updateProWeaveJobYarnallotData(allot);
                }else{
                  allot.jobYarnFk = addRes.data.data;
                  let allotRes = await createProWeaveJobYarnallotData(allot);
                  allot.detailId = allotRes.data;
                }
              })
            }
          }
          if(i == this.useYarnsCrudData.length - 1){
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);

          }
        })
      } catch (error) {
        this.wLoading = false;
      }


    },
    saveValid() {
      for (let i = 0; i < this.useYarnsCrudData.length; i++) {
       if(!this.useYarnsCrudData[i].amount){
        this.$tip.warning(this.$t("weaveJob.saveYarnTle"))
          return false;
        }
      }
      return true
    },
    handleAdd() {
      if (!this.rowSelectData.yarnCode) {
        this.$tip.warning(this.$t("weaveJob.addYarnTle"))
        return;
      }
      this.choiceQ.yarnsId = this.rowSelectData.yarnCode;
      this.choiceTle = this.$t("choiceTem.yarnStock");

      this.choiceV = true;
    },
    handleAddUseYarn() {
      this.choiceQ.yarnsId = "";
      this.choiceQ.sortF = "yarnsId"
      this.choiceQ.fuzzy = "yarnsId,yarnsName,batchNo,locationCode"
      this.choiceTle = this.$t("choiceTem.yarnData");
      this.choiceV = true;
    },
    handleDelUseYarn() {
      if(this.rowSelectData.weaveJobyarnallotCrudData.length) return this.$tip.warning("请先删除用纱分配信息!")
      this.$tip.cofirm(this.$t("tipLabel.delYarnCode") + this.rowSelectData.yarnCode + this.$t("tipLabel.delEnd"))
        .then(async () => {
          this.wLoading = true;
          let allowDel = true;
          if (!this.rowSelectData.useYarnId) {
            this.$tip.success(this.$t("public.sccg"));
          }else{
            await delYarn(this.rowSelectData.useYarnId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(res.data.msg || this.$t("public.scsb"));
                allowDel = false;
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
          }
          if(allowDel){
            this.useYarnsCrudData.splice(this.rowSelectData.sn - 1, 1);
            this.useYarnsCrudData.forEach((item,i) =>{
              item.sn = i + 1;
            })
            this.useYarnsCrudData.length && this.$refs.useYarnsCrud.setCurrentRow();
          }
          this.wLoading = false;
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },

    handleDelYarnAllot(){
      this.$tip.cofirm(this.$t("tipLabel.delYarnBatch") + this.allotRowSelectData.factoryYarnBatch + this.$t("tipLabel.delEnd"))
        .then(async () => {
          this.wLoading = true;
          if (!this.allotRowSelectData.detailId) {
            this.$tip.success(this.$t("public.sccg"));
          }else{
            await removeProWeaveJobYarnallotData(this.allotRowSelectData.detailId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
          }
          this.rowSelectData.weaveJobyarnallotCrudData.splice(this.allotRowSelectData.sn - 1, 1);
          this.rowSelectData.weaveJobyarnallotCrudData.forEach((item,i) =>{
            item.sn = i + 1;
          })
          this.rowSelectData.weaveJobyarnallotCrudData.length && this.$refs.weaveJobyarnallotCrud.setCurrentRow();
          this.wLoading = false;
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },

    handleCellClick(row) {
      if(!row) return;
      this.rowSelectData = row;
      this.fetchYarnAllotData();
    },
    handleAllotCellClick(row) {
      this.allotRowSelectData = row;

    },
    choiceData(list) {
      this.wLoading = true;
      if(this.choiceTle == this.$t("choiceTem.yarnStock")) {
        list.forEach((item) => {
          this.rowSelectData.weaveJobyarnallotCrudData.push({
            sn:  this.rowSelectData.weaveJobyarnallotCrudData.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            realAmount: 0,
            unit: this.rowSelectData.unit || 'KG'
          });
        });
      }else{
        list.forEach((item) => {
          this.useYarnsCrudData.push({
            sn: this.useYarnsCrudData.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            amount: 0,
            realAmount: 0,
            lossRate: 0,
            yarnRatio: 0,
            unit: "KG"
          });
        });
      }
      setTimeout(() => {
        this.choiceV = false;
        this.wLoading = false;
      }, 200);
    }
  },
};
</script>
<style lang="stylus" scoped>
.useYarns{

}
</style>
