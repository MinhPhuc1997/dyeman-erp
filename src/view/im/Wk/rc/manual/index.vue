<template>
  <div id="rc">
    <el-tabs
      type="border-card"
      v-model="tabs"
      :element-loading-text="$t('public.loading')"
      v-loading="screenLoading"
    >
      <el-tab-pane :label="data + this.$t('iaoMng.sgrc')" name="tabs1">
        <div class="btnList">
          <el-button type="primary" :disabled="hasAdd" @click="add">{{
            this.$t("public.add")
          }}</el-button>
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >{{ this.$t("public.update") }}</el-button
          >
          <el-button
            type="danger"
            @click="del"
            :disabled="Object.keys(chooseData).length === 0"
            >{{ this.$t("public.del") }}</el-button
          >

          <!-- <el-button type="warning" @click="ruleV = true" v-if="hide != 8"
            >編號規則配置</el-button
          > -->

          <!-- <el-button type="warning" @click="getData">取消</el-button> -->
          <el-button type="primary" @click="getData">{{
            this.$t("public.query")
          }}</el-button>
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="Audit(chooseData)"
            >{{ this.$t("public.audit") }}</el-button
          >
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="form"
            :option="everyThing.mainF"
            v-model="form"
          ></avue-form>
        </div>
        <el-row class="crudBox">
          <el-col :span="24">
            <view-container :title="data + $t('iaoMng.rcmx')">
              <avue-crud
                ref="crud"
                :option="everyThing.mainC"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="getData"
                @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick"
              ></avue-crud> </view-container
          ></el-col>
          <!-- <el-col :span="10">
          <view-container :title="data.type.split('_')[0] + '明细'">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :data="crud"
            ></avue-crud> </view-container
        ></el-col> -->
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="sxrcDlg"
      :visible.sync="dialogVisible"
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <tem-dlg
        ref="tem"
        :datas="data"
        :detail="detail"
        :hide="hide"
        :isAdd="isAdd"
        :addList="addList"
        :everyThing="everyThing"
        @getData="refresh"
        @close="dialogVisible = false"
        v-if="dialogVisible"
      ></tem-dlg>
    </el-dialog>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="ruleV"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
      v-if="ruleV"
    >
      <rule-dlg
        ref="rule"
        :rcType="everyThing.code"
        @close="ruleV = false"
      ></rule-dlg>
    </el-dialog>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="60%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import tem from "./tem";
