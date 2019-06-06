import storage from 'good-storage'
const TOKEN_KEY = 'admin_token_key'
const USER_KEY = 'admin_user_key'

// 设置token
export function setToken (token) {
  storage.set(TOKEN_KEY, token)
}
// 获取token
export function getToken () {
  return storage.get(TOKEN_KEY, '')
}
// 移除token
export function removeToken () {
  storage.remove(TOKEN_KEY)
}
// 设置用户信息
export function setUserCacheInfo (userInfo) {
  storage.set(USER_KEY, userInfo)
}
// 获取用户信息
export function getUserCacheInfo () {
  return storage.get(USER_KEY, null)
}
// 移除用户信息
export function removeUserCacheInfo () {
  storage.remove(USER_KEY)
}
