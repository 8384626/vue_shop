import http from './http.js'

// 请求商品列表数据
export function getListDate(data){
  return http.get('/goods',data)
}
// 删除当前元素
export function removeById(id){
  return http.delete(`goods/${id}`)
}
// 获取所有商品分类数据
export function getCateList(){
  return http.get('categories')
}