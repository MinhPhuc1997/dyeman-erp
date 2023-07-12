<template>
    <div class="run-job-unCreate-container">
        <el-row class="btnList">
            <el-tooltip v-hasPerm="['proMng:revolve:create']" class="item" effect="dark" content="Tạo lệnh chạy" placement="top-start">
                <el-button type="success" @click="handleCreateProRunJob" v-hasPerm="['proMng:revolve:create']" >{{ $t("revolve.createRunJob") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button type="primary" @click="handleQuery">{{ $t("public.query") }}</el-button>
            </el-tooltip>
        </el-row>
        <el-row class="form-wrapper">
            <avue-form ref="form" :option="formOp" v-model="queryParams"></avue-form>
        </el-row>
        <el-row class="formBox">
            <avue-crud ref="crudRef" :option="crudOp" :data="crudData" :page.sync="page" v-loading="loading"
                @select="handleSelect" @select-all="handleSelectAll" @on-load="getDataList"></avue-crud>
        </el-row>
    </div>
</template>
<script>
import { unSplitGrudOp, unSplitFormOp } from "./data"
import { fetchVQcCheckClothForDivdvat } from "./api"
export default {
    name: "runJobUnCreate",
    data() {
        return {
            loading: false,
            formOp: unSplitFormOp(this),
            crudOp: unSplitGrudOp(this),
            queryParams: {
                poNo: ""
            },
            crudData: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            // 当前选择key 客户编号+布料编号
            curSelKey: "",
            // 选中的值
            selectRows: [],
        }
    },
    methods: {
        // 选中改变
        handleSelect(rows, row) {
            if (!this.curSelKey) {
                // this.curSelKey = row.custId + row.fabCode
                this.curSelKey = row.bomId
            } else if (rows.length == 0) {
                this.curSelKey = ""
            } else {
                // if(this.curSelKey != row.custId + row.fabCode){
                if (this.curSelKey != row.bomId) {
                    return this.$refs.crudRef.toggleRowSelection(row, false);
                }
            }
            this.selectRows = rows;
        },
        handleSelectAll() {
            this.curSelKey = ""
            this.selectRows = [];
            this.$refs.crudRef.selectClear();
        },
        // 生成运转单
        handleCreateProRunJob() {
            if (this.selectRows.length == 0) {
                return this.$tip.warning(this.$t("tipLabel.notCheckData"));
            }
            this.$emit("select-create", this.selectRows[0]);
        },
        // 查询
        handleQuery() {
            this.page.currentPage = 1;
            this.getDataList();
        },
        // 查询数据
        getDataList() {
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                divdVatTypeCode: this.queryParams.divdVatTypeCode,
                dataSortRules: "vatNo|desc,divdVatTypeCode",
            }
            let props = ["vatNo", "colorCode", "fabName"];
            props.forEach(key => {
                if (this.queryParams[key]) {
                    params[key] = "%" + this.queryParams[key]
                }
            })
            this.loading = true;
            fetchVQcCheckClothForDivdvat(params).then(res => {
                this.crudData = res.data.records.map((item, index) => {
                    item.id = index + 1;
                    return item;
                })
                this.page.total = res.data.total;
            }).finally(_ => {
                this.curSelKey = ""; // 重置勾选状态
                this.loading = false;
            })
        }
    }
}

</script>
<style lang="stylus">
.run-job-unCreate-container{
    .avue-crud__tip{
        display: none !important
    }
}
</style>
