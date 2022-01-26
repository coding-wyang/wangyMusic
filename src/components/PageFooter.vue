<template>
  <!-- 页面全局底部 -->
  <footer-audio></footer-audio>
  <div class="footer-box" v-show="isShowFooter">
    <div class="discovery">
      <i class="iconfont icon-discover" />
    </div>
    <div class="boke">
      <i class="iconfont icon-wifi" />
    </div>
    <div class="mine">
      <i class="iconfont icon-yinfu" />
    </div>
    <div class="follow">
      <i class="iconfont icon-renyuanguanli" />
    </div>
    <div class="cloud-village">
      <i class="iconfont icon-discover" />
    </div>
  </div>
</template>

<script>
import FooterAudio from './FooterAudio.vue';

export default {
  components: { FooterAudio },
  name: 'pageFooter',
  data() {
    return {};
  },
  computed: {
    /* 控制页面底部显示隐藏 */
    isShowFooter() {
      return this.$store.state.playing.isShowFooter;
    },
  },
};
</script>

<style scoped>
.footer-box {
  position: fixed;
  width: 100%;
  height: 60px;
  bottom: 0;
  z-index: 100px;
  display: flex;
  justify-content: center;
  background: #ffff;
  align-items: center;
}
.footer-box > div {
  width: 20%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #959595;
}
.footer-box > div > i {
  font-size: 1.5em;
}
</style>
