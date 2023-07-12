/* * @产能公式 * Created by Lyl * on 2019-11-9 17:50:43. */
<template>
  <div id="ProWorkflow">
    <el-row>
      <el-col class="queryForm">
        <el-tabs type="border-card" v-loading="loading">
          <el-tab-pane :label="$t('ProWorkflow.tab1')">
            <div class="btnList">
              <el-button type="success" size="mini" @click="save">{{
                this.$t("public.save")
              }}</el-button>
              <el-button type="primary" size="mini" @click="addBtn">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" size="mini" @click="del">{{
                this.$t("public.del")
              }}</el-button>
              <!-- <el-button type="warning" size="mini" @click="close">{{
                this.$t("public.close")
              }}</el-button> -->
              <!-- <el-button type="primary" size="mini" @click="handleList"
                >{{this.$t("public.query")}}</el-button
              > -->
            </div>
            <!-- <div :span="24">
              <avue-form :option="formOption" v-model="form"></avue-form>
            </div> -->
            <el-row class="content">
              <el-col :span="5">
                <view-container :title="$t('ProWorkflow.tab2')">
                  <el-card>
                    <el-tree
                      ref="proTree"
                      style="margin-top: 2px; margin-left: 10px"
                      :data="gridData"
                      :props="defaultProps"
                      accordion
                      node-key="stepId"
                      :default-expanded-keys="defaultShowNodes"
                      @node-click="handleNodeClick"
                      @node-expand="handleNodeExpand"
                      @node-collapse="handleNodeCollapse"
                    >
                    </el-tree>
                  </el-card>
                </view-container>
              </el-col>
              <el-col :span="19">
                <view-container  :title="$t('ProWorkflow.tab3')" style="margin-left: 5px">
                  <el-card>
                    <avue-form
                      style="margin-top: 10px"
                      :option="crudOp"
                      v-model="detail"
                    ></avue-form>
                  </el-card>
                </view-container>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var eqType = [];

