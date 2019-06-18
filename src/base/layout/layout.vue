<template>
  <div class="layout">
    <div class="left-container" :class="{'hide-sidebar': isCollapse}">
      <sidebar></sidebar>
    </div>
    <div class="right-container">
      <div class="header-container">
        <m-header></m-header>
        <tags></tags>
      </div>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from 'base/sidebar/sidebar.vue'
import MHeader from 'base/header/header.vue'
import Tags from 'base/tags/tags.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  components: {
    Sidebar,
    MHeader,
    Tags
  }
}
</script>

<style lang="stylus" scoped>
  .layout
    width: 100%
    height: 100%
    display: flex;
    .left-container
      flex: 0 0 200px
      width: 200px
      height: 100%
      transition: all 0.2s
    .right-container
      flex: 1
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      .header-container
        flex: 0 0 100px
        width: 100%
        height: 100px
      .main-container
        flex: 1
        width: 100%
        overflow-x: hidden
</style>
<style lang="stylus">
  $sidebar-width = 54px
  .hide-sidebar
    flex: 0 0 $sidebar-width!important
    width: $sidebar-width!important
    .el-menu--collapse
      width: $sidebar-width!important
    .el-submenu__title
      padding-left: 15px!important
      & > span
        display: none
      .el-submenu__icon-arrow 
        display: none
</style>
