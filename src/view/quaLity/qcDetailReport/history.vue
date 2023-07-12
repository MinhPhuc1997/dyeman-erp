<template>
    <div class='qcDetailReport'>
        <el-row class="btnList">
            <el-button type="warning" @click="$emit('close')">{{ $t("public.close") }} </el-button>
        </el-row>
        <el-row>
            <el-col :span="12">
                <avue-crud ref="historyCrud" :option="crudOp" :data="history" :page.sync="historyPage"
                    v-loading="loadingDetail" @cell-click="cellClick">
                </avue-crud>
            </el-col>
            <el-col :span="12">
                <avue-crud ref="historyDetailCrud" :option="detailOp" :data="detail.fabricHisdtls"> </avue-crud>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { fetchQcCheckoutFabricHis, fetchQcCheckoutFabricHisDtl  } from "./api";
import { mainCrud, detailCrud } from "./data";
export default {
    props: {
        checkRowData: {}
    },
    data() {
        return {
            crudOp: mainCrud(this),
            detailOp: detailCrud(this),
            detail: {
                fabricHisdtls: []
            },
            history: [],
            historyPage: {
                pageSize: 50,
                currentPage: 1,
                total: 0,
            },
            loadingDetail: false
        }
    },
    methods: {
        initData() {
            this.loadingDetail = true;
            this.detail = {};
            fetchQcCheckoutFabricHis({
                checkoutFabricFk: this.checkRowData.checkoutId,
                rows: this.historyPage.pageSize,
                start: this.historyPage.currentPage,
            }).then(res => {
                let { records, total } = res.data;
                this.history = records.sort((a,b) => a.verId > b.verId ? -1 : 1);;
                this.historyPage.total = total;
            }).finally((_) => {
                this.history.length && this.$refs.historyCrud.setCurrentRow(this.history[0]);
                this.history.length && this.cellClick(this.history[0])
                this.loadingDetail = false;
            })


        },
        cellClick(row) {
            row.fabricHisdtls.sort((a,b) => a.pidNo - b.pidNo);
            this.detail = row;
        }
    },
    created() {
        this.crudOp.height = 'calc(100vh - 165px)';
        this.detailOp.height = 'calc(100vh - 145px)';
        this.crudOp.menu = false;
        this.detailOp.page = false;
        this.detailOp.selection = false;
    },
    mounted() {
    },
}
</script>

<style>
.qcDetailReport {}
</style>