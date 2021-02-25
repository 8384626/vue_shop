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

// 获取所有参数列表
export function getCateParamList(data){
  return http.get(`categories/${data.id}/attributes`,data)
}
// 添加商品
export function setCateDate(data){
  return http.post('goods',data)
}
// 根据ID查询信息
export function updateByIdData(id){
  return http.get(`goods/${id}`)
}
// 修改完毕提交的shuju
export function updateCateData(data){
  return http.put(`goods/${data.goods_id}`,data)
}