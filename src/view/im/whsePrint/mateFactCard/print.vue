<!--
 * @Author: Lyl
 * @Date: 2022-09-24 14:28:08
 * @LastEditors: Lyl
 * @LastEditTime: 2022-10-01 09:27:30
 * @FilePath: \iot.vue\src\view\quaLity\bottomColumn\print.vue
 * @Description:
-->
<template>
    <div class="bottomColumn-print">
        <el-row class="formBox" style="margin: 10px" v-loading="loading" :element-loading-text="loadingText">
            <avue-form ref="printForm" :option="printFormOp" v-model="printForm">
                <template slot="poNo" slot-scope="scope">
                    <el-select v-model="printForm.poNo" filterable remote reserve-keyword clearable default-first-option
                        placeholder="请输入采购单号" :remote-method="singlepoRemoteMethod" @change="handleSinglePoChange"
                        :loading="vatLoading">
                        <el-option v-for="item in deliveOptions" :key="item.purSinglepooid" :label="item.poNo"
                            :value="item.purSinglepooid">
                        </el-option>
                    </el-select>
                </template>
            </avue-form>
            <el-row class="dtl-main">
                <el-col :span="6" v-for="item in dtlData" :key="item.purSinglepoDtloid">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>{{ item.chinName }}</span>
                            <i class="item-delete el-icon-remove-outline" @click="handleDel(item)"></i>
                            <i class="item-delete el-icon-view" @click="handlePreview(item)"></i>
                        </div>
                        <div class="mateFactCard-item"> 生产批号:<el-input v-model="item.supplyBatchNo"
                                placeholder="生产批号 / 供应商批号"></el-input>
                        </div>
                        <div class="mateFactCard-item"> {{ $t('proWeaveOutworkShip.proDate') + ':' }}
                            <el-date-picker v-model="item.prodDate" type="datetime" format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                        </div>
                        <div class="mateFactCard-item"> 有效日期:
                            <el-date-picker v-model="item.expireDate" type="datetime" format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                        </div>
                        <div class="mateFactCard-item"> 送货重量:<el-input v-model="item.poQty"
                                 min="1" type="number" @change="poQtyChange(item)"></el-input>
                        </div>
                        <div class="mateFactCard-item"> 包装净重:<el-input v-model="item.nw"
                                :max="item.nws" min="1" type="number" @change="sizeChange(item)"></el-input>
                        </div>
                        <div class="mateFactCard-item"> 包装毛重:<el-input v-model="item.gw"
                                :max="item.gws" min="1" type="number"></el-input>
                        </div>
                        <div class="mateFactCard-item"> 单 &nbsp &nbsp &nbsp 位:
                            <el-select v-model="item.unit" placeholder="请选择">
                                <el-option v-for="item in unitList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <!-- <div class="mateFactCard-item">
                            {{ $t('ReturnYarnsNotice.packSize') }}:<el-input v-model="item.pakageSize" :max="item.gws"
                                min="1" type="number" @change="sizeChange(item)"></el-input>
                        </div> -->
                        <div class="mateFactCard-item">
                            卡&nbsp数&nbsp&nbsp量:<el-input v-model="item.quantity" type="number" :max="100" :min="1"
                                placeholder="净重 ÷ 规格">
                            </el-input>
                        </div>
                        <!-- <div class="mateFactCard-item"> 包装编号:<el-input v-model="item.pakeageNo" placeholder="生产日期 + 序号" readonly=""></el-input>
                        </div> -->
                        <!-- <div class="mateFactCard-item">
                            备&nbsp&nbsp&nbsp&nbsp &nbsp注:<el-input v-model="item.remark" placeholder="备注"> </el-input>
                        </div> -->
                        <div class="mateFactCard-item">
                            已&nbsp 送&nbsp 完:<el-switch v-model="item.delivered" active-text="是" inactive-text="否"
                                :active-value="true" :inactive-value="false">
                            </el-switch>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-row>
        <div class="button-list">
            <el-button type="primary" @click="handleQuery" v-hasPerm="['whse:mateFactCard:list']"> {{ $t("public.query") }} </el-button>
            <el-popconfirm title="是否确定生成送货单？" placement="top-start" @onConfirm="createDeliOrderData" v-hasPerm="['whse:mateFactCard:add']">
                <el-button type="success" slot="reference"> 生成送货单 </el-button>
            </el-popconfirm>
            <span style="font-size: 20px">打印张数: </span> <input type="number" max="5" min="1" v-model="printCount">
        </div>
        <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
            :close-on-click-modal="false" :close-on-press-escape="false" @close="pdfDlg = false">
            <view-container :title="$t('public.printPreview')">
                <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { getDIC } from '../../../../config';
