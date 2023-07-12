<template>
  <view-container title="选择成品布">
    <div class="btnList">
      <el-button type="success" @click="save">{{ this.$t("public.choose") }}</el-button>
      <el-button type="warning" @click="exit">{{ this.$t("public.close") }}</el-button>
    </div>
    <el-row class="formBox">
      <avue-form ref="form" :option="queryForm" v-model="form">
        <template slot="vatNo" slot-scope="scope">
          <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                     placeholder="输入缸号" :remote-method="remoteMethodVat" :loading="vatLoading" @change="queryDetail">
            <el-option v-for="item in optionsVat" :key="item.noticeId" :label="item.vatNo" :value="item.vatNo">
            </el-option>
          </el-select>
        </template>
      </avue-form>
    </el-row>
    <el-row class="crudBox">
      <avue-crud
        ref="crud"
        :option="crudOption"
        :data="crud"
        :page.sync="page"
        v-loading="loading"
       />
    </el-row>
  </view-container>
</template>

<script>
import { _rcCrud, _rcForm} from "../data";
import {API, axiosGet} from "../api";
import {checkResultPage} from "../process";

export default {
  name: "remove-cylinder",
  props:{
    type:String
  },
  data() {
    return {
      queryForm:_rcForm(this),
      crudOption:_rcCrud(this),
      crud:[],
      form:{},
      optionsVat:[],
      vatLoading:false,
      loading:false,
      page:{
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      }
    }
  },methods:{
    save(){
      this.$emit("save",this.crud)
    },
    exit(){
      this.$emit("exit");
    },
    async remoteMethodVat(val) {
      let result = await axiosGet(API.proConvertVatNoticePage, {vatNo: "%" + val})
      if(!checkResultPage(result).success){
        return this.$tip.warning(checkResultPage(result).msg)
      }
      let arr = []
      result.data.records.sort((a,b)=>{return a.createTime>b.createTime?-1:1})
      result.data.records.map((e,i)=>{
        if(arr.findIndex((item)=>item.vatNo===e.vatNo)){
          arr.push(e)
        }
      })
      this.optionsVat=arr;
    },
    async queryDetail(val) {
      let id = this.optionsVat[this.optionsVat.findIndex((e) => e.vatNo === val)].noticeId;
      let result = await axiosGet(API.proConvertVatDetail, {convertVatNoticeFk: id})
      let resultShot  = await axiosGet(API.whseFinishedFabricShot, {vatNo: val,faricState:7,rows:100})
      let arr =[];
      result.data.map((e,i)=>{
        let indexProductNo = resultShot.data.records.findIndex((item)=>item.productNo===e.productNo)
        if(indexProductNo===-1){
          return this.$tip.warning("Vui lòng kiểm tra lại không tìm thấy thông tin, có thể đơn đã xuất kho")
        }else {
          arr.push(resultShot.data.records[indexProductNo])
        }
      })
      this.crud=arr;
      this.crud.map((e,i)=>{
        e.pidNo =Number(e.productNo.slice(-3))
        e.netWeightLbs = (e.netWeight*2.2046).toFixed(2)
      })
      this.crud.sort((a,b)=>a.pidNo>b.pidNo?-1:1);
      this.crud.map((e,i)=>{  e.index=i+1;})
    },
  }
}
</script>

<style scoped>

</style>
