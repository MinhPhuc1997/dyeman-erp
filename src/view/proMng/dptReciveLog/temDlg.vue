<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-21 14:00:37
 * @Description:
-->
<template>
  <div id="techCodeTem">
    <view-container :title="$t('dptReciveLog.addLogTitle')" :element-loading-text="$t('public.loading')"
                    v-loading="wLoading"
                    class="not-number-icon">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="save(0)" :loading="wLoading">{{
              $t("public.save")
            }}
          </el-button>
        </el-tooltip>
        <el-button type="success" @click="save(1)" :loading="wLoading">{{ $t("public.adds") }}</el-button>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close">{{
              $t("public.close")
            }}
          </el-button>
        </el-tooltip>
        <!-- <el-button type="primary" @click="checkOrder">选择订单号</el-button> -->
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="runJobFk">
            <el-select v-model="form.runJobFk" filterable remote reserve-keyword clearable default-first-option
                       :placeholder="$t('tipLabel.inputVatNo')" :remote-method="remoteMethodVat" :loading="vatLoading"
                       @change="getLogWeight">
              <el-option v-for="item in optionsVat" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope" slot="weaveJobId">
            <el-select v-model="form.weaveJobId" filterable remote reserve-keyword clearable default-first-option
                       :placeholder="$t('tipLabel.inputWeaveCode')" :remote-method="remoteMethodVat" :loading="vatLoading"
                       @change="getLogWeight">
              <el-option v-for="item in optionsVat" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope" slot="aloYarntestoid">
            <el-select v-model="form.aloYarntestoid" filterable remote reserve-keyword clearable default-first-option
                       :placeholder="$t('tipLabel.inputTestNo')" :remote-method="remoteMethodVat" :loading="vatLoading"
                       @change="getLogWeight">
              <el-option v-for="item in optionsVat" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope" slot="stepId">
            <el-select v-model="form.stepId" filterable remote reserve-keyword clearable default-first-option
                       :placeholder="$t('tipLabel.inputStepNo')" :remote-method="remoteMethodCX" :loading="vatLoading"
                       @change="getCX">
              <el-option v-for="item in dataSelect" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </avue-form>
        <view-container title="收单日志">
          <avue-crud style="margin: 5px" :option="crudOp" :data="crud">
          </avue-crud>
        </view-container>
      </div>

    </view-container>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import {mainCrud, dlgForm, dlgCrud} from "./data";
import {get, add, getRunJobByPage, getWeave, getLog, getYarntest, getBaseWorkStep} from "./api";
import {axiosGet} from "../../im/Wk/cc/actionCloth/api";

