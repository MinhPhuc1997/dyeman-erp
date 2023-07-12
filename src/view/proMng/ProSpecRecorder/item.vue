<template>
  <view-container title="规格资料记录" :loading="wLoading">
    <div class="btnList">
      <el-button type="success" @click="save">{{ $t("public.save") }}</el-button>
      <el-button type="warning" @click="exit">{{ $t("public.close") }}</el-button>
    </div>
    <div>
      <el-row>
        <el-col :span="6">
          <view-container title="规格资料记录">
            <el-tree
              :data="data"
              :props="defaultProps"
              default-expand-all
              show-checkbox
              @node-click="handleCheckChange">
            </el-tree>
          </view-container>
        </el-col>
        <el-col :span="18" >
            <div class="formBox" style="height: 510px;">
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
        </el-col>
      </el-row>
    </div>
  </view-container>
</template>

<script>

import {itemForm} from "./data";
import {axiosGet, axiosPostEx, axiosPostV1, axiosPut, axiosPutEx} from "../../im/Wk/cc/actionCloth/api";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";

export default {
  name: "item",
  props: {
    isAdd: Boolean,
    detail: Object
  },
  data() {
    return {
      url: "/api/proSpecRecorder",
      formOp: itemForm(this),
      form: {},
      wLoading: false,
      vatLoading: false,
      options: [],
      data: [],
      specStepFk:"",
      defaultProps: {
        children: 'children',
        label: 'label',
        disabled: 'disabled',
      },
    }
  },
  methods: {
    save() {
      this.wLoading = true;
      this.$refs.form.validate(async (valid, done) => {
        if (valid) {
          try {
            let result;
            if (this.isAdd) {
              result = await axiosPostV1(this.url, (SaveParms({...this.form,specStepFk:this.specStepFk})))
            } else {
              result = await axiosPut(this.url, SaveParms(this.form))
            }
            if (result.data.code == 200) {
              this.$emit("refe")
              this.$tip.success(result.data.msg)
              let mainF = await axiosGet(this.url, {specRecId: result.data.data})
              this.form = mainF.data[0]
              done();
            } else {
              this.$tip.success(result.data.msg)
              done();
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
      this.getTree();
      if (!this.isAdd) {
        this.form = this.detail
      }
    },
    handleCheckChange(val) {
      if (val.children == null) {
        console.log(val)
        this.specStepFk=val.id
      }
    },
    async getTree() {
      const res = await axiosGet("/api/proSpecRecorder/tree");

      this.data = this.convertDataToTree(res.data,true)
      res.data.map((e) => {
        if (e.specSteps != null) {
          this.data[this.data.findIndex((item) => item.label == e.groupName)].children = this.convertDataToTree(e.specSteps,false)
        }
      })
    },
    convertDataToTree(data,sort) {
      let arr = []
      if(sort){
        data.sort((a, b) => {
          return a.groupSn > b.groupSn ? -1 : 1
        })
      }
      data.map((e, i) => {
        arr.push({
          id: (e.stepCode != null) ? e.stepCode : 1,
          label: e.stepDesc != null ? e.stepDesc : e.groupName,
        })
      })
      return arr;
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

