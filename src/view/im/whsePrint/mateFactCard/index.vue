<!--
 * @Author: Lyl
 * @Date: 2022-09-24 14:05:52
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-26 09:34:32
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\index.vue
 * @Description:
-->
<template>
    <div class="quality-bottomColumn-print">
        <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane name="print" label="物料出厂信息卡打印" v-hasPerm="['whse:mateFactCard:tab1']">
                <card-print @on-load="handleRefreshList"></card-print>
            </el-tab-pane>
            <el-tab-pane name="list" label="物料出厂信息卡台账" v-hasPerm="['whse:mateFactCard:tab2']" lazy>
                <job-card ref="jobCardList"></job-card>
            </el-tab-pane>
            <el-tab-pane name="purDelivery" label="送货单资料" v-hasPerm="['whse:mateFactCard:tab3']" lazy>
                <pur-delivery/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import jobCard from "./job-card.vue";
import cardPrint from "./print";
import purDelivery from "./pur-delivery.vue";
export default {
    components: {
        jobCard,
        cardPrint,
        purDelivery
    },
    props: {},
    data() {
        return {
            tabs: 'print',
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        handleRefreshList() {
            this.$refs.jobCardList.handleQuery();
        }
    },
};
</script>
