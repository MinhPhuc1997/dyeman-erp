<template>
  <view-container title="修改">
    <div class="btnList">
      <el-button type="success" @click="save" :disabled="loading" v-hasPerm="['quality:qtyButtonColumn2:update']">
        {{ this.$t("public.save") }}
      </el-button>
      <el-button type="warning" @click="exit" :disabled="loading" v-hasPerm="['quality:qtyButtonColumn2:update']">
        {{ this.$t("public.close") }}
      </el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
  </view-container>
</template>

<script>
import {editFormOp} from "./data";
import {axiosPut} from "../../im/Wk/cc/actionCloth/api";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";
import {exit} from "shelljs";

export default {
  name: "edit-card",
  props: {
    data: Object
  },
  data() {
    return {
      form: {},
      formOp: editFormOp(this),
      loading: false
    }
  }, methods: {
    async save() {
      delete this.form["packNwLbs"]
      delete this.form["packGwLbs"]
      let result = await axiosPut("/api/proProductFlatCard", SaveParms(this.form, []))
      if (result.data.code == 200) {
        this.reload()
        this.$tip.success(result.data.msg)
      } else {
        this.$tip.error(result.data.msg)
      }
    },
    exit() {
      this.$emit("exit")
    },
    reload() {
      this.$emit("reload")
    },
    init() {
      this.form = this.data
      console.log(this.form)
    }
  }, mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>
