<!--
 * @Description: 材料库存查询表
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:46
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-12 08:54:18
-->
<template>
    <div class="all-inventory-container">
        <el-dialog :visible.sync="invSelDiaVisible" fullscreen append-to-body>
            <view-container title="库存选择" :element-loading-text="loadLabel" v-loading="loading">
                <div class="btnList">
                    <el-button type="success" @click="handleSelect">选择</el-button>
                    <!-- <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button> -->
                    <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                </div>
                <div class="formBox" v-if="showQueryForm">
                    <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
                </div>
                <div class="crudBox">
                    <avue-crud
                        ref="crud"
                        :option="invCrudOp"
                        :data="invDataList"
                        :page.sync="page"
                        v-loading="loading"
                        @on-load="getDataList"
                        @select='handleSelectRow'
                        @select-all='handleSelectRow'
                    ></avue-crud>
                </div>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { fetchInventoryDataByPage } from "./api"
import { queryFormOp, invCrudOp, matTypeEnum } from "./data"
export default {
    name: "inventorySelect",
    props:{
        // 材料类型
        matType: {
            type: String,
            default: () => "0"
        },
        // 统一其返回的格式
        unifiedFormat: {
            type: Boolean,
            default: () => false
        },
        formatPorp: {
            type: Object,
            default: () => ({
                id: "materialId",
                name: "materialName",
                weight: "weight"
            })
        },
        filterZeroStock:{
            type: Boolean,
            default: () => true
        },
        hideOtherCol:{
            type: Boolean,
            default: () => false
        },
        // 是否合并货位码
        isMergeStorage:{
            type: Boolean,
            default: () => false
        },
        // 是否单选
        isSingle: {
            type: Boolean,
            default: () => false,
        },
        // 显示搜索组件
        showQueryForm: {
            type: Boolean,
            default: () => true
        }
    },
    data(){
        return {
            invSelDiaVisible: false,
            loadLabel: this.$t('public.loading'),
            loading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {
                switchZeroStock: false
            },
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            invCrudOp: invCrudOp(this),
            invDataList: [],
            // 选择数据
            curSelRows:[],
            // 待过滤的值
            filterIds: [],
        }
    },
    watch:{
        invSelDiaVisible:{
            handler(value){
                this.initCrud();
                value && this.getDataList();
            },
            immediate: false,
        }
    },
    methods:{
        // 初始化
        initCrud(){
            this.queryFormOp = queryFormOp(this);
            this.invCrudOp = invCrudOp(this);
        },
        // 选择明细
        handleSelectRow(rows){
            this.curSelRows = rows;
        },
        // 查询
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        // 获取数据
        getDataList(){
            if(this.loading) return;
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
            }
            // 查询参数添加%进行模糊查询
            let queryKey = queryFormOp(this).column.map(item => item.prop);
            queryKey.forEach(key => {
                let value = this.queryForm[key]
                if(value){
                    params[key] = '%' + value
                }
            })
            let data = {
                filterZeroStock: this.filterZeroStock,
                isMergeStorage: this.isMergeStorage,
            };
            if(this.matType == "-1"){
                params.filterZeroStock = !this.queryForm.switchZeroStock
            }
            if(this.filterIds.length > 0){
                data.filterParams = this.filterIds
            }
            this.loading = true;
            fetchInventoryDataByPage(params,data,this.matType).then(res => {
                this.invDataList = res.data.records;
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        // 选择
        handleSelect(){
            let selRows = [];
            if(this.unifiedFormat){
                let { materialIdKey,materialNameKey,weightKey } = matTypeEnum[this.matType];
                let {id, name, weight}  = this.formatPorp;
                selRows = this.curSelRows.map(item => {
                    let tData = Object.assign({}, item, {
                        [id]: item[materialIdKey],
                        [name]: item[materialNameKey],
                        [weight]: item[weightKey],
                    });
                    delete tData[materialIdKey];
                    delete tData[materialNameKey];
                    return tData
                })
            }else{
                selRows = this.curSelRows
            }
            this.$emit("data-select",selRows);
            this.handleClose();
        },
        // 关闭
        handleClose(){
            this.invSelDiaVisible = false;
            this.queryForm = {};
        }
    }
}
</script>