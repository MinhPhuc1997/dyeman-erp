<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-11-22 09:07:26
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-11-24 09:48:23
-->
<template>
    <div class="yarn-account-container">
        <el-tabs v-model="tabName" type="border-card">
            <el-tab-pane name="accountTotal" label="纱线台账(汇总)">
                <account-total-list ref="accountTotalListRef" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import AccountList from "./account.vue"
import AccountTotalList from "./accountTotal.vue"
export default {
    name: "yarnAccount",
    components:{
        "account-list": AccountList,
        "account-total-list": AccountTotalList
    },
    data(){
        return {
            tabName: "accountTotal"
        }
    }
        
}
</script>


