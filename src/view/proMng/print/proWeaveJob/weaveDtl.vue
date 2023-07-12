<!--
 * @Description: 织单明细
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-07-11 08:22:07
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-13 13:43:31
-->
<template>
    <div id="weave-dlt-container">
        <avue-crud ref="weaveDtlRef" :option="dtlCrudOp" :data="crudData"></avue-crud>
    </div>
</template>
<script>
import { batchSaveOrUpdateWeaveDtlData, fetchWeaveDtlDataByFk } from "./api";
import { weaveDtlCrudOp } from "./data";
import { batchSaveOrUpdateFlatknit  } from "../proOutWeaveJob/api";
import v1 from "uuid/v1"
export default {
    name: "weaveDtl",
    props: {
        creator: {
            type: String,
            default: ""
        },
        splitW: {
            type: Boolean,
            default: () => false,
        },
        weaveData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            crudData: [],
            dtlCrudOp: weaveDtlCrudOp(this),
            timer: null,
        }
    },
    computed: {
        // 是否为拆单数据
        hasSplit(){
            return this.splitW || (this.weaveData.weaveCode || "").includes("B");
        }
    },
    methods: {
        // 重新计算织排总数
        reComputed() {
            // 拆单状态下，不触发重新计算逻辑
            if(this.hasSplit) return
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let total = this.crudData.reduce((a, b) => a + (b.weavePoQty || 0), 0);
                this.$emit("input", total);
            }, 200)
        },
        // 获取织单明细数据
        getWeaveDtlData(proWeaveJobId) {
            let params = {
                proWeaveJobFk: proWeaveJobId
            };
            fetchWeaveDtlDataByFk(params).then(res => {
                this.crudData = res.data.map(item => {
                    item.$cellEdit = this.creator == parent.userID;
                    return item;
                });
            })
        },
        // 保存织单明细数据
        saveWeaveDltData(proWeaveJobId, isCreateId = false) {
            let reulstData = this.crudData.map(item => {
                let { bjsize, bjposition, proWeaveJobGstpodetailoid, poNo, bomId, fabCode, fabName, fabConst, poColorNo, colorEngName, colorChnName, weavePoQty, poQty } = item;
                let targetItem = {
                    proWeaveJobGstpodetailoid: isCreateId ? v1() : proWeaveJobGstpodetailoid,
                    poNo,
                    bomId,
                    fabCode,
                    fabName,
                    fabConst,
                    poColorNo: poColorNo,
                    colorEngName,
                    colorChnName,
                    weavePoQty,
                    poQty,
                    proWeaveJobFk: proWeaveJobId,
                    bjposition ,
                    bjsize
                };
                return targetItem;
            })
            batchSaveOrUpdateWeaveDtlData(reulstData)

            let MeaveEmbyroDtl = [];
            let positionRecord = [];

            this.crudData.forEach(item => {
                if (item.bjposition && item.bjsize) {
                    if (!positionRecord.length) {
                        // col 记录列 ， row 记录开始行， index ： 记录下标
                        positionRecord.push({ name: item.bjposition, col: 1, row: 0, index: 0 })
                        MeaveEmbyroDtl.push(...[
                            { colId: 1, rowId: 0, rowName: this.$t("weaveJob.partName"), cpValue: item.bjposition },
                            { colId: 1, rowId: 1, rowName: this.$t("weaveJob.partSize"), cpValue: item.bjsize },
                            { colId: 1, rowId: 2, rowName: this.$t("weaveJob.embryosNumber"), cpValue: item.weavePoQty }
                        ])
                    } else {
                        // 判断是否存在该部位
                        let record = positionRecord.filter(record => item.bjposition === record.name)
                        if (record.length) {
                            MeaveEmbyroDtl.push(...[
                                { colId: record[0].col + 1, rowId: record[0].row, rowName: this.$t("weaveJob.partName"), cpValue: item.bjposition },
                                { colId: record[0].col + 1, rowId: record[0].row + 1, rowName: this.$t("weaveJob.partSize"), cpValue: item.bjsize },
                                { colId: record[0].col + 1, rowId: record[0].row + 2, rowName: this.$t("weaveJob.embryosNumber"), cpValue: item.weavePoQty }
                            ])
                            positionRecord[record[0].index].col += 1;

                        } else {
                            MeaveEmbyroDtl.push(...[
                                { colId: 1, rowId: positionRecord.length * 3, rowName: this.$t("weaveJob.partName"), cpValue: item.bjposition },
                                { colId: 1, rowId: positionRecord.length * 3 + 1, rowName: this.$t("weaveJob.partSize"), cpValue: item.bjsize },
                                { colId: 1, rowId: positionRecord.length * 3 + 2, rowName: this.$t("weaveJob.embryosNumber"), cpValue: item.weavePoQty }
                            ])
                            positionRecord.push({ name: item.bjposition, col: 1, row: positionRecord[positionRecord.length - 1].row + 3, index: positionRecord.length })
                        }
                    }
                }
            })
            if(!MeaveEmbyroDtl.length) return;

            MeaveEmbyroDtl.forEach(item => {
                item.proWeaveJobFk = proWeaveJobId;
            })

            batchSaveOrUpdateFlatknit(MeaveEmbyroDtl)
        }
    }
}

</script>
<style lang="stylus">
    #weave-dlt-container{
        .el-input-number .el-input .el-input__inner{
            text-align right !important;
        }
    }
</style>