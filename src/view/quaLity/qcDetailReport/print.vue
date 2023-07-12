<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-29 17:01:37
 * @Description:
-->
<template>
  <div id="qcDeatilReport" :element-loading-text="$t('public.loading')" v-loading="wloading">
    <el-row class="btnList">
      <template v-if="prodType=='2'">
        <el-button type="success" @click="newImport"  v-hasPerm="['quality:qcDetailReport:update2']">新增</el-button>
        <el-button type="warning" @click="update" :disabled="!chooseData.vatNo" v-hasPerm="['quality:qcDetailReport:update2']">更新</el-button>
      </template>
      <el-button type="danger" @click="handleAudit" :disabled="!chooseData.vatNo" v-if="permType == '1'">
        {{ $t("public.audit") }}
      </el-button>
      <template v-if="prodType=='1'">
        <el-button type="success" v-if="!permType" @click="handleAddOrUpdate" :disabled="!form.vatNo" >更新
        </el-button>
      </template>

      <template v-if="prodType!=='2'">
        <el-button type="warning" @click="handlePreview" :disabled="!form.vatNo">{{
            $t("public.preview") + '- xem trước'
          }}
        </el-button>
      </template>
      <el-button type="primary" @click="initData">{{ $t("public.query") }}</el-button>
      <span style="margin-left: .9375rem">{{ $t("checkPlan.btn6") }}: <el-switch v-model="hasUpdateDate">
        </el-switch></span>

    </el-row>
    <el-row class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form">
        <template slot-scope="scope" slot="vatNo">
          <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                     :placeholder="$t('tipLabel.inputVatNo')" :loading="serachLoading" :remote-method="remoteMethod"
                     @change="initData">
            <el-option v-for="item in options" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </el-row>
    <el-row class="crudBox">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="initData"
                 @cell-click="cellClick" @row-dblclick="handleOpenDetails">
        <template slot-scope="scope" slot="menu">
          <el-button type="primary" plain @click="handleOpenDetails(scope.row)">{{ $t("public.details") }}
          </el-button>
        </template>
      </avue-crud>
    </el-row>
    <el-dialog :visible.sync="detailVisible" fullscreen append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-tabs type="border-card" v-model="tab">
        <el-tab-pane name="dt" :label="$t('note.title5')">
          <el-row class="btnList">
            <el-button type="danger" @click="handleOutReport" :disabled="!form.vatNo"> 审核&打印</el-button>
            <template v-if="prodType=='2'" v-hasPerm="['quality:qcDetailReport:preview1']">
              <el-button type="primary" @click="previewImp" >导出报表</el-button>
            </template>
            <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
              <el-button type="warning" @click="detailVisible = false">{{ $t("public.close") }}
              </el-button>
            </el-tooltip>
          </el-row>
          <avue-crud ref="crud" :option="crudOpdetail" :data="crudDetail" :page.sync="pageDetail"
                     v-loading="loadingDetail" @selection-change="selectionChange">
          </avue-crud>
        </el-tab-pane>
        <el-tab-pane name="history" label="历史记录" v-if="prodType == 1">
          <history ref="historyData" :checkRowData="checkRowData" @close="detailVisible = false"></history>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog :visible.sync="visible" fullscreen append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false" v-if="visible">
      <Import v-if="visible" :state="chooseData" :edit="edit" @exit="visible=false"></Import>
    </el-dialog>

    <el-dialog id="colorMng_Dlg" :visible.sync="auditVisible" width="70%" top="8vh" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false">
      <audit ref="auditDlg" :cellData="chooseData" @submitAudit="submitAudit"></audit>
    </el-dialog>
    <el-dialog :visible.sync="pdfDlg" width="100%" fullscreen append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false">
      <view-container title="打印预览">
        <embed style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl"/>
      </view-container>

    </el-dialog>
  </div>
</template>
<script>
import {mainForm, mainCrud, mainCrud1, dlgForm, dlgCrud, detailCrud} from "./data";
import {bottomColumnCrudOp} from "../bottomColumn/data"
import {
  get,
  add,
  update,
  getRunJobByPage,
  getFinishedNote,
  getDismantleVatno,
  updateRunJob,
  aduitQcCheckoutFabric,
  getdetail,
  getProProductFlatCardData,
  fetchQcCheckoutFabricHis, versionCont, checkExist
} from "./api";
import history from "./history";
import audit from './audit'
import Import from "./Import.vue";

