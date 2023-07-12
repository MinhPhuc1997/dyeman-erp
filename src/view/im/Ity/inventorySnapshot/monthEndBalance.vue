<!--
 * @Description: 月末结余
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2023-04-04 09:40:06
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-04-11 08:37:51
-->
<template>
  <div class="month-end-balance-container"  v-loading="loading">
    <div class="btnList">
      <el-button
        type="success"
        @click="handleAdd"
        v-hasPerm="['whse:inventorySnapshot:balanceAdd']"
        >{{ this.$t("public.add") }}</el-button
      >
      <el-button
        type="primary"
        @click="getDataList"
        v-hasPerm="['whse:inventorySnapshot:balanceQuery']"
        >{{ this.$t("public.query") }}</el-button
      >
        <el-button 
            type='warning' 
            v-hasPerm="['whse:inventorySnapshot:balancePublic']"
            :disabled="['1','3'].includes(chooseData.inventoryState)"  @click="handlePublic" >生成库存类型清单</el-button>
        <el-button 
            type='danger' 
            v-hasPerm="['whse:inventorySnapshot:balanceCancel']"
            :disabled="!['3'].includes(chooseData.inventoryState)" @click="handleIncCancel" >撤销</el-button>
        <el-button 
            type='danger' 
            v-hasPerm="['whse:inventorySnapshot:balanceDel']"
            :disabled="!['1','2'].includes(chooseData.inventoryState)" @click="handleRemove" >删除</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="formData"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="crud"
        :option="crudOp"
        :data="crudDataList"
        :page.sync="page"
      
        @on-load="getDataList"
        @row-dblclick="handleRowDBLClick"
        @row-click="handleCellClick"
      ></avue-crud>
    </div>
    <el-dialog
      :fullscreen="true"
      :visible.sync="dtlDialogVisible"
      :append-to-body="true"
      width="100%"
      :close-on-click-modal="false"
    >
      <inv-dtl
        v-if="dtlDialogVisible"
        :hasOperate="false"
        ref="invDtlRef"
        @closeDialog="handleDtlCloseDialog"
        snapshotType="2"
      ></inv-dtl>
    </el-dialog>
    <el-dialog :visible.sync="editFormVisible" title="新增" append-to-body width="500">
        <avue-form ref="form" :option="editFormOp" v-model="editFormData"></avue-form>
        <div slot="footer">
            <el-button @click="handleEidtCancel">取消</el-button>
            <el-button type="primary" @click="handleEditSubmit" >提交</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import {
    fetchInvSnapDataByPage,
    fetchSaveInvData,
    fetchPerInvPublic, fetchPerInvCancel,
    fetchRemoveDataByInvOid
} from "./api";
import { monthEndFormOp, monthEndCrudOp, monthEndEditFormOp } from "./data";
import InvDtl from "./InvDtl.vue"
export default {
    name: "monthEndBalance",
    components: {
        "inv-dtl": InvDtl
    },
    data(){
        return {
            loading: false,
            dtlDialogVisible: false,
            formData: {},
            queryFormOp: monthEndFormOp(this),
            crudOp: monthEndCrudOp(this),
            crudDataList: [],
            page: {
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10,
                currentPage: 1,
                total: 0,
            },
            // 编辑
            editFormVisible: false,
            editFormData: {
                inventoryDate: "",
                materialClass: ""
            },
            editFormOp: monthEndEditFormOp(this),
            // 选择项
            chooseData: {},
        }
    },
    watch: {
        "editFormData.inventoryDate": {
            handler(val){
                if(!val) return;
                this.computedNo();
            }
        },
        "editFormData.materialClass": {
            handler(val){
                if(!val) return;
                this.computedNo();
            }
        }
    },
    methods: {
        // 数据删除
        async handleRemove(){
            let hasConfirm = await this.$tip.cofirm("是否确认删除该数据").then(res => false).catch(err => true);
            if(hasConfirm) return;
            this.loading = true;
            fetchRemoveDataByInvOid({invOid: this.chooseData.whseInventoryoid }).then(res => {
                this.$tip.warning("数据删除成功");
                this.getDataList();
            }).finally(() => {
                this.loading = false;
            })
        },
        // 数据发布
        async handlePublic(){
            let hasConfirm = await this.$tip.cofirm("是否确认对该数据进行发布").then(res => false).catch(err => true);
            if(hasConfirm) return;
            this.loading = true;
            fetchPerInvPublic({invOid: this.chooseData.whseInventoryoid}).then(res => {
                this.$tip.success("发布成功");
                this.getDataList();
            }).finally(_ => {
                this.loading = false;
            })
        },
        // 撤销
        async handleIncCancel(){
            let hasConfirm = await this.$tip.cofirm("该操作会将发布的库存结余数据进行删除，是否确认").then(res => false).catch(err => true);
            if(hasConfirm) return;  
            fetchPerInvCancel({invOid: this.chooseData.whseInventoryoid}).then(res => {
                this.$tip.success("发布成功");
                this.getDataList();
            }).finally(_ => {
                this.loading = false;
            })
        },
        // 生成结余编号
        computedNo(){
            let { inventoryDate, materialClass } = this.editFormData;
            inventoryDate = new Date(inventoryDate);
            let Y = inventoryDate.getFullYear();
            let M = ("0" + (inventoryDate.getMonth() + 1)).slice(-2);
            let noStr = `IN-${materialClass}-${Y}${M}`;
            this.editFormData.inventoryNo = noStr;
        },
        // 数据新增
        handleAdd(){
            this.editFormData = {
                inventoryNo: "",
                inventoryDate: new Date(),
                materialClass: ""
            }
            this.editFormVisible = true;
        },
        // 编辑取消
        handleEidtCancel(){
            this.editFormVisible = false;
        },
        // 提交编辑
        handleEditSubmit(){
            let { inventoryNo, inventoryDate, materialClass } = this.editFormData;
            if(!(inventoryNo && inventoryDate && materialClass)){
                return this.$tip.warning("请完善数据再进行提交");
            }
            this.loading = true;
            Object.assign(this.editFormData, {
                snapshotType: 2,
                inventoryState: 1, // 默认为为发布
            })
            fetchSaveInvData(this.editFormData).then(res => {
                if(res.data.code == 200){
                    this.$tip.success("新增成功");
                    this.editFormVisible = false;
                    this.getDataList();
                }else{
                    this.$tip.warning(res.data.msg);
                }
                
            }).finally(() => {
                this.loading = false;
            })
        },
        // 数据查询
        getDataList(){
            this.loading = true ;
            let params = Object.assign({
                rows: this.page.pageSize,
                start: this.page.currentPage,
                snapshotType: 2,
            },this.form)
            fetchInvSnapDataByPage(params).then(res => {
                this.page.total = res.data.total;
                this.crudDataList = res.data.records
            }).finally(_ => {
                this.loading = false;
            })
        },
        // 明细弹窗回调
        handleDtlCloseDialog(isRefresh){
            this.dtlDialogVisible = false
            isRefresh && this.getDataList();
        },
        // 盘点明细录入
        async handeInvDtlEdit(){
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.invDtlRef.optionInit(this.chooseData);
        },
        // 
        handleRowDBLClick(){
            this.handeInvDtlEdit();
        },
        // 
        handleCellClick(row) {
            this.chooseData = row;
        },
    }
    
}
</script>