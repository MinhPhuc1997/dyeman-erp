<template>
  <view-container title="外发纱线出库明细">
    <div class="btnList">
      <el-button type="primary" :disabled="!chooseData.length" @click="save">{{ this.$t("public.choose") }}</el-button>
      <el-button type="warning" @click="close">{{ this.$t("public.close") }}</el-button>
    </div>
    <div>
      <el-row class="formBox">
        <avue-form ref="form" :option="fomOp" v-model="form">
          <template slot="proWeaveJobFk" slot-scope="scope">
            <el-select v-model="form.proWeaveJobFk" filterable remote reserve-keyword clearable default-first-option
                       placeholder="输入缸号" :remote-method="remoteProWeaveJob" @change="changeSelect">
              <el-option v-for="item in options" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </el-row>
    </div>
    <div style="margin-top: 15px">
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          v-loading="loading"
          @selection-change="selection"
        ></avue-crud>
      </el-row>
    </div>
  </view-container>
</template>

<script>
import {_YarnSelectCrud, _YarnSelectForm} from "./data";
import {axiosGet} from "../../Wk/cc/actionCloth/api";

export default {
  name: "Select",
  data() {
    return {
      fomOp: _YarnSelectForm(this),
      form: {},
      crudOp: _YarnSelectCrud(this),
      crud: [],
      loading: false,
      visiable: false,
      options: [],
      chooseData: [],
    }
  }, methods: {
    async remoteProWeaveJob(val) {
      let uri = "/api/proWeaveJob/page";
      let result = await axiosGet(uri, {weaveJobCode: "%" + val})
      let arr = [];
      result.data.records.map((e, i) => {
        arr.push({
          value: e.weaveJobId,
          label: e.weaveJobCode
        })
      })
      this.options = arr;
    }, async changeSelect(val) {
      let uri = "/api/proWeaveJobYarnallot/jobId"
      let result = await axiosGet(uri, {jobId: val})
      this.crud = result.data
      this.crud.map((e, i) => e.index = i + 1);
    },
    selection(val) {
      this.chooseData = val
    },
    async save() {
      let arr = []
      let uri = "/api/proWeaveJob"
      let result = await axiosGet(uri, {weaveJobId: this.form.proWeaveJobFk})
      this.chooseData.map((e, _) => {
        arr.push({
          jobYarnId: e.useYarnId,
          weaveJobCode: result.data[0].weaveJobCode,
          yarnName: e.yarnName,
          factBatchNo: e.factoryYarnBatch,
          batchNo: e.yarnBatch,
          unit: e.unit,
          yarnAmount: e.realAmount,
          boxCount:1
        })
      })
      this.$emit("choose", arr)
    },
    close() {
      this.$emit("close")
    }
  }
}

</script>

<style scoped>

</style>


