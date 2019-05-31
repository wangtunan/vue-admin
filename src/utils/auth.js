import cookies from 'js-cookie'

const tokenPrefix = 'admin_token_prefix'

export function getToken () {
  return cookies.get(tokenPrefix)
}

export function setToken (token) {
  return cookies.set(tokenPrefix, token)
}

export function removeToken () {
  return cookies.remove(tokenPrefix)
}