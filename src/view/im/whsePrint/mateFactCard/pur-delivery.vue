<template>
    <div class='purDelivery'>
        <div class="btnList">
            <el-button type="primary" @click="handleReport" v-hasPerm="['whse:mateFactCard:export']">{{ $t("public.report") }}</el-button>
            <el-button type="primary" @click="handleQuery" v-hasPerm="['whse:mateFactCard:list3']">{{ $t("public.query") }}</el-button>
        </div>
        <div class="formBox">
            <avue-form ref="qeuryForm" :option="deliveryFormOp" v-model="deliveryFormData"> </avue-form>
        </div>
        <div class="crudBox">
            <el-row>
                <el-col :span="10">
                    <view-container title="送货单资料">
                        <avue-crud ref="deliveryCurd" v-loading="loading" :option="deliveryCurdOp" style="margin: 2px"
                            :data="deliveryCrudData" :page.sync="page" @on-load="handleQuery" @row-click="rowClick">
                        </avue-crud>
                    </view-container>
                </el-col>
                <el-col :span="14">
                    <view-container title="送货单明细">
                        <avue-crud ref="deliveryDtlCurd" v-loading="dtlloading" :option="deliveryDtlCurdOp"
                            style="margin: 2px" :data="deliveryDtlCrudData">
                        </avue-crud>
                    </view-container>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
import { purDeliveryFormOp, purDeliveryCrudOp, purDeliveryDtlCrudOp } from "@/const/pur.js";
import { fetchPurDeliveryData, fetchPurDelisingleDtlaData } from "@/api/pur/delivery.js";
import { fetchFineReportUrl } from "@/api/index";
export default {
    data() {
        return {
            deliveryFormOp: purDeliveryFormOp(this),
            deliveryFormData: {},
            deliveryCurdOp: purDeliveryCrudOp(this, { height: "calc(100vh - 275px)" }),
            deliveryCrudData: [],
            deliveryDtlCurdOp: purDeliveryDtlCrudOp(this, { height: "calc(100vh - 238px)" }),
            deliveryDtlCrudData: [],
            page: {
                pageSize: 20,
                pageSizes: [20, 50, 100, 200, 500],
                total: 0,
            },
            dtlpage: {
                pageSize: 20,
                pageSizes: [20, 50, 100, 200, 500],
                total: 0,
            },
            loading: false,
            dtlloading: false,
            cellCheckData: {}
        }
    },
    methods: {
        handleQuery() {
            this.loading = true;
            let { deliNo, deliRemark, deliDate } = this.deliveryFormData;
            this.deliveryDtlCrudData = [];
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                deliNo: "!^%" + (deliNo || ''),
                deliRemark: "%" + (deliRemark || ''),
                deliDate: deliDate ? deliDate + ' 00:00:00' : '',
                suppId: parent.userID,
            }
            fetchPurDeliveryData(params).then(res => {
                let { records, total } = res.data;
                this.deliveryCrudData = records;
                this.page.total = total;
            }).finally(_ => {
                this.deliveryCrudData.length && this.$refs.deliveryCurd.setCurrentRow(this.deliveryCrudData[0]);
                this.rowClick(this.deliveryCrudData[0]);
                this.loading = false;
            })
        },
        handleGetDltaData(purDeliveryFk) {
            this.dtlloading = true;
            fetchPurDelisingleDtlaData({ purDeliveryFk }).then(res => {
                this.deliveryDtlCrudData = res.data.sort((a, b) => a.poNo > b.poNo ? 1 : -1);
            }).finally(_ => {
                this.dtlloading = false;
            })
        },
        rowClick(row) {
            if(!row) return;
            this.cellCheckData = row;
            row.purDeliveryoid && this.handleGetDltaData(row.purDeliveryoid);
        },
        handleReport() {
            if (!this.cellCheckData.deliNo) return this.$tip.warning("请先选择要导出的送货单!");
            let queryData = {
                module: "PUR",
                id: "PUR_DELIVERY",
            };
            fetchFineReportUrl(queryData).then((res) => {
                if (res.data) {
                    let url = res.data.url.replace("192.168.5.1", window.location.hostname) + "&deliNo=" + this.cellCheckData.deliNo;
                    let oA = document.createElement("a");
                    oA.href = url;
                    oA.target = "_blank";
                    oA.click();
                } else {
                    this.$tip.warning(this.$t("tipLabel.noreport"));
                }
            });
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>

</style>
