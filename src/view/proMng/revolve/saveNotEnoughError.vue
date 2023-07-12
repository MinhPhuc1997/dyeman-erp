<template>
    <div>
        <el-dialog class='saveNotEnoughError' append-to-body :visible.sync="dialogVisible"
            :element-loading-text="$t('public.loading')" v-loading="loading" width="70%" :close-on-click-modal="false"
            :close-on-press-escape="false" top="5vh">
            <el-card class="box-card" style="">
                <div slot="header" class="clearfix">
                    <p>{{msg}}</p>
                    <span>{{$t("driving.businessDic4")}}:{{errInfo.weaveJobCode}}，{{$t("revolve.culindersUsedVat")}}:
                        {{errInfo.jobCount}}{{ $t("revolve.number") }}:{{errInfo.output}}，{{ $t("revolve.used") }}:{{errInfo.expend}}，{{ $t("revolve.remaining") }}:{{errInfo.output
                        - errInfo.expend > 0 ? errInfo.output
                        - errInfo.expend : 0 }} KG</span>
                </div>
                <div v-for="(o,index) in errInfo.runJobExpendDtls" :key="o.vatNo" class="text item">
                    {{`${index + 1}.${$t("vatNo")}: ${o.vatNo},${ $t("revolve.used") } ${o.requireWeight} KG`}}
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            dialogVisible: false,
            errInfo: {},
            msg: ""
        }
    },
    methods: {
        async initData(err) {
            this.loading = true;
            this.msg = err.msg
            this.dialogVisible = true;
            this.errInfo = err.data;
            await this.$nextTick();
            this.loading = false;
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>
.saveNotEnoughError .el-card__body {
    height: 70vh !important;
    overflow: auto;
}

.box-card {
    font-size: 18px;

    overflow: auto !important
}

.text,
.item {
    padding: 10px 20px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>