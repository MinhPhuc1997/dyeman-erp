<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-17 17:02:05
 * @FilePath: \iot.vue\src\view\proMng\batchColor\ledger\tem.vue
 * @Description:
-->
<template>
  <div class="batchColorLedgerTem">
    <view-container :title="$t('ledger.appLedgerEdit')" :element-loading-text="$t('public.loading')"
                    v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="batchColorLedgerForm" :option="batchColorFormOp" v-model="ledgerData">
          <template slot-scope="scope" slot="runJobFk">
            <el-select v-model="ledgerData.runJobFk" filterable remote reserve-keyword clearable
                       default-first-option  :remote-method="remoteMethod"
                       :loading="vatLoading"
                       @change="handleVatnoChange">
              <el-option v-for="item in options" :key="item.runJobId" :label="item.vatNo"
                         :value="item.runJobId">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
      <template v-if="ledgerData.appState!=2">
        <el-row>
          <el-col :span="tabs == $t('finalizeDesign.process') ? 12 : 24">
            <view-container :title="tabs">
              <div class="btnList">
                <el-button @click="saveOther" type="success" :disabled="!ledgerData.recId">{{
                    $t("public.save")
                  }}
                </el-button>
                <el-button @click="add" type="primary">{{
                    $t("public.add")
                  }}
                </el-button>
                <el-button @click="del" type="danger">{{
                    $t("public.del")
                  }}
                </el-button>
                <el-button @click="up" type="primary">{{
                    $t("public.up")
                  }}
                </el-button>
                <el-button @click="down" type="primary">{{
                    $t("public.down")
                  }}
                </el-button>
              </div>
              <div class="crudBox">
                <avue-crud id="otherCrud" ref="otherCrud" :option="crudOp" :data="crud" :page.sync="page"
                           v-loading="loading" @on-load="query" @current-row-change="cellClick">
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
                                   :remote-method="remoteMethod1" @change="handleMatNameChange">
                          <el-option v-for="item in optionss" :key="item.bcCode"
                                     :label="`${item.cnnamelong}—${item.factoryName}`"
                                     :value="`${item.cnnamelong}—${item.factoryName}`"
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
      </template>
    </view-container>
  </div>
</template>

<script>
import {
  fetchProBatchColorLedgerByPage,
  addProBatchColorLedger,
  updateProBatchColorLedger,
  getRunJobByPage
} from "./api.js";
import {mainCrud, pfCrud} from "./data.js";
import {getBasChemicalByPage, getBasPigmentByPage} from "../../techCode/api";
import {MoveElement} from "../../../../utils/tools";
import {
  axiosDel,
  axiosGet,
  axiosPost,
  axiosPostEx,
  axiosPostV1,
  axiosPut,
  axiosPutEx
} from "../../../im/Wk/cc/actionCloth/api";
import {queryParms, SaveParms} from "../../../im/Wk/cc/actionCloth/process";

