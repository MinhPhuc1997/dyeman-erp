<!--
 * @Author: Lyl
 * @Date: 2022-09-24 08:27:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-24 13:33:00
 * @FilePath: \iot.vue\src\view\proMng\revolve\bottom-column.vue
 * @Description: 
-->
<template>
    <div class="revolve-bottom-column">
        <view-container :title="$t('revolve.title8')" v-loading="loading">
            <div class="btnList" style="font-size: 24px; color: #409eff; cursor: pointer">
                <i class="el-icon-circle-plus-outline" @click="handleAdd"></i>
                <i class="el-icon-remove-outline" @click="handleDel"></i>
            </div>
            <avue-crud ref="bcCrudCrud" id="bcCrudCrud" :option="bcCrudOp" :data="bcCrudData" v-loading="loading"
                @current-row-change="cellClick">
                <template slot-scope="scope" slot="X">
                    <span>X</span>
                </template>
            </avue-crud>
        </view-container>
    </div>
</template>

<script>
import { bottomColumnCrud } from "./data";
import { fetchProBleadyeRunJobFlatData , createProBleadyeRunJobFlatData, updateProBleadyeRunJobFlatData, removeProBleadyeRunJobFlatData } from "./api";
export default {
    components: {},
    props: {
        form: {}
    },
    data() {
        return {
            bcCrudOp: bottomColumnCrud(this),
            cellClickData: {},
            bcCrudData: [],
            loading: false,
            runJobId: ""
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        initData(runJobId) {
            if(!runJobId) {
                this.bcCrudData = [];
                return;
            }
            this.loading = true;
            this.runJobId = runJobId;
            fetchProBleadyeRunJobFlatData({ runJobFk: runJobId }).then(res => {
                if (!res.data.length) {
                    this.bcCrudData = [];
                    return;
                }
                this.bcCrudData = res.data.map((item) => { return {...item, $cellEdit: true}}).sort((a,b) => a.sn - b.sn);
                this.$refs.bcCrudCrud.setCurrentRow(this.bcCrudData[0]);
            }).finally((_) => {   
                this.loading = false;
            })
        },
        handleSave(id) {
            this.loading = true;
            this.bcCrudData.forEach(async (item, i) => {
                if(item.platId) {
                    await updateProBleadyeRunJobFlatData(item)
                }else{
                    item.runJobFk = id;
                    await createProBleadyeRunJobFlatData(item)
                }
                if(i == this.bcCrudData.length - 1) {
                    this.initData(id);
                    this.loading = false;
                }
            })
        },
        async handleAdd() {
            this.bcCrudData.push({
                sn: this.bcCrudData.length ? this.bcCrudData[this.bcCrudData.length - 1].sn + 1 : 1,
                $cellEdit: true,
                partName: "领",
                sizeUnit: "CM",

            })
            await this.$nextTick();
            this.$refs.bcCrudCrud.setCurrentRow(this.bcCrudData[this.bcCrudData.length - 1]);
            this.$toTableLow(this, 'bcCrudCrud');
        },

        handleDel() {
            if (!this.cellClickData) {
                return
            }
            if(!this.cellClickData.platId) {
                this.bcCrudData.splice(this.cellClickData.$index, 1);
                this.$refs.bcCrudCrud.setCurrentRow();
            } else { 
                this.$tip.cofirm(this.$t("tipLabel.deleteConfirm"))
                .then(async () => {
                    // this.loading = true;
                    let delRes = await removeProBleadyeRunJobFlatData(this.cellClickData.platId);
                    if (delRes.data.data == 1) {
                        this.bcCrudData.splice(this.cellClickData.$index, 1);
                        this.$refs.bcCrudCrud.setCurrentRow();
                        this.$tip.success(this.$t("public.sccg"));
                    } else {
                        this.$tip.error(this.$t("public.scsb"));
                    }
                    // this.loading = false;
                })
                .catch((err) => {
                    this.$tip.warning(this.$t("public.qxcz"));
                });
            }
        },
        cellClick(val) {
            this.cellClickData = val;
        }
    },
    
};
</script>
<style scoped>
    .revolve-bottom-column{}
</style>