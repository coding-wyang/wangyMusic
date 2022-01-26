<template>
  <!-- 播放器header -->
  <div class="audio-header" @click="backToDiscovery">
    <!-- 返回 -->
    <div class="audio-back">
      <i class="iconfont icon-fanhui4" />
    </div>
    <!-- 歌曲title -->
    <div class="songInf">
      <p>{{ songName }}</p>
      <p>{{ songArtist }}</p>
    </div>
    <!-- 分享 -->
    <div class="songShare">
      <i class="iconfont icon-fenxiang" />
    </div>
  </div>
</template>

<script>
import U from '../utils/index';

export default {
  name: 'audio-header',
  emits: ['closeAudio'],
  data() {
    return {};
  },
  created() {
    // 会话存储
    U.sessionSave(this.$store);
  },
  computed: {
    songName() {
      return this.$store.state.playing.songName;
    },
    songArtist() {
      return this.$store.state.playing.songArtist;
    },
  },
  methods: {
    backToDiscovery() {
      this.$router.go(-1);
      /* this.$emit('closeAudio') */
      this.$store.commit('setIsShowAudio', true);
      this.$store.commit('setIsShowFooter', true);
    },
  },
};
</script>

<style scoped>
.audio-header {
  height: 60px;
  padding: 0 10px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}
.audio-back {
  position: absolute;
  top: 13px;
  left: 13px;
}
.audio-back > i {
  font-size: 25px;
}
.songInf {
  width: 80%;
  flex-grow: 1;
  text-align: center;
}
.songInf > p:nth-child(2) {
  font-size: 0.2em;
}
.songShare {
  position: absolute;
  top: 14px;
  right: 13px;
}
.songShare > i {
  font-size: 25px;
}
</style>
