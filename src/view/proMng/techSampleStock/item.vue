<template>
  <view-container title="布办登记记录" :loading="wLoading">
    <div class="btnList">
      <el-button type="success" @click="save">{{ $t("public.save") }}</el-button>
      <el-button type="warning" @click="exit">{{ $t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form">
        <template slot="vatNo" slot-scope="scope">
          <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                     :remote-method="remoteMethod" :loading="vatLoading">
            <el-option v-for="item in options" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </div>
  </view-container>
</template>

<script>
import Select from "../dyeDeliveryNote/select";
import {axiosGet, axiosPostV1, axiosPut} from "../../im/Wk/cc/actionCloth/api";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";
import {modifyForm} from "./data";

export default {
  name: "item",
  components: {Select},
  props: {
    isAdd: Boolean,
    detail: Object
  },
  data() {
    return {
      url: "/api/techSampleStock",
      formOp: modifyForm(this),
      form: {},
      wLoading: false,
      vatLoading: false,
      options: [],
      optionsPids: []

    }
  },
  methods: {
    save() {
      this.wLoading = true;
      this.$refs.form.validate(async (valid, done) => {
        if (valid) {
          try {
            let result;
            let obj = SaveParms(this.form)
            delete obj["createTime"]
            delete obj["updateTime"]
            if (this.isAdd) {
              let ress = await axiosGet(this.url, {vatNo: this.form.vatNo})
              if (ress.data.length > 0) {
                let noti = await this.$tip.cofirm(this.form.vatNo + " Mã này đã tồn tại bạn chắc chắn muốn tạo mã này không?缸号已存在，是否新增？")
                if (noti == "confirm") {
                  result = await axiosPostV1(this.url, obj)
                }
              } else {
                result = await axiosPostV1(this.url, obj)
              }

            } else {
              result = await axiosPut(this.url, obj)
            }
            if (result.data.code == 200) {
              this.$emit("refe")
              this.$emit("exit")
              this.$tip.success(result.data.msg)
              done();
            } else {
              this.$tip.success(result.data.msg)
            }
            done();
            this.wLoading = false;
          } catch (e) {
            this.$tip.danger(e);
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充报告信息!");
        }
      });
    },
    async initData() {
      if (!this.isAdd) {
        this.form = this.detail
      }
    },
    async remoteMethod(val) {
      this.options = [];
      let res = await axiosGet("/api/proBleadyeRunJob/page", {vatNo: "%" + val, delFlag: 0})
      res.data.records.map((e) => {
        this.options.push({
          vatNo: e.vatNo
        })
      })
    },
    exit() {
      this.$emit("exit")
    }
  }, mounted() {
    this.initData()
  }
}
</script>
