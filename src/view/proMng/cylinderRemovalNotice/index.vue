<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-04 14:33:15
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-04 16:51:19
-->
<template>
    <div class="cylinderRemovalNotice-container">
        <view-container title="拆缸通知单资料" v-loading="loading">
            <div class="btnList">
                <el-button type="primary" @click="getDataList">{{ $t("public.query") }}</el-button>
            </div>
            <div class="formBox">
                <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
            </div>
            <el-row class="crudBox crud-container">
                <el-col :span="17">
                    <view-container title="拆缸通知单信息">
                        <avue-crud ref="crud" :option="mainCrudOp" :data="dataList" :page.sync="page"
                            v-loading="loading" @on-load="getDataList" @current-row-change="handleRowClick">
                        </avue-crud>
                    </view-container>
                </el-col>
                <el-col :span="7">
                    <view-container title="拆缸布信息">
                        <avue-crud ref="detailCrud" :option="detailCrudOp" :data="detailList">
                        </avue-crud>
                    </view-container>
                </el-col>
            </el-row>
        </view-container>
    </div>
</template>
<script>
import { queryFormOp, mainCrudOp, detailCrudOp } from "./data"
import { fetchProConvertVatNotice, fetchProConvertVatDetail } from "./api"
export default {
    name: "colorNoSetting",
    data() {
        return {
            loading: false,
            dloading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {},
            mainCrudOp: mainCrudOp(this),
            dataList: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            // 明细
            detailCrudOp: detailCrudOp(this),
            detailList: []
        }
    },
    created() {
    },
    methods: {
        // 查询数据
        getDataList() {
            this.loading = true;
            let { vatNo, convertFlag, creator, convertTime } = this.queryForm;
            this.detailList = [];
            let params = {
                vatNo: "%" + (vatNo || ''),
                convertFlag: convertFlag,
                creator: "%" + (creator || ''),
                rows: this.page.pageSize,
                start: this.page.currentPage,
                dataSortRules: "convertTime|desc,vatNo"
            }
            if (convertTime && convertTime.length == 2) {
                params.convertTime_begin = convertTime[0];
                params.convertTime_end = convertTime[1];
            }
            fetchProConvertVatNotice(params).then(res => {
                let { records, total } = res.data;
                this.dataList = records;
                this.page.total = total;
            }).finally(() => {
                this.$refs.crud.setCurrentRow(this.dataList[0]);
                this.dataList.length && this.handleRowClick(this.dataList[0])
                this.loading = false;
            })
        },
        handleRowClick(row) {
            fetchProConvertVatDetail({ convertVatNoticeFk: row.noticeId }).then(res => {
                this.detailList = res.data.sort((a,b) => a.pidNo > b.pidNo ? 1 : -1);
            })
        }
    }
}

</script>
<style>
.crud-container .el-tabs__content {
    padding: 2px 0;
}
</style>