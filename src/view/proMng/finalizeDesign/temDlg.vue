<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-28 10:36:45
 * @Description:
-->
<template>
  <div id="ldOrderDlg">
    <view-container :title="(isAdd ? $t('public.add') : $t('public.update')) + $t('finalizeDesign.title1')"
                    :element-loading-text="$t('public.loading')"
                    v-loading="wLoading">
      <div class="btnList">
        <el-button type="success" @click="save">{{ $t("public.save") }}</el-button>
        <!-- <el-button type="primary" @click="checkOrder">选择织造通知号</el-button> -->
        <el-button type="primary" @click="checkProcess" :disabled="!this.form.finishJobId">
          {{ $t("finalizeDesign.process") }}
        </el-button>
        <el-button type="primary" @click="checkFormula" :disabled="!this.form.finishJobId">
          {{ $t("finalizeDesign.postRecipe") }}
        </el-button>
        <el-button type="primary" @click="print" :disabled="!form.finishJobId">{{ $t("public.print") }}</el-button>
        <el-button type="warning" @click="close">{{ $t("public.close") }}</el-button>
      </div>
      <div style="height: calc( 100vh - 125px);overflow-y: auto;">
        <div>
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </div>
        <h4 style="color:darkcyan;margin-left: 10px">后整配方</h4>
        <div>
          <avue-crud id="otherCrud" ref="otherCrud" :option="viewCrud" :data="crud" :page.sync="page"
                     v-loading="false" @on-load="query" @row-dblclick="handleRowDBLClick"
                     @current-row-change="cellClick">
            <template slot="itemSet" slot-scope="scope">
              <div v-if="scope.row.dataStyle === 'string'">
                <!-- string 类型 -->
                <el-input v-model="scope.row.itemSet"></el-input>
              </div>
              <div v-else style="text-align: center">
                <!-- boolean 类型 -->
                <el-checkbox v-model="scope.row.itemSet" :true-label="1" :false-label="0"></el-checkbox>
              </div>
            </template>
            <template slot="itemActual" slot-scope="scope">
              <div v-if="scope.row.dataStyle === 'string'">
                <!-- string 类型 -->
                <el-input v-model="scope.row.itemActual" type="number"></el-input>
              </div>
              <div v-else style="text-align: center">
                <!-- boolean 类型 -->
                <el-checkbox v-model="scope.row.itemActual" :true-label="1" :false-label="0"></el-checkbox>
              </div>
            </template>
            <template slot="materialName" slot-scope="scope">
              <template v-if="scope.row.bleadyeType != 'run' && scope.row.$cellEdit">
                <el-popover placement="right" :title="$t('finalizeDesign.info')" width="200" trigger="hover"
                            :content="showinfo(scope.row)">
                  <el-select slot="reference" v-model="scope.row.materialName" remote filterable reserve-keyword
                             clearable default-first-option :placeholder="$t('finalizeDesign.plsInput')"
                             :loading="vatLoading"
                             :remote-method="remoteMethod" @change="handleMatNameChange">
                    <el-option v-for="item in options" :key="item.bcCode"
                               :label="`${item.cnnamelong}—${item.factoryName}`" :value="`${item.factoryName}`"
                               :title="'CN:' + item.cnnamelong + '\n' + 'EN:' + item.ennamelong + '\n' + 'VI:' + item.vinamelong + '\n' + item.factoryName">
                      <template #label>
                        <span>{{ `${item.cnnamelong}-${item.cnnamelong}—${item.factoryName}` }} </span>
                      </template>
                    </el-option>
                  </el-select>
                </el-popover>
              </template>
              <el-input v-else-if="scope.row.bleadyeType == 'run' && scope.row.$cellEdit"
                        v-model="scope.row.materialName">
              </el-input>
              <span v-else>
                    {{ scope.row.materialName }}
                  </span>
            </template>
          </avue-crud>
        </div>
      </div>

    </view-container>
    <el-dialog :visible.sync="visible" fullscreen append-to-body id="viewDlg"
               :element-loading-text="$t('public.loading')" v-loading="dlgLoading" v-if="visible">
      <el-row>
        <el-col :span="tabs == $t('finalizeDesign.process') ? 12 : 24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button @click="saveOther" type="success">{{
                  $t("public.save")
                }}
              </el-button>
              <el-button @click="add" type="primary">{{
                  $t("public.add")
                }}
              </el-button>
              <el-button @click="del" type="danger" :disabled="!crud.length">{{
                  $t("public.del")
                }}
              </el-button>
              <el-button @click="visible = false" type="warning">{{
                  $t("public.close")
                }}
              </el-button>
              <template v-if="tabs == this.$t('finalizeDesign.postRecipe')">
                定型重量
                <el-tag size="small">{{ form.jobAmount || 0 }}</el-tag>
                用水量
                <el-tag size="small"> {{ form.waterAmount || 0 }}</el-tag>
                <div style="position:absolute;top: 10px;left: 500px">
                  <el-switch
                    @change="process"
                    style="display: block"
                    v-model="sw"
                    active-color="#13ce66"
                    inactive-color="blue"
                    active-text="湿布"
                    inactive-text="干布">
                  </el-switch>
                </div>
              </template>
            </div>
            <div class="crudBox">
              <avue-crud id="otherCrud" ref="otherCrud" :option="crudOp" :data="crud" :page.sync="page"
                         v-loading="loading" @on-load="query" @row-dblclick="handleRowDBLClick"
                         @current-row-change="cellClick">
                <template slot="itemSet" slot-scope="scope">
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.itemSet"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.itemSet" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="itemActual" slot-scope="scope">
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.itemActual" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.itemActual" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="materialName" slot-scope="scope">
                  <template v-if="scope.row.bleadyeType != 'run' && scope.row.$cellEdit">
                    <el-popover placement="right" :title="$t('finalizeDesign.info')" width="200" trigger="hover"
                                :content="showinfo(scope.row)">
                      <el-select slot="reference" v-model="scope.row.materialName" remote filterable reserve-keyword
                                 clearable default-first-option :placeholder="$t('finalizeDesign.plsInput')"
                                 :loading="vatLoading"
                                 :remote-method="remoteMethod" @change="handleMatNameChange">
                        <el-option v-for="item in options" :key="item.bcCode"
                                   :label="`${item.cnnamelong}—${item.factoryName}`" :value="`${item.factoryName}`"
                                   :title="'CN:' + item.cnnamelong + '\n' + 'EN:' + item.ennamelong + '\n' + 'VI:' + item.vinamelong + '\n' + item.factoryName">
                          <template #label>
                            <span>{{ `${item.cnnamelong}-${item.cnnamelong}—${item.factoryName}` }} </span>
                          </template>
                        </el-option>
                      </el-select>
                    </el-popover>
                  </template>
                  <el-input v-else-if="scope.row.bleadyeType == 'run' && scope.row.$cellEdit"
                            v-model="scope.row.materialName">
                  </el-input>
                  <span v-else>
                    {{ scope.row.materialName }}
                  </span>
                </template>
              </avue-crud>
            </div>
          </view-container>
        </el-col>
        <el-col :span="12" v-if="tabs == $t('finalizeDesign.process')">
          <view-container :title="$t('finalizeDesign.group2')" style="">
            <div style="margin-top: 15px; height: calc(100vh - 100px)">
              <avue-form ref="cpform" :option="cpForm" v-model="form"></avue-form>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
            @close="choiceV = false" v-if="choiceV"></choice>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
               :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('public.printPreview')">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl"/>
      </view-container>
    </el-dialog>


  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import {mainCrud, dlgForm, dlgCrud, pfCrud, gyCrud, cpForm} from "./data";
