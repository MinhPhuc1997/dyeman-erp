/*
 * @Author: Lyl
 * @Date: 2021-01-29 14:14:56
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-10-05 09:15:50
 * @Description:
 */
export default [
  // 生产管理 - 基础设定
  {
    path: "/",
    name: "主页",
    //redirect: "/ProWorkflowInfo"
  },
  {
    path: "/sendReceivingBill",
    name: "生产单完结",
    component: resolve =>
      require(["@/view/proMng/sendReceivingBill/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: "/dptReciveLog2",
  //   name: "日志测试",
  //   component: resolve =>
  //     require(["@/view/proMng/dptReciveLog_221202/index"], resolve),
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  {
    path: "/proPickUpFabric",
    name: "抽布申请单",
    component: resolve =>
      require(["@/view/proMng/proPickUpFabric/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/viewBleadyeProcessMonitor",
    name: "染整流程统计",
    component: resolve =>
      require(["@/view/proMng/viewBleadyeProcessMonitor/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/repairApplication",
    name: "报修申请单",
    component: resolve =>
      require(["@/view/proMng/engineeringManagement/repairApplication/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/viewBleadyeWater",
    name: "染单物料统计",
    component: resolve =>
      require(["@/view/proMng/viewBleadyeWater/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/cylinderRemovalNotice",
    name: "拆缸通知单",
    component: resolve =>
      require(["@/view/proMng/cylinderRemovalNotice/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/testRevolveOrder",
    name: "试机运转单",
    component: resolve =>
      require(["@/view/proMng/testMachine/revolve/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/loomSchedule",
    name: "织机排期",
    component: resolve =>
      require(["@/view/proMng/weavingProduction/loomSchedule/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/batchColorLedger",
    name: "批色台账",
    component: resolve =>
      require(["@/view/proMng/batchColor/ledger/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dyeDeliveryNote",
    name: "出库送货单",
    component: resolve =>
      require(["@/view/proMng/dyeDeliveryNote/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proWeaveOutworkShip",
    name: "外发加工送货单",
    component: resolve =>
      require(["@/view/proMng/proWeaveOutworkShip/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/returnYarnsNotice",
    name: "退纱通知单",
    component: resolve =>
      require(["@/view/proMng/ReturnYarnsNotice/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/techSampleStock",
    name: "布办登记记录",
    component: resolve =>
      require(["@/view/proMng/techSampleStock/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dptReciveLog",
    name: "收发单管理",
    component: resolve =>
      require(["@/view/proMng/dptReciveLog/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proRpt",
    name: "生产看板",
    component: resolve => require(["@/view/proMng/ProRpt/index"], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/proWeaveJobSummary",
    name: "织单用纱汇总",
    component: resolve => require(["@/view/proMng/ProWeaveJobSummary/index"], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/LeftOverOrder",
    name: "织单用纱汇总",
    component: resolve => require(["@/view/proMng/LeftOverOrder/index"], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/ProWorkflowInfo",
    name: "生产工序",
    component: resolve => require(["@/view/proMng/ProWorkflow/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/gantt",
    name: "gantt",
    component: resolve => require(["@/view/proMng/gantt/index"], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/EquipmentType",
    name: "生产设备",
    component: resolve =>
      require(["@/view/proMng/EquipmentType/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ProWorkPackage",
    name: "生产工作包",
    component: resolve =>
      require(["@/view/proMng/ProWorkPackage/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  //生产管理,
  {
    path: "/proSalSchedule",
    name: "生产排期",
    component: resolve =>
      require(["@/view/proMng/orderSchedule/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proScheduling",
    name: "生产排单",
    component: resolve => require(["@/view/proMng/Calculator/socket"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ldOrder",
    name: "LD通知單",
    component: resolve => require(["@/view/proMng/ldOrder/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dyeNotice",
    name: "染整通知單",
    component: resolve => require(["@/view/proMng/dyeNotice/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/finalizeDesign",
    name: "定型指令单",
    component: resolve =>
      require(["@/view/proMng/finalizeDesign/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/afterArrange",
    name: "后整指令单",
    component: resolve =>
      require(["@/view/proMng/afterArrange/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: `/codeCard`,
    name: "出缸/定后码卡",
    component: resolve => require(["@/view/proMng/codeCard/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: `/codeCard/:type`,
  //   name: "定型批色",
  //   component: resolve => require(["@/view/proMng/codeCard/index"], resolve),
  //   meta: {
  //     keepAlive: true
  //   }
  // },

  // 报表
  {
    path: "/buffyPrints", // 布票打印記錄
    name: "布票打印記錄",
    component: resolve => require(["@/view/proMng/buffyPrints/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/clothFly", // 布票打印
    name: "布票打印",
    component: resolve =>
      require(["@/view/proMng/print/clothFly/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/output", // 生产日产量
    name: "生产日产量",
    component: resolve => require(["@/view/proMng/output/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/outputSchedule", // 生产日产量
    name: "生产进度",
    component: resolve =>
      require(["@/view/proMng/outputSchedule/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // // 染整工单
  {
    path: "/dyeing", // 染整工单
    name: "染整工单",
    component: resolve =>
      require(["@/view/proMng/print/dyeing/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proWeaveJob", // 織造通知單打印
    name: "織造通知單",
    component: resolve =>
      require(["@/view/proMng/print/proWeaveJob/index"], resolve),
    meta: {
      keepAlive: false
    },
    props: route => ({ jobType: route.query.jobType })
  },
  {
    path: "/developWeaveJob", // 織造通知單打印
    name: "織造通知單(开发)",
    component: resolve =>
      require(["@/view/proMng/developMng/weaveOrder/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proOutWeaveJob", // 外发織造通知單打印
    name: "外发織造通知單",
    component: resolve =>
      require(["@/view/proMng/print/proOutWeaveJob/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/yarnBatch", // 纱缸查织单
    name: "纱缸查织单",
    component: resolve => require(["@/view/proMng/yarnBatch/index"], resolve),
    meta: {
      keepAlive: true
    }
  },  {
    path: "/ProSpecRecorder", // 规格资料记录
    name: "规格资料记录",
    component: resolve => require(["@/view/proMng/ProSpecRecorder/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: "/cropping", // 織造通知單打印
  //   name: "cropping",
  //   component: resolve => require(["@/view/proMng/cropping/index"], resolve)
  // },
  // {
  //   path: "/weaveRecord", // 織造通知單打印
  //   name: "weaveRecord",
  //   component: resolve =>
  //     require(["@/view/proMng/WeaveJobRecord/index"], resolve)
  // },
  {
    path: "/techCode", // 漂染工艺
    name: "漂染工艺",
    component: resolve => require(["@/view/proMng/techCode/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/revolve", // 染整生产运转单
    name: "生产运转单",
    component: resolve => require(["@/view/proMng/revolve/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/developRevolveOrder", // 生产生产运转单
    name: "生产运转单",
    component: resolve => require(["@/view/proMng/developMng/revolveOrder/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ldDrawDesign",
    name: "LD打样",
    component: resolve =>
      require(["@/view/proMng/ldDrawDesign/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorSend",
    name: "批色送办",
    component: resolve => require(["@/view/proMng/colorSend/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorRepair",
    name: "批色回修单",
    component: resolve => require(["@/view/proMng/colorRepair/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proDriving",
    name: "行车监控",
    component: resolve => require(["@/view/proMng/driving/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/withDrawal2Chiemical",
    name: "化工原料退货通知单",
    component: resolve => require(["@/view/proMng/retMatNotice/index"], resolve),
    meta: {
      keepAlive: true,
      matType: "3"
    }
  },
  {
    path: "/withDrawal2Dyesa",
    name: "染料退货通知单",
    component: resolve => require(["@/view/proMng/retMatNotice/index"], resolve),
    meta: {
      keepAlive: true,
      matType: "4"
    }
  },
  {
    path: "/withDrawal2Access",
    name: "生产辅料退货通知单",
    component: resolve => require(["@/view/proMng/retMatNotice/index"], resolve),
    meta: {
      keepAlive: true,
      matType: "5"
    }
  },
  {
    path: "/orderReview",
    name: "工单审核",
    component: resolve => require(["@/view/proMng/orderReview/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proBleadyeRunJob",
    name: "运转单备布统计",
    component: resolve =>
      require(["@/view/quaLity/qcProBleadyeRunJob/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proProcess",
    name: "生产进度表",
    component: resolve =>
      require(["@/view/proMng/ProProcess/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: "/collarNote",
  //   name: "扁机收货台账",
  //   component: resolve =>
  //     require(["@/view/proMng/collarNote/index"], resolve),
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  {
    path: "/collarNote",
    name: "扁机收货台账",
    component: resolve =>
      require(["@/view/proMng/proCollarAccount/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proBleadjobDcctask",
    name: "染整中控任务",
    component: resolve =>
      require(["@/view/proMng/proBleadjobDcctask/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorNoSetting",
    name: "本厂色号资料维护",
    component: resolve =>
      require(["@/view/proMng/colorNoSetting/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: '/EquipmentSchedule',
  //   name: '设备排期',
  //   component: resolve => require(['@/view/proMng/EquipmentSchedule/index'], resolve)
  // },
  {
    path: "/materialStatistic",
    name: "定型物料统计",
    component: resolve =>require(["@/view/proMng/materialStatistic/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: "/productionOrderProcess",
  //   name: "生产单流程",
  //   component: resolve =>require(["@/view/proMng/processManagement/productionOrder/index"], resolve),
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  {
    path: "/processTask",
    name: "我的待办",
    component: resolve =>require(["@/view/proMng/processManagement/processTask/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/doneTask",
    name: "已办任务",
    component: resolve =>require(["@/view/proMng/processManagement/doneTask/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ReportModifyData",
    name: "数据修改申请",
    component: resolve =>require(["@/view/proMng/ReportModifyData/index"], resolve),
    meta: {
      keepAlive: true
    }
  },


];
