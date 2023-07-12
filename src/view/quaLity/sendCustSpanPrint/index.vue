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
            <el-tab-pane name="print" :label="$t('sendCustSpanPrint.title1')" v-hasPerm="['quality:sendCustSpanPrint:tab1']">
                <card-print @on-load="handleRefreshList"></card-print>
            </el-tab-pane>
            <el-tab-pane name="list" :label="$t('sendCustSpanPrint.title2')" v-hasPerm="['quality:sendCustSpanPrint:tab2']">
                <job-card ref="jobCardList"></job-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import jobCard from "./job-card.vue";
import cardPrint from "./print";
export default {
    components: {
        jobCard,
        cardPrint
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
