/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-17 09:55:25
 * @Description:
 */
const getters = {
  getTagView: state => {
    return state.user.tagView;
  },
  yarnInCountData: state => state.whse.yarnInCountData || {},
  chemicalInCountData: state => state.whse.chemicalInCountData || {},
  dyesInCountData: state => state.whse.dyesInCountData || {},
  accInCountData: state => state.whse.accInCountData || {},
  hardInCountData: state => state.whse.hardInCountData || {},
  officeInCountData: state => state.whse.officeInCountData || {},
  engInCountData: state => state.whse.engInCountData || {},
  equInCountData: state => state.whse.equInCountData || {},

  unOutCountData: state => state.whse.unOutCountDataList || [],

  isOutFactory: state => state.isOutFactory,
  outFactoryId: state => state.outFactoryId,
  isSk: state => state.isSk,

  // permission base on account ID UCML
  permissions: state => state.user.permissions,
  code: state => state.user.code,

};
export default getters
