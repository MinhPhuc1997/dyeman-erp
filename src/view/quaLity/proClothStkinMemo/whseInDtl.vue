<!--
 * @Description: 入仓明细页面
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-12-17 09:30:54
-->
<template>
  <div id="stkin-memo-dtl-container">
    <view-container
      :title="$t('proClothStkinMemo.title3')"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="primary" @click="handleSave" :disabled="hasNotEdit">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="handleClose">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form
          ref="form"
          :option="stkinMemoFormOp"
          v-model="stkinMemoData"
        ></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="whseInDtlRef"
          :option="stkinMemoDtlCrudOp"
          :data="stlkinMemoDtlDataList"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import {
  stkinMemoFormOp,
  stkinMemoDtlCrudOp,
} from "./data";
import {
  batchSaveOrUpDate,
  fetchStkinMemoDataByStkinOid,
  fetchStkinMemoDataByStoreLoadCode,
  addStkinMemoData,
  updateStkinMemoData
} from "./api";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import v1 from "uuid/v1";
export default {
  name: "whseInDtl",
  props: {

  },
  data() {
    return {
      loading: false,
      loadLabel: this.$t("proClothStkinMemo.loading1"),
      stkinMemoFormOp: stkinMemoFormOp(this),
      stkinMemoData: {
        memoNo: "",
        memoDate: "",
        yinDate: "",
      },
      stkinMemoDtlCrudOp: stkinMemoDtlCrudOp(this),
      stlkinMemoDtlDataList: [],
      hasRefresh: false,

    };
  },
  watch: {

  },
  computed: {
    hasNotEdit() {
      return  Boolean(this.stkinMemoData.yinDate);
    },
    
  },
  methods: {
    
    // 初始化数据
    initData() {
    },
    // 获取纱线入仓明细数据
    getStkinMemoData(stkinMemoData) {
      this.loading = true;
      this.stkinMemoData = stkinMemoData
      // this.stlkinMemoData = stkinMemoData;
      // console.log(this.stlkinMemoData)
      fetchStkinMemoDataByStkinOid({stkinOid: stkinMemoData.proClothStkinMemooid}).then(res => {
        this.dataAnalysic(res.data)
      }).finally(() => {
        this.loading = false;
      })
    },
    // 保存数据
    async handleSave() {
      this.loading = true;
      
      let validRes =  await this.saveVaild();
      if(!validRes){
        this.loading = false;
        return false;
      }
      
      // 保存主数据
      let oid = this.stkinMemoData.proClothStkinMemooid;
      if (oid) {
        await updateStkinMemoData(this.stkinMemoData);
      } else {
        Object.assign(this.stkinMemoData,{
          sysCreated: timeConversion(new Date()),
          sysCreatedby: this.$store.state.userOid
        })
        oid = await addStkinMemoData(this.stkinMemoData).then(
          (res) => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "stkin_memo_notice" });
      }
      Object.assign(this.stkinMemoData, { proClothStkinMemooid: oid });
      // 保存明细数据
      await this.saveDtlData(oid);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success(this.$t("public.bccg"));
    },
    // 保存明细数据
    saveDtlData(oid){
      let targetDataList = [];
      this.stlkinMemoDtlDataList.forEach(item => {
        item.children.forEach(item => {
          targetDataList.push({
            proClothStkinMemoDtloid: item.proClothStkinMemoDtloid,
            proClothStkinMemoFk: oid, 
            noteIdFk: item.noteId,
            clothWeight: item.clothWeight
          })
        })
      })
      return batchSaveOrUpDate(targetDataList);
    },
    // 保存检验
    saveVaild(){
      // 重量检查
      let weightValidRes = this.stlkinMemoDtlDataList.every(item => {
        return  item.children.every(cItem => cItem.clothWeight > 0);
      });

      if(!weightValidRes){
        this.$tip.warning("存在布票数量小于或等于0的情况，请检查")
        return false
      }

      return true;

    },
    // 关闭
    handleClose() {
      this.$emit("close", this.hasRefresh);
    },
    // 新增数据初始化
    addAndCreateData(storeLoadCode) {
      this.initData();
      this.createWhseYarnInData();
      this.extractData(storeLoadCode);
    },
    // 生成主表数据
    createWhseYarnInData() {
      this.stkinMemoData = {
        proClothStkinMemooid: "",
        memoNo: "",
        memoDate: timeConversion(new Date()),
        yinDate: ""
      };
      baseCodeSupplyEx({ code: "stkin_memo_notice" }).then((res) => {
        this.stkinMemoData.memoNo = res.data.data;
      });
    },
    // 数据解析
    dataAnalysic(originDataList){
      let targetData = {};
      originDataList.sort((a,b) => a.eachNumber - b.eachNumber);
      originDataList.forEach((item,index) => {
        let { storeLoadCode, weaveJobCode } = item;
        let key = storeLoadCode + weaveJobCode;
        // 不存在则进行初始化
        if(!targetData[key]){
          targetData[key] = {
            children: [],
            eachNumber: 0,
            clothWeight: 0,
            weaveJobCode: weaveJobCode,
            storeLoadCode: storeLoadCode,
           
            id: index + 1,
          }
        }

        targetData[key].children.push(Object.assign(item, {
          weaveJobCode: "",
          storeLoadCode: "",
          id: `${targetData[key].id}+${index}`,
          proClothStkinMemoDtloid: item.proClothStkinMemoDtloid || v1(),
        }))
        targetData[key].eachNumber++;
        targetData[key].clothWeight += +item.clothWeight

      });

      // 赋值
      this.stlkinMemoDtlDataList = Object.values(targetData);

    },
    // 数据抽取
    extractData(storeLoadCode) {
      this.loading = true;
      let params = {
        storeLoadCode: storeLoadCode,
      };
      fetchStkinMemoDataByStoreLoadCode(params)
        .then((res) => {
          this.dataAnalysic(res.data)
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="stylus">
#whse-yarn-in-dtl-containe
  .avue-crud__menu
    min-height 5px !important
    height 5px !important
</style>
