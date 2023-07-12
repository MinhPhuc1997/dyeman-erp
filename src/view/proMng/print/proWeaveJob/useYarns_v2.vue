<!--
 * @Author: Lyl
 * @Date: 2022-08-31 08:20:31
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-04 09:16:15
 * @FilePath: \iot.vue\src\view\proMng\print\proWeaveJob\useYarns.vue
 * @Description: 
-->
<template>
  <div class="useYarns">
    <el-dialog :visible.sync="visible" fullscreen append-to-body :element-loading-text="$t('public.loading')" v-loading="wLoading">
        <view-container :title="$t('weaveJob.useYarnTle')">
          <el-row class="btnList">
            <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
              <el-button @click="handleSave()" type="success" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.save") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
              <el-button @click="handleAddUseYarn" type="primary" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.add") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDelUseYarn" type="danger" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.del") }}</el-button>
            </el-tooltip>
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
          <el-row class="btnList" v-if="isPeShaDpt">
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
              <!-- <el-button @click="handleAdd" type="primary" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.add") }}</el-button> -->
              <el-button @click="handlePreAdd" type="primary" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.add") }}(预分配)</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
              <el-button @click="handleStockAdd" type="primary" :disabled="weaveJobInfo.weaveState == 2">{{ $t("public.add") }}(未分配库存)</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDelYarnAllot" type="danger" >{{ $t("public.del") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Xác nhận" placement="top-start">
              <el-button @click="handleAllocConfirm" type="success"  >分配确认</el-button>
            </el-tooltip>
          </el-row>
          <avue-crud 
            ref="weaveJobyarnallotCrud" 
            v-loading="allotLoading" 
            :option="weaveJobyarnallotCrudOp" 
            :data="rowSelectData.weaveJobyarnallotCrudData" 
            @current-row-change="handleAllotCellClick">
            <template slot="allocConfrim" slot-scope="{row}">
              <div>
                <span class="confirm-status" :class="[row.hasConfirm ? 'success' : 'danger']"></span>
              </div>
            </template>
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
      <!-- 占用数 (预分配) -->
      <inv-sel 
        matType="-2"
        ref="invSelRef_2"
        @data-select="handleInvDataSelect"
        :isMergeStorage="true"
        :showQueryForm="false"
        ></inv-sel>
      <!-- 未分配 -->
      <inv-sel 
        matType="-1"
        ref="invSelRef_1"
        @data-select="handleInvDataSelect"
        :isMergeStorage="true"
        :showQueryForm="false"
        ></inv-sel>
  </div>
</template>

