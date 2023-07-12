<!--
 * @Author: Lyl
 * @Date: 2022-06-22 08:31:24
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-29 16:50:28
 * @FilePath: \iot.vue\src\view\quaLity\qcDetailReport\audit.vue
 * @Description: 
-->
<template>
    <div class="qcDetailReport-audit">
        <view-container :title="$t('checkPlan.title5')" :element-loading-text="$t('public.loading')" v-loading="loading">
            <div class="crudBox">
                <avue-crud id="verifySubmitC" ref="verifySubmitC" :option="verifyOp" :data="verifyC"></avue-crud>
            </div>
            <div class="btnList" style="text-align: center">
                <el-button v-if="cellData.whseVouch == 9" type="warning" @click="$emit('submitAudit', 0)" :disabled="!read">{{$t("checkPlan.btn3")}}</el-button>
                <el-button v-if="cellData.whseVouch !== 9" type="warning" @click="$emit('submitAudit', 1)" :disabled="!read">{{$t("checkPlan.btn4")}}</el-button>
                <el-button v-if="cellData.whseVouch !== 9" type="success" @click="$emit('submitAudit', 9)" :disabled="!read">{{$t("checkPlan.btn5")}}</el-button>
            </div>
        </view-container>
    </div>
</template>

<script>
import { mainCrud } from '../codeCard/data';
import { get } from '../codeCard/api';
import { bottomColumnCrudOp } from "../bottomColumn/data";
import { getProProductFlatCardDataByPage } from "./api";
export default {
    components: {},
    props: {
        cellData: Object,
    },
    data () {
        return {
            verifyC: [],
            verifyOp:{
                height: "calc(100vh - 200px)"
            },
            read: false,
            loading: false,
        };
    },
    watch: {
    },
    computed: {},
    created () {
    },
    mounted () {

    },
    methods: {
        async initData (type) {
            this.loading = true;
            this.read = false;
            // let params = {
            //     vatNo: this.cellData.vatNo,
            //     rows: 200,
            //     page: 1,
            //     start: 1,
            //     productNo: "^^%",
            //     cardType: 1,
            //     delFlag: false,
            // }
            this.verifyOp = type == 1 ? mainCrud(this) : bottomColumnCrudOp(this);
            // let func = type == 1 ? get : getProProductFlatCardDataByPage;
            this.verifyOp.page = false;
            this.verifyOp.selection = false;
            this.verifyOp.showSummary = false;
            setTimeout(() => {
                const dom = document
                .getElementById("verifySubmitC")
                .getElementsByClassName("el-table__body-wrapper")[0];
            if (dom.scrollHeight == dom.clientHeight) {
                this.read = true;
            } else {
                dom.addEventListener("scroll", () => {
                    const clientHeight = dom.clientHeight;
                    const scrollTop = dom.scrollTop;
                    const scrollHeight = dom.scrollHeight;
                    if (clientHeight + scrollTop + 20 >= scrollHeight) {
                        this.read = true;
                    }
                });
            }
            }, 500);
            this.verifyC = this.cellData.fabricDtls.sort((a,b) => a.pidNo > b.pidNo ? 1 : -1 );;
            this.loading = false;
            // func(params).then(res => {
                
            //     this.loading = false;
            // }).finally((_) =>{
                
            // })
        }
    },
};
</script>
<style lang="stylus" scoped>
.qcDetailReport-audit{

}
</style>