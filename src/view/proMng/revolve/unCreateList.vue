<template>
    <div class="run-job-unCreate-container">
        <el-row class="btnList">
            <el-tooltip v-hasPerm="['proMng:revolve:create1']"  class="item" effect="dark" content="Tạo lệnh chạy" placement="top-start">
                <el-button type="success" @click="handleCreateProRunJob">{{ $t("revolve.createRunJob") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
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
import { unCreateGrudOp, unCreateFormOp } from "./data"
import { fetchUnCreateRunJobDataListByPage } from "./api"
export default {
    name: "runJobUnCreate",
    data() {
        return {
            loading: false,
            formOp: unCreateFormOp(this),
            crudOp: unCreateGrudOp(this),
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
        // 生成织单
        handleCreateProRunJob() {
            if (this.selectRows.length == 0) {
                return this.$tip.warning(this.$t("tipLabel.notCheckData"));
            }
            // if(!this.selectRows[0].typeNo){
            //     return this.$tip.warning(this.$t("revolve.createWarning"));
            // }

            let resultRow = null;
            // 判断是否为扁机类
            if(this.selectRows.length > 1 && this.selectRows[0].bjposition){
                // 将多条扁机类数据合并为一条；
                resultRow = Object.assign({},this.selectRows[0], {
                    bjList: [], // 扁机类
                });
                this.selectRows.forEach((item,index) => {
                    if(index != 0){
                        resultRow.inClothQty += +item.inClothQty;
                    };
                    // 投胚数
                    resultRow.bjList.push({
                        pos: item.bjposition,
                        size: item.bjsize,
                        amount: item.inClothQty,
                        colorName: item.colorChnName,
                        yarnDesc: item.fabConst,
                        weight: item.bjsizeWeight,
                        orderAmount: item.poQtyKg
                        // weight:  item.fabWeight2 || item.fabWeight1
                    })
                })
            }else{
                resultRow = this.selectRows[0]
            }

            this.$emit("select-create", resultRow);
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
                dataSortRules: "poNo|desc,bomId,colorEngName",
            }
            let props = ["poNo", "custId", "fabName"];
            props.forEach(key => {
                if (this.queryParams[key]) {
                    params[key] = "%" + this.queryParams[key]
                }
            })

            let exDateValue = this.queryParams.exDate;
            if (exDateValue && exDateValue.length == 2) {
                params.exDate_begin = exDateValue[0];
                params.exDate_end = exDateValue[1];
            }
            this.loading = true;
            fetchUnCreateRunJobDataListByPage(params).then(res => {
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
