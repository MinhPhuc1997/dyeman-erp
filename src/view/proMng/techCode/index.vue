<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-28 11:23:30
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container
      :title="$t('techCode.title1')"
      v-loading="wloading"
      :element-loading-text="$t('public.loading')"
    >
      <el-row class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        >
          <el-button
            type="success"
            :disabled="!detail.bleadyeCodeId"
            @click="handleRowDBLClick(detail)"
            >{{ this.$t("public.update") }}</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="thêm mới "
          placement="top-start"
        >
          <el-button type="primary" @click="add">{{
            this.$t("public.add")
          }}</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="xóa"
          placement="top-start"
        >
          <el-button
            type="danger"
            :disabled="!detail.bleadyeCodeId"
            @click="del"
            >{{ this.$t("public.del") }}</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="tìm kiếm"
          placement="top-start"
        >
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
        </el-tooltip>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        >
        </avue-crud>
      </el-row>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="dialogVisible"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <tem-dlg
          v-if="dialogVisible"
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          @close="dialogVisible = false"
          @refresh="query"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, getDtl, delDtl } from "./api";
import tem from "./temDlg";
export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      let params = {
        bleadyeCode: "!^%" + (this.form.bleadyeCode || ''),
        bleadyeName: "!^%" + (this.form.bleadyeName || ''),
        techPart: this.form.techPart
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          for (let key in item) {
            if (item[key] == null) {
              item[key] = undefined;
            }
          }
          if (item.bleadyeImageId) {
            item.bleadyeImageId = "√";
          } else {
            item.bleadyeImageId = "-";
          }
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip
        .cofirm(this.$t("tipLabel.deleteConfirm"), this, {})
        .then(() => {
          del(this.detail.bleadyeCodeId)
            .then((res) => {
              if (res.data.code === 200) {
                getDtl(
                  Object.assign({
                    proBleadyeTechCodeFk: this.detail.bleadyeCode,
                    rows: 999,
                    start: 1,
                  })
                ).then((res) => {
                  res.data.records.forEach((item, i) => {
                    delDtl(item.codeItemIt).then((res) => {});
                  });
                });
                setTimeout(() => {
                  this.$tip.success(this.$t("public.sccg"));
                  this.query();
                }, 200);
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.detail = val;
    },
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>