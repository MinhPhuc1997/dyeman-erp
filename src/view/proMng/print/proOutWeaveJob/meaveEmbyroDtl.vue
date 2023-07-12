<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-20 11:17:59
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-15 11:36:54
-->
<template>
    <view-container :title="$t('weaveJob.tabs3')">
        <div class="meave-embyro-dtl-container" v-loading="loading">
            <div class="btn-wrapper">
                <template v-if="isOutFactory">
                    <el-tooltip effect="dark" content="Bảo tồn" placement="top-start">
                        <el-button type="success" @click="handleSave" :disabled="cansave">{{ $t("public.save") }}
                        </el-button>
                    </el-tooltip>
                    <el-button type="primary" @click="handleAddPosition">{{$t("weaveJob.addPosition")}}</el-button>
                    <el-button type="danger" @click="handleRemovePosition">{{$t("weaveJob.delPosition")}}</el-button>
                    <el-button type="primary" @click="handleAddSize">{{$t("weaveJob.addSize")}}</el-button>
                    <el-button type="danger" @click="handleRemoveSize">{{$t("weaveJob.delSize")}}</el-button>
                </template>
                <el-button type="primary" @click="choiceV = true">{{$t("weaveJob.copyWeave")}}</el-button>
                <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
                    <el-button type="warning" @click="handleClose">{{ $t("public.close") }}</el-button>
                </el-tooltip>
            </div>
            <avue-crud ref="meaveEmbyroRef" :option="crudOp" :data="meaEmbDtlData" :span-method="handleSpanMethod"
                :row-style="handleRowStyle" :cell-style="handleCellStyle" @row-click="handleRowClick"></avue-crud>
            <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="handleCheckOrder" @close="choiceV = false" v-if="choiceV"></choice>
        </div>
    </view-container>
