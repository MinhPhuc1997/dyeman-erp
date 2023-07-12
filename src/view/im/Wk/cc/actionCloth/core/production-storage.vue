<template>
  <view-container title="选择入库单 Chọn đơn nhập kho">
    <el-row>
      <el-col :span="9">
        <div class="formBox" style="padding: 8px;margin-right: 20px" >
          <avue-form ref="form" :option="formOp" v-model="form">
            <template slot="vatNo" slot-scope="scope">
              <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                         placeholder="输入缸号" :remote-method="remoteMethodVat" :loading="vatLoading" @change="query">
                <el-option v-for="item in optionsVat" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
                </el-option>
              </el-select>
            </template>
          </avue-form>
        </div>
        <div class="crudBox" style="padding: 5px;margin-right: -10px" >
          <avue-crud ref="form" :option="crudErrorOp" :data="crudError"/>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="btnCenter" style="margin-left: 13px;margin-right: 10px">
          <avue-form ref="form" :option="formOp1" v-model="form1"/>
        </div>
        <div class="crudBox" style="padding: 8px">
          <avue-crud ref="form" :option="crudOp" :data="crud"/>
        </div>
        <div style="margin-left: 15px">
          <p style="color:red;"><b>Chú ý: </b></p>
          <p>Vui lòng chú ý đến  <b>phiên bản của bản in</b> với <b>phiên bản mới nhất</b> của hệ thống</p>
          <p>Nếu số phiên bản không khớp vui lòng liên QC để in lại phiên bản mới nhất</p>
        </div>
        <div class="btnCenter" style="margin-top: 50px">
          <el-button type="success" :disabled="!status" @click="save">     同意-Đồng ý     </el-button>
        </div>
      </el-col>
    </el-row>
  </view-container>
</template>

<script>
import {
  _pro_storage_crudop_detail,
  _pro_storage_crudop_result,
  _pro_storage_crudop_ss,
  _pro_storage_op,
  _pro_storage_op1
} from "../data";
import {checkResultPage, checkStatus, resultCompare, resultDetail, totalData} from "../process";
import {API, axiosGet} from "../api";

export default {
  name: "Production-storage",
  data() {
    return {
      formOp: _pro_storage_op(this),
      formOp1: _pro_storage_op1(this),
      form1: {},
      crudOp: _pro_storage_crudop_ss(this),
      crudErrorOp: _pro_storage_crudop_result(this),
      crudError: [],
      crudErrorDetailOp: _pro_storage_crudop_detail(this),
      crudErrorDetail: [],
      form: {},
      crud: [
        {
          tableName: "成品布台账",
          pidCount: 0,
          sumWeight: 0,
          sumWeightLbs: 0,
          sumLength: 0
        },
        {
          tableName: "QC入仓明细表",
          pidCount: 0,
          sumWeight: 0,
          sumWeightLbs: 0,
          sumLength: 0
        },
        {
          tableName: "对比结果",
          pidCount: "",
          sumWeight: "",
          sumWeightLbs: "",
          sumLength: "",

        }
      ],
      status: false,
      vatLoading: false,
      optionsVat: []
    }
  }, methods: {
    async query() {

      let importTable = await axiosGet(API.qcCheckoutFabricpage, {vatNo: this.form.vatNo});
      if (importTable.data.records.length==1 ) {
        this.form1 = importTable.data.records[0];
      }
      let ledgerTable = await axiosGet(API.proFinalProductCard, {vatNo: this.form.vatNo,degFlag:0,cardType:1});

      this.crud[0].sumWeight = totalData(ledgerTable.data).sumWeight.toFixed(2);
      this.crud[0].sumWeightLbs = totalData(ledgerTable.data).sumWeightLbs.toFixed(2);
      this.crud[0].sumLength = totalData(ledgerTable.data).sumLength.toFixed(2);
      this.crud[0].pidCount = totalData(ledgerTable.data).pidCount;

      this.crud[1].sumWeight = totalData(importTable.data.records[0].fabricDtls).sumWeight.toFixed(2);
      this.crud[1].sumWeightLbs = totalData(importTable.data.records[0].fabricDtls).sumWeightLbs.toFixed(2);
      this.crud[1].sumLength = totalData(importTable.data.records[0].fabricDtls).sumLength.toFixed(2);
      this.crud[1].pidCount = totalData(importTable.data.records[0].fabricDtls).pidCount;

      resultCompare(this.crud);
      this.crudError = importTable.data.records[0].fabricDtls //resultDetail(importTable.data,ledgerTable.data);
      this.crudError.sort((a, b) => {
        return a.pidNo > b.pidNo ? 1 : -1
      })
      this.crudError.map((e, i) => e.index = i + 1);
      this.status = checkStatus(this.crud[2])

    },
    async remoteMethodVat(val) {
      this.vatLoading = true;
      let result = await axiosGet(API.qcCheckoutFabricpage, {vatNo: "%" + val});
      let data = checkResultPage(result);
      if (!data.success) {
        this.$tip.warning(data.msg);
      }
      let arr = [];
      data.records.map((e, i) => {
        if (arr.findIndex((item) => item.vatNo === e.vatNo) === -1) {
          arr.push(e)
        }
      })
      this.optionsVat = arr;
      this.vatLoading = false;
    },
    save() {
      let data = this.form1.storeCodes.toUpperCase().trim();
      this.crudError.map((e, i) => {
        if (this.form1.storeCodes.length === 5 && this.form1.storeCodes.charAt(0).toUpperCase() === "A") {
          e.storeLoad = data;
        } else {
          e.storeLocal = data;
        }
      })
      this.$emit("save",this.crudError)
    }
  }
}
</script>

<style scoped>
.btnCenter {
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  justify-items: center;

}
</style>