import { createPurSinglescheduleData, fetchCommonInterfaceNo, updatePurSinglepoData, fetchPurSinglescheduleData, createDeliOrderDtlData, fetchNewDeliNoData, createDeliOrderData, fetchPurSinglepoByPage, fetchBasChemicalmatNewData, fetchBasPigmentData, fetchWhseMateFactCardData, createWhseMateFactCardData, updateWhseMateFactCardData, fetchPurDeliveryData, fetchBasSupplierData, fetchPurSinglepoDtlData, fetchPurDeliveryDtlData } from "./api";
import { mateFactCardPrintFormOp, formGroupOp, materialTypeDic } from "./data";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { fetchFineReportUrl } from "@/api/index";
export default {
    components: {},
    props: {},
    data() {
        return {
            printFormOp: mateFactCardPrintFormOp(this),
            printForm: {
                type: 1,
                packNo: 1,
                unit: "KG",
                printCount: 1
            },
            loading: false,
            vatLoading: false,
            options: [],
            deliveOptions: [],
            spowerClient: null,
            printCount: 1,
            deliData: {},
            dtlData: [],
            unitList: getDIC("bas_matUnit"),
            loadingText: this.$t('public.loading'),
            pdfDlg: false,
            pdfUrl: process.env.API_HOST + "/api/whseMateFactCard/pdf?id=2"
        };
    },
    watch: {},
    computed: {},
    async created() {
        this.spowerClient = this.$store.state.spowerClient;
    },
    mounted() {
    },
    methods: {
        // 获取打印历史
        async handleMatePrintData(params) {
            // 查询是否存在码卡信息
            await fetchWhseMateFactCardData(params).then((res) => {
                if (!res.data.total) {
                    this.printForm.mcardId = '';
                    return;
                }
                this.printForm.mcardId = res.data.records[0].mcardId
            }).finally(() => {
                this.loading = false;
            })

        },
        async handlePrint() {
            if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
                this.$tip.warning(this.$t('tipLabel.clientError'));
                return;
            }
            this.loading = true;
            this.$refs.printForm.validate(async (valid, done) => {
                if (valid) {
                    for (let key in this.printForm) {
                        if (this.printForm[key] == 'undefined') {
                            delete this.printForm[key];
                        }
                    }
                    this.printForm.printTime = this.$getNowTime("datetime");
                    if (this.printForm.mcardId) {
                        // update
                        this.printForm.printCount = Number(this.printForm.printCount) + Number(this.printCount);
                        this.printForm.updateTime = this.$getNowTime("datetime");
                        this.printForm.updator = parent.userID;
                        updateWhseMateFactCardData(this.printForm).then(updateRes => {
                            if (updateRes.data.data !== -1) {
                                this.spowerClient.send(
                                    "print=mcardId:" + this.printForm.mcardId + "&" + this.printCount
                                );
                                this.$emit("on-load");
                                this.$tip.success(this.$t('bottomcol.success1'));
                            } else {
                                this.$tip.error(this.$t("bottomcol.error1") + updateRes.data.msg);
                            }
                        }).finally(() => {
                            this.loading = false;
                            done();
                        })

                    } else {
                        // add
                        this.printForm.createTime = this.$getNowTime("datetime");
                        this.printForm.creator = parent.userID;
                        this.printForm.printCount = this.printCount;
                        createWhseMateFactCardData(this.printForm).then(addRes => {
                            if (addRes.data.data != -1) {
                                this.printForm.mcardId = addRes.data.data;
                                this.spowerClient.send(
                                    "print=mcardId:" + this.printForm.mcardId + "&" + this.printCount
                                );
                                this.$emit("on-load");
                                this.$tip.success(this.$t('bottomcol.success2'));
                            } else {
                                this.$tip.error(this.$t('public.createFail') + addRes.data.msg);
                            }
                        }).finally(() => {
                            this.printForm.packNo++;
                            this.loading = false;
                            done();
                        })

                    }
                } else {
                    this.loading = false;
                    this.$tip.warning("请补充码卡信息!");
                    done && done()
                }
            })
        },
        singlepoRemoteMethod(val) {
            this.vatLoading = true;
            fetchPurSinglepoByPage({ poNo: "^^%" + val, suppId: parent.userID  }).then(res => {
                this.deliveOptions = res.data.records;
                this.vatLoading = false;
            })
        },
        remoteMethod(val) {
            this.vatLoading = true;
            let fetch = this.printForm.type == 1 ? fetchBasChemicalmatNewData : fetchBasPigmentData;
            fetch({ fillTextSeach: val }).then((res) => {
                this.options = res.data.records;
                this.vatLoading = false;
            });
        },
        handleSinglePoChange(purSinglepooid) {
            if (!purSinglepooid) return;
            this.loading = true;
            fetchPurSinglepoByPage({ purSinglepooid }).then(async res => {
                if (!res.data.records) return;
                this.printForm.mateCode = '';
                let deliData = res.data.records[0]
                this.deliData = deliData;
                let dtlData = await fetchPurSinglepoDtlData({ purSinglepoFk: purSinglepooid }).then(dtlRes => dtlRes.data)
                this.dtlData = dtlData.map((item, i) => {
                    return {
                        ...item,
                        index: i,
                        poQty: item.poQty,
                        // gw: item.poQty,
                        gws: item.poQty,
                        // nw: item.poQty,
                        nws: item.poQty,
                        mateCnName: item.chinName,
                        mateCode: item.materialNum,
                        unit: item.unitQty,
                        prodDate: this.$getNowTime("date") + " 00:00:00",
                        delivered: false,
                        supplyBatchNo: "",
                        quantity: 1,
                        materialType: item.materialType // 根据类型生成本厂批号
                    }
                })
                let supper = await fetchBasSupplierData({ suppId: deliData.suppId }).then(sup => sup.data[0])
                this.printForm = {
                    suplyName: supper.suppName,
                    brand: supper.suppSname,
                    prodDate: deliData.deliDate,
                    deliveryFk: deliData.purDeliveryoid,
                    poNo: deliData.purSinglepooid
                }
            }).finally((_) => {
                this.loading = false;
            })
        },
        async handleQuery() {
            this.handleSinglePoChange(this.printForm.poNo);
        },
        async createDeliOrderData() {
            if (!this.spowerClient || this.spowerClient.readyState == 3) {
                this.$tip.error(this.$t("tipLabel.clientError"));
                return;
            }
            if(!this.dtlData.length) return this.$tip.warning("没有送货数据!");
            let dtlVaild = this.dtlData.some((item) => !item.supplyBatchNo || !item.prodDate || !item.nw || !item.gw || !item.quantity)
            if (dtlVaild) return this.$tip.warning("生产批号 / 净重 / 毛重 / 生产日期 / 卡数量不能为空!")
            let deliNo = await fetchCommonInterfaceNo("__GetMaxNo", "BPO_Pur_Delivery_Main").then(res => eval(res.data).text); // 送货单号
            let date = this.$getNowTime("date") + " 00:00:00"
            let datetime = this.$getNowTime("datetime");
            this.loading = true;
            this.loadingText = "正在生成送货单..."
            let startSchedule = await fetchPurSinglescheduleData({ purSinglepoFk: this.deliData.purSinglepooid }).then(res => res.data.length)
            if (!startSchedule) {
                updatePurSinglepoData({ purSinglepooid: this.deliData.purSinglepooid, poFlag: 2 })                // 确定进度
            }
            let params = {
                sysCreated: datetime,
                sysLastUpd: datetime,
                deliNo,
                deliDate: date,
                suppId: this.deliData.suppId,
                deliType: "single",
                sysCreatedby: this.$store.state.userOid,
                sysLastUpdBy: this.$store.state.userOid,
                deliRemark: this.printForm.deliRemark
            }
            // 生成送货单
            let deliId = await createDeliOrderData(params).then(res => res.data.data)
            await this.dtlData.forEach(async (item) => {
                let batchNo = '';
                if (item.materialType == '4') {
                    batchNo = await fetchCommonInterfaceNo("__GetMaxBatchNo", "BPO_Pur_DeliSingle_Set").then(res => eval(res.data).text);; // 批号
                }
                // else {
                //     batchNo = await baseCodeSupplyEx({code: materialTypeDic[item.materialType]}).then(res => res.data.data); // 获取本厂批号
                // }
                item.factBatchNo = batchNo;
                let deliCount = await fetchPurSinglescheduleData({ purSinglepoDtlFk: item.purSinglepoDtloid }).then(res => res.data.length) // 送货次数
                let scheduleParams = {
                    batId: item.supplyBatchNo,
                    cmatDate: date,
                    createTime: datetime,
                    isSendall: item.delivered,
                    line: deliCount + 1,
                    poQty: item.poQty,
                    purSinglepoDtlFk: item.purSinglepoDtloid,
                    purSinglepoFk: this.deliData.purSinglepooid,
                    unitQty: item.unit,
                    updateTime: datetime,
                }
                // 生成进度
                let purSinglescheduleFk = await createPurSinglescheduleData(scheduleParams).then(res => res.data.data)
                // 生成送货单明细
                let dtl = {
                    batId: item.supplyBatchNo,
                    batchNo,
                    chinName: item.mateCnName,
                    materialNum: item.mateCode,
                    cmatDate: date,
                    deliQty: item.poQty,
                    deliUnit: item.unit,
                    purSinglepoDtlFk: item.purSinglepoDtloid,
                    delivered: item.delivered,
                    purNo: this.deliData.poNo,
                    purSinglescheduleFk,
                    purDeliveryFk: deliId,
                }
                await createDeliOrderDtlData(dtl)
            })
            // let printConfirm = await this.$tip.cofirm("送货单已生成，是否开始打印物料卡？").then(_ => true).catch(_ => false)
            // if (!printConfirm) return this.loading = false;
            this.dtlData.forEach(async (item, i) => {
                new Array(Number(item.quantity)).fill(1).forEach(async _ => {
                    item.pakeageNo = await baseCodeSupply({ code: "whse_mateFactCard" }).then(res => res.data.data);
                    this.loadingText = `正在生成【 ${item.chinName}  】的物料信息卡 -- ${item.pakeageNo}`
                    let addParams = {
                        brand: this.printForm.brand,
                        suplyName: this.printForm.suplyName,
                        createTime: this.$getNowTime("datetime"),
                        creator: parent.userID,
                        updateTime: this.$getNowTime("datetime"),
                        updator: parent.userID,
                        gw: item.gw,
                        nw: item.nw,
                        mateCnName: item.mateCnName,
                        mateCode: item.mateCode,
                        pakageSize: item.pakageSize,
                        pakeageNo: item.pakeageNo,
                        printTime: this.$getNowTime("datetime"),
                        supplyBatchNo: item.supplyBatchNo,
                        factBatchNo: item.factBatchNo,
                        unit: item.unit,
                        prodDate: item.prodDate,
                        expireDate: item.expireDate,
                        deliveryFk: deliId,
                        mcardId: "",
                        printCount: this.printCount,
                        printTime: datetime
                    }
                    await createWhseMateFactCardData(addParams).then(res => {
                        // 发送打印请求
                        console.log("print=mcardId:" + res.data.data + '&' + this.printCount);
                        this.spowerClient.send("print=mcardId:" + res.data.data + '&' + this.printCount);
                    })
                })
                if (i == this.dtlData.length - 1) {
                    this.handleOpenRpt(deliNo); // 送货单报表
                    this.loading = false;
                    this.loadingText = this.$t('public.loading');
                    this.$tip.success("已发送全部打印指令!");
                }
            })
        },
        // 打开报表 获取fineReport的数据
        handleOpenRpt(deliNo) {
            let queryData = {
                module: "PUR",
                id: "PUR_DELIVERY",
            };
            fetchFineReportUrl(queryData).then((res) => {
                if (res.data) {
                    let url = res.data.url.replace("192.168.5.1", window.location.hostname) + "&deliNo=" + deliNo;
                    let oA = document.createElement("a");
                    oA.href = url;
                    oA.target = "_blank";
                    oA.click();
                } else {
                    this.$tip.warning(this.$t("tipLabel.noreport"));
                }
            });
        },
        async sizeChange(row) {
            await this.$nextTick();
            if (!row.nw) return
            row.pakageSize = row.nw;
            // row.gw = row.nw;
            row.quantity = Number(row.poQty / row.pakageSize).toFixed() < 100 ? Number(row.poQty / row.pakageSize).toFixed() : 100;
            row.quantity == 0 && (row.quantity = 1)
        },
        async poQtyChange(row) {
            await this.$nextTick();
            if(!row.poQty) return;
            row.quantity = Number(row.poQty / row.pakageSize).toFixed() < 100 ? Number(row.poQty / row.pakageSize).toFixed() : 100;
            row.quantity == 0 && (row.quantity = 1)
        },
        handleDel(row) {
            this.dtlData.splice(row.index, 1)
            this.dtlData.forEach((item, i) => {
                item.index = i;
            })
        },
        async handlePreview(row) {
            await updateWhseMateFactCardData(Object.assign(row, { mcardId: 2, suplyName: this.printForm.suplyName, brand: this.printForm.brand, }));
            this.pdfDlg = true;
        }
    },
};
</script>
<style lang="stylus">
.dtl-main {
    height: calc(100vh - 355px);
    overflow: auto;
    border: 1px solid #eee
}
.item-delete {
    display: none !important;
    float: right;
    color: #ccc;
    cursor pointer;
    margin: 0 5px;
    font-size: 24px;
    &:hover {
        color: red
    }
}

