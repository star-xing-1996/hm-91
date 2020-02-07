<template>
       <!-- 设置滚动条，为做阅读记忆留下伏笔 -->
    <div class="scroll-wrapper">
        <van-list v-model="upLoading" :finished="finished"  finished-text="没有更多了"
  @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
        </van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 是否加载数据
      finished: false, // 是否完成加载
      articles: []// 定义文章
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => index + this.articles.length + 1)
          this.articles.push(...arr)
          this.upLoading = false // 关闭状态
        } else {
          this.finished = true// 停止追加
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
