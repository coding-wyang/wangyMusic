<template>
  <!-- 单曲列表 -->
  <div class="single-box">
    <div class="clearfix">
      <i class="iconfont = iconfont icon-bofang1" />
      <span>播放全部</span>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
    <div class="list-card" v-for="(item, index) in singleList.songs" :key="item.value">
      <div
        class="single"
        @click="toPlay(item.name, artistsList[index], item.id)"
      >
        <p>{{ item.name }}</p>
        <p>{{ artistsList[index] }} - {{ item.album.name }}</p>
        <!-- v-if来获取给钱是否存在mv资源 -->
        <div class="res-mv" v-if="item.album.status !== 0">
          <i class="iconfont icon-bofang" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchGet } from '../http/api';

export default {
  name: 'singleSong',
  data() {
    return {
      keyWord: '', // 搜索关键词
      singleList: [], // 单曲列表
      artistsList: [], // 歌手列表
    };
  },
  created() {
    this.keyWord = this.$store.getters.keyWord;
    this.getSingleSong();
  },
  methods: {
    /* 获取单曲信息 */
    async getSingleSong() {
      try {
        const res = await searchGet({
          keywords: this.keyWord,
          type: 1, // 类型为1 表示为单曲
        });
        this.singleList = res.result;
        this.formatArtist(this.singleList.songs);
      } catch (error) {
        alert(error);
      }
    },
    /* 拼接歌手字符 */
    formatArtist(value) {
      value.forEach((element) => {
        let sum = '';
        element.artists.forEach((element, flag) => {
          if (flag === 0) {
            sum = `${element.name}`;
          } else {
            sum = `${sum}/${element.name}`;
          }
        });
        this.artistsList.push(sum);
        sum = '';
      });
    },
    /* 播放 */
    toPlay(songName, songArtist, id) {
      this.$router.push('/audio');
      this.$store.commit('setSongName', songName);
      this.$store.commit('setSongArtist', songArtist);
      this.$store.commit('setSongId', id);
      this.$store.commit('setIsPlaying', true);
      this.$store.commit('setIsShowFooter', false);
      this.$store.commit('setIsShowAudio', false);
      this.$store.commit('setPlayingList', this.singleList.songs);
    },
  },
};
</script>

<style lang="scss" scoped>
.clearfix {
  position: relative;
  height: 35px;
  top: -5px;
  left: 10px;
  padding-block-end: 5px;
}
.clearfix > :nth-child(1) {
  position: relative;
  font-size: 1.25em;
}
.clearfix > :nth-child(2) {
  position: relative;
  left: 15px;
}
.single > :nth-child(1) {
  left: 10px;
}
.single > :nth-child(2) {
  left: 10px;
}
.res-mv {
  height: 0px;
}
.res-mv > i {
  left: 360px;
  top: -28px;
  font-size: 1.4em;
}
</style>
