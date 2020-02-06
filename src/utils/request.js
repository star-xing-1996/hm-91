import axios from 'axios'
import JSONBIg from 'json-bigint'
import store from '@/store'
import router from '@/router'

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
// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 响应数据  返回得到的响应数据  第一层data是axios默认包data, 第二个data是接口返回里面的包的data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 错误的时候 token容易失效  处理token失效的问题
  // 如何判断失效
  // error  => config (当前请求 的配置) request(请求) response(响应)
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } } // 跳转对象

    //   表示token过期 先判断 是否有refresh_token
    if (store.state.user.refresh_token) {
      try {
        //   应该发送一个请求 换取新的token
      // 这里不应该再用instance  因为 instance会再次进入拦截器  用默认的axios
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token, // 拿到新的token之后
            refresh_token: store.state.user.refresh_token // 将之前 refresh_token 14天有效期

          }
        }) // 更新vuex的数据 也更新了本地缓存数据
        return instance(error.config) // 把刚才错误的请求再次发送出去 然后将promise返回
      // result就是返回结果
      } catch (error) {
        //  如果错误 表示补救措施也没用了 应该跳转到登录页 并且 把废掉的user全都干掉
        store.commit('clearUser') // 所有的用户信息清空
        router.push(toPath) // 跳转到回登录页
      }
    } else {
      // 连refresh_token 都没有
      //  当访问 页面时 => 去登录 => 登录成功之后 => 回到之前的页面  记住当前的地址 => 登录页面 => 读取地址  => 跳到地址
      //  params 动态路由  user/:id
      // query传参  user? id=123
      //   获取当前页面地址
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
export default instance
