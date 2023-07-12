<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-04-11 08:23:57
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container :title="viewTitle" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" :disabled="hasNotEdit" @click="handleSave">{{ $t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ $t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="withDrawalFormOp" v-model="withDrawalFormData"></avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="dtl" :label="paneLabel">
          <div class="btnList">
            <el-button type="primary" :disabled="hasNotEdit" @click="handleAddByYarnStock">{{ $t("retMatNotice.btn1") }}</el-button>
            <el-button type="danger" :disabled="hasNotEdit" @click="handleDtlDelete">{{ $t("public.del") }}</el-button>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="crud"
              :option="dtlCrudOp"
              :data="crudDataList"
              :page.sync="page"
              v-loading="loading"
              @selection-change="handleSelectionChange"
            ></avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
    </view-container>

    <inv-select 
      ref="invSelectRef" 
      @data-select="handleInvSelect"
      :matType="matType"
      :filterZeroStock="false"
      :hideOtherCol="true"
      :unifiedFormat='true'
      :isMergeStorage="true"
    ></inv-select>
  </div>
</template>

<script>
import { withDrawalFormOp, dtlCrudOp, dataTyptEnum } from "./data";
import {
  addWithDrawal,
  updateWithDrawal,
  batchAddOrUpdateDtl,
  batchDelDtlDataById,
  fetchWithDrwarlDtlDataList
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { fetchValidOutWeight } from "@/components/InventorySelect/api"
import { timeConversion } from "@/config/util";
import InventorySelect from "@/components/InventorySelect"
import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components:{
    "inv-select": InventorySelect
  },
  props: {
    withDatalData: {
      type: Object,
      default: () => ({})
    },
    matType:{
      type: String|Number,
      default: "3"
    }
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      withDrawalFormOp: withDrawalFormOp(this),
      withDrawalFormData: {},
      tabName: "dtl",
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dtlCrudOp: dtlCrudOp(this),
      crudDataList: [],

      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  是否刷新
      hasRefresh: false,
    };
  },
  computed:{
    hasNotEdit(){
      return this.withDatalData.isInStock 
    },
    viewTitle(){
      return dataTyptEnum[this.matType].viewTitle + this.$t("public.dataMaintenance") // "数据维护"
    },
    paneLabel(){
      return dataTyptEnum[this.matType].viewTitle + this.$t("public.details") // "明细"
    }
  },
  watch: {
    withDatalData: {
      handler(value) {
        let { oidKey } = dataTyptEnum[this.matType]
        if (value[oidKey]) {
          this.setWithDrawalData();
        } else {
          this.initData();
        }
        this.hasRefresh = false;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 从库存中进行新增
    handleAddByYarnStock(){
      this.$refs.invSelectRef.invSelDiaVisible = true;
    },
    // 初始化数据
    initData() {
      let { oidKey } = dataTyptEnum[this.matType]
      this.withDrawalFormData = {
        [oidKey]: "",
        withdrawalNo: "",
        happenDate: "",
        typeOf: "",
        extFactId: ""
      };
      this.crudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
    },
    // 获取数据
    setWithDrawalData() {
      let { oidKey } = dataTyptEnum[this.matType];
      this.withDrawalFormData = this.withDatalData;
      this.getWithDrawalDtlDataList(this.withDatalData[oidKey]);
    },
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      let { dtlFkKey } = dataTyptEnum[this.matType];
      fetchWithDrwarlDtlDataList({ [dtlFkKey]: oid },this.matType)
        .then(res => {
          this.crudDataList = res.data.map(item => {
            item.$cellEdit = true;
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //   删除明细
    handleDtlDelete() {
      if (this.selectList.length == 0) return this.$tip.warning(this.$t("tipLabel.notCheckData"));
      let { dtlOidKey } = dataTyptEnum[this.matType];
      this.selectList.forEach(item => {
        if (!item.isAdd) {
          this.delOidList.push(item[dtlOidKey]);
        }
        let tarIdx = this.crudDataList.findIndex(
          cItem =>
            cItem[dtlOidKey] == item[dtlOidKey]
        );
        this.crudDataList.splice(tarIdx, 1);
      });
    },
    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },
    // 库存选择回调
    handleInvSelect(rows){
      let { materialIdKey, materialNameKey,dtlOidKey } = dataTyptEnum[this.matType];
      this.crudDataList = rows.map(item => {
        item.$cellEdit = true;
        item[materialIdKey] = item.materialId;
        item[materialNameKey] = item.materialName;
        item[dtlOidKey] = v1()
        item.weight = 0
        return item;
      });
    },

    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "pro_with_drawal" }).then(res => {
        Object.assign(this.withDrawalFormData, {
          withdrawalNo: res.data.data,
          happenDate: timeConversion(new Date()),
          sysCreatedby: this.$store.state.userOid,
          //   proYarnsWithdrawaloid: v1()
        });
      });
    },
    // 保存
    async handleSave() {
      let validRes = await this.saveValid();
      if (!validRes) return;
      this.loading = true;
      let { oidKey,dtlFkKey,dtlOidKey,materialIdKey } = dataTyptEnum[this.matType];
      let oid = this.withDrawalFormData[oidKey];
      if (oid) {
        await updateWithDrawal(this.withDrawalFormData,this.matType);
      } else {
        let newNo = await baseCodeSupplyEx({ code: "pro_with_drawal" }).then(res => res.data.data);
        this.withDrawalFormData.withdrawalNo = newNo;
        oid = await addWithDrawal(this.withDrawalFormData,this.matType).then(res => res.data.data);
        // 流水号递增
        baseCodeSupply({ code: "pro_with_drawal" });
      }
      Object.assign(this.withDrawalFormData, { [oidKey]: oid });
      let dataList = this.crudDataList.map(item => {
        return {
          [dtlFkKey]: oid,
          [dtlOidKey]: item[dtlOidKey],
          [materialIdKey]: item[materialIdKey],
          batchNo: item.batchNo,
          weight: item.weight
        }
      });
      await batchAddOrUpdateDtl(dataList,this.matType);
      if (this.delOidList.length > 0) {
        await batchDelDtlDataById(this.delOidList,this.matType);
      }
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success(this.$t("public.bccg"));
    },
    // 保存校验
    async saveValid() {
      let { typeOf, extFactId } = this.withDrawalFormData;
      if (typeOf == "" || typeOf == null || typeOf == undefined) {
        this.$tip.warning(this.$t("retMatNotice.validTle1"));
        return false;
      }

      if (typeOf == 1 && extFactId == "") {
        this.$tip.warning(this.$t("retMatNotice.validTle2"));
        return false;
      }

      if (this.crudDataList.length == 0) {
        this.$tip.warning(this.$t("retMatNotice.validTle3"));
        return false;
      }


      let validWeight = this.crudDataList.every(item => {
        return item.weight > 0 
      });

      if(!validWeight){
        this.$tip.warning(this.$t("retMatNotice.validTle4"));
        return false;
      }

      let { materialIdKey } = dataTyptEnum[this.matType];
      let dataList = this.crudDataList.map(aItem => {
          let validData = {
                matCode: aItem[materialIdKey],
                batchNo: aItem.batchNo,
                retQty: aItem.weight,
              }
          return validData;
      });
      return true;
      // let validRes = await fetchValidOutWeight(dataList, this.matType).then(res => res.data);
      // if (!validRes.data.status) {
      //   validRes.data.resultList.forEach((item, index) => {
      //     let notifyData = {
      //         title: "提示",
      //         dangerouslyUseHTMLString: true,
      //         message: `材料编号【<strong>${item.matCode}</strong>】剩余库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
      //         type: "warning",
      //         position: 'top-left'
      //       }
      //     setTimeout(() =>this.$notify(notifyData), 100 * index);
      //   });
      // }
      // return validRes.data.status;
    },
    //
    handleCloseDtl() {
      this.$emit("dtlClose",this.hasRefresh);
    },
  }
};
</script>