<template>
    <div class='testMachine-revolve'>
        <view-container :title="$t('revolve.title17')">
            <div class="btnList">
                <el-button type="success" @click="handleUpdate" :disabled="!cellClickData || !cellClickData.runJobId"
                    :loading="loading">
                    {{ $t("public.update") }}
                </el-button>
                <el-button type="primary" @click="handleAdd" :loading="loading">
                    {{ $t("public.add") }}
                </el-button>
                <el-button type="danger" @click="handleDel" :disabled="!cellClickData || !cellClickData.runJobId"
                    :loading="loading">
                    {{ $t("public.del") }}
                </el-button>
                <el-button type="primary" @click="handlePrint" :loading="loading"
                    :disabled="!cellClickData || cellClickData.auditState != 1">
                    {{ $t("public.print") }}
                </el-button>
                <el-button type="primary" @click="exhaustPrint" :loading="loading">{{ $t("exhaustCard") }}</el-button>
                <!--  -->
                <el-dropdown placement="top-start" split-button type="warning" @click="splitVatNo('A')"
                    :loading="loading" :disabled="hasSplit" style="margin: 0 10px">
                    {{ $t("revolve.splitVat") }}
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item @click.native="splitVatNo('A')"> {{ $t("revolve.splitVatA") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="splitVatNo('B')">{{ $t("revolve.splitVatB") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="splitVatNo('R')">{{ $t("revolve.splitVatR") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="updateVatNo('R')" :disabled="hasUpdateVatNo">{{
                                $t("revolve.updateVatR")
                        }} -->
                        <!-- </el-dropdown-item> -->
                        <el-dropdown-item @click.native="handleUpdate('W')">{{ $t("revolve.splitVatW") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="updateVatNo('W')" :disabled="hasUpdateVatNo">{{
                                $t("revolve.updateVatW")
                        }}
                        </el-dropdown-item>
                        <!-- <el-dropdown-item @click.native="splitVatNo('L')">{{ $t("revolve.splitVatL") }} -->
                        <!-- </el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="primary" @click="handleQuery" :loading="loading">
                    {{ $t("public.query") }}
                </el-button>
            </div>
            <div class="formBox">
                <avue-form ref="queryForm" :option="queryFormOp" v-model="queryForm"></avue-form>
            </div>
            <div class="crudBox">
                <avue-crud ref="revolveCrud" :option="crudDataOp" :data="crudData" :page.sync="page" v-loading="loading"
                    @on-load="handleQuery" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick">
                </avue-crud>
            </div>
            <edit-form ref="editForm" @refresh="handleQuery" />
            <el-dialog :visible.sync="pdfDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false"
                :close-on-press-escape="false" @close="pdfClose">
                <view-container :title="$t('public.printPreview')">
                    <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
                </view-container>
            </el-dialog>
        </view-container>
    </div>
</template>

<script>
import editForm from "./edit-form";
import { mainForm, mainCrud } from "../../revolve/data";
import { getDye, delDye, get as fetchRunJobData, update as updateRunJob, del as removeRunJobData, fetchUpdateVatNoByType } from "../../revolve/api"
export default {
    data() {
        return {
            queryFormOp: mainForm(this),
            queryForm: {
                jobType: 3
            },
            crudDataOp: mainCrud(this),
            crudData: [],
            loading: true,
            page: {
                pageSizes: [20, 50, 100, 200, 500],
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            cellClickData: {
                runJobId: '',
            },
            selectionData: [],
            pdfDlg: false,
            pdfUrl: "",
            isExhaust: false
        }
    },
    components: {
        editForm
    },
    computed: {
        // 是否可拆单
        hasSplit() {
            let vatNo = this.cellClickData.vatNo;
            return (
                !this.cellClickData.runJobId ||
                vatNo.includes("B") ||
                vatNo.includes("W")
            );
        },
        // 是否可改缸
        hasUpdateVatNo() {
            return ["B", "W"].every((type) =>
                (this.cellClickData.vatNo || "").includes(type)
            );
        },
        // 是否可改R缸
        hasUpdateRVat() {
            return !(this.cellClickData.vatNo || "").includes("R");
        }
    },
    methods: {
        async handleQuery() {
            this.loading = true;
            // this.cellClickData = null;
            this.selectionData = [];
            let params = {
                vatNo: "%" + (this.queryForm.vatNo || ""),
                weaveJobCode: "%" + (this.queryForm.weaveJobCode || ""),
                salPoNo: "%" + (this.queryForm.salPoNo || ""),
                colorCode: "%" + (this.queryForm.colorCode || ""),
                serviceOperator: "%" + (this.queryForm.serviceOperator || ""),
                fabName: "%" + (this.queryForm.fabName || ""),
                gramWeight: "%" + (this.queryForm.gramWeight || ""),
                fabElements: "%" + (this.queryForm.fabElements || ""),
                // workDate: this.queryForm.workDate,
                custCode: this.queryForm.custCode,
                jobType: 3,
                delFlag: 0,
                dataSortRules: "workDate|desc,vatNo",
                rows: this.page.pageSize,
                pages: this.page.currentPage,
            }
            
            if (this.queryForm.workDate && this.queryForm.workDate.length) {
                params.workDate_begin = this.queryForm.workDate[0] + " 00:00:00";
                params.workDate_end = this.queryForm.workDate[1] + " 23:59:59";
            }
            fetchRunJobData(params).then(res => {
                let { records, total } = res.data;
                this.page.total = total;
                if (!total) {
                    this.crudData = [];
                    return;
                }
                this.crudData = records;
                this.crudData.length > 0 &&
                    this.$refs.revolveCrud.setCurrentRow(this.crudData[0]);
            }).finally((_) => {
                this.loading = false;
            })
        },
        // 修改
        handleUpdate(type) {
            if (!this.cellClickData || !this.cellClickData.runJobId) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            this.$refs.editForm.initEditData(Object.assign(this.cellClickData, { type }));
        },
        // 新增
        handleAdd() {
            this.$refs.editForm.initNewData();
        },
        // 删除
        handleDel() {
            if (!this.cellClickData || !this.cellClickData.runJobId) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            this.$tip
                .cofirm(this.$t("tipLabel.deleteConfirm"))
                .then(() => {
                    this.loading = true;
                    removeRunJobData(this.cellClickData.runJobId).then((res) => {
                        if (res.data !== -1) {
                            this.$tip.success(this.$t("public.sccg"));
                            getDye({ vatNo: this.cellClickData.vatNo }).then((dye) => {
                                if (dye.data.length) {
                                    delDye(dye.data[0].bleadyeJobId).then(
                                        (delDye) => { }
                                    );
                                }
                            });
                        } else {
                            this.$tip.error(res.data.msg);
                        }
                    }).finally(() => {
                        this.handleQuery();
                    })
                })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        },
        // 改缸
        updateVatNo(type) {
            this.$confirm(
                this.$t("revolve.updateVatNoConfirm"),
                this.$t("warn"),
                { type: "warning" }
            ).then((res) => {
                this.loading = true;
                fetchUpdateVatNoByType(type, this.cellClickData.vatNo)
                    .then((res) => {
                        if (res.data.data) {
                            this.handleQuery();
                        } else {
                            this.$tip.error("操作失败!")
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        handleRowDBLClick(row) {
            this.cellClickData = row;
            this.handleUpdate()
        },
        handlePrint() {
            this.pdfDlg = true;
            this.isExhaust = false;
            this.pdfUrl =
                process.env.API_HOST +
                "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
                this.cellClickData.runJobId;
        },
        exhaustPrint() {
            this.pdfDlg = true;
            this.isExhaust = true;
            this.pdfUrl =
                process.env.API_HOST +
                "/api/proBleadyeRunJob/smallCard?id=" +
                this.cellClickData.runJobId;
        },
        cellClick(row) {
            this.cellClickData = row;
        },
        pdfClose() {
            if (this.cellClickData.runState == "1" && !this.isExhaust) {
                this.$tip
                    .cofirm(this.$t("tipLabel.updatePrintStatus"))
                    .then(() => {
                        this.cellClickData.printDate = this.$getNowTime("datetime");
                        this.cellClickData.modifiDate = this.cellClickData.printDate;
                        this.cellClickData.runState = "3";
                        updateRunJob(this.cellClickData).then((res) => {
                            if (res.data.code == 200) {
                                this.$tip.success(this.$t("public.bccg"));
                                this.pdfDlg = false;
                            } else {
                                this.$tip.error(res.data.msg);
                            }
                        });
                    })
                    .catch(() => {
                        this.pdfDlg = false;
                    });
            }
        },
    },
    created() {
    },
    mounted() {
        this.crudDataOp.selection = false;
        this.crudDataOp.index = true;
        this.crudDataOp.column[0].hide = true;
    },
}
</script>

<style>

</style>