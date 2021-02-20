import { request } from "./request";

export function getHomeMenuList() {
  return request({
    url: "/menus",
  });
}

// 用户数据列表的请求
export function getUserList(query,pagenum,pagesize) {
  return request({
    url: "/users",
    params: {
      query,
      pagenum,
      pagesize
    },
  });
}

// 修改用户状态
export function updateState(uId,type){
  return request({
    url:`users/${uId}/state/${type}`,
    method: "PUT",
  })
}
