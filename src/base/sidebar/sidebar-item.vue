<template>
  <div class="sidebar-item-container">
    <template v-if="hasOneShowingChild(route.children)">
      <router-link :to="resolvePath(onlyOneChild.path)" tag="div" class="sub-item-box">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(route.path)">
      <template slot="title">
        <i :class="'el-icon-'+route.meta.icon"></i>
        <span slot="title">{{route.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    route: {
      type: Object,
      default () {
        return {}
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: ''}
        return true
      }
      if (showingChildren.length === 1) {
        return false
      }
      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .sub-item-box
    .el-menu-item
      padding-left: 48px!important
</style>
