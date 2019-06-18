import axios from 'utils/axios.js'
// import { ERR_OK } from './config.js'

// 获取订单列表
export function getOrderList (page, limit) {
  return axios.get('/api/order.json', {
    params: {
      page,
      limit
    }
  })
}