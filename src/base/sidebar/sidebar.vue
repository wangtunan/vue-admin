<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="wrap-menu">
      <el-menu
        :unique-opened="false"
        :default-active="activeMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="vertical"
        :collapse-transition="false"
        :collapse="isCollapse">
        <sidebar-item v-for="route in enableRoute" :route="route" :key="route.path" :base-path="route.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from './sidebar-item.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    enableRoute () {
      return this.routes.filter(item => !item.hidden)
    },
    activeMenu () {
      let { path } = this.routes
      return path
    },
    // vuex
    ...mapGetters([
      'isCollapse',
      'routes'
    ])
  },
  components: {
    SidebarItem
  }
}
</script>

<style lang="stylus" scoped>
  .sidebar-container
    height: 100%
    min-height: 100%
    overflow: hidden
    background-color: #545c64
    .el-scrollbar
      height: 100%
      >>> .wrap-menu
        margin-bottom: 0px;
        max-height: 100%
        overflow-x: hidden!important
        ~.is-horizontal
          display: none
      .el-menu
        cursor: pointer
        border-right: none
        .el-menu-item
          cursor: pointer
        >>> .el-submenu__title
          & > i
            color: #BFCBD9!important
</style>
