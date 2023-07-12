<!--
 * @Author: Lyl
 * @Date: 2022-09-09 08:29:03
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-29 10:57:52
 * @FilePath: \iot.vue\src\view\proMng\weavingProduction\loomSchedule\index.vue
 * @Description: 
-->
<template>
    <div class="loom-schedule">
        <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane name="list" :label="$t('loomSchedule.title1')">
                <div class="btnList">
                    <el-button type="success" @click="handleSaveData">{{
                    this.$t("public.save") }}</el-button>
                    <el-button type="primary" @click="handleAddData">{{ this.$t("public.add") }}</el-button>
                    <el-button type="danger" @click="handleDel">{{ this.$t("public.del") }}</el-button>
                    <el-button type="primary" @click="handleOpenStaffDlg"> {{ $t("loomSchedule.staff") }} </el-button>
                    <el-button type="primary" @click="handleQueryLoom">{{ this.$t("public.query") }}</el-button>
                </div>
                <div class="formBox">
                    <avue-form ref="loomScheduleForm" :option="loomStaffFormOp" v-model="loomStaffFormData">
                    </avue-form>
                </div>
                <el-row class="crudBox">
                    <el-col :span="10">
                        <view-container :title="$t('loomSchedule.title3')">
                            <avue-crud style="margin: 2px" ref="loomStaffCrud" v-loading="loading"
                                :option="loomStaffCrudOp" :data="loomStaffCrudData" :page.sync="page"
                                @on-load="handleQueryLoom" @current-row-change="cellClick"></avue-crud>
                        </view-container>
                    </el-col>
                    <el-col :span="14">
                        <view-container :title="$t('loomSchedule.title4')">
                            <avue-crud style="margin: 2px" ref="loomScheduleCrud" v-loading="scheduleLoading"
                                :option="loomScheduleCrudOp" :data="cellClickData.schedule" :page.sync="schedulePage"
                                @on-load="handleQuerySchedule" @current-row-change="cellScheduleClick">
                                <template slot="weaveJobFk" slot-scope="scope">
                                    <el-select v-if="scope.row.$cellEdit" v-model="scope.row.weaveJobFk" filterable
                                        remote reserve-keyword clearable default-first-option :placeholder="$t('tipLabel.inputWeaveCode')"
                                        :remote-method="remoteMethod" :loading="serachLoading"
                                        @change="handleWeaveCodeChange">
                                        <el-option v-for="item in options" :key="item.weaveJobId"
                                            :label="item.weaveJobCode" :value="item.weaveJobId">
                                        </el-option>
                                    </el-select>
                                    <span v-else>{{scope.row.weaveJobCode}}</span>
                                </template>
                            </avue-crud>
                        </view-container>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="view" :label="$t('loomSchedule.title2')">
               <loom-view />
            </el-tab-pane>
        </el-tabs>

        <log-detailed ref="logDetailed" @refresh="handleQueryLoom"></log-detailed>
        <loom-staff ref="loomStaff" @refresh="handleQueryLoom"></loom-staff>
    </div>
</template>

