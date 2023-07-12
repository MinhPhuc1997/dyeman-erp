/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-03-24 14:06:15
 * @Description:
 */

export function whseMng(_this) {
  return [
    {
      menuName: _this.$t("menuData.whseMng.positions"), // '仓库管理',
      index: "imWl",
      icon: "el-icon-edit-outline",
      name: "im"
      // children: [
      //   {
      //     menuName: _this.$t("menuData.whseMng.positions"), //'1.仓位管理'
      //     index: "/imWl"
      //   },
      //   {
      //     menuName: _this.$t("menuData.whseMng.inAndOut"),//'2.出入库管理',
      //     index: "/imWk"
      //   },
      //   {
      //     menuName: _this.$t("menuData.whseMng.inventory"),// '3.库存管理',
      //     index: "/imIty"
      //   },

      //   // {
      //   //   menuName: "手动操作",
      //   //   index: "/imHo"
      //   // },
      //   // {
      //   //   menuName: "安全库存",
      //   //   index: "/imSft"
      //   // },
      //   // {
      //   //   menuName: "采购需求生成",
      //   //   index: "/imDg"
      //   // }
      // ]
    },
    {
      menuName: _this.$t("menuData.whseMng.inAndOut"), // '仓库管理',
      index: "imWk",
      icon: "el-icon-s-order",
      name: "im"
    },
    {
      menuName: _this.$t("menuData.whseMng.inventory"), // '仓库管理',
      index: "imIty",
      icon: "el-icon-s-order",
      name: "im",
      children: [
        {
          menuName: "1.库存期初定义", //'1.仓位管理'
          index: "ityBasic"
        },
        {
          menuName: "2.库存查询", //'1.仓位管理'
          index: "inventory"
        },
        {
          menuName: "3.盘点清单",
          index: "inventorySnapshot"
        },
        {
          menuName: "4.在库载具",
          index: "stockVehicle"
        },
        {
          menuName: "5.库存整理",
          index: "seitLocation"
        },
        {
          menuName: "6.胚布仓整理",
          index: "greyClothSeit",
          icon: "el-icon-s-operation",
          name: "geryClothSeit",
          children: [
            {
              menuName: "6.1.胚布载具整理",
              index: "greyClothVehSeit",
            },
            {
              menuName: "6.2.载具货位整理",
              index: "vehLocSeit",
            },
            {
              menuName: "6.3.胚布盘余",
              index: "invDiff",
            }
          ]
        },
        {
          menuName: "7.入仓单管理", //'2.生产运转'
          index: "whseDetailReport"
        },
        {
          menuName: "8.胚布查询",
          index: "cloth_query",
        },
        {
          menuName: "9.成品出入仓",
          index: "productAction",
        },
        {
          menuName: "10.仓库出入库统计",
          index: "whseReport",
        },
        {
          menuName: "11.物料报废申请",
          index: "scrapApply"
        },
        {
          menuName: "12.多布仓库管理",
          index: "WhseLeftOver"
        },
        {
          menuName: "13.外发纱线出库",
          index: "yarn_outgoing"
        },
        // {
        //   menuName: "13.纱线台账",
        //   index: "yarnAccount"
        // },
      ]
    },
    {
      menuName: "四.仓库载具管理", // '仓库管理',
      index: "whseVehicle",
      icon: "el-icon-s-order",
      name: "whseVehicle"
      // children: [
      //   {
      //     menuName: "1.库存期初定义", //'1.仓位管理'
      //     index: "/ityBasic"
      //   },
      //   {
      //     menuName: "2.仓库载具管理", //'1.仓位管理'
      //     index: "/whseVehicle"
      //   },
      // ]
    },
    {
      menuName: "五.出入库看板", // '仓库管理',
      index: "whseInOutKB",
      icon: "el-icon-s-order",
      name: "whseInOutKB"
    },
    {
      menuName: "六.松布/验布出库", // '仓库管理',
      index: "transferLoadQa",
      icon: "el-icon-s-order",
      name: "transferLoadQa"
    },
    {
      menuName: "七.打印功能",
      index: "whsePrint",
      icon: "el-icon-printer",
      name: "whsePrint",
      children: [
        {
          menuName: "1.物料出厂信息卡",
          index: "mateFactCard",
          name: "mateFactCard",
        }
      ]
    }
  ];
}
