<template>
  <view-container title="新增事件-Thêm sự kiện">
    <el-row>
      <el-col>
        <div class="btnList">
          <el-popover
            placement="bottom"
            width="200"
            trigger="click" v-if="form.actionEffect===103||form.actionEffect===104">
            <template v-if="form.actionEffect===103">
              <el-checkbox v-model="isAutoWeave">是否自动仓库</el-checkbox>
              <el-input placeholder="输入新的货位" v-model="newStoreLocal"></el-input>
            </template>
            <template v-if="form.actionEffect===104">
              <el-select v-model="newStoreLoad" placeholder="选择新的载具编号" remote filterable reserve-keyword
                         clearable default-first-option :loading="vatLoading"
                         :remote-method="remoteStoreCode">
                <el-option v-for="item in loadList" :key="item.storageCode" :label="item.storageCode"
                           :value="item.storageCode">
                </el-option>
              </el-select>
            </template>
            <div style="text-align: left; margin-top: 10px">
              <el-button type="primary" size="mini" @click="changeStoreInfor">同意</el-button>
            </div>
            <el-button slot="reference" type="success" :disabled="!productCrud.length">{{ this.$t("public.save") }}
            </el-button>
          </el-popover>

          <el-button v-else type="success" @click="save" :disabled="!productCrud.length">{{
              this.$t("public.save")
            }}
          </el-button>

          <el-button type="primary" @click="addProduct" :disabled="!form.actionEffect">选择成品布</el-button>
          <template v-if="form.actionCause==701">
            <el-button type="primary" @click="addFile" :disabled="!form.actionEffect">导入文件</el-button>
          </template>

          <el-popover
            v-if="changeStore.autoWeave"
            placement="bottom"
            title="选择位置"
            width="200"
            trigger="click"
          >
            <el-select v-model="form.location" filterable remote reserve-keyword clearable default-first-option
                       placeholder="输入缸号" :remote-method="remoteMethodLoc" :loading="vatLoading">
              <el-option v-for="item in optionsLoc" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo">
              </el-option>
            </el-select>
            <el-button type="success" style="float:right;margin-top: 17px">{{ this.$t("public.query") }}</el-button>
            <el-button slot="reference">换位置</el-button>
          </el-popover>
          <el-button type="danger" @click="delPro" :disabled="!productCrud.length">删除</el-button>
          <el-button type="danger" @click="delAll" :disabled="!productCrud.length">全删</el-button>
          <el-button type="warning" @click="exit">{{ this.$t("public.close") }}</el-button>
        </div>
        <div style="padding: 5px;margin-bottom: 7px">
          <avue-form ref="form" :option="queryForm" v-model="form">
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
      </el-col>
    </el-row>
    <el-row class="crudBox">
      <el-col :span="(form.actionCause===701)?11:24">
        <avue-crud
          ref="crudLeft"
          :option="(form.actionCause===701)?exportTotalCrud:productDetail"
          :data="productCrud"
          :page.sync="pageDetail"
          v-loading="loading"
          @row-click="cellClick"
          @selection-change="selectionChange"/>
      </el-col>
      <el-col :span="13" v-if="form.actionCause===701">
        <avue-crud
          ref="crudRight"
          :option="exportDetailCrud"
          :data="detailCrud"
          :page.sync="pageDetail"
          v-loading="loading"/>
      </el-col>

    </el-row>
    <el-dialog
      id="selectInport"
      :visible.sync="visiableImport"
      width="100%"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="visiableImport">
      <import-select v-if="visiableImport" @save="choice" @exit="visiableImport=false"/>
    </el-dialog>
    <el-dialog
      id="selectOrther"
      :visible.sync="visiableOrther"
      width="80%"
      append-to-body
      :close-on-click-visiableOrther="false"
      v-if="visiableOrther">
      <orther-select v-if="visiableOrther" @save="choiceOrther" @exit="visiableOrther=false"/>
    </el-dialog>
    <el-dialog
      id="importtype7"
      :visible.sync="visiableType7"
      width="80%"
      append-to-body
      :close-on-click-visiableOrther="false"
      v-if="visiableType7">
      <productionStorage v-if="visiableType7" @exit="visiableType7=false" @save="choice"/>
    </el-dialog>
    <el-dialog
      id="visiableRC"
      :visible.sync="visiableRC"
      width="80%"
      append-to-body
      :close-on-click-visiableOrther="false"
      v-if="visiableRC">
      <remove-cylinder v-if="visiableRC" @exit="visiableRC=false" @save="choice"/>
    </el-dialog>
    <el-dialog
      id="visiableRCI"
      :visible.sync="visiableRCI"
      width="80%"
      append-to-body
      :close-on-click-visiableOrther="false"
      v-if="visiableRCI">
      <remove-cylinder-im v-if="visiableRCI" @exit="visiableRCI=false" @save="choice"/>
    </el-dialog>
    <el-dialog
      id="visiableSO"
      :visible.sync="visiableSO"
      width="100%"
      fullscreen
      append-to-body
      :close-on-click-visiableOrther="false"
      v-if="visiableSO">
      <sales-out v-if="visiableSO" @exit="visiableSO=false" @save="saveAndGroup"/>
    </el-dialog>
    <el-dialog
      id="visiableCut"
      :visible.sync="visiableCut"
      width="80%"
      append-to-body
      :close-on-click-visiableOrther="false"
      v-if="visiableCut">
      <Cut v-if="visiableCut" @exit="visiableCut=false" @save="choice"/>
    </el-dialog>
  </view-container>
