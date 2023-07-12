<template>
  <div class="bottomColumn-print">
    <el-row>
      <el-col :span="18">
        <el-row class="formBox" style="margin: 10px" v-loading="loading" :element-loading-text="$t('public.loading')">
          <avue-form ref="printForm" :option="printFormOp" v-model="printForm">
            <template slot="runJobFk" slot-scope="scope">
              <el-select v-model="printForm.runJobFk" filterable remote reserve-keyword clearable default-first-option
                         :placeholder="$t('tipLabel.inputVatNo')" :remote-method="remoteMethod" :loading="vatLoading"
                         @change="handleVatChange">
                <el-option v-for="item in options" :key="item.runJobId" :label="item.vatNo" :value="item.runJobId">
                </el-option>
              </el-select>
            </template>
          </avue-form>
        </el-row>
        <div class="button-list">
          <el-button type="success" @click="handleQuery" v-hasPerm="['quality:qtyButtonColumn2:list']">
            {{ this.$t("public.query") }}
          </el-button>
          <el-popconfirm :title="$t('tipLabel.pirntConfirm')" placement="top-start" @onConfirm="handlePrint"
                         v-hasPerm="['quality:qtyButtonColumn2:print']">
            <el-button type="primary" slot="reference">{{ this.$t("public.print") }}</el-button>
          </el-popconfirm>
          <span style="font-size: 20px">{{ $t("sheetNumber") }}: </span><input type="number" max="5" min="1"
                                                                                v-model="printCount">
          <el-switch
            style="margin-left: 17px"
            size="large"
            v-model="useScale"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="使用电子秤"
            inactive-text="未用电子秤">
          </el-switch>

        </div>
      </el-col>
      <el-col :span="6">
        <view-container :title="$t('clothFly.title4')">
          <el-card class="border-card" style="height: calc(100vh - 120px); overflow: auto" id="history">
            <div class="historyText" v-for="item in history" :key="item.noteId"
                 style="border-bottom: 1px solid #eee">
              <el-tooltip class="item" effect="dark" :content="
                     '#' +
                    item.index +
                    ': 缸号' +
                    item.vatNo +
                    '包装序号' +
                    item.packNo +
                    ' 净重' +
                    item.netWeight
                  " placement="top">
                <div class="history">
                  <span>#{{ item.index }}</span>
                  <span> - {{ $t("vatNo") }}: {{ item.vatNo }}</span>
                  <span>包装序号 : {{ item.packNo }}</span>
                  <span>包净重: {{ item.netWeight }}</span>
                </div>
              </el-tooltip>
            </div>
          </el-card>
        </view-container>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {getRevolvePage} from "../finalCard/api";
