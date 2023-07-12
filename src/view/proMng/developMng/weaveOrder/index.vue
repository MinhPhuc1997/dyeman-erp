<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-30 08:33:19
 * @Description:
-->
<template>
    <div id="developMng-weaveOrder">
        <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane name="created" :label="$t('weaveNo')">
                <div :title="$t('weaveNo')" v-loading="wloading" :element-loading-text="$t('public.loading')">
                    <el-row class="btnList">
                        <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
                            <el-button type="success" :disabled="!detail.weaveJobId" @click="handleRowDBLClick(detail)">
                                {{ this.$t("public.update") }} </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                            <el-button type="primary" @click="add"> {{ this.$t("public.add") }} </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                            <el-button type="danger" :disabled="!detail.weaveJobId" @click="handleRemoveWeaveOrder"> {{
                            this.$t("public.del") }} </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="in" placement="top-start">
                            <el-button type="primary" @click="handlePrint" :disabled="!detail.weaveJobId"
                                :loading="wloading">打印</el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="copy" placement="top-start">
                            <el-button type="primary" @click="handleCopy" :loading="wloading"
                                :disabled="!detail.weaveJobId">复制</el-button>
                        </el-tooltip>
                        <el-button type="primary" @click="handleSendOrderClick" :loading="wloading">发单</el-button>
                        <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
                            <el-button type="primary" @click="handleQuery"> {{ this.$t("public.query") }} </el-button>
                        </el-tooltip>
                        <div style="float: right; margin-right: 5px">
                            模糊查询 <el-switch v-model="hasFuzzy" active-text="开" inactive-text="关"> </el-switch>
                        </div>
                    </el-row>
                    <el-row class="formBox">
                        <avue-form ref="weaveOrderFormData" :option="weaveOrderFormOp" v-model="weaveOrderFormData">
                        </avue-form>
                    </el-row>
                    <el-row class="crudBox">
                        <avue-crud ref="crud" id="crud" :option="weaveOrderCrudOp" :data="weaveOrderCrud"
                            :page.sync="page" v-loading="loading" :row-style="rowStyle" @on-load="handleQuery"
                            @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"> </avue-crud>
                    </el-row>
                    <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <tem-dlg ref="weaveOrderTem" :detail="detail" :isAdd="isAdd" :isCopy="isCopy" :audit="false"
                            @close="dialogVisible = false" @refresh="handleQuery"> </tem-dlg>
                    </el-dialog>
                    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <view-container :title="$t('public.printPreview')">
                            <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
                        </view-container>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane name="uncreate" label="待生成通知单" lazy>
                <un-create-list  ref="unCreateListRef" @select-create="handleSelectCreate" :filterTsm="true" />
            </el-tab-pane>
        </el-tabs>

        <!-- 收发单 -->
        <sendandreceive-order ref="sendandreceiveOrder" :typechangeable="false"
            :remote="{ key: 'weaveJobId', value: 'weaveJobId', label: 'weaveJobCode', fetchApi: fetchWeaveOrderByPage }"
            dispathReceive="2" :runJobInfo="detail"></sendandreceive-order>
    </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { fetchWeaveOrderByPage, removeWeaveOrder } from "./api";
import tem from "./temDlg";
import sendandreceiveOrder from "@/components/sendAndreceive-order.vue";
import UnCreateList from "../../print/proWeaveJob/unCreateList.vue"
export default {
    name: "developMng-weaveOrder",
    components: {
        temDlg: tem,
        sendandreceiveOrder,
        UnCreateList
    },
    data () {
        return {
            weaveOrderFormOp: mainForm(this),
            weaveOrderFormData: {},
            weaveOrderCrudOp: mainCrud(this, true),
            weaveOrderCrud: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            loading: false,
            dialogVisible: false,
            detail: {
            },
            isAdd: false,
            wloading: false,
            pdfDlg: false,
            pdfUrl: "",
            isCopy: false,
            hasFuzzy: true,
            fetchWeaveOrderByPage,
            tabs: "created"
        };
    },
    watch: {},
    methods: {
        handleQuery () {
            this.loading = true;
            this.detail = {};
            for (let key in this.weaveOrderFormData) {
                if (this.weaveOrderFormData[key] == "" && key != "auditState") {
                    delete this.weaveOrderFormData[key];
                }
            }
            let params = JSON.parse(JSON.stringify(this.weaveOrderFormData));
            if (this.hasFuzzy) {
                params.weaveJobCode =
                    "!^%" + (params.weaveJobCode ? params.weaveJobCode : "");
                params.salPoNo = "%" + (params.salPoNo ? params.salPoNo : "");
                params.colorCode = "%" + (params.colorCode ? params.colorCode : "");
            }
            fetchWeaveOrderByPage(
                Object.assign(params, {
                    rows: this.page.pageSize,
                    start: this.page.currentPage,
                    isWorkOut: 0,
                    jobType: 1
                })
            ).then((res) => {
                this.weaveOrderCrud = res.data.records;
                if (this.weaveOrderCrud.length > 0) {
                    this.$refs.crud.setCurrentRow(this.weaveOrderCrud[0]);
                }
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        // 生产织单回调
        handleSelectCreate(rows){
            console.log(rows);
            // this.$refs.weaveJobListRef.dataExtract(rows);
        },
        // 发单
        async handleSendOrderClick () {
            this.loading = true;
            this.$refs.sendandreceiveOrder.dialogVisible = true;
            await this.$nextTick();
            this.$refs.sendandreceiveOrder.initData(); // 初始化发单信息
            this.loading = false;
        },
        handlePrint () {
            this.pdfDlg = true;
            this.pdfUrl =
                process.env.API_HOST +
                "/api/proWeaveJob/prinEntityPdf?id=" +
                this.detail.weaveJobId;
        },
        async handleOpenTem () {
            this.dialogVisible = true;
            await this.$nextTick();
            this.$refs.weaveOrderTem.getWeaveData();
        },
        handleCopy () {
            this.isAdd = true;
            this.isCopy = true;
            this.handleOpenTem();
        },
        add () {
            this.isAdd = true;
            this.isCopy = false;
            this.handleOpenTem();
        },
        handleRemoveWeaveOrder () {
            if (this.detail.creator != parent.userID) {
                this.$tip.warning("你无权限删除该条数据!");
                return;
            }
            this.$tip
                .cofirm(
                    this.$t("iaoMng.delTle7") +
                    this.detail.weaveJobCode +
                    this.$t("iaoMng.delTle2"),
                    this,
                    {}
                )
                .then(() => {
                    removeWeaveOrder(this.detail.weaveJobId)
                        .then((res) => {
                            if (res.data.code === 200) {
                                this.$tip.success(this.$t("public.sccg"));
                                this.handleQuery();
                            } else {
                                this.$tip.error(res.data.msg);
                            }
                        })
                        .catch((err) => {
                            this.$tip.error(this.$t("public.scsb"));
                        });
                })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        },
        handleRowDBLClick (val) {
            this.isAdd = false;
            this.detail = val;
            this.handleOpenTem();
        },
        cellClick (val) {
            this.detail = val;
        },
        rowStyle ({ row }) {
            if (row.weaveState) {
                return {
                    backgroundColor: "#FBD295",
                };
            }
        },
    },
    created () { },
    mounted () {
        // this.handleQuery();
    },
    beforeDestroy () { },
};
</script>
<style lang='stylus'></style>
