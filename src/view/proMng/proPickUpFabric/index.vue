<template>
  <div>
    <view-container title="抽布申请单资料" :element-loading-text="$t('public.loading')" v-loading="wLoading">
      <div class="btnList">
        <el-button type="primary" @click="handleOpenTem(null)">{{ this.$t("public.add") }}</el-button>
        <template v-if="!disabled">
          <el-button type="success" @click="handleOpenTem(cellCheckData.pickupId)" :disabled="disabled">{{
            this.$t("public.update") }}
          </el-button>
          <el-button type="danger" @click="del" :disabled="disabled">{{ this.$t("public.del") }}</el-button>
        </template>
        <el-button type="primary" @click="outReport('deliveryOrder')"> {{ $t("public.report") }}</el-button>
        <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>

      <div class="crudBox" style="margin-top: 5px">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" @on-load="query"
                   @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"></avue-crud>
      </div>

      <tem-dlg ref="tem" @refresh="query"></tem-dlg>

    </view-container>
  </div>
</template>
<script>
  import {mainForm, mainCrud} from "./data";
  import tem from "./tem";
  import {get, del} from "./api";

  export default {
    components: {
      temDlg: tem,
    },
    data() {
      return {
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
        cellCheckData: {},
        disabled: true
      };
    },
    methods: {
      query() {
        this.wLoading = true;
        get(
          Object.assign({
            rows: this.page.pageSize,
            start: this.page.currentPage,
            pickupCode: "!^%" + (this.form.pickupCode || ""),
            demanDpt: this.form.demanDpt,
            creator: "%" + (this.form.creator || ''),
            pickupDate: this.form.pickupDate,
            demandCause: "%" + (this.form.demandCause || ""),
            vatNo: "%" + (this.form.vatNo || ""),
          })
        )
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
      async handleOpenTem(pickupId) {
        this.$refs.tem.dialogVisible = true;
        await this.$nextTick();
        this.$refs.tem.initData(pickupId);
      },
      outReport() {
        if (this.cellCheckData.pickupId) {
          const urlPath = process.env.API_HOST;
          window.open(
            urlPath + "/api/proPickUpFabric/pdf?id=" + this.cellCheckData.pickupId
          );
        } else {
          this.$tip.warning(this.$t("tipLabel.plsCheckOutData"));
        }
      },
      del() {
        if (!this.cellCheckData.pickupId) {
          this.$tip.error(this.$t("public.delTle"));
          return;
        }
        this.$tip
          .cofirm(this.$t("tipLabel.delCode") + this.cellCheckData.pickupCode + this.$t("iaoMng.delTle2"))
          .then(() => {
            del(this.cellCheckData.pickupId)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$tip.success(this.$t("public.sccg"));
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
        this.cellCheckData = row;
        this.handleOpenTem(row.pickupId);
      },
      cellClick(row) {
        console.log(row)
        this.cellCheckData = row;
      },
      permission() {
        if (parent.userID == "ADMIN" || parent.userID == "liuyas") {
          this.disabled = false;
        }
      }
    },
    created() {
    },
    mounted() {
      this.permission();
    },
    beforeDestroy() {
    },
  };
</script>
<style lang='stylus'></style>
