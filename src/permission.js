import router from './router/index.js'
import store from './store/index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, removeUserCacheInfo } from 'utils/auth.js'

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  let token = getToken()
  if (token) {
    // 如果已经登陆过，直接跳转至首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let roles = store.getters.roles
      if ( roles && roles.length > 0) {
        next()
      } else {
        let { roles } = await store.dispatch('user/getUserInfo')
        let accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        router.addRoutes(accessRoutes)
        next({ ...to, replace:true })
      }
    }
  } else {
    removeUserCacheInfo()
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
  NProgress.done()
})
router.afterEach(() => {
  NProgress.done()
})