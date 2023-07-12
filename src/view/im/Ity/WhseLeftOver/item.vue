<template>
  <view-container title="多布存仓指令" :loading="wLoading">
    <div class="btnList">

        <el-button type="warning" @click="exit">{{ $t("public.close") }}</el-button>
      <div style="float: right;flex-direction: row;margin-right: 12px">
        <el-switch
          style="margin-top: -1px"
          v-model="checked"
          active-text="连接成功"
          inactive-text="连接失败"
          active-color="#13ce66"
          inactive-color="#ff4949" disabled>
        </el-switch>
      </div>
      <div style="float: right;flex-direction: row;margin-right: 7px">
        <span class="demo-input-label">打印机状态</span>
      </div>
      <div style="float: right;flex-direction: row;margin-right: 12px">
        <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
      </div>
      <div style="float: right;flex-direction: row;margin-right: 7px">
        <span class="demo-input-label">打印张数</span>
      </div>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div style="height: calc(100vh - 400px)">
      <div class="btnList">
        <el-button type="success" @click="audit" :disabled="currentRow.confirmFlag==1" v-hasPerm="['whse:leftOrder:audit']">{{
            $t("public.audit")
          }}
        </el-button>
        <el-button type="primary" @click="print"  :disabled="currentRow.confirmFlag!=1" v-hasPerm="['whse:leftOrder:print']">{{ $t("public.print") }}</el-button>

      </div>
      <el-row>
        <el-col :span="16">
          <view-container title="选布剪布">
            <avue-crud ref="crud1" :option="crudOpLeft" :data="crudLeft" @current-row-change="cellClick"/>
          </view-container>
        </el-col>
        <el-col :span="8">
          <view-container title="剪布之后的结果">
            <avue-crud ref="crud2" :option="crudOpRight" :data="crudRight"/>
          </view-container>
        </el-col>
      </el-row>
    </div>
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
  </view-container>
</template>

<script>
import {itemForm, mainCrud} from "./data.js"

import {mainCrudLeft, mainCrudRight} from "./data";
import Select from "../../../proMng/dyeDeliveryNote/select.vue";
import {axiosGet, axiosPostEx} from "../../Wk/cc/actionCloth/api";

export default {
  name: "item",
  components: {Select},
  props: {
    isAdd: Boolean,
    detail: Object
  },
  data() {
    return {
      formOp: itemForm(this),
      form: {},
      choiceV: false,
      spowerClient: null,
      crudOpLeft: mainCrudLeft(this),
      crudLeft: [],
      crudOpRight: mainCrudRight(this),
      crudRight: [],
      currentRow: {},
      wLoading: false,
      num: 2,
      checked: true
    }
  },
  methods: {
    audit() {
      this.spowerClient = this.$store.state.spowerClient;
      if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
        this.$tip.warning(this.$t('tipLabel.clientError'));
        this.checked = false;
      }
      this.$tip.cofirm("Bạn có chắc muốn cắt vải không?您确定需要审核吗？").then(async () => {
        let result = await axiosPostEx("/api/proLeftOverOrderDtl/cf?id=" + this.currentRow.dtlId, null)
        if (result.data.code == 200) {
          this.$tip.success(result.data.msg)
          this.print(result.data.data);
          this.initData();
        } else {
          this.$tip.error(result.data.msg)
        }
      }).catch(() => {
      })
    },
    print(item) {
      this.spowerClient = this.$store.state.spowerClient;
      if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
        this.$tip.warning(this.$t('tipLabel.clientError'));
        this.checked = false;
        return;
      }
      if (item.cardId == undefined || item.cardId == null) {
        item = this.currentRow
      }
      for (let i = 0; i < this.num; i++) {
        this.spowerClient.send("print=finishCard:" + item.cardId);
        this.spowerClient.send("print=finishCard:" + item.targetCardId);
        if (i == this.num.length - 1) {
          this.$tip.success(this.$t('public.sendPrintTle'));
        }
      }
    },
    cellClick(val) {
      this.currentRow = val;
      this.setDetail(val)
    },
    async initData() {
      if (this.detail.orderId == null) {
        console.error("Không tìm thấy orderid từ bảng chính!")
        this.$tip.warning("Hệ thống bị lỗi không thể nhân diện khóa chính!");
        return;
      }
      let mainF = await axiosGet("/api/proLeftOverOrder", {orderId: this.detail.orderId})
      this.form = mainF.data[0]
      let result = await axiosGet("/api/proLeftOverOrderDtl", {proLeftOverOrderFk: this.detail.orderId})
      this.crudLeft = result.data
      this.crudLeft.map((e, i) => {
          e.index = i + 1;
          e.cutWeight = e.outNw
        }
      );

      this.setDetail(this.crudLeft[0])
      this.$refs.crud1.setCurrentRow(this.crudLeft[0]);
      this.currentRow = this.crudLeft[0]
    },
    exit() {
      this.$emit("exit")
    },
    setDetail(e) {
      this.crudRight = [];
      e.cutWeight = e.outNw;
      if( e.outNw!=null && e.outNw !=0){
        let object1 = {
          netWeight: e.outNw,
          grossWeight: e.outGw,
          netWeightLbs: e.outNwLbs,
          grossWeightLbs: e.outGwLbs,
          vatNo: e.vatNo,
          productNo: e.productNo,
          pidNo: e.pidNo,
          status: 0
        };
        this.crudRight.push(object1)
      }
      let object2 = {
        netWeight: e.leftNw,
        grossWeight: e.leftGwLbs,
        netWeightLbs: e.leftNwLbs,
        grossWeightLbs: e.leftGwLbs,
        vatNo: e.targetVatNo,
        productNo: e.targetVatNo + (e.pidNo.length == 1) ? "00" : "0" + e.pidNo,
        pidNo: e.pidNo,
        status: 1
      };

      this.crudRight.push(object2)
      this.crudRight.map((e, i) => e.index = i + 1)
    }
  },
  mounted() {
    this.spowerClient = this.$store.state.spowerClient;
    if (!this.spowerClient || this.spowerClient.readyState == 3 || this.spowerClient.readyState == 0) {
      this.$tip.warning(this.$t('tipLabel.clientError'));
      this.checked = false;
    }
    this.initData()
  },
}
</script>
