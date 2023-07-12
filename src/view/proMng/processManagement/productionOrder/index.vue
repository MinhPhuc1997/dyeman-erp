<template>
    <div class='processManagement-productionOrder'>
        <view-container title="生产单流程">
            <el-row class="btnList">
                <el-button type="primary" @click="getData"> {{ $t("public.query") }} </el-button>
                <el-dropdown style="margin-left: 10px" placement="bottom-start">
                    <el-button type="success"> 审批 </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >启动</el-dropdown-item>
                        <el-dropdown-item>撤回</el-dropdown-item>
                        <el-dropdown-item>流程跟踪</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
            <el-row class="formBox">
                <avue-form :option="formOp" v-model="queryForm"></avue-form>
            </el-row>
            <el-row class="crudBox">
                <view-container title="生产单信息">
                    <avue-crud style="margin-top: 2px;" :option="crudOp" :data="crudData" :page.sync="page" v-loading="loading"
                        :element-loading-text="$t('public.loading')" @on-load="getData" @row-click="rowClick"
                        @row-dblclick="handleRowDBLClick" :row-style="rowStyle">

                    </avue-crud>
                </view-container>

            </el-row>
        </view-container>
    </div>
</template>

<script>
import { queryForm, mainCrud } from "./data.js";
export default {
    data() {
        return {
            loading: false,
            formOp: queryForm(this),
            queryForm: {
                type: 0
            },
            crudOp: mainCrud(this),
            crudData: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            }
        }
    },
    watch: {
        "queryForm.type"(o, n) {
            console.log(o, n);
        }
    },
    methods: {
        getData() {
            if (this.loading) return;

        },
        rowClick(val) {

        },
        handleRowDBLClick(val) {

        },
        rowStyle({ row, column, rowIndex }) {
            if (!row.wms) {
                return {
                    backgroundColor: "#E6A23C",
                    color: "#000",
                };
            }
        },
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style>
.el-dropdown-menu--mini .el-dropdown-menu__item {
    font-size: 16px !important;
    padding: 2px 10px
}
</style>