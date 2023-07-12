<template>
  <div id="task" v-loading="loading">
    <avue-form ref="queryFormRef" :option="historyFormOp" v-model="queryForm">
      <template slot="noteCode" slot-scope="scope">
        <el-select v-model="queryForm.noteCode" filterable remote reserve-keyword clearable default-first-option
                   placeholder="请输入胚布编号" :remote-method="remoteMethodClothNote" :loading="vatLoading"
                   @change="handleChange"
        >
          <el-option
            v-for="item in options"
            :key="item.noteId"
            :label="item.noteCode"
            :value="item.noteId">
          </el-option>
        </el-select>
      </template>
    </avue-form>
    <view-container title="查询结果">
      <avue-crud
        ref="mainCrudRef"
        :table-loading="loading"
        :option="mainCrudOp"
        :data="crudDataList"
        :page.sync="page"
      />
    </view-container>

  </div>
</template>
<script>
import { vehicleOp, clothNoteOp, historyFormOp, historyCrudOp } from "./data";
import {
  getClothNoteInStorage,
  getclothNoteInStorage, getClothNoteOutStorage,
  getproClothNoteHis, getProClothNoteInvHis,
  getproClothNotePage,
  getProclothNotePage,
} from "./api";

export default {
  name: "history",
  component: {},
  data() {
    return {
      loading: false,
      historyFormOp: historyFormOp(this),
      queryForm: {},
      mainCrudOp: historyCrudOp(this),
      vehicleOp: vehicleOp(this),
      clothNoteOp: clothNoteOp(this),
      crudDataList: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      options: [],
      useGroup: true,
      addFormVisible: false,
      vatLoading: false,
    };
  },
  methods: {
    async query(val) {
      this.loading=true;
      let content = {
        cut: "修改",
        in: "入库",
        out: "出库",
        inv: "盘点",
      };
      let data = [];
      let index = this.options.findIndex((item) => item.noteId === val);
      let qccut = await getproClothNoteHis({ clothNoteFk: val });
      let inStorage = await getClothNoteInStorage({ noteCode: this.options[index].noteCode });
      let inv = await getProClothNoteInvHis({ clothNoteFk: val });
      let out = await getClothNoteOutStorage({ custTicket: this.options[index].noteCode });
      (qccut.data && qccut.data.length > 0) && qccut.data.map((e, i) => {
        data.push({
          clothNote: this.options[index].noteCode,
          content: content.cut,
          clothWeight: e.clothWeight,
          clothState: e.clothState,
          createTime: e.createTime,
          creator: e.creator,
        });
      });
      (inStorage.data.length > 0) && inStorage.data.map((e, i) => {
        data.push({
          clothNote: this.options[index].noteCode,
          content: content.in,
          clothWeight: e.weight,
          clothState: 2,
          createTime: e.yinDate,
          creator: "",
        });
      });
      (inv.data.length > 0) && inv.data.map((e, i) => {
        data.push({
          clothNote: this.options[index].noteCode,
          content: content.inv,
          clothWeight: e.clothWeight,
          clothState: e.clothState,
          createTime: e.invDate,
          creator: e.invUser,
        });
      });
      (out.data.length > 0) && out.data.map((e, i) => {
        data.push({
          clothNote: this.options[index].noteCode,
          content: content.out,
          clothWeight: e.weight,
          clothState: 3,
          createTime: e.retDate,
          creator: "",
        });
      });

      console.log(data);
      this.crudDataList = data;
      this.crudDataList.sort((a, b) => {
        return a.createTime < b.createTime ? -1 : 1;
      });
      this.crudDataList.map((e, i) => e.index = i + 1);
      setTimeout(()=>{
        this.loading=false;
      },500)

    },
    handleChange(val) {
      if(val!==""){
        this.query(val);
      }else{
        this.crudDataList=[];
      }

    },
    remoteMethodClothNote(val) {
      this.vatLoading = true;
      getproClothNotePage({ noteCode: "!^%" + val }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
  },
  mounted() {
    this.remoteMethodClothNote("")
  },
};
</script>
