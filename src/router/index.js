import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入模板
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home }// 一级路由
]

const router = new VueRouter({
  routes
})

export default router
