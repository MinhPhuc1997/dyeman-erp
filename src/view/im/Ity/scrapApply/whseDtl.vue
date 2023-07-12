<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 09:16:40
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-09 17:10:59
-->
<template>
  <div class="whse-yarn-pre-alloc-dlt-container">
    <view-container title="物料报废申请明细维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button
          type="primary"
          @click="handleSave(true)"
          :disabled="hasEdit"
        >{{ this.$t("public.save") }}</el-button>
        <el-button type="success" @click="handleConfrim" :disabled="hasEdit" >确认</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="scrapApplyFormDataOp" v-model="whseMatScrapApplyData">
          <template slot="applyDpt">
            <el-cascader
              v-model="whseMatScrapApplyData.applyDpt"
              :filterable="true"
              :show-all-levels="false"
              :options="dptDictOption"
              :props="{ checkStrictly: true , value: 'orgname', label: 'orgname', emitPath: false}"
              clearable></el-cascader>
          </template>
        </avue-form>
      </div>
      <view-container title="物料明细">
        <div class="btnList">
          <div class="btnList">
            <el-button
              type="primary"
              :disabled="hasEdit"
              @click="handleAddDtla"
            >库存选择</el-button>
            <el-button
              type="primary"
              :disabled="hasEdit"
              @click="handleHandOpt"
            >手工输入</el-button>
            <el-button
              type="danger"
              :disabled="hasEdit"
              @click="handleDelDtla"
            >{{ this.$t("public.del") }}</el-button>
          </div>
        </div>
        <avue-crud
          ref="dtlCrudRef"
          :option="scrapApplyDtlCrudOp"
          :data="matScrapApplyDataList"
          v-loading="loading"
          @on-load="getDataList"
          @row-click="handleDtlaCellClick"
          @selection-change="handleSelectionChange"
        >
          <template v-for="(key,kIdx) in ['matCode', 'matName', 'yarnBoard','batId', 'batchNo']"  :slot="key" slot-scope="{row}">
            <div :key="kIdx">
              <span v-if="!row.$cellEdit || row.inputType == '1'">{{ row[key] }}</span>
              <el-input v-else v-model="row[key]" size="mini"></el-input>
            </div>
          </template>
        </avue-crud>
      </view-container>
      <inv-sel 
       :matType="curMatTypeVal"
        ref="invSelRef"
        @data-select="handleInvDataSelect"
        :isMergeStorage="true"
        ></inv-sel>
    </view-container>
  </div>
