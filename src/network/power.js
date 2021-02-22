import http from "./http";

// 获取权限的列表
export function getRightsList() {
  return http.get(`rights/list`)
}

// 获取角色列表
export function getRolesList(){
  return http.get('roles')
}

// 添加角色
export function addRoles(data){
  return http.post('roles',data)
}

// 根据Id查询角色
export function getRolesById(id){
  return http.get(`roles/${id}`,id)
}

// 修改角色信息
export function updateRoles(data){
  return http.put(`roles/${data.roleId}`,data)
}
// 删除角色信息
export function deleteRoles(id){
  return http.delete(`roles/${id}`,id)
}
// 根据 ID 删除对应的权限
export function removeRoles(data){
  return http.delete(`roles/${data.roleId.id}/rights/${data.rightId}`,data)
}

// 展示所有权限列表
export function getRolseList(){
  return http.get('rights/tree')
}

// 角色分配权限
export function setRolseList(data){
  return http.post(`roles/${data.roleId}/rights`, data)
}