import rule from "@/components/rule";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import {
  //紗線
  getSx,
  addSx,
  updateSx,
  delSx,
  getSxDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
  getSxLoc,
  addSxLoc,
  updateSxLoc,
  delSxLoc,
  //胚布
  getPb,
  addPb,
  updatePb,
  delPb,
  getPbDetali,
  addPbDetali,
  updatePbDetali,
  delPbDetali,
  getPbPh,
  addPbPhDetali,
  updatePbPhDetali,
  delPbPhDetali,
  //成品布
  getCpb,
  addCpb,
  updateCpb,
  delCpb,
  getCpbDetali,
  addCpbDetali,
  updateCpbDetali,
  delCpbDetali,
  // 化工原料
  getRhl,
  delRhl,
  addRhl,
  updateRhl,
  getRhlDetali,
  addRhlDetali,
  updateRhlDetali,
  delRhlDetali,
  getRhlPh,
  addRhlPhDetali,
  updateRhlPhDetali,
  delRhlPhDetali,
  getRhlLoc,
  addRhlLoc,
  updateRhlLoc,
  delRhlLoc,
  // 顔料
  getYl,
  delYl,
  addYl,
  updateYl,
  getYlDtla,
  addYlDtla,
  updateYlDtla,
  delYlDtla,
  getYlDtlb,
  addYlDtlb,
  updateYlDtlb,
  delYlDtlb,
  getYlLoc,
  addYlLoc,
  updateYlLoc,
  delYlLoc,
  //  生产辅料
  getScfl,
  delScfl,
  updateScfl,
  addScfl,
  getScflDetali,
  addScflDetali,
  updateScflDetali,
  delScflDetali,
  getScflLocList,
  delScflLoc,
  updateScflLoc,
  addScflLoc,
  //  五金
  getWj,
  delWj,
  updateWj,
  addWj,
  getWjDetali,
  addWjDetali,
  updateWjDetali,
  delWjDetali,
  getWjLocList,
  delWjLoc,
  updateWjLoc,
  addWjLoc,
  //  行政
  getXz,
  delXz,
  updateXz,
  addXz,
  getXzDetali,
  addXzDetali,
  updateXzDetali,
  delXzDetali,
  getXzLocList,
  delXzLoc,
  updateXzLoc,
  addXzLoc,
  //  能源
  getRl,
  delRl,
  updateRl,
  addRl,
  getRlDetali,
  addRlDetali,
  updateRlDetali,
  delRlDetali,
  getRlLocList,
  delRlLoc,
  updateRlLoc,
  addRlLoc,
} from "@/api/im/Wk/rc";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import {
  rhl1F,
  rhl1C,
  rhl2C,
  rhl2F,
  sx2C,
  pb2C,
  hgyl2C,
  yl2C,
  cpb2C,
  yjxz2C,
} from "./data";
import {
  getvNostockinYarddeliData,
  getvNostockinCalicodeliData,
  getvNostockinChemicaldeliData,
  getvNostockinDyesadeliData,
  // ------------華麗的分割線
  getChemicalinAlloc,
  addChemicalinAlloc,
  // 五金/行政/辅料入仓分配
  getAccessoriesinAlloc,
  addAccessoriesinAlloc,
  fetchExamineVaild,
} from "./api";
export default {
  name: "",
  components: {
    temDlg: tem,
    ruleDlg: rule,
    choice: choice,
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      data: JSON.parse(localStorage.getItem("imWk")).type.split("_")[0],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      hide: JSON.parse(localStorage.getItem("imWk")).type.split("_")[1],
      formOp: {},
      form: {},
      crudOp: {},
      crud: [],
      detail: {},
      everyThing: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      ruleV: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      isAdd: false,
      addList: [],
      tabs: "tabs1",
      code: "",
      plan: false,
      screenLoading: false,
    };
  },
  watch: {},
  computed: {
    hasAdd(){
      return [this.$t("iaoMng.yl"),this.$t("iaoMng.hgyl")].includes(this.data);
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.everyThing = {
        mainF: rhl1F(this),
        mainC: rhl1C(this),
        code: "whse_in",
      };
      switch (this.data) {
        case this.$t("iaoMng.sx"):
          this.everyThing.get = getSx;
          this.everyThing.del = delSx;
          this.everyThing.update = updateSx;
          this.everyThing.add = addSx;
          this.everyThing.getDetail = getSxDetali;
          this.everyThing.addDetail = addSxDetali;
          this.everyThing.updateDetail = updateSxDetali;
          this.everyThing.delDetail = delSxDetali;
          this.everyThing.sx2C = sx2C(this);
          this.everyThing.getLoc = getSxLoc;
          this.everyThing.addLoc = addSxLoc;
          this.everyThing.delLoc = delSxLoc;
          this.everyThing.updateLoc = updateSxLoc;
          this.everyThing.batchCode = "sx_in_whse";
          break;
        case this.$t("iaoMng.pb"):
          this.everyThing.get = getPb;
          this.everyThing.del = delPb;
          this.everyThing.update = updatePb;
          this.everyThing.add = addPb;
          this.everyThing.getPlan = getvNostockinCalicodeliData;
          this.everyThing.getDetail = getPbDetali;
          this.everyThing.addDetail = addPbDetali;
          this.everyThing.updateDetail = updatePbDetali;
          this.everyThing.delDetail = delPbDetali;
          this.everyThing.sx2C = pb2C(this);
          this.everyThing.getLoc = getPbPh;
          this.everyThing.addLoc = addPbPhDetali;
          this.everyThing.delLoc = delPbPhDetali;
          this.everyThing.updateLoc = updatePbPhDetali;
          this.everyThing.batchCode = "pb_in_whse";
          break;
        case "成品布":
          this.everyThing.get = getCpb;
          this.everyThing.del = delCpb;
          this.everyThing.update = updateCpb;
          this.everyThing.add = addCpb;
          this.everyThing.getDetail = getCpbDetali;
          this.everyThing.addDetail = addCpbDetali;
          this.everyThing.updateDetail = updateCpbDetali;
          this.everyThing.delDetail = delCpbDetali;
          this.everyThing.sx2C = cpb2C(this);
          this.everyThing.batchCode = "cpb_in_whse";
          break;
        case this.$t("choicDlg.wj"):
          this.everyThing.get = getWj;
          this.everyThing.del = delWj;
          this.everyThing.update = updateWj;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.add = addWj;
          this.everyThing.getDetail = getWjDetali;
          this.everyThing.addDetail = addWjDetali;
          this.everyThing.updateDetail = updateWjDetali;
          this.everyThing.delDetail = delWjDetali;
          this.everyThing.getPh = getWjLocList;
          this.everyThing.addPh = addWjLoc;
          this.everyThing.delPh = delWjLoc;
          this.everyThing.updatePh = updateWjLoc;
          this.everyThing.batchCode = "wj_in_whse";
          break;
        case this.$t("choicDlg.xz"):
          this.everyThing.get = getXz;
          this.everyThing.del = delXz;
          this.everyThing.update = updateXz;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.add = addXz;
          this.everyThing.getDetail = getXzDetali;
          this.everyThing.addDetail = addXzDetali;
          this.everyThing.updateDetail = updateXzDetali;
          this.everyThing.delDetail = delXzDetali;
          this.everyThing.getPh = getXzLocList;
          this.everyThing.addPh = addXzLoc;
          this.everyThing.delPh = delXzLoc;
          this.everyThing.updatePh = updateXzLoc;
          this.everyThing.batchCode = "xz_in_whse";
          break;
        case this.$t("choicDlg.rl"):
          this.everyThing.get = getRl;
          this.everyThing.del = delRl;
          this.everyThing.update = updateRl;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.add = addRl;
          this.everyThing.getDetail = getRlDetali;
          this.everyThing.addDetail = addRlDetali;
          this.everyThing.updateDetail = updateRlDetali;
          this.everyThing.delDetail = delRlDetali;
          this.everyThing.getPh = getRlLocList;
          this.everyThing.addPh = addRlLoc;
          this.everyThing.delPh = delRlLoc;
          this.everyThing.updatePh = updateRlLoc;
          this.everyThing.batchCode = "rl_in_whse";
          break;
        case this.$t("choicDlg.scfl"):
          this.everyThing.get = getScfl;
          this.everyThing.del = delScfl;
          this.everyThing.update = updateScfl;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.add = addScfl;
          this.everyThing.getDetail = getScflDetali;
          this.everyThing.addDetail = addScflDetali;
          this.everyThing.updateDetail = updateScflDetali;
          this.everyThing.delDetail = delScflDetali;
          this.everyThing.getPh = getScflLocList;
          this.everyThing.addPh = addScflLoc;
          this.everyThing.delPh = delScflLoc;
          this.everyThing.updatePh = updateScflLoc;
          this.everyThing.batchCode = "scfl_in_whse";
          break;
        case this.$t("iaoMng.hgyl"):
          this.everyThing.get = getRhl;
          this.everyThing.del = delRhl;
          this.everyThing.update = updateRhl;
          this.everyThing.add = addRhl;
          this.everyThing.sx2C = hgyl2C(this);
          this.everyThing.getDetail = getRhlDetali;
          this.everyThing.addDetail = addRhlDetali;
          this.everyThing.updateDetail = updateRhlDetali;
          this.everyThing.delDetail = delRhlDetali;
          this.everyThing.getPh = getRhlPh;
          this.everyThing.addPh = addRhlPhDetali;
          this.everyThing.updatePh = updateRhlPhDetali;
          this.everyThing.delPh = delRhlPhDetali;
          this.everyThing.getLoc = getRhlLoc;
          this.everyThing.addLoc = addRhlLoc;
          this.everyThing.delLoc = delRhlLoc;
          this.everyThing.updateLoc = updateRhlLoc;
          this.everyThing.batchCode = "hgyl_in_whse";
          break;
        case this.$t("iaoMng.yl"):
          this.everyThing.get = getYl;
          this.everyThing.del = delYl;
          this.everyThing.update = updateYl;
          this.everyThing.add = addYl;
          this.everyThing.sx2C = yl2C(this);
          this.everyThing.getDetail = getYlDtla;
          this.everyThing.addDetail = addYlDtla;
          this.everyThing.updateDetail = updateYlDtla;
          this.everyThing.delDetail = delYlDtla;
          this.everyThing.getPh = getYlDtlb;
          this.everyThing.addPh = addYlDtlb;
          this.everyThing.updatePh = updateYlDtlb;
          this.everyThing.delPh = delYlDtlb;
          this.everyThing.getLoc = getYlLoc;
          this.everyThing.addLoc = addYlLoc;
          this.everyThing.delLoc = delYlLoc;
          this.everyThing.updateLoc = updateYlLoc;
          this.everyThing.batchCode = "yl_in_whse";
          break;
        default:
          break;
      }
      this.plan = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }

      let queryD = JSON.parse(JSON.stringify(this.form));
      queryD.yinDate = queryD.yinDate ? queryD.yinDate + " 00:00:00" : "";
      queryD.r_yinDate_r = "%" + queryD.yinDate;
      queryD.yinId = "%" + (queryD.yinId || "");
      this.everyThing
        .get(
          Object.assign(queryD, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            yinType: this.hide,
            dateOrder: true,
            dataSortRules: "yinDate|desc,yinId",
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.changeList = [];
          this.crud = records.records;
          // this.crud.sort((a, b) => {
          //   return (
          //     b.yinId.substring(b.yinId.length - 6) -
          //     a.yinId.substring(a.yinId.length - 6)
          //   );
          // });
          this.crud.forEach((item, index) => {
            item.finStatus = String(item.finStatus);
            item.index = index + 1;
            item.suppId = item.purNo;
            if (this.data === this.$t("iaoMng.yl")) {
              item.suppId = item.deliNo;
            }
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
          if (this.crud.length === 0) {
            this.loading = false;
          }
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    add() {
      this.screenLoading = true;
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        yinType: this.hide,
        yinId: "",
        yinDate: this.getNowTime(),
        yinStatus: "1",
        finStatus: "0",
        stockState: "0",
      };
      baseCodeSupplyEx({ code: this.everyThing.code }).then((res) => {
        data.yinId = res.data.data;
        this.detail = data;
        this.screenLoading = false;
        this.isAdd = true;
        this.dialogVisible = true;
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseFinishedclothinoid &&
        !this.chooseData.whseYarninoid &&
        !this.chooseData.whseCalicoinoid &&
        !this.chooseData.whseChemicalinoid &&
        !this.chooseData.whseDyesalinoid &&
        !this.chooseData.whseAccessoriesinoid &&
        !this.chooseData.energyInId
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle1") +
            this.chooseData.yinId +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .del(
              this.data === this.$t("iaoMng.hgyl")
                ? this.chooseData.whseChemicalinoid
                : this.data === this.$t("iaoMng.sx")
                ? this.chooseData.whseYarninoid
                : this.data === this.$t("iaoMng.pb")
                ? this.chooseData.whseCalicoinoid
                : this.data === this.$t("iaoMng.yl")
                ? this.chooseData.whseDyesalinoid
                : this.data === "成品布"
                ? this.chooseData.whseFinishedclothinoid
                : this.data === this.$t("choicDlg.rl")
                ? this.chooseData.energyInId
                : this.chooseData.whseAccessoriesinoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                this.crud.forEach((item, index) => {
                  item.index = index + 1;
                });
                this.chooseData = {};
                this.page.total = this.crud.length;
                if (this.crud.length > 0) {
                  this.$refs.crud.setCurrentRow(
                    this.crud[this.crud.length - 1]
                  );
                }
                // this.getData();
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
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    Audit(val) {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要审核的数据!");
        return;
      }
      this.$tip
        .cofirm(
          "是否确定审核通过入仓编号为 【 " +
            this.chooseData.yinId +
            " 】的数据",
          this,
          {}
        )
        .then(() => {
          if (this.data === this.$t("iaoMng.sx")) {
            fetchExamineVaild(this.chooseData.whseYarninoid)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$tip.success("审核成功!");
                  this.getData();
                } else {
                  this.$tip.error(res.data.msg);
                }
              })
              .catch((err) => {
                this.$tip.error(err);
              });
          } else {
            this.everyThing
              .update(Object.assign(this.chooseData, { stockState: 1 }))
              .then((res) => {
                if (res.data.code === 200) {
                  this.$tip.success("审核成功!");
                  this.getData();
                } else {
                  this.$tip.error("审核失败!");
                }
              })
              .catch((err) => {
                this.$tip.error(this.$t("public.scsb"));
              });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    close() {
      this.$emit("close");
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("iaoMng.hgylsgcgd")) {
        this.choiceTarget.purNo = val.poNo;
        this.choiceTarget.suppId = val.suppId;
        this.choiceTarget.$suppId = val.suppId;
      }
      if (this.choiceTle === this.$t("choicDlg.xzwfylpl")) {
        this.choiceTarget.factoryId = val.refCode;
        this.choiceTarget.factoryName = val.refCode;
      }
      this.choiceTarget.custId = val.custCode;
      this.choiceTarget.custName = val.custCode;
      this.oldData.$cellEdit = true;
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    refresh() {
      this.getData();
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d}`;
    },
  },
  created() {},
  mounted() {
    // console.log(JSON.parse(localStorage.getItem('imWk')).type.split("_")[1] === "1");
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rc, #rcDetail {
  .formBox {
    margin-bottom: 0px;
  }

  .avue-crud__menu {
    min-height: 5px !important;
    height: 5px !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }

  .el-table__header-wrapper, .el-form-item__label, .el-input--mini {
    font-size: 16px !important;
    // font-weight: 600 !important;
    color: #000;
  }

  // .avue-form__group {
  // background-color: #fff;
  // }

  // .el-table--mini td, .el-table--mini th {
  // padding: 2px 0 !important;
  // }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
}
</style>