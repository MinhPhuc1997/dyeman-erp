<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-20 08:46:28
 * @FilePath: \iot.vue\src\view\quaLity\shearingBoard\tem.vue
 * @Description:
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container :title="$t('shearingBoard.title2')" :element-loading-text="$t('public.loading')" v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave" :disabled="qcShearingBoardData.upFlag">{{ this.$t("public.save")
        }}
        </el-button>
        <el-popconfirm :title="$t('tipLabel.updateConfirm')" @onConfirm="handleUpdate" style="margin: 0 10px">
          <el-button slot="reference" type="primary"
            :disabled="qcShearingBoardData.upFlag || !qcShearingBoardData.cutId">{{$t("shearingBoard.btn1")}}</el-button>
        </el-popconfirm>
        <el-popconfirm :title="$t('tipLabel.pirntConfirm')" @onConfirm="handlePrint" style="margin-right: 10px">
          <el-button slot="reference" type="primary" :disabled="!qcShearingBoardData.upFlag"> {{ $t("public.print") }}</el-button>
        </el-popconfirm>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>

        <div style="float: right; margin-right: 10px">
          <el-select v-model="printType" :placeholder="$t('codeCard.basePrintTemplate')">
            <el-option label="SPOWER 通用模板" value="1" />
            <el-option label="KANE TOP 定制码卡" value="2" />
          </el-select>
          {{$t("sheetNumber")}}：<el-input type="number" v-model="printCount" max="5" min="1" style="width: 80px;margin-right: 15px">
          </el-input>
          {{$t('quality.electronicScale')}}： <el-switch v-model="turnOnGetWeight" :disabled="qcShearingBoardData.upFlag" style="margin-right: 10px"
            :active-text="$t('public.turnOn')" :inactive-text="$t('public.close')">
          </el-switch>
          {{$t('shearingBoard.type')}}： <el-switch v-model="isBoard" :disabled="qcShearingBoardData.upFlag" :active-text="$t('shearingBoard.type1')" :inactive-text="$t('shearingBoard.type2')">
          </el-switch>
        </div>
      </div>
      <div class="formBox">
        <avue-form ref="qcShearingBoardForm" :option="qcShearingBoardFormOp" v-model="qcShearingBoardData">
          <template slot-scope="scope" slot="proCardFk">
            <el-select v-model="qcShearingBoardData.proCardFk" filterable remote reserve-keyword clearable
              default-first-option :placeholder="$t('clothMerge.placeholder3')" :remote-method="remoteMethod" :loading="vatLoading"
              @change="handleVatnoChange">
              <el-option v-for="item in options" :key="item.cardId" :label="item.productNo + '  (' + item.vatNo + ')'"
                :value="item.cardId">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
      <div class="defect-detail" v-if="!isBoard">
        <!-- <view-container title="疵点明细"> -->
        <div>
          <!-- <el-checkbox-group v-model="defectType" @change="handleDefeceTypeChange">
              <el-checkbox v-for="item in defectTypeData" :label="item.codeid" :key="item.codevalueoid">{{item.codename}}</el-checkbox>
            </el-checkbox-group> -->
          <div class="defect-group">
            <el-card shadow="hover" class="defect-card" v-for="(val, key) in defectShowData" :key="key"
              :style="{ 'flex-grow': val.length > 20 ? val.length > 35 ? 6 : 2 : 0 }">
              <div slot="header" class="clearfix">
                <span class="title-small-bold">{{ defectTypeObj[key] }}</span>
              </div>
              <div class="defect-list">
                <span class="defect-text text-small not-select" v-for="item in val" :key="item.basDefectdataoid"
                  :title="`${item.defectNo}-${item.chnName}-${item.vetName}`"
                  @click="handelClickDefectNode(item, 'defectNo')">{{ `${item.defectNo}${item.chnName}${item.vetName}` }}
                </span>
              </div>
            </el-card>
          </div>
        </div>
        <!-- </view-container> -->
      </div>
      <div v-else class="sample-container not-select">
        <!-- {{sampleData}} -->
        <div v-for="(item, index) in sampleData" :key="index">
          <p @click="handelClickDefectNode(item, 'value')">{{ item.label }}</p>
        </div>
      </div>
    </view-container>
  </div>
