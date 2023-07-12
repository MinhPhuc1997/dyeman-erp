<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-08 11:18:33
 * @Description: 
-->
<template>
  <div id="proOutWeaveJob">
    <view-container :title="(isAdd ? $t('public.add') : $t('public.update')) + $t('weaveJob.tabs1')" :element-loading-text="$t('public.loading')"
      v-loading="wLoading">
      <div class="btnList">
        <template v-if="isOutFactory">
          <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
            <el-button type="success" @click="save" title="save" v-if="canSave">{{
            $t("public.save")
            }}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Yarn detail" placement="top-start">
            <el-button type="primary" @click="checkYarn" :disabled="!form.weaveJobId" v-if="canSave">{{$t("weaveJob.useYarn")}}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="After washing" placement="top-start">
            <el-button type="primary" @click="checkCalico" :disabled="!form.weaveJobId" v-if="canSave">{{$t("weaveJob.afterWashing")}}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="in" placement="top-start">
            <el-button type="primary" @click="print" :disabled="!form.weaveJobId" v-if="canSave">{{$t("public.print")}}</el-button>
          </el-tooltip>
          <el-button type="danger" @click="handleEditColorDef">{{$t("weaveJob.editColorDef")}}</el-button>
        </template>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close">{{
          $t("public.close")
          }}</el-button>
        </el-tooltip>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot="operatProcess">
            <el-button type="primary" @click="operatProcessClick">{{$t("weaveJob.operatProcess")}}</el-button>
          </template>
        </avue-form>
        <div title="">
          <div style="margin:10px;margin-left:17px">
            <el-radio-group v-model="machineType" @change="change">
              <el-radio v-model="machineType" :label="1" size="medium">{{$t("weaveJob.machineType1")}}</el-radio>
              <el-radio v-model="machineType" :label="2" size="medium">{{$t("weaveJob.machineType2")}}</el-radio>
            </el-radio-group>

            <span style="color: #409eff; font-size: 15px; margin-left: 20px"
              @click.stop="handleOpenMachineInfo">{{$t("weaveJob.tabs2")}}</span>

          </div>

          <div class="formBox" v-if="machineType == 1">
            <avue-form ref="formYJ" :option="formYJOp" v-model="form">
              <template slot="gramWeightUnit">
                <div>g/m²</div>
              </template>
              <template slot="operatProcess">
                <el-button type="primary" @click="operatProcessClick">{{$t("weaveJob.operatProcess")}}</el-button>
              </template>
            </avue-form>
          </div>
          <div v-if="machineType == 2">
            <MeaveEmbyroDtl :weaveJobId="form.weaveJobId" ref="meaveEmbyroDtlRef" :cansave="!this.form.weaveJobId"
              @close="meaEmbVisible = false" />
          </div>
        </div>
      </div>
    </view-container>
    <el-dialog :visible.sync="visible" fullscreen append-to-body id="viewDlg"
      :element-loading-text="$t('public.loading')" v-loading="dlgLoading" v-if="visible">
      <el-row>
        <el-col :span="24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
                <el-button @click="saveOther" type="success">{{ $t("public.save") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="add" type="primary">{{ $t("public.add") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="del" type="danger" :disabled="Object.keys(chooseData).length == 0">{{
                $t("public.del") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
                <el-button @click="visible = false" type="warning">{{
                $t("public.close")
                }}</el-button>
              </el-tooltip>
            </div>
            <div class="crudBox">
              <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                @current-row-change="cellClick"></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('public.printPreview')">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="gytDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('weaveJob.tabs4')">
        <technology v-if="gytDlg" :weave="form" @refresh="technologyRefresh" @close="gytDlg = false"></technology>
      </view-container>
    </el-dialog>
    <!-- 织胚明细 -->

    <div class="other-dtl-wrapper1">
      <span style="color: #409eff; font-size: 15px; margin-left: 20px" @click="handleOpenMachineInfo">{{$t('weaveJob.tabs2')}}</span>
    </div>

    <div class="other-dtl-wrapper">
      <span style="color: #409eff; font-size: 15px; margin-left: 20px" @click.stop="handleOpenWeaEmbDtl">{{$t('weaveJob.tabs3')}}</span>
      <span style="color: #409eff; font-size: 15px; margin-left: 20px" @click.stop="handleOpenMachineInfo">{{$t('weaveJob.tabs2')}}</span>
    </div>

    <el-dialog :visible.sync="meaEmbVisible" fullscreen append-to-body :close-on-click-modal="false"
      :close-on-press-escape="false">
      <MeaveEmbyroDtl :weaveJobId="form.weaveJobId" ref="meaveEmbyroDtlRef" @cansave="true"
        @close="meaEmbVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="machineInfoVisible" fullscreen append-to-body :close-on-click-modal="false"
      :close-on-press-escape="false">
      <MachineInfo :weaveJobId="form.weaveJobId" ref="machineInfoRef" @close="machineInfoVisible = false" />
    </el-dialog>

    <ColorDefine ref="colorDefineRef" :weaveJobId="form.weaveJobId" />
    <use-yarns ref="useYarns" :weaveJobInfo="form"></use-yarns>
  </div>
</template>
<script>

import choice from "@/components/proMng/index";
import useYarns from "../proOutWeaveJob/useYarns"
import {
  mainCrud,
  mainYJCrud,
  dlgCrud,
  yarnCrud,
  calicoCrud,
} from "./data";
import {
  add,
  update,
  addCalico,
  getCalico,
  updateCalico,
  delCalico,
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import preview from "./preview";
import technology from "../proWeaveJob/technology"
import MeaveEmbyroDtl from "./meaveEmbyroDtl.vue"
import MachineInfo from "./machineInfo.vue"
import ColorDefine from "../components/ColorDefine"
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    copyC: Boolean,
  },
  components: {
    preView: preview,
    choice: choice,
    technology,
    MeaveEmbyroDtl,
    MachineInfo,
    ColorDefine,
    useYarns
  },
  data() {
    return {
      wLoading: false,
      gytDlg: false,
      formOp: mainCrud(this),
      formYJOp: mainYJCrud(this),
      form: {
        loomType: 1
      },
      formYJ: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      yarnCrud: yarnCrud(this),
      group: [],
      pdfDlg: false,
      pdfUrl: "",
      canSave: true,
      machineType: 1,
      // 织胚明细 弹出窗状态
      meaEmbVisible: false,
      machineInfoVisible: false,
    };
  },
  watch: {},
  computed: {
    isOutFactory() {
      return !this.$store.getters.isOutFactory
    }
  },
  methods: {
    // 色系定义
    handleEditColorDef() {
      this.$refs.colorDefineRef.visible = true;
    },
    // 织胚明细DOM 移动
    meaveDomMove() {
      let meaveDtlBtnDom = document.querySelectorAll(".other-dtl-wrapper")[0];
      let formGroupWrapper = document.querySelectorAll("#proWeaveJob .avue-group__header")[0];
      formGroupWrapper.appendChild(meaveDtlBtnDom)
    },
    MoveElemntToHtml() {
      let button = document.querySelectorAll(".other-dtl-wrapper1")[0];
      let formGroupWrapper = document.querySelectorAll("#proWeaveJob .el-tab-pane")[0];
      formGroupWrapper.appendChild(button)
    },
    async change(val) {
      if (val == 2) {
        this.form.loomType = 2;
        if (!this.form.weaveJobId) return this.$tip.warning(this.$t("tipLabel.plsSaveWeaveData"));
        await this.$nextTick();
        this.$refs.meaveEmbyroDtlRef.getDataList();
      } else {
        this.form.loomType = 1;
      }
    },
    // 打开织胚明细界面
    async handleOpenWeaEmbDtl() {
      if (!this.form.weaveJobId) return this.$tip.warning(this.$t("tipLabel.plsSaveWeaveData"));
      this.meaEmbVisible = true;
      await this.$nextTick();
      this.$refs.meaveEmbyroDtlRef.getDataList();
    },
    // 打开机台维护界面
    async handleOpenMachineInfo() {
      if (!this.form.weaveJobId) return this.$tip.warning(this.$t("tipLabel.plsSaveWeaveData"));
      this.machineInfoVisible = true;
      await this.$nextTick();
      this.$refs.machineInfoRef.init();
    },
    async getData() {
      this.wLoading = true;
      if (this.isAdd) {
        baseCodeSupplyEx({ code: "proOutWeaveJob" }).then((res) => {
          if (this.copyC) {
            this.form = JSON.parse(JSON.stringify(this.detail));
            this.form.weaveJobCode = this.detail.weaveJobCode + "A";
          } else {
            this.form.weaveJobCode = "WG-" + res.data.data;
            this.form.calicoFabricRequire = "开幅";
            this.form.calicoShap = "1";
            this.form.weaveState = 0;
            this.form.breadthUnit = "INCH";
            this.form.gramWeightUnit = "G/M2";
            this.form.breadthAcceptUnit = "%";
            this.form.gmAcceptUnit = "%";
          }
          this.form.isWorkOut = 1;
          this.form.includeTaxe = false;
          this.form.creator = parent.userID;
          this.form.weaveJobId = "";
          this.form.auditState = 1;
          this.form.billDate = this.$getNowTime("datetime");
          this.form.startDate = this.$getNowTime("datetime");
        }).finally((_) => {
          this.wLoading = false;
        })
      } else {
        this.form = this.detail;
        this.machineType = this.detail.loomType;
        if (this.detail.loomType == 2) {
          await this.$nextTick();
          this.$refs.meaveEmbyroDtlRef.getDataList();
        }
        setTimeout(() => {
          if (this.form.weaveState == "1") {
            if (parent.userID === this.form.creator) {
              this.canSave = true;
            } else {
              this.canSave = false;
            }
          }
          if (this.form.creator != parent.userID) {
            this.formOp.column[this.formOp.column.length - 1].disabled = true;
          }
          // 控制操作
          if (this.$store.getters.isOutFactory) {
            this.formOp.column.forEach(cItem => {
              cItem.disabled = true;
            })
          }
          this.wLoading = false;
        }, 500);
      }
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proWeaveJob/prinEntityPdf?id=" +
        this.form.weaveJobId;
    },
    technologyRefresh(val) {
      this.form.pinColumn = val.pinColumn
      this.form.diskNum = val.diskNum
      this.form.syringeNum = val.syringeNum
      this.form.totalColumn = val.totalColumn
      this.form.needlePlaceType = val.needlePlaceType
      this.refresh = true
    },
    operatProcessClick() {
      if (!this.form.weaveJobId) {
        this.$tip.warning(this.$t("tipLabel.plsSaveWeaveData"))
        return
      }
      this.gytDlg = true
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            // this.form.amount = Number(this.form.amount).toFixed(2);
            for (let key in this.form) {
              if (this.form[key] == "undefined") {
                this.form[key] = "";
              }
            }
            this.form.outFactoryName = this.form.$outFactoryId;
            if (this.form.weaveJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              let params = this.form;
              update(params).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
              }).finally(() => {
                this.wLoading = false;
                this.$emit("refresh");
                done();
              })
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              let params = this.form;
              params.runType = 1;
              add(params).then((res) => {
                if (res.data.code == 200) {
                  baseCodeSupply({ code: "proOutWeaveJob" }).then((res) => { })
                  this.form.weaveJobId = res.data.data;
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(res.data.msg);
                }
              }).finally(() => {
                this.wLoading = false;
                this.$emit("refresh");
                done();
              })
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error(this.$t("weaveJob.saveTle3"));
          return;
        }
      });
    },
    query() {
      if (!this.form.weaveJobId) {
        this.crud = [];
        return;
      } else if (this.tabs == this.$t("weaveJob.afterWashing")) {
        this.func.get = getCalico;
        this.func.del = delCalico;
        this.func.add = addCalico;
        this.func.update = updateCalico;
      }
      this.loading = true;
      this.chooseData = {};
      this.func
        .get(
          {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            proWeaveJobFk: this.form.weaveJobId
          }
        )
        .then((res) => {
          this.crud = res.data.records;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          this.loading = false;
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == this.$t("weaveJob.afterWashing") && !this.crud[i].weight) {
          this.$tip.warning(this.$t("tipLabel.notWeightData"));
          return;
        }
      }
      this.dlgLoading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          data.list = [];
          data.alloc = [];
          data.loc = [];
          if (
            item.changedId ||
            item.useYarnId ||
            item.washedId ||
            item.strainId ||
            item.useId
          ) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proWeaveJobFk = this.form.weaveJobId;
            this.func.add(data).then((res) => {
              item.changedId = res.data.data;
              item.useYarnId = res.data.data;
              item.washedId = res.data.data;
              item.strainId = res.data.data;
              item.useId = res.data.data;
              resolve();
            });
          }
        });
      };
      let promiseArr = this.crud.map((item, i) => {
        return addDtla(item, i);
      });
      Promise.all(promiseArr).then((res) => {
        for (let i = 0; i < this.crud.length; i++) {
          if (i === this.crud.length - 1) {
            setTimeout(() => {
              this.dlgLoading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        }
      });
    },
    async checkYarn() {
      this.$refs.useYarns.visible = true;
      await this.$nextTick();
      this.$refs.useYarns.initData();
    },
    checkCalico() {
      this.tabs = this.$t("weaveJob.afterWashing");
      this.crudOp = calicoCrud(this);
      this.visible = true;
    },
    add() {
      if (this.tabs == this.$t("weaveJob.useYarn")) {
        this.choiceV = true;
        return;
      }
      this.crud.push({
        index: this.crud.length + 1,
        $cellEdit: true,
        signDate: this.$getNowTime("datetime"),
        changeBatchTime: this.$getNowTime("datetime"),
        sn: this.crud.length > 0 ? this.crud[this.crud.length - 1].sn + 1 : 1,
        userName: parent.userID,
        userId: this.$store.state.userOid,
        recordTime: this.$getNowTime("datetime"),
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
    },
    del() {
      if (
        !this.chooseData.changedId &&
        !this.chooseData.useYarnId &&
        !this.chooseData.washedId &&
        !this.chooseData.strainId &&
        !this.chooseData.useId
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm(this.$t("tipLabel.deleteConfirm"))
        .then(() => {
          this.func
            .del(
              this.tabs === "更改紗長"
                ? this.chooseData.changedId
                : this.tabs === this.$t("weaveJob.useYarn")
                  ? this.chooseData.useYarnId
                  : this.tabs === this.$t("weaveJob.afterWashing")
                    ? this.chooseData.washedId
                    : this.tabs === this.$t("weaveJob.tabs2") 
                      ? this.chooseData.useId
                      : this.chooseData.strainId
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.query();
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    async handleGramWeightChange() {
      await this.$nextTick();
      let { gramWeightValue, gwMaxValue, gwMinValue, gmAcceptUnit } = this.form;
      gramWeightValue && (this.form.gramWeight = gramWeightValue);
      if (!gramWeightValue || !gwMaxValue || !gwMinValue || gramWeightValue == 'undefined' || gwMaxValue == 'undefined' || gwMinValue == 'undefined') return;
      let gw = this.form.gramWeightValue;
      gwMaxValue == gwMinValue ?
        gw += `(±${gwMaxValue}${gmAcceptUnit || ''})` :
        gw += `(+${gwMaxValue}-${gwMinValue}${gmAcceptUnit || ''})`
      this.form.gramWeight = gw;
    },
    async handleBreathChange() {
      await this.$nextTick();
      let { breadthValue, breadthUpper, breadthLower, breadthAcceptUnit } = this.form;
      breadthValue && (this.form.breadth = breadthValue);
      if (!breadthValue || !breadthUpper || !breadthLower || breadthLower == 'undefined' || breadthValue == 'undefined' || breadthUpper == 'undefined') return;
      let breadth = this.form.breadthValue;
      breadthUpper == breadthLower ?
        breadth += `(±${breadthUpper}${breadthAcceptUnit || ''})` :
        breadth += `(+${breadthUpper}-${breadthLower}${breadthAcceptUnit || ''})`
      this.form.breadth = breadth;
    },
    cellClick(val) {
      this.chooseData = val;
    },
    choiceData(val) {
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      this.wLoading = true;
      if (this.tabs == this.$t("weaveJob.useYarn")) {
        val.forEach((item) => {
          this.crud.push({
            sn: this.crud.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            unit: item.weightUnit,
            $cellEdit: true,
          });
        });
      } else {
        this.form.custPoNo = val.custPoNo;
        this.form.salPoNo = val.poNo;
        this.form.productDate = val.poDate;
        this.form.custCode = val.custBrandId;
        this.form.colorName = val.custColorName;
        this.form.colorCode = val.custColorNo;
        this.form.custFabricCode = val.guestFabId;
        this.form.seasonCode = val.season;
        this.form.fiberComp = val.guestComponents;
        this.form.fabricDesc = val.fabName;
        this.form.otherRequire = val.finishingitem;
        // getBom({ bomId: val.bomId }).then((res) => {
        //   if (res.data.length) {
        //     getBomDtlb({ salNewbomFk: res.data[0].salNewbomoid }).then(
        //       (dtlb) => {
        //         if (dtlb.data.length) {
        //           getBomDtlbSpecs({
        //             salNewbomDtlbFk: val.salNewbomDtlbFk,
        //           }).then((dtlbSpecs) => {
        //             this.setSpecs(dtlbSpecs.data);
        //           });
        //         } else {
        //           getBomDtlaSpecs({
        //             salNewbomDtlaFk: val.salNewbomDtlaFk,
        //           }).then((dtlaSpecs) => {
        //             this.setSpecs(dtlaSpecs.data);
        //           });
        //         }
        //       }
        //     );
        //   } else {
        //     this.wLoading = false;
        //   }
        // });
      }
      this.wLoading = false;
      this.choiceV = false;
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
  },
  created() { },
  mounted() {
    //this.MoveElemntToHtml();
    // this.meaveDomMove();
    this.getData();
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#proOutWeaveJob
  .avue-group__header
    height 15px
    line-height 15px
    margin-bottom 10px
  .formBox
    height 100vh !important
  .el-input-number__decrease, .el-input-number__increase
    display none
  .el-input-number .el-input__inner
    text-align left !important
  .el-input-number.is-controls-right .el-input__inner
    padding-left 5px !important
#colorMng_Dlg
  .is-fullscreen
    overflow hidden !important
  .el-dialog__header
    padding 0 !important
  .el-dialog__headerbtn
    top 3px
    font-size 18px
    font-weight bold
    z-index 9
  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-tag--mini
    height 24px
    padding 0 5px
    line-height 24px
    font-size 14px
  .el-select .el-tag__close.el-icon-close
    right -5px
    height 18px
    width 18px
    line-height 18px
  .avue-form .el-input--mini input
    height 35px !important
    line-height 35px
</style>