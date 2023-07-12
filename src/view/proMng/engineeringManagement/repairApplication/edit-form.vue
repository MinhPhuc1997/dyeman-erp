<template>
    <div class='repairApplication-edit-form' >
        <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false" :element-loading-text="$t('public.loading')" v-loading="loading"
            :close-on-press-escape="false">
            <view-container :title=" ( editForm.taskId ? '修改' : '新增' ) + '报修申请单'">
                <div class="btnList">
                    <el-button type="success" @click="handleSubmit"> {{ $t("public.save") }} </el-button>
                    <el-button type="warning" @click="handleReport" v-if="editForm.taskId">{{ $t("public.report") }} </el-button>
                    <el-button type="warning" @click="dialogVisible = false"> {{ $t("public.close") }} </el-button>
                </div>
                <avue-form ref="editForm" :option="editFormOp" v-model="editForm"></avue-form>
            </view-container>
        </el-dialog>

    </div>
</template>

<script>
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { fetchEngMaintenanceTask, createEngMaintenanceTaskData, updateEngMaintenanceTaskData } from "./api";
import { repairOrderCrudOp } from "./data";
export default {
    data() {
        return {
            dialogVisible: false,
            editFormOp: repairOrderCrudOp(this),
            editForm: {},
            loading: false
        }
    },
    methods: {
        initData() {
            this.loading = true;
            baseCodeSupplyEx({ code: "eng_repairApp_no" }).then(async res => {
                this.$refs.editForm.resetFields();
                await this.$nextTick();
                this.editForm = {
                    taskId: '',
                    taskCode: res.data.data,
                    repairingTime: this.$getNowTime("datetime"),
                    repairType: "1",
                    founder: this.$store.state.userOid,
                    completedTime: ''
                }
            }).finally((_) => {
                this.loading = false;
            })
        },
        editData(taskId) {
            this.loading = true;
            fetchEngMaintenanceTask({taskId}).then( res => {
                if(!res.data.total) {
                    this.$tip.error("数据错误!");
                    this.loading = false;
                    this.dialogVisible = false;
                }
                this.editForm = res.data.records[0];
                this.editForm.repairType+='';
            }).finally((_) => {
                this.loading = false;
            })
        },
        handleSubmit() {
            this.$refs.editForm.validate(async (valid, done) => {
                if (valid) {
                    if(this.editForm.taskId) {
                        updateEngMaintenanceTaskData(this.editForm).then( res =>{
                            if(res.data.code == 200) {
                                this.$emit("refresh-list");
                                this.dialogVisible = false;
                                this.$tip.success(this.$t("public.bccg"))
                            }
                        }).finally((_) =>{
                            done();
                        })
                    }else {
                        let code = await baseCodeSupplyEx({ code: "eng_repairApp_no" }).then( res => res.data.data )
                        this.editForm.taskCode = code;
                        createEngMaintenanceTaskData(this.editForm).then( res =>{
                            if(res.data.code == 200) {
                                baseCodeSupply({ code: "eng_repairApp_no" })
                                this.$emit("refresh-list");
                                this.dialogVisible = false;
                                this.$tip.success(this.$t("public.bccg"))
                            }
                        }).finally((_) =>{
                            done();
                        })
                    }
                }else {
                    this.$tip.warning("请补充报修单信息");
                }
            })

        },
        handleReport() {
            this.$emit("open-report", this.editForm.taskId)
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>
.repairApplication-edit-form {}
</style>