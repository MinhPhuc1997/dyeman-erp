<template>
  <el-tabs type="border-card">
    <el-tab-pane label="外发加工胚布出仓">
      <div class="btnList" style="margin-left: 12px">
        <el-button type="primary" @click="newEntity">{{ $t('public.add') }}</el-button>
        <el-button type="warning" @click="updEntity" :disabled="!crud.length||currentRow.audit==1">{{ $t('public.update') }}</el-button>
        <el-button type="danger" @click="delEntity" :disabled="!crud.length||currentRow.audit==1">{{ $t('public.del') }}</el-button>
        <el-button type="success" @click="adtEntity" :disabled="!crud.length||currentRow.audit==1">{{$t('public.audit')}}
        </el-button>
        <el-button type="success" @click="changeScanFlag(1)" :disabled="!crud.length||currentRow.audit==1" v-if="currentRow.scanFlag==0"> 启用扫描 </el-button>
        <el-button type="danger" @click="changeScanFlag(0)" :disabled="!crud.length || currentRow.audit==1" v-if="currentRow.scanFlag==1"> 禁用扫描 </el-button>
        <el-button type="primary" @click="prtEntity" :disabled="!crud.length">{{ $t('public.print') }}</el-button>
        <el-button type="primary" @click="qryEntity">{{ $t('public.query') }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox" style="margin-top: 0px">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="qryEntity"
                   @row-click="rowClick"
                   @row-dblclick="rowDbClick">
          <template slot="audit" slot-scope="{row}">
            <el-tag :type="row.scanFlag==1?'primary':'danger'">{{row.scanFlag==1?'启用':'禁用'}}</el-tag>
          </template>
          <template slot="autditColor" slot-scope="{row}">
            <div style="display: grid;justify-items: center">
              <div :style="{width: '20px',height: '20px',borderRadius: '10px',backgroundColor:`${row.autditColor}`}" />
            </div>
          </template>
        </avue-crud>
      </div>
      <el-dialog id="item" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" v-if="dialogVisible">
        <item ref="tem" :detail="currentRow" :isAdd="isAdd" @refresh="qryEntity" @close="dialogVisible = false"
              v-if="dialogVisible" @exit="dialogVisible=false" @refe="qryEntity"></item>
      </el-dialog>
    </el-tab-pane>
<!--    <el-tab-pane label="基础资料维护">-->
<!--      <customData/>-->
<!--    </el-tab-pane>-->
  </el-tabs>

</template>

<script>
import item from "./item";
import {mainCrud, mainForm} from "./data";
import customData from "./custom-data"
import {axiosDel, axiosGet, axiosPut} from "../actionCloth/api";
import {queryParms, queryParmsEx} from "../actionCloth/process";

export default {
  name: "index",
  components: {
    item,
    customData
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [50, 100, 200],
      },
      crud: [],
      crudOp: mainCrud(this),
      loading: false,
      isAdd: false,
      dialogVisible: false,
      currentRow: {}
    }
  }, methods: {
    async qryEntity() {
      let param = queryParms(this.form,"outDate",this.page)
      delete param["outDate"];
      if(this.form.outDate!=null && this.form.outDate.length==2){
        param=Object.assign(param,{
          outDate_begin:this.form.outDate[0].toString().substring(0,10) +" 00:00:00",
          outDate_end:this.form.outDate[0].toString().substring(0,10)+" 23:59:59",
        })
      }
      let res = await axiosGet("/api/whseOutClothNote/page", param);
      this.crud = res.data.records
      this.crud.sort((a,b)=>{
        return a.outWorkCode > b.outWorkCode ?-1:1
      })
      this.crud.map((e, i) => {
        e.index = i + 1;
        e.autditColor = (e.audit==0)?"rgba(250,55,55,0.78)":"#53b62d";
      });
      if(this.crud.length>0){
        this.$refs.crud.setCurrentRow(this.crud[0]);
        this.currentRow = this.crud[0];
      }
      this.page.total = res.data.total;
      this.page.currentPage = res.data.current;
    },
    newEntity() {
      this.isAdd = true;
      this.dialogVisible = true
    },
    updEntity() {

    },
    async delEntity() {
      this.$tip.cofirm("您确定需要删除这个单？ ").then(async () => {
      let {outId} = this.currentRow;
      let res = await axiosDel("/api/whseOutClothNote", {id: outId});
      if (res.data.code == 200) {
        this.qryEntity();
        this.$tip.success(res.data.msg);
      } else {
        this.$tip.danger(res.data.msg);
      }}).catch()
    },
    adtEntity() {
      this.$tip.cofirm("您确认需要审核这个单吗？ ").then(async () => {
        let {outId} = this.currentRow;
        let res = await axiosPut("/api/whseOutClothNote", {outId: outId, audit: 1, scanFlag: 0});
        if (res.data.code == 200) {
          this.qryEntity();
          this.$tip.success(res.data.msg);
        } else {
          this.$tip.danger(res.data.msg);
        }
      }).catch()
    },
    async changeScanFlag(flag){
      let msg = "您确认需要"+(flag==1)?"启用扫描出库":"禁用扫描出库"+"这个单吗？ "
      this.$tip.cofirm(msg).then(async () => {
        let {outId} = this.currentRow;
        let res = await axiosPut("/api/whseOutClothNote", {outId: outId, scanFlag: flag});
        if (res.data.code == 200) {
          this.qryEntity();
          this.$tip.success(res.data.msg);
        } else {
          this.$tip.danger(res.data.msg);
        }
      }).catch();
    },
    prtEntity() {
      let params = new URLSearchParams({id:this.currentRow.outId})
      window.open("http://192.168.5.1:91/api/whseOutClothNote/pdf?"+params)
    },
    rowClick(val) {
      this.currentRow = val;
    },
    rowDbClick(val) {
      this.isAdd = false;
      this.dialogVisible = true
      this.currentRow = val;
    }
  }
}
</script>

<style scoped>
</style>
