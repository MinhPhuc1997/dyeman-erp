<template>
    <div class="seit-location-container">
        <view-container title="货位整理记录" :element-loading-text="loadLabel" v-loading="loading">
            <div class="btnList">
                <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
                <el-button type="warning" @click="handleUpdate" >{{ this.$t("public.update") }}</el-button>
                <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button>
                <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
            </div>
            <div class="formBox">
                <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
            </div>
            <div class="crudBox">
                <avue-crud
                    ref="crud"
                    :option="mainCrudOp"
                    :data="mainCrudDataList"
                    :page.sync="page"
                    v-loading="loading"
                    @on-load="getDataList"
                    @row-dblclick="handleRowDBLClick"
                    @row-click="handleRowClick"
                ></avue-crud>
            </div>

            <el-dialog :visible.sync="dtlDialogVisible" append-to-body fullscreen >
                <split-num-dtl ref="splitNumDtlRef" @close="handleCloseDtlDialog" /> 
            </el-dialog>

            <inv-select 
                ref="invSelectRef" 
                @data-select="handleInvSelect"
                matType="4"
                :filterZeroStock="false"
                :hideOtherCol="true"
                :unifiedFormat='true'
                :isMergeStorage="true"
            ></inv-select>

        </view-container>
    </div>
</template>
<script>
import { fetchSplitNumDataPage, removeSplitNumData } from "./api"
import { queryFormOp, mainCrudOp } from "./data";
import SplitNumDtl from "./splitNumDtl.vue"
import InventorySelect from "@/components/InventorySelect"
export default {
    name: "splitNum",
    components:{
        "split-num-dtl": SplitNumDtl,
        "inv-select": InventorySelect
    },
    data(){
        return {
            loadLabel: this.$t('public.loading'),
            loading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {},
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            mainCrudOp: mainCrudOp(this), 
            mainCrudDataList: [],
            // 当前点击对象
            curSelRow: {},

            dtlDialogVisible: false,
        }
    },
    computed: {
        hasEdit(){
            return this.curSelRow.splitStatus == "2";
        },
        // 是否为仓管 （只允许刘亚顺账号进行操作）
        isWareAdmin(){
            return parent.userID === 'liuyas'
        }
    },
    methods:{
        // 库存选择回调
        async handleInvSelect(rows){
            if(rows.length == 0) return this.$tip.warning("请选择数据")
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.splitNumDtlRef.initData(rows[0])   
        },
        // 选择后新增
        handleAdd(){
           this.$refs.invSelectRef.invSelDiaVisible = true;
        },
        // 数据删除
        async handleDelete(){
            let {whseSplitNumoid:id, splitNo } = this.curSelRow
            if(!id) return this.$tip.warning("请选择数据");
            let confirmRes = await this.$tip.cofirm(`是否确认删除整理编号为${splitNo}的数据`).then(_ => true).catch(_ => false);
            if(!confirmRes) return false;
            this.loading = true;
            removeSplitNumData({id}).then(res => {
                if(res.data.code == 200){
                    this.$tip.success(this.$t('public.sccg'));
                    this.getDataList();
                }
            }).finally(_ => {
                this.loading = false;
            })  
            
        },
        handleUpdate(){},
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        getDataList(){
             let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
            };

            this.loading = true;
            fetchSplitNumDataPage(params).then(res => {
                this.mainCrudDataList = res.data.records;
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        async handleRowDBLClick(row){
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.splitNumDtlRef.getDataList(row);
        },
        handleRowClick(row){
            this.curSelRow = row;
        },
        // 关闭明细弹窗
        handleCloseDtlDialog(isRefresh){
            this.dtlDialogVisible = false;
            if(isRefresh){
                this.page.currentPage = 1;
                this.getDataList();
            }
        }
    }
}
</script>


