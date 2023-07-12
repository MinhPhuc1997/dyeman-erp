<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-04 14:33:15
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-14 17:47:08
-->
<template>
    <div class="colorNo-setting-container">
        <view-container :title="$t('colorNoSetting.title')"  v-loading="loading">
            <div class="btnList">
                    <el-button type="success" @click="handleSave">{{$t("public.save")}}</el-button>
                    <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
                </div>
                <div class="formBox">
                    <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
                </div>
                <div class="crudBox">
                    <avue-crud
                        ref="crud"
                        :option="mainCrudOp"
                        :data="dataList"
                        v-loading="loading"
                        @on-load="getDataList"
                    ></avue-crud>
                </div>
        </view-container>
    </div>
</template>
<script>
import { queryFormOp, mainCrudOp } from "./data"
import { fetchColorNoDataList, batchUpdateColorNoData } from "./api"
export default {
    name: "colorNoSetting",
    data(){
        return {
            loading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {},
            mainCrudOp: mainCrudOp(this),
            dataList: [],
            // 提交后，但不合法的本厂色号数据
            colorNoCacheEnum: {},
        }
    },
    created(){
        this.colorNoCacheEnum = {};
        this.getDataList();
    },
    methods: {
        // 保存
        handleSave(){
            let targetData = this.dataList.filter(item => item.colorNo).map(item => {
                return {
                    poNo: item.poNo,
                    gstPoverDtlxoid: item.gstPoverDtlxoid,
                    colorNo: item.colorNo
                }
            });
            this.loading = true;
            batchUpdateColorNoData(targetData).then(res => {
                let colorNoCacheEnum = {};
                res.data.data.forEach((item,index) => {
                    setTimeout(() => {
                        this.$notify({
                            title: this.$t("tips"),  //'提示',
                            message: `${this.$t('factoryColorNo')}【${item.colorNo}】${this.$t('colorNoSetting.saveTle1')}`,
                            type: 'warning'
                        });    
                    }, index * 100);
                    colorNoCacheEnum[item.gstPoverDtlxoid] = item.colorNo
                })
                this.colorNoCacheEnum = colorNoCacheEnum;
                this.getDataList();
            }).finally(item => {
                this.loading = false;
            })
        },
        // 查询数据
        getDataList(){
            this.loading = true;
            fetchColorNoDataList(this.queryForm).then(res => {
                this.dataList = res.data.map(item => {
                    item.$cellEdit = true;
                    item.colorNo = this.colorNoCacheEnum[item.gstPoverDtlxoid];
                    return item;
                });
            }).finally(() => {
                this.loading = false;
            })
        },
    }
}

</script>