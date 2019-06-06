<template>
  <div class="login">
    <el-form :model="loginForm" size="small" class="login-form" :rules="rules" ref="loginForm" label-width="60px" label-position="top">
      <div class="title-container">
        <h2 class="title">Login Form</h2>
      </div>
      <el-form-item label="账户" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-button :loading="isLoading" class="login-btn" type="primary" size="medium" @click="handleFormValidate">登陆</el-button>
    </el-form>
  </div>
</template>
<script>
import { login } from 'api/user.js'
import { ERR_OK } from 'api/config.js'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    // 表单校验规则
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 20, message: '密码长度必须在1-20个字符之间', trigger: 'blur' }
      ]
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      isLoading: false, // 登陆loading
      rules: rules // 表单校验规则
    }
  },
  methods: {
    // 表单校验
    handleFormValidate () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login()
        } else {
          console.log('form validate error!') 
        }
      })
    },
    // 登陆
    login () {
      this.isLoading = true
      login(this.loginForm).then(res => {
        this.isLoading = false
        if (res.code !== ERR_OK) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.setToken(res.data.token)
        this.removeUserCacheInfo()
        this.$router.push('/home')
      }).catch(() => {
        this.isLoading = false
      })
    },
    // Vuex
    ...mapMutations({
      'setToken': 'SET_TOKEN',
      'removeUserCacheInfo': 'user/REMOVE_USER_INFO'
    })
  }
}
</script>
<style lang="stylus" scoped>
  $login-bg = #2d3a4b
  .login >>> .el-form-item__label {
    color: #fff
  }
  .login
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background-color: $login-bg
    color: #fff
    .login-form
      position: absolute
      left: 50%
      top: 40%
      transform: translate(-50%, -50%)
      width: 520px
      overflow: hidden
      .title-container
        margin-bottom: 40px
        .title
          margin: 20px 0
          text-align: center
          font-size: 26px
      .el-form-item
        margin: 20px 0
      .login-btn
        margin-top: 15px
        width: 100%
</style>
