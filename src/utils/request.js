import axios from 'axios'
import JSONBIg from 'json-bigint'
import store from '@/store'

// 创建一个axios的实例，和原来的axios没有关系
const instance = axios.create({
  // 构造参数
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置请求地址常量
  transformRequest: [function (data) {
    try {
      return JSONBIg.parse(data)
    } catch (error) {
      return data
    }
  }]
})
//   在请求拦截器注入token
instance.interceptors.request.use(function (config) {
  // 如果有token。那么注入token
  if (store.state.user.token) {
    config.headers['Authorization'] = `bearer ${store.state.user.token}`
  }
}, function (error) { // 如果没有，返回失败
  return Promise.reject(error)
})
// 在响应拦截器处理返回的数据
instance.nterceptors.response.user(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, function (error) {
  return Promise.reject(error)
})
