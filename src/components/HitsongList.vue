<template>
  <!-- 热歌轮播 -->
  <div class="song-box" v-touch="onTouch">
    <!-- 主题 -->
    <div class="songlist-title">
      {{ title }}
    </div>
    <!-- 轮播图 -->
    <el-carousel height="213px" indicator-position="none" :autoplay="false" ref="hitCarousel">
      <el-carousel-item v-for="(item, index) in 4" :key="item.index">
        <hit-song
          :song-list="songPass"
          :index="index"
          @change="(index) => {change(index);}"
        ></hit-song>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { discoveryInfoGet } from '../http/api';
import HitSong from './HitSong.vue';

export default {
  comments: {
    HitSong, // 每个分页轮播的歌曲列表
  },
  data() {
    return {
      title: '', // 文章介绍
      songPass: [], // 传递给子组件
      idList: [], // id名单
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    /* 获取精选歌曲数据 */
    async getSongList() {
      const { data: res } = await discoveryInfoGet();
      this.title = res.blocks[2].uiElement.subTitle.title;
      this.songPass = [...res.blocks[2].creatives];
    },
    /* 触碰页面滑动 */
    onTouch(e) {
      if (e === 'left') {
        this.$refs.hitCarousel.next();
      } else if (e === 'right') {
        this.$refs.hitCarousel.prev();
      }
    },
  },
};
</script>

<style scoped>
.song-box {
  position: relative;
  top: -5px;
  height: 235px;
  padding-block-end: 0px;
  border-bottom: 6px solid rgb(223, 223, 223);
  overflow: hidden;
}
.songlist-title {
  position: relative;
  height: 15px;
  left: 10px;
  top: 13px;
  font-weight: 700;
  padding: 0;
}
</style>
