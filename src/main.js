import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 引入vant组件
import 'vant/lib/index.css' // 引入vant组件css样式
import 'amfe-flexible'// 引入自动适配
Vue.use(Vant) // 全局注册vant

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
