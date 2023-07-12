/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:53
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2023-02-06 10:22:55
 */
import {
    getDIC,
  } from "@/config/index";

export const matTypeEnum = {
    "-1": {
        stockTableName: "whseYarnsAccountTotal",
        materialIdKey: "yarnsId",
        materialNameKey: "yarnsName",
        weightKey: "usableAmount",
        weightNameKey: "可用库存数"
    },
    // 纱线分配源 （占用）
    "-2": {
        stockTableName: "whseYarnPreAllocDtl",
        materialIdKey: "yarnNo",
        materialNameKey: "yarnName",
        weightKey: "allocQty",
        yarnCardKey: "yarnCard",
        weightNameKey: "分配库存数"
    },
    // 纱线
    0: {
        stockTableName: "viewYarnStock",
        materialIdKey: "yarnsId",
        materialNameKey: "yarnsName",
        locationCodeKey: "locationCode",
        weightKey: "weight"
    },
    // 化工
    3: {
        stockTableName: "viewChemicalStock",
        materialIdKey: "chemicalId",
        materialNameKey: "chemicalName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
    // 染料
    4: {
        stockTableName: "viewDyestuffStock",
        materialIdKey: "chemicalId",
        materialNameKey: "chemicalName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
    // 辅料
    5: {
        stockTableName: "viewAccessoriesStock",
        materialIdKey: "accessoriesId",
        materialNameKey: "accessoriesName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
    // 五金
    6: {
        stockTableName: "viewHardwareStock",
        materialIdKey: "accessoriesId",
        materialNameKey: "accessoriesName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
     // 行政
    7: {
        stockTableName: "viewOfficeStock",
        materialIdKey: "officeId",
        materialNameKey: "officeName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    }

}



const mainCrudOpCommon = {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: false,
    showSummary: false,
    tree: true,
    rowKey: "index",
    index: true,
    page: true,
  }

export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column:[
        {
            prop: matTypeEnum[_this.matType].materialIdKey,
            placeholder: " ",
            display: false,
        },
        {
            prop: "poNo",
            placeholder: " ",
            display: false,
        },
        {
            label: _this.$t("techCode.mateName") , //材料名称
            prop: matTypeEnum[_this.matType].materialNameKey,
            placeholder: " ",
            span: 5
        },
        {
            label:  _this.$t("yarnCard"), //纱牌,
            prop: matTypeEnum[_this.matType].yarnCardKey ||  "yarnsCard",
            placeholder: " ",
            span: 5,
            display: _this.matType != '0'
        },
        {
            label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
            prop: "batId",
            placeholder: " ",
            span: 5,
            hide: !(['0',"3", '4'].includes(_this.matType)) // 纱线和染料
        },
        {
            label:  _this.$t('factoryBatch'), //本厂批号,
            prop: "batchNo",
            placeholder: " ",
            span: 5
        },
        {
            label: "货位码",
            prop: matTypeEnum[_this.matType].locationCodeKey,
            placeholder: " ",
            span: 5,
            display: !_this.isMergeStorage
        },
        {
            label: "显示零库存",
            prop: "switchZeroStock",
            span: 4,
            display: _this.matType == '-1',
            type: "switch",
            change: (data) => {
                _this.queryForm.switchZeroStock = data.value;
                _this.getDataList()
            }
        }
    ]
  }
}


export function invCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        height: "calc(100vh - 235px)",
        column:[
            {
                label: "材料编号",
                prop: matTypeEnum[_this.matType].materialIdKey,
                width: 100,
                overHidden: true
            },
            {
                label: _this.$t("techCode.mateName") , //材料名称
                prop: matTypeEnum[_this.matType].materialNameKey,
                width: ['-1',"-2", '0'].includes(_this.matType) ? 400 : 200,
                overHidden: true
            },
            {
                label:  _this.$t('factoryBatch'), //本厂批号,
                prop: "batchNo",
                width: 100,
                overHidden: true
            },
            {
                label:  _this.$t("yarnCard"), //纱牌,
                prop: matTypeEnum[_this.matType].yarnCardKey ||  "yarnsCard",
                width: 100,
                overHidden: true,
                hide: !['-1',"-2", '0'].includes(_this.matType)
            },
            {
                label:  _this.$t("weaveJob.yarnBatch"), //供应商批号
                prop: "batId",
                width: 120,
                overHidden: true,
                hide: !['-1',"-2", '0', "3", "4"].includes(_this.matType)
            },
            {
                label: matTypeEnum[_this.matType].weightNameKey || _this.$t("retMatNotice.inStock"), //库存数
                prop: matTypeEnum[_this.matType].weightKey,
                align: "right",
                width: 120,
                overHidden: true,
                hide: _this.hideOtherCol,
                formatter(r,v){
                    return v && _this.$num2ThousandthFormat(v)
                }
            },
            {
                label:  _this.$t("unit") ,//单位,
                prop: "weightUnit",
                width: 100,
                overHidden: true,
                type: "select",
                dicData: getDIC("bas_matUnit"),
                hide: _this.hideOtherCol || ["-1",'-2'].includes(_this.matType)
            },
            {
                label: "货位码",
                prop: matTypeEnum[_this.matType].locationCodeKey,
                width: 100,
                overHidden: true,
                hide: _this.hideOtherCol || _this.isMergeStorage
            }
        ]
    }
}
