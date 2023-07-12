<!--
 * @Author: Lyl
 * @Date: 2022-01-27 14:37:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-08 10:33:36
 * @FilePath: \iot.vue\src\view\proMng\dptReciveLog\index.vue
 * @Description:
-->
<template>
  <div id="dptReciveLog">
    <el-tabs v-model="tabs" type="card" v-loading="wloading" :element-loading-text="$t('public.loading')"
             @tab-click="tabChange">
      <el-tab-pane name="rd" :label="$t('dyeNo')" lazy></el-tab-pane>
      <el-tab-pane name="rp" label="统计看板" lazy></el-tab-pane>
      <el-tab-pane name="zd" :label="$t('weaveNo')" lazy></el-tab-pane>
      <el-tab-pane name="ssd" :label="$t('dptReciveLog.yarntestNote')" lazy></el-tab-pane>
      <template v-if="tabs=='rp'">
        <avue-crud ref="crud" id="crud" style="margin: 5px" :option="crudRPOp" :data="crudRP" @on-load="query" >
        </avue-crud>
      </template>
      <template v-else>
        <el-row class="btnList">
          <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
            <el-button type="primary" @click="add">{{ $t("public.add") }}</el-button>
          </el-tooltip>
          <el-popconfirm title="是否确定完结选中数据？" placement="top-start" @onConfirm="handleFinished">
            <el-button style="margin: 0 8px;" type="success" slot="reference" v-if="this.$store.getters.isSk">完结
            </el-button>
          </el-popconfirm>
          <el-button type="success" @click="flowVisible = true" style="margin-left: 8px">{{ $t("flowChart") }}
          </el-button>
          <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
            <el-button type="primary" @click="query">{{
              $t("public.query")
              }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="thống kê" placement="top-start">
            <el-button style="margin: 0 8px;" type="warning" v-if="tabs=='rd'" @click="visibleReport=true">产量统计
            </el-button>
          </el-tooltip>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <el-col :span="8" v-resize>
            <view-container :title="tabTitle" v-loading="sloading" :element-loading-text="$t('public.loading')">
              <avue-crud ref="crud" id="crud" style="margin: 5px" :option="crudOp" :data="crud" :page.sync="page"
                         v-loading="loading" @on-load="query" @row-dblclick="handleRowDBLClick"
                         @current-row-change="cellClick">
              </avue-crud>
            </view-container>
          </el-col>
          <el-col :span="16">
            <view-container :title="$t('dptReciveLog.acquiringLog')" v-loading="sloading"
                            :element-loading-text="$t('public.loading')">
              <avue-form ref="form" :option="formOpRp" v-model="formRp"/>
              <avue-crud ref="jdCrud" id="jdCrud" style="margin: 5px" :option="jdOp" :data="jd" v-loading="sloading"
                         :row-class-name="tableRowClassName">
              </avue-crud>
            </view-container>
          </el-col>
        </el-row>
        <el-dialog id="colorMng_Dlg" :visible.sync="flowVisible" width="70%" top="5vh" append-to-body>
          <flow-chart-pro ref="flowchartpro" v-model="fk"></flow-chart-pro>
        </el-dialog>
        <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="70%" append-to-body
                   :close-on-click-modal="false" :close-on-press-escape="false">
          <tem-dlg v-if="dialogVisible" ref="tem" :detail="detail" :isAdd="isAdd" :userId="userId" :tabs="tabs"
                   @close="dialogVisible = false" @refresh="query"></tem-dlg>
        </el-dialog>
        <el-dialog id="reposrt" :visible.sync="visibleReport" width="70%" append-to-body v-if="visibleReport">
          <reportView :vat-no="vatNoTemp"/>
        </el-dialog>
      </template>
    </el-tabs>
  </div>
</template>
<script>
  import flowChartPro from "@/components/flowChart2Pro/index.vue";
  import reportView from "./report.vue";
  import {
    mainForm,
    mainCrud,
    dlgCrud,
    weavecrud,
    weaveForm,
    yarnTestCrud,
    yarnForm,
    reportForm,
    reportKBCrud
  } from "./data";
  import {
    get,
    update,
    getWeave,
    getProcess,
    getLog,
    getRunJob,
    getLoginOrg,
    getDptWorkProcess,
    getYarntest,
    fetchProDptReciveLog, getNowReport
  } from "./api";
  import tem from "./temDlg";
  import Report from "./report";
  import {API, axiosGet} from "../../im/Wk/cc/actionCloth/api";

  export default {
    name: "",
    components: {
      Report,
      temDlg: tem,
      flowChartPro,
      reportView
    },
    data() {
      return {
        formOp: mainForm(this),
        form: {},
        formOpRp: reportForm(this),
        formRp: {},
        crudOp: mainCrud(this),
        crudRPOp: reportKBCrud(this),
        jdOp: dlgCrud(this),
        jd: [],
        crud: [],
        crudRP: [],
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
        },
        loading: false,
        dialogVisible: false,
        detail: {},
        isAdd: false,
        wloading: false,
        activities: [],
        sloading: false,
        spowerClient: null,
        tabs: "rd",
        flowVisible: false,
        fk: "",
        userId: "",
        tabTitle: '缸号信息',
        func: get,
        visibleReport: false,
        vatNoTemp: "",
        spanArr: [{
          prop: 'department',
          span: []
        },]
      };

    },
    watch: {},
    methods: {
      query() {
        this.loading = true;
        if(this.tabs == 'rp'){
          getNowReport({dayId:`20230107`}).then(res=>{
            res.data.map((e,i)=>{
              e.department = e.dispathReceive==1?e.dptworkProcessFk:e.sendProcessFk
            })
            res.data.sort((a,b)=>{
              return a.department > b.department ? -1 :1
            })
            res.data.map((e,i)=>{
              e.index = i+i
            })
            this.crudRP=res.data
            console.log(this.crudRP)
          })
          this.loading = false;
          return
        }
        for (let key in this.form) {
          if (this.form[key] == "") {
            delete this.form[key];
          }
        }
        let params = {
          weaveJobCode: "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : ""),
          vatNo: (this.form.vatNo ? this.form.vatNo : ""),
          yarntestNote: "!^%" + (this.form.yarntestNote || '')
        }
        if (this.tabs == 'zd') {
          params.dataSortRules = "calicoDate|desc,weaveJobCode"
        }
        this.func(
          Object.assign(params, {
            rows: this.page.pageSize,
            page: this.page.currentPage,
            start: this.page.currentPage,
          })
        ).then((res) => {
          this.crud = res.data.records;
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.page.total = res.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
      },
      tableRowClassName({row, rowIndex}) {
        console.log(row)
        if (row.dispathReceive === 1) { // 收单
          return 'success-rows';
        }
        return '';
      },
      tabChange() {
        if (this.tabs == "rd") {
          this.tabTitle = this.$t("dptReciveLog.vatInfo")  //'缸号信息';
          this.form.weaveJobCode = ''
          this.formOp = mainForm(this);
          this.crudOp = mainCrud(this)
          this.func = get
        } else if (this.tabs == "zd") {
          this.tabTitle = this.$t("dptReciveLog.weaveInfo") // '织单信息';
          this.form.vatNo = ''
          this.crudOp = weavecrud(this)
          this.formOp = weaveForm(this);
          this.func = getWeave
        } else {
          this.tabTitle = this.$t("dptReciveLog.yarnTest") // '试纱通知单信息';
          this.form.vatNo = ''
          this.form.weaveJobCode = ''
          this.crudOp = yarnTestCrud(this)
          this.formOp = yarnForm(this);
          this.func = getYarntest
        }
        this.$nextTick(() => {
          this.query();
        });
      },
      add() {
        this.isAdd = true;
        this.dialogVisible = true;
      },
      handleRowDBLClick(val) {
        // this.detail = val;
        this.flowVisible = true;
      },
      cellClick(val) {
        this.vatNoTemp = val.vatNo;
        this.sloading = true;
        this.fk = val.runJobId || val.weaveJobId || val.aloYarntestoid;

        // const today = new Date();
        // const yyyy = today.getFullYear();
        // let mm = today.getMonth() + 1; // Months start at 0!
        // let dd = today.getDate();
        // if (dd < 10) dd = '0' + dd;
        // if (mm < 10) mm = '0' + mm;
        // const nowDay = yyyy+mm+dd;
        axiosGet(API.outputStatDay, {vatNo: val.vatNo}).then((res) => {
          console.log(res)
          this.formRp = res.data

        })
        getLog({
          runJobId: this.fk,
        }).then((res) => {
          this.jd = res.data;
          this.sloading = false;
        });
      },
      async handleFinished() {
        if (!this.fk) return this.$tip.warning("请先选择要完结的单号");
        this.loading = true;
        await fetchProDptReciveLog({runJobFk: this.fk, dispathReceive: 1}).then(res => {
          if (!res.data.length) return this.$tip.warning("暂无数据!");
          let lastData = res.data.sort((a, b) => a.acceptDate > b.acceptDate ? 1 : -1)[res.data.length - 1];
          if (lastData.dispathReceive == 2) return this.$tip.warning("请先收单后再完结!");
          if (lastData.isend == 1) return this.$tip.warning("该单号已完结！");
          lastData.isend = 1;
          update(lastData).then(res => {
            if (res.data.code == 200) {
              this.$tip.success(this.$t('public.bccg'));
              this.query();
            } else {
              this.$tip.warning(this.$t('public.bcsb') + res.data.msg);
            }
          })
        }).finally(_ => {
          this.loading = false;
        })
      },
      rowCalc() {
        this.spanArr.forEach((ele, index) => {
          let parent
          if (index !== 0) parent = this.spanArr[ele.parent || index - 1].span
          ele.span = this.rowSpan(ele.prop, parent)
        })
      },
      rowSort(list) {
        let propList = this.spanArr.map(ele => ele.prop)
        this.spanArr.forEach((ele, index) => {
          let key = ele.prop
          this.crudRP = this.crudRP.sort((a, b) => {
            let flag = true;
            for (let i = 0; i < index; i++) {
              let prop = this.spanArr[i].prop
              flag = flag && a[prop] == b[prop]
            }
            if (flag) {
              if (a[key] < b[key]) {
                return 1;
              } else if (a[key] > b[key]) {
                return -1;
              }
              return 0;
            }
            return 0;
          })
        })
      },
      rowSpan(key, parent) {
        let list = [];
        let position = 0;
        this.crudRP.forEach((item, index) => {
          if (index === 0) {
            list.push(1)
            let position = 0;
          } else {
            if (this.crudRP[index][key] === this.crudRP[index - 1][key]) {
              if (parent && parent[index] !== 0) {
                list.push(1)
                position = index
              } else {
                list[position] += 1;
                list.push(0)
              }
            } else {
              list.push(1)
              position = index
            }
          }
        })
        return list
      },
      spanMethod({row, column, rowIndex, columnIndex}) {
        for (let i = 0; i < this.spanArr.length; i++) {
          const ele = this.spanArr[i]
          if (column.property == ele.prop) {
            const _row = ele.span[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        }
      }
    },
    created() {
      this.rowSort()
      this.rowCalc();
      getLoginOrg({account: parent.userID}).then((res) => {
        if (res.data) {
          getDptWorkProcess().then((dpt) => {
            for (let i = 0; i < dpt.data.length; i++) {
              if (dpt.data[i].orgNo.indexOf(res.data.orgno) != -1) {
                this.userId = dpt.data[i].dptCode;
                break;
              }
            }
          });
        }
      });
      this.spowerClient = this.$store.state.spowerClient;
      let _this = this;
      _this.spowerClient.onmessage = function (e) {
        if (e.data.indexOf("scan") != -1) {
          _this.$nextTick(() => {
            let scanData = e.data.split("scan=")[1];
            if (scanData.indexOf("WG") != -1) {
              _this.tabs = "zd";
              getWeave({
                weaveJobCode: scanData,
              }).then(async (res) => {
                _this.dialogVisible = true;
                await _this.$nextTick();
                // setTimeout(() => {
                if (res.data.records.length) {
                  _this.$refs.tem.remoteMethod(
                    res.data.records[0].weaveJobCode,
                    _this.dialogVisible
                  );
                } else {
                  _this.$tip.error(this.$t("tipLabel.notWeaveInfo"));
                }
                // }, 200);
              });
            } else {
              _this.tabs = "rd";
              getRunJob({
                vatNo: scanData,
              }).then(async (res) => {
                _this.dialogVisible = true;
                await _this.$nextTick();
                // setTimeout(() => {
                if (res.data.length) {
                  _this.$refs.tem.remoteMethod(
                    res.data[0].vatNo,
                    _this.dialogVisible
                  );
                  // _this.detail.runJobFk = res.data[0].runJobId;
                } else {
                  _this.$tip.error(this.$t("tipLabel.notVatInfo"));
                }
                // }, 200);
              });
            }
          });
        }
      };
    },
    mounted() {
      getProcess().then((res) => {
        res.data = res.data.sort((a, b) => {
          return a.sn > b.sn ? 1 : -1;
        });
        res.data.forEach((item, i) => {
          this.activities.push({
            content: item.dptName,
            timestamp: "",
            size: "large",
            type: "info",
            // color: "#0bbd87",
          });
        });
      });

    },
    beforeDestroy() {
    },
  };
</script>
<style lang='stylus'>
  #dptReciveLog {
    border-left: 1px solid #ccc;

    .el-tabs__header {
      margin: 0
    }

    .el-timeline-item {
      padding-bottom: 10px;
      font-size: 16px;
    }
  }

  .warning-rows {
    background-color: rgba(103, 194, 58, 0.71) !important; //F56C6C
    // color: #fff;
  }

  .success-rows {
    background-color: rgba(103, 194, 58, 0.24) !important; //67C23A
  }

</style>
