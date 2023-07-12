<script src="data.js"></script>
<template>
  <view-container title="外发纱线出库明细">
    <div class="btnList">
      <el-button type="success" v-hasPerm="['whse:yarn_outgoing:edit']" @click="save">{{
          this.$t("public.save")
        }}
      </el-button>
      <el-button type="primary" v-hasPerm="['whse:yarn_outgoing:edit']" @click="visiable=true">{{
          this.$t("public.add")
        }}纱线
      </el-button>
      <el-button type="danger" @click="rowDelete1" :disabled="currentRow.index==null">{{
          this.$t("public.del")
        }}纱线
      </el-button>
      <el-button type="primary" v-hasPerm="['whse:yarn_outgoing:pdf']" :disabled="form.outId==null" @click="openPDF">{{
          this.$t("public.report")
        }}
      </el-button>
      <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}
      </el-button>
    </div>
    <div>
      <el-row class="formBox">
        <avue-form ref="form" :option="fomOp" v-model="form"/>
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
          @current-row-change="cellClick"
          @row-dblclick="cellDBClick"
          @row-del="rowDelete"
        ></avue-crud>
      </el-row>
    </div>
    <el-dialog
      id="addNewRecord"
      :visible.sync="visiable"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
      v-if="visiable">
      <Select @close="visiable=false" @choose="chooseData"/>
    </el-dialog>
  </view-container>
</template>

<script>
import {_YarnOutGoingDetail, _YarnOutGoingDetailCrud} from "./data";
import {axiosGet, axiosPostEx, axiosPutEx, axiosPut} from "../../Wk/cc/actionCloth/api";
import Select from "./Select";
import {SaveParms} from "../../Wk/cc/actionCloth/process";


export default {
  name: "modify",
  components: {
    Select
  },
  props: {
    data: Object,
    new: Boolean
  },
  data() {
    return {
      fomOp: _YarnOutGoingDetail(this),
      form: {},
      crudOp: _YarnOutGoingDetailCrud(this),
      crud: [],
      loading: false,
      visiable: false,
      currentRow: {}
    }
  }, methods: {
    async initData() {
      this.loading = true;
      let uri = "/api/whseYarnOutgoingDtl"
      if (!this.new) {
        this.form = this.data
        let result = await axiosGet(uri, {outId: this.form.outId})
        this.crud = result.data
        if (this.crud.length > 0) {
          this.crud.map((e, i) => e.index = i + 1);
          this.currentRow = this.crud[0]
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
      }else{
        let arr ={
          outDate:this.$getNowTime("datetime"),
        }
        this.form=arr
      }
      this.loading = false;
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          if (this.crud.length == 0) {
            this.$tip.info("Vui lòng chọn chỉ xuất kho, 请选择纱线出库");
            return;
          }
          for (let i = 0; i < this.crud.length; i++) {
            let item = this.crud[i];
            if (item.boxCount == null ) {
              this.$tip.warning("Vui lòng điền đầy đủ các thông số, 箱数,数量不能为空");
              return ;
            }
            if (item.yarnAmount == 0 ) {
              this.$tip.warning("Không tìm thấy trọng lượng yêu cầu theo đơn dệt vãi, 请检查数量");
              return ;
            }
          }
          this.$tip.cofirm("Bạn có chắc chắn muốn lưu lại không? ,您确认需要保存吗？").then(async () => {
            let uri = "/api/whseYarnOutgoing"
            let detail = this.crud.map((e) => SaveParms(e))
            this.form.dtls = detail;
            let result;
            if (this.form.outId == null) {
              result = await axiosPostEx(uri, JSON.stringify(SaveParms(this.form)))
            } else {
              result = await axiosPutEx(uri, SaveParms(this.form))
            }
            if (result.data.code == 200) {
              this.$tip.success(result.data.msg)
              let uris = "/api/whseYarnOutgoing"
              let newLoad = await axiosGet(uris, {outId: result.data.data})
              this.form = newLoad.data[0]
            } else {
              this.$tip.danger(result.data.msg)
            }
          }).catch();
        } else {
          this.$tip.error("请补充报告信息!");
        }
      })
    },
    rowDelete(val) {
      this.$tip.cofirm("Bạn có chắc chắn muốn xóa? ,您确认需要删除吗？").then(() => {
        this.crud.splice(val.index - 1, 1)
        if (this.crud.length > 0) {
          this.crud.map((e, i) => e.index = i + 1);
          this.currentRow = this.crud[0]
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
      }).catch(() => {
      })
    },
    rowDelete1() {
      this.$tip.cofirm("Bạn có chắc chắn muốn xóa? ,您确认需要删除吗？").then(() => {
        this.crud.splice(this.currentRow.index - 1, 1)
        if (this.crud.length > 0) {
          this.crud.map((e, i) => e.index = i + 1);
          this.currentRow = this.crud[0]
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
      }).catch(() => {
      })

    },
    openPDF() {
      let uri = "http://192.168.5.1:91/api/whseYarnOutgoing/pdf?id="
      window.open(uri + this.form.outId)
    },
    chooseData(val) {
      val.map((e, i) => {
        this.crud.push(e)
      })
      this.crud.map((e, i) => {
        e.$cellEdit = true,
          e.index = i + 1;
      });
      this.visiable = false;
    },
    cellClick(val) {
      this.currentRow = val;
      this.crud.map((e, i) => {
        e.$cellEdit = false
      });
      val.$cellEdit = true
    },
    cellDBClick() {

    },
    close() {
      this.$emit("close")
    }
  }, mounted() {
    this.initData();
  }
}
</script>

<style scoped>

</style>
