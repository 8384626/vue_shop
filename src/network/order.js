import http from "./http";


// 获取订单管理
export function getOrderList(data){
  return http.get('orders',data)
}