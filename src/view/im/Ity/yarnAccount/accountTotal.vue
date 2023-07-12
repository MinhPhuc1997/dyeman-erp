<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-11-22 16:13:00
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-20 10:20:55
-->
<template>
    <div class="yarn-account-container" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-button type="danger" @click="handleSyncStock">同步即时库存</el-button>
            <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
            <el-button type="primary" @click="handleDownloadRpt">{{ this.$t("public.report") }}</el-button>
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
                @row-dblclick="handleRowClick"
            ></avue-crud>
        </div>
        
        <el-dialog :visible.sync="dialogVisible" title="台账明细" append-to-body fullscreen>
            <account-dlt-list :yarnInfoData="curSelRow" ref="yarnAccDtlRef" @close="dialogVisible = false" /> 
        </el-dialog>
    </div>
</template>
<script>
import { fetchYarnsAccountTotalList, fetchSyncStockData } from "./api"
import { queryTotalFormOp, mainTotalCrudOp } from "./data";
import AcccoutDtlList from "./account.vue"
import { fetchFineReportUrl } from "@/api/index";
export default {
    name: "yarnAccountTotal",
    components:{
        "account-dlt-list": AcccoutDtlList
    },
    data(){
        return {
            dialogVisible: false,
            loadLabel: this.$t('public.loading'),
            loading: false,
            queryFormOp: queryTotalFormOp(this),
            queryForm: {
                filterZero: false,
            },
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            mainCrudOp: mainTotalCrudOp(this), 
            mainCrudDataList: [],
            curSelRow: {},
        }
    },
    computed: {
        // 是否为仓管 （只允许刘亚顺账号进行操作）
        isWareAdmin(){
            return parent.userID === 'liuyas'
        }
    },
    methods:{
        handleDownloadRpt(){
            let queryData = {
                module: "WHSE",
                id: "WHSE_YARN_ACCOUNT_TOTAL",
            };
            let urlParams = Object.entries(this.queryForm).filter(item => item[1]).map(item => `&${item[0]}=${item[1]}`).join(""); 
            fetchFineReportUrl(queryData).then((res) => {
                if (res.data) {
                let url = res.data.url + urlParams;
                let oA = document.createElement("a");
                oA.href = url;
                oA.target = "_blank";
                oA.click();
                } else {
                this.$tip.warning(this.$t("tipLabel.noreport"));
                }
            });
        },
        // 同步即时库存
        handleSyncStock(){
            this.$confirm("是否确认对即时库存进行同步，若台账中存在已分配数据，则不进行同步；", "提示", {type: "warning"}).then(res => {
                this.loading = true;
                fetchSyncStockData().then(res => {
                     this.$tip.success("同步成功");
                }).finally(res => {
                    this.loading = false;
                })
            })
        },
        // 点击
        async handleRowClick(row){
            this.dialogVisible = true;
            this.curSelRow = row;
            await this.$nextTick();
            this.$refs.yarnAccDtlRef.queryForm = {
                yarnsId: row.yarnsId,
                batchNo:  row.batchNo,
                batId: row.batId,
                yarnsCard: row.yarnsCard
            }
            this.$refs.yarnAccDtlRef.handleQuery();
        },
        // 查询
        handleQuery(){
            this.page.start = 1;
            this.getDataList();
        },
        getDataList(){
             let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                dataSortRules: "yarnsId,batchNo",
                ...this.queryForm,
                showZeroAmount: true
            };
            if(!this.queryForm.filterZero){
                params.filterZeroStockAmount = true
            }
            // 添加模糊查询参数
            let likeProps = ["yarnsId","yarnsName","batchNo","batId"];
            likeProps.forEach(prop => {
                if(this.queryForm[prop]){
                    params[prop] = '%' + this.queryForm[prop]
                }
            })

            this.loading = true;
            fetchYarnsAccountTotalList(params).then(res => {
                this.mainCrudDataList = res.data.records;
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        
    }
}
</script>


