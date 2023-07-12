<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-14 09:07:56
 * @Description:
-->
<template>
  <div id="revolve">

    <view-container :title="(isAdd ? $t('public.add') : $t('public.update')) + $t('revolve.title1')" :element-loading-text="$t('public.loading')"
      v-loading="wLoading" class="not-number-icon">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="handleSaveBeforeValid" v-if="!audit" :loading="wLoading" :disabled="
            form.auditState == 1 && (form.runState == 1 || form.runState == 3)
          ">{{ $t("public.save") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
          <el-button type="primary" @click="print" :disabled="
            !form.runJobId || form.auditState != 1 || form.runState == 0
          ">{{ $t("public.print")}}</el-button>
        </el-tooltip>
        <el-button type="primary" :disabled="!form.runJobId" @click="exhaustPrint" :loading="wLoading">{{ $t("exhaustCard")}}</el-button>
        <el-button v-if="audit" type="primary" @click="auditHandle(form.auditState ? 0 : 1)">{{ form.auditState ? $t("public.unaudit")
            : $t("public.audit")
        }}</el-button>
        <el-tooltip class="item" effect="dark" content="Nhận đơn" placement="top-start">
          <el-button type="primary" @click="dialogVisible = true" :disabled="!fk">{{ $t("revolve.title2")}}</el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="In đơn xuất kho" placement="top-start">
          <el-button type="success" @click="printClothNote">{{ $t("revolve.printNote") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close">{{
              $t("public.close")
          }}</el-button>
        </el-tooltip>
      </div>
      <el-row class="formBox" style="width: 100%">
        <el-col :span="6">
          <view-container :title="$t('revolve.splitTle1')" v-if="form.divdVatFlag">
            <avue-crud ref="finishedNote" :option="cpbOp" :data="noteList" v-loading="bfLoading"></avue-crud>
          </view-container>
          <view-container title="胚布细码 Chi tiết vải mộc" v-else>
            <avue-crud ref="bf" :option="bfOp" :data="form.bf" v-loading="bfLoading"
              :summary-method="handleSummaryMethod"></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="18">
          <view-container :title="$t('revolve.title4')">
            <div style="height: calc(100vh - 145px); overflow: auto">
              <avue-form ref="form" :option="formOp" v-model="form" style="margin-top: 5px">
                <template slot-scope="scope" slot="weaveJobCode">
                  <el-select v-model="form.weaveJobCode" filterable remote reserve-keyword clearable
                    default-first-option :placeholder="$t('tipLabel.inputWeaveCode')" :remote-method="remoteMethod"
                    :loading="vatLoading" @change="codeChange">
                    <el-option v-for="item in options" :key="item.weaveJobCode" :label="item.weaveJobCode"
                      :value="item.weaveJobCode">
                    </el-option>
                  </el-select>
                </template>
                <!-- 生产通知单 -->
                <template slot-scope="scope" slot="salPoNo">
                  <el-select v-model="form.salPoNo" filterable remote reserve-keyword clearable default-first-option
                    :placeholder="$t('tipLabel.plsInputPo')" :remote-method="poNoRemoteMethod" :loading="vatLoading"
                    :disabled="!hasSplitB" @change="handlePoChange">
                    <el-option v-for="item in poNoOptions" :key="item.poNo" :label="item.poNo" :value="item.poNo">
                    </el-option>
                  </el-select>
                </template>
                <!-- 2022.07.28 + -->
                <!-- <template slot="colorName">
                  <el-input v-model="form.colorName" :disabled="!showColSelBtn">
                    <el-button v-if="showColSelBtn" slot="append" icon="el-icon-search" @click="handleOpenColSel" />
                  </el-input>
                </template> -->
              </avue-form>
              <!-- 下栏定义 -->
              <bottom-column ref="bottomColumn" v-show="form.dyeMatter == '2'"></bottom-column>
              <!-- 测试项目 -->
              <testStand-and-proItemVue ref="testStandAndProItemVue"></testStand-and-proItemVue>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <!-- 收单日志 -->
    <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container :title="$t('dyeNo')">
        <div class="btnList">
          <el-button type="warning" @click="dialogVisible = false">{{
              $t("public.close")
          }}</el-button>
        </div>
        <el-row>
          <el-col :span="10">
            <view-container :title="$t('revolve.title2')">
              <avue-crud ref="jdCrud" id="jdCrud" style="margin: 5px" :option="jdOp" :data="jd" v-loading="sloading">
              </avue-crud>
            </view-container>
          </el-col>
          <el-col :span="14">
            <view-container :title="$t('revolve.title3')">
              <div style=" overflow: scroll;">
                <flow-chart-pro ref="flowchartpro" v-model="fk"></flow-chart-pro>
              </div>
            </view-container>
          </el-col>
        </el-row>
      </view-container>
    </el-dialog>
    <!-- 打印预览 -->
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false" @close="pdfClose">
      <view-container :title="$t('public.printPreview')">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
    <!-- 2022.07.28 + -->
    <color-select ref="colSelRef" :dataList="colSelData" @select="handleColSelCb" />
    <saveNotEnoughError ref="saveNotEnoughError" />
    <split-valid ref="splitValid" @splitConfirmSave="handleSaveData" />
  </div>
