<template>
  <div class="container">
  <van-tabs swipeable v-model="activeIndex">
  <van-tab  :title="channel.name" v-for="channel in channels" :key="channel.id">
    <article-list @showaction="openMoreAction"  :channel_id="channel.id"></article-list>
  </van-tab>

</van-tabs>
<!-- 编辑频道的图标 -->
<span class="bar_btn" @click="showChannelEdit=true">
<van-icon name="wap-nav" />
</span>
<!-- 放置一个弹层 -->
<van-popup v-model="showMoreAction" :style="{width:'80%'}">
<more-action @dislike="dislikeOrReport($event,'dislike')" @report="dislikeOrReport($event,'report')"></more-action>
</van-popup>
<!-- 放置一个编辑频道的组件 -->
<van-action-sheet v-model="showChannelEdit" title="编辑频道" :round="false">

  <channel-edit @selectChannel="selectChannel" :channels="channels"></channel-edit>

</van-action-sheet>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/channels'
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import { disLikeArticle, reportArticle } from '@/api/article'
import eventBus from '@/utils/eventBus'
import ChannelEdit from './components/channel-edit'
export default {
  components: { ArticleList, MoreAction, ChannelEdit },
  name: 'home',
  data () {
    return {
      activeIndex: 0, // 默认启用第0个标签
      channels: [], // 声明频道的方法
      showMoreAction: false, // 控制弹层的显隐
      articleId: null, // 用来接收子组件传过来的id
      showChannelEdit: false// 控制编辑频道组件的显隐
    }
  },
  methods: {
    // 切换到对应的频道，关闭弹层
    selectChannel (id) {
      let index = this.channels.findIndex(item => item.id === id)// 获取切换频道的索引
      this.activeIndex = index// 将tabs激活标签切换到对应的标签下
      this.showChannelEdit = false// 关闭弹层
    },
    // 不喜欢的文章
    // async dislike () {
    //   try {
    //     if (this.articleId) {
    //       await disLikeArticle({
    //         target: this.articleId
    //       })
    //       this.$gnotify({ type: 'success', message: '操作成功' })
    //       // 触发一个事件，发出一个广播，听到广播的列表，去删除对应的数据
    //       eventBus.$emit('deArticles', this.articleId, this.channels[this.activeIndex].id)
    //       this.showMoreAction = false// 关闭弹层
    //     }
    //   } catch (error) {
    //     this.$gnotify({ type: 'danger', message: '操作失败' })
    //   }
    // },
    // // 调用举报文章的接口
    // async report (type) {
    //   try {
    //     await reportArticle({ target: this.articleId, type })
    //     this.$gnotify({ type: 'success', message: '操作成功' })
    //     // 触发一个事件，发出一个广播，听到广播的列表，去删除对应的数据
    //     eventBus.$emit('deArticles', this.articleId, this.channels[this.activeIndex].id)
    //     this.showMoreAction = false// 关闭弹层
    //   } catch (error) {
    //     this.$gnotify({ type: 'danger', message: '操作失败' })
    //   }
    // },
    // 不喜欢或者举报
    async dislikeOrReport (params, operateType) {
      try {
        operateType === 'dislike' ? await disLikeArticle({ target: this.articleId })
          : await reportArticle({ target: this.articleId, type: params })
        this.$gnotify({ type: 'success', message: '操作成功' })
        // 触发一个事件，发出一个广播，听到广播的列表，去删除对应的数据
        eventBus.$emit('deArticles', this.articleId, this.channels[this.activeIndex].id)
        this.showMoreAction = false// 关闭弹层
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '操作失败' })
      }
    },
    // 监听子组件触发的事件，打开弹层
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
    },
    async getMyChannels () {
      let data = await getMyChannels()
      this.channels = data.channels
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