</template>

<script>

import {_exportDetailCrud, _exportTotalCrud, _product, _queryForm, _storeCodeCrud, _storeCodeForm} from "../data";
import {checkResultPage, groupData} from "../process";
import {API, axiosGet, axiosPost, getWhsCarriageStorage} from "../api";
import ImportSelect from "./importSelect";
import OrtherSelect from "./ortherSelect";
import productionStorage from "../core/production-storage";
import RemoveCylinder from "../core/remove-cylinder";
import RemoveCylinderIm from "../core/remove_cylinder_im";
import SalesOut from "../core/sales-out";
import Cut from "../core/cut";

export default {
  name: "weave",
  components: {RemoveCylinder, productionStorage, OrtherSelect, ImportSelect, RemoveCylinderIm, SalesOut, Cut},
  data() {
    return {
      scanAdd: false,
      storeCodeForm: _storeCodeForm(this),
      queryForm: _queryForm(this),
      storeCodeCrud: _storeCodeCrud(this),
      productDetail: _product(this),
      exportTotalCrud: _exportTotalCrud(this),
      exportDetailCrud: _exportDetailCrud(this),
      form: {},
      storeCrud: [],
      productCrud: [],
      optionsActionCause: [],
      optionsLoc: [],
      vatLoading: false,
      changeStore: {
        autoWeave: false
      },
      detailCrud: [],
      loading: false,
      visiable: false,
      visiableImport: false,
      changeLocation: "",
      pageStore: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50],
      },
      pageDetail: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      },
      choieFilter: 0,
      chooseData: null,
      fabricLogs: null,
      visiableOrther: false,
      loadList: [],
      localList: [],
      isAutoWeave: false,
      newStoreLoad: "",
      newStoreLocal: "",
      visiableType7: false,
      visiableRC: false,
      visiableRCI: false,
      visiableSO: false,
      visiableCut: false
    }
  }, methods: {
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {

            let detail = [];
            let unGroupData = [];
            if (this.form.actionCause === 701) {
              this.productCrud.map((e) => {
                unGroupData = unGroupData.concat(e.detail);
              })
            }
            let dataCrud = (this.form.actionCause !== 701) ? this.productCrud : unGroupData;
            dataCrud.map((item) => {
              detail.push({
                productCardFk: item.cardId ? item.cardId : item.productCardFk,
                productNo: item.productNo,
                storeLoad: item.storeLoad,
                vatNo: item.vatNo,
                grossWeight: item.grossWeight,
                netWeight: item.netWeight,
                storeLocal: item.storeLocal
              })
            })
            let data = {
              actionEffect: this.form.actionEffect,
              actionDesc: this.form.actionDesc ? this.form.actionDesc : "",
              actionCause: this.form.actionCause,
              fabricLogs: detail,
              creator: parent.userID
            }
            axiosPost(API.whseFabricChangeAction, data).then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(res.data.msg);
                this.$emit("exit");
              } else {
                if (res.data.msg.includes("重复") != -1) {
                  let value1 = (this.form.actionEffect == 101) ? "Xuất kho" : "Nhập kho";
                  let value2 = this.form.actionEffect == 101 ? "Nhập kho" : "Xuất kho";
                  this.$tip.warning("Vui lòng " + value1 + " trước rồi mới được phép " + value2 + "," + res.data.msg)
                  return;
                }
                this.$tip.danger(res.data.msg);
              }
            })
          } catch (e) {
            this.$tip.danger(e);
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充报告信息!");
        }
      });
    },
    changeStoreInfor() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            let detail = [];
            this.productCrud.map((item) => {
              detail.push({
                productCardFk: item.cardId ? item.cardId : item.productCardFk,
                productNo: item.productNo,
                storeLoad: (this.form.actionEffect === 104) ? this.newStoreLoad : item.storeLoad,
                vatNo: item.vatNo,
                grossWeight: item.grossWeight,
                netWeight: item.netWeight,
                storeLocal: (this.form.actionEffect === 103 && this.isAutoWeave === false) ? this.newStoreLocal : item.storeLocal
              })
            })
            let data = {
              actionEffect: this.form.actionEffect,
              actionDesc: this.form.actionDesc ? this.form.actionDesc : "",
              actionCause: this.form.actionCause,
              fabricLogs: detail,
              creator: "SYSTEM"
            }
          } catch (e) {
            this.$tip.danger(e);
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充报告信息!");
        }
      });
    },
    choice(val) {
      this.visiableImport = false;
      this.visiableType7 = false;
      this.visiableRC = false;
      this.visiableRCI = false;
      this.visiableCut = false;
      this.vi = false;
      this.productCrud = this.productCrud.concat(val);
      this.productCrud.sort((a, b) => {
        return a.productNo < b.productNo ? -1 : 1
      })
      this.productCrud.map((e, i) => e.index = i + 1);
    },
    saveAndGroup(val) {
      this.visiableSO = false
      this.visiableCut = false;
    },
    delAll() {
      this.productCrud = [];
    },
    choiceOrther(val) {
      this.visiableOrther = false;
      if (this.form.actionCause === 701) {
        this.productCrud = this.productCrud.concat(groupData(val));
        this.productCrud.map((e, i) => {
          e.index = i + 1;
        });
        this.$refs.crudLeft.setCurrentRow(this.productCrud[0]);
        this.detailCrud = this.productCrud[0].detail;
        return;
      }
      this.productCrud = this.productCrud.concat(val);
      this.productCrud.sort((a, b) => {
        return a.productNo < b.productNo ? -1 : 1
      })
      this.productCrud.map((e, i) => e.index = i + 1);
    },
    changeNewStoreCode() {
    },
    addProduct() {
      // if( parent.userID=="afeng" ){
      //   console.log(parent.userID)
      //   if(this.form.actionEffect!=101 ){
      //     return this.$tip.warning("Bạn không có quyền thao tác! 你没有权限操作") ;
      //   }
      // }
      if (this.form.actionEffect === 101) {
        switch (this.form.actionCause) {
          case 200:
            return this.visiableType7 = true;
          case 203:
            return this.visiableCut = true;
          case 204:
            return this.visiableImport = true;
          case 303:
            return this.visiableType7 = true;
        }
      }
      if (this.form.actionEffect === 102) {
        switch (this.form.actionCause) {
          case 303:
            return this.visiableRC = true;
          case 302:
            return this.visiableRC = true;
          default :
            return this.visiableOrther = true
        }
      }
    },
    changeActionType(val) {
      console.log("change")
      this.productCrud = [];
      if (val.value) {
        this.scanAdd = true;
        this.choieFilter = val.value;

      } else {
        this.scanAdd = false;
      }
    },
    hasChoose(val) {
      this.visiable = false;
      this.productCrud = val;
    },
    addFile() {
      this.visiableSO = true;
    },
    cofirm(type) {
      switch (type) {
        case 1:
          this.$tip.cofirm("是否确定修改 1?", this, {}).then(() => {
            this.changeNewStoreCode();
          });
          return;
        case 2:
          this.$tip.cofirm("是否确定修改 2?", this, {}).then(() => {
            this.save();
          });
          return;
      }
    },
    selectionChange(val) {
      console.log(val)
    },
    delPro() {
      if (this.productCrud.length > 0) {
        this.productCrud.splice(this.chooseData.index - 1, 1);
        this.productCrud.map((e, i) => e.index = i + 1);
      }
    },
    cellClick(val) {
      this.chooseData = val;
      this.detailCrud = val.detail;
      this.detailCrud.map((e, i) => e.index = i + 1)
    },
    exit() {
      this.$emit("exit");
    },
    async getActionCause(val) {
      if (!val.value) {
        return;
      }
      this.form.actionCause = null;
      this.vatLoading = true;
      let result = await axiosGet(API.whseFabricActionOption, {actionEffect: val.value});
      if (result.data.length === 1) {
        this.form.actionCause = result.data[0].actionCause
      }
      this.optionsActionCause = result.data;
      this.vatLoading = false;
    },
    async remoteMethodLoc(val) {
      let result = await getWhsCarriageStorage({storageCode: "%" + val});
      let data = checkResultPage(result);
      if (!data.success) {
        this.$tip.warning(data.msg);
      }
      this.optionsLoc = data.records;
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
        this.loadList = arr;
      });
    },
  }
}
</script>
