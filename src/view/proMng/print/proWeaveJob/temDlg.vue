<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-13 16:19:44
 * @Description:
-->
<template>
  <div id="proWeaveJob">
    <view-container :title="(isAdd ? $t('public.add') : $t('public.update')) +  $t('weaveJob.title1')"
                    :element-loading-text="$t('public.loading')"
                    v-loading="wLoading">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="save" title="save" v-if="canSave" :disabled="form.weaveState == 2">{{
              $t("public.save")
            }}
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Yarn detail" placement="top-start">
          <el-button type="primary" @click="checkYarn" :disabled="!form.weaveJobId " v-if="canSave">
            {{ $t('weaveJob.useYarn') }}
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="After washing" placement="top-start">
          <el-button type="primary" @click="checkCalico" :disabled="!form.weaveJobId" v-if="canSave">
            {{ $t('weaveJob.afterWashing') }}
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="in" placement="top-start">
          <el-button type="primary" @click="print" :disabled="!form.weaveJobId || form.auditState === 0" v-if="canSave">
            {{ $t("public.print") }}
          </el-button>
        </el-tooltip>
        <el-button type="primary" @click="auditHandle(form.auditState ? 0 : 1)" v-if="audit">{{
            form.auditState ? $t('public.unaudit')
              : $t('public.audit')
          }}
        </el-button>
        <el-button type="danger" @click="handleEditColorDef">{{ $t("weaveJob.editColorDef") }}</el-button>
        <el-button type="primary" :disabled="!form.weaveJobId"
                   @click="choiceTle = $t('choiceTem.weaveJobCode'), choiceV = true, choiceQ.sortF = 'weaveJobCode'">
          {{ $t("dye.copyProcess") }}
        </el-button>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close"> {{ $t("public.close") }}</el-button>
        </el-tooltip>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot="gramWeightUnit">
            <div>g/m²</div>
          </template>
          <template slot="operatProcess">
            <el-button type="primary" @click="operatProcessClick">{{ $t("weaveJob.operatProcess") }}</el-button>
          </template>

        </avue-form>
        <weave-dtl ref="weaveDtlRef" v-model="form.amount" :creator="form.creator" :splitW="splitW" :weaveData="detail" />
      </div>
    </view-container>

    <el-dialog :visible.sync="visible" fullscreen append-to-body id="viewDlg"
               :element-loading-text="$t('public.loading')" v-loading="dlgLoading" v-if="visible">
      <el-row>
        <el-col :span="24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button @click="check" type="success" v-if="tabs == '更改紗長'">{{ $t("public.choose") }}
              </el-button>
              <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
                <el-button @click="saveOther" type="success">{{ $t("public.save") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="add" type="primary">{{ $t("public.add") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="del" type="danger">{{ $t("public.del") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
                <el-button @click="visible = false" type="warning">{{
                    $t("public.close")
                  }}
                </el-button>
              </el-tooltip>
            </div>
            <div class="formBox">
              <avue-form v-if="tabs == '選擇訂單'" ref="dlgform" :option="dlgFormOp" v-model="dlgForm"></avue-form>
            </div>
            <div class="crudBox">
              <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                         @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('public.printPreview')">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 5rem)" :src="pdfUrl"/>
      </view-container>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="gytDlg" fullscreen width="100%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('weaveJob.tabs4')">
        <technology ref="technology" v-if="gytDlg" :weave="form" @refresh="technologyRefresh" @close="gytDlg = false">
        </technology>
      </view-container>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
            @close="choiceV = false" v-if="choiceV"></choice>


    <div class="other-dtl-wrapper">
      <span style="color: #409eff; font-size: .9375rem; margin-left: 1.25rem"
            @click.stop="handleOpenWeaEmbDtl">{{ $t('weaveJob.tabs3') }}</span>
    </div>
    <el-dialog :visible.sync="meaEmbVisible" fullscreen append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false">
      <MeaveEmbyroDtl :weaveJobId="form.weaveJobId" ref="meaveEmbyroDtlRef" @close="meaEmbVisible = false"/>
    </el-dialog>
    <el-dialog :visible.sync="yarnTestVisible" append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false">
      <YarnTest ref="yarnTestRef"/>
    </el-dialog>
    <ColorDefine ref="colorDefineRef" :weaveJobId="form.weaveJobId"/>
    <use-yarns ref="useYarns" :weaveJobInfo="form" :job-type="jobType"></use-yarns>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import technology from "./technology"
import WeaveDtl from "./weaveDtl.vue"
import YarnTest from "./yarnTest.vue"
import ColorDefine from "../components/ColorDefine"
import useYarns from "./useYarns"
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  yarnCrud,
  calicoCrud,
  strainCrud,
} from "./data";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getBomFa,
  getLong,
  addLong,
  updateLong,
  delLong,
  getYarn,
  addYarn,
  updateYarn,
  delYarn,
  getGroup,
  addGroup,
  updateGroup,
  delGroup,
  addCalico,
  getCalico,
  updateCalico,
  delCalico,
  addStrain,
  getStrain,
  updateStrain,
  delStrain,
  getMachine,
  addMachine,
  delMachine,
  updateMachine,
  getNoteSum,
  get,
  addProEquipmentSchedule,
  fetchEquipmentInfo,
  saveFlatknitByUnCreate,
  fetchYarnOrderNosByWeaveCode,
  fetchAmount2Weaved
} from "./api";
import {baseCodeSupplyEx, baseCodeSupply} from "@/api/index";
import preview from "./preview";
import v1 from "uuid/v1"
import MeaveEmbyroDtl from "./meaveEmbyroDtl.vue"
import {axiosGet} from "../../../im/Wk/cc/actionCloth/api";
import {CheckPermissonDisabled} from "../../../../utils/tools";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    copyC: Boolean,
    splitW: Boolean,
    audit: Boolean,
    isExtract: Boolean,
    extractRows: Array,
    jobType: String
  },
  components: {
    preView: preview,
    choice: choice,
    technology,
    "weave-dtl": WeaveDtl,
    MeaveEmbyroDtl,
    YarnTest,
    ColorDefine,
    useYarns
  },
  data() {
    return {
      permission:true,
      wLoading: false,
      formOp: mainCrud(this,false, false,this.jobType),
      form: {
        auditState: 0,
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: this.$t("choiceTem.yarnStock"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        fuzzy: "yarnsId,yarnsName,batchNo,locationCode",
        sortF: "yarnsId",
      },
      codecode: "",
      yarnCrud: yarnCrud(this),
      group: [],
      chooseDtlData: {},
      pdfDlg: false,
      pdfUrl: "",
      yarnlist: [],
      canSave: true,
      gytDlg: false,
      refresh: false,

      // 织胚明细 弹出窗状态
      meaEmbVisible: false,
      xiaLanDtls: [],

      // 试纱
      yarnTestVisible: false,
      // 色系定义
      colorNameMap: {},

    };
  },
  watch: {
    crud(n, o) {
      if (this.tabs == this.$t("weaveJob.tabs2")) {
        this.getMachineList();
      }
    },
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
    // 打开织胚明细界面
    async handleOpenWeaEmbDtl() {
      if (!this.form.weaveJobId) return this.$tip.warning(this.$t("tipLabel.plsSaveWeaveData"));
      this.meaEmbVisible = true;
      await this.$nextTick();
      // if (this.isExtract) {
      //   this.$refs.meaveEmbyroDtlRef.extractDtl(this.xiaLanDtls);
      // } else {
      this.$refs.meaveEmbyroDtlRef.getDataList();
      // }
    },
    async getData() {
      if (this.isAdd) {
        this.wLoading = true;
        if (this.splitW) {
          this.form = JSON.parse(JSON.stringify(this.detail));
          delete this.form.levelNo;
          delete this.form.pinColumn;
          delete this.form.totalColumn;
          delete this.form.diskNum;
          delete this.form.syringeNum;
          delete this.form.needlePlaceType;
          await getNoteSum({weaveJobCode: this.detail.weaveJobCode}).then((res) => {
            if (res.data) {
              // realWeight 毛重 clothWeight 净重
              if (this.detail.amount > res.data.clothWeight) {
                this.form.amount = Number(
                  (this.detail.amount - res.data.clothWeight).toFixed(0)
                );
              } else {
                this.form.amount = 0;
                this.canSave = false;
                this.$tip.warning(this.$t("weaveJob.warning1"));
              }
            } else {
              this.form.amount = Number((this.detail.amount / 2).toFixed(0));
            }
          });
          let tWeaveJobId = this.form.weaveJobId;
          this.form.weaveJobId = "";
          this.form.weaveState = 0;
          this.form.isWorkOut = 0;
          this.form.auditState = 0;
          this.form.creator = parent.userID || "ADMIN";
          await get({weaveJobCode: "!^%" + this.form.weaveJobCode}).then((res) => {
            this.form.weaveJobCode =
              this.detail.weaveJobCode +
              String.fromCharCode(res.data.records.length + 64);
          }).then(res => {
            this.getWeaveDtlData(tWeaveJobId);
            let params = {
              proWeaveJobFk: tWeaveJobId
            }
            this.$refs.colorDefineRef.getWeaveDcsByWeaveJobId(params)

          });
          // TODO 拆单时，获取织造数量的缺省值（合同数 - 原织单织造数量之和）23.03.13
          let weavedAmount = await fetchAmount2Weaved(this.detail.weaveJobCode).then(res => res.data.data || 0);
          Object.assign(this.form, {
            amount: (this.form.contractAmount || 0) - weavedAmount
          })

        } else {
          if (this.copyC) {
            this.form = JSON.parse(JSON.stringify(this.detail));
            // this.form.weaveJobCode = this.detail.weaveJobCode + "A";
            this.form.auditState = 0;
            delete this.form.levelNo;
            delete this.form.pinColumn;
            delete this.form.totalColumn;
            delete this.form.diskNum;
            delete this.form.syringeNum;
            delete this.form.needlePlaceType;
          } else {
            this.form.calicoFabricRequire = "开幅";
            this.form.calicoShap = "1";
            this.form.breadthUnit = "INCH";
            this.form.gramWeightUnit = "G/M2";
            this.form.breadthAcceptUnit = "%";
            this.form.gmAcceptUnit = "%";
          }
          this.form.weaveJobId = "";
          this.form.weaveState = 0;
          this.form.isWorkOut = 0;
          this.form.auditState = 0;
          this.form.creator = parent.userID;
          this.form.jobType = this.jobType;
          if (this.isExtract) {
            await this.analysisExtractData();
          }
          this.form.weaveJobCode = (this.jobType == "1" ? "TWG" : "WG") + '-' + '0000';
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      } else {
        this.wLoading = true;
        this.form = Object.assign({}, this.detail);
        for (let key in this.form) {
          if (this.form[key] == 0 && key !== 'breadthUpper' && key !== 'breadthLower' && key !== 'gwMaxValue' && key !== 'gwMinValue') delete this.form[key]
        }
        this.getMachineList();
        this.getWeaveDtlData(this.form.weaveJobId);
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
          this.wLoading = false;
        }, 500);
      }
    },
    // 获取织单明细数据
    getWeaveDtlData(weaveJobId) {
      this.$refs.weaveDtlRef.getWeaveDtlData(weaveJobId)
    },
    // 解析抽取到的数据
    async analysisExtractData() {

      let poNoMap = {};
      let contractAmount = 0;
      let inGreigeNum = 0;
      let xiaLanDtls = [];
      let colorNameEnum = {};

      let dtlCrudData = this.extractRows.map(item => {
        poNoMap[item.poNo] = true;
        if (item.type == 3) {
          xiaLanDtls.push({
            poNo: item.poNo,
            bomId: item.bomId,
            groupNo: item.colorCode
          })
        }
        // let weavePoQty = item.inGreigeNum // item.poQtyKg - item.weavePoQty
        contractAmount += item.poQtyKg;
        inGreigeNum += item.inGreigeNum;
        colorNameEnum[item.colorDept] = true
        return Object.assign({}, item, {
          poQty: item.poQtyKg,
          weavePoQty: item.inGreigeNum,
          poColorNo: item.colorNo,
          $cellEdit: true,
          proWeaveJobGstpodetailoid: v1(),
        });
      });

      // 颜色列表值存储
      this.colorNameMap = colorNameEnum;
      this.$refs.colorDefineRef.setSelColData(this.colorNameMap)

      let poNos = Object.keys(poNoMap).join(",");
      let itemData = this.extractRows[0];

      // 抽取订纱单号数据
      let yarnOrderNos = await fetchYarnOrderNosByWeaveCode(poNos).then(res => res.data.data);
      this.formOp = mainCrud(this, false, true,this.jobType);
      console.log(contractAmount, inGreigeNum)
      Object.assign(this.form, {
        salPoNo: poNos,
        marketOrder: poNos,
        custCode: itemData.custId,
        custFabricCode: itemData.fabCode,
        contractAmount: contractAmount,
        amount: inGreigeNum,
        fiberComp: itemData.fabConst,
        fabricDesc: itemData.fabName,
        gramWeightValue: itemData.fabWeight11,
        gwMaxValue: itemData.fabWeight13,
        gwMinValue: itemData.fabWeight14,
        breadthValue: itemData.fabWidth21, // 实际幅宽
        sideBreadth: itemData.fabWidth11, // 門幅（边至边）
        breadthUpper: itemData.fabWidth13,
        breadthLower: itemData.fabWidth14,
        horizonShrink: itemData.shrinkHorizontal,
        verticalShrink: itemData.shrinkVertical,
        creator: parent.userID || "ADMIN",
        yarnOrderNos: yarnOrderNos,
        productDate: itemData.exDate + " 00:00:00",
        // --9-30
        colorName: itemData.colorChnName || itemData.colorEngName,
        colorCode: itemData.colorNo,
      })
      this.$refs.weaveDtlRef.crudData = dtlCrudData;
      this.xiaLanDtls = xiaLanDtls;

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
        // this.$tip.warning("请先保存主表信息！")
        this.$tip.warning(this.$t("tipLabel.plsSaveWeaveData"))
        return
      }
      if (this.jobType==2 && CheckPermissonDisabled("proMng:proWeaveJob:editwave2")){
        return;
      }
      this.gytDlg = true
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proWeaveJob/prinEntityPdf?id=" +
        this.form.weaveJobId;
    },
    auditHandle(val) {
      this.$tip
        .cofirm(val ? this.$t("tipLabel.auditTle1") : this.$t("tipLabel.unauditTle1"))
        .then(() => {
          this.wLoading = true;
          this.form.auditState = val;
          for (let key in this.form) {
            if (this.form[key] == "undefined") {
              delete this.form[key];
            }
          }
          update(this.form).then((res) => {
            setTimeout(() => {
              this.$emit("refresh");
              this.$tip.success(this.$t("public.bccg"));
              this.wLoading = false;
            }, 200);
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    getMachineList() {
      getMachine({
        proWeaveJobFk: this.form.weaveJobId,
        star: 1,
        rows: 9,
      }).then((res) => {
        this.form.mathineCode = "";
        res.data.records.sort((a, b) => {
          return a.recordTime > b.recordTime ? -1 : 1;
        });
        res.data.records.forEach((item) => {
          this.form.mathineCode += item.mathineCode + " / ";
        });
      });
    },
    // 保存前检验
    beforeVaildSave() {
      // let weaveDtlDataLen = this.$refs.weaveDtlRef.crudData.length;
      // if (weaveDtlDataLen == 0 && this.isAdd) {
      //   this.$tip.warning("明细数据不能为空")
      //   return false;
      // }

      let dcsDataLen = this.$refs.colorDefineRef.curSelRows.length;
      if (dcsDataLen == 0 && this.isAdd) {
        // this.$tip.warning("适用染色色系定义不能为空")
        this.$tip.warning(this.$t("weaveJob.saveTle4"))
        return false;
      }
      return true;
    },
    // 保存
    async save() {
      if (this.wLoading) return;
      // 保存前检验
      this.wLoading = true;
      let validRes = await this.beforeVaildSave();
      if (!validRes) {
        this.wLoading = false;
        return;
      }
      ;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (this.form[key] == "undefined") {
                delete this.form[key];
              }
            }
            this.form.weaveJobCode = this.form.weaveJobCode.replace(/\s/g, "");
            isNaN(Number(this.form.breadthValue)) && (this.form.breadthValue = 0);
            isNaN(Number(this.form.gramWeightValue)) && (this.form.gramWeightValue = 0);
            if (this.form.weaveJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                  this.saveWeavaDtlData();
                } else {
                  this.$tip.error(this.$t("public.bcsb") + res.data.msg);
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              this.form.runType = 1;
              add(this.form).then(async (res) => {
                if (res.data.code == 200) {
                  this.form.weaveJobId = res.data.data;
                  let result = await axiosGet("/api/proWeaveJob/page", {weaveJobId: res.data.data})
                  this.form = result.data.records[0]
                  if (this.splitW) {
                    this.detail.amount = this.detail.amount - this.form.amount;
                   // Tạm thời tắt tính năng update amount
                    update(this.detail).then((res) => {
                      this.$tip.success(this.$t("public.bccg"));
                    });
                    getYarn({
                      rows: 20,
                      start: 1,
                      proWeaveJobFk: this.detail.weaveJobId,
                    }).then((yarn) => {
                      if (yarn.data.records.length) {
                        yarn.data.records.forEach((item) => {
                            item.proWeaveJobFk = this.form.weaveJobId;
                            addYarn(item).then();
                          }
                        );
                      }
                      this.$tip.success(this.$t("public.bccg"));
                    });
                    this.saveWeavaDtlData();
                  } else {
                    this.saveWeavaDtlData();
                    this.$tip.success(this.$t("public.bccg"));
                    this.refresh = true;
                  }
                } else {
                  this.$tip.error(this.$t("public.bcsb" + res.data.msg));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  done();
                }, 200);
              });
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.warning(this.$t("weaveJob.saveTle3"));
          return;
        }
      });
    },
    async handleGramWeightChange() {
      await this.$nextTick();
      let {gramWeightValue, gwMaxValue, gwMinValue, gmAcceptUnit} = this.form;
      gramWeightValue && (this.form.gramWeight = gramWeightValue);
      if (!gramWeightValue || gramWeightValue == 'undefined' || gwMaxValue == 'undefined' || gwMinValue == 'undefined') return;
      let gw = this.form.gramWeightValue;
      gwMaxValue == gwMinValue ?
        gw += `(±${gwMaxValue}${gmAcceptUnit || ''})` :
        gw += `(+${gwMaxValue}-${gwMinValue}${gmAcceptUnit || ''})`
      this.form.gramWeight = gw;
    },
    async handleBreathChange() {
      await this.$nextTick();
      let {breadthValue, breadthUpper, breadthLower, breadthAcceptUnit} = this.form;
      breadthValue && (this.form.breadth = breadthValue);
      if (!breadthValue || breadthLower == 'undefined' || breadthValue == 'undefined' || breadthUpper == 'undefined') return;
      let breadth = this.form.breadthValue;
      breadthUpper == breadthLower ?
        breadth += `(±${breadthUpper}${breadthAcceptUnit || ''})` :
        breadth += `(+${breadthUpper}-${breadthLower}${breadthAcceptUnit || ''})`
      this.form.breadth = breadth;
    },
    // 保存织单明细
    saveWeavaDtlData() {
      if (this.$refs.weaveDtlRef.crudData.length > 0) {
        this.$refs.weaveDtlRef.saveWeaveDltData(this.form.weaveJobId, this.splitW);
      }

      // 保存色系定义数据
      this.$refs.colorDefineRef.setSelColData(this.colorNameMap);
      if (this.$refs.colorDefineRef.curSelRows.length > 0 && this.isAdd) {
        this.$refs.colorDefineRef.handleSave(this.form.weaveJobId, this.splitW);
      }

      if (this.isExtract) {
        saveFlatknitByUnCreate({
          weaveJobId: this.form.weaveJobId,
          data: this.xiaLanDtls
        })
      }
    },
    query() {
      this.loading = true;
      this.crud = [];
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (!this.form.weaveJobId) {
        this.crud = [];
        this.loading = false;
        return;
      } else if (this.tabs == this.$t("weaveJob.tabs2")) {
        this.func.get = getMachine;
        this.func.del = delMachine;
        this.func.add = addMachine;
        this.func.update = updateMachine;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      } else if (this.tabs == "更改紗長") {
        this.func.get = getLong;
        this.func.del = delLong;
        this.func.add = addLong;
        this.func.update = updateLong;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      } else if (this.tabs == this.$t("weaveJob.afterWashing")) {
        this.func.get = getCalico;
        this.func.del = delCalico;
        this.func.add = addCalico;
        this.func.update = updateCalico;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      } else if (this.tabs == this.$t("weaveJob.lineTension")) {
        this.func.get = getStrain;
        this.func.del = delStrain;
        this.func.add = addStrain;
        this.func.update = updateStrain;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      }

      this.chooseData = {};
      this.chooseDtlData = {};
      for (let key in this.dlgForm) {
        if (this.dlgForm[key] === "") {
          delete this.dlgForm[key];
        }
      }
      this.func
        .get(
          Object.assign(this.dlgForm, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          if (this.tabs == "選擇訂單") {
            this.crud = res.data.rows;
          } else {
            this.crud = res.data.records;
            if (this.tabs == "用紗明细") {
              this.crud.sort((a, b) => {
                return a.sn - b.sn;
              });
            }
            if (this.tabs == this.$t("weaveJob.tabs2")) {
              this.crud.sort((a, b) => {
                return a.recordTime > b.recordTime ? -1 : 1;
              });
            }
            if (this.crud.length > 0) {
              this.$refs.crud.setCurrentRow(this.crud[0]);
            }
          }
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == "變更紗長" && !this.crud[i].yarnLength) {
          this.$tip.error("紗長不能為空!");
          return;
        }
        if (this.tabs == this.$t("weaveJob.afterWashing") && !this.crud[i].weight) {
          this.$tip.warning(this.$t("tipLabel.notWeightData"));
          return;
        }
        if (this.tabs == this.$t("weaveJob.lineTension") && !this.crud[i].lineTension) {
          this.$tip.warning(this.$t("weaveJob.saveTle5"));
          return;
        }
        if (this.tabs == this.$t("weaveJob.tabs2") && !this.crud[i].mathineCode) {
          this.$tip.warning(this.$t("weaveJob.saveTle6"));
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
            item.groupId ||
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
            data.createTime = this.$getNowTime("datetime");
            this.func.add(data).then(async (res) => {
              item.changedId = res.data.data;
              item.groupId = res.data.data;
              item.washedId = res.data.data;
              item.strainId = res.data.data;
              item.useId = res.data.data;
              this.tabs == this.$t("weaveJob.tabs2") &&
              (await this.addEquipmentSchedule(item));
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
            // this.getDetail();
            setTimeout(() => {
              this.dlgLoading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        }
      });
    },
    async addEquipmentSchedule(row) {
      let equRes = await fetchEquipmentInfo({equipmentCode: row.mathineCode});
      if (!equRes.data.length) return;
      const equInfo = equRes.data[0];
      let params = {
        equId: equInfo.equId,
        equModel: equInfo.equModel,
        planStart: row.recordTime,
        proSpeed: equInfo.equSpeed,
        proNeedleCount: equInfo.needleCount,
        proWayCount: equInfo.wayCount,
        proDiaBarrel: equInfo.equDiaBarrel,
        proNeedleSpace: equInfo.equNeedleSpace,
        equipmentName: equInfo.equipmentName,
        equipmentCode: equInfo.equipmentCode,
        productOrderNo: this.form.weaveJobCode,
        proTemperature: equInfo.equProTemperature,
        unit: equInfo.unit,
        measureMethod: equInfo.measureMethod,
        maxOutput: equInfo.maxOutput,
        equState: equInfo.equState,
      };
      addProEquipmentSchedule(params).then((res) => {
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
    checkstrain() {
      this.tabs = this.$t("weaveJob.lineTension"); //"輸送張力";
      this.crudOp = strainCrud(this);
      this.visible = true;
    },
    add() {
      if (this.tabs == "用紗明细") {
        this.choiceQ.sortF = 'yarnsId'
        this.choiceTle = this.$t("choiceTem.yarnStock");
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
        groupId: this.dlgForm.groupId,
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
      if (this.chooseData.list && this.chooseData.groupId) {
        this.$tip.warning("請先刪除用紗明細!");
        return;
      }
      this.$tip
        .cofirm(this.$t("tipLabel.deleteConfirm"))
        .then(() => {
          this.func
            .del(
              this.tabs === "更改紗長"
                ? this.chooseData.changedId
                : this.tabs === "用紗明细"
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
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
    },
    cellClick(val) {
      this.chooseData = val;
      this.chooseDtlData = {};
    },
    check() {
      if (this.tabs === "更改紗長") {
        this.form.yarnLenghtChanged = this.chooseData.yarnLength;
        this.visible = false;
      } else if (this.tabs === "用紗明细") {
        // 不存在本厂批号则不进行操作
        if (!this.chooseData.factoryYarnBatch) return;
        this.yarnTestVisible = true;
        this.$nextTick(() => {
          this.$refs.yarnTestRef.getYarnTestData(this.chooseData.factoryYarnBatch);
        })
      }
    },
    async choiceData(val) {
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      this.wLoading = true;
      if (this.tabs == "用紗明细") {
        val.forEach((item) => {
          this.crud.push({
            sn: this.crud.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            amount: 0,
            realAmount: 0,
            lossRate: 0,
            yarnRatio: 0,
            unit: item.weightUnit,
            $cellEdit: true,
          });
        });
      } else {
        const list = [
          "calicoFabricRequire",
          "calicoShap",
          "guage",
          "cylinderInch",
          "needleInch",
          "needleNumber",
          "calicoMiddle",
          "readyMadeFabric",
          "fallCloth",
          "mathineSpeed",
          "cylinderHeight",
          "weaveEnter",
          "clothRackWidth",
          "rotaSpeed",
          "loopSpace",
          "clothRackDesc",
          "transPlate",
          // "yarnLength"
        ]
        list.forEach((item) => {
          this.form[item] = val[item];
        })
        if (val.pinColumn) {
          await this.operatProcessClick();
          this.$refs.technology.loading = true;
          setTimeout(() => {
            this.$refs.technology.handleCheck(val, true);
          }, 500);
        }
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
  created() {
  },
  mounted() {
    this.meaveDomMove();
    this.getData();
  },
  beforeDestroy() {
  },
};
</script>
<style lang='stylus'>
#proWeaveJob {

.formBox {
  height: calc(100vh - 7.5rem) !important;
  overflow: auto;
}

.el-input-number__decrease, .el-input-number__increase {
  display: none;
}

.el-input-number .el-input__inner {
  text-align: left !important;
}

.el-input-number.is-controls-right .el-input__inner {
  padding-left: .3125rem !important;
}

}

#colorMng_Dlg {

.is-fullscreen {
  overflow: hidden !important;
}

.el-dialog__header {
  padding: 0 !important;
}

.el-dialog__headerbtn {
  top: .1875rem;
  font-size: 1.125rem;
  font-weight: bold;
  z-index: 9;
}

.el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
  color: #000;
  font-size: 1.5rem;
}

.el-tag--mini {
  height: 1.5rem;
  padding: 0 .3125rem;
  line-height: 1.5rem;
  font-size: .875rem;
}

.el-select .el-tag__close.el-icon-close {
  right: -0.3125rem;
  height: 1.125rem;
  width: 1.125rem;
  line-height: 1.125rem;
}

.avue-form .el-input--mini input {
  height: 2.1875rem !important;
  line-height: 2.1875rem;
}

}
</style>
