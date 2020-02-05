// 专门处理用户信息的存储，获取和删除，放置在localStorage中
const USER_TOKEN = 'hm-toutiao' // 这个key 专门用来存储用户信息

// 设置用户信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 获取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
