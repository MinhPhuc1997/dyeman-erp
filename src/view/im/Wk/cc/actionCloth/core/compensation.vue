<template>
  <view-container title="数据补偿">
    <div class="btnList">
      <el-button type="primary" plain @click="checkData"> 检查数据</el-button>
      <el-button type="success" plain @click="save"> 保存</el-button>
    </div>
    <div class="">
      <avue-form ref="form" :option="fomOp" v-model="form">
        <template slot="actionCause" slot-scope="scope">
          <el-select v-model="form.actionCause" filterable remote reserve-keyword clearable default-first-option
                     placeholder="输入缸号">
            <el-option v-for="item in optionsActionCause" :key="item.actionCause" :label="item.causeName"
                       :value="item.actionCause">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </div>
    <avue-crud
      ref="crud" :option="crudOp" :data="crud"
    ></avue-crud>
  </view-container>

</template>

<script>
import {_compensation, _fomOp, _queryForm} from "../data";
import {API, axiosGet, axiosPost} from "../api";

export default {
  name: "compensation",
  props: {
    data: Array,
  },
  data() {
    return {
      crudOp: _compensation(this),
      crud: [],
      fomOp: _queryForm(this),
      form: {},
      optionsActionCause: []
    }
  }, methods: {
    initData() {
      this.crud = this.data;
      this.crud.map((e, i) => {
        e.index = i + 1;
        e.productNo = +(Number(e.pidNo) > 10) ? e.vatNo + "0" + e.pidNo : e.vatNo + "00" + e.pidNo
      })
    },
    save() {
      this.groupDataBeforeSave();
    },
    async checkData() {
      await this.checkInQcList();
     // await this.checkInWhseList();
    },
    checkInQcList() {
      let vatNoList = this.groupVatNo();
      vatNoList.map(async (e) => {
        let arr = await axiosGet(API.proFinalProductCard, {cardType: 1, vatNo: e.value});
        console.log(arr)
        this.crud.map((item, i) => {
          if (item.vatNo == e.value) {
            item.noteType = 0;
            let index = this.findElement(arr.data, item);
            if (index != -1) {
              if (arr.data[index].delFlag) {
                item.noteType = 1
              } else {
                item.cardId = arr.data[index].cardId;
                item.noteType = 2
              }
            }
          }
        })
      })
    },
    checkInWhseList() {
      let vatNoList = this.groupVatNo();
      vatNoList.map(async (e) => {
        let arr = await axiosGet(API.whseFinishedFabricShotR, { vatNo: e.value});

        this.crud.map((item, i) => {
          if (item.vatNo == e.value) {
            item.noteType = 0;
            let index = arr.data.findIndex((el) => el.vatNo == item.vatNo && Number(item.pidNo) ==  Number(el.productNo.slice(-3)));
            if (index != -1) {
              item.cardId = arr.data[index].cardId;
              item.noteType = 3
            }
          }
        })
      })
    },
    groupVatNo() {
      let arr = [];
      this.crud.map((e, i) => {
        if (arr.findIndex(el => el.value == e.vatNo) == -1) {
          arr.push({value: e.vatNo})
        }
      })
      return arr;
    },
    findElement(arr, item) {
      return arr.findIndex((el) => el.vatNo == item.vatNo && item.pidNo == el.pidNo)
    },
    groupDataBeforeSave() {
      let arrVat = this.groupVatNo();
      arrVat.map((e, i) => {
        let detail = [];
        let arrTemp = this.crud.filter(el => el.vatNo == e.value)
        arrTemp.map((item) => {
          if (item.noteType == 2) {
            detail.push({
              productCardFk: item.cardId ? item.cardId : item.productCardFk,
              productNo: item.productNo,
              storeLoad: item.storeLoad,
              vatNo: item.vatNo,
              grossWeight: item.grossWeight,
              netWeight: item.netWeight,
              storeLocal: item.storeLocal
            })
          }
        })
        if (detail.length > 0) {
          let data = {
            actionEffect: this.form.actionEffect,
            actionDesc: this.form.actionDesc ? this.form.actionDesc : "",
            actionCause: this.form.actionCause,
            fabricLogs: detail,
            creator: "SYSTEM"
          }
          console.log(data);
          axiosPost(API.whseFabricChangeAction, data).then((res) => {
            if (res.data.code === 200) {
              this.$tip.success(res.data.msg);
              this.$emit("exit");
            } else {
              this.$tip.danger(res.data.msg);
            }

          })
        }
      })
    },
    async getActionCause(val) {
      this.vatLoading = true;
      let result = await axiosGet(API.whseFabricActionOption, {actionEffect: val.value});
      let arr = [];
      result.data.map((e, i) => {
        if (e.sn > 100) {
          arr.push(e)
        }
      })
      this.optionsActionCause = arr;
      this.vatLoading = false;
    },
    changeActionType() {

    }
  }, mounted() {
    this.initData();
  }
}
</script>

<style scoped>

</style>
