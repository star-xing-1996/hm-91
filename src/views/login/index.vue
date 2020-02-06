<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录" ></van-nav-bar>
  <van-cell-group>
    <van-field label="手机号" placeholder="请输入手机号"></van-field>
    <van-field label="验证码" placeholder="请输入验证码">
      <van-button slot="button" size="small" type="primary">获取验证码</van-button>
    </van-field>
</van-cell-group>
<div class="btn-box">
<van-button type="info" block size="small" round>登录</van-button>
</div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.btn-box{
  padding: 20px;
}
</style>
