<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false"
               :close-on-press-escape="false">
      <view-container title="抽布申请单资料维护" :element-loading-text="$t('public.loading')" v-loading="wLoading">

        <div class="btnList">
          <template v-if="!disabled">
            <el-button type="success" @click="handleSubmitData">{{ this.$t("public.save") }}</el-button>
          </template>
          <el-button type="primary" @click="handleAddCloth"> 选择成品布</el-button>
          <el-button type="warning" @click="dialogVisible = false">{{ this.$t("public.close") }}</el-button>
          <template v-if="form.pickupCode">
            <el-button type="primary" @click="outReport('deliveryOrder')"> {{ $t("public.report") }}</el-button>
          </template>
        </div>

        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="vatNo">
            <el-select v-model="form.vatNo" filterable remote :placeholder="$t('tipLabel.inputVatNo')"
                       :remote-method="remoteMethod" :loading="serachLoading" @change="handleVatNoChange">
              <el-option v-for="item in options" :key="item.runJobId" :label="item.vatNo" :value="item.vatNo">
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope" slot="demandCause">
            <el-select v-model="form.demandCause" @change="handleCause">
              <el-option label="抽布返修-Rút vải sửa chữa lại" value="抽布返修-Rút vải sửa chữa lại"/>
              <el-option label="剪办-Cắt mẫu" value="剪办-Cắt mẫu"/>
              <el-option label="抽布复查-Rút vải kiểm tra" value="抽布复查-Rút vải kiểm tra"/>
              <el-option label="抽布改染/合缸-Rút vải sửa nhộm/hợp đơn" value="抽布改染/合缸-Rút vải sửa nhộm/hợp đơn"/>
              <el-option label="抽布改PO-Rút vải đổi PO" value="抽布改PO-Rút vải đổi PO"/>
            </el-select>
          </template>

        </avue-form>

        <el-row class="crudBox" style="margin-top: 5px">
          <el-col :span="24">
            <avue-crud ref="vatcrud" :option="crudOp" :data="form.fabricDtls" :page.sync="page" v-loading="wLoading"
                       @row-del="rowDel" @row-click="cellClick"></avue-crud>
          </el-col>
        </el-row>

      </view-container>
    </el-dialog>
    <finished-cloth-stock ref="finishedStock" @selectionChange="selectionChange"/>
  </div>

</template>
<script>
import {mainCrud, finishedCrud} from "./data";
import {saveProPickUpFabricData, get, fetchQcCheckoutFabricData, fetchWhseShotVatNoData} from "./api";
import finishedClothStock from "./finishedClothStock.vue";
import {axiosGet} from "../../im/Wk/cc/actionCloth/api";

