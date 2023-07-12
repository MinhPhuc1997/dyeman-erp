<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:10:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-09 14:41:21
-->
<template>
    <div class="whse-yarn-pre-alloc-container-container">
        <view-container title="纱预分配" :element-loading-text="loadLabel" v-loading="loading">
            <div class="btnList">
                <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
                <el-button type="warning" @click="handleUpdate" >{{ this.$t("public.update") }}</el-button>
                <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button>
                <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
                <!-- <el-button type="primary" @click="handleTest">测试</el-button> -->
            </div>
            <div class="formBox">
                <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
            </div>
            <el-row>
                <el-col :span="6">
                    <view-container title="预分配">
                        <avue-crud
                            ref="crud"
                            :option="mainCrudOp"
                            :data="mainCrudDataList"
                            :page.sync="page"
                            v-loading="loading"
                            @on-load="getDataList"
                            @row-dblclick="handleRowDBLClick"
                            @row-click="handleRowClick"
                        >
                            <template slot="effective" slot-scope="{row}">
                                <div>
                                    <span :class="['point', row.effective ? 'success' : 'danger']"></span>
                                </div>
                            </template>
                        </avue-crud>
                    </view-container>
                </el-col>
                <el-col :span="18">
                    <view-container title="分配明细">
                        <avue-crud
                            ref="dtlCrudRef"
                            :option="dtlCrudOp"
                            :data="dltCrudDataList"
                            v-loading="loading"
                        >
                        </avue-crud>
                    </view-container>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="dtlDialogVisible" append-to-body fullscreen >
                <whse-dtl ref="preAllocDtlRef" @close="handleCloseDtlDialog" />
            </el-dialog>

        </view-container>
    </div>
</template>
<script>
import { fetchYarnPreAllocData, removeYarnPreAllocData } from "./api"
import { queryFormOp, mainCrudOp, mainDtlCrudOp } from "./data";
import WhseDtl from "./whseDtl.vue"
import axios from "axios"
export default {
    name: "yarnPreAlloc",
    components:{
        "whse-dtl": WhseDtl,
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
            dtlCrudOp: mainDtlCrudOp(this),
            dltCrudDataList: [],
            // 当前点击对象
            curSelRow: {},

            dtlDialogVisible: false,
        }
    },
    computed: {
        hasEdit(){
            return this.curSelRow.effective;
        },
        // 是否为仓管 （只允许刘亚顺账号进行操作）
        isWareAdmin(){
            return parent.userID === 'liuyas'
        }
    },
    methods:{
        // 测试结果
        handleTest(){
            let params = {
                _bpoName:"BPO_CommonInterfaceService",
                _methodName: "__GetMaxNo",
                //函数的参数值，如果没有参数则为空
                _paraNames:"BPOName,Parameters",
                "_parameters[BPOName]": "BPO_Pur_Delivery_Main2",
                "_parameters[Parameters]": "[{\"cmp_id\":\"0006B549-0000-005F-0000-0000054B402E\" }]",
                _pUrl: "",
                _classFullName: "",
            }
            axios({
                url: "http://10.0.168.120/ewDFS/UCMLWebserviceEntryForJs.aspx",
                method: "post",
                params: params,
                ignoreBaseUrl: true,
            }).then(res => {
                console.log("测试结果")
            })
        },
        // 数据删除
        async handleDelete(){
            let {whseYarnPreAllocoid:id, preAllocCode } = this.curSelRow
            if(!id) return this.$tip.warning("请选择数据");
            let confirmRes = await this.$tip.cofirm(`是否确认删除整理编号为${preAllocCode}的数据`).then(_ => true).catch(_ => false);
            if(!confirmRes) return false;
            this.loading = true;
            removeYarnPreAllocData({id}).then(res => {
                if(res.data.code == 200){
                    this.$tip.success(this.$t('public.sccg'));
                    this.getDataList();
                }
            }).finally(_ => {
                this.loading = false;
            })  
            
        },
        async handleAdd(){
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.preAllocDtlRef.initData()
        },
        handleUpdate(){
            this.handleRowDBLClick(this.curSelRow)
        },
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        getDataList(){
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                includeDtl: true,
                dataSortRules: "preAllocCode|desc"
            };
            let props = ["yarnName", "yarnNo", 'yarnCard', 'batchNo', "batId", "poNo"];
            props.forEach(prop => {
                if(this.queryForm[prop]){
                    params[prop] = '%' + this.queryForm[prop]
                }
            })
            this.loading = true;
            fetchYarnPreAllocData(params).then(res => {
                this.mainCrudDataList = res.data.records;
                if(this.mainCrudDataList.length){
                    this.dltCrudDataList = this.mainCrudDataList[0].dtlList
                }else{
                    this.dltCrudDataList = [];    
                }
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        async handleRowDBLClick(row){
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.preAllocDtlRef.setYarnPreAllocData(row);
        },
        handleRowClick(row){
            this.curSelRow = row;
            this.dltCrudDataList = row.dtlList;
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
<style lang="stylus">
    .whse-yarn-pre-alloc-container-container{
        .point{
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            &.danger{
                background: #f66
            }
            &.success{
                background: #0dbc79
            }
        }
    }
</style>

