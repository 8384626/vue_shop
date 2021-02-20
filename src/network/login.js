import http from "./http";


export function getLoginDate(user){
  return http.post("/login",user)
}
