<!--
 * @Author: Lyl
 * @Date: 2022-09-15 08:53:45
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-19 16:28:47
 * @FilePath: \iot.vue\src\view\quaLity\qcProBleadyeRunJob\return-note.vue
 * @Description: 
-->
<template>
    <div class="proBleaadyeRunJob-returnNote">
        <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
            <view-container title="备布退换" v-loading="loading" :element-loading-text="loadLabel">
                <div class="btnList">
                    <el-button type="success" @click="handleSaveBeforeVaild">{{ this.$t("public.save") }}</el-button>
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                    <span style="font-size: 1.25rem;margin-left: 1.25rem;"> {{`缸号: ${vatData.vatNo} , 织单号:
                    ${vatData.weaveJobCode} , 数量: ${vatData.clothWeight}KG`}} </span>
                </div>
                <el-transfer filterable v-model="checkData" filter-placeholder="输入布票编号"
                    style="height: calc(100vh - 7.5rem)" :data="noteCodeData" :props="{
                        key: 'noteId',
                        label: 'noteCode',
                    }" :titles="['胚布信息', params.vatNo +  ' - 备布胚布']" @change="handleTransferChange"
                    @left-check-change="handleLeftCheckChange">
                    <div slot-scope="{ option }">
                        <span style="font-size: 1.125rem">{{option.sign}}</span> {{ option.noteCode }} - {{
                        option.clothWeight + " KG" }}
                    </div>
                    <span slot="right-footer" style="font-size: 1.125rem;margin-left: 5px;">
                        备布重量: {{sumWeight.toFixed(1)}}
                    </span>
                </el-transfer>
            </view-container>
        </el-dialog>
        <el-dialog :visible.sync="cutVisible" append-to-body width="60%" :close-on-click-modal="false">
            <view-container title="裁剪胚布">
                <div class="btnList">
                    <el-button type="success" @click="handleCutSave">{{ this.$t("public.save") }}</el-button>
                    <el-button type="warning" @click="cutVisible = false">{{ this.$t("public.close") }}</el-button>
                </div>
                <avue-form ref="cutForm" :option="cutFormOp" v-model="cutFormData"> </avue-form>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import {
    fetchProBleadyeRunJobCalicoData, fetchProNoteCodeData, fetchProWeaveJobData, addOutWhse, addOutWhseDla, addOutWhseDlb, updateNote,
    addInWhse, addInDtla, addInDtlb, addCalico, delCalico, addNote
} from "./api";
import { cutFormOp } from "./data";
import v1 from "uuid/v1"
export default {
    components: {},
    props: {},
    data () {
        return {
            params: {
                vatNo: ''
            },
            dialogVisible: false,
            cutVisible: false,
            loading: true,
            loadLabel: this.$t('public.loading'), //"正在拼命加载...",
            cutLoading: false,
            cutFormOp: cutFormOp(this),
            cutFormData: {},
            checkData: [],
            noteCodeData: [],
            vatData: {},
            sumWeight: 0,
            rightData: [],
            cutCheckData: {
                clothWeight: 0
            },
            addList: [],
            delList: [],
            cutList: []
        };
    },
    watch: {
        sumWeight (n, o) {
            let disabled = n >= this.vatData.clothWeight ? true : false;
            this.noteCodeData.forEach((item) => {
                if( item.immutable){
                    item.disabled = true;
                }else{
                    item.disabled = item.sign && item.sign != '-' ? false : disabled;
                }
                
            });
        }
    },
    computed: {},
    created () { },
    mounted () { },
    methods: {
        async initData (val) {
            this.loading = true;
            this.loadLabel = "正在拼命信息..."
            this.vatData = val;
            let { runJobId, weaveJobCode } = val;
            this.checkData = [];
            this.noteCodeData = [];
            this.rightData = [];
            this.cutCheckData = {};
            this.cutFormData.noteId = '';
            this.sumWeight = 0;
            this.params = val;
            let weaveData = await fetchProWeaveJobData({ weaveJobCode }).then(res => res.data);
            this.noteCodeData = await fetchProNoteCodeData({ clothState: 2, weaveJobFk: weaveData[0].weaveJobId, start: 1, rows: 500 }).then(res => {
                return res.data.records.sort((a, b) => a.noteCode > b.noteCode ? 1 : -1);
            });
            fetchProBleadyeRunJobCalicoData({ proBleadyeRunJobFk: runJobId }).then(async res => {
                res.data.sort((a, b) => a.sn - b.sn);
                res.data.forEach(item => {
                    let data = this.noteCodeData.filter((items) => items.noteId == item.clothNoteId);
                    data.length ? (data[0].existed = true, data[0].sign = '*', data[0].disabled =  data[0].noteCode.indexOf("-") != -1 ? true : false) : (item.existed = false, item.sign = '');
                    this.checkData.push(item.clothNoteId);
                    !data.length && (item.existed = true, item.sign = '*', this.noteCodeData.push({ ...item, noteId: item.clothNoteId, noteCode: item.clothNoteCode, eachNumber: item.eachNumber, immutable: item.clothNoteCode.indexOf("-") != -1 ? true : false}))
                })
                this.sumWeight = res.data.reduce((sum, item) => {
                    return sum + item.clothWeight;
                }, 0)
            }).finally((_) => {
                console.log(this.noteCodeData)
                this.loading = false;
            })
        },

        async handleSave () {
            this.addList = [];
            this.delList = [];
            this.cutList = [];
            await this.noteCodeData.forEach((item) => {
                if (item.existed && item.sign == '-') {
                    this.delList.push(item);
                } else if (item.sign == '+') {
                    this.addList.push(item);
                } 
                if(item.hasCut) {
                    this.cutList.push(item);
                }
            });
            this.handleCutData();
        },

        handleCutData() {
            this.loadLabel = "正在保存剪办信息..."
            if (!this.cutList.length) {
                this.handleSaveOutWhse();
                return;
            }
            this.cutList.forEach((item, i) => {
                if(item.sourceNoteId) {
                    // 新增裁剪布票
                    item.noteId = '';
                    item.clothState = 3
                    addNote(item).then(res => item.noteId = res.data.data);
                }else{
                    // 更新裁剪布票
                    item.clothState = 2;
                    updateNote(item);
                }
                if(i == this.cutList.length - 1) {
                    this.handleSaveOutWhse();
                    return;
                }
            })
        },

        async handleSaveOutWhse () {
            this.loading = true;
            this.loadLabel = "正在新增出仓信息..."
            if (!this.addList.length) {
                this.handleSaveInWhse();
                return;
            }
            let whseOutCode = await baseCodeSupplyEx({ code: "whse_out" }).then((res) => res.data.data);
            let outWhseId = await addOutWhse({
                retType: "1",
                retDate: this.$getNowTime("datetime"),
                retCode: whseOutCode,
                retUsername: parent.userID,
                stockState: 0,
                sysCreated: this.$getNowTime("datetime"),
                sysCreatedby: this.$store.state.userOid,
                retBatch: this.params.vatNo
            }).then((res) => res.data.data);
            let pbOutWhseCode = await baseCodeSupplyEx({ code: "pb_out_whse" }).then((outPh) => outPh.data.data);
            let dtlaId = await addOutWhseDla({
                calicoId: this.params.weaveJobCode,
                vatNo: this.params.vatNo,
                whseMaterialFk: outWhseId,
            }).then((dla) => dla.data.data);
            baseCodeSupply({ code: "whse_out" }).then((res) => { });
            baseCodeSupply({ code: "pb_out_whse" }).then((res) => { });
            this.addList.forEach(async (item, i) => {
                await addOutWhseDlb({
                    batchNo: pbOutWhseCode,
                    countingNo: item.eachNumber || i + 1,
                    custTicket: item.noteCode,
                    weight: item.clothWeight,
                    weightUnit: item.weightUnit,
                    whseMaterialDlaFk: dtlaId,
                    vatNo: this.params.vatNo
                })
                item.clothState = 3;
                if(!item.immutable)  await updateNote(item); // 跳过剪办新增记录
                let calicoData = {
                    clothNoteCode: item.noteCode,
                    clothNoteId: item.noteId,
                    clothWeight: item.clothWeight,
                    proBleadyeRunJobFk: this.params.runJobId,
                    sn: i + 1,
                }
                await addCalico(calicoData);
                if (i == this.addList.length - 1) {
                    this.handleSaveInWhse();
                }
            });
        },

        async handleSaveInWhse () {
            this.loadLabel = "正在新增入仓记录..."
            if (!this.delList.length) {
                this.initData(this.params);
                this.$tip.success("保存成功!")
                return;
            }
            let inWhseCode = await baseCodeSupplyEx({ code: "whse_in" }).then((res) => res.data.data );
            let data = {
                yinId: inWhseCode,
                sysCreated: this.$getNowTime("datetime"),
                yinDate: this.$getNowTime("date"),
                yinType: 6,
                yinStatus: 0,
                sysCreatedby: this.$store.state.userOid,
            };
            let inWhseId = await addInWhse(data).then((inwhse) => inwhse.data.data);
            baseCodeSupply({ code: "whse_in" }).then((res) => { });
            baseCodeSupply({ code: "pb_in_whse" }).then((res) => { });
            let dtlaCode = await baseCodeSupplyEx({ code: "pb_in_whse" }).then((pbIn) => pbIn.data.data);
            let sumWeight = this.delList.reduce((sum, item) => {
                return sum + item.clothWeight;
            }, 0)
            let dtlaId = await addInDtla({
                weight: sumWeight,
                countingNo: this.delList.length,
                whseCalicoinFk: inWhseId,
                batchNo: dtlaCode,
                outFlag: 0,
                prodNo: this.params.weaveJobCode
            }).then((dtla) => dtla.data.data);
            this.delList.forEach(async (item, i) => {
                await addInDtlb({
                    noteCode: item.noteCode,
                    batchNo: dtlaCode,
                    pidNo:  item.noteCode.substring(item.noteCode.length, item.noteCode.length - 3),
                    // locationCode: item.storeSiteCode,
                    weight: item.clothWeight,
                    weightUnit: "KG",
                    whseCalicoinDtlaFk: dtlaId,
                })
                item.clothState = 2;
                await updateNote(item);
                await delCalico(item.recId);
                if (i == this.delList.length - 1) {
                    this.initData(this.params);
                    this.$tip.success("保存成功!")
                    return;
                }
            })
        },

        handleCutSave () {
            let id = v1();
            let cutData = {
                ...this.cutCheckData,
                noteId: id,
                clothNoteId: id,
                clothWeight: this.cutFormData.nclothWeight,
                realWeight: this.cutFormData.nclothWeight,
                noteCode: this.cutFormData.nclothNoteCode,
                clothNoteCode: this.cutFormData.nclothNoteCode,
                clothState: 3,
                sourceNoteId: this.cutFormData.noteId,
                gramWeightValue: this.cutFormData.gramWeightValue,
                clothLengthValue: Number((this.cutFormData.nclothWeight / this.cutCheckData.clothWeight * this.cutCheckData.clothLengthValue).toFixed(1)),
                hasCut: true,
                // clothLength: this.cutFormData.clothWeight / this.cutCheckData.clothWeight *  this.cutCheckData.clothLength
            }
            this.noteCodeData.push(cutData);
            this.checkData.push(cutData.noteId);
            this.cutCheckData.clothWeight = this.cutFormData.clothWeight;
            this.cutCheckData.clothLengthValue = Number((this.cutCheckData.clothLengthValue - cutData.clothLengthValue).toFixed(1));
            this.cutCheckData.existed ? this.cutCheckData.sign = '-' : this.cutCheckData.sign = null;
            this.cutCheckData.hasCut = true;
            this.checkData.forEach((item, i) => {
                if (item == this.cutCheckData.noteId) {
                    this.checkData.splice(i, 1);
                }
            })
            this.sumWeight = Number((this.sumWeight - this.cutFormData.clothWeight).toFixed(1));
            this.handleSave();
            this.cutVisible = false;
        },

        async handleSaveBeforeVaild () {
            let hasCut = this.sumWeight > this.vatData.clothWeight; // 超出重量是否剪布
            if (hasCut) {
                let cofirmRes = await this.$tip.cofirm("备布数量大于染单胚布数量，是否进行剪布操作?").then(_ => true).catch(_ => false);
                if (cofirmRes) {
                    // 剪布
                    this.cutVisible = true;
                    this.rightData = this.noteCodeData.filter((item) => this.checkData.includes(item.noteId));
                    this.cutFormOp.column[0].dicData = this.rightData;
                    this.cutFormData = this.rightData[0];
                } else {
                    // 不剪布，直接保存
                    this.handleSave();
                }
            } else {
                let cofirmRes = await this.$tip.cofirm("是否确定保存?").then(_ => true).catch(_ => false);
                if (cofirmRes) this.handleSave();
                if (!cofirmRes) this.$tip.warning("取消操作");
            }
        },

        async cutNoteCodeChange (val) {
            if (!val) return;
            let data = this.rightData.filter((item) => item.noteId == val);
            let childSum = await fetchProNoteCodeData({sourceNoteId: val}).then(res => res.data.total);
            console.log(childSum);
            this.cutFormData = data[0];
            this.cutCheckData = data[0];
            this.cutFormData.nclothNoteCode = (this.cutFormData.clothNoteCode || this.cutFormData.noteCode) + '-' + String.fromCharCode(childSum + 65);
            this.cutFormData.nclothWeight = (this.cutFormData.clothWeight - (this.sumWeight - this.vatData.clothWeight)).toFixed(1);
        },

        handleClose () {
            this.dialogVisible = false;
        },

        handleLeftCheckChange (checkArr, arr) {
            let sum = 0;
            checkArr.forEach((item) => {
                let data = this.noteCodeData.filter((arr) => item == arr.noteId);
                data.length && (sum += data[0].clothWeight);
            })
            let disabled = sum + this.sumWeight >= this.vatData.clothWeight;
            this.noteCodeData.forEach((item) => {
                if(!item.immutable){
                    let data = checkArr.filter((arr) => arr == item.noteId);
                    !data.length && (item.disabled = disabled ? item.sign && item.sign != '-' ? false : true : false);
                    data.length && (item.disabled = false);                 
                }
            });
        },

        handleTransferChange (val, direction, arr) {
            arr.forEach((item) => {
                let data = this.noteCodeData.filter((note) => note.noteId == item);
                data.length && (data[0].sign = direction == 'left' ? (data[0].existed ? '-' : '') : (data[0].existed ? '*' : '+'));
                this.sumWeight = direction == 'left' ? this.sumWeight - data[0].clothWeight : this.sumWeight + data[0].clothWeight;
            })
        },

        group (arr, type) {
            var map = {},
                dest = [];
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                if (!map[ai[type]]) {
                    dest.push({
                        [type]: ai[type],
                        data: [ai],
                        weight: ai.clothWeight || ai.netWeight,
                        weightLbs: ai.clothWeight || ai.netWeightLbs,
                    });
                    map[ai[type]] = ai;
                } else {
                    for (var j = 0; j < dest.length; j++) {
                        var dj = dest[j];
                        if (dj[type] == ai[type]) {
                            dj.data.push(ai);
                            dj.weight += ai.clothWeight || ai.netWeight;
                            dj.weightLbs += ai.clothWeight || ai.netWeightLbs;
                            break;
                        }
                    }
                }
            }
            return dest;
        },
    },
};
</script>
<style lang="stylus" scoped>
    .proBleaadyeRunJob-returnNote {
        
    }
    
    >>>.el-transfer-panel {
            height: 100%;
            width: 25rem;
    }

    >>>.el-transfer-panel__body, >>>.el-transfer-panel__list.is-filterable{
        height: 90%
    }
    >>>.el-transfer-panel .el-checkbox__inner {
        width: 16px;
        height: 16px
    }
    >>>.el-transfer-panel .el-checkbox__inner::after {
        height: 6px;
        width: 3px;
        left: 5px;
    }
    >>>.el-transfer-panel__item .el-checkbox__input {
        top: .4375rem;
    }
</style>