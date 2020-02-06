<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录" ></van-nav-bar>
  <van-cell-group>
    <van-field @blur="checkMobile()" :error-message="errorMsg.mobile" v-model="loginForm.mobile" label="手机号" placeholder="请输入手机号"></van-field>
    <van-field @blur="checkCode()" :error-message="errorMsg.code" v-model="loginForm.code" label="验证码" placeholder="请输入验证码">
      <van-button slot="button" size="small" type="primary">获取验证码</van-button>
    </van-field>
</van-cell-group>
<div class="btn-box">
<van-button @click="login()" type="info" block size="small" round>登录</van-button>
</div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断手机号是否为空
      if (!this.loginForm.mobile) {
        this.errorMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断手机号格式是否正确
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMsg.mobile = '手机号格式错误'
        return false
      }
      this.errorMsg.mobile = ''
      return true
    },
    // 判断验证码是否正确
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMsg.code = '验证码格式不正确'
        return false
      }
      this.errorMsg.code = ''
      return true
    },
    // 登录方法
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        const data = await login(this.loginForm) // 拿到后台用户数据
        // 拿到token，更新token信息
        this.updateUser({ user: data })
        // 登录成功
        this.$gnotify({ type: 'success', message: '登录成功' })
        // 跳转
        // 两种情况 1 redirectUrl (登录未遂 => 登录  => 遂) 2 没有 redirectUrl 跳到首页
        let { redirectUrl } = this.$route.query // 解构当前的路由信息
        this.$router.push(redirectUrl || '/') // 短路表达式
      }
    },
    ...mapMutations(['updateUser'])
  }
}
</script>

<style lang="less" scoped>
.btn-box{
  padding: 20px;
}
</style>
