<template>
  <div>
    <div class="btnList">
      <el-button type="primary" @click="query" v-hasPerm="['whse:productAction:query']">{{
          this.$t("public.query")
        }}
      </el-button>
      <el-button type="success" @click="excel" v-hasPerm="['whse:productAction:export']">{{
          this.$t("public.export")
        }}
      </el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"/>
    </div>
    <div style="margin-top: 17px">

      <el-row class="crudBox">
        <el-col :span="13">
          <avue-crud
            ref="leftCrud"
            id="crudLeft"
            :option="crudLeftOp"
            :data="crudLeft"
            :page.sync="page"
            v-loading="loadingLeft"
            @on-load="query"
            @current-row-change="cellClick"
            @row-dblclick="cellClick"
          />
        </el-col>
        <el-col :span="11">
          <el-row>
            <avue-crud
              ref="rightCrud"
              id="crudRight"
              :option="crudRightOp"
              :data="crudRight"
              v-loading="loadingRight"
              :cell-style="cellStyle"
            />
          </el-row>
          <el-row style="margin: 17px 17px 0 17px">
            <el-card>
              <h4 style="color: #1e88da">总重量: {{ weight }} KG</h4>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {axiosGet} from "../api";
import {queryParms, queryParmsEx} from "../process";
import {_leftOp, _queryForm, _rightOp} from "./data";

export default {
  name: "Total",
  data() {
    return {
      formOp: _queryForm(this),
      form: {},
      crudLeftOp: _leftOp(this),
      crudRightOp: _rightOp(this),
      crudLeft: [],
      crudRight: [],
      loadingLeft: false,
      loadingRight: false,
      page: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
        pageSizes: [100, 200, 500],
      },
      currentRow: {},
      weight: 12,
    }
  }, methods: {
    async query() {
      this.loadingLeft = true;
      this.crudLeft = [];
      this.crudRight = [];
      const url = "/api/whseFinishedFabricShot/warDetails";
      let object = queryParmsEx(this.form, [], "createTime", this.page)
      if (this.form.createTime && this.form.createTime.length == 2) {
        object = Object.assign({
          updateTime_begin: `${this.form.createTime[0]} 00:00:00`,
          updateTime_end: `${this.form.createTime[1]} 23:59:59`,
        })
      }
      let res = await axiosGet(url, object)
      this.page.total = res.data.total;
      this.page.currentPage = res.data.current;
      this.crudLeft = res.data.records
      this.crudLeft.sort((a, b) => {
        return a.createTime > b.createTime ? 1 : -1
      })
      this.crudLeft.map((e, i) => {
        e.index = i + 1,
          e.netWeight = Number(e.netWeight).toFixed(2)
      });
      if (this.crudLeft.length > 0) {
        this.$refs.leftCrud.setCurrentRow(this.crudLeft[0])
        this.getDetail(this.crudLeft[0])
      }

      this.loadingLeft = false;
    },
    excel() {
      if (!this.form.createTime || this.form.createTime.length != 2){
        this.$tip.warning("请选择操作时间！")
        return;
      }
      try{
        let url = process.env.API_HOST +"/api/whseFinishedFabricShot/finalDetailed?"
        let object = queryParmsEx(this.form, [], "createTime", this.page)
        object = Object.assign({
          updateTime_begin: `${this.form.createTime[0]} 00:00:00`,
          updateTime_end: `${this.form.createTime[1]} 23:59:59`,
        },object)
        delete object.rows
        delete object.start
        let params =  new URLSearchParams(object)
        window.open(url+params)
      }catch (e) {
        console.error("Lỗi xuất file excel",e)
      }
    },
    cellClick(val) {
      this.currentRow = val;
      this.getDetail(val)
    },
    async getDetail(row) {
      this.loadingRight = true;
      const url = "/api/whseFinishedFabricShot/warDetailsEx";
      let res = await axiosGet(url, {id: row.cardId})
      this.crudRight = res.data
      this.crudRight.sort((a, b) => {
        return a.createTime > b.createTime ? 1 : -1
      })
      this.weight = 0
      this.crudRight.map((e, i) => {
        e.index = i + 1
        this.weight += e.netWeight * ((e.effectName == "入库") ? "1" : "-1")
        e.netWeight = ((e.effectName == "入库") ? "+" : "-") + e.netWeight

      });
      this.weight = Number(this.weight).toFixed(2)
      this.loadingRight = false
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      if (columnIndex == 3) {
        if (row.effectName == "入库") {
          return {
            color: 'green',
            fontWeight: 'bold',
            fontSize: '20'
          }
        } else {
          return {
            color: 'red',
            fontWeight: 'bold',
            fontSize: '20'
          }
        }
      }
    }
  },
  mounted() {
  }
}
</script>
