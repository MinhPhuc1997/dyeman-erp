<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-22 10:25:25
 * @Description:
-->
<template>
  <div id="ityInventory">
    <view-container title="库存查询" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="getData" v-hasPerm="['whse:inventory:list']">{{
            this.$t("public.query")
        }}</el-button>
        <template v-if="form.type == 'PB'">
          <div style="display: inline-block">
            <el-button type="primary" @click="outTransit" v-hasPerm="['whse:inventory:export']">导出明细报表</el-button>
            <el-button type="warning" @click="outTransit(2)" v-hasPerm="['whse:inventory:export']">导出汇总报表</el-button>
          </div>
        </template>
        <el-button v-else type="primary" @click="outTransit" v-hasPerm="['whse:inventory:export']">导出</el-button>
        <div style="display: inline; float: right; margin-right: 1.25rem">
          <span>过滤空库存</span>
          <el-switch v-model="filterEmpty" @change="getData"> </el-switch>
        </div>
        <el-button type="warning" style="float:right; margin-right: 1.25rem" v-hasPerm="['whse:inventory:start']" :disabled="!form.type" @click="handleCreateInventory" >生成盘点清单</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="realGramWeight">
              <div style="display:flex">
                <el-input v-model="form.realGramWeight_begin" type="number" clearable />
                <span style="display: inline-block; padding: 0px 10px">至</span>
                <el-input v-model="form.realGramWeight_end"  type="number" clearable />
              </div>
          </template>
          <template slot="inStorageDays">
            <div style="display: flex">
              <el-select v-model="form.inStorageSym" clearable style="width: 100px !important; text-align: center;" placeholder="">
                <el-option label="大于" value="1" />
                <el-option label="等于" value="2" />
                <el-option label="小于" value="3" />
              </el-select>
              <el-input v-model="form.inStorageDays" clearable></el-input>
            </div>
          </template>
        </avue-form>
      </div>
      <el-row>
        <el-col :span="14" :element-loading-text="loadLabel" v-loading="loading">
          <view-container title="材料信息" >
              <avue-crud ref="materialsCrud" :option="crudOp" :data="crud" :page.sync="page" @on-load="getData"
                 @current-row-change="cellClick">
                  <template  slot="stock" slot-scope="{row}">
                    <div :style="stockCellStyle(row.safeStatus)"> <span>{{ row.stock }}</span> </div>
                  </template>
                  <template  slot="weight" slot-scope="{row}">
                    <div :style="stockCellStyle(row.safeStatus)"> <span>{{ row.weight }}</span> </div>
                  </template>
                 </avue-crud>
          </view-container>
        </el-col>
        <el-col :span="10">
          <view-container title="库存信息">
            <avue-crud ref="materialsItyCrud" @row-dblclick="handleRowDBLClick" :option="materialsItyOp" :data="chooseData.nodes"></avue-crud>
          </view-container>
        </el-col>
      </el-row>
      <el-drawer title="库存出入明细" :visible.sync="drawerVisible" append-to-body>
        <whse-dtl ref="whseDtlRef"></whse-dtl>
      </el-drawer>
    </view-container>
  </div>
