<template>
  <view-container title="%" :loading="wLoading">
    <div class="btnList">
      <el-button type="success" @click="save">{{ $t("public.save") }}</el-button>
      <el-button type="warning" @click="exit">{{ $t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
  </view-container>
</template>

<script>

import {itemForm} from "../src/view/im/Ity/WhseLeftOver/data";

export default {
  name: "item",
  props: {
    isAdd: Boolean,
    detail: Object
  },
  data() {
    return {
      url: "",
      formOp: itemForm(this),
      form: {},
      wLoading: false,
      vatLoading: false,
      options: []

    }
  },
  methods: {
    save() {
      this.wLoading = true;
      this.$refs.form.validate(async (valid, done) => {
        if (valid) {
          try {
            if (!this.audit) {
              this.$tip.warning("Vui lòng nhấn tính toán trước khi lưu lại, 请点下生成才能保存 ")
              this.wLoading = false;
              done();
              return
            }
            // edit data at here
            let data = [];
            let result;
            if (this.isAdd) {
              result = await axiosPostEx(this.url, JSON.stringify(SaveParms(data)))
            } else {
              result = await axiosPutEx(this.url, JSON.stringify(SaveParms(Object.assign(data, {orderId: this.form.orderId}))))
            }
            if (result.data.code == 200) {
              this.$emit("refe")
              this.$tip.success(result.data.msg)
              let mainF = await axiosGet(this.url, {orderId: result.data.data})
              this.form = mainF.data[0]
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
      if (this.isAdd) {
      }
    },
    exit() {
      this.$emit("exit")
    }
  }, mounted() {
    this.initData()
  }
}
</script>
