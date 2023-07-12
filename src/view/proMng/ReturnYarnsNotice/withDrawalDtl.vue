<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-04-11 08:24:09
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container :title="$t('ReturnYarnsNotice.title4')" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" :disabled="hasNotEdit" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="success" v-if="hasShowConfirmBtn" :disabled="hasNotEdit" @click="handleGenConfirm">确认</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="withDrawalFormOp" v-model="withDrawalFormData">
          <template v-for="(item,index) in withDrawalFormOp.column.filter(c => c.labelslot)" :slot="item.prop + 'Label'">
            <div :key="index" style="line-height: 1.3; text-align: center">
              <div style="font-size: 13px; font-weight: bold">{{item.subLabel}}</div>
              <div>{{item.label}}</div>
            </div>
          </template>
        </avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="dtl" :title="$t('ReturnYarnsNotice.title5')">
          <div class="btnList">
            <el-button type="primary" :disabled="hasNotEdit" @click="handleAddByRetYarn">{{ $t("ReturnYarnsNotice.addByRetYarn") }}</el-button>
            <el-button type="primary" :disabled="hasNotEdit" @click="handleAddByYarnStock">{{ $t("ReturnYarnsNotice.addByYarnStock") }}</el-button>
            <el-button type="danger" :disabled="hasNotEdit" @click="handleDtlDelete">{{ $t("public.del") }}</el-button>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="crud"
              :option="dtlCrudOp"
              :data="crudDataList"
              :page.sync="page"
              v-loading="loading"
              @on-load="getDataList"
              @row-click="handleCellClick"
              @selection-change="handleSelectionChange"
            >
              <template v-for="(item,index) in dtlCrudOp.column.filter(c => c.headerslot)" :slot="item.prop + 'Header'">
                <div :key="index">
                  <div style="font-size: 13px; font-weight: bold">{{item.subLabel}}</div>
                  <div>{{item.label}}</div>
                </div>
              </template>
              <template slot="weaveJobCode" slot-scope="{ row }">
                <el-select :disabled="hasNotEdit" v-model="row.weaveJobCode" filterable remote :remote-method="handleWeaveCodeRemoteMethod">
                  <el-option v-for="(item,index) in weaveDictData" :key="index" :label="item.weaveJobCode" :value="item.weaveJobCode"></el-option>
                </el-select>
              </template>
              <template slot="turnWeaveJobCode" slot-scope="{ row }">
                <el-select :disabled="hasNotEdit" v-model="row.turnWeaveJobCode" filterable remote :remote-method="handleWeaveCodeRemoteMethod">
                  <el-option v-for="(item,index) in weaveDictData" :key="index" :label="item.weaveJobCode" :value="item.weaveJobCode"></el-option>
                </el-select>
              </template>
            </avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
    </view-container>

    <el-dialog :visible.sync="retYarnDialogVisible" fullscreen append-to-body>
      <component
        :is="targetData"
        @selected="handleRetYarnSelected"
        @close="retYarnDialogVisible = false"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import { withDrawalFormOp, dtlCrudOp } from "./data";
