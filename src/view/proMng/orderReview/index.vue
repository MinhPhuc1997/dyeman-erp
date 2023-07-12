<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-21 14:42:28
 * @Description:
-->
<template>
  <div id="orderReview" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <el-tabs v-model="activeName" type="border-card" @tab-click="query">
      <el-tab-pane :label="$t('revolve.title4')" name="first">
        <el-row class="btnList">
          <el-button type="success" @click="pass" v-if="form.auditState === 0" :disabled="!selectList.length">{{$t('public.audit')}}
          </el-button>
          <el-button type="success" @click="unpass" v-if="form.auditState === 1" :disabled="!selectList.length">{{$t('public.unaudit')}}
          </el-button>
          <el-button type="primary" @click="handleRowDBLClick(detail)"
            :disabled="!detail.runJobId && !detail.weaveJobId">{{$t("public.examine")}}</el-button>
          <el-button type="primary" @click="query">{{
            $t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" :row-style="rowStyle"
            v-loading="loading" @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"
            @sort-change="sortChange" @selection-change="selectionChange"></avue-crud>
        </el-row>
        <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
          :close-on-click-modal="false" :close-on-press-escape="false">
          <revolve v-if="activeName == 'first'" ref="tem" :detail="detail" :isAdd="false" :copyC="false" :audit="true"
            @close="dialogVisible = false" @refresh="query"></revolve>
          <weave ref="tem" :detail="detail" :jobType="1" :isAdd="false" :copyC="false" :audit="true"
            @close="dialogVisible = false" v-if="dialogVisible && activeName == 'two'" @refresh="query"></weave>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('dptReciveLog.weaveInfo')" name="two">
        <el-row class="btnList">
          <el-button type="success" @click="pass" v-if="wform.auditState === 0" :disabled="!wselectList.length">{{$t('public.audit')}}
          </el-button>
          <el-button type="success" @click="unpass" v-if="wform.auditState === 1" :disabled="!wselectList.length">{{$t('public.unaudit')}}
          </el-button>
          <el-button type="primary" @click="handleRowDBLClick(detail)"
            :disabled="!detail.runJobId && !detail.weaveJobId">{{$t("public.examine")}}</el-button>
          <el-button type="primary" @click="query">{{
          $t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="wformOp" v-model="wform"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud ref="wcrud" :option="wcrudOp" :data="wcrud" :page.sync="wpage" v-loading="loading" @on-load="query"
            @row-dblclick="handleRowDBLClick" @current-row-change="cellClick" @selection-change="selectionChange"
            @sort-change="sortChange"></avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud, mainWForm, mainWCrud } from "./data";
import {
  getDye,
  updateDye,
  addDye,
  getItem,
  addDyeProject,
  getTest,
  addDyeTest,
} from "../revolve/api";
import { get, update, getW, updateW } from "./api";
import revolve from "../revolve/temDlg.vue";
import weave from "../print/proWeaveJob/temDlg.vue";
import { addWash, addDyes, getTechargueList } from "../print/dyeing/api";
export default {
  name: "",
  components: {
    revolve,
    weave,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 1,
        vatNo: "",
        weaveJobCode: "",
        auditState: 0
      },
      wformOp: mainWForm(this),
      wform: {
        auditState: 0
      },
      wcrudOp: mainWCrud(this),
      wcrud: [],
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wpage: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      wselectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
      activeName: "first",
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      this.detail = {};
      if (this.activeName == "first") {
        let params = {
          vatNo: "%" + (this.form.vatNo || ""),
          weaveJobCode: "%" + (this.form.weaveJobCode || ""),
          salPoNo: "%" + (this.form.salPoNo || ""),
          colorCode: "%" + (this.form.colorCode || ""),
          custCode: this.form.custCode || '',
          serviceOperator: this.form.serviceOperator || '',
          auditState: this.form.auditState
        }
        get(
          Object.assign(params, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            pages: this.page.currentPage,
            // jobType: 1,
            dataSortRules: "workDate|desc,vatNo"
          })
        ).then((res) => {
          this.crud = res.data.records;
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          
        }).finally(() => {
          this.wLoading = false;
        })
      } else {
        let params = {
          weaveJobCode: "%" + (this.wform.weaveJobCode || ''),
          salPoNo: "%" + (this.wform.salPoNo || ''),
          colorCode: "%" + (this.wform.colorCode || ''),
          mathineCode: "%" + (this.wform.mathineCode || ''),
          creator: "%" + (this.wform.creator || ''),
          auditState: this.wform.auditState
        }
        getW(
          Object.assign(params, {
            rows: this.wpage.pageSize,
            start: this.wpage.currentPage,
            isWorkOut: 0,
            weaveState: 0,
            // jobType: 2,
            dataSortRules: "weaveJobCode|desc"
          })
        ).then((res) => {
          this.wcrud = res.data.records;
          if (this.wcrud.length > 0) {
            this.$refs.wcrud.setCurrentRow(this.wcrud[0]);
          }
          this.wcrud.forEach((item, i) => {
            item.index = i + 1;
          });
          this.wpage.total = res.data.total;
        }).finally(() =>{
          this.wLoading = false;
        })
      }
    },
    async handleRowDBLClick(val) {
      this.detail = val;
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.tem.initData();
    },
    pass() {
      this.$tip
        .cofirm(this.$t("tipLabel.auditTle"))
        .then(() => {
          this.wLoading = true;
          if (this.activeName == "first") {
            this.selectList.forEach((item, i) => {
              item.auditState = 1;
              item.modifiDate = this.$getNowTime("datetime");
              // item.runState = "1"
              update(item).then(async (res) => {
                let data = JSON.parse(JSON.stringify(item));
                data.proBleadyeRunJobFk = data.runJobId;
                data.test = "";
                data.item = "";
                // data.mergVatNo = data.mergVatNo.join("/");
                // data.compLightSource = data.compLightSource.join(",");
                data.dyeJarCount = Number(data.dyeVatType || 0);
                Object.keys(data).forEach((item) => {
                  if (this.isEmpty(data[item])) {
                    delete data[item];
                  }
                });
                // data.clothWeight = data.dyeClothWeight;
                data.poAmountLb = (data.poAmountKg * 2.2046226).toFixed(2);
                // 如果缸号包含 B W 不生成染整单
                let hasSplitWOrB = this.form.vatNo.indexOf('B') > 0 || this.form.vatNo.indexOf('W') > 0;
                if (!hasSplitWOrB) {
                  await getDye({
                    vatNo: data.vatNo,
                  }).then((dye) => {
                    // 追加数据源和数据类型 2022.10.21
                    Object.assign(data, {
                      sourceType: 'a',
                      sourceFk: data.runJobId
                    })
                    if (dye.data.length) {
                      data.bleadyeJobId = dye.data[0].bleadyeJobId;
                      // 存在数据,更新
                      updateDye(data).then((udye) => {
                        this.form.auditState = 1;
                      });
                    } else {
                      // 不存在数据，新增
                      addDye(data).then((adye) => {
                        this.addOtherData(adye.data.data);
                        // 新增生产项目
                        getItem({
                          proBleadyeRunJobFk: data.runJobId,
                        }).then((pres) => {
                          pres.data.forEach((item) => {
                            item.proBleadyeJobFk = adye.data.data;
                            addDyeProject(item).then((pro) => { });
                          });
                        });
                        // 新增测试要求
                        getTest({
                          proBleadyeRunJobFk: data.runJobId,
                        }).then((pres) => {
                          pres.data.forEach((item) => {
                            item.proBleadyeJobFk = adye.data.data;
                            addDyeTest(item).then((pro) => { });
                          });
                        });
                      });
                    }
                  });
                }

                if (i == this.selectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success(this.$t("public.auditSuccess"));
                  this.query();
                }
              });
            });
          } else {
            this.wselectList.forEach((item, i) => {
              item.auditState = 1;
              item.upateTime = this.$getNowTime("datetime");
              updateW(item).then((res) => {
                if (i == this.wselectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success(this.$t("public.auditSuccess"));
                  this.query();
                }
              });
            });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    unpass() {
      this.$tip
        .cofirm(this.$t("tipLabel.unauditTle"))
        .then(() => {
          this.wLoading = true;
          if (this.activeName == "first") {
            this.selectList.forEach((item, i) => {
              item.auditState = 0;
              item.runState = "1"; // 恢复未打印状态
              update(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success(this.$t("public.unauditSuccess"));
                  this.query();
                }
              });
            });
          } else {
            this.wselectList.forEach((item, i) => {
              item.auditState = 0;
              updateW(item).then((res) => {
                if (i == this.wselectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success(this.$t("public.unauditSuccess"));
                  this.query();
                }
              });
            });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === "" ||
        obj === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    addOtherData(dyeId) {
      getTechargueList()
        .then((res) => {
          // 獲取全部基礎工藝
          let washIndex = 1,
            dyeIndex = 1,
            testIndex = 1;
          res.data.forEach((item, index) => {
            if (item.paramType === "wash") {
              // 長車
              addWash({
                itemId: item.paramKey,
                itemName: item.paramName,
                proBleadyeJobFk: dyeId,
                sn: washIndex++,
              }).then((res) => { });
            } else if (item.paramType === "dyevat") {
              // 染缸
              addDyes({
                vatParamCode: item.paramKey,
                vatParamName: item.paramName,
                dataStyle: item.paramValueType,
                sn: dyeIndex++,
                proBleadyeJobFk: dyeId,
              }).then((res) => { });
            }
          });
        })
        .catch((e) => {
          this.wLoading = false;
        });
    },
    cellClick(val) {
      this.detail = val;
    },
    sortChange(val) {
      if (
        val.order &&
        (val.prop == "modifiDate" ||
          val.prop == "vatNo" ||
          val.prop == "upateTime" ||
          val.prop == "weaveJobCode")
      ) {
        this.sort = val;
        this.query();
      } else {
        this.sort = {};
      }
    },
    selectionChange(list) {
      if (this.activeName == "first") {
        this.selectList = list;
      } else {
        this.wselectList = list;
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.crud.doLayout();
    });
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#orderReview
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
  .avue-crud__menu
    height 35px !important
  .avue-dialog .el-drawer__body
    overflow auto
.avue-crud__dialog .el-transfer-panel__body
  height 80% !important
</style>
