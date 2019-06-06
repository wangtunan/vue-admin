<template>
  <div class="home">
    <el-button type="primary" size="small" @click="handleCollapseClick">折叠/展开</el-button>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    handleCollapseClick () {
      this.setCollapse(!this.isCollapse)
    },
    // vuex
    ...mapMutations({
      'setCollapse': 'SET_COLLAPSE'
    })
  },
  computed: {
    // vuex
    ...mapGetters([
      'userInfo',
      'isCollapse'
    ])
  }
}
</script>

