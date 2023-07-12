<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-29 10:05:29
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-28 11:49:01
-->

<template>
  <div class="inventory-dtl-container">
    <view-container title="库存拆数明细" v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleBatchSave" >{{ $t("public.save") }}</el-button>
        <el-button type="success" @click="handleConfirmSplit" >确认拆数</el-button>
        <el-button type="warning" @click="handleClose">{{  $t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="formData"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crudDataList"
          v-loading="loading"
          @row-click="handleCellClick"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>

<script>
import { mainCrudOp, dtlCrudOp } from "./data";
import { fetchInOrOutDataList, addSplitNumData, updateSplitNumData, saveOrUpdateSplitNumDtlData, fetchWhseSplitDltDataByMoid } from "./api"
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import v1 from "uuid/v1"
export default {
  name: "splitNumDtl",
  data() {
    return {
      loading: false,
      crudOp: dtlCrudOp(this),
      crudDataList: [],
      formOp: mainCrudOp(this),
      formData: {},
      isRefresh: false,
    };
  },
  computed: {},
  methods: {
    // 确认拆数
    handleConfirmSplit(){
        // 拆数前检验
        this.startWhseSplitNum();
        // 先保存
        this.handleBatchSave();
        
    },
    // 开始请求拆数
    startWhseSplitNum(){
        
    },
    // 数据初始化
    async initData(row){
        let splitNo = await baseCodeSupplyEx({code: "whse_split_num"}).then(res => res.data.data)
        this.formData = {
            matType: "4",
            splitNo: splitNo,
            matName: row.materialName,
            matCode: row.materialId,
            oldBatId: row.batId,
            oldBatchNo: row.batchNo,
            newBatchNo: row.batchNo + "_1",
            newBatId: ""
        }

        let params = {
            oldBatchNo: row.batchNo,
            matCode: row.materialId
        }

        this.loading = true;
        fetchInOrOutDataList(params).then(res => {
            this.crudDataList = res.data.map(item => {
                item.$cellEdit = true;
                return item;
            });
        }).finally(() => {
            this.loading = false;
        })
    },
    // 数据保存
    async handleBatchSave() {
        let { oldBatId, newBatId, whseSplitNumoid } = this.formData;
        if(!newBatId){
            return this.$tip.warning("请输入新拆供应商批号~")
        }
        if(oldBatId == newBatId){
            return this.$tip.warning("被拆供应商批号与新拆供应商批号不能一致，请检查")
        }
        this.loading = true;
        if(whseSplitNumoid){
            await updateSplitNumData(this.formData);
        }else{
            // 重新赋值整理编号
            this.formData.splitNo = await baseCodeSupplyEx({code: "whse_split_num"}).then(res => res.data.data)
            whseSplitNumoid = await addSplitNumData(this.formData).then(res => res.data.data);
            Object.assign(this.formData,{whseSplitNumoid})
            baseCodeSupply({code: "whse_split_num"});
        }

        // 保存明细
        let dtlDataList = this.crudDataList.map(item => {
            item.whseSplitNumDtloid = item.whseSplitNumDtloid || v1()
            item.whseSplitNumFk = whseSplitNumoid;
            return item;
        })

        saveOrUpdateSplitNumDtlData(dtlDataList).then(res => {
            this.$tips.success("保存成功")
        }).finally(() => {
            this.loading = false;
        })

    },
    // 行点击
    handleCellClick(row) {},
    // 获取数据
    getDataList(row) {
        this.formData = Object.assign({}, row);
        this.loading = true;
        fetchWhseSplitDltDataByMoid({whseSplitNumFk: row.whseSplitNumoid}).then(res => {
            this.crudDataList = res.data.map(item => {
                item.$cellEdit = true //row.splitStatus == 1;
                return item;
            });
        }).finally(() => {
            this.loading = false;
        })
    },
    handleClose() {
      this.$emit("close", this.isRefresh);
    },
  },
};
</script>
<style scoped>
</style>