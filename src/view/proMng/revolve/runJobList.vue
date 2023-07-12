<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-02-02 11:31:47
 * @Description:
-->
<template>
    <div id="runJob" v-loading="wloading" :element-loading-text="$t('public.loading')">
        <el-row class="btnList">
            <template v-if="!isAutoSplit">
                <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
                    <el-button type="success" @click="handleRowDBLClick(detail)">
                        {{ $t("public.update") }}
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                    <el-button type="danger" :disabled="!selectList.length" @click="del">{{ $t("public.del") }}
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
                    <el-button type="primary" @click="print" :loading="wloading" :disabled="detail.auditState != 1">{{
                            $t("public.print")
                    }}
                    </el-button>
                </el-tooltip>
                <el-button type="primary" @click="exhaustPrint" :loading="wloading">{{ $t("exhaustCard") }}</el-button>
                <!--   -->
                <el-dropdown  v-hasPerm="['proMng:revolve:split']" placement="top-start" split-button type="warning"
                    @click="splitVatNo('A')" :loading="wloading" :disabled="hasSplit" style="margin: 0 10px">
                    {{ $t("revolve.splitVat") }}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="splitVatNo('A')" v-hasPerm="['proMng:revolve:splitA']"> {{ $t("revolve.splitVatA") }}
                        </el-dropdown-item>
