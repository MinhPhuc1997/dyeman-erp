/*
 * @Author: Yang
 * @Date: 2022-03-15 11:01:27
 * @Last Modified by: Yang
 * @Last Modified time: 2022-03-15 13:34:30
 */
// 工具

// 千分位转化
import store from "../store";

export function num2ThousandthFormat(v, decimal = 2) {
  return v && Number(v).toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//chuyển giá trị của ngày tháng sang số
export function convertDateToNumber(date) {
  if(date==undefined || date==null){
    return 0
  }
  let arr = date.substring(0,10).split("-")
  return Number(arr[0]) * 10000 + Number(arr[1]) * 100 + Number(arr[2])
}

// 日期组件表配置
export const pickerOptions = {
  shortcuts: [
    {
      text: '近三天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
        picker.$emit('pick', [start, end]);
      }
    },
    {
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }]
}

export function MoveElement(array, fromIndex, toIndex) {
  // Lấy phần tử được chuyển đổi
  const element = array[fromIndex];

  // Xóa phần tử được chuyển đổi từ mảng
  array.splice(fromIndex, 1);

  // Thêm phần tử được chuyển đổi vào vị trí mới
  array.splice(toIndex, 0, element);

  // Trả về mảng đã được thay đổi
  return array;
}

export function CheckPermissonDisabled(value) {
  const all_permission = "*:*:*";
  const permissionFlag = value
  const permissions = store.getters && store.getters.permissions
  const hasPermissions = permissions.some(permission => {
    return all_permission === permission || permissionFlag.includes(permission)
  })
  return !hasPermissions
}
