<template>
  <div class="container">
    <!--头部位置   可以采用vant的组件实现 -->
    <van-nav-bar @click-right="$router.push('/search')" v-if="showNavBar" fixed title="黑马头条" right-text="搜索"></van-nav-bar>
    <!-- 二级路由容器 首页 问答 视频 我的 -->
    <div class="my-wrapper" :class="{noTop:!showNavBar}">
       <router-view></router-view>
    </div>
    <!--底部 标签栏 -->
    <van-tabbar route>
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
  <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    showNavBar () {
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
