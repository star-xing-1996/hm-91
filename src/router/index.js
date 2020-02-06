import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入模板
// import Home from '@/views/home'
const Layout = () => import ('@/views/layout') // 布局组件
const Home = () => import ('@/views/home')// 主页组件
const Question = () => import ('@/views/question')// 问答组件
const Video = () => import ('@/views/video')// 视频组件
const User = () => import ('@/views/user')// 视频组件
const Profile = () => import ('@/views/user/profile')// 编辑资料组件
const Chat = () => import ('@/views/user/chat')// 小智同学
const Login = () => import ('@/views/login')// 登陆组件
const Search = () => import ('@/views/search')// 搜索中心组件
const Result = () => import ('@/views/search/result')// 搜索结果组件
const Article = () => import ('@/views/article')// 搜索中心组件
Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'home',
    component: Layout, // 一级路由
    children: [
      { path: '/', component: Home }, // 二级路由 首页
      { path: '/question', component: Question }, // 二级路由 问答
      { path: '/video', component: Video }, // 二级路由 视频组件
      { path: '/user', component: User } // 二级路由 个人中心组件
    ]
  },
  { path: '/user/profile', component: Profile }, // 一级路由 编辑资料组件
  { path: '/user/chat', component: Chat }, // 一级路由 小智同学
  { path: '/login', component: Login }, // 一级路由 登陆组件
  { path: '/search', component: Search }, // 一级路由 搜索中心组件
  { path: '/search/result', component: Result }, // 一级路由 搜索结果组件
  { path: '/article', component: Article } // 一级路由 文章详情
]

const router = new VueRouter({
  routes
})

export default router
