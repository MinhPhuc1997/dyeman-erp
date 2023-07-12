<!--
 * @Author: Lyl
 * @Date: 2022-09-09 11:30:15
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-22 11:00:19
 * @FilePath: \iot.vue\src\view\proMng\weavingProduction\loomSchedule\log-detailed.vue
 * @Description: 
  主管排期 (织单，机号) => 领班 (指定工人) =》 工人输入编号打印
-->
<template>
    <div class="log-detailed">
        <el-dialog :visible.sync="visible" fullscreen append-to-body :close-on-click-modal="false">
            <view-container :title="$t('loomSchedule.title5')" v-loading="loading">
                <div class="btnList">
                    <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                </div>
                <div class="formBox">
                    <avue-form ref="loomDetailedForm" :option="loomDetailedFormOp" v-model="loomDetailedFormData" style="height: calc(100vh - 110px)">
                        <template slot-scope="scope" slot="weaveJobFk">
                            <el-select v-model="loomDetailedFormData.weaveJobFk" filterable remote reserve-keyword
                                clearable default-first-option :placeholder="$t('tipLabel.inputWeaveCode')" :remote-method="remoteMethod"
                                :loading="serachLoading" @change="handleWeaveCodeChange" :disabled="loomDetailedFormData.allowFlag == 1 ? true: false">
                                <el-option v-for="item in options" :key="item.weaveJobId" :label="item.weaveJobCode"
                                    :value="item.weaveJobId">
                                </el-option>
                            </el-select>
                        </template>
                    </avue-form>
                </div>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { loomScheduleCrudOp } from "./data";
import { fetchLoomScheduleDataByPage, updateLoomScheduleData, createLoomScheduleData, fetchWeaveOrderLoomData } from "./api";
import { getWeave } from "../../revolve/api"
export default {
    components: {},
    props: {},
    data () {
        return {
            loading: true,
            serachLoading: true,
            visible: false,
            hasChange: false,
            loomDetailedFormOp: loomScheduleCrudOp(this),
            loomDetailedFormData: {
                allowFlag: 0
            },
            options: [],
            equipmentList: []
        };
    },
    watch: {},
    computed: {},
    created () { },
    mounted () { },
    methods: {
        initData (logId) {
            this.loading = true;
            this.hasChange = false;
            if (logId) {
                fetchLoomScheduleDataByPage({ logId }).then(async res => {
                    if (!res.data.total) {
                        this.$tip.warning(this.$t("loomSchedule.warning"));
                        this.visible = false;
                        return;
                    }
                    this.loomDetailedFormData = res.data.records[0];
                    this.loomDetailedFormOp = loomScheduleCrudOp(this, this.loomDetailedFormData.allowFlag == 1 ? true : false)
                    await this.remoteMethod(this.loomDetailedFormData.weaveJobCode);
                    await this.handleWeaveCodeChange(this.loomDetailedFormData.weaveJobFk);
                }).finally((_) => {
                    this.loading = false;
                })
            } else {
                this.loomDetailedFormOp = loomScheduleCrudOp(this)
                this.loomDetailedFormData = {
                    logId: '',
                    proOpFk: '',
                    baseEquipmentFk: '',
                    weaveJobFk: '',
                    workdayType: 'D',
                    allowFlag: 0,
                    workDate: this.$getNowTime("date") + " 00:00:00",
                }
                this.loading = false;
            }
        },

        handleSave () {
            this.loading = true;
            this.$refs.loomDetailedForm.validate(async (valid, done) => {
                if (valid) {
                    try {
                        this.hasChange = true;
                        if (this.loomDetailedFormData.logId) {
                            updateLoomScheduleData(this.loomDetailedFormData).then(res => {
                                if (res.data.code == 200) {
                                    this.$tip.success(this.$t("public.bccg"));
                                } else {
                                    this.$tip.error(this.$t("public.bcsb"));
                                }
                            }).finally((_) =>{
                                this.loading = false;
                                done();
                            })
                        } else {
                            this.loomDetailedFormData.createTime = this.$getNowTime("datetime");
                            createLoomScheduleData(this.loomDetailedFormData).then(res => {
                                if (res.data.code == 200) {
                                    this.loomDetailedFormData.logId = res.data.data;
                                    this.$tip.success(this.$t("public.bccg"));
                                } else {
                                    this.$tip.error(this.$t("public.bcsb"));
                                }
                            }).finally((_) =>{
                                this.loading = false;
                                done();
                            })
                        }
                    } catch (error) {
                        console.log(error);
                        this.loading = false;
                        this.$tip.error(this.$t("public.bcsb"));
                        done();
                    }
                } else {
                    this.loading = false;
                    this.$tip.warning(this.$t("loomSchedule.saveWarning1"));
                }
            });
        },

        remoteMethod (val) {
            this.serachLoading = true;
            getWeave({
                weaveJobCode: "!^%" + val,
                rows: 20,
                start: 1,
                isWorkOut: 0
            }).then((res) => {
                this.options = res.data.records;
                this.serachLoading = false;
            });
        },
        // 查询织单对应的机号
        async handleWeaveCodeChange(val) {
            await this.$nextTick();
            this.equipmentList.length && (this.loomDetailedFormOp.column[2].dicData = this.equipmentList);
            !this.equipmentList.length && (this.equipmentList = JSON.parse(JSON.stringify(this.loomDetailedFormOp.column[2].dicData)));
            fetchWeaveOrderLoomData(val).then(res =>{
                this.loomDetailedFormOp.column[2].dicData = this.loomDetailedFormOp.column[2].dicData.filter(item => {
                   return res.data.some((loom) => loom.mathineCode == item.label);
                })
            })
        },

        handleClose () {
            this.hasChange && this.$emit("refresh");
            this.visible = false;
        }
    },
};
</script>
<style lang="stylus" scoped>
.log-detailed{}
</style>