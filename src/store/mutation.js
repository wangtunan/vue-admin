import * as types  from './mutation-types.js'
import { setToken }  from 'utils/auth.js'
const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
    setToken(token)
  },
  [types.SET_COLLAPSE] (state, isCollapse) {
    state.isCollapse = isCollapse
  }
}
export default mutations
