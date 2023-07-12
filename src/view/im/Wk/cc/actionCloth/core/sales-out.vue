<script src="../data.js"></script>
<template>
  <view-container title="出货明细 - Danh sách chi tiết xuất kho" style="height: 100vh">
    <div class="btnList">
      <el-button type="success" @click="save" style="margin-left: 5px">{{ this.$t('public.choose') }}</el-button>
      <el-button type="warning" @click="compare">对比</el-button>
      <el-button type="danger" @click="delFunc" :disabled="!crud.length">删除</el-button>
      <el-autocomplete placeholder="出货编号" clearable v-model="exportId" :fetch-suggestions="querySearch"
                       style="width: 200px;margin-left: 10px"></el-autocomplete>
      <el-button type="primary" @click="query" style="margin-left: 10px" :disabled="exportId">{{ this.$t('public.query') }}</el-button>
    </div>
    <template v-if="!upload">
      <div class="containerBox">
        <div class="dragBox" @dragover="dragover"
             @dragleave="dragleave"
             @drop="drop">
          <div
            style="display: flex;flex-direction:column;height: 270px;justify-items: center;align-content: center;align-items: center">
            <el-image style="width: 70px; height: 100px;margin-top: 20px"
                      :src="img"/>
            <h5 style="margin-bottom: -10px">将您的出货文件拖到此处开始上传</h5>
            <h5>Kéo thả file xuất hàng ở đây để upload</h5>
            <h5>- - - - - - - - - - - - - - OR - - - - - - - - - - - - - - -</h5>`
            <input type="file" id="upload" hidden @change="onFileChange" ref="file"/>
            <label for="upload" class="label">浏览器文件 - Chọn file</label>
          </div>
        </div>
      </div>
    </template>
    <div class="crudBox" style="margin-top: 10px" v-else>
      <avue-crud
        ref="crud"
        :option="crudOp"
        :data="crud"
        @current-row-change="cellClick"
        v-loading="loading"/>
    </div>
  </view-container>
</template>
<script>
import * as XLSX from "xlsx";
import {checkIncludes, readKaneTop, readOTO} from "../process";
import {_salesCrud} from "../data";
import {API, axiosGet} from "../api";

export default {
  name: "import-type1",
  data() {
    return {
      img: "http://192.168.5.1:92/api/generalPicture/previewImg?id=6386ab6738fb32aef02ba2bb",
      file: {
        name: "",
        size: "",
      },
      crudOp: _salesCrud(this),
      sheetNames: [],
      sheetName: 1,
      end: false,
      loading: false,
      crud: [],
      upload: false,
      input: "",
      exportId:""
    }
  },
  methods: {
    async query() {
      let res = await axiosGet(API.proOutFactOrderPage, {outCode:this.exportId});
      let arr = [];
      let result = await axiosGet(API.proOutFactOrderVat, {outOrderFk: res.data.records[0].orderId})
      for (let i = 0; i < result.data.length; i++) {
        let result1 = await axiosGet(API.proOutFactOrderDtl, {proOutFactOrderVatFk: result.data[i].vatRefId})
        result1.data.map((e)=>{
          arr.push({
            vatNo: e.productNo,
            productNo:e.productNo,
            pidNo:e.pidNo,
            netWeight:e.netWeight,
            netWeightLbs:e.netWeightLbs,
            grossWeight:e.grossWeight,
          })
        })
      }
      arr.map((e,i)=>{
        e.index=i;
      })
    this.upload=true;
    this.crud= arr;
      console.log(arr)


    },
    async querySearch(val, cb) {
      let result = await axiosGet(API.proOutFactOrderPage, {outCode: "%" + val});
      let arr = [];
      result.data.records.map((e, i) => {
        arr.push({value: e.outCode})
      })
      cb(arr);
    },
    delFunc() {
      this.crud = [];
      this.upload = false;
    },
    // cutCloth(val) {
    //   let index = this.crud.findIndex((e) => val.productNo === e.productNo);
    //   console.log(this.crud[index].ledger)
    //   if (this.crud[index].ledger === undefined || this.crud[index].ledger === null) {
    //     return this.crud[index].cutWeight = 0;
    //   }
    //   if (this.crud[index].ledger !== 1) {
    //     this.crud[index].ledger = 1;
    //   }
    // },
    // cellClick(val) {
    //   let index = this.crud.findIndex((e) => val.productNo === e.productNo);
    //   this.crud[index].$cellEdit = true;
    // },
    async compare() {
      this.loading = true;
      let vatNoList = [];
      let data = [];
      let dataQC = [];
      this.crud.map((e, i) => {
        if (vatNoList.findIndex(item => item.vatNo === e.vatNo) === -1) {
          vatNoList.push({vatNo: e.vatNo})
        }
      });
      for (let i = 0; i < vatNoList.length; i++) {
        let element = vatNoList[i];
        let result = await axiosGet(API.whseFinishedFabricShot, {vatNo: element.vatNo, rows: 300});
        let resultQC = await axiosGet(API.proFinalProductCardPage, {
          vatNo: element.vatNo,
          rows: 300,
          cardType: 1,
          degFlag: 0,
        });
        data = [].concat(data, result.data.records)
        dataQC = [].concat(dataQC, resultQC.data.records);
      }
      this.crud.map((e, i) => {
        let obj = this.check(e, data);
        let qc = this.check(e, dataQC);
        e.isExist = obj.value;
        e.note = obj.note;
        e.cardId = obj.cardId;
        e.ledger = qc.value;
      });
      this.crud.sort((a, b) => {
        return a.ledger > b.ledger ? -1 : 1
      })
      setTimeout(() => {
        this.loading = false;
        this.$refs.crud.setCurrentRow(this.crud[0]);
        console.log(this.crud)
      }, 2000)

    },
    check(obj, data) {
      let newData = data.filter((e) => e.vatNo === obj.vatNo);
      let index = newData.findIndex(item => item.vatNo === obj.vatNo && Number(item.productNo.slice(-3)) === obj.pidNo);
      if (index !== -1) {

        let abs = Math.abs(Number(newData[index].netWeight) - Number(obj.netWeight))
        if (abs <= 1) {
          return {value: 1, note: "", cardId: newData[index].cardId}
        } else if (abs > 1) {
          return {
            value: 2,
            note: (newData[index].netWeight === undefined) ? "err" : newData[index].netWeight,
            cardId: newData[index].cardId
          }
        }
      } else {
        return {value: 0, note: "", cardId: ""}
      }
    },
    save() {
      // let arr = this.crud.filter((e)=>e.isExist!==0);
      if (this.crud[0].ledger === undefined || this.crud[0].ledger === null) {
        return
      }
      let arr = this.crud.filter((e) => e.isExist === 0);
      if (arr.length > 0) {
        return this.$confirm("Vui lòng kiểm tra lại, trong đơn xuất kho này có vải chưa nhập kho!")
      }
      let qcarr = this.crud.filter((e) => e.isExist === 0);
      if (qcarr.length > 0) {
        return this.$confirm("Vui lòng kiểm tra lại, trong đơn xuất kho này có những mã vải không tồn tại!")
      }
      this.$emit("save", this.crud)
    },
    close() {
    },
    onFileChange(e) {

      const files = e.target.files;
      console.log(files)
      if (!files.length) {
        return;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("The upload format is incorrect. Please upload xls or xlsx format");
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      let arr = []
      reader.onload = event => {

        var data = new Uint8Array(reader.result);
        var work_book = XLSX.read(data, {type: 'array'});
        var sheet_name = work_book.SheetNames;
        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[1]], {header: 1});

        if (checkIncludes(files[0].name, "KANE TOP")) {
          console.log("KANE TOP")
          this.crud = readKaneTop(sheet_data);
          this.crud.map((e, i) => {
            e.index = i + 1;
          })
        }
        if (checkIncludes(files[0].name, "OTO")) {
          console.log("OTO")
          this.crud = readOTO(sheet_data);
          this.crud.map((e, i) => {
            e.index = i + 1;
          })
        }
        console.log(this.crud)
        reader.readAsBinaryString(files[0]);
        let input = document.getElementById("upload");
        input.value = "";
        this.upload = true;
      }
    }
    ,
    onFile(e) {
      const files = e;
      if (!files.length) {
        return;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("The upload format is incorrect. Please upload xls or xlsx format");
      }

      var reader = new FileReader();
      reader.readAsArrayBuffer(files[0]);

      reader.onload = async event => {

        var data = new Uint8Array(reader.result);
        var work_book = XLSX.read(data, {type: 'array'});
        var sheet_name = work_book.SheetNames;
        console.log(sheet_name)
        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[1]], {header: 1});

        if (checkIncludes(files[0].name, "KANE TOP")) {
          console.log("KANE TOP", sheet_data)
          let result = await readKaneTop(sheet_data);

          console.log(result.sum)
          this.crud = result.data;
          console.log(this.crud)
          this.crud.map((e, i) => {
            e.index = i + 1;
          })

        }
        this.upload = true;
        // if (checkIncludes(files[0].name, "OTO")) {
        //   console.log("OTO")
        //   this.crud = readOTO(sheet_data);
        //   this.crud.map((e, i) => {
        //     e.index = i + 1;
        //   })
        // }
      }
    }
    ,
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      //this.onFileChange(e);
      this.onFile(e.dataTransfer.files)
      this.isDragging = false;
    },
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}

.containerBox {
  top: 30vh;
  background: white;
  width: 40%;
  height: 300px;
  border: 1.7px solid #1e9fff;
  padding: 10px;
  border-radius: 20px;
  margin: 100px auto calc(100vh - 370px - 20vh);
  flex-direction: row;

}

.dragBox {
  width: 95%;
  height: 270px;
  border: 1px dotted #1e9fff;
  padding: 10px;
  border-radius: 20px;
  margin: auto;
}

.label {
  display: inline-block;
  background-color: #2f85d0;
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
}

</style>
