<template>
  <div class="layout">
    <div class="left-container">
      <sidebar></sidebar>
    </div>
    <div class="right-container">
      <div class="header-container">
        <m-header></m-header>
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
export default {
  components: {
    Sidebar,
    MHeader
  }
}
</script>

<style lang="stylus" scoped>
  .layout
    width: 100%
    height: 100%
    display: flex;
    .left-container
      flex: 0 0 210px
      width: 210px
      height: 100%
    .right-container
      flex: 1
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      .header-container
        flex: 0 0 60px
        width: 100%
        height: 60px
      .main-container
        flex: 1
        width: 100%
</style>
