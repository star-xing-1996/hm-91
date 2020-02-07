import Vue from 'vue'
import App from './App.vue'
import router from './permission' //
import store from './store'
import Vant, { Lazyload } from 'vant' // 引入vant组件
import 'vant/lib/index.less' // 引入vant组件css样式
import plugin from '@/utils/plugin'
import '@/styles/index.less'// 引入全局样式
import 'amfe-flexible'// 引入自动适配
Vue.use(Vant) // 全局注册vant
Vue.use(plugin)
Vue.use(Lazyload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
