<template>
  <div class="login">
    <el-button type="primary" size="small" @click="handleLoginClick">登陆</el-button>
  </div>
</template>
<script>
import { login } from 'api/user.js'
import { ERR_OK } from 'assets/js/config.js'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登陆
    handleLoginClick () {
      login(this.loginForm).then(res => {
        console.log(res)
        if (res.code !== ERR_OK) {
          console.log('error')
        }
      })
    }
  }
}
</script>

