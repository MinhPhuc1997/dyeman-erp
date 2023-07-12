<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 09:16:40
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-12 13:40:07
-->
<template>
  <div class="whse-yarn-pre-alloc-dlt-container">
    <view-container title="预分配明细维护" :element-loading-text="loadLabel" v-loading="loading">
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
        <avue-form ref="form" :option="yarnPreAllocFormDataOp" v-model="yarnPreAllocFormData"></avue-form>
      </div>
      <view-container title="分配明细">
        <div class="btnList">
          <div class="btnList">
            <el-button
              type="primary"
              :disabled="hasEdit"
              @click="handleAddDtla"
            >{{ this.$t("public.add") }}</el-button>
            <el-button
              type="danger"
              :disabled="hasEdit"
              @click="handleDelDtla"
            >{{ this.$t("public.del") }}</el-button>
          </div>
        </div>
        <avue-crud
          ref="dtlCrudRef"
          :option="preAllocDtlCrudOp"
          :data="yarnPreAllocDataList"
          v-loading="loading"
          @on-load="getDataList"
          @row-click="handleDtlaCellClick"
          @selection-change="handleSelectionChange"
        >
          <template slot="poNo" slot-scope="{row}">
            <div>
              <span v-if="!row.$cellEdit">{{ row.poNo }}</span>
              <el-select v-else size="mini" placeholder=" " v-model="row.poNo"  filterable remote reserve-keyword  :remote-method="handleRemoteMethod">
                <el-option v-for="(item,index) in poNoDictData" :key="index" :value="item.value" :label="item.value"></el-option>
              </el-select>
            </div>
          </template>
        
        </avue-crud>
      </view-container>
      <inv-sel 
        matType="-1"
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
  yarnPreAllocFormDataOp,
  preAllocDtlCrudOp,
} from "./data";
import { matTypeEnum } from "@/components/InventorySelect/data"
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { saveYarnPreAllocData, updateYarnPreAllocData, batchSaveOrUpdateDtlData, batchRemoveDtla, fetchDtlDataListByOid, fetchValidOutWeight, fetchValidNegOutWeight, fetchConfirmPreAlloc } from "./api"
import { fetchPoNoDictData } from "./api"
import InvSel from "@/components/InventorySelect";
export default {
  name: "yarnPreAllocDtl",
  components: {
    InvSel: InvSel
  },
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      yarnPreAllocFormDataOp: yarnPreAllocFormDataOp(this),
      yarnPreAllocFormData: {},
      preAllocDtlCrudOp: preAllocDtlCrudOp(this),
      yarnPreAllocDataList: [],
      // 是否刷新
      isRefresh: false,
      curClickDtl: {},  
      dtlDelOids: [],
      curClickDtlb: {},  

    //   当前类型
      curMatTypeVal: "-1",

      // 营销单号字典
      poNoDictData: [],
        
    };
  },
  computed: {
    hasEdit() {
      return this.yarnPreAllocFormData.effective;
    }
  },
  watch: {

  },
  methods: {
    // 输入过滤生产单号
    handleRemoteMethod(key){
      fetchPoNoDictData({key}).then(res => {
        this.poNoDictData = res.data.data.map(item => {
          return {
            value: item
          }
        })
      })
    },
    // 确认
    async handleConfrim(){
        // 确认前保存
        await this.handleSave(false);

        let vaildValue = await this.confrimValid();
        if(!vaildValue) return;
        this.$tip.cofirm("是否对该分配单进行确认",{type: "warning"}).then(res => {
           let { whseYarnPreAllocoid } = this.yarnPreAllocFormData;
            return fetchConfirmPreAlloc({whseYarnPreAllocoid: whseYarnPreAllocoid})
        }).then(res => {
           res && this.$emit("close", true);
        })

    },

    // 确认前检验
    async confrimValid() {

      let isNullPoNoLen = this.yarnPreAllocDataList.filter(item => !item.poNo).length;
      if(isNullPoNoLen > 0){
        this.$tip.warning("存在所分配的单号为空的值");
        return  false
      } 

      // 存在负数时，先进行负数的校验
      let negDataMap = {};
      this.yarnPreAllocDataList.filter(item => item.allocQty < 0).forEach(aItem => {
          let { yarnNo,yarnCard, batchNo, batId, allocQty } = aItem;
          let key = yarnNo + yarnCard + batchNo + batId;
          if(negDataMap[key]){
            negDataMap[key].usableAmount += +allocQty
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
      this.yarnPreAllocDataList.forEach(aItem => {
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
        this.yarnPreAllocDataList = [];
        this.getYarnAllocCode();
    },
    // 获取预分配编号
    getYarnAllocCode(){
        baseCodeSupplyEx({code: "whse_yarn_pre_alloc"}).then(res => {
            this.yarnPreAllocFormData = {
                whseYarnPreAllocoid: "",
                preAllocCode: res.data.data,
                effective: false,
                sysCreated: this.$getNowTime(),
                preAllocDate: this.$getNowTime(),
                sysCreatedby: this.$store.state.userOid || "00000000-0000-0000-0000-000000000001"
            };
        })
    },
    //   库存选择回调
    handleInvDataSelect(rows){
        let {materialIdKey,materialNameKey,weightKey} = matTypeEnum[this.curMatTypeVal]
        let tarDataList =  rows.map((item) => {
            return {
                isAdd: true,
                whseYarnPreAllocDtloid: v1(),
                yarnNo: item[materialIdKey],
                yarnName: item[materialNameKey],
                yarnCard: item.yarnsCard,
                batId: item.batId,
                batchNo: item.batchNo,
                allocQty: item[weightKey],
            }
        });
        this.yarnPreAllocDataList.push(...tarDataList);
    },
    // 保存
    async handleSave(showTip = true) {
        if(this.yarnPreAllocDataList.length <= 0){
            this.$tip.warning("不能保存明细数据为空的分配单");
            return false;
        }

        let { whseYarnPreAllocoid } = this.yarnPreAllocFormData;
        this.loading = true;
        if(whseYarnPreAllocoid){
            await updateYarnPreAllocData(this.yarnPreAllocFormData);
        }else{
          // 重新赋值预分配编号
          await baseCodeSupplyEx({code: "whse_yarn_pre_alloc"}).then(res => {
            this.yarnPreAllocFormData.preAllocCode = res.data.data
          })
           whseYarnPreAllocoid = await saveYarnPreAllocData(this.yarnPreAllocFormData).then(res => res.data.data);
           Object.assign(this.yarnPreAllocFormData,{whseYarnPreAllocoid})
           baseCodeSupply({code: "whse_yarn_pre_alloc"});
        };

        let dtlaDataList = this.yarnPreAllocDataList.map(item => {
          item.whseYarnPreAllocDtloid = item.whseYarnPreAllocDtloid || v1();
          item.whseYarnPreAllocFk = whseYarnPreAllocoid;
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
    setYarnPreAllocData(row){
        this.yarnPreAllocFormData = row;
        this.getDataList();
    },
    // 获取数据
    getDataList() {
        this.loading = true;
        let params = {
          whseYarnPreAllocFk: this.yarnPreAllocFormData.whseYarnPreAllocoid
        }
        fetchDtlDataListByOid(params).then(res => {
            this.yarnPreAllocDataList = res.data.map((item, index) => {
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
        this.yarnPreAllocDataList.forEach(item => {
          item.$cellEdit = false;
        })
        row.$cellEdit = true;
    },

    // 明细新增
    handleAddDtla() {
        // 获取待过滤数据
        this.$refs.invSelRef.filterIds = this.yarnPreAllocDataList.map(item => {
           return {
                materialId: item.materialId,
                yarnsCard: item.materialBrand,
                batchNo: item.batchNo,
                batId: item.suppBatId,
           } 
        });
        this.$refs.invSelRef.invSelDiaVisible = true;
    },
    // 明细删除
    handleDelDtla() {
        let { whseYarnPreAllocDtloid, isAdd } = this.curClickDtl;
        if(!whseYarnPreAllocDtloid) return this.$tip.warning("请选择数据");
        if(!isAdd) this.dtlDelOids.push(whseYarnPreAllocDtloid);
        let idx = this.yarnPreAllocDataList.findIndex(item => item.whseYarnPreAllocDtloid == whseYarnPreAllocDtloid);
        this.yarnPreAllocDataList.splice(idx,1);
    },
  }
};
</script>