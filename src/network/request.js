import axios from'axios'

export function request(config) {
  const instance=axios.create({
    baseURL:'http://www.ysqorz.top:8888/api/private/v1',
    timeout:5000
  })

  // 请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },err=>{})
  
  //响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{})

  return instance(config)
}
