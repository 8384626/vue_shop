import { request } from './request'

export function getLoginDate(user){
  return request({
    url: '/login',
    params:user
  })
}