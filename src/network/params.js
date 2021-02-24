import http from "./http";

// 获取所有的商品分类
export function getCateList(){
  return http.get('categories')
} 
// 根据id和 面板获取数据
export function getCateListById(data){
  return http.get(`categories/${data.id}/attributes`,data)
}

// 添加动态或者静态的属性
export function addParamsDate(data){
  return http.post(`categories/${data.id}/attributes`,data)
}
// 根据Id查询属性的参数
export function getCateAttrById(data){
  return http.get(`categories/${data.id}/attributes/${data.attrId}`,data)
}
// 提交修改的参数
export function editParamsDate(data){
  return http.put(`categories/${data.id}/attributes/${data.attrId}`,data)
}
// 删除当前参数
export function removeParamsDate(data){
  return http.delete(`categories/${data.id}/attributes/${data.attrid}`,data)
}
// 提交编辑参数
// export function setCateAttrDate(data){
//   return http.put(`categories/${data.id}/attributes/${data.attrId}`,data)
// }