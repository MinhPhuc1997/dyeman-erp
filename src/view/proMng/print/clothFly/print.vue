<!--
 * @Author: Lyl
 * @Date: 2022-09-10 11:04:33
 * @LastEditors: Lyl
 * @LastEditTime: 2022-10-01 08:40:53
 * @FilePath: \iot.vue\src\view\proMng\print\clothFly\print.vue
 * @Description: 
  1. 员工刷卡 => 
  2. 获取员工, 根据员工信息，当前日期 查询员机台排期，手工选择机台信息，获取织单号 
  3. 生成布飞并打印 ， 注意疋号
-->
<template>
    <div class="clothFly-print">
        <div class="btnList">
            <el-button type="primary" @click="handlePrint" :disabled="!cellClickData.weaveJobCode">打印</el-button>
            <el-button type="primary" @click="handleQuery">{{ $t("public.query") }}</el-button>
        </div>
        <div class="formBox">
            <avue-form ref="clothflyPrintForm" :option="clothflyPrintFormOp" v-model="clothflyPrintFormData">
            </avue-form>
        </div>
        <el-row class="crudBox">
            <el-col :span="16">
                <view-container :title="$t('clothFly.title3')" >
                    <avue-crud ref="clothflyPrintCrud" style="padding: 2px" :option="clothflyPrintCrudOp" :data="clothflyPrintCrudData"
                        :page.sync="page" v-loading="loading" @on-load="handleQuery" @current-row-change="cellClick">
                    </avue-crud>
                </view-container>
            </el-col>
            <el-col :span="8">
                <view-container :title="$t('clothFly.title4')">
                    <avue-crud ref="historyPrintCrud" style="padding: 2px" :option="historyCrudOp" :data="historyCrudData"
                        @current-row-change="historyCellClick">
                        <template slot-scope="scope" slot="menu">
                            <el-button type="primary" plain size="small" @click="handleRowPrint(scope.row)">{{$t("public.print")}}</el-button>
                        </template>
                    </avue-crud>          
                </view-container>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import { clothflyPrintFormOp, clothflyPrintCrudOp, clothflyPrintHistroyCrudOp } from "./data";
