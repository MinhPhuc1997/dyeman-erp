<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-11-22 16:13:00
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-20 11:20:46
-->
<template>
    <div class="yarn-account-container" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
            <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
            <el-button type="primary" @click="handleDownloadRpt">{{ this.$t("public.report") }}</el-button>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="queryFormOp" v-model="queryForm">
                
            </avue-form>
        </div>
        <div  class="yarn-info-wrapper">
            <div class="cell">
                <span class="label">纱线编号：</span>
                <span class="value">{{yarnInfoData.yarnsId}}</span>
            </div>
            <div class="cell">
                <span class="label">纱线名称：</span>
                <span class="value">{{ yarnInfoData.yarnsName }}</span>
            </div>
            <div class="cell">
                <span class="label">本厂批号：</span>
                <span class="value">{{ yarnInfoData.batchNo }}</span>
            </div>
                <div class="cell">
                <span class="label">纱牌：</span>
                <span class="value">{{ yarnInfoData.yarnsCard }}</span>
            </div>
            <div class="cell">
                <span class="label">供应商批号：</span>
                <span class="value">{{ yarnInfoData.batId }}</span>
            </div>
        </div>
        <div class="crudBox">
            <avue-crud
                ref="crud"
                :option="mainCrudOp"
                :data="mainCrudDataList"
                :page.sync="page"
                v-loading="loading"
                @on-load="getDataList"
            ></avue-crud>
        </div>
    </div>
</template>
<script>
import { fetchYarnsAccountList } from "./api"
import { queryFormOp, mainCrudOp } from "./data";
import { fetchFineReportUrl } from "@/api/index";
export default {
    name: "yarnAccount",
    props: {
        yarnInfoData: {
            type: Object,
            default: () => {}
        }
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
                id: "WHSE_YARN_ACCOUNT",
            };
            let urlParams = Object.entries(this.yarnInfoData).filter(item => item[1]).map(item => `&${item[0]}=${item[1]}`).join(""); 
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
        handleClose(){
            this.$emit("close")
        },
        // 查询
        handleQuery(){
            this.page.start = 1;
            this.getDataList();
        },
        getDataList(){
            if(!this.queryForm.yarnsId) return;
             let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                dataSortRules: "seq",
                ...this.queryForm
            };

            // 添加模糊查询参数
            let likeProps = ["yarnsId","yarnsName","batchNo"];
            likeProps.forEach(prop => {
                if(this.queryForm[prop]){
                    params[prop] = '%' + this.queryForm[prop]
                }
            })

            this.loading = true;
            fetchYarnsAccountList(params).then(res => {
                this.mainCrudDataList = res.data.records;
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        
    }
}
</script>

<style lang="stylus">
    .yarn-info-wrapper{
        display: flex;
        height: 50px;
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        align-items: center;
        .cell{
            margin-right: 10px;
            font-size: 15px;
            .label{
                font-weight: bold
            }
            .value{
                border-bottom: 1px solid #858578;
                padding: 0px 10px 0px 10px;
                color: #409eff
            }
        }
    }
</style>


