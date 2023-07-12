<template>
    <div class='revolve-split-valid'>
        <el-dialog append-to-body :visible.sync="dialogVisible" :element-loading-text="$t('public.loading')"
            v-loading="loading" fullscreen :close-on-click-modal="false" :close-on-press-escape="false" top="5vh">
            <view-container :title="$t('revolve.splitTle1')" class='revolve-split-valid-tab'>
                <el-row class="btnList">
                    <el-button type="success" @click="handleSaveData">{{$t("public.determine")}}</el-button>
                </el-row>
                <el-transfer filterable v-model="splitNotes" :filter-placeholder="$t('public.filterPlr')" :data="finishedNotes"
                    :titles="[vatNo || $t('revolve.splitTle2'), nVatNo || $t('revolve.splitTle3')]" style="margin: 10px" :props="{
                        key: 'cardId',
                        label: 'productNo',
                    }">
                    <span slot-scope="{ option }">{{ option.vatNo }} - {{ option.pidNo }} -
                        {{ option.netWeight + "KG" }}</span>
                </el-transfer>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { getFinishList , fetchQcCheckClothDayDetailCardData} from "./api"
export default {
    data() {
        return {
            dialogVisible: false,
            loading: false,
            finishedNotes: [],
            splitNotes: [],
            vatNo: "",
            nVatNo: "",
            splitType: null
        }
    },
    methods: {
        async initData(vatNo, nVatNo, detailIdFk, splitType) {
            if (!vatNo || !nVatNo) return;
            this.loading = true;
            this.vatNo = vatNo;
            this.nVatNo = nVatNo;
            this.finishedNotes = [];
            this.splitType = splitType;
            this.dialogVisible = true;
            await this.$nextTick();
            let params = {
                vatNo,
                cardType: 1
            }
            getFinishList(params).then(res => {
                if (!res.data.length) {
                    this.$emit("splitConfirmSave");
                    this.loading = false;
                    this.dialogVisible = false;
                }
                this.splitNotes = [];
                this.finishedNotes = this.finishedNotes.concat(
                    res.data.sort((a, b) => {
                        return a.productNo > b.productNo ? 1 : -1;
                    })
                );
                // this.finishedNotes.forEach((item) => {
                //     item.disabled = item.whseVouch == 9 ? true : false
                // })
                detailIdFk && this.getSpliitNote(detailIdFk)
            }).finally(() => {
                this.loading = false;
                this.$tip.info(this.$t("revolve.noCheckNote"));
            })

        },
        async getSpliitNote(detailIdFk) {
            let noteList = await fetchQcCheckClothDayDetailCardData({ detailIdFk }).then(res => res.data);
            noteList.forEach((item) =>{
                this.splitNotes.push(item.cardIdFk)
            })
        },
        handleSaveData() {
            if (!this.splitNotes.length && this.splitType !== 'L') { //拆L跳过选布
                this.$tip.warning(this.$t("revolve.noCheckNote"));
                return;
            }
            this.dialogVisible = false;
            this.$emit("splitConfirmSave", this.splitNotes)
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style lang="stylus">
.revolve-split-valid-tab {
    .el-transfer-panel__list.is-filterable {
        height: calc(100vh - 300px) !important;
        text-align: left !important;
        text-indent: 1em !important;
    }

    .el-transfer-panel__body {
        height: calc(100vh - 270px) !important;
    }

    .el-transfer-panel {
        width: 450px;
    }

    .el-transfer-panel .el-checkbox__inner {
        height: 18px;
        width: 18px;
    }

    .el-transfer-panel__item.el-checkbox .el-checkbox__label {
        padding-left: 34px;
        line-height: 35px;
    }

    .el-transfer-panel__item {
        padding-left: 0;
        text-indent: 0.5em;
    }

    .el-transfer-panel .el-checkbox__inner::after {
        height: 8px;
        width: 4px;
        left: 6px;
    }

    .el-transfer-panel__filter .el-input__inner {
        font-size: 15px;
    }

    .el-transfer-panel__filter {
        margin: 5px;
    }
}
</style>