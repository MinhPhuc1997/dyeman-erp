<template>
  <div id="colorMng_Tem">
    <view-container :title="$t('proWeaveOutworkShip.title3')" :element-loading-text="$t('public.loading')" v-loading="wLoading">
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>

        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div>
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container :title="$t('proWeaveOutworkShip.title4')">
        <div class="btnList">
          <el-button type="primary" @click="add">{{
            this.$t("public.add")
          }}</el-button>
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>
          <el-popover placement="top" width="160" v-model="visible" style="margin: 0 8px">
            <p>{{$t("proWeaveOutworkShip.pover1")}}</p>
            <el-input v-model="newLoad"></el-input>
            <div style="text-align: center; margin-top: 10px">
              <el-button size="mini" type="text" @click="visible = false">{{$t("public.cancel")}}</el-button>
              <el-button type="primary" size="mini" @click="changeLoad(newLoad,'storeLoadCode')">{{$t("public.determine")}}</el-button>
            </div>
            <el-button type="primary" slot="reference" :disabled="!selectList.length">{{$t("proWeaveOutworkShip.btn1")}}</el-button>
          </el-popover>
          <el-popover placement="top" width="160" v-model="visible1">
            <p>{{$t("proWeaveOutworkShip.pover2")}}</p>
            <el-input v-model="newStore"></el-input>
            <div style="text-align: center; margin-top: 10px">
              <el-button size="mini" type="text" @click="visible1 = false">{{$t("public.cancel")}}</el-button>
              <el-button type="primary" size="mini" @click="changeLoad(newStore,'storeSiteCode')">{{$t("public.determine")}}</el-button>
            </div>
            <el-button type="primary" slot="reference" :disabled="!selectList.length">{{$t("proWeaveOutworkShip.btn2")}}</el-button>
          </el-popover>
        </div>
        <div class="crudBox" style="margin-top: 5px">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="getShipdetail" @current-row-change="cellClick" @selection-change="selectionChange"></avue-crud>
        </div>
      </view-container>
    </view-container>

    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" :dlgWidth="dlgWidth" @choiceData="choiceData" @close="choiceV = false" v-if="choiceV"></choice>
  </div>
</template>
<script>
import { mainCrud, noteCrud } from "./data";
import {
  getCodeSupply,
  add,
  update,
  get,
  getNote,
  delNote,
  updateNote,
  addNote,
} from "./api";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
// import XLSX from "xlsx";
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
      visible: false,
      wLoading: false,
      loading: false,
      formOp: mainCrud(this),
      form: {},
      crudOp: noteCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzkh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      chooseData: {},
      oldData: {},
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      code: getDIC("bas_companyCode"),
      selectList: [],
      newLoad: '',
      newStore: '',
      visible1: false
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        //  baseCodeSupplyEx({ code: "dye_batch" }).then((res) => {
        this.form = {
          deliDate: this.$getNowTime("datetime"),
          isAudit: false,
        };
        this.wLoading = false;
        // });
      } else {
        get({
          rows: 1,
          start: 1,
          shipId: this.detail.shipId,
        }).then((res) => {
          if (res.data.records.length) {
            this.form = res.data.records[0];
          } else {
            this.form = this.detail;
          }
          this.getShipdetail();
        });
      }
    },
    getShipdetail() {
      if (!this.form.shipId) {
        this.wLoading = false;
        return;
      }
      getNote({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        outworkShipFk: this.form.shipId,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          let weight = 0;
          // 检查布票信息
          for (let i = 0; i < this.crud.length; i++) {
            weight += this.crud[i].rw;
            if (!this.crud[i].noteCode) {
              this.$tip.warning(this.$t("proWeaveOutworkShip.saveWarning1"));
              // this.$tip.warning("布票号不能为空!");
              done();
              return;
            }
            // else if (!this.crud[i].rw) {
            //   this.$tip.warning("布票实收重量不能为空!");
            //   done();
            //   return;
            // }
          }
          this.wLoading = true;
          try {
            // this.form.deliQty = weight;
            if (this.form.shipId) {
              // update
              update(this.form)
                .then((res) => {
                  this.refresh = true;
                  this.saveNote();
                })
                .catch((err) => {
                  this.$tip.error(this.$t("public.bcsb") + err);
                });
            } else {
              // update
              add(this.form)
                .then((res) => {
                  this.form.shipId = res.data.data;
                  this.refresh = true;
                  this.saveNote();
                })
                .catch((err) => {
                  this.$tip.error(this.$t("public.bcsb") + err);
                });
            }
            done();
          } catch (error) {
            this.wLoading = false;
          }
        } else {
          this.wLoading = false;
          this.$tip.error(this.$t("proWeaveOutworkShip.saveWarning2"));
        }
      });
    },
    saveNote() {
      if (this.crud.length) {
        this.crud.forEach((item, i) => {
          if (item.noteId) {
            updateNote(item).then((res) => {});
          } else {
            item.outworkShipFk = this.form.shipId;
            addNote(item).then((res) => {
              item.noteId = res.data.data;
            });
          }
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        });
      } else {
        this.wLoading = false;
        this.$tip.success(this.$t("public.bccg"));
      }
    },
    add() {
      this.crud.push({
        index: this.crud.length + 1,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
    },
    del() {
      if (!this.selectList.length) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip
        .cofirm(this.$t("tipLabel.deleteConfirm"))
        .then(() => {
          this.wLoading = true;
          this.selectList.forEach((item, i) => {
            if (item.noteId) {
              delNote(item.noteId).then((res) => {
                this.crud.splice(item.index - 1, 1);
              });
            } else {
              this.crud.splice(item.index - 1, 1);
            }
            if (i == this.selectList.length - 1) {
              this.$tip.success(this.$t("public.sccg"));
              this.getData();
            }
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    selectionChange(val) {
      this.selectList = val;
    },
    changeLoad(val,type){
      if (!this.selectList.length) {
        this.$tip.error(this.$t("tipLabel.notCheckData"));
        return;
      }
      this.wLoading = true
      this.selectList.forEach((item,i) =>{
        item[type] = val;
        if(i == this.selectList.length - 1){
          this.visible = false
          this.visible1 = false
          this.wLoading = false
        }
      })
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("choicDlg.xzkh")) {
        this.form.custCode = val.custCode;
        this.form.custName = val.custName;
      }
      if (this.choiceTle === this.$t("choicDlg.pbbm")) {
        this.form.fabCode = val.calicoId;
        this.form.fabricDesc = val.gustCalicoName;
      }
      if (this.choiceTle === this.$t("choicDlg.xzshxx")) {
        this.form.colorBh = val.colorNo;
        this.form.colorChn = val.colorName;
      }
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#colorMng_Tem {
  .formBox {
    // height calc(100vh - 125px) !important
  }
}

#colorMng_Dlg {
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