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
