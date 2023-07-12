import {proMng} from "./proMng";

export const menuData = _this => {
  return {
    menu: [
      ...proMng(_this),
    ]
  };
};
