import * as types from '../mutation-types.js'
import { commonRoutes, asyncRoutes } from 'router/index.js'
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  [types.SET_ROUTES] (state, routes) {
    state.addRoutes = routes
    state.routes = commonRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve) => {
      let accessRoutes
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// 是否有此路由的权限
function hasPermission (route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      return route.meta.roles.includes(role)
    })
  } else {
    return true
  }
}

// 过滤有权限的路由
export function filterAsyncRoutes (routes, roles) {
  const ret = []
  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(temp, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      ret.push(temp)
    }
  })
  return ret
}