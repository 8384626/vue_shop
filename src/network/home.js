import http from "./http";

// 左侧菜单权限
export function getHomeMenuList() {
  return http.get("/menus")
}

// 用户数据列表的请求
export function getUserList(query,pagenum,pagesize) {
  return http.get("/users",{query,pagenum,pagesize})
}

// 修改用户状态
export function updateState(uId,type){
  return http.put(`users/${uId}/state/${type}`,{uId,type})
}

// 添加管理员
export function addAndmin(addDate){
  return  http.post('/users',addDate)
}

// 根据id查询用户数据
export function getIdData(id){
  return http.get(`users/${id}`,id)
}

// 修改用户数据
export function updateUserData(dataArray){
  return http.put(`users/${dataArray.id}`,dataArray)
}

// 删除用户
export function deleteUsers(id){
  return http.delete(`users/${id}`,id)
}