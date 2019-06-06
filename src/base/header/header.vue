<template>
  <div class="header">
    <!-- 左侧 toggle-->
    <div class="hamburger-container" @click="handleHamburgerClick">
      <i :class="hamburgerClass"></i>
    </div>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <breadcrumb ></breadcrumb>
    </div>

    <!-- 右侧导航 -->
    <div class="right-container">
      <el-badge :value="12" :max="99" class="badge-container">
        <i class="el-icon-message"></i>
      </el-badge>
      <el-dropdown>
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar" alt="">
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Breadcrumb from 'base/breadcrumb/breadcrumb.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    hamburgerClass () {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    // vuex
    ...mapGetters([
      'userInfo',
      'isCollapse'
    ])
  },
  methods: {
    handleHamburgerClick () {
      this.setCollapse(!this.isCollapse)
    },
    ...mapMutations({
      'setCollapse': 'SET_COLLAPSE'
    })
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="stylus" scoped>
  $header-height = 50px

  .header
    width: 100%
    height: $header-height
    line-height: $header-height
    overflow: hidden
    box-shadow: 0 2px 4px rgba(0,0,0,.08)
    .hamburger-container
      float: left
      width: 40px
      height: $header-height
      cursor: pointer
      text-align: center;
      font-size: 25px
      line-height: $header-height
      transition: background .3s
      color: rgba(0,0,0,0.8)
      &:hover
        background: rgba(0,0,0,0.08)
    .breadcrumb-container
      float: left
      margin-left: 15px
    .right-container
      margin-right: 20px
      margin-top: 5px
      float: right
      height: 100%
      .badge-container
        margin-right: 30px
        top: -5px
        line-height: unset
        cursor: pointer
        .el-icon-message
          font-size: 28px
          color: #58a
      .avatar-wrapper
        width: 40px
        height: 40px
        border-radius: 50%
        background-color:#ddd
        cursor: pointer
        & > img
          width: 100%
          height: 100%
          border: 1px solid #eee
          border-radius: 50%
</style>