</template>
<script>
import bottomColumn from "./bottom-column.vue"
import testStandAndProItemVue from "./testStandAndProItem.vue";
import { addWash, addDyes, getTechargueList } from "../print/dyeing/api";
import { dlgCrud as dlgCrudR } from "../dptReciveLog/data";
import flowChartPro from "@/components/flowChart2Pro/index.vue";
import splitValid from "./split-valid"
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  bfOp,
  cpbOp,
} from "./data";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import {
  get,
  add,
  update,
  addDyeTest,
  addDyeProject,
  getTest,
  getItem,
  getBf,
  getGroup,
  getYarn,
  getDye,
  updateDye,
  addDye,
  getWeave,
  fetchColorSelectData,
  fetchBleadyQtyDataByPoNo,
  fetchJobYarnInfoDataByWeaveCodeId,
  fetchSpliteVatNo,
  fetchProGstPoData,
  fetchColorBySalPoNo,
  updateFinishedBySplitVat,
  fetchQcCheckClothDayDetailCardData,
  getFinishList,
  fetchQcCheckoutFabricByPage,
  createProConvertVatNoticeData
} from "./api";

import { get as getRL, getLog } from "../dptReciveLog/api";
import ColorSelect from "./colorSelect.vue"
import saveNotEnoughError from "./saveNotEnoughError"
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    isSplit: Boolean,
    audit: Boolean,
    splitType: String,
    isExtract: Boolean
  },
  components: {
    flowChartPro,
    ColorSelect,
    bottomColumn,
    testStandAndProItemVue,
    saveNotEnoughError,
    splitValid
  },
  data() {
    return {
      wLoading: false,
      splitLoading: false,
      sloading: false,
      formOp: mainCrud(this),
      form: {
        forClothLockJoin: false,
        forClothTurnOver: false,
        forClothTogetherVat: false,
        forClothOrderHair: false,
        forClothAgainstHair: false,
        packGw: false,
        packNw: false,
        firstOrOther: "2",
        avgEachWeightKg: 58,
      },
      visible: false,
      loading: false,
      jdOp: dlgCrudR(this),
      jd: [],
      fk: "",
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      chooseData: {},
      cpbOp: cpbOp(this),
      bfOp: bfOp(this),
      bfLoading: false,
      pdfDlg: false,
      pdfUrl: "",
      vatLoading: false,
      options: [],
      poNoOptions: [],
      dialogVisible: false,

      // 颜色选择
      showColSelBtn: false,
      colSelData: [],
      // 拆B缸
      hasSplitB: false,
      noteList: [],
      // 入仓单审核状态
      hasAudit: false
    };
  },
  watch: {
    noteList(n, o) {
      this.$nextTick(() => {
        n.length && this.$refs.finishedNote.doLayout()
      })
    }
  },
  methods: {
    // 初始化数据
    initData() {
      this.wLoading = true;
      for (let key in this.form) {
        this.form[key] = null
      }
      this.form.bf = [];
      this.noteList = [];
      this.formOp.group[0].display = false;
      if (this.isAdd) {
        baseCodeSupplyEx({ code: "dye_batch" }).then(async (res) => {
          if (this.isSplit) {
            this.form = JSON.parse(JSON.stringify(this.detail));
            this.form.oldRunJobId = this.form.runJobId;
            // this.form.detailIdFk && this.getSpliitNote(); // 获取拆单明细
            // 去除打印日期值
            await fetchSpliteVatNo(this.splitType, this.form.vatNo).then(res => {
              this.form.origVat = this.detail.vatNo;
              this.form.vatNo = res.data.data;
              this.form.divdVatFlag = 1; // 拆单标志
              this.formOp.group[0].display = true;
              this.vaildHasSplitB(); // 判断是否拆B缸
            })
            this.form.auditState = 0;
            this.form.clothWeight = 0;
            this.form.pidCount = 1;
            Object.keys(this.form).forEach((item) => {
              if (this.isEmpty(this.form[item])) {
                delete this.form[item];
              }
            });
            if (
              !(this.form.mergVatNo instanceof Array) &&
              this.form.mergVatNo
            ) {
              this.form.mergVatNo = this.form.mergVatNo.split("/");
            }
            if (
              !(this.form.compLightSource instanceof Array) &&
              this.form.compLightSource
            ) {
              this.form.compLightSource =
                this.form.compLightSource.split(",");
            }
          } else {
            this.form.vatNo = "DF-" + res.data.data;
            this.form.forClothLockJoin = false;
            this.form.forClothTurnOver = false;
            this.form.forClothTogetherVat = false;
            this.form.forClothOrderHair = false;
            this.form.forClothAgainstHair = false;
            this.form.compLightSource = ["H", "G"];
            this.form.throwDry = "3Washing / 3tumble";
            this.form.poVatCount = 1;
            this.form.vatIndex = 1;
            this.form.poColorCount = 1;
            this.form.firstOrOther = "2";
            this.form.dyeMatter = 1; // 默认类型为衫身
            this.form.weaveFactoryName = "S.POWER";
            this.form.address = "S.POWER WAREHOUSE";
            this.form.salType = "sample";
            this.form.wmUnit = "KG";
            this.form.avgEachWeightKg = 58;
            this.typeChange();
          }
          this.form.workDate = this.$getNowTime();
          this.form.auditState = 0;
          this.form.serviceOperator = parent.userID;
          this.form.runState = "1";
          this.form.runJobId = "";
          this.form.jobType = 2;
          this.form.runType = 1;

          if (!this.isSplit && this.isExtract) {
            this.setGstDataExtract()
          }
          await this.$refs.bottomColumn.initData(null); // 清除下栏数据
          !this.isSplit && await this.$refs.testStandAndProItemVue.initData(null); // 清除测试数据
          !this.isSplit && await this.$refs.testStandAndProItemVue.getTestStandard(this.form.salPoNo); // 获取通知单的测试要求
          this.isSplit && await this.$refs.testStandAndProItemVue.handleCopyData(this.form); // 复制缸号生产项目、测试要求
        }).finally((_) => {
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        })
      } else {
        this.handleGetSubtableData();
      }
    },
    // 获取拆单明细
    async getSpliitNote() {
      this.bfLoading = true;
      this.noteList = await fetchQcCheckClothDayDetailCardData({ detailIdFk: this.form.detailIdFk }).then(res => res.data);
      this.bfLoading = false;
    },
    // 获取运转单子表数据
    handleGetSubtableData() {
      get({
        rows: 10,
        start: 1,
        runJobId: this.detail.runJobId,
      }).then(async (res) => {
        this.form = res.data.records[0];
        Object.keys(this.form).forEach((item) => {
          if (this.isEmpty(this.form[item])) {
            delete this.form[item];
          }
        });
        this.vaildHasSplitB();//判断是否拆B缸
        if (!(this.form.mergVatNo instanceof Array) && this.form.mergVatNo) {
          this.form.mergVatNo = this.form.mergVatNo.split("/");
        }
        if (
          !(this.form.compLightSource instanceof Array) &&
          this.form.compLightSource
        ) {
          this.form.compLightSource = this.form.compLightSource.split(",");
        }
        if (this.form.dutyDep) {
          this.form.dutyDep = this.form.dutyDep.split(",");
        }
        if (this.form.divdVatFlag) {
          this.formOp.group[0].display = true;
        }
        await this.$refs.bottomColumn.initData(this.form.runJobId); // 获取下栏数据
        await this.$refs.testStandAndProItemVue.initData(this.form.runJobId); // 获取测试要求、 生产项目
        this.getSublist();
      });
    },
    // TODO 生产通知单数据抽取赋值
    async setGstDataExtract(targetRow) {
      // 首次执行时，保存抽取数据
      if (targetRow) {
        this.extractRow = targetRow
      }
      if (!this.isExtract) return;
      let row = this.extractRow || {};
      for (let key in row) {
        if (!row[key]) {
          row[key] = ''
        }
      }
      // 对色光源
      let compLightSource = () => {
        let result = [];
        let keys = ["one", "two", "three"];
        keys.forEach(key => {
          row[key] && result.push(row[key])
        });
        if (result.length == 0) {
          result = this.form.compLightSource
        };
        return result;
      }
      // 比例格式转换 ;分割
      let progFormat1 = (valStr) => {
        let value = valStr.split(";");
        if (value.length != 5) {
          return ""
        }
        if (!value[0]) {
          return ""
        }
        let result = value[0];
        if (value[4] == "′′") {
          value[4] = ""
        }
        if (value[2] == value[3]) {
          result += ` (±${value[3]}${value[4]})`
        } else {
          result += ` (+${+value[3]}${value[4]}/-${Math.abs(value[2])}${value[4]})`
        }
        return result;
      }
      let progFormat2 = (valStr) => {
        let value = valStr.split(";");
        if (value.length != 5) {
          return ""
        }
        if (value[4] == "′′") {
          value[4] = ""
        }
        if(value[2] == value[3]){
          return `${value[3]}${value[4]}`
        }
        if(value [2] && value[3]){
          return `${value[2]}/${value[3]}${value[4]}`
        }
        if(value[2] || value[3]){
          return `${(value[2] || value[3])}${value[4]}`
        }

      }
      Object.assign(this.form, {
        deliveDate: row.exDate, // 交货日期
        salPoNo: row.poNo, // 生产单号
        custCode: row.custId, // 客戶
        custPoNo: row.custOrderNo, // 客人PO
        contractNo: row.contractNo, // 合同号
        colorName: row.colorEngName + " " + row.colorChnName, // 顏色名稱
        colorCode: `${row.colorNo} ${row.okLd} ${row.okRemarks}`, // 工厂色號
        custColorNo: row.colorCode, // 客色號
        poAmountKg: row.poQtyKg, // 訂單數量(kg)
        dyeClothWeight: row.inClothQty, // 染整数量
        clothWeight: 0, // 投胚数量
        fabricCode: row.fabCode, // 布类代码
        fabElements: row.fabConst, // 布匹成份
        fabName: row.fabName, // 布類描述
        compVatNo: row.headCylinderRef, // 对色标准/缸号
        specParam: row.okGh, // 规格参考
        compLightSource: compLightSource(), // 对色光源
        acceptRequirement: row.text1, // 收货要求
        styleNo: row.custStyleNo, // STLYLE款号
        custStyleCode: row.custSeason, // 季节
        salType: ({ "0": "sample", "1": "big" })[row.smKind], // 办单/大货
        breadthActual: progFormat1(row.fabWidth2), // 幅寬實用
        breadthBorder: progFormat1(row.fabWidth1), // 幅寬連邊
        gramWeightBefor: progFormat1(row.fabWeight1), // 洗前克重
        gramWeightAfter: progFormat1(row.fabWeight2), // 洗後克重
        shrinkLenth: progFormat2(row.shrinkVertical), // 縮水(直縮)
        shrinkWidth: progFormat2(row.shrinkHorizontal), // 縮水(橫縮)
        shrinkNear: row.spirality, // 缩水扭度
        gstPoverDtlxFk: row.gstPoverDtlxFk,
        address: row.exDest // 收货地址
      })
      if (row.finishingItem) {
        let items = row.finishingItem.split("/");

        this.form.item = items.map((item, index) => {
          return {
            sn: index + 1,
            jobItemName: item,
            $cellEdit: true
          }
        })
      }

      // TODO 是否为下栏
      if(row.bjList && row.bjList.length > 0){
        // 染整类型
        this.form.dyeMatter = 2;
        // 解析 抽取过来的扁机数据
        let reg = /([\d]+\.?[\d]*)[a-zA-Z]{0,2}[xX]([\d]+\.?[\d]*)([a-zA-Z]+)/;
        let orderAmount = 0;
        let targetBjDataList = row.bjList.sort((a, b) => a.pos.localeCompare(b.pos)).map((item, index) => {
          let sizeParse = (item.size || "").replace(" ", "").match(reg) || [];
          // 订单数累加
          orderAmount += +item.orderAmount || 0;
          return {
            sn: index + 1,
            partName: item.pos,
            // colorName: item.colorName,
            // yarnDesc: item.yarnDesc,
            lengthDsp: sizeParse[1],
            widthDsp: sizeParse[2],
            sizeUnit: sizeParse[3],
            amount: item.amount,
            nw: item.weight,
            packageCount: "",
            $cellEdit: true
          }
        })
        // 下栏状态时，订单数=染整数=扁机订单数之和
        this.form.poAmountKg = orderAmount;
        this.form.dyeClothWeight = orderAmount;
        this.$nextTick(() => {
          this.$refs.bottomColumn.bcCrudData = targetBjDataList;
        })

      }



      // 带出染整数量  总缸号   当前缸号
      let params = {
        salPoNo: this.form.salPoNo,
        colorName: this.form.colorName,
        fabName: this.form.fabName
      }
      let qtyData = await fetchBleadyQtyDataByPoNo(params).then(res => res.data.data);
      if (qtyData) {
        Object.assign(this.form, qtyData, {
          vatIndex: qtyData.vatIndex + 1
        })
      }
    },
    // 布票明细合计
    handleSummaryMethod({ columns, data }) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t("total");
          return;
        }

        let prop = column.property

        if (prop == "clothNoteCode") {
          sums[index] = data.length;
        }

        if (prop == "clothWeight") {
          let sumRes = 0;
          data.forEach(item => {
            sumRes += item[prop] || 0
          })

          sums[index] = this.$num2ThousandthFormat(sumRes, 1)
        }


      });

      return sums;
    },
    // 远程搜索织单
    remoteMethod(val) {
      this.vatLoading = true;
      getWeave({
        weaveJobCode: "!^%" + val,
        rows: 10,
        start: 1,
        // isWorkOut: 0,
      }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.form.weaveJobCode = res.data.records[0].weaveJobCode;
            setTimeout(() => {
              this.codeChange();
            }, 200);
          }
        });
      });
    },
    // 远程搜索生产单号
    poNoRemoteMethod(poNo) {
      this.vatLoading = true;
      fetchProGstPoData({
        poNo: "!^%" + poNo,
        rows: 10,
        start: 1,
        // isWorkOut: 0,
      }).then((res) => {
        this.poNoOptions = res.data.records;
        this.vatLoading = false;
      });
    },
    // 织单改变事件
    codeChange() {
      if (!this.form.weaveJobCode) {
        return;
      }
      this.wLoading = true;
      getWeave({
        weaveJobCode: this.form.weaveJobCode,
        rows: 10,
        start: 1,
      }).then((res) => {
        if (res.data.records.length > 0) {
          let item = res.data.records[0];
          if (this.isExtract) {
            this.setExaFormDataByWeaveCode(item);
          } else {
            this.setAddFormDataByWeaveCode(item);
          }
          // this.getColSelData();
          // 22.10.12  暂时注释测试标准的数据抽取
          // !this.isSplit && this.$refs.testStandAndProItemVue.getTestStandard(this.form.salPoNo);
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      });

    },
    // 织单号数据抽取后赋值---> 新增状态回调
    setAddFormDataByWeaveCode(item) {
      this.form.needleDist = item.guage;
      this.form.yarnLength = item.yarnLength;
      this.form.breadth = item.breadth;
      this.form.gramWeight = item.gramWeight;
      this.form.yarnBatchNo = item.yarnBatchNo;
      this.form.tubeDiam = item.cylinderInch;
      this.form.auditState = 0;
      this.form.yarnCard = "";
      this.form.yarnNumber = "";
      this.form.yarnCylinder = "";
      this.getOtherDataByWeaveGroup(item);
    },
    // 织单号数据抽取后赋值---> 待排数据抽取回调
    setExaFormDataByWeaveCode(item) {
      this.form.tubeDiam = item.cylinderInch; // 筒徑
      this.form.needleDist = item.guage; // 针距
      this.form.yarnLength = item.yarnLength; // 紗長
      this.form.breadth = item.breadth; // 幅寬
      this.form.gramWeight = item.gramWeight; // 胚重g

      this.getOtherDataByWeaveGroup(item);
    },
    // 织单号数据抽取补充 [纱缸]，[纱牌]，[纱批]
    getOtherDataByWeaveGroup_v1(item) {
      this.form.bf = [];
          getYarn({ proWeaveJobFk: item.weaveJobId}).then(
            (yarn) => {
              Object.assign(this.form, {
                yarnCard: "",
                yarnNumber: "",
                yarnCylinder: "",
              })
              if (yarn.data.length > 1) {
                let yIndex = 1;
                yarn.data.forEach((item, i) => {
                  if (item.yarnBrand) {
                    this.form.yarnCard +=
                      yIndex + "." + item.yarnBrand + " ";
                  }
                  if (item.yarnBatch) {
                    this.form.yarnNumber +=
                      yIndex + "." + item.yarnBatch + " ";
                  }
                  if (item.factoryYarnBatch) {
                    this.form.yarnCylinder +=
                      yIndex + "." + item.factoryYarnBatch + " ";
                  }
                  yIndex++;
                });
              } else if (yarn.data.length == 1) {

                this.form.yarnCard += yarn.data[0].yarnBrand;
                this.form.yarnNumber += yarn.data[0].yarnBatch;
                this.form.yarnCylinder += yarn.data[0].factoryYarnBatch;
              }
            }
          );
    },
    getOtherDataByWeaveGroup(item) {
      this.form.bf = [];
      fetchJobYarnInfoDataByWeaveCodeId(item.weaveJobId).then(res => {
        let yarnData = res.data.data || {}
        let { yarnBrand, yarnBatch, factoryYarnBatch } = yarnData;
        this.form.yarnCard = yarnBrand;
        this.form.yarnNumber = yarnBatch;
        this.form.yarnCylinder = factoryYarnBatch;
        // 若无值数据 请求老接口
        if (!(yarnBrand && yarnBatch && factoryYarnBatch)) {
          console.log("require olo api")
          this.getOtherDataByWeaveGroup_v1(item)
        }
      })
    },
    // 获取颜色选择数据
    getColSelData() {
      fetchColorSelectData({ weaveJobCode: this.form.weaveJobCode }).then(res => {
        this.colSelData = res.data;
        this.showColSelBtn = res.data.length > 0;

        // 存在颜色可抽取数据时，置空某些栏位
        if (this.showColSelBtn) {
          Object.assign(this.form, {
            colorName: "",
            compVatNo: "",
            specParam: "",
            compLightSource: [],
            remark: "",
          })
        }
      })
    },
    // 开启颜色选择面板
    handleOpenColSel() {
      this.$refs.colSelRef.visible = true;
    },
    // 颜色选择回调
    handleColSelCb(row) {
      // 容错处理
      let props = ["colorName", "colorNo", "okLd", "okGh", "light", "oneRem", "twoRem", "thrRem", "fourRem"]
      props.forEach(key => {
        if (!row[key]) {
          row[key] = ""
        }
      })

      Object.assign(this.form, {
        colorName: row.colorName,
        compVatNo: `${row.colorNo}-${row.okLd}`,
        colorCode: `${row.colorNo}-${row.okLd}`,
        specParam: row.okGh,
        compLightSource: row.light.split(","),
        remark: `${row.oneRem}\n${row.twoRem}\n${row.thrRem}\n${row.fourRem};`,
      });
    },

    getSublist() {
      if (this.form.divdVatFlag) {
        // 有异常报告显示成品
        getFinishList({ vatNo: this.form.vatNo }).then(res => {
          this.noteList = res.data;
        }).finally(() => {
          this.wLoading = false;
        })
      } else {
        // 否则显示胚布
        getBf({ proBleadyeRunJobFk: this.form.runJobId }).then((bf) => {
          this.form.bf = bf.data;
          this.form.bf.sort((a, b) => {
            return a.sn - b.sn;
          });
          this.form.bf.forEach((item, i) => {
            item.sn = i + 1;
          });
          if (this.form["bf"].length) {
            this.$refs["bf"].setCurrentRow(this.form["bf"][0]);
          }
        }).finally((_) => {
          this.wLoading = false;
        })
      }

    },
    // 审核
    auditHandle(val) {
      this.$tip
        .cofirm(val ? this.$t("tipLabel.auditTle1") : this.$t("tipLabel.unauditTle1"))
        .then(() => {
          this.wLoading = true;
          let mainData = {};
          mainData = JSON.parse(JSON.stringify(this.form));
          mainData.auditState = val;
          mainData.runState = val ? mainData.runState : "1";
          mainData.bf = null;
          mainData.test = "";
          mainData.item = "";
          mainData.mergVatNo = mainData.mergVatNo.join("/");
          mainData.compLightSource = mainData.compLightSource.join(",");
          mainData.workDate += " 00:00:00";
          mainData.deliveDate += " 00:00:00";
          if (mainData.dutyDep) {
            mainData.dutyDep = mainData.dutyDep.join(",");
          }
          Object.keys(mainData).forEach((item) => {
            if (this.isEmpty(mainData[item]) && item !== 'auditState') {
              delete mainData[item];
            }
          });
          update(mainData).then((res) => {
            if (val) {
              // 生成漂染单数据
              let data = JSON.parse(JSON.stringify(this.form));
              if (data.dutyDep) {
                data.dutyDep = data.dutyDep.join(",");
              }
              data.proBleadyeRunJobFk = data.runJobId;
              data.test = "";
              data.item = "";
              data.mergVatNo = data.mergVatNo.join("/");
              data.compLightSource = data.compLightSource.join(",");
              data.dyeJarCount = Number(data.dyeVatType || 0);
              data.bf = null
              Object.keys(data).forEach((item) => {
                if (this.isEmpty(data[item])) {
                  delete data[item];
                }
              });
              data.workDate += " 00:00:00";
              data.deliveDate += " 00:00:00";
              data.poAmountLb = data.poAmountKg ? (data.poAmountKg * 2.2046226).toFixed(2) : 0;
              getDye({
                vatNo: data.vatNo,
              }).then(async (dye) => {
                if (dye.data.length) {
                  data.bleadyeJobId = dye.data[0].bleadyeJobId;
                  // 存在数据,更新
                  updateDye(data).then((udye) => {
                    this.form.auditState = val;
                    this.$emit("refresh");
                    this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
                  }).finally((_) => {
                    this.$tip.success(this.$t("public.auditSuccess"))
                    this.wLoading = false;
                  })
                } else {
                  // 不存在数据，新增
                  await this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
                  addDye(data).then((adye) => {
                    this.addOtherData(adye.data.data);
                    // 新增生产项目
                    getItem({
                      proBleadyeRunJobFk: data.runJobId,
                    }).then((pres) => {
                      pres.data.forEach((item) => {
                        item.proBleadyeJobFk = adye.data.data;
                        addDyeProject(item).then((pro) => { });
                      });
                    });
                    // 新增测试要求
                    getTest({
                      proBleadyeRunJobFk: data.runJobId,
                    }).then((pres) => {
                      pres.data.forEach((item) => {
                        item.proBleadyeJobFk = adye.data.data;
                        addDyeTest(item).then((pro) => { });
                      });
                    });
                  });
                }
              });
            } else {
              setTimeout(() => {
                this.$tip.success(this.$t("public.unauditSuccess"))
                this.form.auditState = val;
                this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
                this.$emit("refresh");
                this.wLoading = false;
              }, 200);
            }
          }).finally((_) =>{
            setTimeout(() => {
              this.wLoading = false;
            }, 500);
          })
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
          this.wLoading = false;
        });
    },
    // 新增染单子表数据
    addOtherData(dyeId) {
      getTechargueList()
        .then((res) => {
          // 獲取全部基礎工藝
          let washIndex = 1,
            dyeIndex = 1,
            testIndex = 1;
          res.data.forEach((item, index) => {
            if (item.paramType === "wash") {
              // 長車
              addWash({
                itemId: item.paramKey,
                itemName: item.paramName,
                proBleadyeJobFk: dyeId,
                sn: washIndex++,
              }).then((res) => { });
            } else if (item.paramType === "dyevat") {
              // 染缸
              addDyes({
                vatParamCode: item.paramKey,
                vatParamName: item.paramName,
                dataStyle: item.paramValueType,
                sn: dyeIndex++,
                proBleadyeJobFk: dyeId,
              }).then((res) => { });
            }
            if (index == res.data.length - 1) {
              this.$tip.success(this.$t("public.auditSuccess"))
              this.$emit("refresh");
              this.wLoading = false;
            }
          });
          if (!res.data.length) {
            this.form.auditState = 1;
            this.$tip.success(this.$t("public.auditSuccess"))
            this.wLoading = false;
          }
        })
        .catch((e) => {
          this.wLoading = false;
        });
    },
    // 判断是否为B缸
    vaildHasSplitB() {
      this.hasSplitB = this.form.vatNo.indexOf('B') > 0;
      this.formOp.column[6].disabled = !this.hasSplitB;
    },
    // 生产单改变更新合同号、客人po
    async handlePoChange(poNo) {
      if (!this.hasSplitB) return
      if (!poNo) return
      let poData = await fetchProGstPoData({ poNo }).then(res => res.data.records[0]);
      if (!poData) return
      this.form.custPoNo = poData.custOrderno;
      this.form.contractNo = poData.contractNo;
    },
    // 监听 salType 变化
    async typeChange() {
      await this.$nextTick();
      let data = this.form;
      if (!data.remark) data.remark = "";
      let addText = "";
      data.remark = data.remark.replace(/^大货,/, "");
      data.remark = data.remark.replace(/^办单,/, "");
      data.remark = data.remark.replace(/^缸差,/, "");
      data.remark = data.remark.replace(/^头缸,/, "");
      data.remark = data.remark.replace(/^翻单头缸,/, "");

      if (data.salType == "sample") {
        // 判断备注开头是否有办布字样
        const nReg = /^办单/;
        if (!nReg.test(data.remark)) addText += "办单,";
      } else {
        // 判断备注开头是否有大货字样
        const nReg = /^大货/;
        if (!nReg.test(data.remark)) addText += "大货,";
        if (data.firstOrOther == "1") {
          const nReg = /^头缸/;
          if (!nReg.test(data.remark)) addText += "头缸,";
        } else if (data.firstOrOther == "2") {
          const nReg = /^缸差/;
          if (!nReg.test(data.remark)) addText += "缸差,";
        } else {
          const nReg = /^翻单头缸/;
          if (!nReg.test(data.remark)) addText += "翻单头缸,";
        }
      }
      data.remark = addText + data.remark;
    },
    // 保存验证
    async handleSaveBeforeValid() {
      if(this.wLoading) return;
      this.wLoading = true;
      this.$refs.form.validate(async (valid, done) => {
        if (valid) {
          done();
          if (this.isSplit && !this.form.runJobId) {
            // 判断此缸号是否已入仓审核
            let checkoutFabric = await fetchQcCheckoutFabricByPage({ vatNo: this.form.origVat }).then(res => res.data.records);
            this.hasAudit = checkoutFabric.length && checkoutFabric[0].whseVouch == 9;
            // if (checkoutFabric.length && checkoutFabric[0].whseVouch == 9 && this.splitType !== 'B') { // 拆B缸跳过控制
            //   this.wLoading = false;
            //   return this.$tip.warning("该缸号已审核入仓,请联系仓库管理员退仓!")
            // }
            // // 如果拆缸 先选择要拆的布
            this.$refs.splitValid.initData(this.form.origVat, this.form.vatNo, this.form.detailIdFk, this.splitType);
            this.wLoading = false;
            return;
          }
          this.handleSaveData();
        } else {
          this.$tip.error(this.$t("revolve.title7"));
          this.wLoading = false;
        }
      })
    },
    async handleSaveData(splitList) {
      try {
        this.wLoading = true;

        Object.keys(this.form).forEach((item) => {
          if (this.isEmpty(this.form[item])) {
            delete this.form[item];
          }
        });

        let data = JSON.parse(JSON.stringify(this.form));
        data.workDate = timeConversion(this.form.workDate);
        data.deliveDate = timeConversion(this.form.deliveDate);
        let vat = "";
        data.mergVatNo.forEach((item, i) => {
          if (i == data.mergVatNo.length - 1) {
            vat += item;
          } else {
            vat += item + "/";
          }
        });
        data.mergVatNo = vat;
        let light = "";
        data.compLightSource.forEach((item, i) => {
          if (i == data.compLightSource.length - 1) {
            light += item;
          } else {
            light += item + ",";
          }
        });
        data.compLightSource = light;
        data.bf = null;
        data.test = null;
        data.item = null;
        data.poAmountLb = data.poAmountKg ? Number((data.poAmountKg * 2.204623).toFixed(2)) : 0;
        data.vatNo = data.vatNo.replace(/\s/g, "");
        isNaN(data.pidCount) ? data.pidCount = 0 : data.pidCount;
        if (Array.isArray(this.form.dutyDep) && this.form.dutyDep) {
          data.dutyDep = this.form.dutyDep.join(",");
        }
        if (data.runJobId) {
          // update
          data.modifiDate = this.$getNowTime("datetime");
          data.jobModifier = this.$store.state.userOid;
          update(data).then(async (res) => {
            if (res.data.code > 0) {
              await this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
              await this.$refs.bottomColumn.handleSave(this.form.runJobId);
              this.$emit("refresh");
              this.$tip.success(this.$t("public.bccg"))
            } else if (res.data.code == -2) {
              this.$refs.saveNotEnoughError.initData(res.data);
            } else {
              this.$tip.error(res.data.msg);
            }
          }).catch((e) => {
            this.$tip.error(e);
            this.wLoading = false;
          }).finally(() => {
            this.wLoading = false;
          })
        } else {
          // add
          // TODO 拆单保存前检验新的订单号是否是相同的面料和颜色
          if (data.vatNo.includes("B") && this.isSplit && data.gstPoverDtlxFk) {
            let params = {
              gstPoverDtlxFk: data.gstPoverDtlxFk,
              salPoNo: data.salPoNo
            }
            let hasSave = await fetchColorBySalPoNo(params).then(res => res.data.data);
            if (!hasSave) {
              this.wLoading = false;
              return this.$tip.warning(this.$t("revolve.saveWarning1"));

            }
          }
          data.createTime = this.$getNowTime("datetime");
          data.jobCreator = this.$store.state.userOid;
          // 保存前更新重新确认一次缸号的生成
          if (!this.isSplit) {
            await baseCodeSupplyEx({ code: "dye_batch" }).then(res => {
              data.vatNo = "DF-" + res.data.data;
            })
          }
          add(data).then(async (res) => {
            if (res.data.code > 0) {
              // 拆单状态下 无需更新流水号
              if (!this.isSplit) {
                baseCodeSupply({ code: "dye_batch" }).then((r) => { });
              }
              this.form.runJobId = res.data.data;
              this.detail.runJobId = res.data.data;
              await this.$refs.bottomColumn.handleSave(this.form.runJobId);
              await this.$refs.testStandAndProItemVue.handleSaveData(this.form.runJobId);
              if (splitList) {
                if (!this.hasAudit) {
                  // 更新拆缸数据
                  let params = splitList.map((item) => {
                    return {
                      newVatNo: this.form.vatNo,
                      oldVatNo: this.form.origVat,
                      cardId: item,
                      // productNo: item.productNo
                    }
                  })
                  await updateFinishedBySplitVat(params).then(res => {
                    if (res.data.code !== 200) {
                      alert(this.$t("revolve.splitWarning1"))
                    }
                  })
                } else{
                  this.handleSaveConvertVatNotice(splitList); // 已审核入仓拆缸不修改成品,生成拆缸通知单
                }
                this.handleSaveConvertVatNotice(splitList); // 已审核入仓拆缸不修改成品,生成拆缸通知单
                this.$emit("refresh-uncreate");
              }
              this.$emit("refresh");

              this.$tip.success(this.$t("public.bccg"))
            } else if (res.data.code == -2) {
              this.$refs.saveNotEnoughError.initData(res.data);
            } else {
              this.$tip.error(res.data.msg);
            }
          }).catch((e) => {
            this.$tip.error(e);
            this.wLoading = false;
          }).finally((_) => {
            this.wLoading = false;
          })
        }
      } catch (error) {
        console.log(error);
        this.wLoading = false;
        this.$tip.error(this.$t("public.bcsb"));
      }
    },
    // async handleSaveNote() {
    //   if (!this.isSplit || !this.form.divdVatFlag) return;
    //   let params = this.noteList.map((item) => {
    //     return {
    //       newVatNo: this.form.vatNo,
    //       oldVatNo: this.form.origVat,
    //       cardId: item.cardIdFk
    //     }
    //   })
    //   await updateFinishedBySplitVat(params).then(res => {
    //     if (res.data.code !== 200) {
    //       alert("成品布拆缸失败，请在品质管理重新拆缸!")
    //     }
    //   })

    // },''
    handleSaveConvertVatNotice(list) {
      let nowTime = this.$getNowTime("datetime");
      let data = {
        noteTime: nowTime,
        vatNo: this.form.origVat,
        convertVatNo: this.form.vatNo,
        convertTime: nowTime,
        convertOperator: this.form.serviceOperator,
        createTime: nowTime,
        noteRemark: this.form.splitReason,
        vatDetails: list.map((item) => {
          return {
            cardId: item,
            createTime: nowTime
          }
        })
      }
      createProConvertVatNoticeData(data)
    },
    print() {
      this.pdfDlg = true;
      this.isExhaust = false;
      let url = (this.form.dyeMatter==1)?"/api/proBleadyeRunJob/createBleadyeRunJobPdf":"/api/proBleadyeRunJob/flatPdf"
      this.pdfUrl =
        process.env.API_HOST + url+"?id=" +this.form.runJobId + '&UserName=' + parent.userID;
    },
    printClothNote() {
      this.pdfDlg = true;
      this.isExhaust = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJobCalico/fineCode?id=" +
        this.form.runJobId;
    },
    exhaustPrint() {
      this.pdfDlg = true;
      this.isExhaust = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/smallCard?id=" +
        this.detail.runJobId;
    },
    pdfClose() {
      if (this.form.runState == "1" && !this.isExhaust) {
        this.$tip
          .cofirm(
           this.$t("tipLabel.updatePrintStatus"))
          .then(() => {
            update({
              printDate: this.$getNowTime("datetime"),
              modifiDate: this.$getNowTime("datetime"),
              runState: "3",
              runJobId: this.form.runJobId,
            }).then((res) => {
              if (res.data.code == 200) {
                this.$tip.success(this.$t("public.bccg"));
                this.$emit("refresh");
                this.pdfDlg = false;
              } else {
                this.pdfDlg = false;
                this.$tip.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.pdfDlg = false;
          });
      }
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    querydptLog() {
      this.sloading = true;
      getRL(
        Object.assign({
          vatNo: this.detail.vatNo
        }, {
          rows: 10,
          page: 1,
          start: 1,
        })
      ).then((res) => {
        if (res.data.records.length == 1) {
          const val = res.data.records[0];
          this.fk = val.runJobId || val.weaveJobId || val.aloYarntestoid;
          getLog({
            runJobId: this.fk,
          }).then((res) => {
            this.jd = res.data;
            this.sloading = false;
          });
        }
      });
    }
  },
  created() {
    if (!this.isAdd) this.querydptLog();
    this.jdOp.height = "calc(100vh - 151px)";
  },
  updated() {
    this.$nextTick(() => {
      if (this.form.bf && this.form.bf.length) this.$refs["bf"].doLayout();
    });
  },
  mounted() {
    // this.initData();
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
.el-transfer-panel__body, .el-transfer-panel__list.is-filterable {
  height: calc(100vh - 200px);
}

.el-transfer-panel .el-checkbox__inner {
  height: 16px;
  width: 16px;
}

.el-transfer-panel__filter .el-input__inner {
  font-size: 15px;
}

.el-transfer-panel__filter {
  margin: 5px;
}

.el-transfer-panel {
  width: 250px;
}

.el-tag--mini {
  height: 28px !important;
  // padding: 0 5px;
  line-height: 28px !important;
  font-size: 14px;
}

.el-input--mini .el-input__inner {
  height: 33px;
  line-height: 33px;
}

// .el-table__fixed-body-wrapper {
// top: 60px !important;
// }
#revolve {
  .el-radio-group {
    line-height: 20px;
  }

  .el-radio__label {
    font-size: 15px;
  }

  .avue-group__header {
    margin-bottom: 10px;
    height: 30px;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .avue-form__row {
    padding: 0 !important;
  }

  .formBox {
    // height: 100vh !important;
    // overflow: auto;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px !important;
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
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>
