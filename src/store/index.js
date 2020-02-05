import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 放置公共数据
  state: {
    user: auth.getUser() // 获取缓存中的数据
  },
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user// 更新缓存中的数据
      auth.setUser(payload.user)// 将缓存中的数据放到本地存储中
    },
    clearUser (state) {
      state.user = {}
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
