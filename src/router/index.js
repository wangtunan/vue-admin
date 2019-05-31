import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('components/login/login.vue')
  }
]
const router = new Router({
  scrollBehavior: {
    x: 0,
    y: 0
  },
  routes
})
export default router