export default {
  name: "qcDeatilReport",
  components: {
    audit,
    history,
    Import
  },
  props: {
    prodType: {},
    permType: Boolean
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        wmUnit: "KG",
      },
      crudOpdetail: detailCrud(this),
      crudOp: mainCrud(this),
      crud: [],
      crudDetail: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      pageDetail: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      edit:false,
      spowerClient: "",
      wloading: false,
      loading: false,
      serachLoading: false,
      options: [],
      chooseData: {},
      auditVisible: false,
      detailVisible: false,
      loadingDetail: false,
      selectList: [],
      hasUpdateDate: false,
      hasUpdateData: false,
      pdfDlg: false,
      pdfUrl: "",
      tab: 'dt',
      checkRowData: {},
      visible: false
    };
  },
  watch: {},
  methods: {
    initData() {
      this.crudOp = this.prodType == 1 ? mainCrud(this) : mainCrud1(this)
      this.wloading = true;
      this.chooseData = {};
      let params = {
        vatNo: this.form.vatNo,
        whseVouch: this.form.whseVouch
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          prodType: this.prodType
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.page.total = res.data.total;
      }).finally(() => {
        this.$refs.crud.setCurrentRow();
        this.wloading = false;
      })
    },
    querydetail(row) {
      this.loadingDetail = true;
      this.selectList = [];
      this.checkRowData = row;
      this.crudOpdetail = this.prodType == 1 ? detailCrud(this) : bottomColumnCrudOp(this);
      if (this.prodType == 1) {
        this.crudDetail = row.fabricDtls.sort((a, b) => a.pidNo > b.pidNo ? 1 : -1);
        this.pageDetail.total = this.crudDetail.length;
        this.loadingDetail = false;
        return;
      }
      this.crudOpdetail.selection = true;
      let func = this.prodType == 1 ? getdetail : getProProductFlatCardData
      let obj = Object.assign({vatNo: row.vatNo}, {
        isPrinted: true,
        cardType: 1,
        delFlag: false,
      })
      if (this.prodType == 2) {
        obj = Object.assign(obj, {checkoutFk: row.checkoutId})
      }
      func(
        obj
      ).then((res) => {
        this.crudDetail = res.data.sort((a, b) => a.pidNo > b.pidNo ? 1 : -1);
        this.crudDetail.sort((a, b) => {
          return a.flatCardCode > b.flatCardCode ? 1 : -1;
        });
        this.pageDetail.total = res.data.length;
        this.loadingDetail = false;
      });
    },
    newImport() {
      this.edit=false;
      this.visible = true;
    },
    update(){
      this.edit=true;
      this.visible = true;
    },
    submitAudit(val) {
      if (!this.chooseData.checkoutId) {
        this.$tip.warning(this.$t("tipLabel.plsCheckAuditData"));
        return;
      }
      this.loading = true;
      let params = {
        checkoutId: this.chooseData.checkoutId,
        vatNo: this.chooseData.vatNo,
        whseVouch: val,
        whseVouchTime: this.$getNowTime("datetime"),
        whseVoucher: parent.userID
      }
      aduitQcCheckoutFabric(params).then(res => {
        this.$tip.success(this.$t("public.auditSuccess"));
        this.initData()
      }).finally(() => {
        this.auditVisible = false
        this.loading = false;
      })
    },
    async handleAudit() {
      this.auditVisible = true;
      await this.$nextTick();
      this.$refs.auditDlg.initData(this.prodType);
    },
    remoteMethod(val) {
      this.serachLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 100,
        start: 1,
        page: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.serachLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.form.vatNo = res.data.records[0].vatNo;
          }
        });
      });
    },
    updateFinishedData() {
      this.wloading = true;
      // 查询缸号信息
      getRunJobByPage({
        vatNo: this.form.vatNo,
        rows: 10,
        start: 1,
        page: 1,
      }).then((res) => {
        if (res.data.records.length) {
          let vatData = res.data.records[0]; // 当前缸号信息
          let checkData = {
            vatNo: vatData.vatNo,
            fabricName: vatData.fabName,
            colorName: vatData.colorName,
            yarnBrand: vatData.yarnCard,
            factBatch: vatData.yarnCylinder,
            yarnBatch: vatData.yarnNumber,
            calicoPidCount: vatData.pidCount,
            calicoAmount: vatData.clothWeight
              ? vatData.clothWeight
              : vatData.divdCw,
          };
          // 查询缸号下的成品布
          getFinishedNote({
            vatNo: this.form.vatNo,
            cardType: 1, // 1为有效成品数据
            delFlag: false,
          }).then((note) => {
            if (!note.data.length) {
              this.$tip.error(this.$t("checkPlan.warning3"));
              this.wloading = false;
              return false;
            }
            checkData.fabricPidCount = note.data.length; // 成品总疋数
            checkData.weightKg = 0; // 成品总重量KG
            checkData.weightLbs = 0; // LBS
            checkData.fabricLength = 0;
            checkData.storeCodes = "";

            note.data.forEach((item, i) => {
              checkData.weightKg += item.netWeight || 0;
              checkData.weightLbs += item.netWeightLbs || 0;
              checkData.fabricLength += item.yardLength || 0;
              checkData.storeCodes +=
                checkData.storeCodes.indexOf(item.storeLoadCode) == -1
                  ? item.storeLoadCode
                    ? item.storeLoadCode + ","
                    : ""
                  : "";
            });
            checkData.weightKg = Number(checkData.weightKg.toFixed(2));
            checkData.weightLbs = Number(checkData.weightLbs.toFixed(2));
            checkData.storeCodes = checkData.storeCodes.replace(/,$/, "");
            // 计算损耗 = (成品重量 / 入缸胚布重量 - 1) *  100
            checkData.lossRate = Number(
              (checkData.weightKg / checkData.calicoAmount - 1) * 100
            ).toFixed(2);
            checkData.lossRate =
              checkData.lossRate == "Infinity" ? 0 : checkData.lossRate;
            this.hasUpdateDate && (checkData.checkoutDate = this.$getNowTime("datetime"));
            checkData.prodType = 1;
            checkExist({vatNo: this.form.vatNo}).then((res) => {
              if (res.data.length == 0) {
                this.PostData(checkData);
              } else {
                versionCont({vatNo: this.form.vatNo}).then((res) => {
                  if (res.data.data == 1) {
                    this.PostData(checkData);
                  } else {
                    this.$tip.warning("Hệ thống không ghi nhận thay đổi của đơn này!台账数据没有变化无需更新")
                  }
                })
              }
            })
            this.wloading = false;
          });
        } else {
          this.$tip.warning(this.$t("checkPlan.warning4"));
        }
      });
    },
    PostData(checkData) {
      add(
        Object.assign(checkData, {
          remark: this.form.remark,
          checkoutDate: this.$getNowTime("datetime"),
          wmUnit: this.form.wmUnit,
          whseVouch: 0
        })
      ).then((res) => {
        if (res.data.code == 200) {
          let sIndex = this.form.vatNo.search("[AWR]");
          let sVatNo =
            sIndex > 0 ? this.form.vatNo.substring(0, sIndex) : this.form.vatNo; // 筛选原缸号
          getDismantleVatno(sVatNo).then((res) => {
            getRunJobByPage({
              vatNo: sVatNo,
              rows: 10,
              start: 1,
              page: 1,
            }).then((vatList) => {
              if (vatList.data.total) {
                vatList.data.records[0].divdCw = res.data[sVatNo]; // 获取拆缸重量
                updateRunJob(vatList.data.records[0]).then((res) => {
                }); // 更新原缸拆缸重量
              }
            });
          });

          this.initData();
          this.$tip.success("更新成功！")
        } else {
          this.$tip.error("更新失败！")
        }
      }).finally(_ => {
        this.wloading = false;
      })
    },
    async outBottonColumnReport() {
      this.wloading = true;
      let parasm = {
        vatNo: this.form.vatNo,
        rows: 10,
        start: 1,
        page: 1,
      }
      let jobData = await getRunJobByPage(parasm).then((res) => res.data.records);
      if (!jobData.length) {
        this.wloading = false;
        this.$tip.warning(this.$t("checkPlan.warning4"));
        return;
      }
      let vatData = jobData[0];
      let cardData = await getProProductFlatCardData({runJobFk: vatData.runJobId}).then((note) => note.data)
      if (!cardData.length) {
        this.wloading = false;
        this.$tip.warning(this.$t("checkPlan.warning5"));
        return;
      }
      let weightKg = cardData.reduce((total, cur) => {
        return total += cur.packNwKg
      }, 0)
      let weightLbs = weightKg * 2.2046;
      weightKg = weightKg.toFixed(2);
      weightLbs = weightLbs.toFixed(2);
      let reportData = {
        prodType: this.prodType,
        vatNo: vatData.vatNo,
        fabricName: vatData.fabName,
        colorName: vatData.colorName,
        yarnBrand: vatData.yarnCard,
        factBatch: vatData.yarnCylinder,
        yarnBatch: vatData.yarnNumber,
        calicoPidCount: vatData.pidCount,
        calicoAmount: vatData.clothWeight,
        runJobFk: vatData.runJobId,
        // ---
        fabricPidCount: cardData.length,
        weightKg,
        weightLbs
      }
      this.hasUpdateDate && (reportData.checkoutDate = this.$getNowTime("datetime"));
      get({vatNo: this.form.vatNo, prodType: 2}).then((vatNo) => {
        if (vatNo.data.records.length) {
          // 存在记录,修改
          update(
            Object.assign(reportData, {
              checkoutId: vatNo.data.records[0].checkoutId,
              remark: this.form.remark,
              wmUnit: this.form.wmUnit,
            })
          ).then((res) => {
            if (res.data.code == 200) {
              this.initData();
              this.$tip.success("更新成功！")
            } else {
              this.$tip.error("更新失败！")
            }
          }).finally(_ => {
            this.wloading = false;
          })
        } else {
          reportData.prodType = 2;
          add(
            Object.assign(reportData, {
              remark: this.form.remark,
              checkoutDate: this.$getNowTime("datetime"),
              wmUnit: this.form.wmUnit,
              whseVouch: 0
            })
          ).then((res) => {
            if (res.data.code == 200) {
              this.initData();
              this.$tip.success("更新成功！")
            } else {
              this.$tip.error("更新失败！")
            }
          }).finally(_ => {
            this.wloading = false;
          })
        }
      });
    },
    async handleAddOrUpdate(callback) {

      if (!this.form.vatNo) return this.$tip.warning("请先输入缸号!");
      let hasVouch = await get({
        vatNo: this.form.vatNo,
        prodType: this.prodType
      }).then((vatNo) => vatNo.data.total ? vatNo.data.records[0].whseVouch == 9 : 0);
      if (hasVouch) return this.$tip.warning("更新失败！已审核入仓不可以更新!");
      if (this.prodType == 1) {
        await getFinishedNote({
          vatNo: this.form.vatNo,
          cardType: 1, // 1为有效成品数据
          delFlag: false,
        }).then(async (note) => {
          if (note.data.length) {
            await this.updateFinishedData();
          } else {
            this.$tip.error(this.$t("checkPlan.warning3"));
            if (typeof callback == 'function') callback(true)
          }
        })
      } else {
        await this.outBottonColumnReport();
      }
    },
    async previewImp() {
      let records = await get({vatNo: this.form.vatNo, prodType: this.prodType}).then((vatNo) => vatNo.data.records);
      let name = encodeURI(
        process.env.API_HOST +
        "/api/qcCheckoutFabric/collarPdf?id=" +
        records[0].checkoutId +
        "&units=" +
        this.form.wmUnit+"&fileType=1"
      );
      window.open(name);
    },
    async handleOutReport() {
     // console.log(this.chooseData.checkoutId)
      let records = await get({vatNo: this.form.vatNo, prodType: this.prodType}).then((vatNo) => vatNo.data.records);

      // 不存在记录 生成记录
      let hasNotNote = false
      if (!records.length) {
        await this.handleAddOrUpdate((response) => hasNotNote = response);
      }
      if (hasNotNote) return;
      if (this.prodType == 1) {
        let name = encodeURI(
          process.env.API_HOST +
          "/api/proFinalProductCard/warehousingdetails?vatNo=" +
          this.form.vatNo +
          "&units=" +
          this.form.wmUnit + "&userName=" + parent.userID || "ADMIN");

        window.open(name);
      } else {
        let name = encodeURI(
          process.env.API_HOST +
          "/api/qcCheckoutFabric/collarPdf?id=" +
          this.chooseData.checkoutId +
          "&units=" +
          this.form.wmUnit
        );
        window.open(name);
      }
    },
    async handlePreview() {
      await this.$nextTick();
      if (this.chooseData.vatNo == null) {
        this.$tip.warning("请选择你的要预览的缸号")
        return;
      }
      this.pdfUrl = encodeURI(process.env.API_HOST + "/api/proFinalProductCard/warehousingdetails?vatNo=" + this.chooseData.vatNo + "&units=" + this.form.wmUnit + "&filType=预览");
      this.pdfDlg = true;
    },
    async handleOpenDetails(row) {
      this.checkRowData = row;
      this.detailVisible = true;
      await this.$nextTick();
      this.querydetail(row);
      this.$refs.historyData.initData();
      this.form.vatNo = row.vatNo;
      this.remoteMethod(row.vatNo);
    },
    cellClick(val) {
      this.chooseData = val;
      this.form.vatNo = val.vatNo;
    },
    selectionChange(list) {
      this.selectList = list;
    },
    selectionHistoryChange(list) {
      this.selectList = list;
    },
  },
  updated() {
  },
  created() {
  },
  mounted() {

  },
  beforeDestroy() {
  },
};
</script>
<style lang='stylus' scoped>
>>> .el-table__fixed-right {
  z-index: 99;
}
</style>
