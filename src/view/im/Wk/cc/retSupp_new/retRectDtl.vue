<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 10:34:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-29 11:04:10
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container title="退货通知单信息维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button
          type="primary"
          @click="handleSave"
          :disabled="hasEdit"
        >{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="retReatFormOp" v-model="retReatFormData"></avue-form>
      </div>
      <el-row>
        <el-col :span="15">
          <view-container title="退货通知单明细">
            <!-- <div class="btnList"></div> -->
            <avue-crud
              ref="dtlCrudRef"
              :option="dtlCrudOp"
              :data="dtlCrudDataList"
              :page.sync="page"
              v-loading="loading"
              @row-click="handleDtlCellClick"
            ></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="9">
           <view-container title="货位明细">
            <!-- <div class="btnList"></div> -->
            <avue-crud
              ref="dtlaCrudRef"
              :option="dtlaCrudOp"
              :data="dtlaCrudDataList"
            ></avue-crud>
          </view-container>
        </el-col>
      </el-row>
      
    </view-container>
  </div>
</template>

<script>
import { retReatFormOp, retReatDtlCrudOp, retReatDtlaCrudOp} from "./data";
import {
  addRetRectData,
  updateRetRectData,
  batchAddOrUpdateRetReatDtlData,
  batchAddOrUpdateRetReatDtlaData,
  fetchWhseYarninByRemeoNo,
  fetchRetReatDtlDataByOid,
  fetchValidOutWeight
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";

import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components: {},
  props: {
    moduleParams:{
      type: Object,
      default: () => ({})
    },
    imWkType:{
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      retReatFormOp: retReatFormOp(this),
      retReatFormData: {},
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dtlCrudOp: retReatDtlCrudOp(this),
      dtlCrudDataList: [],
      dtlaCrudOp: retReatDtlaCrudOp(this),
      dtlaCrudDataList: [],

      retYarnDialogVisible: false,
      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  数据获取源  织单表 retYarn ； 库存表 yarnStock
      targetData: null,
      //  是否刷新
      hasRefresh: false,

      // 当前点击明细索引
      dtlCurRowIdx: -1,

    };
  },
  computed: {
    hasEdit() {
      return this.retReatFormData.stockState == "1";
    }
  },
  methods: {
    // 初始化基础数据
    initBaseData() {
      this.dtlCurRowIdx = -1;
      this.dtlaCurRowIdx = -1;
      this.dtlaDelOids = [];
      this.dtlaCrudDataList = [];
    },
    // 明细数据点击
    handleDtlCellClick(row) {
      this.dtlaCrudDataList = row.childrenList
      this.dtlCurRowIdx = row.$index;
    },
    
    // 初始化数据
    initData(remeoNo) {
      this.retReatFormData = {
        retCode: "",
        retDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid,
        retMemo: remeoNo,
        stockState: "0",
        finStatus: "0",
        retType: "4"
      };
      this.dtlCrudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
      this.getDtlDataByRemeoNo(remeoNo);
    },
    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "whse_out" }).then(res => {
        Object.assign(this.retReatFormData, {
          retCode: res.data.data
          //   whseRetreatoid: v1()
        });
      });
    },
    // 通过通知单号获取明细数据
    getDtlDataByRemeoNo(remeoNo) {
      this.initBaseData();
      this.loading = true;
      fetchWhseYarninByRemeoNo(remeoNo,this)
        .then(res => {
          this.dtlCrudDataList = res.data.map(item => {
            item.whseRetSuppDtloid = v1();
            item.$cellEdit = true;
            item.isAdd = false;
            
            let tWeight = +item.planRetWeight
            item.childrenList.forEach(cItem => {
              cItem.whseRetSuppDtlFk = item.whseRetSuppDtloid;
              cItem.whseRetSuppDtlaoid = v1();
              cItem.retWeight = tWeight > +cItem.stockWeight ?  cItem.stockWeight : tWeight;
              tWeight -= +cItem.stockWeight;
              cItem.$cellEdit = true;
            })

            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 获取数据
    setRetReatData(withDatalData) {
      this.retReatFormData = withDatalData;
      // this.getWithDrawalDtlDataList(withDatalData.whseRetsuppaccessoriesoid);
      this.getWithDrawalDtlDataList(withDatalData[this.moduleParams.mainOidKey],this);
    },
    getWithDrawalDtlDataList(oid) {
      this.initBaseData();
      this.loading = true;
      fetchRetReatDtlDataByOid({ whseRetSuppFk: oid },this)
        .then(res => {
          this.dtlCrudDataList = res.data.map(item => {
            item.isAdd = false;
            item.childrenList.forEach(cItem => {
              cItem.$cellEdit = this.retReatFormData.stockState == "0";;
            })
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },

    // 保存
    async handleSave() {
      let vaildRes = await this.saveValid();
      if (!vaildRes) return;
      this.loading = true;
      let oid = this.retReatFormData[this.moduleParams.mainOidKey];
      if (oid) {
        await updateRetRectData(this.retReatFormData,this);
      } else {
        oid = await addRetRectData(this.retReatFormData,this).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_out" });
      }
      Object.assign(this.retReatFormData, { [this.moduleParams.mainOidKey]: oid });

      // let dataList = this.dtlCrudDataList.map(item => {
      //   return {
      //     [this.moduleParams.dtlOidFk]: item.whseDtlOid,
      //     retQty: item.retQty,
      //     [this.moduleParams.mainOidFkKey]: oid,
      //     [this.moduleParams.inDtlOidFk]: item.dtlOid,
      //   };
      // });
      let dtlaDataList = [];
      let dataList = this.dtlCrudDataList.map(item => {
        dtlaDataList.push(...item.childrenList);
        return Object.assign(item, {
          whseRetSuppFk: oid,
          matType: this.moduleParams.type,
        })
      })
      let reqList = [
        batchAddOrUpdateRetReatDtlData(dataList,this),
        batchAddOrUpdateRetReatDtlaData(dtlaDataList)
      ];
      await Promise.all(reqList);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
    },
    // 保存校验
    async saveValid() {
      // let isNoSome = this.dtlCrudDataList.findIndex(item => item.realRetWeight > item.planRetWeight);
      // if(isNoSome > -1){
      //   let hasNext = await this.$tip.cofirm("存在实际退货量大于计划退货量，是否继续","提示",{type: "warning"}).then(() => true).catch(() => false);
      //   if(!hasNext){
      //     this.$tip.warning("已中止保存");
      //     return false;
      //   }
      // }


      // let isNoSome = this.dtlCrudDataList.findIndex(item => item.realRetWeight != item.planRetWeight);
      // if(isNoSome > -1){
      //   this.$tip.warning("存在实际退货量与计划退货量有差异的数据");
      //   return false;
      // }

      let dataList = [];
      this.dtlCrudDataList.forEach(item => {
        item.childrenList.forEach(cItem => {
          dataList.push({
            matCode: item.matCode,
            batchNo: item.batchNo,
            locationCode: cItem.storageNo,
            retQty: cItem.retWeight || 0,
          });
        })
      });
      let validRes = await fetchValidOutWeight({dataList, params: {includeUnqualified: true}},this).then(res => res.data);
      if (!validRes.data.status) {
        this.$tip.warning("保存无效~");
        validRes.data.resultList.forEach((item, index) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `批号为<strong>${item.batchNo}</strong>的材料编号<strong>${item.matCode}</strong>剩余库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-right'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
        });
      }
      // 检验条件
      return validRes.data.status;
    },
    //
    handleCloseDtl() {
      this.$emit("close", this.hasRefresh);
    },
    getDataList() {}
  }
};
</script>