import {getBasChemicalByPage, getBasPigmentByPage} from "../techCode/api";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getProcess,
  addProcess,
  updateProcess,
  delProcess,
  getFormula,
  addFormula,
  delFormula,
  updateFormula,
  getTechargueList,
  getWeave,
} from "./api";
import {axiosGet, axiosPut, axiosPutEx} from "../../im/Wk/cc/actionCloth/api";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      options: [],
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 20,
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
      cpForm: cpForm(this),
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: this.$t('choiceTem.runJob'),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        sortF: "vatNo",
      },
      code: "",
      pfCrud: pfCrud(this),
      group: [],
      chooseDtlData: {},
      pdfDlg: false,
      pdfUrl: "",
      items: [],
      // 2022.07.15 ++  Symbol_Yang
      vatLoading: false,
      mateOption: [],
      sw: true,
      viewCrud: pfCrud(this)
    };
  },
  watch: {},
  methods: {
    // --- 对物料名称列进行自定义 Symbol_Yang 2022.07.15
    mateFocus(row) {
      this.$refs.otherCrud.setCurrentRow(row);
      this.remoteMate("%" + row.mateName, 'factoryName');
    },
    process() {
      this.form.waterAmount = this.form.jobAmount * (this.sw ? 0.6 : 1.1)
      this.form.waterAmount = Number((this.form.waterAmount < 100) ? 100 : this.form.waterAmount).toFixed(0);
    },
    remoteMate(val, type) {
      this.vatLoading = true;
      getBasChemicalByPage({[type || 'fillTextSeach']: val, start: 1, rows: 50}).then((res) => {
        this.mateOption = res.data.records;
        this.vatLoading = false;
      });
    },
    handleMateChange(val, row) {
      let item = this.mateOption.find(item => item.factoryName == val);
      if (item) {
        row.materialCode = item.bcCode
      }
    },
    async handleClick(val) {
      this.crud = [];
      let res = await axiosGet("/api/proFinishJobMaterialFormula", {appColorRecFk: val})
      this.crud = res.data
      this.crud.sort((a, b) => {
        return a.sn > b.sn ? 1 : -1
      })
      this.crud.map((e, i) => e.index = i + 1)
    },
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.startJobDate = this.$getNowTime("date");
          // this.form.proShrinkHangDry = false;
          // this.form.proShrinkSafeDry = false;
          // this.form.proShrinkThrowDry = false;
          this.form.mustPreshrunk = false;
          this.form.jobCreator = parent.userID;
          this.form.finishJobOption = "成品";
          this.form.dryClothItems = "抓毛";
          this.form.styleDptRework = 0;
          // this.form.sendingSampleQuantity = undefined;
          // this.form.sampleQuantity = undefined;
          // this.form.sampleSize = undefined;
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        for (let key in this.form) {
          if (
            key === "proShrinkHangDry" ||
            key === "proShrinkSafeDry" ||
            key === "proShrinkThrowDry" ||
            key === "mustPreshrunk"
          ) {
            continue;
          }
          if (this.form[key] == "undefined" || !this.form[key]) {
            delete this.form[key];
          }
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      console.log(this.func.update, "save");
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (
                key === "proShrinkHangDry" ||
                key === "proShrinkSafeDry" ||
                key === "proShrinkThrowDry" ||
                key === "mustPreshrunk"
              ) {
                continue;
              }
              if (
                this.form[key] == "undefined" ||
                this.form[key] == undefined || (!this.form[key] && this.form[key] !== false)
              ) {
                delete this.form[key];
              }
            }
            if (
              this.form.startJobDate &&
              this.form.startJobDate.indexOf(" ") == -1
            ) {
              this.form.startJobDate = this.form.startJobDate + " 00:00:00";
            }
            if (this.form.goodsDate && this.form.goodsDate.indexOf(" ") == -1) {
              this.form.goodsDate = this.form.goodsDate + " 00:00:00";
            }

            this.form.printDate
              ? (this.form.printDate = this.form.printDate + " 00:00:00")
              : "";
            this.form.custName = this.form.$custCode;
            if (this.form.finishJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              console.log(this.func.update, "save");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
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
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.finishJobId = res.data.data;
                  this.$emit("refresh");
                  done();
                  this.wLoading = false;
                  // this.addPro();
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  done();
                  this.wLoading = false;
                  this.$tip.error(this.$t("public.bcsb"));
                }
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
          this.$tip.error(this.$t("finalizeDesign.saveTle"));
          return;
        }
      });
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proFinishJob/proFinishPdf?id=" +
        this.form.finishJobId;
    },
    addPro() {
      getTechargueList({paramType: "afterfinish"}).then((res) => {
        res.data.forEach((item, i) => {
          addProcess({
            itemName: item.paramName,
            itemCode: item.paramKey,
            dataStyle: item.paramValueType,
            itemSet: item.paramDefault,
            proFinishJobFk: this.form.finishJobId,
          }).then((pro) => {
            if (i == res.data.length - 1) {
              this.wLoading = false;
              this.$tip.success(this.$t("public.bccg"));
            }
          });
        });
      });
    },
    query() {
      this.crud = [];
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (!this.form.finishJobId) {
        this.crud = [];
        return;
      } else if (this.tabs == this.$t('finalizeDesign.process')) {
        this.dlgForm.proFinishJobFk = this.form.finishJobId;
        this.func.get = getProcess;
        this.func.del = delProcess;
        this.func.add = addProcess;
        this.func.update = updateProcess;
      } else if (this.tabs == this.$t('finalizeDesign.postRecipe')) {
        this.func.get = getFormula;
        this.func.del = delFormula;
        this.func.add = addFormula;
        this.func.update = updateFormula;
        this.dlgForm.proFinishJobFk = this.form.finishJobId;
      }
      this.loading = true;
      this.chooseData = {};

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
            page: this.page.currentPage,
          })
        )
        .then((res) => {

          this.crud = res.data;
          if (this.tabs == this.$t('finalizeDesign.process')) {
            // this.crud = this.crud.sort((a, b) => {
            //   return Number(a.itemCode.replace(/[^0-9]/gi, "")) >
            //     Number(b.itemCode.replace(/[^0-9]/gi, ""))
            //     ? 1
            //     : -1;
            // });
            this.crud = this.crud.sort((a, b) => {
              return a.sn > b.sn ? 1 : -1;
            });
          }
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.itemSet == null ? (item.itemSet = undefined) : "";
            item.itemActual == null ? (item.itemActual = undefined) : "";
            item.index = i + 1;
          });
          this.page.total = res.data.total;

          if (this.crud.length > 0) {
            this.$refs.otherCrud.setCurrentRow(this.crud[0]);
          }
          this.loading = false;
        });
    },
    saveOther() {
      //  let err =0;
      //  this.crud.map(async (e) => {
      //   const obj = Object.assign(SaveParms(e),{proFinishJobFk: this.form.finishJobId} );
      //   let url =this.tabs == this.$t('finalizeDesign.process')?"/api/proFinishJobItem":"/api/proFinishJobMaterialFormula";
      //   let res = await axiosPut(url, obj)
      //   if (res.data.code != 200) {
      //     err++
      //   }
      // })
      // err==0 && this.$tip.success("操作成功")

      update({finishJobId: this.form.finishJobId, dryWet: this.sw ? 1 : 0, waterAmount: this.form.waterAmount})
      if (this.crud.length == 0) {
        return;
      }
      if (this.tabs == this.$t('finalizeDesign.postRecipe')) {
        //deliveryQuantity diluteRatio waterRatio
        for (let i = 0; i < this.crud.length; i++) {
          let e = this.crud[i]
          if (e.deliveryQuantity == null || e.deliveryQuantity == 0) {
            this.$tip.warning("输送数量不能为空或者0")
            return;
          }
          if (e.diluteRatio == null || e.diluteRatio == 0) {
            this.$tip.warning("开稀比例不能为空或者0")
            return;
          }
          if (e.waterRatio == null || e.waterRatio == 0) {
            this.$tip.warning("浴比不能为空或者0")
            return;
          }
        }
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == this.$t('finalizeDesign.process') && !this.crud[i].itemName) {
          this.$tip.warning(this.$t("finalizeDesign.saveWarning1"));
          return;
        }
        if (
          this.tabs == this.$t('finalizeDesign.postRecipe') &&
          !this.crud[i].materialCode &&
          !this.crud[i].useAmount
        ) {
          this.$tip.error(this.$t("finalizeDesign.saveWarning2"));
          return;
        }
      }
      this.dlgLoading = true;
      if (this.tabs == this.$t('finalizeDesign.process')) {
        this.save();
      }
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          data.list = [];
          data.alloc = [];
          data.loc = [];
          if (item.jobItmeId || item.formulaId) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proFinishJobFk = this.form.finishJobId;
            this.func.add(data).then((res) => {
              item.jobItmeId = res.data.data;
              item.formulaId = res.data.data;
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
    checkOrder() {
      this.choiceTle = this.$t("choiceTem.weaveJobCode");
      this.choiceV = true;
    },
    checkProcess() {
      this.tabs = this.$t('finalizeDesign.process');
      this.crudOp = gyCrud(this);
      this.visible = true;
      this.query();
    },
    async checkFormula() {
      this.items = [];
      let ress = await axiosGet("/api/proAppColorRec", {vatNo: this.form.vatNo})
      ress.data.map((e) => {
        this.items.push({
          value: e.recId,
          label: e.appColorCode
        })
      })
      this.sw = this.form.dryWet == 1
      this.process()
      this.tabs = this.$t('finalizeDesign.postRecipe');
      this.crudOp = pfCrud(this);
      this.visible = true;
      this.query();
    },
    add() {
      if (this.tabs != this.$t('finalizeDesign.postRecipe')) {
        this.choiceTle = this.$t("choiceTem.dyeBasicProcess");
        this.choiceQ.paramType = "afterfinish";
        this.choiceV = true;
      } else {
        let data = {
          index: this.crud.length + 1,
          bleadyeType: "add_chemicalmat",
          $cellEdit: true
        };
        this.crud.push(data);
        this.$refs.otherCrud.setCurrentRow(this.crud[this.crud.length - 1]);
      }
    },
    addDtl() {
      this.chooseData.list.push({
        $cellEdit: true,
      });
      this.$refs.pfCrud.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
    },
    del() {

      if (!this.chooseData.jobItmeId || !this.chooseData.formulaId) {

        this.$tip
          .cofirm(this.$t("tipLabel.deleteConfirm"))
          .then(() => {
            this.func
              .del(
                this.tabs == this.$t('finalizeDesign.process')
                  ? this.chooseData.jobItmeId
                  : this.chooseData.formulaId
              )
              .then((res) => {
                if (res.data.code === 200) {
                  // this.crud.splice(this.chooseData.index - 1, 1);
                  // this.chooseData = {};
                  // this.crud.forEach((item, i) => {
                  //   item.index = i + 1;
                  // });
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
            this.query();
            this.$tip.warning(this.$t("public.qxcz"));
          });
        this.crud = [];
      }
    },
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      if (
        this.tabs == this.$t('finalizeDesign.process') &&
        this.chooseData.list.length == 0 &&
        this.chooseData.compId
      ) {
        this.getYarnList();
      }
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    getYarnList() {
      getColor({
        star: 1,
        rows: 999,
        proLdNoticeFabricFk: this.chooseData.compId,
      }).then((res) => {
        let data = res.data.records;
        data.forEach((item, i) => {
          item.$cellEdit = true;
          item.index = i + 1;
          this.chooseData.list.push(Object.assign(item));
        });
        this.chooseData.list = res.data.records;
        if (this.chooseData.list.length > 0) {
          this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
        }
      });
    },
    check() {
      if (this.tabs === "選擇訂單") {
        this.wLoading = true;
        this.visible = false;
        this.form.orderNo = this.chooseData.poNo;
        this.form.po = this.chooseData.custPoNo;
        this.form.custCode = this.chooseData.custId;
        this.form.custName = this.chooseData.custId;
        this.form.issuedDate = this.chooseData.poDate;
        this.form.contractNo = this.chooseData.custContNo;
        getPoDtla({salPoFk: this.chooseData.salPooid}).then((res) => {
          if (res.data.rows.length) {
            let poDtla = res.data.rows[0];
            this.form.fabricCode = poDtla.fabId;
            this.form.greigeFabricLocation = poDtla.fabName;
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == this.$t('choiceTem.runJob')) {
        this.form.vatNo = val.vatNo;
        this.form.weaveJobCode = val.weaveJobCode;
        this.form.custCode = val.custCode;
        // t.formhis.startJobDate = val.xx;
        this.form.jobAmount = val.clothWeight;
        this.form.salPpAmount = val.poAmountKg;
        this.form.pidCount = val.pidCount;
        this.form.goodsDate = val.deliveDate;
        this.form.vatCount = val.poVatCount;
        this.form.vatIndex = val.vatIndex;
        this.form.deliveryAddress = val.address;
        this.form.colorCode = val.colorCode;
        this.form.colorName = val.colorName;
        this.form.colorCount = val.poColorCount;
        // this.form.dyeAfterBreadth = val.breadth;
        // this.form.dyeAfterWeight = val.gramWeight;
        this.form.fabricName = val.fabName;
        if (val.gramWeightAfter) {
          this.form.dryClothWeight = Number(
            parseInt(val.gramWeightAfter)
          ); // val.gramWeightAfter;
        }

        this.form.fabricCompone = val.fabElements;

        this.form.proBreadthSide =
          typeof val.breadthBorder === "number"
            ? val.breadthBorder
            : val.breadthBorder
              ? parseInt(val.breadthBorder)
              : 0; //连边幅宽 breadth_border

        this.form.proBreadthActual =
          typeof val.breadthActual === "number"
            ? val.breadthActual
            : val.breadthActual
              ? parseInt(val.breadthActual) || 0
              : 0;
        // val.breadthActual.indexOf("(") != -1
        //   ? Number(val.breadthActual.match(/\d+/g)[0])
        //   : val.breadthActual; //实用幅宽 breadthActual

        this.form.proWeightBefore =
          typeof val.gramWeightBefor === "number"
            ? val.gramWeightBefor
            : val.gramWeightBefor
              ? parseInt(val.gramWeightBefor)
              : 0;

        // val.gramWeightBefor.indexOf("(") != -1
        //   ? Number(val.gramWeightBefor.match(/\d+/g)[0])
        //   : val.gramWeightBefor; //洗前克重 gramWeightBefor

        this.form.proWeightAfter =
          typeof val.gramWeightAfter === "number"
            ? val.gramWeightAfter
            : val.gramWeightAfter
              ? parseInt(val.gramWeightAfter)
              : 0;

        // val.gramWeightAfter.indexOf("(") != -1
        //   ? Number(val.gramWeightAfter.match(/\d+/g)[0])
        //   : val.gramWeightAfter; //洗后克重 gramWeightAfter

        this.form.calicoBreadth = val.breadthActual;
        this.form.calicoWeight = val.gramWeightBefor;
        // this.form.proWeightAfter = val.gramWeightAfter;
        this.form.proShrinkSafeDry = val.flatDry;
        this.form.proShrinkTwist = val.shrinkNear;
        this.form.proShrinkLoop = val.shrinkRotate;
        this.form.proShrinkHangDry = val.hangDry;
        this.form.yarnCard = val.yarnCard;
        this.form.yarnNumber = val.yarnNumber;
        this.form.yarnCylinderNumber = val.yarnBatchNo;
        getWeave({weaveJobCode: val.weaveJobCode}).then((res) => {
          if (res.data.length) {
            let data = res.data[0];
            this.form.tubeDiam = data.cylinderInch;
            this.form.needleDist = data.guage;
            this.form.yarnLength = data.yarnLength;
          }
        });
      } else if (this.choiceTle == this.$t("choiceTem.dyeBasicProcess")) {
        val.forEach((item, i) => {
          let data = {};
          data = {
            itemCode: item.paramKey,
            itemName: item.paramName,
            itemSet: item.paramDefault,
            dataStyle: item.paramValueType,
            sn: item.sn,
            index: this.crud.length + 1,
            $cellEdit: true,
          };
          this.crud.push(data);
        });
        this.crud = this.$unique(this.crud, "itemCode");
        this.crud.forEach((item, i) => {
          // item.sn = i + 1;
          item.index = i + 1;
        });
        this.$nextTick(() => {
          this.$toTableLow(this, "otherCrud");
        });
      } else {
        this.form.colorName = val.colorName;
        this.form.colorCode = val.colorCode;
        this.form.custCode = val.custCode;
        this.form.fabricName = val.fabricDesc;
        this.form.fabricCompone = val.fiberComp;
        this.form.weaveJobCode = val.weaveJobCode;
        this.form.tubeDiam = val.cylinderInch;
        this.form.needleDist = val.guage;
        this.form.yarnLength = val.yarnLength;
        this.form.yarnCard = val.yarnBrand;
        this.form.yarnNumber = val.yarnBatchNo;
        this.form.yarnCylinderNumber = val.yarnCylinder;
        this.form.breadth = Number(val.breadth.replace(/[^0-9]/gi, ""));
        this.form.gramWeight = val.gramWeight;
        this.form.proWeightAfter = val.gramWeight;
        this.form.proShrinkHorizontal = val.horizonShrink;
        this.form.proShrinkVertical = val.verticalShrink;
      }
      this.choiceV = false;
    },
    remoteMethod(val) {
      if (this.chooseData.bleadyeType == "run") {
        return;
      }
      this.vatLoading = true;
      let fetchF = null;
      if (this.chooseData.bleadyeType == "add_chemicalmat") {
        fetchF = getBasChemicalByPage;
      } else {
        fetchF = getBasPigmentByPage;
      }
      fetchF({fillTextSeach: val, start: 1, rows: 50}).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    calculateWater() {
      if (this.chooseData.formulaFactor && this.chooseData.useAmount) {
        this.chooseData.waterAmount =
          this.chooseData.formulaFactor * 1000 * this.chooseData.useAmount;
      }
    },
    handleMatNameChange(val) {
      if (!val) {
        this.chooseData.basMateId = ''
        this.chooseData.mateName = ''
        return;
      }
      if (this.chooseData.bleadyeType == "run") {
        return;
      }
      let fetchF = null;
      if (this.chooseData.bleadyeType == "add_chemicalmat") {
        fetchF = getBasChemicalByPage;
      } else {
        fetchF = getBasPigmentByPage;
      }
      fetchF({factoryName: "%" + val, start: 1, rows: 50}).then((res) => {
        if (res.data.total == 1) {
          this.$nextTick(() => {
            this.$set(this.chooseData, "materialCode", res.data.records[0].bcCode)
            this.$set(this.chooseData, "materialName", res.data.records[0].factoryName)
            const title = "VN: " + res.data.records[0].vinamelong + ",\n" +
              "CN: " + res.data.records[0].cnnamelong + ",\n" +
              "EN: " + res.data.records[0].ennamelong + ",\n" +
              "factoryName: " + res.data.records[0].factoryName;
            this.$set(this.chooseData, "popover", title)
          })
        }
      });
    },
    showinfo(val) {
      return (val.popover) ? val.popover : "";
    }
  },
  created() {
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
  },
};
</script>


<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
