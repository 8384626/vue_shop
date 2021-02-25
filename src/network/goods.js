import http from "./http";

// 获取商品分类数据
export function getCateList(data){
  return http.get('categories',data)
}
//获取父级分类的数据列表
export function getParentCateList(data){
  return http.get('categories',data)
}
// 添加分类
export function addCateList(data){
  return http.post('categories',data)
}
// 根据id查询分类
export function getCateById(id){
  return http.get(`categories/${id}`)
}
// 修改分类名称
export function updateCateDate(data){
  return http.put(`categories/${data.id}`,data)
}
// 删除分类信息
export function deletCateDate(id){
  return http.delete(`categories/${id}`)
}