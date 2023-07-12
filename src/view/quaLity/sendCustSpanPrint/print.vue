<!--
 * @Author: Lyl
 * @Date: 2022-09-24 14:28:08
 * @LastEditors: Lyl
 * @LastEditTime: 2022-10-01 09:27:30
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\print.vue
 * @Description:
-->
<template>
    <div class="bottomColumn-print">
        <el-row class="formBox" style="margin: 10px" v-loading="loading" :element-loading-text="$t('public.loading')">
            <avue-form ref="printForm" :option="printFormOp" v-model="printForm">
                <template slot="vatNo" slot-scope="scope">
                    <el-select v-model="printForm.vatNo" filterable remote reserve-keyword clearable
                        default-first-option :placeholder="$t('tipLabel.inputVatNo')" :remote-method="remoteMethod" @change="handleVatNoChange" :loading="vatLoading">
                        <el-option v-for="item in options" :key="item.vatNo"
                            :label="item.vatNo"
                            :value="item.vatNo">
                        </el-option>
                    </el-select>
                </template>
            </avue-form>
        </el-row>
        <div class="button-list">
            <el-button type="success" @click="handleClearForm" v-hasPerm="['quality:sendCustSpanPrint:clear']">{{$t("public.empty")}}</el-button>
            <el-popconfirm :title="$t('tipLabel.pirntConfirm')" placement="top-start" @onConfirm="handlePrint" v-hasPerm="['quality:sendCustSpanPrint:print']">
                <el-button type="primary" slot="reference">{{ this.$t("public.print") }}</el-button>
            </el-popconfirm>
            <span style="font-size: 20px">{{$t("sheetNumber")}}: </span> <input type="number" max="5" min="1" v-model="printCount">
        </div>
    </div>
</template>

<script>
import { fetchProLableCardData, createProLableCardData, updateProLableCardData, fetchRunJobData } from "./api";
import { mateFactCardPrintFormOp } from "./data";
export default {
    components: {},
    props: {},
    data() {
        return {
            printFormOp: mateFactCardPrintFormOp(this),
            printForm: {
                labelType: 1
            },
            loading: false,
            vatLoading: false,
            options: [],
            spowerClient: null,
            printCount: 1
        };
    },
    watch: {},
    computed: {},
    created() {
        this.spowerClient = this.$store.state.spowerClient;
    },
    mounted() { },
    methods: {
        handleClearForm() {
            this.$refs.printForm.resetForm();
            this.printForm.labelType = 1;
        },
        async handleQuery() {


            this.loading = true;
            this.handleMatePrintData(this.printForm);
        },
        // 获取打印历史
        handleMatePrintData(params) {
            // 查询是否存在码卡信息
            fetchProLableCardData(params, ).then((res) => {
                if (!res.data.total) {
                    this.printForm.labelId = '';
                    return;
                }
                this.printForm = res.data.records[0];
            }).finally(() => {
                this.loading = false;
            })
        },
        async handlePrint() {
            let { vatNo, labelType } = this.printForm;
            if (!vatNo && labelType == 1) {
                // this.$tip.warning("请先选择缸号信息!")
                this.$tip.warning(this.$t("tipLabel.notCheckVat"))
                return;
            }
            if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
                this.$tip.warning(this.$t('tipLabel.clientError'));
                return;
            }
            this.loading = true;
            this.$refs.printForm.validate(async (valid, done) => {
                if (valid) {
                    for (let key in this.printForm) {
                        if (this.printForm[key] == 'undefined') {
                            delete this.printForm[key];
                        }
                    }
                    if (this.printForm.labelId) {
                        // update
                        updateProLableCardData(this.printForm).then(updateRes => {
                            if (updateRes.data.data !== -1) {
                                this.spowerClient.send(
                                    "print=labelId:" + this.printForm.labelId + "&" + this.printCount
                                );
                                this.$emit("on-load");
                                this.$tip.success(this.$t('bottomcol.success1'));
                            } else {
                                this.$tip.error(this.$t("bottomcol.error1") + updateRes.data.msg);
                            }
                        }).finally(() => {
                            this.loading = false;
                            done();
                        })
                    } else {
                        // add
                        createProLableCardData(this.printForm).then(addRes => {
                            if (addRes.data.data != -1) {
                                this.spowerClient.send(
                                    "print=labelId:" + addRes.data.data + "&" + this.printCount
                                );
                                this.$emit("on-load");
                                this.$tip.success(this.$t('bottomcol.success2'));
                            } else {
                                this.$tip.error(this.$t('public.createFail') + addRes.data.msg);
                            }
                        }).finally(() => {
                            this.loading = false;
                            done();
                        })

                    }
                } else {
                    this.loading = false;
                    this.$tip.warning(this.$t("sendCustSpanPrint.warning1"));
                    done && done()
                }
            })
        },
        remoteMethod(vatNo) {
            this.vatLoading = true;
            fetchRunJobData({ vatNo: "!^%" + vatNo }).then((res) => {
                this.options = res.data.records;
                this.vatLoading = false;
            });
        },
        // 监听物料变化
        handleVatNoChange(vatNo) {
            if(!vatNo) return;
            fetchRunJobData({ vatNo }).then((res) => {
                if(!res.data.total) {
                    this.printForm.vatNo = '';
                    this.$tip.warning(this.$t("sendCustSpanPrint.warning2"))
                    return
                }
                let {gramWeight,breadth, fabElements, fabName} = res.data.records[0];
                this.printForm.widthWeight = breadth + " x " + gramWeight;
                this.printForm.fabrication = fabName;
                this.printForm.content = fabElements;
                this.printForm.fabCode = this.printForm.vatNo;
            });
        }
    },
};
</script>
<style lang="stylus">

.button-list {
    padding: 10px;
}

.bottomColumn-print {
    .el-switch__label *{
        font-size: 20px !important;
        height: 25px;
        line-height: 25px
    }
    .el-form-item__label {
        font-size: 22px !important;
        padding: 0 5px 0 0 !important;
        white-space: nowrap !important;
        line-height 40px !important;
    }
    .el-input--mini input {
        height 40px !important;
        line-height 40px !important;
    }
    .el-input__inner {
        font-size 22px !important;
    }
    .el-button {
        font-size: 22px !important;
        margin: 10px 20px;
    }
    input {
        font-size 20px !important;
    }

}
</style>