</template>
<script>
import choice from "@/components/proMng/index";
import { fetchWeaveJobFlatknitData, batchSaveOrUpdateFlatknit } from "./api"
import { meaveEmbyroDtlCrud } from "./data"
export default {
    name: "meaveEmbyroDtl",
    components: {
          choice
    },
    props: {
        cansave: Boolean,
        weaveJobId: {
            type: String,
            default: () => ""
        }
    },
    data() {
        return {
            loading: false,
            meaEmbDtlData: [],
            crudOp: meaveEmbyroDtlCrud(this),
            curCliceRowIdx: 0,
            choiceV: false,
            choiceTle: this.$t("choiceTem.weaveJobCode"),
            choiceQ: {
              sortF: "weaveJobCode",
            },
            highCells: {},
        }
    },
    computed: {
        isOutFactory() {
            return !this.$store.getters.isOutFactory
        }
    },
    methods: {
        // 数据保存
        handleSave() {
            if (this.meaEmbDtlData.length == 0) {
                return this.$tip.warning(this.$t("tipLabel.nullData"))
            }

            // 检验织胚数格式  123  | 123+123
            let amountReg = /^[\d]([\d]*[\+]?)+[\d]$/;
            let highCells = {};
            let hasError = false;
            this.meaEmbDtlData.forEach((item, index) => {
                if(index % 3 != 2) return false;
                Object.keys(item).forEach((pKey, pIdx) => {
                    if(!pKey.includes("prop_")) return;
                    if(item[pKey] && !amountReg.test(item[pKey])){
                        highCells[`${index}-${pKey.replace("prop_", "")}`] = true;
                        hasError = true;
                    }
                })
            }) 
            this.highCells = highCells
            if(hasError){
                return this.$tip.warning("存在数据格式有误，请检查（格式：123或123+3 不允存在空格）");
            }
            let result = [];
            this.meaEmbDtlData.forEach((item, index) => {
                this.crudOp.column.forEach((propItem, oIndex) => {
                    if (oIndex == 0) return;
                    if ((index % 3 == 0) && oIndex != 1) return

                    result.push({
                        proWeaveJobFk: this.weaveJobId,
                        colId: oIndex,
                        rowId: index,
                        rowName: item.key,
                        cpValue: item[propItem.prop]
                    })
                })
            });
            this.loading = true;
            batchSaveOrUpdateFlatknit(result).then(res => {
                this.getDataList();
            }).finally(_ => {
                this.loading = false;
            })

        },
        // 添加部位
        handleAddPosition() {
            this.meaEmbDtlData.push(...[
                { key: this.$t("weaveJob.partName"), prop_1: '', $cellEdit: true },
                { key: this.$t("weaveJob.partSize"), prop_1: '', $cellEdit: true },
                { key: this.$t("weaveJob.embryosNumber"), prop_1: '', $cellEdit: true },
            ])
        },
        // 删除部位
        handleRemovePosition() {
            // 选一个删除 区间范围的值
            let x = this.curCliceRowIdx;
            this.meaEmbDtlData.splice(x - (x % 3), 3);
        },
        // 添加尺寸
        handleAddSize() {
            let crudColLen = this.crudOp.column.length;
            this.crudOp.column.push({
                prop: `prop_${crudColLen}`,
                label: crudColLen.toString(),
                cell: true,
                placeholder: " ",
                width: 150
            })
        },
        // 删除尺寸
        handleRemoveSize() {
            let crudColLen = this.crudOp.column.length;
            if (crudColLen == 1) {
                // return this.$tip.warning("已无多余尺寸;")
                return this.$tip.warning(this.$t("weaveJob.removeTle"))
            }
            this.crudOp.column.splice(crudColLen - 1, 1)
        },
                    // 选择织单
        handleCheckOrder(val) {
            if (!val || !val.weaveJobId) return;
            this.loading = true;
            let params = {
                  proWeaveJobFk: val.weaveJobId
              }
            console.log("weaveJobId",val.weaveJobId)
            fetchWeaveJobFlatknitData(params).then(res => {
                this.dataTransform(res.data);
            }).finally(() => {
                this.choiceV = false;
                this.loading = false;
            })
        },
        // 数据加载
        getDataList() {
            this.loading = true;
            let params = {
                proWeaveJobFk: this.weaveJobId
            }
            console.log("weaveJobId", this.weaveJobId)
            fetchWeaveJobFlatknitData(params).then(res => {
                this.dataTransform(res.data);
            }).finally(() => {
                this.loading = false;
            })
        },
        // 数据格式解析
        dataTransform(originData) {
            let propEnum = {};
            originData.forEach(item => {
                if (!propEnum[item.rowId]) {
                    propEnum[item.rowId] = {};
                }
                let itemData = propEnum[item.rowId];
                if (item.colId == 1) {
                    itemData.key = item.rowName;
                }
                itemData[`prop_${item.colId}`] = item.cpValue;
            });
            let targetDataList = Object.values(propEnum);
            if (targetDataList.length != 0) {
                let option = Object.keys(targetDataList[1]).map(prop => {
                    return {
                        width: 150,
                        prop: prop,
                        label: prop,
                        cell: prop != 'key',
                        placeholder: " ",
                    }
                });
                this.crudOp.column = option;
            }

            targetDataList.forEach(item => {
                item.$cellEdit = this.isOutFactory;
            })
            this.meaEmbDtlData = targetDataList;
        },
        // 合并单元格
        handleSpanMethod({ rowIndex, columnIndex }) {
            if (rowIndex % 3 == 0) {
                if (columnIndex == 0) {
                    return [1, 1]
                } else if (columnIndex == 1) {
                    return [1, this.crudOp.column.length - 1]
                } else {
                    return [0, 0]
                }
            }
        },
        // 行点击
        handleRowClick(row) {
            this.curCliceRowIdx = row.$index;
        },
        // 行样式
        handleRowStyle({ rowIndex }) {
            /**
             *  curRow: 0   [0,1,2]  0 / 3 floor 0
             *          1   [3,4,5]  3 / 3 floor 1
             *          2   [6,7,8]
             *          3   [9,10,11]
             * 
            */
            return Math.floor(rowIndex / 3) == Math.floor(this.curCliceRowIdx / 3) ? {
                backgroundColor: "skyblue"
            } : {}
        },
        // 单元格样式
        handleCellStyle({rowIndex,columnIndex}){
            return this.highCells[`${rowIndex}-${columnIndex}`] ? {backgroundColor: "#f56c6c"} : {}
        },
        // 关闭
        handleClose() {
            this.$emit("close")
        }
    }
}
</script>
<style lang="stylus">
.meave-embyro-dtl-container{
    .btn-wrapper {
        padding 15px;
    }
    tr:hover>td { 
        background-color: transparent !important;
    }	
}
</style>