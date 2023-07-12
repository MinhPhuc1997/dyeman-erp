<template>
  <view-container title="外发加工胚布出仓">
    <div class="btnList" style="margin-left: 12px">
      <el-button type="success" @click="updEntity" :disabled="!isAdd&& detail.audit==1">{{
          $t('public.save')
        }}
      </el-button>
      <el-button type="warning" @click="closeScreen">{{ $t('public.close') }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form">
        <template slot="weaveJobCode" slot-scope="scope">
          <el-select v-model="form.weaveJobCode" filterable remote reserve-keyword clearable default-first-option
                     @change="change"
                     :remote-method="remoteMethod" :loading="vatLoading">
            <el-option v-for="item in options" :key="item.weaveJobCode" :label="item.weaveJobCode"
                       :value="item.weaveJobCode">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </div>
    <div class="btnList" style="margin-left: 12px;margin-top: 10px">
      <el-button type="primary" @click="newEntity" :disabled="!form.weaveJobCode.length||!isAdd&&detail.audit==1">{{
          $t('public.add')
        }}
      </el-button>
      <el-button type="danger" @click="delEntity" :disabled="!crud.length||!isAdd&&detail.audit==1">{{
          $t('public.close')
        }}
      </el-button>
    </div>
    <div class="crudBox">
      <avue-crud ref="crud"
                 :option="crudOp"
                 :data="crud"
                 :page.sync="page"
                 v-loading="loading"
                 @on-load="qryEntity"
                 @row-click="rowClick"
                 @row-dblclick="rowDbClick"/>
    </div>
    <el-dialog id="item" :visible.sync="dialogVisible" width="70%" append-to-body top="5vh"
               :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
      <Select ref="tem" :detail="form.weaveJobCode" :isAdd="isAdd" @refresh="qryEntity" @close="dialogVisible = false"
              v-if="dialogVisible" @exit="dialogVisible=false" @refe="qryEntity" @selected="choice"
      ></Select>
    </el-dialog>
  </view-container>
</template>

<script>
import {itemCrud, itemForm, mainCrud, mainForm} from "./data";
import Select from "./select.vue"
import {axiosDel, axiosGet, axiosPostEx, axiosPostV1, axiosPut, axiosPutEx} from "../actionCloth/api";

export default {
  name: "index",
  props: {
    isAdd: Boolean,
    detail: Object
  },
  components: {
    Select
  },
  data() {
    return {
      formOp: itemForm(this),
      form: {
        weaveJobCode: ""
      },
      page: {},
      crud: [],
      crudOp: itemCrud(this),
      loading: false,
      dialogVisible: false,
      currentRow: {},
      options: [],
      vatLoading: false,
      newUpdate: []
    }
  },
  methods: {
    choice(val) {
      val.map((e) => {
        if (this.crud.findIndex((item) => item.noteCode == e.noteCode) == -1) {
          this.crud.push(e)
        }
      });
      this.dialogVisible = false
      this.crud.map((e, i) => {
        e.index = i + 1;
        e.$cellEdit = true
      })
      this.$refs.crud.setCurrentRow(this.crud[0]);
      this.currentRow = this.crud[0];
    },
    async qryEntity() {
      //   let res = await axiosGet("",queryParmsEx(this.form,"","",this.page));
    },
    newEntity() {
      this.dialogVisible = true
    },
    async remoteMethod(val) {
      let res = await axiosGet("/api/proWeaveJob/page", {weaveJobCode: "%OWG%" + val})
      this.options = res.data.records;
    },
    change(val) {
      this.form.fabName = this.options[this.options.findIndex((e) => e.weaveJobCode == val)].fabricDesc;
      this.form.fromCompany = "S.POWER(VIETNAM) TEXTILE LIMITED";
    },
    closeScreen() {
      this.$emit("close")
    },
    async updEntity() {
      this.$refs.form.validate(async (valid, done) => {
        if (valid) {
          // thêm ở đây!
          if (this.isAdd) {
            let res = await axiosPostV1("/api/whseOutClothNote", this.form);
            if (res.data.data != null) {
              let arr = [];
              this.crud.map((e) => {
                const {clothWeight, noteCode, proName, remarks, weightUnit} = e
                arr.push({
                  clothWeight, noteCode, proName, remarks, weightUnit, outIdFk: res.data.data
                })
              })
              this.refeshData(res.data.data);
              if (arr.length == 0) {
                this.$tip.success(res.data.msg);
              } else {
                let res = await axiosPostEx("/api/whseOutClothNoteDtl/add", JSON.stringify(arr))
                if (res.data.code == 200) {
                  this.$tip.success(res.data.msg);
                } else {
                  this.$tip.danger(res.data.msg);
                }
              }
            }
          }else{
            let arr = [];
            this.crud.map((e) => {
              const {clothWeight, noteCode, proName, remarks, weightUnit,dtlId} = e
              arr.push({ clothWeight, noteCode, proName, remarks, weightUnit, outIdFk: this.form.outId,dtlId:dtlId })
            })
            let res = await axiosPut("/api/whseOutClothNote", this.form);
            if (res.data.data != null) {
              if (arr.length == 0) {
                this.$tip.success(res.data.msg);
              } else {
                let res = await axiosPutEx("/api/whseOutClothNoteDtl/batchUp", JSON.stringify(arr))
                if (res.data.code == 200) {
                  this.$tip.success(res.data.msg);
                } else {
                  this.$tip.danger(res.data.msg);
                }
              }
            }
          }
          this.$emit("refresh")
        }
        try {
          done(() => {
          });
        } catch (e) {
        }
      });

    },
    async delEntity() {
      this.crud = this.crud.filter((e) => e.index != this.currentRow.index)
      this.crud.map((e, i) => {
        e.index = i + 1
      })
      this.$refs.crud.setCurrentRow(this.crud[0]);
      this.currentRow = this.crud[0];
    },
    async refeshData(id) {
      try {
        let res = await axiosGet("/api/whseOutClothNote", {outId: id});
        this.form.outWorkCode = res.data[0].outWorkCode
      } catch (e) {
        console.error(e)
      }
    },
    rowClick(val) {
      this.currentRow = val;
    },
    rowDbClick(val) {
      this.currentRow = val;
      this.dialogVisible = true
    },
    async initData() {
      if (!this.isAdd) {
        this.form = this.detail;
        let res = await axiosGet("/api/whseOutClothNoteDtl/vwhse", {outIdFk: this.detail.outId, rows: 2000});
        this.crud = res.data.records;
        this.crud.map((e, i) => {
          e.index = i + 1;
          e.$cellEdit = true;
        })
      } else {

        setTimeout(async () => {
          let res = await axiosGet("/api/ucmlUser", {usrLogin: parent.userID || "ADMIN"})
          console.log(res.data)
          this.form.creator = res.data[0].employeename;
          this.form.createTime = this.$getNowTime("datetime");
        }, 300)
      }
    }
  }, mounted() {
    this.initData();
  }
}
</script>
