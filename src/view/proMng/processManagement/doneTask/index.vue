<template>
    <div class='processManagement-doneTask'>
        <view-container title="已办任务">
            <el-row class="btnList">
                <el-button type="primary" @click="flowTrack">流程跟踪</el-button>
                <el-button type="primary" @click="getData"> {{ $t("public.query") }} </el-button>
            </el-row>
            <el-row class="formBox">
                <avue-form :option="formOp" v-model="queryForm"></avue-form>
            </el-row>
            <el-row class="crudBox">
                <view-container title="任务信息">
                    <avue-crud ref="taskCrud" style="margin-top: 2px;" :option="crudOp" :data="crudData" :page.sync="page" v-loading="loading"
                        :element-loading-text="$t('public.loading')" @on-load="getData" @row-click="rowClick"
                        @row-dblclick="handleRowDBLClick">
                    </avue-crud>
                </view-container>

            </el-row>
        </view-container>
        <work-flow-track ref="workFlowTrack" :title="`生产单【 ${rowCheckData.order}】 `" />
    </div>
</template>

<script>
import { fetchTaskList } from "./api.js";
import { queryForm, mainCrud } from "./data.js";
import workFlowTrack from "@/components/work-flow-track/index"
export default {
    components: {
        workFlowTrack
    },
    data() {
        return {
            loading: false,
            formOp: queryForm(this),
            queryForm: {
                type: 0
            },
            crudOp: mainCrud(this),
            crudData: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            rowCheckData: {}, // 选择数据
        }
    },
    watch: {
        "queryForm.type"(o, n) {
            console.log(o, n);
        }
    },
    methods: {
        getData() {
            if (this.loading) return;
            this.loading = true;
            this.rowCheckData = {};
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                weaveCode: this.queryForm.weaveCode,
                vatNo: this.queryForm.vatNo,
                taskCode: this.queryForm.taskCode,
            }
            fetchTaskList(params).then(res => {
                res.data.data.data.records.forEach( item => {
                    let { taskCode, founder, vatNo, colorName, colorCode , calicoDate, creator, custCode, weaveJobCode, fabricDesc, salPoNo } = item.busData || {};
                    let { startTime, name, endTime, id } =  item.taskInfo;
                    item.colorName = colorName;
                    item.colorCode = colorCode;
                    item.calicoDate = calicoDate;
                    item.creator = creator || founder;
                    item.custCode = custCode;
                    item.order = vatNo || weaveJobCode || taskCode;
                    item.fabricDesc = fabricDesc;
                    item.salPoNo = salPoNo;
                    item.startTime = startTime;
                    item.name = name;
                    item.endTime = endTime;
                    item.id = id;
                });
                this.crudData = res.data.data.data.records;
                this.page.total = res.data.data.data.total;
            }).finally( _=> {
                this.loading = false;
                this.$refs.taskCrud.setCurrentRow();
            })
        },
        // 流程跟踪
        flowTrack() {
            if (!this.rowCheckData.id) {
                this.$tip.warning(this.$t("tipLabel.notCheckData"));
                return;
            }
            this.$refs.workFlowTrack.initData(this.rowCheckData.busData.runJobId || this.rowCheckData.busData.weaveJobId || this.rowCheckData.busData.taskId );
        },
        rowClick(val) {
            this.rowCheckData = val;
        },
        handleRowDBLClick(val) {

        },
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style lang="stylus">
.el-dropdown-menu--mini .el-dropdown-menu__item {
    font-size: 16px !important;
    padding: 2px 10px
}

#approvalDlg {
    .el-dialog__header, .el-dialog__body {
        padding: 10px !important;
    }
}
</style>