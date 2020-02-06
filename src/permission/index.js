// 路由的拦截=>导航守卫
import router from '@/router'
import store from '@/store'

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 拦截 判断有无token  有token=> 放行，没有token，放行
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: to.path
      }
    }
    next(toPath)
  } else {
    next()// 直接放行
  }
})
export default router