.box-card {
    margin: 6px;
    text-align: left;
    padding: 0 8px 8px;
    &:hover .item-delete{
        display: block !important;
    }
}

.el-card__header {
    padding: 10px !important;
    font-weight: 600;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mateFactCard-item {
    display: flex;
    padding: 6px 10px;
    white-space: nowrap;

    .el-input {
        height: 20px !important;
        line-height: 20px !important;
        margin-left: 5px;
        text-indent: 5px
    }

    .el-input__inner {
        border: none;
        border-bottom: 1px solid #ccc;
        border-radius: 0
    }

    .el-date-editor.el-input, .el-select {
        width: 100% !important
    }

}
.button-list {
    padding: 10px;
}

.bottomColumn-print {

    .el-switch{
        height: 22px;
        line-height: 22px;
        text-indent: 5px
    }

    .el-switch__label *{
        font-size: 17px !important;
    }

    .el-form-item__label {
        font-size: 22px !important;
        padding: 0 5px 0 0 !important;
        white-space: nowrap !important;
        line-height 40px !important;
    }

    .el-form-item__content .el-input--mini input {
        height 40px !important;
        line-height 40px !important;
    }

    .el-form-item__content .el-input__inner {
        font-size 22px !important;
    }

    .el-button {
        font-size: 22px !important;
        margin: 10px 20px;
    }

    .el-form-item__content input {
        font-size 20px !important;
    }

}
</style>