</template>
<script>
import v1 from "uuid/v1"
import {
  scrapApplyFormDataOp,
  scrapApplyDtlCrudOp,
} from "./data";
import { matTypeEnum } from "@/components/InventorySelect/data"
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { saveMatScrapApplyData, updateMatScrapApplyData, batchSaveOrUpdateDtlData, batchRemoveDtla, fetchDtlDataListByOid, fetchValidOutWeight, fetchValidNegOutWeight, fetchConfirmScrapApply } from "./api"
import { fetchDptDataList } from "./api"
import InvSel from "@/components/InventorySelect";
export default {
  name: "MatScrapApplyDtl",
  components: {
    InvSel: InvSel
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      scrapApplyFormDataOp: scrapApplyFormDataOp(this),
      whseMatScrapApplyData: {
        matType: "",
        scrapReason: "",
        solveMethod: ""
      },
      scrapApplyDtlCrudOp: scrapApplyDtlCrudOp(this),
      matScrapApplyDataList: [],
      // 是否刷新
      isRefresh: false,
      curClickDtl: {},  
      dtlDelOids: [],
      curClickDtlb: {},  

    //   当前类型
      curMatTypeVal: "0",

      matDictEnum: {
        "SX": "0",
        "RHL": "3",
        "RLL": "4",
        "FL": "5",
        "WJ": "6",
        "XZ": "7"
      },

      // 部门字典列表
      dptDictOption: [],
        
    };
  },
  computed: {
    hasEdit() {
      return this.whseMatScrapApplyData.hasConfirm;
    }
  },
  watch: {
    'whseMatScrapApplyData.matType': {
      handler(value){
        let ybIdx = this.scrapApplyDtlCrudOp.column.findIndex(item => item.prop === "yarnBoard");
        let batIdx = this.scrapApplyDtlCrudOp.column.findIndex(item => item.prop === "batId");
        console.log("mat type value", value)
        if(value == "SX"){
          this.scrapApplyDtlCrudOp.column[ybIdx].hide = false;
          this.scrapApplyDtlCrudOp.column[batIdx].hide = false;
        }else if(value == 'RHL' || value == "RLL"){
          this.scrapApplyDtlCrudOp.column[ybIdx].hide = true;
          this.scrapApplyDtlCrudOp.column[batIdx].hide = false;
        }else {
          this.scrapApplyDtlCrudOp.column[ybIdx].hide = true;
          this.scrapApplyDtlCrudOp.column[batIdx].hide = true;
        }
      },
      immediate: true
    }
  },
  created(){
    this.initBaseData();
  },
  methods: {
    // 获取基础数据
    initBaseData(){
      fetchDptDataList().then(res => {
        let dataList = res.data || [];

        dataList.forEach(item => {
          if(!item.children){
            item.children = dataList.filter(cItem => cItem.parentoid == item.ucmlOrganizeoid);
            if(item.children.length == 0){
              delete item.children
            }
          }
        })

        this.dptDictOption = dataList.filter(item => item.level == 1);
      })
    },
    // 确认
    async handleConfrim(){
        let { whseMatScrapApplyoid } = this.whseMatScrapApplyData;
        if(!whseMatScrapApplyoid) return this.$tip.warning("数据未保存，请先进行保存")
        // 确认前保存
        await this.handleSave(false);

        // let vaildValue = await this.confrimValid();
        // if(!vaildValue) return;
        this.$tip.cofirm("是否对该申请单进行确认",{type: "warning"}).then(res => {
            return fetchConfirmScrapApply({whseMatScrapApplyoid: whseMatScrapApplyoid})
        }).then(res => {
           res && this.$emit("close", true);
        })

    },

    // 确认前检验
    async confrimValid() {
      let nullValIndex = this.matScrapApplyDataList.findIndex(item => !item.matName);
      if(nullValIndex != -1){
        this.$message.warning("物料名称不能为空");
        return false;
      }
      
      // 存在负数时，先进行负数的校验
      let negDataMap = {};
      this.matScrapApplyDataList.filter(item => item.inputType == "1" && item.scrapAmount < 0).forEach(aItem => {
          let { matCode, yarnBoard, batchNo, batId, scrapAmount } = aItem;
          let key = matCode + yarnBoard + batchNo + batId;
          if(negDataMap[key]){
            negDataMap[key].usableAmount += +scrapAmount
          }else{
             negDataMap[key] = {
                yarnsId: aItem.yarnNo,
                yarnsCard: aItem.yarnCard,
                batchNo: aItem.batchNo,
                batId: aItem.batId,
                usableAmount: +aItem.allocQty,
              }
          }
      });
      let negDataList = Object.values(negDataMap);
      let negValidRes = await fetchValidNegOutWeight(negDataList).then(res => res.data);
      console.log("validRes", negValidRes)
      if (negValidRes.code == 200) {
        negValidRes.data.forEach((item, index) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `纱线编号<strong>${item.yarnsId}【${item.batchNo}】</strong>可扣减数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
        });

        if(negValidRes.data.length > 0){
          return false
        }
      }
      

      let dataMap = {};
      this.matScrapApplyDataList.forEach(aItem => {
          let { yarnNo,yarnCard, batchNo, batId, allocQty } = aItem;
          let key = yarnNo + yarnCard + batchNo + batId;
          if(dataMap[key]){
            dataMap[key].usableAmount += +allocQty
          }else{
             dataMap[key] = {
                yarnsId: aItem.yarnNo,
                yarnsCard: aItem.yarnCard,
                batchNo: aItem.batchNo,
                batId: aItem.batId,
                usableAmount: +aItem.allocQty,
              }
          }
      });
      let dataList = Object.values(dataMap);
      let validRes = await fetchValidOutWeight(dataList).then(res => res.data);
      console.log("validRes", validRes)
      if (validRes.code == 200) {
        validRes.data.forEach((item, index) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `纱线编号<strong>${item.yarnsId}【${item.batchNo}】</strong>实际剩余可分配数<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
        });
      }
      return (validRes.data || []).length == 0;
    },
    // 新增初始化
    initData(){
        this.isRefresh = false;
        this.curClickDtl = {};
        this.dtlDelOids = [];
        this.matScrapApplyDataList = [];
        this.getScrapApplyCode();
    },
    // 获取预分配编号
    getScrapApplyCode(){
        baseCodeSupplyEx({code: "scrap_apply"}).then(res => {
            this.whseMatScrapApplyData = {
                whseMatScrapApplyoid: "",
                applyCode: res.data.data,
                effective: false,
                sysCreated: this.$getNowTime(),
                applyDate: this.$getNowTime(),
                sysCreatedby: this.$store.state.userOid || "00000000-0000-0000-0000-000000000001",
                applyer: this.$store.state.userOid || "00000000-0000-0000-0000-000000000001",
                matType: "",
                applyDpt: "",
                scrapReason: "",
                solveMethod: "",
            };
        })
    },

    // 手工输入
    handleHandOpt(){
      let dltData = {
        isAdd: true,
        whseMatScrapApplyDtloid: v1(),
        matCode: "",
        matName: "",
        yarnBoard: "",
        batId: "",
        batchNo: "",
        scrapAmount: 0,
        inputType: "2"
      }
      this.matScrapApplyDataList.push(dltData);
    },

    //   库存选择回调
    handleInvDataSelect(rows){
        let {materialIdKey,materialNameKey,weightKey} = matTypeEnum[this.curMatTypeVal]
        let tarDataList =  rows.map((item) => {
            return {
                isAdd: true,
                whseMatScrapApplyDtloid: v1(),
                matCode: item[materialIdKey],
                matName: item[materialNameKey],
                yarnBoard: item.yarnsCard,
                batId: item.batId,
                batchNo: item.batchNo,
                scrapAmount: item[weightKey],
                inputType: "1"
            }
        });
        this.matScrapApplyDataList.push(...tarDataList);
    },
    // 保存
    async handleSave(showTip = true) {

        let { scrapReason, solveMethod } = this.whseMatScrapApplyData
        if(!scrapReason){
          return this.$tip.warning("报废原因不能为空");
        }
        if(!solveMethod){
          return this.$tip.warning("处理方案不能为空");
        }

        if(this.matScrapApplyDataList.length <= 0){
            this.$tip.warning("不能保存明细数据为空的申请单");
            return false;
        }

        let { whseMatScrapApplyoid } = this.whseMatScrapApplyData;
        this.loading = true;
        if(whseMatScrapApplyoid){
            await updateMatScrapApplyData(this.whseMatScrapApplyData);
        }else{
          // 重新赋值预分配编号
          await baseCodeSupplyEx({code: "scrap_apply"}).then(res => {
            this.whseMatScrapApplyData.applyCode = res.data.data
          })
           whseMatScrapApplyoid = await saveMatScrapApplyData(this.whseMatScrapApplyData).then(res => res.data.data);
           Object.assign(this.whseMatScrapApplyData,{whseMatScrapApplyoid})
           baseCodeSupply({code: "scrap_apply"});
        };

        let dtlaDataList = this.matScrapApplyDataList.map(item => {
          item.whseMatScrapApplyDtloid = item.whseMatScrapApplyDtloid || v1();
          item.whseMatScrapApplyFk = whseMatScrapApplyoid;
          return item;
        });

        let reqArr = [
            batchSaveOrUpdateDtlData(dtlaDataList),
        ];
        if(this.dtlDelOids.length > 0){
            reqArr.push(batchRemoveDtla(this.dtlDelOids))
        }

        await Promise.all(reqArr).then(res => {
            showTip && this.$tip.success("保存成功");
            this.isRefresh = true;
        }).finally(() => {
            this.loading = false;
        })

    },

    // 设置赋值
    setMatScrapApplyData(row){
        this.whseMatScrapApplyData = row;
        this.getDataList();
    },
    // 获取数据
    getDataList() {
        this.loading = true;
        let params = {
          whseMatScrapApplyFk: this.whseMatScrapApplyData.whseMatScrapApplyoid
        }
        fetchDtlDataListByOid(params).then(res => {
            this.matScrapApplyDataList = res.data.map((item, index) => {
              if(index == 0 && !this.hasEdit){
                item.$cellEdit = true;
              }
              return item;
            })
        }).finally(() => {
            this.loading = false;
        })
    },
    handleCloseDtl() {
      this.$emit("close", this.isRefresh);
    },
    // 明细选择
    handleSelectionChange() {},
    // 明细点击
    handleDtlaCellClick(row) {
        if(this.hasEdit) return
        this.curClickDtl = row;
        this.matScrapApplyDataList.forEach(item => {
          item.$cellEdit = false;
        })
        row.$cellEdit = true;
    },

    // 明细新增
    handleAddDtla() {
        // 获取待过滤数据
        // this.$refs.invSelRef.filterIds = this.matScrapApplyDataList.map(item => {
        //    return {
        //         materialId: item.materialId,
        //         yarnsCard: item.materialBrand,
        //         batchNo: item.batchNo,
        //         batId: item.suppBatId,
        //    } 
        // });
        let matType = this.whseMatScrapApplyData.matType
        if(!matType){
          return this.$tip.warning("请选择物料类型");
        }
        if(!this.matDictEnum[matType]){
          return this.$tip.warning("该类别未兼容，请联系管理员");
        }
        this.curMatTypeVal = this.matDictEnum[matType]
        console.log("this.curMatTypeVal",this.curMatTypeVal)
        this.$refs.invSelRef.invSelDiaVisible = true;
    },
    // 明细删除
    handleDelDtla() {
        let { whseMatScrapApplyDtloid, isAdd } = this.curClickDtl;
        if(!whseMatScrapApplyDtloid) return this.$tip.warning("请选择数据");
        if(!isAdd) this.dtlDelOids.push(whseMatScrapApplyDtloid);
        let idx = this.matScrapApplyDataList.findIndex(item => item.whseMatScrapApplyDtloid == whseMatScrapApplyDtloid);
        this.matScrapApplyDataList.splice(idx,1);
    },
  }
};
</script>