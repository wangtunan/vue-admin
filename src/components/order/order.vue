<template>
  <div class="order-container">
    <!-- 搜索表单 -->
    <search-form :condition="condition" @search="handleSearchClick"></search-form>

    <!-- 表格 -->
    <el-table :data="orderData" v-loading="isLoading" border fit highlight-current-row>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="code" label="订单号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="address" label="收货地址" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="price" label="单价(元)" align="center">
        <template slot-scope="{row}">
          ¥ {{row.price}}
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量(个)" align="center"></el-table-column>
      <el-table-column label="总价(元)" align="center">
        <template slot-scope="{row}">
          ¥ {{row.price * row.number}}
        </template>
      </el-table-column>
      <el-table-column  label="订单状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | filterType">
            {{row.status | filterOrderStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="异常状态" align="center">
        <template slot-scope="{row}">
          <span style="color: #85CE61" v-if="row.state===0">正常</span>
          <span style="color: red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400" align="center">
        <template>
          <el-button size="mini">查看</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="success">发货</el-button>
          <el-button size="mini" type="warning">撤销</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :limit.sync="limit" :page.sync="page" @change="getOrderList"></pagination>
  </div>
</template>
<script>
import SearchForm from 'base/search-form/search-form.vue'
import Pagination from 'base/pagination/pagination.vue'
import { ERR_OK } from 'api/config.js'
import { getOrderList } from 'api/order.js'
import { orderType } from 'assets/js/dataJson.js'
const tagTypes = ['success', 'info', 'warning', 'danger']
export default {
  data () {
    return {
      total: 100,
      limit: 20,
      page: 1,
      isLoading: false,
      orderData: [],
      condition: []
    }
  },
  created () {
    // 初始化查询条件
    let options = orderType.map(item => {
      return {
        label: item.value,
        value: item.key
      }
    })
    this.condition = [
      { type: 'input', key: 'order', label: '订单编号', placeholder: '请输入订单编号' },
      { type: 'select', key: 'status', label: '订单状态', options: options},
    ]
    this.getOrderList()
  },
  methods: {
    // 表单：查询
    handleSearchClick (form) {
      console.log(form)
      this.getOrderList()
    },
    // 获取数据：获取订单列表
    getOrderList () {
      this.isLoading = true
      getOrderList({
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.isLoading = false
        if (res.code === ERR_OK) {
          this.orderData = res.data
        }
      }).catch(() => {
        this.isLoading = false
      })
    }
  },
  filters: {
    // 订单状态对应的text
    filterOrderStatus (status) {
      let index = orderType.findIndex(item => {
        return item.key === parseInt(status)
      })
      return index > -1 ? orderType[index].value : ''
    },
    // 订单状态对应的type
    filterType (status) {
      return tagTypes[+status]
    }
  },
  components: {
    Pagination,
    SearchForm
  }
}
</script>
<style lang="stylus" scoped>
  .order-container
    margin: 20px 30px
    overflow: hidden
</style>
