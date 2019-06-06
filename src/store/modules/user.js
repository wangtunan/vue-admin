import * as types from '../mutation-types.js'
import { getUserInfo } from 'api/user.js'
import { ERR_OK } from 'api/config.js'
import { getToken, getUserCacheInfo, setUserCacheInfo, removeUserCacheInfo } from 'utils/auth.js'
const state = {
  userInfo: getUserCacheInfo(),
  roles: []
}
const mutations = {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.REMOVE_USER_INFO] (state) {
    state.userInfo = null
    removeUserCacheInfo()
  },
  [types.SET_ROLES] (state, roles) {
    state.roles = roles
  }
}
const actions = {
  getUserInfo ({ commit }) {
    let token = getToken()
    return new Promise((resolve, reject) => {
      getUserInfo().then((res) => {
        let { code, data } = res
        if (code !== ERR_OK) {
          reject('get user info error!')
          return
        }
        let result = data.filter(item => {
          return item.token === token
        })
        let userInfo = null
        if (result.length > 0) {
          userInfo = result[0]
        }
        commit('SET_USER_INFO', userInfo)
        commit('SET_ROLES', userInfo.roles)
        setUserCacheInfo(userInfo)
        resolve(userInfo)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}