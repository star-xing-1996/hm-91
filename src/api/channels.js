import store from '@/store'

// 专门处理频道的请求
import request from '@/utils/request'

// 本地缓存，需要key
const CACHE_CHANNEL_T = 'hm-91-toutiao-t'// 游客登录
const CACHE_CHANNEL_U = 'hm-91-toutiao-u'// 用户登录
// 获取我的频道
export function getMyChannels () {
  // return request({
  //   url: '/user/channels'
  // })
  return new Promise(async function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T// 用于缓存的key
    // 从缓存中读取数据
    let str = localStorage.getItem(key)// 得到缓存结果
    if (str) {
      // 如果str 存在，表示缓存中有数据
      resolve({ channels: JSON.parse(str) })// 从缓存中获取数据，通过执行链下发给下一个Promise
    } else {
      // 如果没有数据
      const data = await request({ url: '/user/channels' })// 从线上拉取数据
      localStorage.setItem(key, JSON.stringify(data.channels))// 从线上把数据写入缓存
      resolve(data)// 从线上获取的数据释放下给promise
    }
  })
}
// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
