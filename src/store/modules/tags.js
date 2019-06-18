import * as types  from '../mutation-types.js'
import { setTagsCache, getTagsCache } from 'utils/cache.js'
const state = {
  tags: getTagsCache()
}

const mutations = {
  [types.SET_TAGS] (state, tag) {
    const index = state.tags.findIndex(item => {
      return tag.path === item.path
    })
    if (index === -1) {
      state.tags.push({
        title: tag.meta.title || 'no-name',
        path: tag.path,
        query: tag.query
      })
    }
    setTagsCache(state.tags)
  },
  [types.DEL_TAGS] (state, tag) {
    const index = state.tags.findIndex(item => {
      return tag.path === item.path
    })
    if (index > -1) {
      state.tags.splice(index, 1)
    }
    setTagsCache(state.tags)
  }
}
const actions = {
  deleteTags ({ commit }, tag) {
    return new Promise(resolve => {
      commit(types.DEL_TAGS, tag)
      resolve()
    }) 
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}