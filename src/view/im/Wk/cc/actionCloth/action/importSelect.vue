<template>
  <div id="mainView">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="tab1" label="仓库成品布常见变更事件-Chọn vải thành phẩm">
        <div class="btnList">
          <el-button type="success" @click="save" :disabled="!resultData.length">{{
              this.$t("public.choose")
            }}
          </el-button>
          <el-button type="primary" @click="moveToRightStore" :disabled="!chooseArray.length">使用载具</el-button>
          <el-button type="warning" @click="moveToRightNotStore" :disabled="!chooseArray.length">没用载具</el-button>
          <el-button type="warning" @click="exit">{{ this.$t("public.close") }}</el-button>
        </div>
        <el-row class="crudBox">
          <el-col :span="12">
            <view-container title="选择成品布">
              <avue-form ref="storeCodeForm" :option="queryForm" v-model="form">
                <template slot="vatNo" slot-scope="scope">
                  <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                             placeholder="输入缸号" :remote-method="remoteMethodVat" :loading="vatLoading" @change="query">
                    <el-option v-for="item in optionsVat" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
                    </el-option>
                  </el-select>
                </template>
              </avue-form>
              <avue-crud
                ref="crudLeft"
                :option="productDetail"
                :data="crud"
                v-loading="loadingP"
                @selection-change="selectionChange"
              />
            </view-container>
          </el-col>
          <el-col :span="12">
            <el-row>
              <view-container title="入库成品布使用载具-Nhập kho sử dụng pallet">
                <avue-crud
                  ref="crudLeft"
                  :option="crudHasStoreOption"
                  :data="crudHasStore"
                  @current-row-change="crudHasStoreClick"
                  @row-dblclick="crudHasStoreDBClick"
                  v-loading="loading">
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
              </view-container>
            </el-row>
            <el-row>
              <view-container title="入库成品布未用载具-Nhập kho không dùng pallet">
                <avue-crud
                  ref="crudLeft"
                  :option="crudNotStoreOption"
                  :data="crudNotStore"
                  @row-dblclick="crudNotStoreDBClick"
                  @current-row-change="crudNotStoreClick"
                  v-loading="loading"/>
              </view-container>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="bingCloth"
      :visible.sync="visiable"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
      v-if="visiable">
      <bing-cloth v-if="visiable" :type="type" :edit-data="editData" @save="changeData"/>
    </el-dialog>
  </div>
</template>

<script>
import {_crudHasStore, _crudNotStore, _importForm, _productDetail, _queryForm} from "../data";
import {getRevolvePage} from "../../../../../quaLity/finalCard/api";
import {checkResultPage} from "../process";
import {API, axiosGet} from "../api";
import BingCloth from "./bingCloth";

