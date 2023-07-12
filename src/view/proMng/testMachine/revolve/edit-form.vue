<template>
    <div class='testMachine-edit-form'>
        <el-dialog :visible.sync="dialogVisible" fullscreen width="100%" append-to-body :close-on-click-modal="false"
            :close-on-press-escape="false">
            <div class="btnList">
                <el-button type="success" :disabled="
                    form.auditState == 1 && (form.runState == '1' || form.runState == '3')
                " @click="handleSaveBeforeValid" :loading="loading">{{ $t('public.save') }}
                </el-button>
                <el-button type="primary" @click="handlePrint" :disabled="
                    !form.runJobId || form.auditState != 1 || form.runState == '0'
                ">{{ $t("public.print") }}</el-button>
                <el-button type="primary" :disabled="!form.runJobId" @click="exhaustPrint" :loading="loading"> {{
                        $t("exhaustCard")
                }}
                </el-button>
                <el-button type="warning" @click="dialogVisible = false">{{ $t('public.close') }}</el-button>
            </div>
            <el-row class="formBox">
                <el-col :span="6">
                    <view-container title="胚布细码 Chi tiết vải mộc">
                        <avue-crud ref="bf" id="bf" :option="bfOp" :data="clothNoteData" v-loading="loading"
                            :summary-method="handleSummaryMethod"></avue-crud>
                    </view-container>
                </el-col>
                <el-col :span="18">
                    <view-container :title="$t('revolve.title4')">
                        <div style="height: calc(100vh - 145px); overflow: auto">
                            <avue-form ref="form" :option="editFormOp" v-model="form" v-loading="loading"
                                :element-loading-text="$t('public.loading')">
                                <template slot-scope="scope" slot="weaveJobCode">
                                    <el-select v-model="form.weaveJobCode" filterable remote reserve-keyword clearable
                                        default-first-option :placeholder="$t('tipLabel.inputWeaveCode')"
                                        :remote-method="remoteMethod" :loading="remoteLoading" @change="codeChange">
                                        <el-option v-for="item in weaveJobOp" :key="item.weaveJobId"
                                            :label="item.weaveJobCode" :value="item.weaveJobCode">
                                        </el-option>
                                    </el-select>
                                </template>
                            </avue-form>
                            <testStand-and-proItem ref="testStandAndProItemVue"></testStand-and-proItem>
                        </div>
                    </view-container>

                </el-col>
            </el-row>
        </el-dialog>
        <saveNotEnoughError ref="saveNotEnoughError" />
        <el-dialog :visible.sync="pdfDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false"
            :close-on-press-escape="false" @close="pdfClose">
            <view-container :title="$t('public.printPreview')">
                <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { timeConversion } from "@/config/util";