export default {
  components: {},
  data() {
    return {
      loading: false,
      vatLoading: false,
      batchColorFormOp: mainCrud(this),
      ledgerData: {},
      dtlCurIdx: null,
      hasRefresh: false,
      chooseData: {},
      options: [],
      optionss: [],
      spowerClient: null,
      printCount: 5,
      printType: '1',
      crudOp: pfCrud(this),
      tabs: this.$t('finalizeDesign.postRecipe'),
      crud: [],
      colorId: "",
      runJobFk: "",
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    let _this = this;
    _this.spowerClient = _this.$store.state.spowerClient;
    // _this.spowerClient.onmessage = function (e) {
    //   if(e.data.indexOf("scan") != -1){
    //     // 扫描事件
    //     _this.remoteMethod(e.data.split("=")[1])
    //   }
    // };
  },
  mounted() {
  },
  methods: {
    async handleQuery(recId) {
      const url = "/api/proFinishJobMaterialFormula"
      let res = await axiosGet(url, {appColorRecFk: recId})
      this.crud = res.data
      this.crud.sort((a, b) => {
        return a.sn > b.sn ? -1 : 1
      })
      this.crud.map((e, i) => {
        e.index = i + 1;
        // e.$cellEdit=true
      })
    },
    async saveOther() {
      try {
        for (let i = 0; i < this.crud.length; i++) {
          if (this.crud[i].deliveryQuantity == null || this.crud[i].deliveryQuantity == 0) {
            this.$tip.warning("输送数量不能为空")
            return;
          }
          if (this.crud[i].waterAmount == null || this.crud[i].waterAmount == 0) {
            this.$tip.warning("水量不能为空")
            return;
          }
          if (this.crud[i].waterRatio == null || this.crud[i].waterRatio == 0) {
            this.$tip.warning("浴比不能为空")
            return;
          }
        }
        const url = "/api/proFinishJobMaterialFormula"
        let err = 0;
        for (let i = 0; i < this.crud.length; i++) {
          if (this.crud[i].formulaId == null || this.crud[i].formulaId == undefined) {
            let res = await axiosPostV1(url, Object.assign(
              {appColorRecFk: this.ledgerData.recId},
              SaveParms(this.crud[i])))
            if (res.data.code != 200) {
              err++
            }
          } else {
            let res = await axiosPut(url, SaveParms(this.crud[i]))
            if (res.data.code != 200) {
              err++
            }
          }
        }
        if (err == 0) {
          this.handleQuery(this.ledgerData.recId);
          this.$tip.success("操作成功")
        }
      } catch (e) {
        console.error(e)
      }
    },
    cellClick(val) {
      this.chooseData = val;
      this.crud[this.crud.findIndex((e) => e.index == val.index)].$cellEdit = true
    },
    query() {

    },
    showinfo(val) {
      return (val.popover) ? val.popover : "";
    },
    add() {
      let data = {
        index: this.crud.length + 1,
        bleadyeType: "add_chemicalmat",
        $cellEdit: true
      };
      this.crud.push(data);
      this.$refs.otherCrud.setCurrentRow(this.crud[this.crud.length - 1]);

      this.chooseData = data;
    },
    up() {
      let fromIndex = this.crud.findIndex((e) => e.index == this.chooseData.index)
      let toIndex = fromIndex - 1
      toIndex = (toIndex < 0) ? 0 : toIndex
      MoveElement(this.crud, fromIndex, toIndex)
      this.crud.map((e, i) => e.index = i + 1)
    },
    down() {
      let fromIndex = this.crud.findIndex((e) => e.index == this.chooseData.index)
      let toIndex = fromIndex + 1
      toIndex = (toIndex > this.crud.length - 1) ? this.crud.length - 1 : toIndex
      MoveElement(this.crud, fromIndex, toIndex)
      this.crud.map((e, i) => e.index = i + 1)
    },
    del() {
      if (!this.chooseData.jobItmeId && !this.chooseData.formulaId) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.otherCrud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm(this.$t("tipLabel.deleteConfirm"))
        .then(async () => {
          let res = await axiosDel("/api/proFinishJobMaterialFormula?formulaId=" + this.chooseData.formulaId, {})
          if (res.data.code === 200) {
            this.handleQuery(this.ledgerData.recId);
            this.$tip.success(this.$t("public.sccg"));
          } else {
            this.$tip.error(this.$t("public.scsb"));
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    remoteMethod1(val) {
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
        this.optionss = res.data.records;
        this.vatLoading = false;
      });
    },
    remoteMethod(val) {
      if (!val) return;
      this.vatLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((res) => {
        this.options = res.data.records;
        // if (this.options.length == 1) {
        //   let data = this.options[0];
        //   this.ledgerData.runJobFk = data.runJobId;
        //   this.handleVatnoChange(this.ledgerData.runJobFk)
        // }
        this.vatLoading = false;
      });
    },

    handleVatnoChange(runJobId) {
      if (!runJobId) return;
      getRunJobByPage({
        runJobId,
        vatNo: "!^%",
        rows: 10,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((vatRes) => {
        if (vatRes.data.records.length == 1) {
          let data = vatRes.data.records[0];
          this.ledgerData.custCode = data.custCode;
          this.ledgerData.colorCode = data.colorCode;
          this.ledgerData.colorName = data.colorName;
          this.ledgerData.salPoNo = data.salPoNo;
          this.ledgerData.firstOrOther = data.firstOrOther;
          this.ledgerData.fabName = data.fabName;
          this.ledgerData.poAmountKg = data.poAmountKg;
          this.ledgerData.pidCount = data.pidCount;
          this.ledgerData.vatNo = data.vatNo;
          // this.ledgerData.runJobFk = data.runJobId;
        } else {
          this.ledgerData.runJobFk = "";
          this.ledgerData.vatNo = "";
        }
      });
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
      fetchF({factoryName: "%" + val.split("—")[1], start: 1, rows: 50}).then((res) => {
        if (res.data.total == 1) {
          this.$nextTick(() => {
            this.$set(this.chooseData, "materialCode", res.data.records[0].bcCode)
            const title = "VN: " + res.data.records[0].vinamelong + ",\n" +
              "CN: " + res.data.records[0].cnnamelong + ",\n" +
              "EN: " + res.data.records[0].ennamelong + ",\n" +
              "factoryName: " + res.data.records[0].factoryName;
            this.$set(this.chooseData, "popover", title)
          })
        }
      });
    },

    async addAndcreateData(recId) {
      this.loading = true;
      if (recId) {
        this.colorId = recId;
        this.initData(recId);
        this.handleQuery(recId)
        return;
      }
      // 初始化新增数据
      let nowDate = this.$getNowTime("datetime");
      this.ledgerData = {
        appMileage: "BF",
        appStaff: parent.userID,
        appState: 1,
        finishTime: nowDate,
        receiveTime: nowDate,
        vatOutTime: nowDate,
        recId: "",
        remark: "",
        runJobFk: "",
        vatNo: "",
      };
      await this.$nextTick();
      this.loading = false;
    },
    async initData(recId) {
      this.loading = true;
      fetchProBatchColorLedgerByPage({recId}).then(async (res) => {
        res.data.total && (this.ledgerData = res.data.records[0]);
        this.remoteMethod(this.ledgerData.vatNo);
        this.handleVatnoChange(this.ledgerData.runJobFk);
        !res.data.total && this.handleClose();
      })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },

    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },

    handleSave() {
      this.$refs.batchColorLedgerForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.warning(this.$t('ledger.saveTle')); //请补充批色台账信息!
            return;
          }
          this.loading = true;
          this.ledgerData.appTime = this.$getNowTime("date") + " 00:00:00";
          this.hasRefresh = true;
          let recId = this.ledgerData.recId;
          if (recId) {
            await updateProBatchColorLedger(this.ledgerData).then();
            await this.initData(recId);
          } else {
            recId = await addProBatchColorLedger(this.ledgerData).then((res) => {
              return res.data.data
            });
            this.ledgerData.recId = recId;
            await this.initData(recId);
          }
          done();
          this.$tip.success(this.$t("public.bccg"));
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
    }
  },
};
</script>
<style lang="stylus" scoped>
>>> .el-card__header {
  padding: 2px 10px;
}
</style>