export default {
  name: "importSelect",
  components: {BingCloth},
  data() {
    return {
      tabs: "tab1",
      queryForm: _importForm(this),
      form: {},
      productDetail: _productDetail(this),
      crudHasStoreOption: _crudHasStore(this),
      crudNotStoreOption: _crudNotStore(this),
      crud: [],
      crudNotStore: [],
      crudHasStore: [],
      loading: false,
      loadingP:false,
      optionsVat: [],
      vatLoading: false,
      chooseArray: [],
      resultData: [],
      visiable: false,
      type: 1,
      editData: [],
      optionsStore:[]
    }
  }, methods: {
    save() {
      if (this.crudHasStore.length > 0 && this.crudHasStore.findIndex((e) => e.storeLoad == null) !== -1) {
        return this.$tip.warning("Vui lòng điền mã pallet,载具编号不能为空!")
      }
      if (this.crudNotStore.length > 0 && this.crudNotStore.findIndex((e) => e.storeLocal == null) !== -1) {
        return this.$tip.warning("Vui lòng điền vị trí,货位不能为空!")
      }
      let arr = [];
      if (this.crudHasStore.length > 0) {
        this.crudHasStore.map((e) => {
          e.detail.map((item) => {
            arr.push({
              productCardFk: item.cardId,
              productNo: item.productNo,
              storeLoad: e.storeLoad,
              vatNo: item.vatNo,
              grossWeight: item.grossWeight,
              netWeight: item.netWeight,
              pidNo: e.pidNo
            })
          });
        });
      }
      if (this.crudNotStore.length > 0) {
        this.crudNotStore.map((e) => {
          e.detail.map((item) => {
            arr.push({
              productCardFk: item.cardId,
              productNo: item.productNo,
              storeLocal: e.storeLocal,
              vatNo: item.vatNo,
              grossWeight: item.grossWeight,
              netWeight: item.netWeight,
              pidNo: e.pidNo
            })
          });
        });
      }
      this.resultData = arr;
      this.$emit("save", this.resultData);

    },
    moveToRightStore() {
      if (this.crudHasStore.length === 0) {
        let object = [{
          index: 1,
          storeLoad: null,
          pidCount: this.chooseArray.length,
          sumWeight: this.getInforArray(this.chooseArray).sumWeight,
          sumWeightLbs: this.getInforArray(this.chooseArray).sumWeightLbs,
          detail: this.chooseArray
        }];
        this.crudHasStore = object;
      } else {
        let indexAdd = this.crudHasStore.findIndex((item) => item.storeLoad == null);
        if (indexAdd !== -1) {
          let infor = this.getInforArray(this.crudHasStore[indexAdd].detail);
          this.crudHasStore[indexAdd].detail =
            this.crudHasStore[indexAdd].detail.concat(this.chooseArray);
          this.crudHasStore[indexAdd].sumWeight = infor.sumWeight;
          this.crudHasStore[indexAdd].sumWeightLbs = infor.sumWeightLbs;
          this.crudHasStore[indexAdd].pidCount = infor.pidCount;
        } else {
          let object = [{
            index: this.crudHasStore.length + 1,
            storeLoad: null,
            pidCount: this.chooseArray.length,
            sumWeight: this.getInforArray(this.chooseArray).sumWeight,
            sumWeightLbs: this.getInforArray(this.chooseArray).sumWeightLbs,
            detail: this.chooseArray
          }];
          this.crudHasStore = this.crudHasStore.concat(object);
        }
      }
      this.resultData = this.resultData.concat(this.chooseArray);
      this.crud = this.hideArray(this.crud, this.resultData);
    },
    moveToRightNotStore() {
      if (this.crudNotStore.length === 0) {
        let object = [{
          index: 1,
          storeLocal: null,
          pidCount: this.chooseArray.length,
          sumWeight: this.getInforArray(this.chooseArray).sumWeight,
          sumWeightLbs: this.getInforArray(this.chooseArray).sumWeightLbs,
          detail: this.chooseArray
        }];
        this.crudNotStore = object;
      }
      this.resultData = this.resultData.concat(this.chooseArray);
      this.crud = this.hideArray(this.crud, this.resultData);

    },
    getInforArray(data) {
      let sumWeight = 0;
      let sumWeightLbs = 0;
      let pidCount = 0;
      data.map((e) => {
        sumWeight = sumWeight + e.netWeight;
        sumWeightLbs = sumWeightLbs + e.netWeightLbs;
      });
      return {
        sumWeight: sumWeight.toFixed(2),
        sumWeightLbs: sumWeightLbs.toFixed(2),
        pidCount: data.length
      }
    },
    changeData(val) {
      if (this.type === 1) {
        this.crudHasStore = val;
      } else {
        this.crudNotStore = val;
      }
      this.visiable = false;
    },
    selectionChange(val) {
      this.chooseArray = val;
    },
    crudHasStoreClick(val) {
      this.crudHasStore.map((e) => e.$cellEdit = false);
      this.crudHasStore[val.index - 1].$cellEdit = true;
    },
    crudHasStoreDBClick(val) {
      this.type = 1;
      this.editData = this.crudHasStore;
      this.visiable = true;
    },
    crudNotStoreDBClick(val) {
      this.type = 2;
      this.editData = this.crudNotStore;
      this.visiable = true;
    },
    crudNotStoreClick(val) {
      this.crudNotStore.map((e) => e.$cellEdit = false);
      this.crudNotStore[val.index - 1].$cellEdit = true;
    },
    hideArray(arr, hideArr) {
      let newArr = [];
      arr.map((e) => {
        if (hideArr.findIndex((item) => item === e) === -1) {
          newArr.push(e)
        }
      });
      return newArr;
    },
    exit() {
      this.$emit("exit");
    },
    async query() {
      this.loadingP=true;
      let data = await axiosGet(API.proFinalProductCardPage, {
        vatNo: this.form.vatNo,
        rows: 300,
        start: 1,
        cardType: 1,
        degFlag: 0,
       // whseVouch: 9
      });
      this.crud = this.hideArray(data.data.records, this.resultData);
      this.crud.sort((a, b) => {
        return a.productNo < b.productNo ? -1 : 1
      });
      this.crud.map((e, i) => e.index = i + 1);
      setTimeout(()=>{
        this.loadingP=false;
      },500)
    },
    async remoteMethodVat(val) {
      this.vatLoading = true;
      let result = await getRevolvePage({vatNo: "!^%" + val});
      let data = checkResultPage(result);
      if (!data.success) {
        this.$tip.warning(data.msg);
      }
      this.optionsVat = data.records;
      this.vatLoading = false;
    },
    remoteStoreCode(val) {
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
  }
}
</script>

<style scoped>

</style>
