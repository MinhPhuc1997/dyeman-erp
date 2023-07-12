<template>
  <view-container title="修改载具编号">
    <el-row>
      <el-col class="crudBox" :span="12">
        <div class="btnList">
          <el-button type="success" @click="save">{{ this.$t("public.save") }}</el-button>
          <el-button type="warning">{{ this.$t("public.close") }}</el-button>
        </div>
        <avue-crud
          ref="crudLeft"
          :option="leftCrudOption"
          :data="leftcrud"
          :page.sync="pageleft"
          v-loading="loading"
          @current-row-change="leftCrudClick">
          <template slot="storeLoad" slot-scope="scope">
            <template v-if="scope.row.$cellEdit">
              <el-select slot="reference" v-model="scope.row.storeLoad" remote filterable reserve-keyword
                         clearable default-first-option placeholder="请输入材料信息" :loading="vatLoading"
                         :remote-method="remoteStoreCode" @change="updateStore">
                <el-option v-for="item in optionsStore" :key="item.storageCode"
                           :value="item.storageCode"
                           :label="item.storageCode"
                           :title="item.storageCode">
                  <template #label>
                    <span>{{ item.storeLoad }} </span>
                  </template>
                </el-option>
              </el-select>
            </template>
            <template v-else>
              {{ scope.row.storeLoad }}
            </template>
          </template>
        </avue-crud>
      </el-col>
      <el-col class="crudBox" :span="12">
        <div class="btnList">
          <el-button type="primary" @click="newStore" :disabled="!selectionList.length">新增载具</el-button>
          <el-popover
            placement="bottom"
            title="选择合并载具编号"
            width="200"
            trigger="click">
            <el-select v-model="changeStoreS" placeholder="请选择载具比编号">
              <el-option v-for="item in listStores" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="text-align: left; margin-top: 10px">
              <el-button type="success" size="mini" @click="changeStore">同意</el-button>
            </div>
            <el-button slot="reference" type="primary" :disabled="!selectionList.length||!listStores.length">换载具
            </el-button>
          </el-popover>
          <el-button type="danger" @click="del" :disabled="!selectionList.length">{{
              this.$t("public.del")
            }}
          </el-button>

        </div>
        <avue-crud
          ref="crudRight"
          :option="rightCrudOption"
          :data="rightcrud"
          :page.sync="rightRight"
          v-loading="loading"
          @selection-change="selectionChange"
        />
      </el-col>
    </el-row>
  </view-container>
</template>

<script>
import {_editLocation, _editProduct, _editStore} from "../data";
import {getInforArray, hideArrayElement} from "../process";
import {API, axiosGet} from "../api";

export default {
  name: "bingCloth",
  props: {
    type: Number,
    editData: Array
  },
  data() {
    return {
      loading: false,
      leftCrudOption: (this.type === 1) ? _editStore(this) : _editLocation(this),
      rightCrudOption: _editProduct(this),
      leftcrud: [],
      rightcrud: [],
      resultData: [],
      pageleft: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50],
      },
      rightRight: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50],
      },
      selectionList: [],
      listStores: [],
      changeStoreS: null,
      curentLeft: null,
      optionsStore: []
    }
  }, methods: {
    save() {

      if (this.type === 1 && this.leftcrud.findIndex((item) => item.storeLoad == null) !== -1) {
        return this.$tip.warning("Vui lòng điền đầy đủ mã pallet,载具编号不能为空！");
      }
      if (this.type !== 1 && this.leftcrud.findIndex((item) => item.storeLocal == null) !== -1) {
        return this.$tip.warning("Vui lòng điền đầy đủ vị trí pallet,货位不能为空！");
      }
      this.$emit("save", this.leftcrud);
    },
    initData() {
      this.leftcrud = this.editData;
      this.$refs.crudLeft.setCurrentRow(this.leftcrud[0]);
      this.rightcrud.sort((a, b) => {
        return a.productNo < b.productNo ? -1 : 1
      })
      this.rightcrud = this.editData[0].detail;
    },
    newStore() {
      if (this.selectionList.length > 0) {
        let object = [{
          index: this.leftcrud.length + 1,
          storeLoad: null,
          storeLocal: null,
          pidCount: this.selectionList.length,
          sumWeight: getInforArray(this.selectionList).sumWeight,
          sumWeightLbs: getInforArray(this.selectionList).sumWeightLbs,
          detail: this.selectionList
        }];
        this.leftcrud = hideArrayElement(this.leftcrud, this.selectionList);
        this.leftcrud = this.leftcrud.concat(object);
        this.$refs.crudLeft.setCurrentRow(this.leftcrud[this.leftcrud.length - 1]);
        this.rightcrud = this.leftcrud[this.leftcrud.length - 1].detail;
      }
    },
    del() {
      this.leftcrud = hideArrayElement(this.leftcrud, this.selectionList);
      this.$refs.crudLeft.setCurrentRow(this.leftcrud[this.leftcrud.length - 1]);
      this.rightcrud = this.leftcrud[this.leftcrud.length - 1].detail;
    },
    changeStore() {
      let indexChange = this.leftcrud.findIndex((e) => (this.type === 1) ? e.storeLoad : e.storeLocal === this.changeStoreS);
      if (indexChange !== -1) {
        this.leftcrud = hideArrayElement(this.leftcrud, this.selectionList);
        this.leftcrud[indexChange].detail = this.leftcrud[indexChange].detail.concat(this.selectionList);
        this.leftcrud = hideArrayElement(this.leftcrud, []);
      }

    },
    selectionChange(val) {
      this.selectionList = val;
    },
    leftCrudClick(val) {
      this.curentLeft = val;
      this.leftcrud.map((e) => e.$cellEdit = false);
      this.leftcrud[val.index - 1].$cellEdit = true;
      this.rightcrud = this.leftcrud[val.index - 1].detail;
      this.rightcrud.sort((a, b) => {
        return a.productNo < b.productNo ? -1 : 1
      })
      this.rightcrud.map((e, i) => e.index = i + 1);
    },
    updateStore() {
      let arr = []
      this.leftcrud.map((e, i) => {
        if (this.type === 1 && e.storeLoad != null) {
          arr.push({
            value: e.storeLoad,
            label: e.storeLoad
          });
        }
        if (this.type !== 1 && e.storeLocal != null) {
          if (i === this.curentLeft.index - 1) {
            arr.push({
              value: e.storeLocal,
              label: e.storeLocal
            });
          }
        }
      });
      this.listStores = arr;
    },
    remoteStoreCode(val) {
      console.log(this.curdLeft)
      axiosGet(API.whsCarriageStorage, {storageCode: "%" + val}).then((res) => {
        let arr = [];
        res.data.records.map((e, i) => {
          if (arr.findIndex((item) => item.storageCode === e.storageCode) === -1) {
            arr.push(e);
          }
        });
        this.optionsStore = arr;
      });
    },
  }, mounted() {
    this.initData();
  }
}
</script>

<style scoped>

</style>
