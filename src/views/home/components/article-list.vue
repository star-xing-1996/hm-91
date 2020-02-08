<template>
       <!-- 设置滚动条，为做阅读记忆留下伏笔 -->
    <div class="scroll-wrapper">
        <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
        <van-list v-model="upLoading" :finished="finished"  finished-text="没有更多了"
  @load="onLoad">
        <van-cell v-for="article in articles" :key="article.art_id.toString()" >
            <div class="article_item">
  <h3 class="van-ellipsis">{{article.title}}</h3>
  <!-- 三图模式 -->
  <div class="img_box" v-if="article.cover.type === 3">
     <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[0]"/>
     <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[1]"/>
     <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[2]"/>
  </div>
  <!-- 单图模式 -->
   <div class="img_box" v-else-if="article.cover.type === 1">
      <van-image lazy-load class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
  </div>
  <div class="info_box">
     <span>{{article.aut_name}}</span>
     <span>{{ article.comm_count }}评论</span>
     <span>{{ article.pubdate | relTime}}</span>
     <span class="close" v-if="user.token" @click="$emit('showaction',article.art_id.toString())">
       <van-icon name="cross"></van-icon>
       </span>
  </div>
</div>
        </van-cell>
        </van-list>
        </van-pull-refresh>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles } from '@/api/article'
export default {
  name: 'article-list',
  data () {
    return {
      downLoading: false, // 下拉是否加载数据
      refreshSuccessText: '更新成功', //  文本
      upLoading: false, // 上拉是否加载数据
      finished: false, // 上拉是否完成加载
      articles: [], // 定义文章
      timestamp: null// 定义一个时间戳，这个时间戳用来告诉服务器，
    }
  },
  // 父传子接收数据
  props: {
    channel_id: {
      type: Number, // 指定要传的props的类型
      required: true, // 要求必须传
      default: null// 给props一个默认值
    }
  },
  // 将user的数据映射到子组件中来
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onLoad () {
      await this.$sleep()
      // setTimeout(() => {
      //   if (this.articles.length < 50) {
      //     let arr = Array.from(Array(10), (value, index) => index + this.articles.length + 1)
      //     this.articles.push(...arr)
      //     this.upLoading = false // 关闭状态
      //   } else {
      //     this.finished = true// 停止追加
      //   }
      // }, 1000)
      let data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      this.articles.push(...data.results)
      // 关掉加载的状态
      this.upLoading = false
      // 判断是否有历史时间戳，如果有，可以继续往下看，否则就不看
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        // 否则认为没有历史，就不继续加载了
        this.finished = true// 停止追加
      }
    },
    async onRefresh () {
      await this.$sleep()
      // setTimeout(() => {
      //   let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
      //   this.articles.unshift(...arr)
      //   this.downLoading = false// 关闭状态
      //   this.refreshSuccessText = `更新了${arr.length}条数据`
      // }, 1000)
      let data = await getArticles({ channel_id: this.channel_id, timestamp: Date.now() })
      this.downLoading = false // 关掉下拉状态
      if (data.results.length) {
        this.articles = data.results // 将历史数据全部覆盖掉
        // 如果还需要继续往下拉，把原来的状态打开
        this.finished = true
        // 获取此次事件的时间戳
        this.timestamp = data.pre_timestamp
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        // 如果没有数据更新，什么都不需要变化
        this.refreshSuccessText = '已是最新数据'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
