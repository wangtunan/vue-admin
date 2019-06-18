import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutation.js'
import * as getters from './getter.js'
import user from './modules/user.js'
import permission from './modules/permission.js'
import tags from './modules/tags.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    tags
  },
  getters,
  state,
  mutations
})
