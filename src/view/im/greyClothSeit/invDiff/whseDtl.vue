<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 09:16:40
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-28 11:14:32
-->
<template>
  <div class="whse-yarn-pre-alloc-dlt-container">
    <view-container title="胚布盘余明细" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="clothInvDiffFormDataOp" v-model="whseClothInvDiffData">
          <template slot="noteCode">
            <el-input v-model="whseClothInvDiffData.noteCode" placeholder="请输入布票号">
              <el-button icon="el-icon-search" slot="append" @click="handleSeachDtlData"></el-button>
            </el-input>
          </template>
        </avue-form>
      </div>
      <view-container title="布票明细">
        <avue-crud
          ref="dtlCrudRef"
          :option="clothInvDiffDtlCrudOp"
          :data="clothInvDiffDataList"
          v-loading="loading"
          :page.sync="page"
          @on-load="getDataList"
        >
          <template v-for="(key,kIdx) in ['matCode', 'matName', 'yarnBoard','batId', 'batchNo']"  :slot="key" slot-scope="{row}">
            <div :key="kIdx">
              <span v-if="!row.$cellEdit || row.inputType == '1'">{{ row[key] }}</span>
              <el-input v-else v-model="row[key]" size="mini"></el-input>
            </div>
          </template>
        </avue-crud>
      </view-container>
    </view-container>
  </div>
</template>
<script>
import {
  clothInvDiffFormDataOp,
  clothInvDiffDtlCrudOp,
} from "./data";
import {  fetchDtlDataListByOid} from "./api"
import Template from '../../Wk/grayCloth/points/template.vue';
export default {
  name: "ClothInvDiffDtl",
  data() {
    return {
      loadLabel: this.$t('public.loading'),
      loading: false,
      clothInvDiffFormDataOp: clothInvDiffFormDataOp(this),
      whseClothInvDiffData: {},
      clothInvDiffDtlCrudOp: clothInvDiffDtlCrudOp(this),
      clothInvDiffDataList: [],
      // 是否刷新
      isRefresh: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    };
  },
  computed: {
    hasEdit() {
      return this.whseClothInvDiffData.hasConfirm;
    }
  },
  watch: {

  },
  created(){
  },
  methods: {
   
    initData(){
        this.isRefresh = false;
        this.clothInvDiffDataList = [];
    },
    // 设置赋值
    setClothInvDiffData(row){
        this.whseClothInvDiffData = row;
        this.getDataList();
    },
    // 查询
    handleSeachDtlData(){
      this.page.currentPage = 1;
      this.getDataList();
    },
    // 获取数据
    getDataList() {
        this.loading = true;
        let params = {
          whseClothInvDiffFk: this.whseClothInvDiffData.whseClothInvDiffoid,
          rows: this.page.pageSize,
          start: this.page.currentPage,
        }
        if(this.whseClothInvDiffData.noteCode){
          params.noteCode = "%" + this.whseClothInvDiffData.noteCode;
        }
        fetchDtlDataListByOid(params).then(res => {
            this.page.total = res.data.total;
            this.clothInvDiffDataList = res.data.records.map((item, index) => {
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
   
  }
};
</script>