import {
  fetchProBleadyeRunJobFlatData,
  createProProductFlatCardData,
  updateProProductFlatCardData,
  fetchProProductFlatCardData
} from "./api";
import {bottomColumnCrudOp} from "./data";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  components: {},
  props: {},
  data() {
    return {
      printFormOp: bottomColumnCrudOp(this),
      printForm: {
        packNo: 1
      },
      loading: false,
      vatLoading: false,
      options: [],
      spowerClient: null,
      printCount: 1,
      history: [],
      useScale:false
    };
  },
  watch: {},
  computed: {},
  created() {
    this.spowerClient = this.$store.state.spowerClient;
  },
  mounted() {
    this.socketIO()
  },
  methods: {
    handleQuery() {
      let {runJobFk, runJobFlatFk} = this.printForm;
      if (!runJobFk) {
        // this.$tip.warning("请先输入缸号");
        this.$tip.warning(this.$t("tipLabel.inputVatNo"));
        return;
      }
      if (!runJobFlatFk) {
        this.$tip.warning(this.$t("bottomcol.warning1"));
        return;
      }
      this.loading = true;
      this.handleFlatChange(runJobFlatFk);
    },
    async handlePrint() {
      if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
        this.$tip.warning(this.$t('tipLabel.clientError'));
        return;
      }
      this.loading = true;
      this.$refs.printForm.validate(async (valid, done) => {
        if (valid) {
          let {runJobFlatFk, runJobFk, packNo} = this.printForm;
          let params = {
            runJobFlatFk,
            runJobFk,
            packNo,
            cardType:2
          }
          let res = await fetchProProductFlatCardData(params)

          if (res.data.total != 0) {
            this.loading = false;
            this.$tip.warning("您已经打印过了包装序号，请选别的货到台账改信息. Bạn đã in qua số bao này nếu cần in lại vui lòng di chuyển đến trang danh sách!")
            done();
            return;
          }
          this.printForm.createTime = this.$getNowTime("datetime");
          this.printForm.printDate = this.$getNowTime("datetime");
          createProProductFlatCardData(Object.assign(SaveParms(this.printForm),{ cardType:2})).then(addRes => {
            if (addRes.data.code == 200) {
              this.printForm.fcardId = addRes.data.data;
              this.spowerClient.send(
                "print=fcardId:" + this.printForm.fcardId + "&" + this.printCount
              );
              this.pushToHistory(params)
              this.$tip.success(this.$t('bottomcol.success2'));
            } else {
              this.$tip.error(this.$t('public.createFail') + addRes.data.msg);
            }
          }).finally(() => {
            this.printForm.fcardId = '';
            this.printForm.packNo++;
            this.loading = false;
            done();
          })
        } else {
          this.loading = false;
          this.$tip.warning(this.$t("bottomcol.warning2"));
          done && done()
        }
      })
    },
    pushToHistory(val) {
      this.history.push({
        vatNo: this.printForm.vatNo || "",
        index: this.history.length + 1,
        packNo: val.packNo,
        netWeight: this.printForm.packNwKg|| ""
      })
    },
    remoteMethod(val) {
      this.vatLoading = true;
      getRevolvePage({vatNo: "!^%" + val, dyeMatter: 2}).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
    // 获取下栏列表
    handleVatChange(runJobFk) {
      if (!runJobFk) {
        return;
      }
      fetchProBleadyeRunJobFlatData({runJobFk}).then((res) => {
        res.data.map((e) => e.label = e.sn + " : " + e.lengthDsp + " x " + e.widthDsp)
        this.printFormOp.column[4].dicData = res.data.sort((a, b) => a.sn - b.sn);
      });
    },
    // 获取下栏信息
    async handleFlatChange(runJobFlatFk) {
      this.printForm.platId = runJobFlatFk
      if (!runJobFlatFk) {
        this.printForm.lengthDsp = null;
        this.printForm.widthDsp = null;
        this.printForm.amount = null;
        this.printForm.fcardId = '';
        this.loading = false;
        return
      }
      // 查询是否存在码卡信息
      let {runJobFk, packNo} = this.printForm;
      let params = {
        runJobFlatFk,
        runJobFk,
        packNo
      }
      await fetchProBleadyeRunJobFlatData({platId: runJobFlatFk}).then((res) => {
        if (!res.data.length) {
          this.$tip.warning(this.$t("tipLabel.dataError"));
          this.loading = false;
          return;
        }
        let {lengthDsp, widthDsp, amount, sizeUnit, packageCount, nw, gw} = res.data[0]
        this.printForm.lengthDsp = lengthDsp;
        this.printForm.widthDsp = widthDsp;
        this.printForm.amount = amount;
        this.printForm.sizeUnit = sizeUnit;
        this.printForm.packSize = packageCount;
        this.printForm.packNwKg = nw;
        this.printForm.packGwKg = gw;
      });
      await fetchProProductFlatCardData(params).then(res => {
        if (!res.data.total) {
          this.printForm.fcardId = "";
          this.loading = false;
          return;
        }
        this.printForm = Object.assign(this.printForm, res.data.records[0]);
      })
      this.loading = false;
    },
    socketIO() {
      this.spowerClient = this.$store.state.spowerClient;
      let _this = this;
      _this.spowerClient.onmessage = function (e) {
        let weight = e.data.indexOf(":") != -1 ? Number(e.data.replace(/[^\d.]/g, "")) : e.data;
        weight = Number((parseInt(Number(weight) * 10) / 10).toFixed(1));
        if(_this.useScale){
          _this.printForm.packNwKg=weight
        }

      };
      _this.spowerClient.onerror = function () {
        _this.$tip.warning(_this.$t("tipLabel.clientError"));
        _this.dlgCtr = false;
      };
    },
  },


};
</script>
<style lang="stylus">
.historyText {
  font-size: 20px;
  text-align: left;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 46px;
  line-height: 46px;
}

.button-list {
  padding: 10px;
}

.bottomColumn-print {

.el-form-item__label {
  font-size: 22px !important;
  padding: 0 5px 0 0 !important;
  white-space: nowrap !important;
  line-height 40px !important;
}

.el-input--mini input {
  height 40px !important;
  line-height 40px !important;
}

.el-input__inner {
  font-size 22px !important;
}

.el-button {
  font-size: 22px !important;
  margin: 10px 20px;
}

input {
  font-size 20px !important;
}

}
</style>
