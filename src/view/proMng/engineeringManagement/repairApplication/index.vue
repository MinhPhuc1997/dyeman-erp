<template>
    <div class='repairApplication'>
        <view-container title="报修申请单" :element-loading-text="$t('public.loading')" v-loading="loading">
            <div class="btnList">
                <el-button type="primary" @click="handleAdd">{{ $t("public.add") }}</el-button>
                <el-button type="success" @click="handleUpdate">{{ $t("public.update") }} </el-button>
                <el-button type="danger" @click="handleDel">{{ $t("public.del") }} </el-button>
                <el-button type="success" @click="handleFinish"> 完成 </el-button>
                <el-button type="warning" @click="handleReport(cellClickData.taskId)">{{ $t("public.report") }} </el-button>
                <el-popconfirm title="是否确定启动审批？" @onConfirm="approval">
                    <el-button type="warning" :loading="loading" slot="reference" style="margin: 0 10px"> 审批 </el-button>
                </el-popconfirm>
                <!-- :disabled="cellClickData.auditDesc == 0" -->
                <el-button type="primary" @click="flowTrack"
                    :disabled="cellClickData ? !cellClickData.auditDesc : false">流程跟踪</el-button>
                <el-button type="primary" @click="handleQuery">{{ $t("public.query") }} </el-button>
            </div>
            <div class="formBox">
                <avue-form ref="repairOrderForm" :option="repairOrderFormOp" v-model="repairOrderForm"></avue-form>
            </div>
            <div class="crudBox">
                <avue-crud ref="repairOrderCrud" :option="repairOrderCrudOp" :data="repairOrderCrud" :page.sync="page"
                    @on-load="handleQuery" @row-dblclick="handleRowDBLClick" :cell-style="cellStyle" @current-row-change="cellClick">
                </avue-crud>
            </div>
        </view-container>
        <edit-form ref="editForm" @refresh-list="handleQuery" @open-report="handleReport"></edit-form>
        <work-flow-track ref="workFlowTrack" :title="`报修申请单【 ${cellClickData ? cellClickData.taskCode : ''}】 `" />
    </div>
</template>

<script>
import editForm from "./edit-form.vue";
import { repairOrderFormOp, repairOrderCrudOp } from "./data";
import { fetchEngMaintenanceTask, updateEngMaintenanceTaskData, removeEngMaintenanceTaskData, startEngMaintenanceTaskInst } from "./api"
import workFlowTrack from "@/components/work-flow-track/index"
import { startWorkFlow } from "@/api/index";
export default {
    components: {
        'edit-form': editForm,
        workFlowTrack
    },
    data() {
        return {
            loading: false,
            page: {
                pageSize: 10,
                currentPage: 1,
                total: 0,
            },
            repairOrderFormOp: repairOrderFormOp(this),
            repairOrderForm: {},
            repairOrderCrudOp: repairOrderCrudOp(this),
            repairOrderCrud: [],
            cellClickData: {}
        }
    },
    methods: {
        handleQuery() {
            this.loading = true;
            let params = {
                taskCode: "!^%" + (this.repairOrderForm.taskCode || ''),
                repairLocal: "%" + (this.repairOrderForm.repairLocal || ''),
                repairContent: "%" + (this.repairOrderForm.repairContent || ''),
                servicedOrg: this.repairOrderForm.servicedOrg,
                repairType: this.repairOrderForm.repairType,
                founder: this.repairOrderForm.founder,
                serviceStaff: this.repairOrderForm.serviceStaff,
                auditDesc: this.repairOrderForm.auditDesc,
                rows: this.page.pageSize,
                start: this.page.currentPage,
            }
            fetchEngMaintenanceTask(params).then(res => {
                let { records, total } = res.data;
                this.repairOrderCrud = records;
                this.page.total = total;
            }).finally(() => {
                this.$refs.repairOrderCrud.setCurrentRow();
                this.loading = false;
            })
        },
        async handleAdd() {
            this.$refs.editForm.dialogVisible = true;
            await this.$nextTick();
            this.$refs.editForm.initData();
        },
        async handleUpdate() {
            this.$refs.editForm.dialogVisible = true;
            await this.$nextTick();
            this.$refs.editForm.editData(this.cellClickData.taskId);
        },
        handleFinish() {
            if (!this.cellClickData || !this.cellClickData.taskId) {
                return this.$tip.warning(this.$t("tipLabel.notCheckData"));
            }
            this.$tip.cofirm("是否确定完成编号为【 " + this.cellClickData.taskCode + this.$t("tipLabel.delEnd"))
                .then(() => {
                    let params = {
                        taskId: this.cellClickData.taskId,
                        completedTime: this.$getNowTime("datetime"),
                        auditor: this.$store.state.userOid,
                        approve: this.$store.state.userOid
                    }
                    updateEngMaintenanceTaskData(params)
                        .then((res) => {
                            if (res.data.code === 200) {
                                this.$tip.success(this.$t("public.bccg"));
                                this.handleQuery();
                            } else {
                                this.$tip.error(this.$t("public.bcsb"));
                            }
                        })
                        .catch((err) => {
                            this.$tip.error(this.$t("public.bcsb"));
                        });
                })
        },
        handleDel() {
            if (!this.cellClickData || !this.cellClickData.taskId) return this.$tip.warning(this.$t("public.delTle"));
            if (this.cellClickData.auditor && this.cellClickData.completedTime) return this.$tip.warning("已完成的申请单不能删除!");
            this.$tip.cofirm(this.$t("tipLabel.delCode") + this.cellClickData.taskCode + this.$t("tipLabel.delEnd"))
                .then(() => {
                    removeEngMaintenanceTaskData(this.cellClickData.taskId)
                        .then((res) => {
                            if (res.data.code === 200) {
                                this.$tip.success(this.$t("public.sccg"));
                                this.handleQuery();
                            } else {
                                this.$tip.error(this.$t("public.scsb"));
                            }
                        })
                        .catch((err) => {
                            this.$tip.error(this.$t("public.scsb"));
                        });
                })
        },
        handleRowDBLClick(row) {
            this.cellClickData = row;
            this.handleUpdate();
        },
        cellClick(row) {
            this.cellClickData = row;
        },
        //  启动审批流程
        approval() {
            if (!this.cellClickData.taskId) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            this.loading = true;
            let params = {
                PKey: "repair",
                busKey: this.cellClickData.taskId,
                message: this.cellClickData.repairContent
            }
            startEngMaintenanceTaskInst(params).then(res => {
                if (res.data.code == 500) {
                    this.$tip.error(res.data.msg);
                    return
                }
                this.handleQuery();
                this.$tip.success("启动审批成功!");
            }).finally(_ => {
                this.loading = false;
            })
        },
        // 流程跟踪
        flowTrack() {
            if (!this.cellClickData.taskId) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            this.$refs.workFlowTrack.initData(this.cellClickData.taskId);
        },
        handleReport(taskId) {
            if (!taskId) {
                return this.$tip.warning(this.$t("tipLabel.notCheckData"));
            }
            let url = `http://${window.location.hostname}:91`.replace("localhost", "192.168.5.1") + "/api/engMaintenanceTask/pdf?id=" + taskId;
            let oA = document.createElement("a");
            oA.href = url;
            oA.target = "_blank";
            oA.click();
        },
        cellStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex != 1) return;
            if (row.auditDesc === "1") {
                return {
                    color: "#F56C6C"
                }
            } else if (row.auditDesc === "2") {
                return {
                    color: "#E6A23C"
                }
            } else if (row.auditDesc === "3") {
                return {
                    color: "#67C23A"
                }
            }
        },
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>
.repairApplication {}
</style>