<!--                        <el-dropdown-item @click.native="splitVatNo('B')">{{ $t("revolve.splitVatB") }}-->
<!--                        </el-dropdown-item>-->
                        <el-dropdown-item @click.native="splitVatNo('R')" v-hasPerm="['proMng:revolve:splitR']">{{ $t("revolve.splitVatR") }}
                        </el-dropdown-item>
                        <!-- <el-dropdown-item @click.native="updateVatNo('R')" :disabled="hasUpdateVatNo">{{
                                $t("revolve.updateVatR")
                        }}
                        </el-dropdown-item> -->
                        <el-dropdown-item @click.native="splitVatNo('W')" v-hasPerm="['proMng:revolve:splitW']">{{ $t("revolve.splitVatW") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="updateVatNo('W')" :disabled="hasUpdateVatNo" v-hasPerm="['proMng:revolve:updateW']">{{
                                $t("revolve.updateVatW")
                        }}
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="splitVatNo('L')" v-hasPerm="['proMng:revolve:splitL']">{{ $t("revolve.splitVatL") }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" v-if="$store.getters.isSk" :disabled="hasUpdateRVat" @click="handlerRvUpdate">
                    {{ $t("revolve.rvat") }}
                </el-button>
                <el-button type="primary" @click="handleOpenSchedule">{{ $t("public.schedule") }}</el-button>
                <el-button type="primary" @click="handleOpenSendOrder">{{ $t("public.sendOrder") }}</el-button>
                <el-button type="primary" @click="handleReport">{{ $t("public.report") }}</el-button>
            </template>
            <template v-else-if="isAutoSplit">
                <el-button type="success" @click="handleAutoSplitConfirm">{{ $t("public.determine") }}</el-button>
            </template>
            <!-- <el-popconfirm title="是否确定启动审批？" @onConfirm="approval">
          <el-button type="warning" :loading="wloading" slot="reference" style="margin: 0 10px"> 审批 </el-button>
        </el-popconfirm> -->
        <!-- <el-button type="primary" @click="flowTrack" :disabled="detail.auditDesc == 0" >流程跟踪</el-button> -->
            <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
                <el-button type="primary" @click="handleQuery">{{ $t("public.query") }}</el-button>
            </el-tooltip>
        </el-row>
        <el-row class="formBox">
            <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
            <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
                :row-style="rowStyle" @on-load="handleQuery" @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick" @selection-change="selectionChange">
            </avue-crud>
        </el-row>
        <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
            :close-on-click-modal="false" :close-on-press-escape="false">
            <tem-dlg ref="tem" :detail="detail" :isExtract="isExtract" :isAdd="isAdd" :isSplit="isSplit"
                :splitType="splitType" @close="dialogVisible = false" @refresh="handleQuery"
                @refresh-uncreate="refreshUncreate"></tem-dlg>
        </el-dialog>
        <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
            :close-on-click-modal="false" :close-on-press-escape="false" @close="pdfClose">
            <view-container :title="$t('public.printPreview')">
                <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
            </view-container>
        </el-dialog>
        <!-- 排期工序 -->
        <schedule-detail ref="scheduleDetail" :scheduleType="2" :runJobInfo="detail"></schedule-detail>
        <!-- 收发单 -->
        <sendandreceive-order ref="sendandreceiveOrder" :typechangeable="false" :remote="{
            key: 'runJobId',
            value: 'runJobId',
            label: 'vatNo',
            fetchApi: get,
        }" :defaultParams="sendRecDefaultData" :disPropValue="sendDisProps" dispathReceive="2" :runJobInfo="detail">
        </sendandreceive-order>

        <RVatUpate ref="rVatUpateRef" @success="handleUpdRVatSuc" />

        <!-- <work-flow-track ref="workFlowTrack" :title="`运转单【 ${detail.vatNo}】 `" /> -->
    </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {
    get,
    update,
    del,
    delDye,
    getDye,
    fetchProBleadyeRunJobDataPage,
    fetchUpdateVatNoByType,
    printProBleadyeRunJob,
    startWorkFlow
} from "./api";
import tem from "./temDlg";
import scheduleDetail from "./schedule-detail.vue";
import sendandreceiveOrder from "@/components/sendAndreceive-order.vue";
import RVatUpate from "./rVatUpdate.vue"
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
// import workFlowTrack from "@/components/work-flow-track/index"
export default {
    name: "runJobList",
    components: {
        temDlg: tem,
        scheduleDetail,
        sendandreceiveOrder,
        RVatUpate,
        // workFlowTrack
    },
    props: {
        isAutoSplit: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            formOp: mainForm(this),
            form: {
                salPoNo: "",
                colorCode: "",
            },
            crudOp: mainCrud(this),
            crud: [],
            isExhaust: false,
            page: {
                pageSizes: [20, 50, 100, 200, 500],
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            loading: false,
            dialogVisible: false,
            detail: {},
            isAdd: false,
            isSplit: false,
            input: "",
            wloading: false,
            czsocket: {},
            pdfDlg: false,
            pdfUrl: "",
            selectList: [],
            splitType: "A",
            hasFinied: 0,
            get,
            // 抽取状态
            isExtract: false,
            // 收发单默认参数
            sendRecDefaultData: {
                sendProcessFk: 'sk',
                dptworkProcessFk: "rs",
                stepId: "3084D8F4D9F64B8C856FBF4C17787D38",
            },
            sendDisProps: ["sendProcessFk", "stepId"],
        };
    },
    computed: {
        // 是否可拆单
        hasSplit() {
            let vatNo = this.detail.vatNo;
            return (
                !this.detail.runJobId ||
                vatNo.includes("B") ||
                vatNo.includes("W")
            );
        },
        // 是否可改缸
        hasUpdateVatNo() {
            return ["B", "W"].every((type) =>
                (this.detail.vatNo || "").includes(type)
            );
        },
        // 是否可改R缸
        hasUpdateRVat() {
            return !(this.detail.vatNo || "").includes("R");
        }
    },
    watch: {},
    methods: {
            //  启动审批流程
        approval() {
            if (!this.detail.runJobId) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            this.wloading = true;
            let params = {
                PKey: "bleadye",
                busKey: this.detail.runJobId
            }
            startWorkFlow(params).then(res => {
                if(res.data.code == 500) {
                    this.$tip.error(res.data.msg);
                    return
                }
                this.handleQuery();
                this.$tip.success("启动审批成功!");
            }).finally(_ => {
                this.wloading = false;
            })
        },
        // 流程跟踪
        flowTrack() {
        if (!this.detail.runJobId) {
            this.$tip.warning(this.$t("tipLabel.notCheckData"));
            return;
        }
        this.$refs.workFlowTrack.initData(this.detail.runJobId);
        },
        // 自动拆缸确认
        async handleAutoSplitConfirm() {
            let { vatNo } = this.detail;
            if (!vatNo) return this.$tip.warning(this.$t("tipLabel.notCheckData"));
            let isConfirm = await this.$tip.cofirm(`${this.$t("revolve.autoSplitConfirm")}${vatNo}${this.$t("revolve.autoSplitConfirm1")}`).then(res => true).catch(err => false);
            if (!isConfirm) return;
            this.detail.autoSplitConfirm = 1;
            this.loading = true;
            update(this.detail).then(res => {
                this.$emit("refresh");
                this.handleQuery();
            }).finally(() => {
                this.loading = false;
            })
        },
        // R缸改染
        handlerRvUpdate() {
            let { vatNo, salPoNo, runJobId } = this.detail;
            this.$refs.rVatUpateRef.formData.poNo = salPoNo;
            this.$refs.rVatUpateRef.formData.vatNo = vatNo
            this.$refs.rVatUpateRef.formData.runJobId = runJobId
            this.$refs.rVatUpateRef.visible = true;
        },
        // 改染R缸成功回调
        handleUpdRVatSuc() {
            this.handleQuery();
        },
        // 抽取数据赋值
        async dataExtract(row) {
            // 打开面板
            this.add();
            this.isExtract = true;
            await this.$nextTick();
            this.$refs.tem.setGstDataExtract(row);
        },
        async initSplitData(row) {
            this.loading = true;
            this.$refs.crud.setCurrentRow();
            get({ vatNo: row.vatNo }).then(res => {
                if (!res.data.total) {
                    this.$tip.warning(this.$t("revolve.splitWarning"));
                    return
                }
                this.detail = res.data.records[0];
                this.detail.detailIdFk = row.detailId;
                this.detail.dutyDep = row.chargeDpt;
                this.detail.splitReason = row.problemDesc;
                this.detail.procMethod = row.solution;
                switch (row.divdVatTypeCode) {
                    case "01":
                        this.splitVatNo("A");
                        break;
                    case "02":
                        this.splitVatNo("R");
                        break;
                    case "03":
                        this.splitVatNo("W");
                        break;
                    case "06":
                        this.splitVatNo("B");
                        break;
                    case "04":
                        this.updateVatNo("R");
                        break;
                    case "05":
                        this.updateVatNo("W");
                        break;
                    case "07":
                        this.splitVatNo("L");
                    default:
                        break;
                }
                this.loading = false;
            })

        },
        handleQuery() {
            this.loading = true;
            this.detail = {};
            let params = {
                vatNo: "%" + (this.form.vatNo || ""),
                weaveJobCode: "%" + (this.form.weaveJobCode || ""),
                salPoNo: "%" + (this.form.salPoNo || ""),
                colorCode: "%" + (this.form.colorCode || ""),
                serviceOperator: "%" + (this.form.serviceOperator || ""),
                fabName: "%" + (this.form.fabName || ""),
                gramWeight: "%" + (this.form.gramWeight || ""),
                fabElements: "%" + (this.form.fabElements || ""),
                auditState: this.form.auditState,
                disAutoSplit: true, // 区分运转单（是否自动拆缸未确认）
                confirmStatus: this.isAutoSplit ? '0' : "1",
            };
            if(this.form.dyeMatter!=null){
              params= Object.assign(params,{dyeMatter:this.form.dyeMatter})
            }

            if (this.form.workDate && this.form.workDate.length) {
                params.workDate_begin = this.form.workDate[0] + " 00:00:00";
                params.workDate_end = this.form.workDate[1] + " 23:59:59";
            }
            fetchProBleadyeRunJobDataPage(
                Object.assign(params, {
                    rows: this.page.pageSize,
                    start: this.page.currentPage,
                    pages: this.page.currentPage,
                    custCode: this.form.custCode,
                    jobType: 2,
                    delFlag: 0,
                    dataSortRules: "workDate|desc,vatNo",
                })
            ).then((res) => {
                this.crud = res.data.records;
                this.crud.forEach((item, i) => {
                    item.index = i + 1;
                });
                this.crud.length > 0 &&
                    this.$refs.crud.setCurrentRow(this.crud[0]);
                this.page.total = res.data.total;
                if (this.isAutoSplit) {
                    this.$emit("setUnConfirmCount", res.data.total)
                }

            }).finally((_) => {
                this.loading = false;
            })
        },
        async handleOpenSchedule() {
            this.loading = true;
            this.$refs.scheduleDetail.dialogVisible = true;
            await this.$nextTick();
            this.$refs.scheduleDetail.handleQuery(); // 初始化排期信息
            this.loading = false;
        },
        async handleOpenSendOrder() {
            this.loading = true;
            this.$refs.sendandreceiveOrder.dialogVisible = true;
            await this.$nextTick();
            this.$refs.sendandreceiveOrder.initData(); // 初始化发单信息
            this.loading = false;
        },
        async handleReport() {
            this.loading = true;
            try {
                //获得Excel模板的buffer对象
                const exlBuf = await JSZipUtils.getBinaryContent("./static/xlxsTemplate/proRunJobList.xlsx");
                var template = new XlsxTemplate(exlBuf);
                var sheetNumber = "Sheet1";
                var values = {
                    arr: this.crud,
                };
                let _this = this;
                this.$nextTick(() => {
                    template.substitute(sheetNumber, values);
                    // Get binary data.
                    var out = template.generate({ type: "blob" });
                    var fun1 = function () {
                        return new Promise((resolve, reject) => {
                            saveAs(out, `运转单明细_${_this.$getNowTime("date")}.xlsx`);
                            resolve();
                        });
                    };
                    fun1().then((res) => {
                        setTimeout(() => {
                            this.$tip.success(this.$t("public.dccg"));
                            this.loading = false
                        }, 500);
                    });
                    // });
                })
            } catch (e) {
                console.log(e);
            }
        },
        exhaustPrint() {

            this.pdfDlg = true;
            this.isExhaust = true;
            this.pdfUrl =
                process.env.API_HOST +
                "/api/proBleadyeRunJob/smallCard?id=" +
                this.detail.runJobId;

        },
        print() {

          this.pdfDlg = true;
          this.isExhaust = false;
          let url = (this.detail.dyeMatter==1)?"/api/proBleadyeRunJob/createBleadyeRunJobPdf":"/api/proBleadyeRunJob/flatPdf"
          this.pdfUrl =
            process.env.API_HOST + url+"?id=" +this.detail.runJobId + '&UserName=' + parent.userID;
        },
        audit() {
            this.$tip
                .cofirm(this.$t("tipLabel.auditTle"))
                .then(() => {
                    this.selectList.forEach((item, i) => {
                        item.auditState = 1;
                        update(item).then((res) => {
                            if (i == this.selectList.length - 1) {
                                this.$tip.success(this.$t("public.sccg"));
                                this.handleQuery();
                            }
                        });
                    });
                })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        },
        add() {
            this.isSplit = false;
            this.isAdd = true;
            this.isExtract = false;
            this.handleOpenTemDlg();
        },
        splitVatNo(type) {
            this.splitType = type;
            this.isSplit = true;
            this.isAdd = true;
            this.isExtract = false;
            this.handleOpenTemDlg();
        },
        async handleOpenTemDlg() {
            this.dialogVisible = true;
            await this.$nextTick();
            this.$refs.tem.initData();
        },
        // 改缸
        updateVatNo(type) {
            this.$confirm(
                this.$t("revolve.updateVatNoConfirm"),
                this.$t("warn"),
                { type: "warning" }
            ).then((res) => {
                this.loading = true;
                fetchUpdateVatNoByType(type, this.detail.vatNo)
                    .then((res) => {
                        if (res.data.data) {
                            this.handleQuery();
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        del() {
            this.$tip
                .cofirm(this.$t("tipLabel.deleteConfirm"))
                .then(() => {
                    this.wloading = true;
                    this.selectList.forEach((item, i) => {
                        del(item.runJobId).then((res) => {
                            if (res.data !== -1) {
                                this.$tip.success(this.$t("public.sccg"));
                                getDye({ vatNo: item.vatNo }).then((dye) => {
                                    if (dye.data.length) {
                                        delDye(dye.data[0].bleadyeJobId).then(
                                            (delDye) => { }
                                        );
                                    }

                                });
                            } else {
                                this.$tip.error(res.data.msg);
                            }
                            if (i == this.selectList.length - 1) {
                                setTimeout(() => {
                                    this.wloading = false;
                                    this.handleQuery();
                                }, 200);
                            }
                        });
                    });
                })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        },
        rowStyle({ row, column, rowIndex }) {
            if (row.runState == "0") {
                return {
                    backgroundColor: "#FBD295",
                };
            } else if (row.auditState === 0) {
                return {
                    backgroundColor: "#F56C6C"
                };
            }
        },
        handleRowDBLClick(val) {
            if (!val.runJobId) {
                this.$tip.warning(this.$t("public.updateTle"))
                return
            }
            this.isAdd = false;
            this.detail = val;
            this.handleOpenTemDlg();
        },
        cellClick(val) {
            this.detail = val;
        },
        refreshUncreate() {
            this.$emit("refresh-unCreate");
        },
        selectionChange(val) {
            this.selectList = val;
        },
        pdfClose() {
            if (this.detail.runState == "1" && !this.isExhaust) {
                this.$tip
                    .cofirm(this.$t("tipLabel.updatePrintStatus"))
                    .then(() => {
                        this.detail.printDate = this.$getNowTime("datetime");
                        this.detail.modifiDate = this.detail.printDate;
                        this.detail.runState = "3";
                        update(this.detail).then((res) => {
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
    updated() {
        this.$nextTick(() => {
            this.crud.length && this.$refs.crud.doLayout();
        });
    },
    created() { },
    mounted() {
    },
    beforeDestroy() { },
};
</script>
<style lang='stylus' scoped>
>>>.avue-crud__menu {
    // height: 35px !important;
}

>>>.avue-crud__tip {
    display: none !important;
    height: 0px !important;
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
    font-size: 15px !important;
    line-height: 28px !important;
}

>>>.el-dropdown {
    &[disabled='disabled'] {
        position: relative;

        &::after {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            background: #ffffff88;
            cursor: help;
        }
    }
}
</style>
