<template>
    <div class='processManagement-processTask'>
        <view-container title="我的待办">
            <el-row class="btnList">
                <el-button type="primary" @click="getData"> {{ $t("public.query") }} </el-button>
                <el-button type="success" @click="approval"> 审批 </el-button>
                <!-- <el-dropdown style="margin-left: 10px" placement="bottom-start" @command="approval">
                    <el-button type="success"> 审批 </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">通过</el-dropdown-item>
                        <el-dropdown-item command="2">拒接</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
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
        <el-dialog id="approvalDlg" v-loading="submitLoading"  title="审批操作" :visible.sync="dialogVisible" append-to-body center width="50%">
            <el-form ref="approvalForm" :model="approvalData" label-width="70px">
                <el-form-item v-model="approvalData.message" label="意见">
                    <el-input type="textarea" v-model="approvalData.message"  maxlength="200" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入意见"></el-input>
                </el-form-item>
                <el-form-item v-model="approvalData.result" label="结果">
                    <el-radio-group v-model="approvalData.result">
                        <el-radio :label="1">通过</el-radio>
                        <el-radio :label="2">拒接</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onsubmit" :loading="submitLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchTaskList, approvalFlowTask } from "./api.js";
import { queryForm, mainCrud } from "./data.js";
export default {
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
            // 审批弹窗
            dialogVisible: false, // 
            approvalData: {
                message: '',
                result: 1
            },
            submitLoading: false
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
                    let data = item.busData.weaveJob || item.busData.bleadyeRunJob || item.busData.repairOrder;
                    if(data) {
                        let { vatNo, taskCode, colorName,repairContent,  founder, colorCode, createTime,repairingTime,  calicoDate, creator, custCode, weaveJobCode, fabricDesc, salPoNo } = data;
                        item.colorName = colorName;
                        item.colorCode = colorCode;
                        item.calicoDate = calicoDate;
                        item.creator = creator || founder;
                        item.custCode = custCode;
                        item.weaveJobCode = weaveJobCode;
                        item.fabricDesc = fabricDesc;
                        item.salPoNo = salPoNo;
                        item.createTime = createTime || repairingTime;
                        item.order = vatNo || weaveJobCode || taskCode;
                        item.repairContent = repairContent;
                    }
                    
                });
                this.crudData = res.data.data.data.records;
                this.page.total = res.data.data.data.total;
            }).finally( _=> {
                this.loading = false;
                this.$refs.taskCrud.setCurrentRow();
            })
        },
        approval() {
            if(!this.rowCheckData.id) return this.$tip.warning("请选择要操作的数据!");
            this.dialogVisible = true;
        },
        onsubmit() {
            if(this.submitLoading) return;
            if(!this.rowCheckData.id) return this.$tip.warning("请选择要操作的数据!");
            if(!this.approvalData.result) return this.$tip.warning("参数错误!");
            this.submitLoading = true
            approvalFlowTask(Object.assign(this.approvalData, { taskId: this.rowCheckData.id })).then(res => {
                if(res.data.code == 200) {
                    this.$tip.success("审核成功");
                    this.getData();
                    this.dialogVisible = false;
                }else{
                    this.$tip.success("审核失败: " + res.data.msg)
                }
            }).finally(_ => {
                this.submitLoading = false;
            })
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