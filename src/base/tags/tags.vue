<template>
  <div class="tags-container">
    <router-link v-for="item in tags" :key="item.path" tag="span" class="tags-item" :to="item.path" :class="isActiveRoute(item) ? 'active':''" >
      {{item.title}}
      <i class="el-icon-close" @click.stop="handleDeleteClick(item)"></i>
    </router-link>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'tags'
    ])
  },
  methods: {
    isActiveRoute (route) {
      return route.path === this.$route.path
    },
    handleDeleteClick (tag) {
      this.deleteTags(tag).then(() => {
        // 删完后，激活最后一个tag
        if (!this.tags.length) {
          return
        }
        // 当前路由对应的tag索引
        const index = this.tags.findIndex(item => {
          return item.path === this.$route.path
        })
        if (index === -1) {
          // 当前没有激活的tag，则默认激活最后一个tag
          const lastRoute = this.tags[this.tags.length - 1]
          this.$router.push({ path: lastRoute.path }) 
        }
      })
    },
    ...mapMutations('tags', {
      addTags: 'SET_TAGS'
    }),
    ...mapActions('tags', [
      'deleteTags'
    ])
  },
  watch: {
    $route(route) {
      this.addTags(route)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .tags-container
    width: 100%
    height: 40px
    line-height: 40px
    border-bottom: 2px solid #2f4050
    .tags-item
      display: inline-block
      padding: 0px 20px
      height: 38px
      box-sizing: border-box
      background-color: #fafafa
      border-right: 1px solid #ddd
      font-size: 12px
      cursor: pointer
      &.active
        background-color: #42b983
        color: #fff
      .el-icon-close
        position: relative
        right: -10px
        top: 0
        font-size: 12px
        &:hover
          border-radius: 50%
          background-color: #B4BCCC
          color: #fff
</style>
