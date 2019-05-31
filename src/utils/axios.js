import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from 'utils/auth.js'
import { ERR_OK } from 'assets/js/config.js'
const service = axios.create({
  baseURL: '',
  timeout: 10000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers['token'] = getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    let { status, data } = response
    if (status !== 200) {
      Message({
        message: '网络异常，请刷新或者重试!',
        type: 'error',
        duration: 2000
      })
      return Promise.reject('网络异常')
    }
    if (data.code !== ERR_OK) {
      Message({
        message: data.message || '接口请求异常，请重试!',
        type: 'error',
        duration: 3000
      })
      return Promise.reject(data.message || '接口异常')
    }
    return Promise.resolve(data)
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service