import {
  addWithDrawal,
  updateWithDrawal,
  batchAddOrUpdateDtl,
  batchDelDtlDataById,
  fetchWithDrwarlDtlDataList,
  validWeaveJobCode,
  fetchWeaveCodeDataList,
  fetchTurnWeaveConfir,
  fetchPurAppCode
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";
import RetYarn from "./retYarnData.vue";
import YarnStock from "./yarnStock.vue";
import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components: {
    "ret-yarn": RetYarn,
    "yarn-stock": YarnStock
  },
  props: {
    withDatalData: {
      type: Object,
      default: () => ({})
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

      retYarnDialogVisible: false,
      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  数据获取源  织单表 retYarn ； 库存表 yarnStock
      targetData: RetYarn,
      //  是否刷新
      hasRefresh: false,

      // 织单号字典
      weaveDictData: []
    };
  },
  computed:{
    hasNotEdit(){
      return this.withDatalData.isInStock 
    },
    hasShowConfirmBtn(){
      return this.withDrawalFormData.proYarnsWithdrawaloid && this.withDrawalFormData.typeOf == "2"; 
    },
  },
  watch: {
    withDatalData: {
      handler(value) {
        if (value.proYarnsWithdrawaloid) {
          this.setWithDrawalData();
        } else {
          this.initData();
        }
        this.hasRefresh = false;
      },
      immediate: true,
      deep: true
    },
  },
  created: {},
  methods: {
    // 确认生成转织单号
    async handleGenConfirm(){
      let hasConfirm = await this.$confirm("是否确认生成‘余料入仓’、‘物料领用单’、‘出仓单数据’", "提示", {type: "warning"}).then(res => true).catch(err => false);
      if(!hasConfirm) return ;
      this.loading = true;
      let purAppCode = await fetchPurAppCode().then(res => {
        let reg = /\({text:'([\d\D]+)',status:1}\)/
        return (res.data.match(reg) || [])[1]
      })
      
      if(!purAppCode){
        this.loading = false;
        return this.$message.error("物料申请单流水号生成失败")
      }

      let params = {
        applyCode: purAppCode,
        proYarnsWithOid: this.withDrawalFormData.proYarnsWithdrawaloid
      }
      fetchTurnWeaveConfir(params).then(res => {
        let { code, data, msg } = res.data;
        if(data){
          this.$emit("refresh");
          return this.$message.success("已生成对应的余料入仓、物料领用单、出仓单数据");
        }else{
          return this.$message.warning(msg)
        }
      }).finally(res => {
        this.loading = false;
      })
      
    },
    // 字典输入
    handleWeaveCodeRemoteMethod(value){
      let params = {
        weaveJobCode: "!^%" + value,
        degFlag: 0,
      }
      fetchWeaveCodeDataList(params).then(res => {
        // console.log("recode", res.data)  
        this.weaveDictData = res.data.records;
      })
    },
    // 初始化数据
    initData() {
      this.withDrawalFormData = {
        proYarnsWithdrawaloid: "",
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
      this.withDrawalFormData = this.withDatalData;
      this.getWithDrawalDtlDataList(this.withDatalData.proYarnsWithdrawaloid);
    },
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      fetchWithDrwarlDtlDataList({ proYarnsWithdrawalFk: oid })
        .then(res => {
          this.crudDataList = res.data.map(item => {
            item.$cellEdit = !this.hasNotEdit;
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
      this.selectList.forEach(item => {
        if (!item.isAdd) {
          this.delOidList.push(item.proYarnsWithdrawalDtloid);
        }
        let tarIdx = this.crudDataList.findIndex(
          cItem =>
            cItem.proYarnsWithdrawalDtloid == item.proYarnsWithdrawalDtloid
        );
        this.crudDataList.splice(tarIdx, 1);
      });
    },
    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },
    // 织单号新增
    handleAddByRetYarn() {
      this.targetData = RetYarn;
      this.retYarnDialogVisible = true;
    },
    // 纱线库存新增
    handleAddByYarnStock() {
      this.targetData = YarnStock;
      this.retYarnDialogVisible = true;
    },
    // 织单号选择回调
    handleRetYarnSelected(rows) {
      let diffEnum = this.crudDataList.reduce((a, b) => {
        a[b.yarnsId + b.yarnsCard + b.suppBatNo + b.batchNo] = true;
        return a;
      }, {});
      let selectList = [];
      rows.forEach(item => {
        let key = item.yarnsId + item.yarnsCard + item.suppBatNo + item.batchNo;
        if (diffEnum[key]) return;
        selectList.push({
          proYarnsWithdrawalDtloid: v1(),
          //   proYarnsWithdrawalFk: this.withDrawalData.proYarnsWithdrawaloid,
          ...item,
          $cellEdit: true,
          isAdd: true // 新增字段
        });
      });
      this.crudDataList.push(...selectList);
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
      let validRes = await this.saveValid().then(res => res);
      if (!validRes) return;
      this.loading = true;
      let oid = this.withDrawalFormData.proYarnsWithdrawaloid;
      if (oid) {
        await updateWithDrawal(this.withDrawalFormData);
      } else {
        // 避免在用户挂机后出现相同批号的问题出现；
        let newNo = await baseCodeSupplyEx({ code: "pro_with_drawal" }).then(res => res.data.data);
        this.withDrawalFormData.withdrawalNo = newNo;
        oid = await addWithDrawal(this.withDrawalFormData).then(res => res.data.data);
        // 流水号递增
        baseCodeSupply({ code: "pro_with_drawal" });
      }
      Object.assign(this.withDrawalFormData, { proYarnsWithdrawaloid: oid });
      this.crudDataList.map(item => {
        return Object.assign(item, {
          proYarnsWithdrawalFk: oid
        });
      });
      await batchAddOrUpdateDtl(this.crudDataList);
      if (this.delOidList.length > 0) {
        await batchDelDtlDataById(this.delOidList);
      }
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success(this.$t("public.bccg"));
    },
    // 保存校验
    async saveValid() {
      let { typeOf, extFactId } = this.withDrawalFormData;
      if (typeOf == "" || typeOf == null || typeOf == undefined) {
        // this.$tip.warning("退纱类型不能为空");
        this.$tip.warning(this.$t("ReturnYarnsNotice.saveWarning1"));
        return false;
      }

      if (typeOf == 1 && extFactId == "") {
        this.$tip.warning(this.$t("ReturnYarnsNotice.saveWarning2"));
        return false;
      }

      if (this.crudDataList.length == 0) {
        this.$tip.warning(this.$t("ReturnYarnsNotice.saveWarning3"));
        return false;
      }

      let isNull2Value = this.crudDataList.every(item => {
        return item.weaveJobCode && item.weight1 && item.cartonNumber && item.packSize;
      });

      if (!isNull2Value) {
        this.$tip.warning(this.$t("ReturnYarnsNotice.saveWarning4"));
        return false;
      }

      let weaveJobCodes = this.crudDataList.map(item => item.weaveJobCode);

      let notExistsCode = await validWeaveJobCode(weaveJobCodes).then(res => res.data.data).catch(err => []);
      if(notExistsCode && notExistsCode.length > 0){
        this.$tip.warning(`${notExistsCode.join(',')} ${this.$t("ReturnYarnsNotice.saveWarning5")}`);
        return false;
      }

      return true;
    },
    //
    handleCloseDtl() {
      this.$emit("dtlClose",this.hasRefresh);
    },
    getDataList() {},
    handleCellClick(row) {}
  }
};
</script>