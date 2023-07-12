<!--
 * @Author: Lyl
 * @Date: 2022-09-24 14:28:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-10-01 09:27:44
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\job-card.vue
 * @Description:
-->
<template>
    <div class="bottomColumn-list">
        <div class="btnList">
            <el-popconfirm :title="$t('tipLabel.pirntConfirm')" placement="top-start" @onConfirm="handlePrint" style="margin-right: 10px" v-hasPerm="['quality:sendCustSpanPrint:print2']">
                <el-button type="primary"  slot="reference" :disabled="!cellClickData.labelId">{{ this.$t("public.print") }}</el-button>
            </el-popconfirm>
            <el-button type="success" @click="handleQuery" :disabled="loading" v-hasPerm="['quality:sendCustSpanPrint:list2']">{{ this.$t("public.query") }}</el-button>
        </div>
        <el-row class="formBox">
            <avue-form ref="qeuryForm" :option="queryFormOp" v-model="queryForm"> </avue-form>
        </el-row>
        <el-row class="crudBox">
            <avue-crud ref="jobCardCrud" v-loading="loading" :option="jobCardDataOp" :data="jobCardData"
            :page.sync="page" @on-load="handleQuery" @row-click="rowClick"> </avue-crud>
        </el-row>
    </div>
</template>

<script>
import { mateFactCardCrudOp, queryFormOp } from "./data";
import { fetchProLableCardData } from "./api";
export default {
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {
                sn: undefined
            },
            jobCardDataOp: mateFactCardCrudOp(this),
            jobCardData: [],
            page: {
                pageSize: 20,
                pageSizes: [20, 50, 100, 200, 500],
                total: 0,
            },
            cellClickData: {}
        };
    },
    watch: {},
    computed: {},
    created() {
        this.spowerClient = this.$store.state.spowerClient;
    },
    mounted() {},
    methods: {
        handleQuery() {
            this.loading = true;
            let { vatNo, fabrication, labelType }  = this.queryForm;
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                vatNo: "%" + (vatNo || ''),
                fabrication: "%" + (fabrication || ''),
                labelType
            }
            fetchProLableCardData(params).then( res =>{
                if(!res.data.total) {
                    this.jobCardData = [];
                    return
                }
                this.jobCardData = res.data.records;
                this.page.total = res.data.total;
                this.$refs.jobCardCrud.setCurrentRow(this.jobCardData[0]);
            }).finally(() => {
                this.loading = false;
            })
        },
        rowClick(val) {
            this.cellClickData = val;
        },
        async handlePrint () {
            if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
                this.$tip.warning(this.$t('tipLabel.clientError'));
                return;
            }
            this.spowerClient.send(
                "print=labelId:" + this.cellClickData.labelId
            );
            this.$tip.success(this.$t('tipLabel.printSuccess'));
        }
    },
};
</script>
<style  scoped>
    .bottomColumn-list{}
</style>
