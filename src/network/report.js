import http from "./http";
 // 数据统计
export function getReports(){
  return http.get('reports/type/1')
}