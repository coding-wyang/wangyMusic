<template>
  <!-- 操作dom过去音频控件 -->
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <audio
      ref="audio"
      class="audio"
      @pause="onPause"
      @play="onPlay"
      controls="controls"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      v-show="false"
      src=""
    ></audio>
    <!-- 页面底部播放盒子 -->
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageFooter from './components/PageFooter.vue';

export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      currentTime: 0,
      maxTime: 0,
    };
  },
  computed: {
    songUrl() {
      return this.$store.state.playing.songUrl;
    },
    isPlaying() {
      return this.$store.state.playing.isPlaying;
    },
  },
  components: {
    PageFooter,
  },
  watch: {
    songUrl() {
      this.$refs.audio.src = this.songUrl;
    },
    isPlaying(val) {
      /* this.$store.commit("setIsPlaying",val) */
      if (val === true) {
        this.play();
      } else {
        this.pause();
      }
    },
    currentTime(val) {
      /* 实时更新播放器进度 */
      this.$store.commit('setCurrentTime', val);
    },
    maxTime(val) {
      /* 歌曲长度 */
      this.$store.commit('setMaxTime', val);
      this.play();
    },
  },
  methods: {
    // 播放音频
    play() {
      console.log(this.$refs);
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.isPlaying = true;
    },
    // 当音频暂停
    onPause() {
      this.isPlaying = false;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.currentTime = res.target.currentTime;
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      /* 获取歌曲进度 */
      this.maxTime = parseInt(res.target.duration, 10);
    },
    reload() {
      /* 实现不跳转路由重新加载页面 */
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
