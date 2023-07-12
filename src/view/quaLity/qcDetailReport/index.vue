<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-29 14:39:21
 * @Description:
-->
<template>
    <div id="qcDeatilReport">
        <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane name="1" :label="$t('checkPlan.title6')" />
            <el-tab-pane name="2" :label="$t('checkPlan.title7')" />
        </el-tabs>
        <print ref="printTem" :prodType="tabs" :permType="permType"/>
    </div>
</template>
<script>
import print from "./print";
export default {
    name: "qcDeatilReport",
    props: {
        permType: Boolean
    },
    components: {
        print
    },
    data () {
        return {
            tabs: "1",
        };
    },
    watch: {
        async tabs() {
            await this.$nextTick();
            this.$refs.printTem.initData();
        }
    },
    methods: {
    },
    updated () { },
    created () { 
    },
    mounted () {
    },
    beforeDestroy () { },
};
</script>
<style lang='stylus'>
</style>
