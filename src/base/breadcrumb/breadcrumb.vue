<template>
  <el-breadcrumb separator="/">
    <transition-group name="fade">
      <el-breadcrumb-item v-for="item in navList" :key="item.path" :to="{path: item.path}" class="breadcrumb-item">{{item.meta.title}}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  data () {
    return {
      navList: []
    }
  },
  created () {
    this.getNavList()
  },
  methods: {
    getNavList () {
      let matched = this.$route.matched.filter(item => {
        return item.meta && item.meta.title
      })
      let first = matched[0]
      if (!this.isHomeRoute(first)) {
        matched.unshift({ path: '/home', meta: { title: '首页' }})
      }
      this.navList = matched
    },
    isHomeRoute (route) {
      let name = route && route.name
      if (!name) {
        return false
      }
      return route.name.toUpperCase() === 'HOME'
    }
  },
  watch: {
    $route() {
      this.getNavList()
    }
  }
}
</script>

<style lang="stylus" scoped>
    >>> .el-breadcrumb__inner:not(.is-link)
      color: #97a8be
    .breadcrumb-item
      &.fade-enter-active, &.fade-leave-active
        transition: opacity 0.5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>
