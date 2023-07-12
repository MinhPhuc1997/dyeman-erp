<!--
 * @Description:
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:10:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-10 09:21:11
-->
<template>
  <div class="whse-yarn-pre-alloc-container-container">
    <view-container title="物料报废申请" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleAdd" v-hasPerm="['whse:scrapApply:add']">{{
            this.$t("public.add")
          }}
        </el-button>
        <el-button type="warning" @click="handleUpdate" v-hasPerm="['whse:scrapApply:edit']">
          {{ this.$t("public.update") }}
        </el-button>
        <el-button type="danger" @click="handleDelete" :disabled="hasEdit" v-hasPerm="['whse:scrapApply:del']">
          {{ this.$t("public.del") }}
        </el-button>
        <el-button type="primary" @click="handleQuery" v-hasPerm="['whse:scrapApply:list']">
          {{ this.$t("public.query") }}
        </el-button>
        <el-button type="success" :disabled="!hasEdit" @click="handlePrintRpt"
                   v-hasPerm="['whseMng:scrapApply:print']">打印报表
        </el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
      </div>
      <avue-crud
        ref="crud"
        :option="mainCrudOp"
        :data="mainCrudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @row-dblclick="handleRowDBLClick"
        @row-click="handleRowClick"
      >
        <template slot="hasConfirm" slot-scope="{row}">
          <div>
            <span :class="['point', row.hasConfirm ? 'success' : 'danger']"></span>
          </div>
        </template>
      </avue-crud>

      <el-dialog :visible.sync="dtlDialogVisible" append-to-body fullscreen>
        <whse-dtl ref="scrapApplyDtlRef" @close="handleCloseDtlDialog"/>
      </el-dialog>

    </view-container>
  </div>
</template>
<script>
import {fetchScrapApplyData, removeScrapApplyData} from "./api"
import {fetchFineReportUrl} from "@/api/index.js"
import {queryFormOp, mainCrudOp} from "./data";
import WhseDtl from "./whseDtl.vue"
import axios from "axios"

export default {
  name: "yarnPreAlloc",
  components: {
    "whse-dtl": WhseDtl,
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      queryFormOp: queryFormOp(this),
      queryForm: {},
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      mainCrudOp: mainCrudOp(this),
      mainCrudDataList: [],
      // 当前点击对象
      curSelRow: {},

      dtlDialogVisible: false,
    }
  },
  computed: {
    hasEdit() {
      return this.curSelRow.hasConfirm;
    },
    // 是否为仓管 （只允许刘亚顺账号进行操作）
    isWareAdmin() {
      return parent.userID === 'liuyas'
    }
  },
  methods: {
    // 打印报表
    async handlePrintRpt() {
      let {whseMatScrapApplyoid: id, applyCode, matType} = this.curSelRow
      if (!id) return this.$tip.warning("请选择数据");
      let confirmRes = await this.$tip.cofirm(`是否确认导出申请编号为${applyCode}的数据`).then(_ => true).catch(_ => false);
      if (!confirmRes) return false;

      let parmas = {
        module: "WHSE",
        id: "SCRAP_APPLY",
      }
      fetchFineReportUrl(parmas).then(res => {
        let url = res.data.url;
        // ### 存在不同模板
        let urlTemplateParams = ""
        switch (matType) {
          case "SX":
            urlTemplateParams = 'sx';
            break;
          case "HRL":
          case "RLL":
            urlTemplateParams = "noBoard";
            break;
          default:
            urlTemplateParams = "noBatId";
            break;
        }
        url = url.replace("###", urlTemplateParams);
        url += `&oid=${id}`
        console.log("target Url", url)
        let oA = document.createElement('a');
        oA.target = "_blank";
        oA.href = url;
        oA.click();
      })
    },
    // 数据删除
    async handleDelete() {
      let {whseMatScrapApplyoid: id, applyCode} = this.curSelRow
      if (!id) return this.$tip.warning("请选择数据");
      let confirmRes = await this.$tip.cofirm(`是否确认删除申请编号为${applyCode}的数据`).then(_ => true).catch(_ => false);
      if (!confirmRes) return false;
      this.loading = true;
      removeScrapApplyData({id}).then(res => {
        if (res.data.code == 200) {
          this.$tip.success(this.$t('public.sccg'));
          this.getDataList();
        }
      }).finally(_ => {
        this.loading = false;
      })

    },
    async handleAdd() {
      this.dtlDialogVisible = true;
      await this.$nextTick();
      this.$refs.scrapApplyDtlRef.initData()
    },
    handleUpdate() {
      this.handleRowDBLClick(this.curSelRow)
    },
    handleQuery() {
      this.page.currentPage = 1;
      this.getDataList();
    },
    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        dataSortRules: "applyCode|desc",
      };
      let keyProps = ["matType", "hasConfirm"];
      keyProps.forEach(prop => {
        if (this.queryForm[prop]) {
          params[prop] = this.queryForm[prop]
        }
      })
      let likeProps = ['batchNo'];
      likeProps.forEach(prop => {
        if (this.queryForm[prop]) {
          params[prop] = '%' + this.queryForm[prop]
        }
      })
      this.loading = true;
      fetchScrapApplyData(params).then(res => {
        this.mainCrudDataList = res.data.records;
        if (this.mainCrudDataList.length) {
          this.dltCrudDataList = this.mainCrudDataList[0].dtlList
        } else {
          this.dltCrudDataList = [];
        }
        this.page.total = res.data.total;
      }).finally(() => {
        this.loading = false;
      })
    },
    async handleRowDBLClick(row) {
      this.dtlDialogVisible = true;
      await this.$nextTick();
      this.$refs.scrapApplyDtlRef.setMatScrapApplyData(row);
    },
    handleRowClick(row) {
      this.curSelRow = row;
      this.dltCrudDataList = row.dtlList;
    },
    // 关闭明细弹窗
    handleCloseDtlDialog(isRefresh) {
      this.dtlDialogVisible = false;
      if (isRefresh) {
        this.page.currentPage = 1;
        this.getDataList();
      }
    }
  }
}
</script>
<style lang="stylus">
.whse-yarn-pre-alloc-container-container {
  .point {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;

    &.danger {
      background: #f66
    }

    &.success {
      background: #0dbc79
    }
  }
}
</style>

