<!--
 * @Description: R缸改染
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-22 10:59:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-02-02 09:13:26
-->
<template>
    <div class="r-vat-update-container">
        <el-dialog id="rVatUpdae" :visible.sync="visible"  append-to-body :title="$t('revolve.rvat')" width="800px" v-loading='loading'
            :close-on-click-modal="false" :close-on-press-escape="false" >
            <div class="form-wrapper">
                 <el-form :model="formData" ref="updRVatFormRef" label-width="110px" :rules="rules" >
                    <el-form-item :label="$t('revolve.title12')" prop="poNo">
                        <el-select v-model="formData.poNo" remote filterable :remote-method="handleRemoteMethod">
                            <el-option v-for="(item,index) in poNoDict" :key='index' :label="item" :value="item" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('revolve.title13')" prop="fabName">
                        <el-select v-model="formData.fabName">
                            <el-option v-for="(item,index) in fabNameDict" :key='index' :label="item" :value="item" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('revolve.title14')" prop="colorName">
                        <el-select v-model="formData.colorName">
                            <el-option v-for="(item,index) in colorNameDict" :key='index' :label="item" :value="item" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="handleConfirm">{{$t("public.determine")}}</el-button>
                <el-button type="success" @click="handlCancel" >{{$t("public.cancel")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { fetchDictByUpdateVat, fetchUpdateRVatData } from "./api"
export default {
    name: "rVatUpdate",
    data(){
        return {
            loading: false,
            formData: {
                poNo: "",
                fabName: "",
                colorName: "",
                runJobId: ""
            },
            rules: {
                poNo: [{required: true,  message: this.$t("revolve.rules1"), trigger: "blur"}],
                fabName: [{required: true,  message: this.$t("revolve.rules2"), trigger: "blur"}],
                colorName: [{required: true,  message: this.$t("revolve.rules3"), trigger: "blur"}],
            },
            visible: false,
            poNoDict: [],
            fabNameDict: [],
            colorNameDict: [],
        }
    },
    watch:{
        "formData.poNo": {
            handler(value){
                let params = {
                    type: "fabName",
                    poNo: value
                }
                this.formData.fabName = ""
                this.getPoNoData('fabNameDict',params);

            }
        },
        "formData.fabName": {
            handler(value){
                let params = {
                    type: "color",
                    fabName: value,
                    poNo: this.formData.poNo,
                }
                this.formData.colorName = ""
                this.getPoNoData('colorNameDict',params);
                
            }
        }
    },
    created(){
        // this.getPoNoData();
    },
    methods: {
        // 取消
        handlCancel(){
            this.visible = false;
        },
        async handleConfirm(){
            let validRes = await new Promise(this.$refs.updRVatFormRef.validate).then(vaild => vaild);
            if(!validRes) return
            let hasConfirm = await this.$tip.cofirm(this.$t("revolve.vatNoConfirm"), this.$t("tips"), {type: "warning"}).then(res => true).catch(err => false);
            if(!hasConfirm) return ;
            let {vatNo, poNo, fabName, colorName, runJobId } = this.formData
            let data = {
                vatNo: vatNo,
                poNo: poNo,
                fabName: fabName,
                colorEng: colorName.split("_")[0],
                runJobId: runJobId
            };
            this.loading = true;
            fetchUpdateRVatData(data).then( res => {
                this.$tip.success(this.$t("public.xgcg"));
                this.visible = false;
                this.$emit("success");
            }).finally(() => {
                this.loading = false;
            })
        },
        // 过滤搜索
        handleRemoteMethod(query){
            let params = {
                type: "poNo",
                poNo: query,
            }
            this.getPoNoData('poNoDict',params)
        },
        // 获取织造通知单号字典
        getPoNoData(dictName, params){
            fetchDictByUpdateVat(params).then(res => {
                this[dictName] = res.data.data || []
            })
        },
    }
}

</script>
<style lang="stylus">
    #rVatUpdae{
        .form-wrapper{
            padding: 20px 20px
            .el-form{
                width: 100%;
            }
            .el-select{
                width: 100% !important
            }
        }
    }
    
</style>
