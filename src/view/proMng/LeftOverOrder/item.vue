<template>
  <view-container title="多布存仓指令" :loading="wLoading">
    <div class="btnList">
      <el-button type="success" @click="save">{{ $t("public.save") }}</el-button>
      <el-button type="primary" @click="print" :disabled="!form.orderId">{{ $t("public.print") }}</el-button>
      <el-button type="warning" @click="exit">{{ $t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <div class="btnList">
      <el-button type="primary" @click="add">{{ $t("public.add") }}</el-button>
      <el-button type="danger" @click="del">{{ $t("public.del") }}</el-button>
      <el-button type="success" @click="process" :disabled="!crudLeft.length">生成</el-button>
      <el-popover id="popoverLeftPoNo" v-model="visible" width="260" style="padding-left: 10px;" trigger="click">
        <div>
          <span>新的PO</span>
          <el-select slot="reference" v-model="leftPoNo" remote filterable reserve-keyword clearable default-first-option
            :loading="vatLoading" :remote-method="remoteMethod" @change="handleChange">
            <el-option v-for="item in options" :key="item.value" :label="`${item.label}`" :value="`${item.value}`">
            </el-option>
          </el-select>
          <div style="padding-top: 5px; float: right;">
            <el-button type="warning" @click="hide">{{ $t("public.close") }}</el-button>
            <el-button type="success" slot="reference" :disabled="!leftPoNo" @click="createAllLeftPoNo">{{ $t("public.save") }}</el-button>
          </div>
        </div>
        <el-button slot="reference" type="primary" :disabled="!crudLeft.length">全部拆缸B</el-button>
      </el-popover>
    </div>
    <div style="height: calc(100vh - 335px)">
      <el-row>
        <el-col :span="12">
          <view-container title="选布剪布">
            <avue-crud id="table_crud1" ref="crud1" :option="crudOpLeft" :data="crudLeft" @current-row-change="cellClick">
              <template slot="leftPoNo" slot-scope="scope">
                <template v-if="scope.row.$cellEdit">
                  <el-select slot="reference" v-model="scope.row.leftPoNo" remote filterable reserve-keyword clearable
                    default-first-option :loading="vatLoading" :remote-method="remoteMethod" @change="handleChange">
                    <el-option v-for="item in options" :key="item.value" :label="`${item.label}`"
                      :value="`${item.value}`">
                    </el-option>
                  </el-select>
                </template>
                <el-input v-else-if="scope.row.$cellEdit" v-model="scope.row.leftPoNo">
                </el-input>
                <span v-else>
                  {{ scope.row.leftPoNo }}
                </span>
              </template>
            </avue-crud>
          </view-container>
        </el-col>
        <el-col :span="12">
          <view-container title="剪布之后的结果">
            <avue-crud ref="crud2" :option="crudOpRight" :data="crudRight"/>
          </view-container>
        </el-col>
      </el-row>
    </div>
    <el-dialog id="onlyview" :visible.sync="choiceV" width="70%" modal append-to-body custom-class="customModal"
      :close-on-click-modal="false" v-if="choiceV">
      <Select v-if="choiceV" @close="choiceV = false" @choiceData="choiceData" />
    </el-dialog>
  </view-container>
</template>

<script>
import {itemForm, mainCrud} from "./data.js"
import Select from "../dyeDeliveryNote/select";
import {mainCrudLeft, mainCrudRight} from "./data";
import {axiosGet, axiosPostEx, axiosPut, axiosPutEx} from "../../im/Wk/cc/actionCloth/api";
import {SaveParms} from "../../im/Wk/cc/actionCloth/process";

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
      crudOpLeft: mainCrudLeft(this),
      crudOpRight: mainCrudRight(this),
      crudLeft: [],
      crudRight: [],
      currentRow: {},
      audit: false,
      wLoading: false,
      vatLoading: false,
      options: [],
      leftPoNo: "",
      visible: false
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
            let arrDetail = [];
            this.crudLeft.map((e, _) => {
              arrDetail.push({
                cardId: e.cardId,
                pidNo: e.pidNo,
                vatNo: e.vatNo,
                productNo: e.productNo,
                grossWeight: e.grossWeight,
                grossWeightLbs: e.grossWeightLbs,
                netWeight: e.netWeight,
                netWeightLbs: e.netWeightLbs,
                targetVatNo: e.targetVatNo,
                leftGw: e.leftGw,
                leftGwLbs: e.leftGwLbs,
                leftNw: e.leftNw,
                leftNwLbs: e.leftNwLbs,
                outGw: e.outGw,
                outGwLbs: e.outGwLbs,
                outNw: e.outNw,
                outNwLbs: e.outNwLbs,
                leftYardLength: e.leftYardLength,
                leftPoNo:e.leftPoNo
              })
            })
            const data = Object.assign({
              orderDate: this.form.orderDate,
              pidCount: this.form.pidCount,
              sumWeight: this.form.sumWeight,
              finishTime: this.form.finishTime,
              creator: this.form.creator,
              creatTime: this.form.creatTime,
              remark: this.form.remark
            }, {
              dtls: arrDetail
            })
            let result;
            if (this.isAdd) {
              result = await axiosPostEx("/api/proLeftOverOrder", JSON.stringify(SaveParms(data)))
            } else {
              result = await axiosPutEx("/api/proLeftOverOrder", JSON.stringify(SaveParms(Object.assign(data, {orderId: this.form.orderId}))))
            }
            if (result.data.code == 200) {
              this.$emit("refe")
              this.$tip.success(result.data.msg)
              let mainF = await axiosGet("/api/proLeftOverOrder", {orderId: result.data.data})
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
    async remoteMethod(val) {
      this.options = []
      if (val.length > 1) {
        let result = await axiosGet("/api/proLeftOverOrder/gstPo", {poNo: "%" + val})
        result.data.records.map((e) => {
          this.options.push({
            value: e.poNo,
            label: e.poNo,
          })
        })
      }
    },
    handleChange() {
    },
    choiceData(val) {
      val.map((e, i) => {
        this.crudLeft.push(e);
      })
      this.crudLeft.map((e, i) => e.index = i + 1);
      this.choiceV = false;
      this.audit = false
    },
    print() {
      const obj = new URLSearchParams({id: this.form.orderId}).toString();
      window.open(process.env.API_HOST + "/api/proLeftOverOrder/pdf" + '?' + obj)
    },
    add() {
      this.choiceV = true
    },
    del() {
      this.crudLeft = this.crudLeft.filter((e) => e.index != this.currentRow.index);
      if (this.crudLeft.length > 0) {
        this.crudLeft.map((e, i) => {
          e.index = i + 1;
        })
        this.$refs.crud1.setCurrentRow(this.crudLeft[0]);
      }
      this.audit = false;
    },
    cellClick(val) {
      if (!val)
        return;
      this.crudLeft.map((e) => {
        e.$cellEdit = false;
      })
      let position = this.crudLeft.findIndex((e, i) => e.index == val.index)
      this.currentRow = this.crudLeft[position];
      this.crudLeft[position].$cellEdit = true;
    },
    process() {
      this.crudRight = [];
      for (let i = 0; i < this.crudLeft.length; i++) {
        let e = this.crudLeft[i];
        if (e.leftPoNo == null || e.leftPoNo == undefined) {
          this.$tip.warning("Vui lòng nhập mã PO mới")
          return;
        }
        if (e.cutWeight == null || e.cutWeight == undefined) {
          this.$tip.warning("Vui lòng nhập số kg tách vải")
          return;
        }
        if (Number(e.netWeight) - Number(e.cutWeight) <= 1) {
          this.$tip.warning("Không thể tách vải nhở hơn 1KG")
          return;
        }
      }

      let sumWeight = 0
      let pidCount = this.crudLeft.length
      for (let i = 0; i < this.crudLeft.length; i++) {
        const {netWeight, grossWeight, vatNo, productNo, cutWeight, pidNo, yardLength} = this.crudLeft[i]
        sumWeight += netWeight
        let object1 = {}
        let object2 = {}
        if (cutWeight == 0) {
          object2 = {
            netWeight: Number(netWeight).toFixed(1),
            grossWeight: grossWeight != 0 ? Number(grossWeight).toFixed(1) : 0,
            netWeightLbs: netWeight != 0 ? Number(Number(netWeight) * 2.2046).toFixed(1) : 0,
            grossWeightLbs: grossWeight != 0 ? Number((Number(grossWeight) * 2.2046).toFixed(1)) : 0,
            vatNo: (vatNo.slice(-2).includes("B")) ? vatNo.substring(0, vatNo.length - 1) + Number(Number(vatNo.slice(-1)) + 1) : vatNo + "B1",
            productNo: productNo,
            pidNo: pidNo,
            yardLength: yardLength,
            status: 1
          };
          this.crudRight.push(object2)
        } else {
          object1 = {
            netWeight: Number(cutWeight),
            grossWeight: grossWeight != 0 ? Number(Number(cutWeight) + 0.4).toFixed(1) : 0,
            netWeightLbs: Number(Number(cutWeight) * 2.2046).toFixed(1),
            grossWeightLbs: grossWeight != 0 ? Number((Number(cutWeight) + 0.4) * 2.2046).toFixed(1) : 0,
            vatNo: vatNo,
            productNo: productNo,
            pidNo: pidNo,
            yardLength: yardLength,
            status: 0
          };
          object2 = {
            netWeight: (Number(netWeight) - Number(cutWeight)).toFixed(1),
            grossWeight: grossWeight != 0 ? Number(Number(grossWeight) - Number(cutWeight)).toFixed(1) : 0,
            netWeightLbs: Number((Number(netWeight) - Number(cutWeight)) * 2.2046).toFixed(1),
            grossWeightLbs: grossWeight != 0 ? Number((Number(grossWeight) - Number(cutWeight)) * 2.2046).toFixed(1) : 0,
            vatNo: (vatNo.slice(-2).includes("B")) ? vatNo.substring(0, vatNo.length - 1) + Number(Number(vatNo.slice(-1)) + 1) : vatNo + "B1",
            productNo: productNo,
            pidNo: pidNo,
            yardLength: yardLength,
            status: 1
          };
          this.crudRight.push(object1)
          this.crudRight.push(object2)
        }

        this.crudRight.map((e, i) => e.index = i + 1)
        this.crudLeft[i].targetVatNo = object2.vatNo
        this.crudLeft[i].leftNw = object2.netWeight;
        this.crudLeft[i].leftGw = object2.grossWeight;
        this.crudLeft[i].leftNwLbs = object2.netWeightLbs;
        this.crudLeft[i].leftGwLbs = object2.grossWeightLbs;

        this.crudLeft[i].outNw = object1.netWeight || 0 ;
        this.crudLeft[i].outGw = object1.grossWeight || 0 ;
        this.crudLeft[i].outNwLbs = object1.netWeightLbs || 0;
        this.crudLeft[i].outGwLbs = object1.grossWeightLbs || 0;

        this.crudLeft[i].printerFlag = 0;
        this.audit = true;
      }
      this.form.pidCount = pidCount;
      this.form.sumWeight = sumWeight.toFixed(1);
    },
    async initData() {
      if (this.isAdd) {
        let user = await axiosGet("/api/ucmlUser", {usrLogin: parent.UserId || 'ADMIN'})
        const {employeename} = user.data[0];
        this.form.creator = employeename
        this.form.creatTime = this.$getNowTime("datetime")
        this.form.finishTime = this.$getNowTime("datetime")
        this.form.orderDate = this.$getNowTime("datetime")
        this.form.creator = employeename
        return;
      }
      if (this.detail.orderId == null) {
        console.error("Không tìm thấy orderid từ bảng chính!")
        this.$tip.warning("Hệ thống bị lỗi không thể nhân diện khóa chính!");
        return;
      }
      let mainF = await axiosGet("/api/proLeftOverOrder", {orderId: this.detail.orderId})
      this.form = mainF.data[0]
      let result = await axiosGet("/api/proLeftOverOrderDtl", {proLeftOverOrderFk: this.detail.orderId})
      this.crudLeft = result.data
      this.crudLeft.map((e, i) => e.index = i + 1);
      this.crudLeft.map((e, i) => {
        e.cutWeight = e.outNw;
        if (e.outNw!=0 && e.outNw!=null){
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
      })
      this.crudRight.map((e, i) => {
        e.index = i + 1;
      })

    },
    createAllLeftPoNo() {
      this.crudLeft.forEach((e, i) => {
        e.$cellEdit = true,
          e.leftPoNo = this.leftPoNo;
        e.cutWeight = 0;
      })
      this.$refs.crud1.refreshTable()
      this.hide()
    },
    hide() {
     this.leftPoNo = ""
     this.visible = false
    },
    exit() {
      this.$emit("exit")
    }
  }, mounted() {
    this.initData()
  }
}
</script>
