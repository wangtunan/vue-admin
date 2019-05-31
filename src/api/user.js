import axios from 'utils/axios.js'

// 登陆接口
export function login ({ username, password }) {
  return axios.post('/api/login', {
    username,
    password
  })
}