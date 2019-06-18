<template>
  <div class="search-form">
    <el-form size="medium" :inline="true" :model="searchForm">
      <el-form-item v-for="(item,index) in condition" :label="item.label" :key="index">
        <el-input v-if="item.type==='input'" v-model="searchForm[item.key]" :placeholder="item.placeholder || '请输入'" clearable></el-input>
        <el-select v-if="item.type==='select'" v-model="searchForm[item.key]" :placeholder="item.placeholder || '请选择'" clearable >
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(option,index) in item.options" :key="index" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-search" @click="handleSearchClick">查询</el-button>
        <el-button type="primary" class="el-icon-download">导出</el-button>
        <el-button type="text" @click="handleClearClick">清空查询条件</el-button>
      </el-form-item>
      <el-form-item class="add-btn">
        <el-button  class="el-icon-plus">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    condition: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      searchForm: {}
    }
  },
  methods: {
    // 查询事件
    handleSearchClick () {
      this.$emit('search', this.searchForm)
    },
    // 清空查询条件
    handleClearClick () {
      this.searchForm = {}
    }
  }
}
</script>
<style lang="stylus" scoped>
  .search-form
    .el-form-item
      margin-right: 20px
      .el-button
        >>> span
          margin-left: 4px
      &.add-btn
        float: right
        margin-right: 0
</style>