import { get, add, del, update } from "./api";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      isAdd: false, //判断是新增还是编辑
      gridData: [],
      data: [],
      gridOption: {
        menuAlign: "center",
        menuWidth: 100, //最小值
        labelWidth: 110,
        dialogHeight: 150,
        delBtn: false,
        addBtn: false,
        menu: false,
        border: true,
        editBtn: true,
        height: "calc(100vh - 210px)",
        refreshBtn: false, //刷新按钮
        columnBtn: false, //显隐按钮
        addRowBtn: false,
        cellBtn: false,
        selection: false,
        highlightCurrentRow: true,
        column: [
          {
            prop: "index",
            label: "#",
            width: 60,
            align: "center",
          },
          {
            // 关键词
            label: this.$t("ProWorkflowInfo.gjc"),
            prop: "keyCode",
            // type: "select",
            // dicData: getDicT("basProductionDtlcList","procedureName","procedureId"),
            width: 100,
            // change: row => {
            //   this.rowDate.keyName = row.value;
            //   console.log(row);
            // },
            disabled: true,
          },
          // {
          //   // 关键词
          //   label: this.$t("ProWorkflowInfo.gjcmc"),
          //   prop: "keyName",
          //   cell: true
          // },
          {
            // 工序名称
            label: this.$t("ProWorkflowInfo.gxmc"),
            prop: "keyName",
            type: "select",
            cell: true,
            dicData: getDicT(
              "basProductionDtlcList",
              "procedureName",
              "procedureId"
            ),
            change: (row) => {
              this.keyNameChange();
            },
            width: 160,
          },
          {
            // 设备型号
            label: this.$t("ProWorkflowInfo.sbxh"),
            prop: "equModel",
            type: "select",
            dicData: getDicT(
              "baseEquipmentCategoryList",
              "categoryCode",
              "categoryId"
            ),
            cell: true,
            width: 200,
          },
          {
            // 公式
            label: this.$t("ProWorkflowInfo.gs"),
            prop: "formula",
            cell: true,
            width: 300,
          },

          {
            // 关键词描述
            label: this.$t("ProWorkflowInfo.gjcms"),
            prop: "keyDesc",
            cell: true,
            width: 220,
          },
        ],
      },
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 165px)",
        refreshBtn: false,
        columnBtn: false,
        page: false,
        tree: true,
        children: "nodes",
        rowKey: "stepCode",
        labelWidth: 120,
        column: [
          // {
          //   prop: "index",
          //   label: "#",
          //   width: 60,
          //   align: "center",
          // },
          {
            label: this.$t('ProWorkflow.stepCode'), // "工序编号",
            prop: "stepCode",
            width: 120,
            cell: true,
            placeholder: " ",
            span: 8,
          },
          {
            label:  this.$t('dptReciveLog.stepName'), // 工序名称,
            prop: "stepName",
            span: 8,
            cell: true,
            placeholder: " ",
          },
          {
            label: this.$t('sn'), // "序号",
            prop: "stepSn",
            span: 8,
            cell: true,
            placeholder: " ",
          },

          // {
          //   label: "工序层次",
          //   prop: "stepLevel",
          //   span: 8,
          //   width: 180,
          //   cell: true,
          //   placeholder: " ",
          // },
          // {
          //   label: "工序输入",
          //   prop: "stepIn",
          //   span: 8,
          //   width: 180,
          //   cell: true,
          //   placeholder: " ",
          // },
          // {
          //   label: "工序输出",
          //   prop: "stepOut",
          //   span: 8,
          //   width: 180,
          //   cell: true,
          //   placeholder: " ",
          // },

          {
            label:  this.$t("ProWorkflow.stepCapacity"), // 产能计算公式
            prop: "stepCapacity",
            span: 16,
            width: 180,
            cell: true,
            placeholder: " ",
          },
          {
            label:  this.$t("ProWorkflow.stepLayout"), // 工序布局
            prop: "stepLayout",
            span: 8,
            width: 180,
            cell: true,
            placeholder: " ",
          },

          {
            label:  this.$t("ProWorkflow.standardFormula"), // 时间计算公式
            prop: "standardFormula",
            span: 16,
            width: 180,
            cell: true,
            placeholder: " ",
          },
          {
            label:  this.$t("ProWorkflow.stepConstraint"), // 是否瓶颈工序
            prop: "stepConstraint",
            width: 120,
            span: 8,
            type: "switch",
            cell: true,
            placeholder: " ",
            dicData: [
              {
                label: this.$t("public.false"),
                value: false,
              },
              {
                label: this.$t("public.true"),
                value: true,
              },
            ],
          },
          {
            label:  this.$t("ProWorkflow.stepDescribe"), //描述信息
            prop: "stepDescribe",
            span: 16,
            width: 250,
            cell: true,
            placeholder: " ",
          },
          {
            label:  this.$t("ProWorkflow.stepHsMilestone"), //是否里程碑
            prop: "stepHsMilestone",
            width: 120,
            span: 8,
            type: "switch",
            cell: true,
            placeholder: " ",
            dicData: [
              {
                label: this.$t("public.false"),
                value: false,
              },
              {
                label: this.$t("public.true"),
                value: true,
              },
            ],
          },
        ],
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        card: false,
        menuBtn: false,
        labelWidth: 110,
        column: [
          {
            label:  this.$t("ProWorkflow.stepCode"), //工序编号
            prop: "stepCode",
            span: 6,
          },
          {
            label:  this.$t("sn"), // "序号",
            prop: "stepSn",
            span: 6,
          },
        ],
      },
      testData: [],
      rowCode: [], //勾选选中的ID
      rowDate: {},
      checkData: {},
      oldData: {},
      loading: false,
      defaultProps: {
        children: "nodes",
        label: "stepName",
      },
      detail: {},
      studentTree: [], // 我的树结构数据
      defaultShowNodes: [], // 这里存放要默认展开的节点 id
    };
  },
  methods: {
    //查询
    handleList() {
      this.loading = true;
      this.detail = {};
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      get()
        .then((res) => {
          this.gridData = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].stepName === "生产过程") {
              this.nodeId = res.data[i].stepId;
              this.gridData = res.data[i].nodes;
              this.currentNodeKey = this.detail.stepId;
              // this.$nextTick(() => {
              // if (this.detail.stepId) {
              //   this.$refs.proTree.setCurrentKey(this.detail.stepId);
              // }
              this.loading = false;
              // });
            } else if (i === res.data.length - 1) {
              setTimeout(() => {
                // this.$tip.warning("暂无数据!");
                this.loading = false;
              }, 200);
            }
          }
          if (this.gridData.length === 0) {
            // this.$tip.warning("暂无数据!");
            this.loading = false;
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log("服务器错误" + err);
        });
    },
    save() {
      if (!this.detail.stepCode) {
        this.$tip.warning(this.$t("ProWorkflow.saveTle"));
        return;
      } else if (!this.detail.stepName) {
        this.$tip.error(this.$t("ProWorkflow.saveTle2"));
        return;
      }
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.detail));
      data.nodes = null;
      data.workEquipmentModeInfols = "";
      if (this.detail.stepId) {
        // update

        update(data)
          .then((res) => {
            if (res.data.code === 200) {
              this.detail.stepName = data.stepName;
              this.$tip.success(this.$t("public.bccg"));
            }
          })
          .catch((err) => {
            this.$tip.error(this.$t("public.bcsb") + err);
          });
      } else {
        // add
        add(data)
          .then((res) => {
            if (res.data.code === 200) {
              this.detail.stepId = res.data.data;
              this.$tip.success(this.$t("public.bccg"));
            }
          })
          .catch((err) => {
            this.$tip.error(this.$t("public.bcsb") + err);
          });
      }
      setTimeout(() => {
        this.handleList();
        // this.loading = false;
      }, 200);
    },
    addBtn() {
      if (!this.detail.stepId && !this.detail.stepCode) {
        // 最外层
        this.gridData.push({
          stepName: "新节点",
          pareantId: this.nodeId,
          stepCode: this.$preFixInt(this.gridData.length + 1, 3),
          stepSn: this.gridData.length + 1,
        });
        // this.$nextTick(() => {
        //   this.detail = this.gridData[this.gridData.length - 1];
        //   this.$refs.proTree.setCurrentKey(
        //     this.gridData[this.gridData.length - 1].stepId
        //   );
        // });
      } else if (this.detail.stepId && this.detail.pareantId) {
        // 新节点
        if (!this.detail.nodes) {
          this.detail.nodes = [];
        }
        let data = {
          pareantId: this.detail.stepId,
          stepName: "新节点",
          stepSn: this.detail.nodes.length + 1,
          stepCode:
            this.detail.nodes.length > 0
              ? this.detail.stepCode +
                "-" +
                this.$preFixInt(this.detail.nodes.length + 1, 3)
              : this.detail.stepCode + "-" + "001",
        };
        this.detail.nodes.push(data);
      } else {
        this.$tip.error(this.$t("ProWorkflow.saveTle3"));
        return;
      }
    },
    //删除
    del() {
      if (this.detail.nodes && this.detail.nodes.length > 0) {
        this.$tip.error(this.$t("ProWorkflow.delTle"));
        return;
      }
      if (this.detail.stepId) {
        cofirm(
          this.$t("ProWorkflow.delTle1") + this.detail.stepName + this.$t("tipLabel.delEnd"),
          this.$t("tips")
        )
          .then(() => {
            del(this.detail.stepId)
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  // this.gridData.splice([this.checkData.$index], 1);
                  // setTimeout(() => {
                  this.handleList();
                  this.detail = {};
                  //   this.$refs.crud.setCurrentRow();
                  // }, 100);
                } else {
                  error(this.$t("public.scsb"));
                }
              })
              .catch((err) => {
                error("服务器错误");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("public.cancelTle"),
            });
          });
      } else {
        this.handleList();
      }
    },
    //双击编辑
    rowClick(row, column, cell, event) {
      this.$refs.crud.rowCell(row, row.$index);
    },
    keyNameChange() {
      if (this.checkData.isAdd) {
        this.loading = true;
        this.$nextTick(() => {
          this.$http
            .get("/api/baseStandarFormulaKey?keyCode=" + this.checkData.keyName)
            .then((res) => {
              if (res.data === "") {
                this.$set(this.checkData, "keyCode", this.checkData.keyName);
              } else {
                this.checkData.keyName = "";
                error(this.$t("ProWorkflow.changeTle"));
              }
              this.loading = false;
            });
        });
      }
    },
    // 获取
    handleCurrentRowChange(val) {
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.checkData = val;
      this.$nextTick(() => {
        if (this.checkData.isAdd) {
          this.gridOption.column[2].cell = true;
        } else {
          this.gridOption.column[2].cell = false;
        }
      });
    },
    handleNodeClick(val) {
      for (var key in this.detail) {
        delete this.detail[key];
      }
      this.detail = val;
    },
    // 树节点展开
    handleNodeExpand(data) {
      // 保存当前展开的节点
      let flag = false;
      this.defaultShowNodes.some((item) => {
        if (item === data.stepId) {
          // 判断当前节点是否存在， 存在不做处理
          flag = true;
          return true;
        }
      });
      if (!flag) {
        // 不存在则存到数组里
        this.defaultShowNodes.push(data.stepId);
      }
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes.some((item, i) => {
        if (item === data.stepId) {
          // 删除关闭节点
          this.defaultShowNodes.length = i;
        }
      });
    },
  },
  created() {
    this.handleList();
  },
};
</script>

<style lang="stylus">
#ProWorkflow {
  .el-table__row--level-1 {
    text-indent: 1em;
  }

  .el-table__row--level-2 {
    text-indent: 1.5em;
  }

  .content {
    .el-tree {
      height: calc(100vh - 180px) !important;
      overflow: auto;
    }

    .el-card {
      height: calc(100vh - 155px) !important;
    }
  }
}
</style>