</template>
<script>
import {
  getSx,
  getSxList,
  getRhl,
  getFl,
  getWj,
  getXz,
  getFlList,
  getWjList,
  getXzList,
  getRll,
  getRhlList,
  getRllList,
  getCpb,
  getCpbList,
  getNote,
  getNoteList,
  getEquipment,
  getEquipmentList,
  fetchCheckHasExistByNow,
  createSnapshot2StockType,
  getViewHardwareStockDetails
} from "./api";
import { getXDicT } from "@/config/index";
import {
  formOp,
  crudOp,
  finishedCrud,
  sxOp,
  noteCrud,
  wjDetailcrudOp,
  materialsItyCrudOp,
  matUnit
} from "./data";
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
import WhseDtl from "./whseDtl.vue";
import { fetchFineReportUrl } from "@/api/index";
export default {
  name: "",
  components: {
    "whse-dtl": WhseDtl,
  },
  data() {
    return {
      loading: false,
      loadLabel: this.$t('public.loading'),
      page: {
        // pageSizes: [50, 100, 200, 500, 1000],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      formOp: formOp(this),
      form: {
        type: "SX",
      },
      crudOp: crudOp(this),
      crud: [],
      wjDltOp: wjDetailcrudOp(this),
      wjDlt: [],
      detail: {},
      chooseData: {},
      isAdd: false,
      allData: [],
      getFun: null,
      getList: null,
      chemicalData: getXDicT("BasChemicalmatNew"), // 化工原料
      pigmentData: getXDicT("basPigment"), // 颜料
      typeObj: {
        sort: null,
      },
      type: "SX",
      drawerVisible: false,
      filterEmpty: true,
      outData: [],
      materialsItyOp: {},
    };
  },
  watch: {},
  methods: {
    // 主库存数量样式效果
    // > min <= set : 1  yellow ;  < min : -1  red
    stockCellStyle(safeStatus = 0){
      let oColor = {
        "1": "orange",
        "-1": "red",
        "0": "none"
      };
      return {
        color: oColor[safeStatus],
      }
    },
    //  生成盘点清单
    async handleCreateInventory() {
      let hasConfirm = await this.$tip.cofirm("是否确认生成盘点清单").then(res => true).catch(err => false);
      if(!hasConfirm) return;
      let type = this.form.type;
      if (!type) return this.$tip.warning("请选择生成的材料类型~");
      let params = {
        stockType: type,
      };
      let hasExist = await fetchCheckHasExistByNow(params).then(
        (res) => res.data.data
      );
      if (hasExist) {
        this.$tip.cofirm("当天已存在库存快照,是否进行覆盖").then((res) => {
          this.validAfterCreateSnapshot(params);
        });
      } else {
        this.validAfterCreateSnapshot(params);
      }
    },
    validAfterCreateSnapshot(params) {
      this.loading = true;
      createSnapshot2StockType(params)
        .then((res) => {
          if (res.data.code == 200) {
            this.$tip.success("生成成功~");
          } else {
            this.$tip.error(res.data.msg);
          }
        })
        .finally((_) => {
          this.loading = false;
        });
    },
    getData() {
      this.loading = true;
      this.crud = [];
      this.wjDlt=[];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let query = JSON.parse(JSON.stringify(this.form));
      this.materialsItyOp = materialsItyCrudOp(this);
      switch (this.form.type) {
        case "SX":
          this.getFun = getSx;
          this.getList = getSxList;
          this.crudOp = sxOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "RHL":
          this.getFun = getRhl;
          this.getList = getRhlList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_other.xlsx";
          break;
        case "RLL":
          this.getFun = getRll;
          this.getList = getRllList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_other.xlsx";
          break;
        case "CPB":
          this.getFun = getCpb;
          this.getList = getCpbList;
          this.crudOp = finishedCrud(this);
          this.typeObj.sort = "productNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "PB":
          this.getFun = getNote;
          this.getList = getNoteList;
          this.crudOp = noteCrud(this);
          this.typeObj.sort = "noteCode";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_cloth.xlsx";
          break;
        case "FL":
          this.getFun = getFl;
          this.getList = getFlList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_other_no_bat.xlsx";
          break;
        case "WJ":
          this.getFun = getWj;
          this.getList = getWjList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_other_no_bat.xlsx";
          break;
        case "XZ":
          this.getFun = getXz;
          this.getList = getXzList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_other_no_bat.xlsx";
          break;
        case "SB":
          this.getFun = getEquipment;
          this.getList = getEquipmentList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_other_no_bat.xlsx";
          break;
        default:
          this.crud = [];
          this.loading = false;
          return;
      }
      query.yarnsId = "!^%" + (query.chemicalId || "");
      query.applyNo = "%" + (query.applyNo || "");
      query.yarnsCard = "%" + (query.yarnsCard || "");
      query.batId = "%" + (query.batId || "");
      query.chemicalId = query.yarnsId;
      query.officeId = query.yarnsId;
      query.accessoriesId = query.yarnsId;
      query.yarnsName = "%" + (query.chemicalName || "");
      query.chemicalName = query.yarnsName;
      query.officeName = query.yarnsName;
      query.fabricName = query.yarnsName;
      query.accessoriesName = query.yarnsName;
      query.proName = "!^%" + (query.proName || "");
      query.vatNo = "!^%" + (query.vatNo || "");
      query.noteCode = "%" + (query.noteCode || "");
      query.storeLoadCode = "%" + (query.storeLoadCode || "");
      query.batchNo = "%" + (query.batchNo || "");
      query.colorName = "%" + (query.colorName || "");
      query.fabName = query.fabricName = "%" + (query.fabName || "");
      query.isTree = true // 请求树状结构
      query.filterEmpty = this.filterEmpty  // 过滤空库存
      query.validSafe = true // 检验安全库存
      this.query = query;
      this.getFun(
        Object.assign({},query, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          clothState: 2,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        let data = res.data.records;
        this.outData = data;
        this.crud = data.map((item, idx) => {
          item.index = idx + 1;
          item.chemicalIds = item.accessoriesId || item.chemicalId || item.officeId || item.equipmentId || item.yarnsId
          item.chemicalNames = item.accessoriesName || item.chemicalName || item.officeName || item.equipmentName || item.yarnsName
          item.proName = item.proBatchNumber
          item.stock = (item.stock || 0).toFixed(2)
          item.clothWeight = (item.clothWeight || 0).toFixed(2)
          item.weight = (item.weight || 0).toFixed(2)
          item.nodes = item.childrenList;
          item.nodes.forEach((cItem, cIdx) => {
            cItem.index = item.index + "-" + (cIdx + 1);
            cItem.stock = (cItem.stock || 0).toFixed(2)
            cItem.clothWeight = (cItem.clothWeight || 0).toFixed(2)
            cItem.weight = (cItem.weight || 0).toFixed(2)

          });
          return item;
        });

        console.log("this.crud",this.crud)


        // 当查询结果为空时 重置后续
        if(this.crud.length == 0){
          this.chooseData.nodes = [];
        }

      }).finally(() => {
        if(this.crud.length) this.$refs.materialsCrud.setCurrentRow(this.crud[0]);
        this.loading = false;
      })
    },
    async outTransit(pType = 1) {
      let hasConfrim = await this.$tip.cofirm("是否确认导出报表").then(res => true).catch(err => false);
      if(!hasConfrim) return;
      switch (this.form.type) {
        case "CPB":
          let {vatNo} = this.form;
          this.handleOpenRpt("INVENTORY_PRODUCT_STOCK", {vatNo});
          break;
        case "PB":
          let {proName,noteCode} = this.form;
          if(pType == 2){
            this.handleOpenRpt("INVENTORY_FINISHED_CLOTH_TOTAL",{proName});
          }else{
            this.handleOpenRpt("INVENTORY_FINISHED_CLOTH",{proName,noteCode});
          }
          break;
        default:
          this.outExcel();
          return;
      }
    },
    // 打开报表 获取fineReport的数据
    handleOpenRpt(id, params = {}) {
      let queryData = {
        module: "INV",
        id,
      };
      let urlParams = Object.entries(params).filter(item => item[1]).map(item => `&${item[0]}=${item[1]}`).join("");
      fetchFineReportUrl(queryData).then((res) => {
        if (res.data) {
          let url = res.data.url + "&clothState=2";
          url += urlParams
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          this.$tip.warning(this.$t("tipLabel.noreport"));
        }
      });
    },
    async outExcel() {
      this.loading = true;
      try {
        //获得Excel模板的buffer对象
        const exlBuf = await JSZipUtils.getBinaryContent(this.typeObj.outAdr);
        var template = new XlsxTemplate(exlBuf);
        var sheetNumber = "Sheet1";
        // let data = [];
        // if (this.form.type == "WJ") {
        //   data = this.crud;
        // }else{
          // 导出查询到的所有数据
        let query = Object.assign({
          includeOtherParams: true
        }, this.query)
        let data = await this.getList(query).then(res => res.data);
        if(this.filterEmpty){
          data = data.filter((item) => {
            return item.weight || item.stock || item.clothWeight;
          })
        }
        let unitDictEnum = matUnit.reduce((a,b) => Object.assign(a, {[b.value]: b.label}), {});
        // allDataList.forEach((item, i) => {
        //   item.nodes.forEach((node) =>{
        //     node.$weightUnit = item.$weightUnit;
        //   })
        //   data = data.concat(JSON.parse(JSON.stringify(item.nodes)));
        // });
        // }
        data.forEach((item, i) => {
          item.$yinStatus =  item.yinStatus == '1' ?  "合格" : " 不合格",
          item.$weightUnit =   item.$weightUnit || unitDictEnum[item.weightUnit] || item.weightUnit,
          item.chemicalId =
            item.accessoriesId ||
            item.chemicalId ||
            item.officeId || item.equipmentId || item.yarnsId
          item.chemicalName =
            item.accessoriesName ||
            item.chemicalName ||
            item.officeName || item.equipmentName || item.yarnsName
          item.stock = item.weight || item.stock;
          item.locationCode = item.locationCode || item.storageNo ;
          item.index = i + 1;
        });
        var values = {
          arr: data,
        };
        this.$nextTick(() => {
          template.substitute(sheetNumber, values);
          // Get binary data.
          var out = template.generate({ type: "blob" });
          let _this = this;
          var fun1 = function () {
            return new Promise((resolve, reject) => {
              saveAs(out, _this.form.$type + "库存明细" + ".xlsx");
              resolve();
            });
          };
          fun1().then((res) => {
            setTimeout(() => {
              data = null;
              this.$tip.success("导出成功!");
              this.loading = false
            }, 500);
          });
          // });
        })
      } catch (e) {
        console.log(e);
      }
    },
    async handleRowDBLClick(row) {
      let type = this.form.type;
      if (!["SX", "RHL", "RLL", "WJ", "FL", "SB"].includes(type)) return;
      this.drawerVisible = true;
      await this.$nextTick();
      let params = {};
      switch (type) {
        case "SX":
          params = {
            yarnsId: row.yarnsId,
            yarnsCard: row.yarnsCard,
            batchNo: row.batchNo,
            batId: row.batId,
            locationCode: row.locationCode,
          };
          break;
        case "RHL":
          params = {
            materialId: row.chemicalId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "RLL":
          params = {
            materialId: row.chemicalId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "WJ":
          params = {
            materialId: row.accessoriesId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "FL":
          params = {
            materialId: row.accessoriesId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "SB":
          params = {
            materialId: row.chemicalId,
            storageNo: row.storageNo,
            batchNo: row.batchNo
          }
          break;
      }
      this.$refs.whseDtlRef.initData(type, params);
    },
    cellClick(val) {
      this.chooseData = val;
    },
  },
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) {
        this.$refs["materialsCrud"].doLayout();
        this.$refs["materialsItyCrud"].doLayout();
      }
    });
  },
  mounted() {

  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#ityInventory {
  .el-table__placeholder {
    display: none;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    // background-color: rgb(2, 26, 60);
    overflow: hidden !important;
  }
}
</style>
