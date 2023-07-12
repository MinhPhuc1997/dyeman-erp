<template>
    <div class='testStandAndProItem' v-loading="loading" :element-loading-text="$t('public.loading')">
        <el-row>
            <el-col :span="14">
                <view-container title="测试标准 Yêu cầu kiểm tra">
                    <div class="btnList testStandAndProItem-button noselect">
                        <i class="el-icon-circle-plus-outline" @click="handleAddTestStand"></i>
                        <i class="el-icon-remove-outline" @click="handleDelTestStand"></i>
                        <i class="el-icon-document-copy" @click="handleCopyClick"></i>
                    </div>
                    <avue-crud ref="test" :option="testOp" :data="testCrudData" @current-row-change="cellTestClick">
                    </avue-crud>
                </view-container>
            </el-col>
            <el-col :span="10">
                <view-container title="生产项目 Mục sản xuất">
                    <div class="btnList testStandAndProItem-button noselect">
                        <i class="el-icon-circle-plus-outline" @click="handleAddProItem"></i>
                        <i class="el-icon-remove-outline" @click="handleDelProItem"></i>
                    </div>
                    <avue-crud ref="item" :option="itemOp" :data="proItemData" @current-row-change="cellItemClick">
                    </avue-crud>
                </view-container>
            </el-col>
        </el-row>
        <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
            @close="choiceV = false" v-if="choiceV"></choice>
    </div>
</template>

