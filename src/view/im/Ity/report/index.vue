<template>
  <div class="container">
    <div class="leftContainer">
      <div class="btnList">
        <div style="padding: 7px">
          <el-select v-model="year" placeholder="" size="medium">
            <el-option
              v-for="item in yearList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="month" placeholder="" size="medium" style="margin-left: 10px">
            <el-option
              v-for="item in monthList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="" style="margin-left: 10px" size="medium">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="margin-left: 10px" @click="query" v-hasPerm="['whse:whseReport:list']"> 查询/Tra cứu</el-button>
          <el-button type="warning" style="margin-left: 10px" @click="report" v-hasPerm="['whse:whseReport:export']"><i class="el-icon-document"> 导出报表/Xuất file</i>
          </el-button>
        </div>
        <avue-crud :option="option" :data="data" :loading="loading"></avue-crud>
      </div>
    </div>
    <div class="rightContainer">
      <div id="myChart" :style="{width: '100%', height: '46%'}" class="chart"/>
      <div id="myChart1" :style="{width: '100%', height: '50%'}"/>
    </div>
  </div>
</template>
<script>

import {_optinCrud, _optinCrud1} from "./data";
import {whseCalicoin, whseChemicalin, whseDyesalin, whseFabricChangeAction, whseYarnin} from "./api";

export default {
  name: "index",
  data() {
    return {
      options: [
        {
          value: '1',
          label: '胚布-Vải thô'
        },
        {
          value: '2',
          label: '化工-Hóa chất'
        },
        {
          value: '3',
          label: '染料-Màu nhộm'
        },
        {
          value: '4',
          label: '纱线-Sợi'
        },
        {
          value: '5',
          label: '成品-Thành phẩm'
        },
      ],
      value: '1',
      option: _optinCrud(this),
      data: [],
      yearList: [],
      monthList: [],
      xVipData: [],
      yVipData: [],
      year: '',
      month: "",
      loading: true

    }
  }, methods: {
    async query() {
      this.loading = true;
      let start = `${this.year}-${this.month}-01`
      let end = `${this.year}-${this.month}-${this.lastDate()}`
      let res;
      if (this.value == 5) {
        this.option = _optinCrud1(this)
      } else {
        this.option = _optinCrud(this)
      }
      switch (this.value) {
        case "1":
          res = await whseCalicoin(Object.assign({beginTime: start, endTime: end}))
          break
        case "2":
          res = await whseChemicalin(Object.assign({beginTime: start, endTime: end}))
          break
        case "3":
          res = await whseDyesalin(Object.assign({beginTime: start, endTime: end}))
          break
        case "4":
          res = await whseYarnin(Object.assign({beginTime: start, endTime: end}))
          break
        case "5":
          res = await whseFabricChangeAction(Object.assign({beginTime: start, endTime: end}))
          break
      }
      let arr = [];
      res.data.map((e) => {
        arr.push({
          date: e.date,
          drawWeight:e.drawWeight,
          import1: e.inWeight,
          import2: e.inWeightFlag,
          export1: e.outWeight,
          export2: e.outWeightFlag,
        })
      })
      this.data = arr;
      this.drawLine();
      console.log(this.data);
      this.loading = false;
    },
    report() {
      let start = `${this.year}-${this.month}-01`
      let end = `${this.year}-${this.month}-${this.lastDate()}`
      let API = "http://192.168.5.1:91/api/";
      let model = "";
      switch (this.value) {
        case "1":
          model = "whseCalicoin/wareStat"
          break
        case "2":
          model = "whseChemicalin/chemicalStat"
          break
        case "3":
          model = "whseDyesalin/dyesaStat"
          break
        case "4":
          model = "whseYarnin/yarninStat"
          break
        case "5":
          model = "whseFabricChangeAction/reportStat"
          break
      }
      window.open(`${API}${model}?beginTime=${start}&endTime=${end}`)
    },
    drawLine() {

      let im1 = 0;
      let im2 = 0;
      let ex1 = 0;
      let ex2 = 0;

      this.data.map((e) => {
        im1 = Number(im1) + Number(e.import1);
        im2 = Number(im2) + Number(e.import2);
        ex1 = Number(ex1) + Number(e.export1);
        ex2 = Number(ex2) + Number(e.export2);
      })
      im1 = (isNaN(im1)) ? 0 : im1;
      im2 = (isNaN(im2)) ? 0 : im2;
      ex1 = (isNaN(ex1)) ? 0 : ex1;
      ex2 = (isNaN(ex2)) ? 0 : ex2;

      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart.setOption({
        title: {
          text: '全月' + this.options[this.options.findIndex(e => e.value === this.value)].label + "出入库",
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {value: (im1 + im2).toFixed(2), name: '总共出库'},
              {value: (ex1 + ex2).toFixed(2), name: '总共入库'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(82,193,153,0.5)'
              }
            }
          }
        ]
      })
      myChart1.setOption({
        title: {
          text: '全月' + this.options[this.options.findIndex(e => e.value === this.value)].label + "出入库",
          left: 'center'
        },
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [(im1 / (im1 + im2) * 100), im1, '本厂入库'],
            [im2 / (im1 + im2) * 100, im2, '外发入库'],
            [ex1 / (ex1 + ex2) * 100, ex1, '本厂出库'],
            [ex2 / (ex1 + ex2) * 100, ex2, '外发出库'],
          ]
        },
        grid: {containLabel: true},
        xAxis: {name: '公斤'},
        yAxis: {type: 'category'},
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          text: ['高', '底'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              x: 'amount',
              y: 'product'
            }
          }
        ]
      })
    },
    lastDate() {
      let nowDate = new Date();
      let mon = nowDate.getMonth() + 1;
      let year = nowDate.getFullYear();
      let day = nowDate.getDate();
      let lastDayOfMonth = new Date(this.year, this.month, 0).getDate();
      if (this.year === year && this.month === mon && day < lastDayOfMonth) {
        return day;
      }
      return lastDayOfMonth;
    },
    initYear() {
      let arr = []
      for (let i = 1; i < 13; i++) {
        arr.push({value: i, label: i + "月"})
      }
      this.monthList = arr;
      arr = [];
      const date = new Date();
      for (let i = 2021; i <= date.getFullYear(); i++) {
        arr.push({value: i, label: i + "年"})
      }
      this.yearList = arr;
      this.year = date.getFullYear();
      this.month = date.getMonth()+1;
    }
  }, mounted() {
    this.initYear()
    this.drawLine();
    this.query()
  }
}
</script>

<style scoped type="scss">

.container {
  height: calc(100vh - 90px);
  min-height: 100%;
  display: flex;
  flex-direction: row;
}

.leftContainer {
  height: 100%;
  width: 70%;
  border-right: 7px solid rgba(210, 210, 210, 0.33)
}

.rightContainer {
  height: 100%;
  width: 30%;
}

.chart {
  border-bottom: 7px solid rgba(210, 210, 210, 0.33)
}
</style>