import { get as fetchWeaveJobDataByPage } from "../proWeaveJob/api"
import { fetchLoomScheduleDataByPage, addBf as createNoteCodeData, fetchNoteCodeByPage, fetchLoomStaffDataByPage } from "./api";
import { getDataPoor } from "@/config/util"
export default {
    components: {},
    props: {},
    data () {
        return {
            loading: false,
            clothflyPrintFormOp: clothflyPrintFormOp(this),
            clothflyPrintFormData: {
                // opCode: "SP000002"
            },
            clothflyPrintCrudOp: clothflyPrintCrudOp(this),
            clothflyPrintCrudData: [],
            historyCrudOp: clothflyPrintHistroyCrudOp(this),
            historyCrudData: [
            ],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            cellClickData: {},
            historyCellClickData: {},
            spowerClient: null
        };
    },
    watch: {},
    computed: {},
    created () { 
        this.handleSwipeCard();
    },
    mounted () { },
    beforeRouteEnter (to, form, next) {
        next((vm) => {
            vm.handleSwipeCard();
        });
    },
    methods: {
        handleQuery () {
            let { proOpFk, mathineCode, weaveJobCode } = this.clothflyPrintFormData;
            if (!proOpFk) {
                this.$tip.warning(this.$t("clothFly.queryTle"));
                this.clothflyPrintCrudData = [];
                this.cellClickData = {};
                this.historyCellClickData = {};
                return
            }
            this.loading = true;
            let hour = new Date().getHours(); // 小时
            let minute = new Date().getMinutes(); // 分钟
            let workdayType = (hour >= 19 && minute > 30) || ( hour < 8 && minute < 30 ) ? 'N' : 'D';  // 夜班
            let params = {
                proOpFk,
                weaveJobCode: "%" + (weaveJobCode || ''),
                baseEquipmentFk: mathineCode || '',
                workDate: this.$getNowTime("date"),
                workdayType,
                // allowFlag: 1
            }
            for (let key in params) {
                if (!params[key]) delete params[key];
            }
            fetchLoomScheduleDataByPage(params).then(res => {
                if (!res.data.total) {
                    this.$tip.warning(this.$t("tipLabel.noData"));
                    this.clothflyPrintCrudData = [];
                    return;
                }
                let { records, total } = res.data;
                this.clothflyPrintCrudData = records;
                this.page.total = total;
            }).finally((_) => {
                this.$refs.clothflyPrintCrud.setCurrentRow(this.clothflyPrintCrudData[0]);
                this.loading = false;
            })
        },

        handleSwipeCard () {
            this.spowerClient = this.$store.state.spowerClient;
            let _this = this;
            _this.spowerClient.onmessage = function (e) {
                if (!e.data.includes("sacn")) return;
                console.info("sacnData:", e);
                let scanData = e.data.split("scan=")[1];
                _this.handleGetOpData(scanData);
            };
        },

        async handleGetOpData(opCode) { 
            let staffData = await fetchLoomStaffDataByPage({opCode}).then( res => res.data.records[0] );
            if(!staffData) {
                this.$tip.warning(this.$t("clothFly.qeuryTle1") + opCode + this.$t("tipLabel.delEnd"));
                return;
            }
            this.clothflyPrintFormData.proOpFk = staffData[0].opId;
            this.handleQuery();
        },

        async handlePrint () {
            if (!this.spowerClient || this.spowerClient.readyState == 3) {
                this.$tip.error(this.$t("tipLabel.clientError"));
                return;
            }
            let { weaveJobCode, proOpFk, $baseEquipmentFk, weaveJobFk } = this.cellClickData;
            if (!weaveJobCode || !proOpFk || !$baseEquipmentFk) {
                this.$tip.warning(this.$t("tipLabel.dataError"));
                return;
            }
            let staffData = await fetchLoomStaffDataByPage({opId: proOpFk}).then( res => res.data.records[0] );
            if(!staffData) {
                this.$tip.warning(this.$t("tipLabel.dataError"));
                return;
            }
            this.$tip.cofirm(this.$t("tipLabel.printWeaveCofirm") + weaveJobCode + this.$t("tipLabel.delEnd") , this, {})
                .then(async () => {
                    this.loading = true;
                    const noteList = await fetchNoteCodeByPage({ weaveJobFk, loomNo: $baseEquipmentFk  }).then(res =>
                        res.data.records.sort((a, b) => b.eachNumber - a.eachNumber)
                    );
                    if(noteList.length) {
                        let nowDate = this.$getNowTime("datetime");
                        let intervalTime =  getDataPoor(noteList[0].madeDate, nowDate, 'minute');
                        if (intervalTime < 19) {
                            this.$tip.warning(this.$t("clothFly.printTle"));
                            this.loading = false;
                            return;
                        }
                    }
                    let sumWeight = noteList.reduce((sum, cur) => {
                        return sum += cur.clothWeight;
                    }, 0);
                    const weaveData = await fetchWeaveJobDataByPage({ weaveJobId: weaveJobFk }).then(res =>
                        res.data.records[0]
                    );
                    if(sumWeight >= weaveData.amount) {
                        this.$tip.warning(this.$t("clothFly.printTle1"));
                        this.loading = false;
                        return;
                    }
                    let eachNumber = noteList.length ? noteList[0].eachNumber + 1 : 1;
                    // 生成织单数据
                    let parasm = {
                        breadth: weaveData.breadth,
                        gramWeight: weaveData.gramWeight,
                        fabricName: weaveData.fabricDesc,
                        proName: weaveData.weaveJobCode,
                        proBatchNumber: weaveData.weaveJobCode, // 生产单号
                        weaveJobFk,
                        weaveJobCode: weaveData.weaveJobCode,
                        poNo: weaveData.salPoNo,
                        proColor: weaveData.colorName,
                        machineCode: $baseEquipmentFk,
                        customerName: weaveData.custCode,
                        noteCode: $baseEquipmentFk + this.$preFixInt(eachNumber, 3),
                        clothWeight: 0,
                        weightUnit: "KG",
                        eachNumber: eachNumber,
                        loomNo: $baseEquipmentFk,
                        workNo: staffData.opCode,
                        clothState: 1,
                        madeDate: this.$getNowTime("datetime"),
                        printedTime: this.$getNowTime("datetime"),
                        isPrinted: true,
                    }
                    let addRes = await createNoteCodeData(parasm);
                    if (addRes.data.code == -1) {
                        this.$tip.error(addRes.data.data);
                    } else {
                        this.$tip.success(this.$t("tipLabel.printSuccess"));
                        this.spowerClient.send("print=noteId:" + addRes.data.data);
                        let noteData = await fetchNoteCodeByPage({noteId: addRes.data.data}).then(res => res.data.records);
                        this.historyCrudData.unshift(noteData[0]);
                        this.historyCrudData.length > 50 && this.historyCrudData.pop();
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.$tip.warning(this.$t("public.qxcz"));
                    this.loading = false;
                });
        },

        cellClick (val) {
            this.cellClickData = val;
        },

        historyCellClick (val) {
            this.historyCellClickData = val;
        },
        
        handleRowPrint (val) {
            if (!this.spowerClient || this.spowerClient.readyState == 3) {
                this.$tip.error(this.$t("tipLabel.clientError"));
                return;
            }
            this.$tip.cofirm(this.$t("tipLabel.printWeaveCofirm") + val.proName + this.$t("tipLabel.delEnd"))
                .then(async () => {
                    this.$tip.success(this.$t("tipLabel.printSuccess"));
                    this.spowerClient.send("print=noteId:" + val.noteId);
                    console.log("print=noteId:" + val.noteId);
                }).catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        }

    },
};
</script>
<style lang="stylus" scoped>
.clothFly-print{

}
</style>