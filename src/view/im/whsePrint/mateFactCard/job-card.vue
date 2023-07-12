<!--
 * @Author: Lyl
 * @Date: 2022-09-24 14:28:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-10-01 09:27:44
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\job-card.vue
 * @Description:
-->
<template>
    <div class="mateFactCard-list">
        <div class="btnList">
            <el-popconfirm title="是否确定打印吗？" placement="top-start" @onConfirm="handlePrint" style="margin-right: 10px" v-hasPerm="['whse:mateFactCard:print']">
                <el-button type="primary" slot="reference" :disabled="!selectList.length">{{ this.$t("public.print")
                }}</el-button>
            </el-popconfirm>
            <el-button type="primary" @click="handlePreview" :disabled="!selectList.length" v-hasPerm="['whse:mateFactCard:preview']">{{
                    this.$t("public.preview")
            }}</el-button>
            <el-button type="success" @click="handleQuery" :disabled="loading" v-hasPerm="['whse:mateFactCard:list2']">{{ this.$t("public.query") }}</el-button>
        </div>
        <el-row class="formBox">
            <avue-form ref="qeuryForm" :option="queryFormOp" v-model="queryForm"> </avue-form>
        </el-row>
        <el-row class="crudBox">
            <avue-crud ref="jobCardCrud" v-loading="loading" :option="jobCardDataOp" :data="jobCardData"
                :page.sync="page" @on-load="handleQuery" @row-click="rowClick" @selection-change="selectionChange">
            </avue-crud>
        </el-row>
    </div>
</template>

<script>
import { mateFactCardCrudOp, queryFormOp } from "./data";
import { fetchWhseMateFactCardData } from "./api";
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
            cellClickData: {},
            selectList: []
        };
    },
    watch: {},
    computed: {},
    created() {
        this.spowerClient = this.$store.state.spowerClient;
    },
    mounted() { },
    methods: {
        handleQuery() {
            this.loading = true;
            this.selectList = [];
            let { prodDate, mateCode, mateCnName, brand, factBatchNo, pakeageNo, supplyBatchNo } = this.queryForm;
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                mateCode: "%" + (mateCode || ''),
                pakeageNo: "!^%" + (pakeageNo || ''),
                mateCnName: "%" + (mateCnName || ''),
                supplyBatchNo: "%" + (supplyBatchNo || ''),
                brand: "%" + (brand || ''),
                factBatchNo: "%" + (factBatchNo || ''),
                creator: parent.userID,
                prodDate: prodDate ? prodDate + ' 00:00:00' : ''
            }
            fetchWhseMateFactCardData(params).then(res => {
                if (!res.data.total) {
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
        handleFlatChange() {

        },
        handlePreview() {
            let url = `http://${window.location.hostname}:91/api/whseMateFactCard/pdf?id=${this.selectList[0].mcardId}`
            let oA = document.createElement("a");
            oA.href = url;
            oA.target = "_blank";
            oA.click();
        },
        rowClick(val) {
            this.cellClickData = val;
        },
        selectionChange(list) {
            this.selectList = list;
        },
        async handlePrint() {
            if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
                this.$tip.warning(this.$t('tipLabel.clientError'));
                return;
            }
            this.selectList.forEach((item, i) => {
                this.spowerClient.send(
                    "print=mcardId:" + item.mcardId
                );
                if (i == this.selectList.length - 1) {
                    this.$tip.success(this.$t('tipLabel.printSuccess'));
                }
            })


        }
    },
};
</script>
<style  lang="stylus">
.mateFactCard-list {
    .el-tag--mini {
        height: 30px;
    }
    .avue-crud__tip {
        // float: left;
        margin: 8px 0 4px 0;
    }
    .avue-crud {
        text-align: left;
    }
}
</style>