</template>

<script>
import { getLoginOrg } from "@/api/index";
import { getDIC } from "../../../config";
import {
  fetchProFinalProductCardCutByPage,
  addProFinalProductCardCut,
  updateProFinalProductCardCut,
  getFinishedNoteByPage,
  updateFinishedNoteData,
  getallDpt,
  fetchBasDefectTypeList,
  fetchBasDefectList
} from "./api.js";
import { crateDataForm } from "./data.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcShearingBoardFormOp: crateDataForm(this),
      qcShearingBoardData: {},
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false,
      options: [],
      cutDept: null,
      turnOnGetWeight: true,
      isBoard: true,
      spowerClient: null,
      printCount: 5,
      printType: '1',
      defectTypeData: [],
      defectType: [],
      defectData: [],
      defectTypeObj: {},
      defectShowData: [],
      defectDicData: [],
      sampleData: [],
      isInit: true,
    };
  },
  watch: {
    async isBoard(n, o) {
      this.qcShearingBoardFormOp.column[6].disabled = !n;
      this.qcShearingBoardFormOp.column[8].disabled = n;
      if (!this.isInit) {
        n && (this.qcShearingBoardData.cutDefeWeight = 0);
        !n && (this.qcShearingBoardData.cutSamWeight = 0);
        this.qcShearingBoardData.cutRemarks = []
      }
      if (!this.defectDicData.length) {
        await this.initDefect()
      }
      this.$nextTick(() => {
        n && (this.qcShearingBoardFormOp.column[this.qcShearingBoardFormOp.column.length - 1].dicData = getDIC("bas_sampleType"));
        !n && (this.qcShearingBoardFormOp.column[this.qcShearingBoardFormOp.column.length - 1].dicData = this.defectDicData);
      })
    }
  },
  computed: {},
  created() {
    let _this = this;
    _this.spowerClient = _this.$store.state.spowerClient;
    _this.spowerClient.onmessage = function (e) {
      if (!_this.turnOnGetWeight) {
        return;
      }
      // if(e.data.indexOf("scan") != -1){
      //   // 扫描事件
      //   _this.qcShearingBoardData.proCardFk = e.data.split("=")[1] //;
      // }
      let weight =
        e.data.indexOf(":") != -1
          ? Number(e.data.replace(/[^\d.]/g, ""))
          : e.data;
      _this.isBoard
        ? (_this.qcShearingBoardData.cutSamWeight = weight)
        : (_this.qcShearingBoardData.cutDefeWeight = weight);
    };
    this.initDefect();
  },
  mounted() {

  },
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getFinishedNoteByPage({
        productNo: "!^%" + val,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((res) => {
        this.options = res.data.records;
        // if (this.options.length == 1) {
        //   let data = this.options[0];
        //   // this.qcShearingBoardData.netWeight = data.netWeight;
        //   // this.qcShearingBoardData.netWeightLbs = data.netWeightLbs;
        //   // this.qcShearingBoardData.befcutYds = data.yardLength;
        //   this.qcShearingBoardData.proCardFk = data.cardId;
        //   // this.qcShearingBoardData.productNo = data.productNo;
        // }
        this.vatLoading = false;
      });
    },
    handleVatnoChange(cardId) {
      if (this.qcShearingBoardData.upFlag) return;
      this.loading = true;
      getFinishedNoteByPage({
        cardId,
        rows: 10,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((vatRes) => {
        if (vatRes.data.records.length > 0) {
          let data = vatRes.data.records[0];
          this.qcShearingBoardData.netWeight = data.netWeight;
          this.qcShearingBoardData.netWeightLbs = data.netWeightLbs;
          this.qcShearingBoardData.befcutYds = data.yardLength;
          // this.qcShearingBoardData.proCardFk = data.cardId;
          this.qcShearingBoardData.productNo = data.productNo;
          this.loading = false;
        } else {
          this.qcShearingBoardData.proCardFk = "";
        }
      });
    //  this.loading = false;
    },
    async handleDefeceTypeChange() {
      let obj = {};
      this.defectData.forEach((item) => {
        // if(!this.defectType.includes(item.defectClass)){ return; }
        !obj[item.defectClass] && (obj[item.defectClass] = []);
        obj[item.defectClass].push(item);
      });
      this.defectShowData = obj;
    },
    handelClickDefectNode(val, type) {
      if (!this.qcShearingBoardData.cutRemarks) {
        this.qcShearingBoardData.cutRemarks = [];
        return;
      }
      !this.qcShearingBoardData.cutRemarks.includes(val[type]) && this.qcShearingBoardData.cutRemarks.push(val[type])
    },
    async initDefect() {
      this.sampleData = await getDIC("bas_sampleType");
      this.defectTypeData = await fetchBasDefectTypeList().then(res => res.data);
      this.defectType = this.defectTypeData.map((item) => { !this.defectTypeObj[item.codeid] && (this.defectTypeObj[item.codeid] = `${item.codename} ${item.secondlanlabel}`); return item.codeid }); // 默认全选
      this.defectData = await fetchBasDefectList().then(res => res.data);
      let data = this.defectData.map((item) => { return { label: `${item.defectNo}-${item.chnName}-${item.vetName}`, value: item.defectNo } });
      // this.qcShearingBoardFormOp.column[ this.qcShearingBoardFormOp.column.length - 1].dicData = data;
      this.defectDicData = data;
      await this.handleDefeceTypeChange();
    },
    async initData(cutId) {
      this.loading = true;
      fetchProFinalProductCardCutByPage({
        cutId,
      })
        .then(async (res) => {
          res.data.total && (this.qcShearingBoardData = res.data.records[0]);
          this.qcShearingBoardData.upFlag && (this.turnOnGetWeight = false);
          this.isBoard = this.qcShearingBoardData.cutSamWeight ? true : false;
          !res.data.total && this.handleClose();
          await this.remoteMethod(this.qcShearingBoardData.productNo);
          this.qcShearingBoardData.cutRemarks && (this.qcShearingBoardData.cutRemarks = this.qcShearingBoardData.cutRemarks.split(","));
        })
        .finally(() => {
          setTimeout(() => {
            this.isInit = false;
            this.loading = false;
          }, 200);
        });
    },
    async addAndcreateData(cutId) {
      this.loading = true;
      if (cutId) {
        this.isInit = true;
        this.initData(cutId);
        return;
      }
      if (!this.cutDept) {
        let result = await getallDpt();
        await getLoginOrg({ account: parent.userID }).then((ress) => {
          if (ress.data.orgno == null) return;
          if (result.data.length > 0) {
            result.data.map((e) => {
              if (e.orgNo != null) {
                let children = e.orgNo.split(',');
                if (children.length > 0) {
                  let index = children.findIndex(e => e == ress.data.orgno);
                  if (index != -1) {
                    this.cutDept = e.dptCode;
                  }
                }
              }
            })
          }
        });
      }
      // 初始化新增数据
      this.qcShearingBoardData = {
        cutId: "",
        productNo: "",
        proCardFk: "",
        cutDate: this.$getNowTime("date") + " 00:00:00",
        cutDept: this.cutDept,
        respDept: "",
        netWeight: 0,
        netWeightLbs: 0,
        cutSamWeight: 0,
        cutSamWeightLbs: 0,
        cutDefeWeight: 0,
        cutDefeWeightLbs: 0,
        befcutYds: 0,
        cutYds: 0,
        cutRemarks: "",
        upFlag: false,
      };
      await this.$nextTick();
      this.isInit = false;
      this.loading = false;
    },
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },
    async calculateYardLength() {
      if (this.qcShearingBoardData.upFlag || this.qcShearingBoardData.upFlag == undefined) return;
      if (this.loading) {
        await this.$nextTick();
      }
    //  this.loading = true;
      let res = await getFinishedNoteByPage({
        cardId: this.qcShearingBoardData.proCardFk,
        rows: 20,
        start: 1,
        page: 1,
      });
      let data = res.data.records[0];
      let {
        realGramWeight,
        actualSideBreadth,
        netWeight,
        gramWeightUnit,
        widthUnit,
      } = data;
      let gramWeight, breadth;
      if (!realGramWeight || !actualSideBreadth || !netWeight) {
        console.error("realGramWeight:",realGramWeight,"actualSideBreadth:",actualSideBreadth,"netWeight:",netWeight)
        this.$tip.warning("未找到重量请联系IT！ Không tìm thấy số kg của cây vải vui lòng liên hệ IT")
        return;
      }
      gramWeight =
        gramWeightUnit == "Kg"
          ? Number(realGramWeight)
          : Number(realGramWeight / 1000);
      breadth =
        widthUnit == "INCH"
          ? Number((actualSideBreadth * 2.54) / 100)
          : Number(actualSideBreadth / 100);
      let cutWeight =
        netWeight -
        this.qcShearingBoardData.cutSamWeight -
        this.qcShearingBoardData.cutDefeWeight;
      let yardLength = parseInt(
        Number(cutWeight / gramWeight / breadth) * 1.0936
      );
      this.qcShearingBoardData.cutYds = yardLength;
      setTimeout(() => {
        this.loading = false;
      });
    },
    handleSave() {
      if (!this.qcShearingBoardData.cutSamWeight && !this.qcShearingBoardData.cutDefeWeight) {
        // this.$tip.warning("重量不能为0!");
        this.$tip.warning(this.$t("codeCard.weightNotNull"));
        return;
      }
      if (!this.qcShearingBoardData.productNo) {
        // this.$tip.warning("成品码卡不能为空!");
        this.$tip.warning(this.$t("shearingBoard.warning2"));
        return;
      }
      this.$refs.qcShearingBoardForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.warning(this.$t("shearingBoard.warning3"));
            return;
          }
          let params = {
            rows: 20,
            start: 1,
            page: 1,
            cutDate: this.$getNowTime("date") + " 00:00:00",
            proCardFk: this.qcShearingBoardData.proCardFk,
          };
          this.loading = true;
          let cutId = this.qcShearingBoardData.cutId;
          this.qcShearingBoardData.cutRemarks =
            this.qcShearingBoardData.cutRemarks.toString();
          if (cutId) {
            this.hasRefresh = true;
            await updateProFinalProductCardCut(this.qcShearingBoardData).then();
            await this.initData(cutId);
            this.$tip.success(this.$t("public.bccg"));
            setTimeout(() => {
              this.loading = false;
              done();
            }, 200);
          } else {
            let dayRecords = await fetchProFinalProductCardCutByPage(
              params
            ).then((res) => {
              return res.data.total;
            });
            if (dayRecords > 0) {
              this.$tip.cofirm("成品编号【 " +
                this.qcShearingBoardData.productNo +
                " 】今日已剪过办，请勿重复新增!  Hôm nay đã cắt qua mã này 【 " + this.qcShearingBoardData.productNo + " 】. Bạn có muốn cắt thêm lần nữa không?"
              ).then(async () => {
                this.qcShearingBoardData.saveTime = this.$getNowTime("datetime");
                cutId = await addProFinalProductCardCut(
                  this.qcShearingBoardData
                ).then((res) => {
                  return res.data.data;
                });
                this.qcShearingBoardData.cutId = cutId;
                this.hasRefresh = true;
                await this.initData(cutId);
                this.$tip.success(this.$t("public.bccg"));
                setTimeout(() => {
                  this.loading = false;
                  done();
                }, 200);
              }).catch(() => {
                this.loading = false;
                done();
                this.$emit("close", this.hasRefresh);
              });
            } else {
              this.qcShearingBoardData.saveTime = this.$getNowTime("datetime");
              cutId = await addProFinalProductCardCut(
                this.qcShearingBoardData
              ).then((res) => {
                return res.data.data;
              });
              this.qcShearingBoardData.cutId = cutId;
              this.hasRefresh = true;
              await this.initData(cutId);
              this.$tip.success(this.$t("public.bccg"));
              setTimeout(() => {
                this.loading = false;
                done();
              }, 200);
            }
          }


        } catch (err) {
          done();
          this.loading = false;
          this.$tip.error(err);
        }
      });
    },
    handleClose() {
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    },
    async handlePrint() {
      if (
        this.spowerClient.readyState == 3 ||
        this.spowerClient.readyState == 0
      ) {
        this.$tip.warning(this.$t('tipLabel.clientError'));
        return;
      }
      let printData = this.qcShearingBoardData;
      printData.printTime = this.$getNowTime("datetime");
      printData.cutRemarks = printData.cutRemarks.toString();
      for (let i = 0; i < this.printCount; i++) {
        if (this.printType == 1) {
          this.spowerClient.send("print=finishCard:" + printData.proCardFk);
        } else {
          this.spowerClient.send("print= finishCardCustomer:" + printData.proCardFk);
        }
      }
      updateProFinalProductCardCut(printData);
      this.hasRefresh = true;
      await this.initData(printData.cutId)
      this.$tip.success(this.$t("tipLabel.printSuccess"));
    },
    handleUpdate() {
      let printData = this.qcShearingBoardData;
      if (printData.upFlag) {
        this.$tip.warning(this.$t("shearingBoard.warning1"));
        return;
      }
      this.loading = true;
      let params = {
        cardId: printData.proCardFk,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      };
      getFinishedNoteByPage(params)
        .then(async (res) => {
          if (res.data.total) {
            //存在码卡信息，更新
            let data = res.data.records[0];
            if (!printData.upFlag) {
              // 打印过不再改变数量
              data.netWeight =
                data.netWeight -
                printData.cutSamWeight -
                printData.cutDefeWeight;
              data.grossWeight =
                data.grossWeight -
                printData.cutSamWeight -
                printData.cutDefeWeight;
              data.netWeightLbs = Number((data.netWeight * 2.2046).toFixed(1));
              data.grossWeightLbs = Number(
                (data.grossWeight * 2.2046).toFixed(1)
              );
              data.yardLength = printData.cutYds;
              printData.cutRemarks = printData.cutRemarks.toString();
              let resData = await updateFinishedNoteData(data).then( res => res.data);
              if(resData.code !== 200) {
                // 更新失败
                this.$tip.error(this.$t("bottomcol.error1") + resData.msg);
                this.loading = false;
                return;
              }
              printData.upFlag = true;
              printData.upDate = this.$getNowTime("datetime");
              await updateProFinalProductCardCut(printData).then( res => res.data);

              this.hasRefresh = true;
              await this.initData(printData.cutId)
              this.$tip.success(this.$t('bottomcol.success3'));
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-card__header {
  padding: 2px 10px;
}
.sample-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  flex-wrap: wrap;
  div {
    width: 19%;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee
  }
}
.defect-group {
  display: flex;
  flex-direction: row;
}
.defect-group >div {
  height: calc(100vh - 320px);
  margin: 5px 5px;
  width: 260px;
  border: 1px solid #eee !important;
}
.defect-list{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: calc(100vh - 345px);
  overflow: auto
}
.defect-text {
  margin: 2px 5px;
  cursor pointer;
  font-size: 15px
}
</style>
