<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-27 13:34:22
 * @Description:
-->
<template>
  <div id="ityInventory">
    <view-container title="在库载具查询">
      <div class="btnList">
        <el-button type="success" @click="handleOutReport(1)" :loading="loading"
                   v-hasPerm="['whse:stockVehicle:export']"> 汇总报表
        </el-button>
        <el-button type="success" @click="handleOutReport(2)" :loading="loading" :disabled="form.type == 1"
                   v-hasPerm="['whse:stockVehicle:detail']"> 明细报表
        </el-button>
        <el-button type="primary" @click="getData" :loading="loading" v-hasPerm="['whse:stockVehicle:list']">
          {{ $t("public.query") }}
        </el-button>
        <el-button type="primary" @click="sync" :loading="loading" v-hasPerm="['whse:stockVehicle:sync']">同步
        </el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          :element-loading-text="loadLabel"
          v-loading="loading"
          @on-load="getData"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import {fetchStockVehicleByPage, fetchNoteStockVehicleByPage} from "./api";
import {formOp, crudOp} from "./data";
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
import {axiosGet} from "../../Wk/cc/actionCloth/api";

export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadLabel: this.$t('public.loading'),
      page: {
        pageSizes: [50, 100, 200, 500, 1000],
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      formOp: formOp(this),
      form: {
        type: 2
      },
      crudOp: crudOp(this),
      crud: [],
      chooseData: {},
    };
  },
  watch: {},
  methods: {
    sync() {
      this.crud.map(async (e) => {
        let res = await axiosGet("/api/viewWmsTray/revise", {palletCode: e.palletCode})
      })
      this.getData();
    },
    getData() {
      this.loading = true;
      this.crud = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let params = {
        palletCode: "!^%" + (this.form.palletCode || ""),
        vatNo: "%" + (this.form.vatNo || ""),
        weaveJobCode: "%" + (this.form.weaveJobCode || ""),
        storageId: "%" + (this.form.storageId || ""),
      };
      (this.form.type == 1 ? fetchNoteStockVehicleByPage : fetchStockVehicleByPage)(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        this.crud = res.data.records;
      }).finally((_) => {
        this.loading = false;
      })
    },
    async handleOutReport(val) {
      this.loading = true;
      if (val == 1) {
        this.getData();
        try {
          //获得Excel模板的buffer对象
          let type = this.form.type == 1 ? 'cloth_vehicles_in_stock' : 'finished_vehicles_in_stock';
          const exlBuf = await JSZipUtils.getBinaryContent("./static/xlxsTemplate/" + type + ".xlsx");
          var template = new XlsxTemplate(exlBuf);
          var sheetNumber = "Sheet1";
          let params = {
            palletCode: "!^%" + (this.form.palletCode || ""),
            vatNo: "%" + (this.form.vatNo || ""),
            weaveJobCode: "%" + (this.form.weaveJobCode || ""),
            storageId: "%" + (this.form.storageId || ""),
            rows: 9999,
            start: 1,
          };
          let resData = await (this.form.type == 1 ? fetchNoteStockVehicleByPage : fetchStockVehicleByPage)(params);
          var values = {
            arr: resData.data.records,
          };
          this.$nextTick(() => {
            template.substitute(sheetNumber, values);
            // Get binary data.
            var out = template.generate({type: "blob"});
            let _this = this;
            let fun1 = function () {
              return new Promise((resolve, reject) => {
                saveAs(out, _this.form.$type + "载具库存明细" + ".xlsx");
                resolve();
              });
            };
            fun1().then((res) => {
              resData = null
              this.$tip.success("导出成功!");
              this.loading = false
            });
          })
        } catch (e) {
          console.log(e);
          this.loading = false
        }
      } else {
        let url = process.env.API_HOST + "/api/viewWmsTray/exportReport";
        let oA = document.createElement("a");
        oA.href = url;
        oA.target = "_blank";
        oA.click();
        this.loading = false;
      }
    },
  },
  created() {
  },
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) {
        this.$refs["crud"].doLayout();
      }
    });
  },
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>
<style lang='stylus'></style>
