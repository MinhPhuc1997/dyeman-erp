<template>
  <div id="colorMng_Tem">
    <view-container :title="$t('dyeDeliveryNote.title3')" :element-loading-text="$t('public.loading')"
                    v-loading="wLoading">
      <div class="btnList">
        <el-button type="success" @click="save">{{
            this.$t("public.save")
          }}
        </el-button>
        <el-button type="primary" @click="audit">全部审核</el-button>

        <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}
        </el-button>
      </div>
      <div>
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>

      <el-row>
        <el-col :span="12">
          <view-container :title="$t('dyeDeliveryNote.title4')">
            <div class="btnList">
              <el-button type="primary" @click="add(0)">{{
                  this.$t("public.add")
                }}
              </el-button>
              <el-button type="danger" @click="del">{{
                  this.$t("public.del")
                }}
              </el-button>
            </div>
            <div class="crudBox" style="margin-top: 5px">
              <avue-crud ref="vatcrud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
                         @on-load="getShipdetail" @current-row-change="cellClick"></avue-crud>
            </div>
          </view-container>
        </el-col>
        <el-col :span="12">
          <view-container :title="$t('dyeDeliveryNote.title5')">
            <div class="btnList">
              <el-button type="primary" @click="add(1)">{{
                  this.$t("public.add")
                }}
              </el-button>
              <el-button type="danger" @click="delDtl">{{
                  this.$t("public.del")
                }}
              </el-button>
            </div>
            <div class="crudBox" style="margin-top: 5px">
              <avue-crud ref="dltcrud" :option="detailOp" :data="chooseData.list" v-loading="loading"
                         @current-row-change="cellDtlClick"></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog
      id="onlyview"
      :visible.sync="choiceV"
      width="70%"
      modal
      append-to-body
      custom-class="customModal"
      :close-on-click-modal="false"
      v-if="choiceV">
      <Select v-if="choiceV" @close="choiceV = false" @choiceData="choiceData"/>
    </el-dialog>

    <choice :choiceV="choiceVs" :choiceTle="choiceTle" :choiceQ="choiceQs" marginTop="5vh" dlgWidth="80%"
            @choiceData="choicePlanData" @close="choiceVs = false" v-if="choiceVs"></choice>
  </div>
