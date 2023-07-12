<!--
 * @Description: QC回修单
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-10-20 17:05:43
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-21 11:00:29
-->
<template>
    <div class="qc-list-container">
      <el-row class="btnList">
        <el-button type="success" @click="handleCreate"> {{ $t("public.sc") }} </el-button>
        <el-button type="primary" @click="handleQuery"> {{ $t("public.query") }} </el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
          :element-loading-text="$t('public.loading')" @on-load="getDataList" @row-click="handleRowClick"
           >
        </avue-crud>
      </el-row>
    </div>
</template>
<script>
import { unCreate2QcFormOp, unCreate2QcCurdOp  } from "./data_tab"
import { fetchQcCheckClothDayDetailByPage } from "./api_tab"
export default {
    name: "qcBack",
    data(){
        return {
            formOp: unCreate2QcFormOp(this),
            form: {},
            crudOp: unCreate2QcCurdOp(this),
            crud: [],
            page: {
                currentPage: 1,
                pageSize: 20,
                pageSizes: [20, 50, 100, 200, 500],
                total: 0,
            },
            loading: false,
            curSelRow: null,     
        }
    },
    methods: {
        handleRowClick(row){
            this.curSelRow = row;
        },
        handleCreate(){
            if(!this.curSelRow) return this.$tip.warning(this.$t("tipLabel.notCheckData"))
            let params = {
                type: "c",
                vatNo: this.curSelRow.vatNo,
                sourceFk: this.curSelRow.detailId
            }
            this.$emit("select", params)
        },
        // 查询
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        // 获取数据
        getDataList(){
            this.curSelRow = null;
            this.loading = true;
            let params = {
                    vatNo: "%" + (this.form.vatNo || ''),
                    qcChecker: "%" + (this.form.qcChecker || ''),
                    dataSortRules: 'checkDate|desc,yind',
                    chargeDpt: 'rs', // 过滤其染部
                    divdVatFlag: "0", // 不需拆缸
                    filterCreateJob: true
                }
            if (this.form.checkDate !== undefined) {
                Object.assign(params, {
                    checkDate_begin: this.form.checkDate[0],
                    checkDate_end: this.form.checkDate[1],
                })
              
            }

            fetchQcCheckClothDayDetailByPage(Object.assign(params, {
                rows: this.page.pageSize,
                start: this.page.currentPage,
            })).then(async res => {
                let { records, total } = res.data;
                this.crud = records;
                this.page.total = total;
                this.$refs.crud.setCurrentRow();
                await this.$nextTick();
                this.$refs["crud"].doLayout();
                this.curIdx = null;
            }).finally(() => {
                setTimeout(() => {
                this.loading = false;
                }, 200);
            })
        },

    }
}

</script>