<template>
  <div class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    // 背景
    background: {
      type: Boolean,
      default: true
    },
    // 当前页码
    page: {
      type: Number,
      default: 1
    },
    // 每页显示数据的数量
    limit: {
      type: Number,
      default: 20
    },
    // 分页能显示数量的数组
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50]
      }
    },
    // 分页的功能配置
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 数据的总数
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    currentPage: {
      set (val) {
        this.$emit('update:page', val) 
      },
      get () {
        return this.page
      }
    },
    pageSize: {
      set (val) {
        this.$emit('update:limit', val)
      },
      get () {
        return this.limit
      }
    }
  },
  methods: {
    // page-size 改变事件
    handleSizeChange (limit) {
      this.$emit('change', { page: this.currentPage, limit: limit })
    },
    // current-page 改变事件
    handleCurrentChange (page) {
      this.$emit('change', { page: page, limit: this.pageSize })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .pagination-container
    padding: 30px 16px
    >>>.el-pagination
      text-align: center
</style>
