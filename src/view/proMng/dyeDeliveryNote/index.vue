<template>
  <div id="colorMng">
    <view-container :title="$t('dyeDeliveryNote.title')" :element-loading-text="$t('public.loading')"
                    v-loading="wLoading">
      <div class="btnList">
        <el-button type="primary" @click="add">{{ this.$t("public.add") }}</el-button>
        <el-button type="success" @click="update">{{ this.$t("public.update") }}</el-button>
        <el-button type="danger" @click="del" :disabled="detail.orderState !== 0">{{
            this.$t("public.del")
          }}
        </el-button>
        <el-button type="warning" @click="handleAuditOne(1)" v-if="$store.getters.isSk">生控确认</el-button>

        <el-dropdown style="margin-left: 10px" @command="handleAuditOne">
          <el-button type="warning">
            仓库确认<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="2">仓库备布</el-dropdown-item>
            <el-dropdown-item command="3">备布完成</el-dropdown-item>
            <el-dropdown-item command="4">装车完成</el-dropdown-item>
            <el-dropdown-item command="5">出厂</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown style="margin: 0 10px" @command="outReport">
          <el-button type="primary" @click="outReport('deliveryOrder')">
            {{ $t("public.report") }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="deliveryOrder">{{ $t("dyeDeliveryNote.dropdown1") }}</el-dropdown-item>
            <el-dropdown-item command="deliveryOrderdeis">{{ $t("dyeDeliveryNote.dropdown2") }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container :title="$t('dyeDeliveryNote.title2')">
        <div class="crudBox" style="margin-top: 5px">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                     @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"></avue-crud>
        </div>
      </view-container>
      <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
        <tem-dlg ref="tem" :detail="detail" :isAdd="isAdd" @refresh="query" @close="dialogVisible = false"
                 v-if="dialogVisible"></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import {mainForm, mainCrud} from "./data";
import tem from "./tem";
import {get, del, update} from "./api";
import {queryParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      loading: false,
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      wLoading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      get(queryParms(this.form, ["applicant,outDate"], this.page))
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
        })
        .finally((_) => {
          this.$refs.crud.setCurrentRow();
          this.detail = {};
          this.wLoading = false;
        })
        .catch((e) => {
          this.wLoading = false;
        });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    outReport(url) {
      if (this.detail.orderId) {
        const urlPath = process.env.API_HOST;
        window.open(
          urlPath + "/api/proOutFactOrder/" + url + "?id=" + this.detail.orderId
        );
      } else {
        this.$tip.warning(this.$t("tipLabel.plsCheckOutData"));
      }
    },
    outReportDetail() {
    },
    update() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.warning(this.$tip("public.updateTle")); //"请先选择要修改的数据!"
        return;
      }
      this.isAdd = false;
      this.dialogVisible = true;
    },
    del() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip
        .cofirm(
          this.$t("tipLabel.delCode") +
          this.detail.outCode +
          this.$t("iaoMng.delTle2"),
        )
        .then(() => {
          del(this.detail.orderId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.detail.index - 1, 1);
                this.query();
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
    handleRowDBLClick(row) {
      this.detail = row;
      this.isAdd = false;
      this.dialogVisible = true;
    },
    cellClick(row) {
      this.detail = row;
    },
    handleAuditOne(orderState) {
      if (Object.keys(this.detail).length == 0 || !this.detail.orderId) {
        this.$tip.warning(this.$t("tipLabel.notCheckData"));
        return;
      }
      if (!orderState) {
        this.$tip.warning("数据错误!");
        return;
      }
      this.$tip
        .cofirm(this.$t("tipLabel.auditTle"))
        .then(() => {
          let params = {
            orderId: this.detail.orderId,
            orderState
          }
          update(params).then(res => {
            if (res.data.code == 200) {
              this.$tip.success(this.$t("public.auditSuccess"))
              this.detail.orderState = orderState;
            } else {
              this.$tip.error(this.$t("public.operationFailed"))
            }
          })
        })
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>
<style lang='stylus'></style>