</template>
<script>
import {mainCrud, noteCrud, finishedCrud, mainDlgForm} from "./data";
import {
  getCodeSupply,
  add,
  update,
  get,
  getNote,
  delNote,
  updateNote,
  addNote,
  addProOutFactOrderVat,
  getProOutFactOrderVat,
  delProOutFactOrderVat,
} from "./api";
import choice from "@/components/proMng/index";
import {getDIC, getDicT, getXDicT, postDicT, preFixInt} from "@/config";
import {baseCodeSupply, baseCodeSupplyEx} from "@/api/index";
import Select from "./select";
import {axiosGet, axiosPostEx, axiosPut} from "../../im/Wk/cc/actionCloth/api";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";
// import XLSX from "xlsx";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    Select,
    choice: choice,

  },
  data() {
    return {
      wLoading: false,
      loading: false,
      formOp: mainDlgForm(this),
      form: {},
      crudOp: noteCrud(this),
      crud: [],
      detailOp: finishedCrud(this),
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceVs: false,
      choiceTle: "选择货运计划",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        cardType: 1,
        r_clothState_r: "||1||2||3",
        sortF: "productNo",
        fuzzy: "poNo,vatNo",
      },
      choiceQs: {
        sortF: "spNo",
        fuzzy: "spNo,cabinet",
      },
      chooseData: {},
      oldData: {},
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      code: getDIC("bas_companyCode"),
      cellDtlChoose: {},
    };
  },
  watch: {},
  methods: {
    async audit() {
      console.log(this.form)
      let result = await axiosGet("/api/proOutFactOrder/examine", {id: this.form.orderId})
      console.log(result);

    },
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        baseCodeSupplyEx({code: "de_order"}).then((res) => {   //dye_deliveryNote

          this.form = {
            outDate: this.$getNowTime("datetime"),
            outCode: res.data.data,
            applicant: this.$store.state.userOid,
            creator: this.$store.state.userOid,
            createDate: this.$getNowTime("datetime"),
            modifier: this.$store.state.userOid,
            modifyDate: this.$getNowTime("datetime"),
            delFlag: 0,
            orderState: "0"
          };
          this.wLoading = false;
        });
      } else {
        get({
          rows: 1,
          start: 1,
          orderId: this.detail.orderId,
        }).then((res) => {
          this.form = res.data.records[0] || this.detail;
          this.form.orderState += '';
          this.getShipdetail();
        });
      }
    },
    getShipdetail() {
      if (!this.form.orderId) {
        this.wLoading = false;
        return;
      }
      getProOutFactOrderVat({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        outOrderFk: this.form.orderId,
        productNo: "!^%",
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length) this.$refs.vatcrud.setCurrentRow(this.crud[0]);
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          const func = (item, index) => {
            if (!item.vatNo) {
              return false;
            }
            return true;
          };
          if (!this.crud.every(func)) {
            this.$tip.warning(this.$t("tipLabel.noVat"));
            done();
            return;
          }
          this.wLoading = true;
          try {
            if (this.form.orderId) {
              this.form.modifier = this.$store.state.userOid;
              this.form.modifyDate = this.$getNowTime("datetime");
              update(this.form)
                .then((res) => {
                  this.refresh = true;
                  this.saveNote();
                  this.updateRemark();
                })
                .catch((err) => {
                  this.$tip.error(this.$t("public.bcsb") + err);
                });
            } else {
              add(this.form)
                .then((res) => {
                  baseCodeSupply({code: "dye_deliveryNote"}).then(
                    (res) => {
                    }
                  );
                  this.form.orderId = res.data.data;
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
          done();
          this.$tip.error(this.$t("dyeDeliveryNote.saveTip"));
        }
      });
    },
    updateRemark() {
      this.crud.map(async (e, i) => {
        if (e.remarks.length != 0) {
          let result = await axiosPut("/api/proOutFactOrderVat", {vatRefId: e.vatRefId, remarks: e.remarks});
        }
      })
    },
    saveNote() {
      if (this.crud.length) {
        this.crud.forEach((item, i) => {
          if (item.vatRefId) {
            // updateNote(item).then((res) => {});
            if (item.list) {
              item.list.forEach((list, i) => {
                if (!list.dtlId) {
                  list.proOutFactOrderVatFk = item.vatRefId;
                  addNote(list).then((res) => {
                    list.dtlId = res.data.data;
                  });
                }
              });
            }
          } else {
            let data = JSON.parse(JSON.stringify(item));
            data.list = "";
            data.outOrderFk = this.form.orderId;
            addProOutFactOrderVat(data).then((res) => {
              item.vatRefId = res.data.data;
              item.list.forEach((list, i) => {
                list.proOutFactOrderVatFk = item.vatRefId;
                addNote(list).then((res) => {
                  list.dtlId = res.data.data;
                });
              });
            });
          }
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.getShipdetail();
              this.$tip.success(this.$t("public.bccg"));
            }, 500);
          }
        });
      } else {
        this.wLoading = false;
        this.$tip.success(this.$t("public.bccg"));
      }
    },
    add(val) {
      this.choiceQ.vatNo = val ? this.chooseData.vatNo : "";
      this.choiceV = true;
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip
        .cofirm(
          this.$t("tipLabel.delVat") +
          this.chooseData.vatNo +
          this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          if (this.chooseData.list.length) {
            for (let i = 0; i < this.chooseData.list.length; i++) {
              console.log(this.chooseData.list[i])
              delNote(this.chooseData.list[i].dtlId)
                .then((res) => {
                  console.log(res.data.code);
                  if (res.data.code == 200) {
                    this.$tip.success(this.$t("public.sccg"));
                    this.chooseData.list.splice(this.cellDtlChoose.index - 1, 1);
                    this.chooseData.list.forEach((item, i) => {
                      item.index = i + 1;
                    });
                    if (this.chooseData.list.length) {
                      this.$refs.dltcrud.setCurrentRow(this.chooseData.list[0]);
                    }
                  } else {
                    this.$tip.error(this.$t("public.scsb"));
                  }
                })
                .catch((err) => {
                  this.$tip.error(this.$t("public.scsb"));
                });
            }
            // this.$tip.error(this.$t("dyeDeliveryNote.delTip"));
            // return;
          }
          if (!this.chooseData.vatRefId) {
            this.crud.splice(this.chooseData.index - 1, 1);
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            if (this.crud.length) {
              this.$refs.vatcrud.setCurrentRow(this.crud[0]);
            }
            return;
          }
          delProOutFactOrderVat(this.chooseData.vatRefId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                this.crud.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.crud.length) {
                  this.$refs.vatcrud.setCurrentRow(this.crud[0]);
                }
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
          if (this.crud.length) {
            this.$refs.vatcrud.setCurrentRow(this.crud[0]);
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    delDtl() {
      if (Object.keys(this.cellDtlChoose).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.cellDtlChoose.dtlId) {
        this.chooseData.list.splice(this.cellDtlChoose.index - 1, 1);
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.chooseData.list.length) {
          this.$refs.dltcrud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm(
          this.$t("tipLabel.delProductCode") +
          this.cellDtlChoose.productNo +
          this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delNote(this.cellDtlChoose.dtlId)
            .then((res) => {
              console.log(res.data.code);
              if (res.data.code == 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.chooseData.list.splice(this.cellDtlChoose.index - 1, 1);
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.chooseData.list.length) {
                  this.$refs.dltcrud.setCurrentRow(this.chooseData.list[0]);
                }
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
    cellClick(val) {
      this.crud.map((e) => {
        e.$cellEdit = false;
      })
      this.crud[this.crud.findIndex((e) => e.vatNo == val.vatNo)].$cellEdit = true;
      this.chooseData = val;
      if (!val.list) {
        this.loading = true;
        getNote({
          proOutFactOrderVatFk: this.chooseData.vatRefId,
        }).then((res) => {
          res.data.sort((a, b) => (a.productNo > b.productNo ? 1 : -1));
          res.data.forEach((item, i) => {
            item.index = i + 1;
            item.pidNo = parseInt(item.productNo.slice(-3));
          });
          this.$set(val, "list", res.data);
          val.list = res.data;
          this.loading = false;
        });
      }
    },
    cellDtlClick(val) {
      this.cellDtlChoose = val;
      this
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    choicePlanData(val) {
      if (!val) {
        this.choiceVs = false;
        return;
      }
      let {spNo, cabinet} = val;
      this.form.shipPlanno = spNo;
      this.form.containNo = cabinet;
      this.choiceVs = false;
    },
    choiceData(val) {
      this.wLoading = true;
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }

      for (let i = 0; i < val.length; i++) {
        val[i].proFinalProductCardFk = val[i].cardId;
        if (!this.crud.length) {
          this.crud.push({
            index: 1,
            vatNo: val[i].vatNo,
            poNo: val[i].poNo,
            list: [{...val[i], index: 1}],
          });
          continue;
        }
        for (let j = 0; j < this.crud.length; j++ ) {
          if (this.crud[j].vatNo == val[i].vatNo) {

           if(this.crud[j].list===undefined || this.crud[j].list===null){
             this.crud[j].list = [...val[i]];
             this.crud[j].list.index=this.crud[j].list.length + 1;
           }else{
             console.log(this.crud[j].list ===undefined)
             console.log(this.crud[j])
             this.crud[j].list.push({
               ...val[i],
               index: this.crud[j].list.length + 1,
             });
             this.crud[j].list = this.$unique(
               this.crud[j].list,
               "proFinalProductCardFk"
             );
             break;
           }

          } else if (j == this.crud.length - 1) {

            this.crud.push({
              vatNo: val[i].vatNo,
              poNo: val[i].poNo,
              list: [{...val[i], index: 1}],
              index: this.crud.length + 1,
            });
          }
        }
      }
      this.choiceV = false;
      setTimeout(() => {
        this.wLoading = false;
      }, 200);
    },
  },
  updated() {
    this.$nextTick(() => {
      if (this.chooseData.list) {
        this.$refs["dltcrud"].doLayout();
      }
      if (this.crud) {
        this.$refs["vatcrud"].doLayout();
      }
    });
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
<style lang='stylus'>

</style>
