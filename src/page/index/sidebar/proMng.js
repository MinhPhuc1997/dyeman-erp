/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-05 09:16:14
 * @Description:
 */

export function proMng(_this) {
  return [
    {
      menuName: "一.基础设定",
      index: "basic",
      icon: "el-icon-s-tools",
      children: [
        {
          menuName: "1.生產工序",
          index: "ProWorkflowInfo"
        },
        {
          menuName: "2.生产工作包",
          index: "ProWorkPackage"
        },
        {
          menuName: "3.生产设备",
          index: "EquipmentType"
        }
      ]
    },
    {
      menuName: "二." + _this.$t("menuData.ProductionName"),
      index: "proMng",
      icon: "el-icon-edit-outline",
      children: [
        // {
        //   menuName: "1.生产排期",
        //   index: "proSalSchedule"
        // },
        {
          menuName: "2.生产排单",
          index: "proScheduling"
        },
        {
          menuName: "3.生产进度表",
          index: "proProcess"
        },
        {
          menuName: "4.LD通知单",
          index: "ldOrder"
        },
        // {
        //   menuName: "4.染整通知单",
        //   index: "dyeNotice"
        // },
        {
          menuName: "5.生产单审核",
          index: "orderReview"
        },
        {
          menuName: "6.收发单管理",
          index: "dptReciveLog"
        },
        {
          menuName: "7.生产看板",
          index: "proRpt"
        },
        {
          menuName: "8.出库送货单",
          index: "dyeDeliveryNote"
        },
        {
          menuName: "9.抽布申请单",
          index: "proPickUpFabric"
        },
        {
          menuName: "10.生产单完结",
          index: "sendReceivingBill"
        },
        {
          menuName: "11.多布存仓指令",
          index: "LeftOverOrder"
        },
      ]
    },
    {
      menuName: "三.織造生產",
      index: "wovenPro",
      icon: "el-icon-toilet-paper",
      children: [
        {
          menuName: "1.生产日产量",
          index: "output"
        },
        {
          menuName: "2.生产进度",
          index: "outputSchedule"
        },
        {
          menuName: "3.织造工单",
          index: "proWeaveJob?jobType=2"
        },
        {
          menuName: "4.外发织造工单",
          index: "proOutWeaveJob"
        },
        {
          menuName: "5.布飞打印",
          index: "clothFly"
        },
        {
          menuName: "6.布飞打印记录",
          index: "buffyPrints"
        },
        {
          menuName: "7.外发加工送货单",
          index: "proWeaveOutworkShip"
        },
        {
          menuName: "8.退纱通知单",
          index: "returnYarnsNotice"
        },
        {
          menuName: "9.织单用纱汇总",
          index: "proWeaveJobSummary"
        },
        {
          menuName: "10.扁机收货台账",
          index: "collarNote"
        },
        {
          menuName: "11.织机排期",
          index: "loomSchedule"
        }
      ]
    },
    {
      menuName: "四.染整生產",
      index: "dyePro",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.漂染工艺",
          index: "techCode"
        },
        {
          menuName: "2.染整生产运转单",
          index: "revolve"
        },
        {
          menuName: "3.染整工单",
          index: "dyeing"
        },
        {
          menuName: "4.行车监控",
          index: "proDriving"
        },
        {
          menuName: "5.化工原料退仓通知单",
          index: "withDrawal2Chiemical"
        },
        {
          menuName: "6.染料退仓通知单",
          index: "withDrawal2Dyesa"
        },
        {
          menuName: "7.生产辅料退仓通知单",
          index: "withDrawal2Access"
        },
        {
          menuName: "8.运转单备布统计",
          index: "proBleadyeRunJob"
        },
        {
          menuName: "9.染整中控任务",
          index: "proBleadjobDcctask"
        },
        {
          menuName: "10.生产通知单本厂色号维护",
          index: "colorNoSetting"
        },
        {
          menuName: "11.拆缸通知单",
          index: "cylinderRemovalNotice"
        },
        {
          menuName: "12.染单物料统计",
          index: "viewBleadyeWater"
        },
        {
          menuName: "13.染整流程统计",
          index: "viewBleadyeProcessMonitor"
        }
      ]
    },
    {
      menuName: "五.批色管理",
      index: "colorMng",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.批色码卡",
          index: "codeCard"
        },
        {
          menuName: "2.批色送办",
          index: "colorSend"
        },
        {
          menuName: "3.批色回修单",
          index: "colorRepair"
        },
        {
          menuName: "4.批色台账",
          index: "batchColorLedger"
        },
      ]
    },
    {
      menuName: "六.定型管理",
      index: "stereotype",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.定型指令单",
          index: "finalizeDesign"
        },
        {
          menuName: "2.后整指令单",
          index: "afterArrange"
        },
        {
          menuName: "3.定型物料统计",
          index: "materialStatistic"
        },
        {
          menuName: "4.规格资料记录",
          index: "ProSpecRecorder"
        },
      ]
    },
    {
      menuName: "七.开发管理",
      index: "developMng",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.织造工单",
          index: "proWeaveJob?jobType=1"
        },
        {
          menuName: "2.染整生产运转单",
          index: "developRevolveOrder"
        },
        {
          menuName: "3.布办登记记录",
          index: "techSampleStock"
        },
      ]
    },
    {
      menuName: "八.试机管理",
      index: "testMachineMng",
      icon: "el-icon-edit-outline",
      children: [
        // {
        //   menuName: "1.织造工单",
        //   index: "proWeaveJob?jobType=1"
        // },
        {
          menuName: "1.染整生产运转单",
          index: "testRevolveOrder"
        },
      ]
    },
    {
      menuName: "九.工程管理",
      index: "engineeringManagement",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.报修申请单",
          index: "repairApplication"
        },
      ]
    },
    {
      menuName: "十.流程管理",
      index: "processManagement",
      icon: "el-icon-edit-outline",
      children: [
        // {
        //   menuName: "1.我的待办",
        //   index: "processTask"
        // },
        // {
        //   menuName: "2.已办任务",
        //   index: "doneTask"
        // },
        {
          menuName: "1.数据修改申请",
          index: "ReportModifyData"
        },
        // {
        //   menuName: "3.生产单流程",
        //   index: "productionOrderProcess"
        // },
      ]
    }

  ];
}