<script>
import loomView from "./view"
import { fetchLoomScheduleDataByPage, fetchLoomStaffDataByPage, createProWeaveOperLogList, fetchWeaveOrderLoomData, createLoomScheduleData, updateLoomScheduleData, removeLoomScheduleData } from "./api"
import { loomStaffFormOp, loomStaffCrudOp, loomScheduleCrudOp } from "./data";
import logDetailed from "./log-detailed"
import loomStaff from "./loom-staff"
import { getWeave } from "../../revolve/api"
export default {
    components: {
        loomStaff,
        logDetailed,
        loomView
    },
    props: {},
    data() {
        return {
            loading: true,
            scheduleLoading: false,
            serachLoading: false,
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            schedulePage: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            loomStaffFormOp: loomStaffFormOp(this, false),
            loomStaffFormData: {},
            loomStaffCrudOp: loomStaffCrudOp(this),
            loomStaffCrudData: [],
            loomScheduleCrudOp: loomScheduleCrudOp(this),
            loomScheduleCrudData: [],
            cellClickData: {},
            cellScheduleClickData: {},
            options: [],
            equipmentList: [],
            tabs: "list"
        };
    },
    watch: {
        cellScheduleClickData(n, o) {
            o && (o.$cellEdit = false);
            n && (n.$cellEdit = true);
        },
    },
    computed: {},
    created() {
        this.loomStaffCrudOp.column[2].hide = true;
        this.loomStaffCrudOp.column[3].hide = true;
        this.loomStaffCrudOp.height = "calc(100vh - 290px)";
    },
    mounted() { },
    methods: {
        handleQueryLoom() {
            this.loading = true;
            let { opCode, opName } = this.loomStaffFormData;
            let params = {
                enableFlag: 1,
                opCode: "!^%" + (opCode || ''),
                opName: "%" + (opName || ''),
                rows: this.page.pageSize,
                start: this.page.currentPage,
            }
            for (let key in params) {
                if (!params[key]) delete params[key];
            }
            this.cellClickData.schedule = [];
            fetchLoomStaffDataByPage(params).then(res => {
                if (!res.data.total) {
                    this.loomStaffCrudData = [];
                    return;
                }
                let { records, total } = res.data;
                this.loomStaffCrudData = records;
                this.$refs.loomStaffCrud.setCurrentRow(this.loomStaffCrudData[0]);
                this.page.total = total;
            }).finally((_) => {
                this.loading = false;
            })
        },

        handleQuerySchedule() {
            if (!this.cellClickData.opCode) return;
            !this.cellClickData.schedule && (this.cellClickData.schedule = []);
            if (this.cellClickData.schedule.length) {
                this.$refs.loomScheduleCrud.setCurrentRow();
                return;
            }
            this.scheduleLoading = true;
            let params = {
                opCode: this.cellClickData.opCode,
                rows: this.schedulePage.pageSize,
                start: this.schedulePage.currentPage,
                dataSortRules: "workDate|desc",
                workDate: this.loomStaffFormData.workDate || ''
            }
            fetchLoomScheduleDataByPage(params).then(res => {
                if (!res.data.total) {
                    this.cellClickData.schedule = [];
                    return;
                }
                let { records, total } = res.data;

                let data = this.group(records).map((item) => {
                    let data = item.baseEquipmentFk.map((equ) => equ.baseEquipmentFk);
                    data = Array.from(new Set(data));
                    return {
                        ...item,
                        baseEquipmentFk: data
                    }
                })

                this.cellClickData.schedule = data;
                this.cellClickData.schedule.forEach((item, i) => {
                    item.index = i;
                })
                this.schedulePage.total = total;
            }).finally((_) => {
                this.$refs.loomScheduleCrud.setCurrentRow();
                this.scheduleLoading = false;
            })
        },

        async handleAddData() {
            if (!this.cellClickData.opId) {
                this.$tip.warning(this.$t("loomSchedule.addWarning"));
                return;
            }
            this.cellClickData.schedule.unshift(
                {
                    workDate: this.$getNowTime("date"),
                    workdayType: this.cellClickData.schedule.length ? this.cellClickData.schedule[0].workdayType : "D",
                    weaveJobFk: this.cellClickData.schedule.length ? this.cellClickData.schedule[0].weaveJobFk : "",
                    weaveJobCode: this.cellClickData.schedule.length ? this.cellClickData.schedule[0].weaveJobCode : "",
                    baseEquipmentFk: this.cellClickData.schedule.length ? this.cellClickData.schedule[0].baseEquipmentFk : "",
                }
            )
            this.cellClickData.schedule.forEach((item, i) => {
                item.index = i;
            })
            this.$refs.loomScheduleCrud.setCurrentRow(this.cellClickData.schedule[0]);
            await this.$nextTick();
            this.remoteMethod(this.cellClickData.schedule[0].weaveJobCode);
        },

        async handleSaveData() {
            this.loading = true;
            let saveList = [];
            await this.loomStaffCrudData.forEach((item, i) => {
                if (item.schedule) {
                    item.schedule.forEach((schedule) => {
                        if (schedule.baseEquipmentFk) {
                            let date = this.$getNowTime("datetime");
                            schedule.baseEquipmentFk.forEach((equ) => {
                                saveList.push({
                                    allowFlag: 1,
                                    baseEquipmentFk: equ,
                                    createTime: date,
                                    opCode: item.opCode,
                                    opName: item.opName,
                                    proOpFk: item.opId,
                                    weaveJobCode: schedule.weaveJobCode,
                                    weaveJobFk: schedule.weaveJobFk,
                                    workDate: schedule.workDate,
                                    workdayType: schedule.workdayType
                                })
                            })
                        }
                    })
                }
            })
            createProWeaveOperLogList(saveList).then(res => {
                if (res.data.data) {
                    this.handleQueryLoom();
                    this.$tip.success(this.$t("public.bccg"))
                } else {
                    this.$tip.error(res.data.msg);
                }
            }).finally((_) => {
                this.loading = false;
            })
        },

        async handleSaveData1() {
            // this.loading = true;
            let vaild = await this.saveBeforeValid();
            if (!vaild.result) {
                this.$tip.warning(vaild.msg);
                return
            }
            let saveList = [];
            await this.loomStaffCrudData.forEach((item, i) => {
                if (item.schedule) {
                    let data = item.schedule.map((sch) => { return { ...sch, proOpFk: item.opId } })
                    saveList = saveList.concat(data);
                }
            })
            saveList.forEach(async (item, i) => {
                if (item.logId) {
                    await updateLoomScheduleData(item);
                } else {
                    await createLoomScheduleData(item)
                }
                if (i == saveList.length - 1) {
                    this.handleQueryLoom();
                    this.$tip.success(this.$t("public.bccg"))
                }
            })
        },

        saveBeforeValid() {
            for (let i = 0; i < this.loomStaffCrudData.length; i++) {
                if (!this.loomStaffCrudData[i].schedule) continue;
                for (let j = 0; j < this.loomStaffCrudData[i].schedule.length; j++) {
                    if (!this.loomStaffCrudData[i].schedule[j].weaveJobFk) {
                        return { result: false, msg: `${this.$t("loomSchedule.staff")}${this.loomStaffCrudData[i].opName}${this.$t("loomSchedule.in")}${this.loomStaffCrudData[i].schedule[j].workDate}${this.$t("loomSchedule.notWeaveData")}`}
                    } else if (!this.loomStaffCrudData[i].schedule[j].baseEquipmentFk) {
                        return { result: false, msg: `${this.$t("loomSchedule.staff")}${this.loomStaffCrudData[i].opName}${this.$t("loomSchedule.in")}${this.loomStaffCrudData[i].schedule[j].workDate}${this.$t("loomSchedule.notLoomData")}` }
                    }
                }
            }
            return { result: true };
        },

        async handleDel() {
            if (!this.cellScheduleClickData) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            if (!this.cellScheduleClickData.logId) {
                this.cellClickData.schedule.splice(this.cellScheduleClickData.index, 1);
                this.$refs.loomScheduleCrud.setCurrentRow(this.cellClickData.schedule[0]);
            } else {
                this.$tip.cofirm(this.$t("tipLabel.delOrder") + this.cellScheduleClickData.weaveJobCode + this.$t("tipLabel.delEnd"))
                    .then(async () => {
                        this.loading = true;
                        let delList = [];
                        this.cellScheduleClickData.logId.forEach((item, i) => {
                            delList.push(item.logId);
                        })
                        delList.forEach(async (item, i) => {
                            removeLoomScheduleData(item);
                            if (i == delList.length - 1) {
                                this.cellClickData.schedule.splice(this.cellScheduleClickData.index, 1);
                                this.cellClickData.schedule.forEach((item, i) => {
                                    item.index = i;
                                })
                                this.$refs.loomScheduleCrud.setCurrentRow(this.cellClickData.schedule[0]);
                                this.$tip.success(this.$t("public.sccg"));
                                this.loading = false;
                            }
                        })
                    })
                    .catch((err) => {
                        this.$tip.warning(this.$t("public.qxcz"));
                    });
            }
        },

        cellClick(val) {
            this.cellClickData = val;
            this.handleQuerySchedule();
        },

        cellScheduleClick(val) {
            if (!val) return
            this.cellScheduleClickData = val;
            this.remoteMethod(val.weaveJobCode);
            this.handleWeaveCodeChange(val.weaveJobFk);
        },

        cellStyle({ row, columnIndex }) {
            let nowDate = this.$getNowTime("date") + " 00:00:00";
            if (row.workDate >= nowDate && columnIndex == 5) {
                return {
                    color: "#67C23A"
                };
            }
            if (row.allowFlag && columnIndex == 6) {
                return {
                    color: "#67C23A"
                };
            }
            if (!row.allowFlag && columnIndex == 6) {
                return {
                    color: "#F56C6C"
                };
            }
        },

        async handleOpenStaffDlg() {
            this.$refs.loomStaff.visible = true;
            await this.$nextTick();
            this.$refs.loomStaff.handleQuery();
        },
        // 织单远程搜索
        remoteMethod(val) {
            this.serachLoading = true;
            getWeave({
                weaveJobCode: "!^%" + val,
                rows: 20,
                start: 1,
                // weaveState: 0,
                isWorkOut: 0
            }).then((res) => {
                this.options = res.data.records;
                this.serachLoading = false;
            });
        },
        // 查询织单对应的机号
        async handleWeaveCodeChange(val) {
            if (!val) return
            await this.$nextTick();
            getWeave({
                weaveJobId: val,
                rows: 20,
                start: 1,
            }).then((res) => {
                this.cellScheduleClickData.weaveJobCode = res.data.records[0].weaveJobCode;
            });
            // this.equipmentList.length && (this.loomScheduleCrudOp.column[3].dicData = this.equipmentList);
            // !this.equipmentList.length && (this.equipmentList = JSON.parse(JSON.stringify(this.loomScheduleCrudOp.column[3].dicData)));
            // fetchWeaveOrderLoomData(val).then(res =>{
            //     this.loomScheduleCrudOp.column[3].dicData = this.loomScheduleCrudOp.column[3].dicData.filter(item => {
            //        return res.data.some((loom) => loom.mathineCode == item.label);
            //     })
            // })
        },

        group(arr) {
            let map = {},
                dest = [];
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                if (!map[ai.opCode + ai.workdayType + ai.workDate + ai.weaveJobCode]) {
                    dest.push({
                        ...ai,
                        baseEquipmentFk: [ai],
                        logId: [ai]
                    });
                    map[ai.opCode + ai.workdayType + ai.workDate + ai.weaveJobCode] = ai;
                } else {
                    for (var j = 0; j < dest.length; j++) {
                        var dj = dest[j];
                        if (dj.opCode == ai.opCode && dj.workdayType == ai.workdayType && dj.weaveJobCode == ai.weaveJobCode && dj.workDate == ai.workDate) {
                            dj.baseEquipmentFk.push(ai);
                            dj.logId.push(ai);
                            break;
                        }
                    }
                }
            }
            return dest;
        }
    },
};
</script>
<style lang="stylus" scoped>
.loom-schedule {

}
</style>