<script>
import choice from "@/components/proMng/index";
import InvSel from "@/components/InventorySelect";
import { yarnCrud, weaveJobyarnallotCrud } from "./data"
import { fetchAllocConfirm, getYarn, addYarn, updateYarn, delYarn, fetchProWeaveJobYarnallotData, createProWeaveJobYarnallotData, updateProWeaveJobYarnallotData, removeProWeaveJobYarnallotData } from "./api"
import { fetchValidOutWeight, fetchConfirmValid, judgeHasPsDpt, fetchResultByBatchNo } from "./api"
export default {
  components: {
    choice,
    InvSel: InvSel
  },
  props: {
    weaveJobInfo: {}
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
  computed: {
    hasDelAllotItem(){
      return this.weaveJobInfo.weaveState == 2 || (this.allotRowSelectData || {}).hasConfirm
    }
  },
  watch: {
    rowSelectData(n,o){
      if (n) n.$cellEdit = true;
      if (o) o.$cellEdit = false;
    },
    allotRowSelectData(n,o){
      if (o) o.$cellEdit = false;
      // if(!this.isPeShaDpt || n.hasConfirm) return;
      if (n) n.$cellEdit = true;
    }
  },
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
        // this.isPeShaDpt = res.data.data != 0
        this.isPeShaDpt = res.data.data == 0
      })
    },
    // 分配确认
    async handleAllocConfirm(){

      await this.handleSave(false);

      let lotDataLen = this.rowSelectData.weaveJobyarnallotCrudData.length;
      if(lotDataLen == 0){
        return this.$tip.warning("纱线分配数据为空，请检查");
      }
      let isNullIdLen = this.rowSelectData.weaveJobyarnallotCrudData.filter(item => !item.detailId).length;
      if(isNullIdLen){
        return this.$tip.warning("存在未保存的数据，请检查");
      }
      // let hasConfirmLen = this.rowSelectData.weaveJobyarnallotCrudData.filter(item => item.hasConfirm).length;
      // if(hasConfirmLen === lotDataLen){
      //   return this.$tip.warning("分配数据均已确认");
      // }

      let hasNullAmount = this.rowSelectData.weaveJobyarnallotCrudData.filter(item => item.realAmount < 0).length;
      if(hasNullAmount > 0){
        return this.$tip.warning("存有分配数为负数的情况，请检查");
      }
      // 检验分配数是否超过
      let validRes = await this.confrimBeforeValid();

      if(!validRes) return false;
      
      // 开始处理逻辑
      this.$tip.cofirm("是否对该纱线的配纱进行确认").then(res => {
        let param = {
          jobYarnFk: this.rowSelectData.useYarnId
        }
        return fetchAllocConfirm(param)
      }).then(res => {
        this.rowSelectData.weaveJobyarnallotCrudData = [];
        this.fetchYarnAllotData();
      })

    },

    // 确认前检验
    async confrimBeforeValid(){
      // 两个源头进行对比检验  订单分配-  库存分配
      let preAllocValidData = {},
          storageValidData = {};
      let { yarnCode  } = this.rowSelectData;
      this.rowSelectData.weaveJobyarnallotCrudData.forEach(item => {
        let key = item.yarnBrand + item.yarnBatch + item.factoryYarnBatch + yarnCode
        if(item.origin == "1"){
          if(!preAllocValidData[key]){
            preAllocValidData[key] = {
              yarnNo: yarnCode,
              batId: item.yarnBatch,
              batchNo: item.factoryYarnBatch,
              allocQty: +item.realAmount,
              poNo: this.weaveJobInfo.salPoNo,
              yarnCard: item.yarnBrand,
            }
          }else{
            preAllocValidData[key].allocQty += +item.realAmount
          }
        }else if(item.origin === '2'){
          if(!storageValidData[key]){
            storageValidData[key] = {
              yarnsId: yarnCode,
              batId: item.yarnBatch,
              batchNo: item.factoryYarnBatch,
              usableAmount: +item.realAmount,
              yarnsCard: item.yarnBrand,
            }
          }else{
            storageValidData[key].usableAmount += +item.realAmount
          }
        }
      })  

      let fetchParams = [
        fetchConfirmValid(Object.values(preAllocValidData)),
        fetchValidOutWeight(Object.values(storageValidData))
      ]

      let index = 0
      await Promise.all(fetchParams).then(resList => {
        let preDataList = resList[0].data.data;
        let usableDataList = resList[1].data.data || [];
        usableDataList.forEach((item ) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `预分配-纱线编号<strong>${item.yarnsId}【${item.batchNo}】</strong>剩余可用库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
          index ++;
        });

        preDataList.forEach((item ) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `未分配-纱线编号<strong>${item.yarnsId}【${item.batchNo}】</strong>剩余可分配数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
          index ++;
        });

      })

      return index == 0;

    },

    // 新增 - 预分配
    handlePreAdd(){
      this.choiceTle = this.$t("choiceTem.yarnStock");
      if(!this.rowSelectData.yarnCode) return this.$tip.warning(this.$t("weaveJob.addYarnTle"))
      this.invSelOrigin = "1";
      this.$refs.invSelRef_2.queryForm = {
        yarnNo: this.rowSelectData.yarnCode,
        poNo: this.weaveJobInfo.salPoNo
      }
      this.$refs.invSelRef_2.invSelDiaVisible = true;
      
    },
    // 新增 - 库存
    handleStockAdd(){
      this.choiceTle = this.$t("choiceTem.yarnStock");
       if(!this.rowSelectData.yarnCode) return this.$tip.warning(this.$t("weaveJob.addYarnTle"))
      this.invSelOrigin = "2";
      this.$refs.invSelRef_1.queryForm = {
        yarnsId: this.rowSelectData.yarnCode
      }
      this.$refs.invSelRef_1.invSelDiaVisible = true;
    },
    // 选择回调
    handleInvDataSelect(rows){
      let weightEnum = {
        1: "allocQty",
        2: "usableAmount"
      }
      rows.forEach(item => {
        item.weight = item[weightEnum[this.invSelOrigin]]
        item.yarnsName = item.yarnsName || item.yarnName;
        item.yarnsCard = item.yarnsCard || item.yarnCard;
      })
      this.choiceData(rows);
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
      let allocQuery = {
          jobYarnFk: this.rowSelectData.useYarnId,
          dataSortRules: "createDate|desc"
      }
      let allotData = await fetchProWeaveJobYarnallotData(allocQuery);
      this.rowSelectData.weaveJobyarnallotCrudData = []
      this.rowSelectData.weaveJobyarnallotCrudData = allotData.data;
      this.rowSelectData.weaveJobyarnallotCrudData.forEach((item,i) =>{
        item.unit = this.rowSelectData.unit;
      })
      this.rowSelectData.weaveJobyarnallotCrudData.length && this.$refs.weaveJobyarnallotCrud.setCurrentRow(this.rowSelectData.weaveJobyarnallotCrudData[0]);
      this.allotLoading = false;
    },
    async handleSave(showTip = true) {
      // let validRes = await this.saveValid();
      // if(!validRes) return;
      if(!this.useYarnsCrudData.length) return;
      try {
        let proArr = this.useYarnsCrudData.map(async (item, i) =>{
          this.wLoading = true;
          let data = JSON.parse(JSON.stringify(item));
          data.weaveJobyarnallotCrudData = [];
          if(data.useYarnId){
            await updateYarn(data);
            if (item.weaveJobyarnallotCrudData) {
              let dtlReqList = item.weaveJobyarnallotCrudData.map(async (allot) =>{
                if(allot.detailId){
                  await updateProWeaveJobYarnallotData(allot);
                }else{
                  allot.jobYarnFk = data.useYarnId;
                  let allotRes = await createProWeaveJobYarnallotData(allot);
                  allot.detailId = allotRes.data.data;
                }
              })
              await Promise.all(dtlReqList);
            }
          }else{
            data.proWeaveJobFk = this.weaveJobInfo.weaveJobId;
            let addRes = await addYarn(data);
            item.useYarnId = addRes.data.data;
            if (item.weaveJobyarnallotCrudData) {
              let dtlReqList =  item.weaveJobyarnallotCrudData.map(async (allot) =>{
                if(allot.detailId){
                  await updateProWeaveJobYarnallotData(allot);
                }else{
                  allot.jobYarnFk = addRes.data.data;
                  let allotRes = await createProWeaveJobYarnallotData(allot);
                  allot.detailId = allotRes.data;
                }
              });
              await Promise.all(dtlReqList);
            }
          }
          if(i == this.useYarnsCrudData.length - 1){
            setTimeout(() => {
              this.wLoading = false;
              showTip && this.$tip.success(this.$t("public.bccg"));
            }, 200);

          }
        })
        // 全部接口执行后再 再触发回调
        await Promise.all(proArr);

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
      let tipMessage = this.$t("tipLabel.delYarnBatch") + this.allotRowSelectData.factoryYarnBatch + this.$t("tipLabel.delEnd");
      if(this.allotRowSelectData.hasConfirm){
        tipMessage = "该分配信息已被确认，是否确认删除"
      }
      this.$tip.cofirm(tipMessage)
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
            sn: this.rowSelectData.weaveJobyarnallotCrudData.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            realAmount: item.weight || 0,
            origin: this.invSelOrigin,
            unit: this.rowSelectData.unit || 'KG',
            createDate: this.$getNowTime("time"),
            createBy: parent.userID || "00000000-0000-0000-0000-000000000001"
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
 .confirm-status{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    &.success{
      background-color: #67c23a
    }
    &.danger{
      background-color: #f56c6c
    }
  }
</style>