export default {
  name: "",
  props: {},
  components: {
    finishedClothStock
  },
  data() {
    return {
      dialogVisible: false,
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      crudOp: finishedCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      // 缸号
      serachLoading: false,
      options: [],
      disabled: true
    };
  },
  watch: {},
  methods: {
    async initData(pickupId) {
      this.wLoading = true;
      this.crud = [];
      this.form = {};
      if (pickupId) {

        get({rows: 1, start: 1, pickupId}).then((res) => {
          !res.data.total && (this.dialogVisible = false, this.$tip.warning("数据错误!"));
          this.form = res.data.records[0];
          this.crud = this.form.fabricDtls || [];

          this.handleCause(true);
        }).finally(_ => {
          this.wLoading = false;
        })
      } else {
        this.disabled = false;
        this.$refs.form.resetForm();
        let res = await axiosGet("/api/ucmlOrganize/loginOrg", {account: parent.userID})
        this.form.demanDpt = res.data.ucmlOrganizeoid
        await this.$nextTick();
        this.form = {
          pickupCode: '',
          pickupDate: this.$getNowTime("date") + ' 00:00:00',
          creator: this.$store.state.userOid,
          recieveTime: this.$getNowTime("date") + ' 00:00:00',
          fabricDtls: [],
          pickupId: ''
        };
        this.wLoading = false;
      }
    },
    handleCause() {
      let len = this.crudOp.column.length;
      if (this.form.demandCause === "剪办-Cắt mẫu" && len === 7) {
        this.crudOp.column.push({label: "剪办数量", prop: "cutAmount", width: 300, overHidden: true, cell: true,})
        this.crudOp.column.push({label: "剪办原因", prop: "cutReason", width: 400, overHidden: true, cell: true,})
      }
      if (this.form.demandCause !== "剪办-Cắt mẫu" && len !== 7) {
        this.crudOp.column = this.crudOp.column.slice(0, 7)
      }
    },
    outReport() {
      if (this.form.pickupCode) {
        const urlPath = process.env.API_HOST;
        window.open(
          urlPath + "/api/proPickUpFabric/pdf?id=" + this.form.pickupId
        );
      } else {
        this.$tip.warning(this.$t("tipLabel.plsCheckOutData"));
      }
    },
    cellClick(val) {
      if (this.form.demandCause === "剪办-Cắt mẫu") {
        this.form.fabricDtls.map((e) => {
          if (e.productNo !== val.productNo) {
            e.$cellEdit = false
          } else {
            e.$cellEdit = true
          }
        })
      }
    },
    addUpdate(form, index, done, loading) {
      this.$message.success('模拟网络请求')
      setTimeout(() => {
        this.$message.success('关闭按钮等待')
        loading()
      }, 1000)
      setTimeout(() => {
        this.$message.success(
          '编辑数据' + JSON.stringify(form) + '数据序号' + index
        )
        done()
      }, 2000)
    },
    handleSubmitData() {
      if (!this.form.fabricDtls.length) return this.$tip.warning("请先选择要抽取的成品布!");
      if (this.form.demandCause === "剪办-Cắt mẫu") {
        let index = this.form.fabricDtls.findIndex(e => {
          return e.cutAmount == null || e.cutAmount == undefined
        });
        if (index != -1) {
          return this.$tip.warning("剪办数量不能为空!");
        }
      }
      this.$refs.form.validate(async (valid, done) => {
        this.wLoading = true;
        if (valid) {
          try {
            if (this.form.reciveStaff == "") {
              delete this.form.reciveStaff
            }
            if (this.form.dptAuditor == "") {
              delete this.form.reciveStaff
            }
            saveProPickUpFabricData(this.form).then((res) => {
              if (res.data.code == 200) {
                let {pickupCode, pickupId} = res.data.data;
                this.form.pickupCode = pickupCode;
                this.form.pickupId = pickupId;
                this.$emit("refresh");
                this.$tip.success(this.$t("public.bccg"));
              } else {
                this.$tip.error(this.$t('public.bcsb' + res.data.msg));
              }
            })
              .catch((err) => {
                this.$tip.error(this.$t("public.bcsb") + err);
              })
              .finally(_ => {
                setTimeout(() => {
                  done();
                  this.wLoading = false;
                }, 200);
              })
          } catch (error) {
            done();
            this.wLoading = false;
            this.$tip.error(error)
          }
        } else {
          this.wLoading = false;
          this.$tip.warning("请补充申请单信息!");
        }
      });
    },
    handleAddCloth() {
      if (!this.form.vatNo) return this.$tip.warning("请先选择缸号!");
      this.$refs.finishedStock.initData(this.form.vatNo);
    },
    selectionChange(list) {
      if (!list || !list.length) return;
      this.wLoading = true;
      this.form.fabricDtls = this.$unique(this.form.fabricDtls.concat(list), "cardId").sort((a, b) => a.pidNo - b.pidNo);
      this.form.netWeight = 0;
      this.form.netWeightLbs = 0;
      this.form.fabLength = 0;
      this.form.fabricDtls.forEach(item => {
        this.form.netWeight = Number(item.netWeight+this.form.netWeight ).toFixed(1);
        this.form.netWeightLbs =Number(item.netWeightLbs+this.form.netWeightLbs ).toFixed(1);
        this.form.fabLength =Number(item.yardLength+this.form.yardLength ).toFixed(1);
      })
      this.wLoading = false;
    },
    rowDel(row, index) {
      this.form.fabricDtls.splice(index, 1);
    },
    remoteMethod(val) {

      fetchWhseShotVatNoData({
        vatNo: val + "%",
      })
        .then((res) => {
          this.options = res.data.records;
        })
        .finally(() => {
          this.vatLoading = false;
        });
    },
    handleVatNoChange(val) {
      this.wLoading = true
      fetchQcCheckoutFabricData({vatNo: val, rows: 10, start: 1, page: 1, whseVouch: 9})
        .then((res) => {
          let {records, total} = res.data;
          if (!total) return;
          this.form.colorName = records[0].colorName;
          this.form.fabName = records[0].fabricName;
        })
        .finally(_ => {
          this.wLoading = false;
        });
    },
    permission() {
      if (parent.userID == "ADMIN" || parent.userID == "liuyas") {
        this.disabled = false;
      }
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.crud) {
        this.$refs["vatcrud"].doLayout();
      }
    });

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
