import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'base/layout/layout.vue'
Vue.use(Router)

// 无权限路由
export const commonRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('components/home/home.vue'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('components/login/login.vue'),
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('base/error/404.vue')
  }
]
// 异步权限路由
export const asyncRoutes = [
  {
    path: '/order',
    name: 'Order',
    component: Layout,
    redirect: '/order/index',
    meta: { title: '订单管理', icon: 'box', roles: ['admin', 'why'] },
    children: [
      {
        path: 'index',
        component: () => import('components/order/order.vue'),
        meta: { title: '订单管理', roles: ['admin', 'why'] }
      },
      {
        path: 'list',
        component: () => import('components/order/list.vue'),
        meta: { title: '我的订单', roles: ['admin', 'why'] }
      }
    ]
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Layout,
    redirect: '/ticket/index',
    meta: { title: '发票管理', icon: 's-ticket', roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('components/ticket/ticket.vue'),
        meta: { title: '发票管理', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/report',
    name: 'Report',
    component: Layout,
    redirect: '/report/index',
    meta: { title: '报表管理', icon: 's-data', roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('components/report/report.vue'),
        meta: { title: '报表管理', roles: ['admin'] }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const createRouter = () => new Router({
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: commonRoutes
})
const router = createRouter()
// 重置路由
export function reserRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}
export default router
