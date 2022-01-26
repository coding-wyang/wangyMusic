<template>
  <!-- 歌词列表 -->
  <div class="lyric-box">
    <!-- 动态歌词显示 -->
    <ul class="lrc" v-show="lrc.length" :style="{ top: lrcTop }">
      <li v-for="(item, index) in lrc" :key="index">
        {{ item[1] }}
      </li>
    </ul>
    <!-- 没有歌词的情况 -->
    <ul v-show="!lrc.length" style="margin-top: 40%">
      <span class="no-lrc">暂无歌词</span>
    </ul>
  </div>
</template>

<script>
import { lyricGet } from '../http/api';
import U from '../utils/index';

export default {
  name: 'audioLyric',
  data() {
    return {
      lrcTop: `${200}px`, // 歌词滑动
      songId: '',
    };
  },
  computed: {
    lrc() {
      return this.$store.state.playing.songLyric; // 歌词
    },
    nowTime() {
      return this.$store.state.playing.nowTime;
    },
  },
  created() {
    this.songId = this.$store.state.playing.songId;
    this.getLyric();
    U.sessionSave(this.$store);
  },
  watch: {
    // 监听音乐播放进度 控制歌词播放速度 滚动效果
    nowTime() {
      this.lrc.forEach((element, index) => {
        if (this.nowTime >= element[0]) {
          this.lrc.forEach((element, flag) => {
            // 查询所有选择器
            document.querySelectorAll('.lrc li')[flag].style.color = 'rgba(165,165,165,0.7)';
          });
          if (index >= 0) {
            /* 歌词滚动 */
            this.lrcTop = `${-index * 30 + 180}px`;
            /* 正在播放的歌词高亮显示 */
            document.querySelectorAll('.lrc li')[index].style.color = '#ffffff';
          }
        }
      });
    },
  },
  methods: {
    async getLyric() {
      /* 获取歌词 */
      const { lrc: res } = await lyricGet({ id: this.songId });
      const lyc = this.parseLyric(res.lyric);
      this.$store.commit('setSongLyric', lyc);
    },
    /* 处理歌词 */
    parseLyric(text) {
      let lines = text.split('\n');
      const pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
      const result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }
      lines[lines.length - 1].length === 0 && lines.pop();
      lines.forEach((item) => {
        const time = item.match(pattern); // 存前面的时间段
        const value = item.replace(pattern, ''); // 存歌词
        time.forEach((item1) => {
          const t = item1.slice(1, -1).split(':');
          if (value !== '') {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        });
      });
      result.sort((a, b) => a[0] - b[0]);
      return result;
    },
  },
};
</script>

<style scoped>
.lyric-box {
  position: absolute;
  top: 80px;
  bottom: 130px;
  width: 100%;
  overflow: hidden;
  transition: all 1s;
}
.lyric-box > ul {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  transition: all 0.5s;
  color: rgba(185, 185, 185, 1);
}
</style>
