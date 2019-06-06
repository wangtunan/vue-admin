import axios from 'utils/axios.js'
import { ERR_OK } from './config.js'
const users = ['admin', 'why']
// 登陆接口
export function login ({ username, password }) {
  if (!isValidUser(username, password)) {
    return Promise.resolve({
      code: 1,
      data: {},
      message: '不是合法账户!'
    })
  }
  return new Promise((resolve, reject) => {
    axios.get('/api/login.json', {
      params: {
        username,
        password
      }
    }).then(res => {
      if (res.code === ERR_OK) {
        let token = res.data.token[username]
        res.data.token = token
        resolve(res)
      } else {
        reject()
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
// 验证是否是合法用户
export function isValidUser (username, password) {
  return users.includes(username) && password === '123456'
}
// 获取用户信息
export function getUserInfo () {
  return axios.get('api/user.json')
}