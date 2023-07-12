<!--
 * @Author: Lyl
 * @Date: 2022-09-09 09:17:35
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-27 14:27:50
 * @FilePath: \iot.vue\src\view\proMng\weavingProduction\loomSchedule\loom-staff.vue
 * @Description: 
-->
<template>
    <div class="loomSchedule-staff">
        <el-dialog :visible.sync="visible" width="80%" top="5vh" append-to-body :close-on-click-modal="false">
            <view-container :title="$t('loomSchedule.title6')" v-loading="loading" :element-loading-text="$t('public.loading')">
                <div class="btnList">
                    <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
                    <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
                    <el-button type="danger" @click="handleDel">{{ this.$t("public.del") }}</el-button>
                    <el-button type="primary" @click="handlePrint">{{ this.$t("public.print") }}</el-button>
                    <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
                    <el-button type="warning" @click="visible = false">{{ this.$t("public.close") }}</el-button>
                    <span style="margin-left: 20px;font-size: 16px">{{ $t("sheetNumber") }}: </span>
                    <el-input type="number" max="5" min="1" v-model="printCount" style="width: 80px"></el-input>
                </div>
                <div class="formBox">
                    <avue-form ref="loomStaffForm" :option="loomStaffFormOp" v-model="loomStaffFormData"></avue-form>
                </div>
                <div class="crudBox">
                    <avue-crud ref="loomStaffCrud" id="loomStaffCrud" v-loading="loading" :option="loomStaffCrudOp" :data="loomStaffCrudData"
                        :page.sync="page" @on-load="handleQuery" @current-row-change="cellClick"></avue-crud>
                </div>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { loomStaffFormOp, loomStaffCrudOp } from "./data";
import { fetchLoomStaffDataByPage, updateLoomStaffData, removeLoomStaffData, createLoomStaffData } from "./api";
export default {
    components: {},
    props: {},
    data () {
        return {
            loading: true,
            visible: false,
            cellClickData: {},
            loomStaffFormOp: loomStaffFormOp(this, true),
            loomStaffFormData: {},
            loomStaffCrudOp: loomStaffCrudOp(this),
            loomStaffCrudData: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            printCount: 1,
            spowerClient: null,
        };
    },
    watch: {
        cellClickData (n, o) {
            o && (o.$cellEdit = false);
            n && (n.$cellEdit = true);
        }
    },
    computed: {},
    created () {
        this.initClient();
    },
    mounted () { },
    methods: {
        handleQuery () {
            this.loading = true;
            let { opCode, opName, enableFlag } = this.loomStaffFormData;
            let params = {
                opCode: "!^%" + (opCode || ''),
                opName: "%" + (opName || ''),
                enableFlag,
                rows: this.page.pageSize,
                start: this.page.currentPage,
            }
            fetchLoomStaffDataByPage(params).then(res => {
                let { records, total } = res.data;
                if (!total) {
                    this.loomStaffCrudData = [];
                    return;
                }
                this.loomStaffCrudData = records;
                this.$refs.loomStaffCrud.setCurrentRow(this.loomStaffCrudData[0]);
                this.page.total = total;
            }).finally((_) => {
                this.loading = false;
            })
        },

        handlePrint () {
            if (!this.cellClickData.opId) {
                this.$tip.warning(this.$t("tipLabel.plsSaveData"))
                return;
            }
            if (!this.spowerClient || this.spowerClient.readyState == 3) {
                this.$tip.error(this.$t("tipLabel.clientError"));
                return;
            }
            this.$tip
                .cofirm(
                    this.$t("tipLabel.printCofirm") + this.cellClickData.opCode + this.$t("tipLabel.delEnd"),
                )
                .then(async () => {
                    this.spowerClient.send("print=opId:" + this.cellClickData.opId + "&" + this.printCount);
                    console.log("print=opId:" + this.cellClickData.opId + "&" + this.printCount);
                    this.$tip.success(this.$t("tipLabel.printSuccess"));
                })
                .catch((err) => {
                    console.log(err);
                    this.$tip.warning(this.$t("tipLabel.printCancel"));
                });
        },

        async handleSave () {
            this.loading = true;
            let hasNotName = this.loomStaffCrudData.some((item) => !item.opName);
            if (hasNotName) {
                this.$tip.warning(this.$t("clothFly.saveTle"));
                this.loading = false;
                return;
            }
            this.loomStaffCrudData.forEach(async (item, i) => {
                if (item.opId) {
                    await updateLoomStaffData(item);
                } else {
                    await createLoomStaffData(item);
                }
                if (i == this.loomStaffCrudData.length - 1) {
                    this.$tip.success(this.$t("public.bccg"));
                    this.$emit("refresh");
                    await this.handleQuery();
                }
            })
        },

        handleDel () {
            if (!this.cellClickData) {
                return
            }
            if(!this.cellClickData.opId) {
                this.loomStaffCrudData.splice(this.cellClickData.$index, 1);
                this.$refs.loomStaffCrud.setCurrentRow();
            } else { 
                this.$tip.cofirm(this.$t("tipLabel.delCode") + this.cellClickData.opCode + this.$t("tipLabel.delEnd"))
                .then(async () => {
                    this.loading = true;
                    let delRes = await removeLoomStaffData(this.cellClickData.opId);
                    if (delRes.data.data == 1) {
                        this.loomStaffCrudData.splice(this.cellClickData.$index, 1);
                        this.$refs.loomStaffCrud.setCurrentRow();
                        this.$tip.success(this.$t("public.sccg"));
                    } else {
                        this.$tip.success(this.$t("public.scsb"));
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
            }
        },

        async handleAdd () {
            this.loomStaffCrudData.push({
                opCode: this.loomStaffCrudData.length ? "SP" + this.$preFixInt(Number(this.loomStaffCrudData[this.loomStaffCrudData.length - 1].opCode.replace(/[^\d]/g, ' ')) + 1, 6) : 'SP000001',
                opName: '',
                enableFlag: 1,
                publishDate: this.$getNowTime("datetime")
            })
            await this.$nextTick();
            this.$refs.loomStaffCrud.setCurrentRow(this.loomStaffCrudData[this.loomStaffCrudData.length - 1]);
            this.$toTableLow(this, 'loomStaffCrud');
        },

        initClient () {
            this.spowerClient = this.$store.state.spowerClient;
        },

        cellClick (val) {
            this.cellClickData = val;
        },

    },
};
</script>
<style lang="stylus" scoped>
.loomSchedule-staff{

}
</style>