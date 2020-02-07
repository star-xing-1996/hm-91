<template>
       <!-- 设置滚动条，为做阅读记忆留下伏笔 -->
    <div class="scroll-wrapper">
        <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
        <van-list v-model="upLoading" :finished="finished"  finished-text="没有更多了"
  @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
        </van-list>
        </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      downLoading: false, // 下拉是否加载数据
      refreshSuccessText: '更新成功', //  文本
      upLoading: false, // 上拉是否加载数据
      finished: false, // 上拉是否完成加载
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
    },
    onRefresh () {
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr)
        this.downLoading = false// 关闭状态
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