import saveNotEnoughError from "../../revolve/saveNotEnoughError"
import testStandAndProItem from "../../revolve/testStandAndProItem"
import { mainCrud, bfOp } from "../../revolve/data";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { getWeave, fetchProGstPoData, getGroup, fetchJobYarnInfoDataByWeaveCodeId, get as fetchRunJobData, add as createRunJobData, del as removeRunJobData, update as updateRunJobData, getBf, fetchSpliteVatNo } from "../../revolve/api"
export default {
    data() {
        return {
            loading: true,
            remoteLoading: false,
            dialogVisible: false,
            editFormOp: mainCrud(this),
            form: {},
            clothNoteData: [],
            weaveJobOp: [],
            bfOp: bfOp(this),
            pdfDlg: false,
            pdfUrl: "",
            isExhaust: false
        }
    },
    components: {
        testStandAndProItem,
        saveNotEnoughError
    },
    methods: {
        initData() {
            this.editFormOp.column.forEach((item) => {
                if (item.prop == 'salPoNo') item.formslot = false;
                item.disabled = false;
                if (item.prop == 'vatNo') item.disabled = true;
            })
        },
        // 初始化新增数据
        async initNewData() {
            this.loading = true;
            this.dialogVisible = true;
            await this.$nextTick();
            for (let key in this.form) {
                this.form[key] = null;
            }
            baseCodeSupplyEx({ code: "developRunJob" }).then(async (res) => {

                this.form = {
                    runType: 1,
                    jobType: 3,
                    auditState: 0,
                    clothWeight: 0,
                    pidCount: 1,
                    vatNo: "TDF-" + res.data.data,
                    forClothLockJoin: false,
                    forClothTurnOver: false,
                    forClothTogetherVat: false,
                    forClothOrderHair: false,
                    forClothAgainstHair: false,
                    compLightSource: ["H", "G"],
                    throwDry: "3Washing / 3tumble",
                    poVatCount: 1,
                    vatIndex: 1,
                    poColorCount: 1,
                    firstOrOther: "2",
                    dyeMatter: 1,
                    weaveFactoryName: "S.POWER",
                    address: "S.POWER WAREHOUSE",
                    salType: "sample",
                    wmUnit: "KG",
                    avgEachWeightKg: 58,
                    workDate: this.$getNowTime(),
                    serviceOperator: parent.userID,
                    runState: 1,
                    runJobId: "",
                    custCode: 'C039',
                    deliveDate: this.$getNowTime(),
                    remark: "试机"
                }
                await this.$refs.testStandAndProItemVue.initData(null); // 清除测试数据
                await this.$nextTick();
            }).finally((_) => {
                this.loading = false;
            })
        },
        // 初始化修改数据
        async initEditData({ runJobId, type }) {
            if (!runJobId) return;
            this.loading = true;
            this.dialogVisible = true;
            await this.$nextTick();
            let params = {
                runJobId
            }
            this.editFormOp.group[0].display = false;
            fetchRunJobData(params).then(async res => {
                if (!res.data.total) {
                    this.loading = false;
                    this.$tip.error(this.$t("tipLabel.dataError"));
                    this.dialogVisible = false;
                    return;
                }
                this.form = res.data.records[0];
                if (type) {
                    this.form.oldRunJobId = this.form.runJobId;
                    this.form.runJobId = ''
                    // this.form.detailIdFk && this.getSpliitNote(); // 获取拆单明细
                    // 去除打印日期值
                    await fetchSpliteVatNo(type, this.form.vatNo).then(res => {
                        this.form.origVat = this.form.vatNo;
                        this.form.vatNo = res.data.data;
                        this.form.divdVatFlag = 1; // 拆单标志
                        this.editFormOp.group[0].display = true;
                        // this.vaildHasSplitB(); // 判断是否拆B缸
                    })
                    this.form.auditState = 0;
                    this.form.clothWeight = 0;
                    this.form.pidCount = 1;
                    Object.keys(this.form).forEach((item) => {
                        if (this.isEmpty(this.form[item])) {
                            delete this.form[item];
                        }
                    });
                }
                Object.keys(this.form).forEach((item) => {
                    if (this.isEmpty(this.form[item])) {
                        delete this.form[item];
                    }
                });
                if (!(this.form.mergVatNo instanceof Array) && this.form.mergVatNo) {
                    this.form.mergVatNo = this.form.mergVatNo.split("/");
                }
                if (
                    !(this.form.compLightSource instanceof Array) &&
                    this.form.compLightSource
                ) {
                    this.form.compLightSource = this.form.compLightSource.split(",");
                }
                if (this.form.dutyDep) {
                    this.form.dutyDep = this.form.dutyDep.split(",");
                }
                await this.$refs.testStandAndProItemVue.initData(this.form.runJobId); // 获取测试要求、 生产项目
                !type && await getBf({ proBleadyeRunJobFk: this.form.runJobId }).then((bf) => {
                    this.clothNoteData = bf.data;
                    this.clothNoteData.sort((a, b) => {
                        return a.sn - b.sn;
                    });
                })
            }).finally((_) => {
                this.loading = false;
            })
        },
        async handleSaveBeforeValid() {
            this.loading = true;
            await this.$nextTick();
            this.$refs.form.validate(async (valid, done) => {
                if (valid) {
                    done();
                    this.handleSaveData();
                } else {
                    this.$tip.warning(this.$t("revolve.title7"));
                    this.loading = false;
                }
            })
        },
        async handleSaveData() {
            try {
                Object.keys(this.form).forEach((item) => {
                    if (this.isEmpty(this.form[item])) {
                        delete this.form[item];
                    }
                });

                let data = JSON.parse(JSON.stringify(this.form));
                data.workDate = timeConversion(this.form.workDate);
                data.deliveDate = timeConversion(this.form.deliveDate);
                let vat = "";
                data.mergVatNo.forEach((item, i) => {
                    if (i == data.mergVatNo.length - 1) {
                        vat += item;
                    } else {
                        vat += item + "/";
                    }
                });
                data.mergVatNo = vat;
                let light = "";
                data.compLightSource.forEach((item, i) => {
                    if (i == data.compLightSource.length - 1) {
                        light += item;
                    } else {
                        light += item + ",";
                    }
                });
                data.compLightSource = light;
                data.bf = null;
                data.test = null;
                data.item = null;
                data.poAmountLb = data.poAmountKg ? Number((data.poAmountKg * 2.204623).toFixed(2)) : 0;
                data.vatNo = data.vatNo.replace(/\s/g, "");
                isNaN(data.pidCount) ? data.pidCount = 0 : data.pidCount;
                if (this.form.dutyDep) {
                    data.dutyDep = this.form.dutyDep.join(",");
                }
                if (data.runJobId) {
                    // update
                    data.modifiDate = this.$getNowTime("datetime");
                    data.jobModifier = this.$store.state.userOid;
                    updateRunJobData(data).then(async (res) => {
                        if (res.data.code > 0) {
                            await this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
                            this.$emit("refresh");
                            this.$tip.success(this.$t("public.bccg"))
                        } else if (res.data.code == -2) {
                            this.$refs.saveNotEnoughError.initData(res.data);
                        } else {
                            this.$tip.error(res.data.msg);
                        }
                    }).catch((e) => {
                        this.$tip.error(e);
                        this.loading = false;
                    }).finally(() => {
                        this.loading = false;
                    })
                } else {
                    // add
                    data.createTime = this.$getNowTime("datetime");
                    data.jobCreator = this.$store.state.userOid;
                    // 保存前更新重新确认一次缸号的生成
                    if(!this.form.origVat) {
                        await baseCodeSupplyEx({ code: "developRunJob" }).then(res => {
                            data.vatNo = "TDF-" + res.data.data;
                        })
                        // 更新流水号
                        baseCodeSupply({ code: "developRunJob" })
                    }
                    createRunJobData(data).then(async (res) => {
                        if (res.data.code > 0) {
                            this.form.runJobId = res.data.data;
                            await this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
                            this.$emit("refresh");
                            this.$tip.success(this.$t("public.bccg"))
                        } else if (res.data.code == -2) {
                            this.$refs.saveNotEnoughError.initData(res.data);
                        } else {
                            this.$tip.error(res.data.msg);
                        }
                    }).catch((e) => {
                        this.$tip.error(e);
                        this.loading = false;
                    }).finally((_) => {
                        this.loading = false;
                    })
                }
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.$tip.error(this.$t("public.bcsb"));
            }
        },
        exhaustPrint() {
            this.pdfDlg = true;
            this.isExhaust = true;
            this.pdfUrl =
                process.env.API_HOST +
                "/api/proBleadyeRunJob/smallCard?id=" +
                this.form.runJobId;
        },
        handlePrint() {
            this.pdfDlg = true;
            this.isExhaust = false;
            this.pdfUrl =
                process.env.API_HOST +
                "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
                this.form.runJobId;
        },
        pdfClose() {
            if (this.form.runState == "1" && !this.isExhaust) {
                this.$tip
                    .cofirm(this.$t("tipLabel.updatePrintStatus"))
                    .then(() => {
                        updateRunJobData({
                            printDate: this.$getNowTime("datetime"),
                            modifiDate: this.$getNowTime("datetime"),
                            runState: "3",
                            runJobId: this.form.runJobId,
                        }).then((res) => {
                            if (res.data.code == 200) {
                                this.$tip.success(this.$t("public.bccg"));
                                this.$emit("refresh");
                                this.pdfDlg = false;
                            } else {
                                this.pdfDlg = false;
                                this.$tip.error(res.data.msg);
                            }
                        });
                    })
                    .catch(() => {
                        this.pdfDlg = false;
                    });
            }
        },
        // 远程搜索织单
        remoteMethod(val) {
            this.remoteLoading = true;
            getWeave({
                weaveJobCode: "!^%" + val,
                rows: 20,
                start: 1,
            }).then((res) => {
                this.weaveJobOp = res.data.records;
                this.remoteLoading = false;
            });
        },
        // 生产单改变更新合同号、客人po
        async handlePoChange() {
            let poNo = this.form.salPoNo;
            if (!poNo) return
            let poData = await fetchProGstPoData({ poNo }).then(res => res.data.records[0]);
            if (!poData) return
            this.form.custPoNo = poData.custOrderno;
            this.form.contractNo = poData.contractNo;
        },
        codeChange() {
            if (!this.form.weaveJobCode) {
                return;
            }
            this.loading = true;
            getWeave({
                weaveJobCode: this.form.weaveJobCode,
                rows: 10,
                start: 1,
            }).then((res) => {
                if (res.data.records.length > 0) {
                    let item = res.data.records[0];
                    this.setAddFormDataByWeaveCode(item);
                    this.handlePoChange();
                }
            });

        },
        // 织单号数据抽取后赋值---> 新增状态回调
        setAddFormDataByWeaveCode(item) {
            this.form.needleDist = item.guage;
            this.form.yarnLength = item.yarnLength;
            this.form.breadth = item.breadth;
            this.form.gramWeight = item.gramWeight;
            this.form.yarnBatchNo = item.yarnBatchNo;
            this.form.tubeDiam = item.cylinderInch;
            this.form.auditState = 0;
            this.form.yarnCard = "";
            this.form.yarnNumber = "";
            this.form.yarnCylinder = "";
            // this.form.custCode = item.custCode;
            this.form.salPoNo = item.salPoNo;
            this.form.custPoNo = item.custPoNo;
            this.form.contractNo = item.contractNo;
            this.form.colorName = item.colorName;
            this.form.colorCode = item.colorCode;
            this.form.fabElements = item.fiberComp;
            this.form.fabName = item.fabricDesc;
            this.getOtherDataByWeaveGroup(item);
        },
        getOtherDataByWeaveGroup(item) {
            this.form.bf = [];
            fetchJobYarnInfoDataByWeaveCodeId(item.weaveJobId).then(res => {
                let yarnData = res.data.data || {}
                let { yarnBrand, yarnBatch, factoryYarnBatch } = yarnData;
                this.form.yarnCard = yarnBrand;
                this.form.yarnNumber = yarnBatch;
                this.form.yarnCylinder = factoryYarnBatch;
                // 若无值数据 请求老接口
                if (!(yarnBrand && yarnBatch && factoryYarnBatch)) {
                    console.log("require olo api")
                    this.getOtherDataByWeaveGroup_v1(item)
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        // 织单号数据抽取补充 [纱缸]，[纱牌]，[纱批]
        getOtherDataByWeaveGroup_v1(item) {
            this.form.bf = [];
            getGroup({
                proWeaveJobFk: item.weaveJobId,
            }).then((res) => {
                if (res.data.length > 0) {
                    getYarn({ proWeaveJobGroupFk: res.data[0].groupId }).then(
                        (yarn) => {
                            Object.assign(this.form, {
                                yarnCard: "",
                                yarnNumber: "",
                                yarnCylinder: "",
                            })
                            if (yarn.data.length > 1) {
                                let yIndex = 1;
                                yarn.data.forEach((item, i) => {
                                    if (item.yarnBrand) {
                                        this.form.yarnCard +=
                                            yIndex + "." + item.yarnBrand + " ";
                                    }
                                    if (item.yarnBatch) {
                                        this.form.yarnNumber +=
                                            yIndex + "." + item.yarnBatch + " ";
                                    }
                                    if (item.factoryYarnBatch) {
                                        this.form.yarnCylinder +=
                                            yIndex + "." + item.factoryYarnBatch + " ";
                                    }
                                    yIndex++;
                                });
                            } else if (yarn.data.length == 1) {

                                this.form.yarnCard += yarn.data[0].yarnBrand;
                                this.form.yarnNumber += yarn.data[0].yarnBatch;
                                this.form.yarnCylinder += yarn.data[0].factoryYarnBatch;
                            }
                        }
                    );
                }
            });
        },
        // 布票明细合计
        handleSummaryMethod({ columns, data }) {
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = this.$t("total");
                    return;
                }

                let prop = column.property

                if (prop == "clothNoteCode") {
                    sums[index] = data.length;
                }

                if (prop == "clothWeight") {
                    let sumRes = 0;
                    data.forEach(item => {
                        sumRes += item[prop] || 0
                    })

                    sums[index] = this.$num2ThousandthFormat(sumRes, 1)
                }


            });

            return sums;
        },
        isEmpty(obj) {
            if (
                obj === "undefined" ||
                typeof obj === "undefined" ||
                obj === null ||
                obj === 0
            ) {
                return true;
            } else {
                return false;
            }
        },
        async typeChange() {
            await this.$nextTick();
            let data = this.form;
            if (!data.remark) data.remark = "";
            let addText = "";
            data.remark = data.remark.replace(/^大货,/, "");
            data.remark = data.remark.replace(/^办单,/, "");
            data.remark = data.remark.replace(/^缸差,/, "");
            data.remark = data.remark.replace(/^头缸,/, "");
            data.remark = data.remark.replace(/^翻单头缸,/, "");

            if (data.salType == "sample") {
                // 判断备注开头是否有办布字样
                const nReg = /^办单/;
                if (!nReg.test(data.remark)) addText += "办单,";
            } else {
                // 判断备注开头是否有大货字样
                const nReg = /^大货/;
                if (!nReg.test(data.remark)) addText += "大货,";
                if (data.firstOrOther == "1") {
                    const nReg = /^头缸/;
                    if (!nReg.test(data.remark)) addText += "头缸,";
                } else if (data.firstOrOther == "2") {
                    const nReg = /^缸差/;
                    if (!nReg.test(data.remark)) addText += "缸差,";
                } else {
                    const nReg = /^翻单头缸/;
                    if (!nReg.test(data.remark)) addText += "翻单头缸,";
                }
            }
            data.remark = addText + data.remark;
        },
    },
    created() {
        this.initData()
    },
    mounted() {
    },
}
</script>

<style scoped>
.testMachine-edit-form {}
</style>