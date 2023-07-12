<template>
  <div id="choice">
    <el-dialog
      id="choiceDlg"
      :visible.sync="choiceV"
      :width="dlgWidth"
      top="10vh"
      :fullscreen="dlgWidth === '100%'"
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeBefore"
      v-if="choiceV"
    >
      <!-- <view-container :title="choiceTle"> -->
      <el-tabs type="border-card" v-model="tab" @tab-click="handleClick">
        <el-tab-pane name="tab1" :label="choiceTle">
          <div class="btnList">
            <el-button type="primary" @click="choice">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button
              type="primary"
              @click="query"
              v-if="choiceTle != $t('choicDlg.shdmx')"
              >{{ $t("public.query") }}</el-button
            >
            <el-button type="warning" @click="close">{{
              $t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form ref="form" :option="choiceF" v-model="form"></avue-form>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="crud"
              :option="choiceC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="query"
              @row-dblclick="handleRowDBLClick"
              @current-row-change="cellClick"
              @selection-change="selectionChange"
            >
            </avue-crud>
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="tab2"
          :label="this.$t('choicDlg.xz')"
          v-if="choiceTle === $t('choicDlg.wj')"
        >
          <div class="btnList">
            <el-button type="primary" @click="choice">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button type="primary" @click="query">{{
              this.$t("public.query")
            }}</el-button>
            <el-button type="warning" @click="close">{{
              this.$t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form ref="form" :option="choiceF" v-model="form"></avue-form>
          </div>
          <div class="crudBox" style="margin-top: -15px">
            <avue-crud
              ref="crud"
              :option="choiceC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="query"
              @row-dblclick="handleRowDBLClick"
              @current-row-change="cellClick"
            >
            </avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- </view-container> -->
    </el-dialog>
  </div>
</template>
<script>
import {
  IncomingYarnF,
  IncomingYarnC,
  getIncoming,
  getPurDelivery,
  PurDeliveryF,
  PurDeliveryC,
  getPurYarnsPo,
  PurYarnsPoF,
  PurYarnsPoC,
  getBasYarnsData,
  BasYarnsDataF,
  BasYarnsDataC,
  getBasCustomer,
  BasCustomerF,
  BasCustomerC,
  getWhseRetratyarn,
  WhseRetratyarnF,
  WhseRetratyarnC,
  getEmbryogenesis,
  EmbryogenesisF,
  EmbryogenesisC,
  EmbryogenesisDtlC,
  EmbryogenesisDtlF,
  getEmbryogenesisDtl,
  getBasCalico,
  BasCalicoF,
  BasCalicoC,
  getPurCalicoPo,
  PurCalicoPoF,
  PurCalicoPoC,
  WhseCalicoPackBarCodeF,
  WhseCalicoPackBarCodeC,
  getWhseCalicoPackBarCode,
  getWhseFinishedclothpackBarcode,
  getSalPoDtlaList,
  SalPoDtlaListF,
  SalPoDtlaListC,
  BasChemicalmatC,
  BasChemicalmatF,
  getBasChemicalmat,
  getPurChemicalpo,
  PurChemicalpoF,
  PurChemicalpoC,
  getWhseChemicalPlan,
  WhseChemicalPlanF,
  WhseChemicalPlanC,
  purDelisingleDtla,
  // 来原料登记
  getChemical,
  chemicalF,
  chemicalC,
  getChemicalDtl,
  chemicalDtlF,
  chemicalDtlC,
  // 来顏料登记
  getPigment,
  pigmentF,
  pigmentC,
  getPigmentDtl,
  pigmentDtlF,
  pigmentDtlC,
  //來輔料登记
  getSalIncomacc,
  SalIncomaccF,
  SalIncomaccC,
  getSalIncomaccDtl,
  SalIncomaccDtlF,
  SalIncomaccDtlC,
  //來纱线登记明細
  IncomingYarnDtlC,
  IncomingYarnDtlF,
  getIncomingDtl,
  // 生產輔料
  getProductivesupplies,
  ProductivesuppliesF,
  ProductivesuppliesC,
  // 生產輔料採購單
  PurMaterialspoF,
  PurMaterialspoC,
  getPurMaterialspo,
  // 選擇外厂輔料配料计划
  getWhseRetmaterialsPlan,
  WhseRetmaterialsPlanF,
  WhseRetmaterialsPlanC,
  // 外厂胚布配料计划
  getWhseMaterialoutPlan,
  WhseMaterialoutPlanF,
  WhseMaterialoutPlanC,
  getWhseMaterialPlan,
  WhseMaterialPlanF,
  WhseMaterialPlanC,
  // 外厂纱线配料计划
  getWhseRetyarninoutPlan,
  WhseRetyarninoutPlanC,
  WhseRetyarninoutPlanF,
  getWhseRetyarninPlan,
  WhseRetyarninPlanC,
  WhseRetyarninPlanF,
  // 五金採購單
  getPurHardwarepo,
  PurHardwarepoF,
  PurHardwarepoC,
  // 五金
  getBasHardwarearticles,
  BasHardwarearticlesF,
  BasHardwarearticlesC,
  // 行政
  getBasAdsuppliesarticles,
  BasAdsuppliesarticlesF,
  BasAdsuppliesarticlesC,
  // 货运计划
  getshipPlan,
  shipPlanF,
  shipPlanC,
  getshipPlanDtl,
  shipPlanDtlF,
  shipPlanDtlC,
  // 订单胚布资料
  getOrderPb,
  OrderPbF,
  OrderPbC,
  // 胚布疋号资料
  getPbDltb,
  PbDltbF,
  PbDltbC,
  // 胚布入仓明细
  getPbDetali,
  PbDetaliF,
  PbDetaliC,
  // 员工
  getPersonList,
  PersonF,
  PersonC,
  // 送货单明细
  getPurDeliveryDetail,
  PurDeliveryDF,
  PurDeliveryDC,
  // 染化料
  getPurChemicalpo2,
  // 申购单
  getSingle,
  SingleF,
  SingleC,
  // 申购单明细
  getSingleDtl,
  SingleDtlF,
  SingleDtlC,
  // 申请领用单
  getPurApplication,
  purApplicationF,
  purApplicationC,
  // 申请领用单明细
  getPurApplicationDtl,
  purApplicationDtlF,
  purApplicationDtlC,
  //  色号信息
  getSalColor,
  SalColorF,
  SalColorC,
  //  色号资料
  getTapcolor,
  TapcolorF,
  TapcolorC,
  // 五金/行政入仓明细
  getCalicoinDtla,
  calicoinDtlaF,
  calicoinDtlaC,
  // 辅料
  scflDtlaC,
  getScflDtla,
  //  貨位
  getLoc,
  locC,
  locF,
  // 指令單明細
  instructDtlF,
  instructDtlC,
  getInstructDtl,
  // 紗線入倉
  YarninF,
  YarninC,
  getYarnin,
} from "@/const/whse";
export default {
  name: "",
  components: {},
  props: {
    choiceV: Boolean,
    choiceTle: String,
    dlgWidth: String,
    choiceQ: Object,
  },
  data() {
    return {
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      choiceC: {},
      crud: [],
      choiceF: {},
      form: {},
      pick: {},
      getData: Function,
      tab: "tab1",
      chooseData: [],
    };
  },
  watch: {},
  methods: {
    // 查询
    query() {
      this.loading = true;
      if (this.choiceTle === this.$t("choicDlg.xzpbrc")) {
        this.$set(this.choiceC.column[2], "hide", false);
      }
      if (this.choiceTle === this.$t("choicDlg.xzwjxzrc")) {
        this.choiceF.column[0].dicData = this.choiceF.column[0].dicData.filter(
          (val) => {
            return (
              val.label.indexOf("五金") != -1 || val.label.indexOf("行政") != -1
            );
          }
        );
        this.$set(this.choiceC.column[2], "hide", false);
        // this.$set(
        //   this.form,
        //   "materialType",
        //   this.choiceF.column[0].dicData[0].value
        // );
      }
      if (this.choiceTle === this.$t("choicDlg.xzflrc")) {
        // this.choiceF.column[0].dicData = this.choiceF.column[0].dicData.filter(
        //   (val) => {
        //     return val.label.indexOf("生產輔料") != -1;
        //   }
        // );
        // this.$set(
        //   this.form,
        //   "materialType",
        //   this.choiceF.column[0].dicData[0].value
        // );
        // this.$set(this.choiceC.column[2], "hide", false);
      }
      //   if (
      //   this.choiceTle === this.$t("choicDlg.xzwjxzrc") ||
      //   this.choiceTle === this.$t("choicDlg.xzflrc")
      // ) {
      //   this.form.materialType = this.choiceF.column[0].dicData[0].value;
      // }
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      for (var key in this.choiceQ) {
        if (this.choiceQ[key] === "") {
          delete this.choiceQ[key];
        }
      }
      if (this.choiceTle === this.$t("choicDlg.rhlsgcgd")) {
        this.form.type = 5;
      }
      if (this.choiceTle === this.$t("choicDlg.shd")) {
        purDelisingleDtla({ purNo: this.choiceQ.purNo }).then((res) => {
          if (res.data.length === 0) {
            this.loading = false;
            return;
          }
          this.form.purDeliveryoid = res.data[0].purDeliveryFk;
          this.getData(
            Object.assign({
              rows: this.page.pageSize,
              start: this.page.currentPage,
              purDeliveryoid: this.form.purDeliveryoid,
            })
          ).then((res) => {
            let records = res.data;
            this.page.total = records.total;
            this.crud = records.records;

            if (this.crud === undefined || this.crud.length === 0) {
              this.loading = false;
              return;
            }
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              if (index === this.crud.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.lsdjmx")) {
        getIncoming({
          rows: 10,
          start: 1,
        }).then((res) => {
          if (res.data.records.length === 0) {
            this.loading = false;
          }
          for (var key in this.form) {
            if (this.form[key] === "") {
              delete this.form[key];
            }
          }
          this.getData(
            Object.assign(this.form, {
              salIncomingyarnFk: res.data.records[0].salIncomingyarnoid,
              rows: this.page.pageSize,
              start: this.page.currentPage,
            })
          ).then((Res) => {
            let records = Res.data;
            this.page.total = records.total;
            this.crud = records.records;
            if (this.crud.length === 0) {
              this.loading = false;
            }
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              if (index === this.crud.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzlpdj")) {
        getEmbryogenesis({
          rows: 10,
          start: 1,
        }).then((res) => {
          if (res.data.records.length === 0) {
            this.loading = false;
          }
          for (var key in this.form) {
            if (this.form[key] === "") {
              delete this.form[key];
            }
          }
          this.getData(
            Object.assign(this.form, {
              salEmbryogenesisFk: res.data.records[0].salEmbryogenesisoid,
              rows: this.page.pageSize,
              start: this.page.currentPage,
            })
          ).then((Res) => {
            let records = Res.data;
            this.page.total = records.total;
            this.crud = records.records;
            if (this.crud.length === 0) {
              this.loading = false;
            }
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              if (index === this.crud.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzlyldj")) {
        getChemical({
          rows: 10,
          start: 1,
        }).then((res) => {
          if (res.data.records.length === 0) {
            this.loading = false;
          }
          for (var key in this.form) {
            if (this.form[key] === "") {
              delete this.form[key];
            }
          }
          this.getData(
            Object.assign(this.form, {
              chemicalIncomaccFk: res.data.records[0].chemicalIncomaccoid,
              rows: this.page.pageSize,
              start: this.page.currentPage,
            })
          ).then((Res) => {
            let records = Res.data;
            this.page.total = records.total;
            this.crud = records.records;
            if (this.crud.length === 0) {
              this.loading = false;
            }
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              item.bcMatname = item.basChemicalmatFk;
              if (index === this.crud.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzlyldj1")) {
        getPigment({
          rows: 10,
          start: 1,
        }).then((res) => {
          if (res.data.records.length === 0) {
            this.loading = false;
          }
          for (var key in this.form) {
            if (this.form[key] === "") {
              delete this.form[key];
            }
          }
          this.getData(
            Object.assign(this.form, {
              pigmentIncomaccFk: res.data.records[0].pigmentIncomaccoid,
              rows: this.page.pageSize,
              start: this.page.currentPage,
            })
          ).then((Res) => {
            let records = Res.data;
            this.page.total = records.total;
            this.crud = records.records;
            if (this.crud.length === 0) {
              this.loading = false;
            }
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              item.cnnamelong = item.basPigmentnewFk;
              if (index === this.crud.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzlfl")) {
        getSalIncomaccDtl({
          rows: 10,
          start: 1,
        }).then((res) => {
          if (res.data.records.length === 0) {
            this.loading = false;
          }
          for (var key in this.form) {
            if (this.form[key] === "") {
              delete this.form[key];
            }
          }
          this.getData(
            Object.assign(this.form, {
              salIncomaccFk: res.data.records[0].salIncomaccoid,
              rows: this.page.pageSize,
              start: this.page.currentPage,
            })
          ).then((Res) => {
            let records = Res.data;
            this.page.total = records.total;
            this.crud = records.records;
            if (this.crud.length === 0) {
              this.loading = false;
            }
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              item.chinName = item.basProductivesuppliesFk;
              if (index === this.crud.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          });
        });
      } else {
        this.getData(
          Object.assign(this.form, this.choiceQ, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        ).then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;

          if (this.crud === undefined || this.crud.length === 0) {
            if (
              this.choiceTle === this.$t("choicDlg.xzpbrc") ||
              this.choiceTle === this.$t("choicDlg.xzwjxzrc") ||
              this.choiceTle === this.$t("choicDlg.xzflrc")
            ) {
              // this.$set(this.choiceC.column[2], "hide", true);
            }
            this.loading = false;
            return;
          }
          this.crud.forEach((item, index) => {
            if (this.choiceTle === this.$t("choicDlg.xzsxrc")) {
              item.yarnsName = item.yarnsId;
            }
            if (this.choiceTle === this.$t("choicDlg.xzhw")) {
              item.warehouseName = item.warehouseId;
            }
            if (this.choiceTle === this.$t("choicDlg.pbdd")) {
              item.poNo = item.salPoFk;
            }
            if (
              this.choiceTle === this.$t("choicDlg.xzlyl") ||
              this.choiceTle === this.$t("choicDlg.lpdj") ||
              this.choiceTle === this.$t("choicDlg.xzlyl1")
            ) {
              item.custName = item.custCode;
            }

            if (this.choiceTle === this.$t("choicDlg.xzhyjhmx")) {
              item.fabId = item.fabName;
            }
            if (this.choiceTle === this.$t("choicDlg.lfldj")) {
              item.custName = item.custNo;
            }
            if (this.choiceTle === this.$t("choicDlg.pbbm")) {
              // item.clothNo = item.basEmbryoidclothFk;
              item.clothName = item.basEmbryoidclothFk;
            }
            if (this.choiceTle === this.$t("choicDlg.xzkh")) {
              item.custId = item.custCode;
            }
            if (this.choiceTle === this.$t("choicDlg.sxcgd")) {
              item.purNo = item.poNo;
            }
            if (this.choiceTle === this.$t("iaoMng.xztstzd")) {
              item.yarnsName = item.yarnsId;
            }
            if (
              this.choiceTle === this.$t("choicDlg.xzwjxzrc") ||
              this.choiceTle === this.$t("choicDlg.xzflrc")
            ) {
              item.materialName = item.materialNum;
              item.model = item.materialNum;
              item.itemspec = item.materialNum;
              if (item.whseAccessoriesInFk) {
                item.whseAccessoriesInFk =
                  item.whseAccessoriesInFk.toLocaleLowerCase();
              }
            }
            if (this.choiceTle === this.$t("choicDlg.xzsx")) {
              if (item.functions != null && item.functions != "") {
                let data = [];
                item.functions.split(";").forEach((items, index) => {
                  data[index] = items;
                });
                item.functions = data;
              }
            }
            if (this.choiceTle === this.$t("choicDlg.xzpbph")) {
              item.prodNo = item.whseCalicoinDtlaFk;
            }
            if (this.choiceTle === this.$t("choicDlg.shdmx")) {
              item.materialNum = item.purSinglepoDtlFk;
              item.chinName = item.purSinglepoDtlFk;
            }
            this.$nextTick(() => {
              if (
                this.choiceTle === this.$t("choicDlg.xzpbrc") ||
                this.choiceTle === this.$t("choicDlg.xzwjxzrc") ||
                this.choiceTle === this.$t("choicDlg.xzflrc")
              ) {
                // this.$set(this.choiceC.column[2], "hide", true);
              }
            });
            item.index = index + 1;
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
        });
      }
    },
    // 选择
    choice() {
      this.$emit(
        "choiceData",
        this.chooseData.length > 0 ? this.chooseData : this.pick
      );
    },
    closeBefore(done) {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    close() {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    handleRowDBLClick(val) {
      // this.pick = val;
      // this.choice();
    },
    cellClick(val) {
      this.pick = val;
    },
    handleClick(tab) {
      if (this.choiceTle === this.$t("choicDlg.wj")) {
        if (this.tab === "tab1") {
          this.choiceC = BasHardwarearticlesC(this);
          this.choiceF = BasHardwarearticlesF(this);
          this.getData = getBasHardwarearticles;
        } else {
          this.choiceC = BasAdsuppliesarticlesC(this);
          this.choiceF = BasAdsuppliesarticlesF(this);
          this.getData = getBasAdsuppliesarticles;
        }
        this.query();
      } else {
        return;
      }
    },
    selectionChange(val) {
      this.chooseData = val;
    },
  },
  created() {
    switch (this.choiceTle) {
      case this.$t("choicDlg.xzsxrc"):
        this.choiceC = YarninC(this);
        this.choiceF = YarninF(this);
        this.getData = getYarnin;
        break;
      case this.$t("iaoMng.xzzld"):
        this.choiceC = instructDtlC(this);
        this.choiceF = instructDtlF(this);
        this.getData = getInstructDtl;
        break;
      case this.$t("iaoMng.xzlsdj"):
        this.choiceC = IncomingYarnC(this);
        this.choiceF = IncomingYarnF(this);
        this.getData = getIncoming;
        break;
      case this.$t("choicDlg.lsdjmx"):
        this.choiceC = IncomingYarnDtlC(this);
        this.choiceF = IncomingYarnDtlF(this);
        this.getData = getIncomingDtl;
        break;
      case this.$t("choicDlg.lpdj"):
        this.choiceC = EmbryogenesisC(this);
        this.choiceF = EmbryogenesisF(this);
        this.getData = getEmbryogenesis;
        break;
      case this.$t("choicDlg.xzlpdj"):
        this.choiceC = EmbryogenesisDtlC(this);
        this.choiceF = EmbryogenesisDtlF(this);
        this.getData = getEmbryogenesisDtl;
        break;

      case this.$t("choicDlg.xzlyl"):
        this.choiceC = chemicalC(this);
        this.choiceF = chemicalF(this);
        this.getData = getChemical;
        break;
      case this.$t("choicDlg.xzlyldj"):
        this.choiceC = chemicalDtlC(this);
        this.choiceF = chemicalDtlF(this);
        this.getData = getChemicalDtl;
        break;
      case this.$t("choicDlg.xzlyl1"):
        this.choiceC = pigmentC(this);
        this.choiceF = pigmentF(this);
        this.getData = getPigment;
        break;
      case this.$t("choicDlg.xzlyldj1"):
        this.choiceC = pigmentDtlC(this);
        this.choiceF = pigmentDtlF(this);
        this.getData = getPigmentDtl;
        break;
      case this.$t("choicDlg.lfldj"):
        this.choiceC = SalIncomaccC(this);
        this.choiceF = SalIncomaccF(this);
        this.getData = getSalIncomacc;
        break;
      case this.$t("choicDlg.xzlfl"):
        this.choiceC = SalIncomaccDtlC(this);
        this.choiceF = SalIncomaccDtlF(this);
        this.getData = getSalIncomaccDtl;
        break;
      case this.$t("choicDlg.xzsx"): //"選擇紗線系統編號":
        this.choiceC = BasYarnsDataC(this);
        this.choiceF = BasYarnsDataF(this);
        this.getData = getBasYarnsData;
        break;
      case this.$t("choicDlg.pbbm"):
        this.choiceC = BasCalicoC(this);
        this.choiceF = BasCalicoF(this);
        this.getData = getBasCalico;
        break;
      case this.$t("choicDlg.xzhgyl"):
        this.choiceC = BasChemicalmatC(this);
        this.choiceF = BasChemicalmatF(this);
        this.getData = getBasChemicalmat;
        break;
      case this.$t("choicDlg.wj"):
        this.choiceC = BasHardwarearticlesC(this);
        this.choiceF = BasHardwarearticlesF(this);
        this.getData = getBasHardwarearticles;
        break;
      case this.$t("choicDlg.xz"): //"行政":
        this.choiceC = BasAdsuppliesarticlesC(this);
        this.choiceF = BasAdsuppliesarticlesF(this);
        this.getData = getBasAdsuppliesarticles;
        break;
      case this.$t("choicDlg.xzscfl"):
        this.choiceC = ProductivesuppliesC(this);
        this.choiceF = ProductivesuppliesF(this);
        this.getData = getProductivesupplies;
        break;
      case this.$t("choicDlg.xzpbcgd"):
        this.choiceC = PurCalicoPoC(this);
        this.choiceF = PurCalicoPoF(this);
        this.getData = getPurCalicoPo;
        break;
      case this.$t("choicDlg.rhlsgcgd"):
        this.choiceC = PurChemicalpoC(this);
        this.choiceF = PurChemicalpoF(this);
        this.getData = getPurChemicalpo;
        break;
      case this.$t("choicDlg.xzylcgd"):
        this.choiceC = PurChemicalpoC(this);
        this.choiceF = PurChemicalpoF(this);
        this.getData = getPurChemicalpo2;
        break;
      case this.$t("choicDlg.scflcgd"):
        this.choiceC = PurMaterialspoC(this);
        this.choiceF = PurMaterialspoF(this);
        this.getData = getPurMaterialspo;
        break;
      case this.$t("choicDlg.wjcgd"):
        this.choiceC = PurHardwarepoC(this);
        this.choiceF = PurHardwarepoF(this);
        this.getData = getPurHardwarepo;
        break;
      case this.$t("choicDlg.xzpbhwb"):
        this.choiceC = WhseCalicoPackBarCodeC(this);
        this.choiceF = WhseCalicoPackBarCodeF(this);
        this.getData = getWhseCalicoPackBarCode;
        this.choiceF.column[1].display = true;
        this.choiceF.column[2].display = false;
        this.choiceC.column[2].hide = true;
        this.choiceC.column[3].hide = false;
        this.choiceC.column[7].label = this.$t("whseField.mkh");
        break;
      case this.$t("choicDlg.xzcpbhwb"):
        this.choiceC = WhseCalicoPackBarCodeC(this);
        this.choiceF = WhseCalicoPackBarCodeF(this);
        this.getData = getWhseFinishedclothpackBarcode;
        this.choiceF.column[1].display = false;
        this.choiceF.column[2].display = true;
        this.choiceC.column[3].hide = true;
        this.choiceC.column[2].hide = false;
        this.choiceC.column[7].label = "布票号";
        break;
      case this.$t("choicDlg.pbdd"):
        this.choiceC = SalPoDtlaListC(this);
        this.choiceF = SalPoDtlaListF(this);
        this.getData = getSalPoDtlaList;
        break;
      case this.$t("choicDlg.xzshd"):
        this.choiceC = PurDeliveryC(this);
        this.choiceF = PurDeliveryF(this);
        this.getData = getPurDelivery;
        break;
      case this.$t("choicDlg.sxcgd"):
        this.choiceC = PurYarnsPoC(this);
        this.choiceF = PurYarnsPoF(this);
        this.getData = getPurYarnsPo;
        break;

      case this.$t("choicDlg.xzkh"):
        this.choiceC = BasCustomerC(this);
        this.choiceF = BasCustomerF(this);
        this.getData = getBasCustomer;
        break;
      case this.$t("iaoMng.xztstzd"):
        this.choiceC = WhseRetratyarnC(this);
        this.choiceF = WhseRetratyarnF(this);
        this.getData = getWhseRetratyarn;
        break;
      case this.$t("choicDlg.xzwfylpl"):
        this.choiceC = WhseChemicalPlanC(this);
        this.choiceF = WhseChemicalPlanF(this);
        this.getData = getWhseChemicalPlan;
        break;
      case this.$t("choicDlg.xzwfflpl"):
        this.choiceC = WhseRetmaterialsPlanC(this);
        this.choiceF = WhseRetmaterialsPlanF(this);
        this.getData = getWhseRetmaterialsPlan;
        break;
      case this.$t("choicDlg.xzwfpbpl"):
        this.choiceC = WhseMaterialoutPlanC(this);
        this.choiceF = WhseMaterialoutPlanF(this);
        this.getData = getWhseMaterialoutPlan;
        break;
      case this.$t("choicDlg.xzbcpbpl"):
        this.choiceC = WhseMaterialPlanC(this);
        this.choiceF = WhseMaterialPlanF(this);
        this.getData = getWhseMaterialPlan;
        break;
      case this.$t("choicDlg.sxwc"):
        this.choiceC = WhseRetyarninoutPlanC(this);
        this.choiceF = WhseRetyarninoutPlanF(this);
        this.getData = getWhseRetyarninoutPlan;
        break;
      case this.$t("choicDlg.xzbcsxpl"):
        this.choiceC = WhseRetyarninPlanC(this);
        this.choiceF = WhseRetyarninPlanF(this);
        this.getData = getWhseRetyarninPlan;
        break;
      case this.$t("choicDlg.xzhyjh"):
        this.choiceC = shipPlanC(this);
        this.choiceF = shipPlanF(this);
        this.getData = getshipPlan;
        break;
      case this.$t("choicDlg.xzhyjhmx"):
        this.choiceC = shipPlanDtlC(this);
        this.choiceF = shipPlanDtlF(this);
        this.getData = getshipPlanDtl;
        break;
      case this.$t("choicDlg.xzddpbzl"):
        this.choiceC = OrderPbC(this);
        this.choiceF = OrderPbF(this);
        this.getData = getOrderPb;
        break;
      case this.$t("choicDlg.xzpbph"):
        this.choiceC = PbDltbC(this);
        this.choiceF = PbDltbF(this);
        this.getData = getPbDltb;
        break;
      case this.$t("choicDlg.xzpbrc"):
        this.choiceC = PbDetaliC(this);
        this.choiceF = PbDetaliF(this);
        this.getData = getPbDetali;
        break;
      case this.$t("choicDlg.xzwjxzrc"):
        this.choiceC = calicoinDtlaC(this);
        this.choiceF = calicoinDtlaF(this);
        this.getData = getCalicoinDtla;
        break;
      case this.$t("choicDlg.xzflrc"):
        this.choiceC = scflDtlaC(this);
        this.choiceF = calicoinDtlaF(this);
        this.getData = getScflDtla;
        break;
      case this.$t("choicDlg.xzlyr"):
        this.choiceC = PersonC(this);
        this.choiceF = PersonF(this);
        this.getData = getPersonList;
        break;
      case this.$t("choicDlg.shdmx"):
        this.choiceC = PurDeliveryDC(this);
        this.choiceF = PurDeliveryDF(this);
        this.getData = getPurDeliveryDetail;
        break;
      case this.$t("choicDlg.xzsgd"):
        this.choiceC = SingleC(this);
        this.choiceF = SingleF(this);
        this.getData = getSingle;
        break;
      case this.$t("choicDlg.xzsgdzl"):
        this.choiceC = SingleDtlC(this);
        this.choiceF = SingleDtlF(this);
        this.getData = getSingleDtl;
        break;
      case this.$t("choicDlg.xzsqlyd"):
        this.choiceC = purApplicationC(this);
        this.choiceF = purApplicationF(this);
        this.getData = getPurApplication;
        // if (this.choiceQ.type == "8") {
        //   this.choiceF.column[0].dicData =
        //     this.choiceF.column[0].dicData.filter((val) => {
        //       return val.label === "顏料";
        //     });
        // } else if (this.choiceQ.type == "1") {
        //   this.choiceF.column[0].dicData =
        //     this.choiceF.column[0].dicData.filter((val) => {
        //       return val.label === "五金用品";
        //     });
        // } else if (this.choiceQ.type == "2") {
        //   this.choiceF.column[0].dicData =
        //     this.choiceF.column[0].dicData.filter((val) => {
        //       return val.label === "行政";
        //     });
        // } else if (this.choiceQ.type == "5") {
        //   this.choiceF.column[0].dicData =
        //     this.choiceF.column[0].dicData.filter((val) => {
        //       return val.label === "化工原料";
        //     });
        // }

        this.form.applyCategory = this.choiceQ.type;
        break;
      case this.$t("choicDlg.xzsqlydmx"):
        this.choiceC = purApplicationDtlC(this);
        this.choiceF = purApplicationDtlF(this);
        this.getData = getPurApplicationDtl;
        break;
      case this.$t("choicDlg.xzshxx"):
        this.choiceC = SalColorC(this);
        this.choiceF = SalColorF(this);
        this.getData = getSalColor;
        break;
      case this.$t("choicDlg.xzshzl"):
        this.choiceC = TapcolorC(this);
        this.choiceF = TapcolorF(this);
        this.getData = getTapcolor;
        break;
      case this.$t("choicDlg.xzhw"):
        this.choiceC = locC(this);
        this.choiceF = locF(this);
        this.getData = getLoc;
        break;
      default:
        break;
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#choiceDlg
  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label
    font-size 16px
    height 30px
  .el-dialog__body
    padding 0 !important
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
  .el-dialog__header
    padding 0px
  .el-dialog__headerbtn
    top 5px
    color #000
    font-size 22px
    z-index 999
  .formBox
    margin-bottom 0px
  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu
    min-height 0 !important
    height 0 !important
  .el-tabs__item
    font-size 18px
    line-height 30px
    height 30px
  .el-tag--mini
    display none
  .el-dialog.is-fullscreen
    overflow hidden !important
</style>