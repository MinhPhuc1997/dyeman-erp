<!--
 * @Description: 试纱结果
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-07-19 14:54:05
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-19 16:51:48
-->
<template>
    <view-container  class="yarn-test-container" :title="$t('weaveJob.title3')" v-loading="loading">
        <el-tabs class="tab-container" v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane :label="$t('weaveJob.tabs5')" name="first">
                <el-input class="yarn-test-remark" type="textarea" readonly v-model="remarksData.remark1"></el-input>
            </el-tab-pane>
            <el-tab-pane :label="$t('weaveJob.tabs6')" name="second">
                <el-input class="yarn-test-remark" type="textarea" readonly v-model="remarksData.remark2"></el-input>
            </el-tab-pane>
            <el-tab-pane :label="$t('weaveJob.tabs7')" name="third">
                <el-input class="yarn-test-remark" type="textarea" readonly v-model="remarksData.remark3"></el-input>
            </el-tab-pane>
            <el-tab-pane :label="$t('weaveJob.tabs8')" name="fourth">
                <el-button type="success" @click="handleFileDownload" >{{remarksData.fileName}}{{$t("weaveJob.tabs8")}}</el-button>
            </el-tab-pane>
        </el-tabs>
    </view-container>
</template>
<script>
import { fetchYarnTestByYarnBatch } from "./api"
export default {
    name: "yarnTest",
    data(){
        return {
            loading: false,
            activeName: "first",
            remarksData: {
                remark1:"",
                remark2:"",
                remark3:"",
                fileName:"",
                fileData: ""
            }
        }
    },
    methods:{
        // 文件下载
        handleFileDownload(){
            let { fileName,fileData } = this.remarksData;
            if(!fileName){
                return this.$tip.warning(this.$t("tipLabel.noFile"));
            };
            let oA = document.createElement("a");
            oA.href = fileData;
            oA.target = "_black";
            oA.download = fileName;
            oA.click();
        },
        getYarnTestData(yarnBatch){
            this.loading = true;
            fetchYarnTestByYarnBatch({yarnBatch}).then(res => {
                console.log(res)
                this.remarksData = res.data.data || {};
            }).finally(() => {
                this.loading = false;
            })
        },
        handleTabClick(){

        },
    }
}
</script>
<style lang="stylus">
    .yarn-test-container{
       .tab-container{
           margin-top: 10px;
           padding: 0px 10px;
           min-height: 350px;
           .yarn-test-remark{
               padding-bottom: 10px;
               textarea{
                height 300px
               }
               
           }
       }
    }
</style>