<script>
import { fetchTestStandardData, getTest, addTest, updateTest, deltest, getItem, addItem, updateItem, delitem } from "./api"
import choice from "@/components/proMng/index";
import { testOp, itemOp } from "./data"
export default {
    components: {
        choice,
    },
    data() {
        return {
            loading: false,
            testOp: testOp(this),
            testCrudData: [],
            cellTestData: {},
            itemOp: itemOp(this),
            proItemData: [],
            cellItemData: {},
            choiceV: false,
            label:  this.$t("choiceTem.dyeProcess") ,//选择漂染工藝,
            choiceTarget: {},
            choiceField: "",
            choiceQ: {},
        }
    },
    methods: {
        async initData(proBleadyeRunJobFk) {
            if(!proBleadyeRunJobFk) {
                this.testCrudData = [];
                this.proItemData = [];
                return
            }
            this.loading = true;
            this.testCrudData = await getTest({ proBleadyeRunJobFk }).then(res => {
                return res.data.sort((a, b) => a.sn - b.sn).map((item => { return { ...item, $cellEdit: true } }))
            });
            this.testCrudData.forEach((item, i) => {
                item.sn = i + 1
            })
            this.proItemData = await getItem({ proBleadyeRunJobFk }).then(res => {
                return res.data.sort((a, b) => a.sn - b.sn).map((item => { return { ...item, $cellEdit: true } }))
            });
            this.proItemData.forEach((item, i) => {
                item.sn = i + 1
            })
            this.loading = false;
        },
        async handleSaveData(id) {
            this.loading = true;
            this.testCrudData.forEach(async (item) => {
                if (item.jobTestId) {
                    await updateTest(item)
                } else {
                    item.proBleadyeRunJobFk = id;
                    let res = await addTest(item);
                    item.jobTestId = res.data.data;
                }
            })

            this.proItemData.forEach(async (item) => {
                if (item.itemId) {
                    await updateItem(item)
                } else {
                    item.proBleadyeRunJobFk = id;
                    let res = await addItem(item);
                    item.itemId = res.data.data;
                }
            })
            this.loading = false;
        },
        // 测试要求
        handleAddTestStand() {
            this.choiceTle = this.$t("choiceTem.dyeBasicProcess");
            this.choiceQ.paramType = "test";
            this.choiceV = true;
        },
        handleDelTestStand() {
            if (!this.cellTestData.jobTestId && this.cellTestData.sn) {
                this.testCrudData.splice(this.cellTestData.sn - 1, 1)
                this.cellTestData = {};
                this.testCrudData.forEach((item, i) => {
                    item.sn = i + 1;
                });
                this.testCrudData.length && this.$refs.test.setCurrentRow(this.testCrudData[0]);
                return;
            }
            this.$tip.cofirm(this.$t("tipLabel.deleteConfirm")).then(() => {
                this.loading = true;
                deltest(this.cellTestData.jobTestId)
                    .then((res) => {
                        if (res.data.data !== -1) {
                            this.testCrudData.splice(this.cellTestData.sn - 1, 1);
                            this.testCrudData.forEach((item, i) => {
                                item.sn = i + 1;
                            });
                            this.testCrudData.length && this.$refs.test.setCurrentRow(this.testCrudData[0]);
                            this.$tip.success(this.$t("public.sccg"));
                        } else {
                            this.$tip.error(this.$t("public.scsb") + res.data.msg);
                        }
                    })
                    .catch((err) => {
                        this.$tip.error(this.$t("public.scsb") + err);
                    }).finally((_) => {
                        this.loading = false;
                    })
            })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        },
        handleCopyClick() {
            this.choiceTle = this.$t('choiceTem.runJob');
            this.choiceV = true;
            this.choiceQ.fuzzy = 'weaveCode,salPoNo,colorCode,dyeMathine,operator';
            this.choiceQ.sortF = 'vatNo';
        },
        cellTestClick(val) {
            this.cellTestData = val;
        },
        // 生产项目
        handleAddProItem() {
            this.choiceTle = this.$t("choiceTem.productProject");
            this.choiceV = true;
            this.choiceV = true;
        },
        handleDelProItem() {
            if (!this.cellItemData.itemId) {
                this.proItemData.splice(this.cellItemData.sn - 1, 1)
                this.cellItemData = {};
                this.proItemData.forEach((item, i) => {
                    item.sn = i + 1;
                });
                this.proItemData.length && this.$refs.item.setCurrentRow(this.proItemData[0]);
                return;
            }
            this.$tip.cofirm(this.$t("tipLabel.deleteConfirm")).then(() => {
                this.loading = true;
                delitem(this.cellItemData.itemId)
                    .then((res) => {
                        if (res.data.data !== -1) {
                            this.proItemData.splice(this.cellItemData.sn - 1, 1);
                            this.proItemData.forEach((item, i) => {
                                item.sn = i + 1;
                            });
                            this.proItemData.length && this.$refs.item.setCurrentRow(this.proItemData[0]);
                            this.$tip.success(this.$t("public.sccg"));
                        } else {
                            this.$tip.error(this.$t("public.scsb") + res.data.msg);
                        }
                    })
                    .catch((err) => {
                        this.$tip.error(this.$t("public.scsb") + err);
                    }).finally((_) => {
                        this.loading = false;
                    })
            })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
        },
        cellItemClick(val) {
            this.cellItemData = val;
        },
        handleCopyData(row) {
            this.choiceTle = this.$t('choiceTem.runJob');
            this.proItemData = [];
            this.testCrudData = [];
            let data = {
                runJobId: row.oldRunJobId
            }
            this.choiceData(data)
        },
        async choiceData(val) {
            if (Object.keys(val).length == 0) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            
            if (this.choiceTle == this.$t('choiceTem.runJob')) {
                if (!val.runJobId) {
                    this.$tip.warning(this.$t("tipLabel.notCheckRunJob"));
                    return;
                }
                let testData = await getTest({ proBleadyeRunJobFk: val.runJobId }).then(res => res.data.sort((a,b) => a.sn - b.sn));
                testData.forEach((item, i) => {
                    item.sn = i + 1 + this.testCrudData.length;
                    item.$cellEdit = true;
                    item.jobTestId = ''
                })
                this.testCrudData = this.testCrudData.concat(testData);
                let proItemData = await getItem({ proBleadyeRunJobFk: val.runJobId }).then(res => res.data.sort((a,b) => a.sn - b.sn))
                proItemData.forEach((item, i) => {
                    item.sn = i + 1 + this.proItemData.length;
                    item.itemId = '';
                    item.$cellEdit = true;
                })
                this.proItemData = this.proItemData.concat(proItemData);
            }
            if (this.choiceTle == this.$t("choiceTem.dyeBasicProcess")) {
                val.forEach((item, i) => {
                    let data = {};
                    data = {
                        testItemCode: item.paramKey,
                        testName: item.paramName,
                        dataStyle: item.paramValueType,
                        sn: this.testCrudData.length + 1,
                        $cellEdit: true,
                    };
                    this.testCrudData.push(data);
                });
            }
            if (this.choiceTle == this.$t("choiceTem.productProject")) {
                val.forEach((item, i) => {
                    let data = {};
                    data = {
                        jobItemName: item.stepName,
                        $cellEdit: true,
                        sn: this.proItemData.length + 1,
                    };

                    this.proItemData.push(data);
                });
            }
            this.choiceV = false;
        },
        // 获取测试标准
        getTestStandard(poNo) {
            fetchTestStandardData({ poNo }).then(res => {
                this.testCrudData = (res.data || []).map((item, index) => {
                    return {
                        testItemCode: item.itemName,
                        testName: item.itemContent,
                        testItemName: item.testStandard,
                        dataStyle: 'string',
                        sn: index + 1,
                        $cellEdit: true,
                    }
                })
            })
        },

    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>
.testStandAndProItem-button {
    font-size: 24px;
    color: #409eff;
    cursor: pointer;

}
</style>