export default {
  name: "techCodeTem",
  props: {
    detail: Object,
    isAdd: Boolean,
    tabs: String,
    userId: String,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: dlgForm(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      dlgWidth: "60%",
      loading: false,
      vatLoading: false,
      options: [],
      acceptStaff: parent.userID,
      lastLog: {},
      dataSelect: [],
      stepId: "",
      canEnd: false,
      crudOp: dlgCrud(this),
      crud: [],
      optionsVat: []

    };
  },
  watch: {},
  methods: {
    async remoteMethodVat(val) {
      this.optionsVat = []
      let uri = "/api/proBleadyeRunJob/page"
      let obj ={vatNo: "%" + val}
      switch (this.tabs) {
        case "zd":
          uri = "/api/proWeaveJob/page"
          obj={weaveJobCode: "%" + val}
          break;
        case "ssd":
          uri = "/api/aloYarntest/page"
          obj={yarntestNote: "%" + val}
          break;
      }
      let result = await axiosGet(uri, obj)
      result.data.records.map((e) => {
        this.optionsVat.push({
          value: e.runJobId || e.weaveJobId || e.aloYarntestoid  ,
          label: e.vatNo || e.weaveJobCode || e.yarntestNote ,
        })
      })
    },
    remoteMethod(val, scanSave) {
      this.vatLoading = true;
      // this.wLoading = true;
      if (this.tabs == "rd") {
        getRunJobByPage({
          vatNo: "!^%" + val,
          rows: 10,
          start: 1,
          page: 1,
          // runType: 0
        })
          .then((res) => {
            this.options = res.data.records;
            this.judgeFirstRes("runJobId");
            this.$nextTick(() => {
              if (res.data.records.length == 1) {
                this.form.runJobFk = res.data.records[0].runJobId;
                this.form.clothWeight = res.data.records[0].clothWeight;
                scanSave && this.save(1);
              }
            });
          })
          .finally(() => {
            this.vatLoading = false;
            // this.wLoading = false;
          });
      } else if (this.tabs == "zd") {
        getWeave({
          weaveJobCode: "!^%" + val,
          rows: 10,
          start: 1,
          page: 1,
          // runType: 0
        })
          .then((res) => {
            this.options = res.data.records;
            this.judgeFirstRes("weaveJobId");
            this.vatLoading = false;
            this.$nextTick(() => {
              if (res.data.records.length == 1) {
                this.form.weaveJobId = res.data.records[0].weaveJobId;
                this.form.clothWeight = res.data.records[0].clothWeight;
                scanSave && this.save(1);
              }
            });
          })
          .finally(() => {
            this.vatLoading = false;
            // this.wLoading = false;
          });
      } else {
        getYarntest({
          yarntestNote: "!^%" + val,
          rows: 10,
          start: 1,
          page: 1,
        })
          .then((res) => {
            this.options = res.data.records;
            this.judgeFirstRes("aloYarntestoid");
            this.vatLoading = false;
            this.$nextTick(() => {
              if (res.data.records.length == 1) {
                this.form.aloYarntestoid = res.data.records[0].aloYarntestoid;
                scanSave && this.save(1);
              }
            });
          })
          .finally(() => {
            this.vatLoading = false;
            // this.wLoading = false;
          });
      }
    },
    // 判断首条数据
    judgeFirstRes(vKey) {
      // 单数据有且只有一个触发回调
      if (this.options.length == 1) {
        this.getLogWeight(this.options[0][vKey])
      }
    },
    remoteMethodCX(val) {
      getBaseWorkStep({
        stepName: "%" + (val || ''),
        orgCodes: "%" + (this.form.dispathReceive == 1 ? this.form.dptworkProcessFk : this.form.sendProcessFk)
      }).then((res) => {
        this.dataSelect = [];
        res.data.map((e, i) => {
          this.dataSelect.push({
            label: e.stepName,
            value: e.stepId
          })
        });
      })
    },
    getLogWeight(id) {
      this.wLoading = true;
      getLog({
        runJobId: id,
      }).then((res) => {
        this.crud = res.data || [];
        if (res.data.length) {
          let list = res.data.sort((a, b) => {
            return a.acceptDate < b.acceptDate ? 1 : -1;
          });
          this.form.planOutput = list[0].realOutput || 0;
          this.form.realOutput = list[0].realOutput || 0;
          this.form.vatNo = list[0].vatNo
          this.lastLog = list[0];
          if (this.form.dispathReceive == 1) {
            this.form.sendProcessFk = this.lastLog.sendProcessFk;
          }
          this.lastLog = list[0];
        } else {
          if (this.tabs == "rd") {
            getRunJobByPage({
              runJobId: id,
              rows: 10,
              start: 1,
              page: 1,
            }).then((vatRes) => {
              if (vatRes.data.records.length) {
                let weight = vatRes.data.records[0].clothWeight || 0;
                this.form.planOutput = weight;
                this.form.realOutput = weight;
                this.form.vatNo = vatRes.data.records[0].vatNo;
              }
            });
          } else if (this.tabs == "zd") {
            getWeave({
              weaveJobId: id,
              rows: 10,
              start: 1,
              page: 1,
            }).then((weaveRes) => {
              if (weaveRes.data.records.length) {
                let weight = weaveRes.data.records[0].amount || 0;
                this.form.planOutput = weight;
                this.form.realOutput = weight;
                this.form.vatNo = weaveRes.data.records[0].weaveJobCode
              }
            });
          } else {
            getYarntest({
              aloYarntestoid: id,
              rows: 10,
              start: 1,
              page: 1,
            })
              .then((yarnTest) => {
                if (yarnTest.data.records.length) {
                  this.form.vatNo = weaveRes.data.records[0].yarntestNote
                }
              })
          }
        }
      }).finally(_ => {
        this.wLoading = false;
      })
    },
    getData() {
      this.form = this.detail;
      this.form.acceptStaff = parent.userID;
      this.form.acceptDate = this.$getNowTime("datetime");
      this.form.dptworkProcessFk = this.userId || "";
      this.form.planOutput = 0;
      this.form.realOutput = 0;
      this.form.dispathReceive = 1;
      this.form.isend = 0;
    },
    save(isContinue) {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            if (this.tabs == "rd") {
              this.form.vatNo = this.form.$runJobFk;
            } else if (this.tabs == "zd") {
              this.form.runJobFk = this.form.weaveJobId;
            } else {
              this.form.runJobFk = this.form.aloYarntestoid;
              // 试纱单时，将单号作为缸号进行存储 2022.10.21
              if (this.tabs === 'ssd') {
                let curSelOrdNo = (this.options.find(item => item.aloYarntestoid == this.form.aloYarntestoid) || {}).yarntestNote;
                this.form.vatNo = curSelOrdNo
              }
            }
            this.form.stepId = this.stepId;
            let vat = this.optionsVat[this.optionsVat.findIndex((e) => e.value == this.form.runJobFk)].label

            this.form.vatNo = vat;
            add(this.form).then((res) => {
              if (res.data.code == 200) {
                this.wLoading = false;
                this.$tip.success(this.$t("public.bccg"));
                this.$emit("refresh");
                // this.$emit("saveAfterBack", res.data.data); // 新增成功后发送指令给客户端
                !isContinue && this.$emit("close");
              } else {
                this.$tip.error(this.$t("public.bcsb") + res.data.msg);
              }
            });
            setTimeout(() => {
              this.wLoading = false;
              done();
            }, 200);
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error(this.$t("dptReciveLog.saveWarnTip"));
          return;
        }
      });
    },
    getCX(val) {
      this.stepId = val;
    },
    handleRowDBLClick(val) {
      this.chooseData = val;
      // this.check();
      // this.visible = false;
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
        obj === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    getDataCascader() {
      getBaseWorkStep().then((res) => {
        let data = res.data;
        data.map((e, i) => {
          this.dataSelect.push({
            value: e.stepId,
            label: e.stepName,
          })
        })

      })
    },
    handleGetLogData() {
      console.log(this.form);
      return
      this.fk = val.runJobId || val.weaveJobId || val.aloYarntestoid;
      getLog({
        runJobId: this.fk,
      }).then((res) => {
        this.jd = res.data;
        this.sloading = false;
      });
    }
  },
  created() {
  },
  mounted() {
    this.getData();
    this.getDataCascader();
    this.remoteMethod("");
    this.crudOp.height = "calc(100vh - 300px)"
  },
  beforeDestroy() {
  },
};
</script>
<style lang='stylus'>
#imgDlg {
  overflow: auto !important;
}

.image-remove {
  position: absolute;
  color: red;
  font-size: 24px;
  width: 30px;
  height: 30px;
  text-align: center;
  top: 5px;
  left: calc(100% - 50px);
  cursor: pointer;
}

#techCodeTem {

.watermark {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 48px;
  font-weight: 700;
  color: #ccc;
  height: 200px;
  width: 100%;
  line-height: 200px;
  text-align: center;
  z-index: 1;
}

.img {
  cursor: pointer;
  z-index: 100;
}

.el-input-number__decrease, .el-input-number__increase {
  display: none;
}

.avue-form__row {
  padding: 0 !important;
}

.el-input-number__decrease, .el-input-number__increase {
  display: none;
}

.el-input-number .el-input__inner {
  text-align: right !important;
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
