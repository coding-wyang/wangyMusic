<template>
	<div class="audio" v-show="isShowAudio">
		<!-- 播放器头 -->
		<audio-header @closeAudio="closeAudio"></audio-header>
		<!-- 歌词界面 -->
		<audio-lyric ></audio-lyric>
		<!-- 暂停播放 -->
		<play-pause ></play-pause>
	</div>
</template>


<script>
import AudioHeader from '../../components/AudioHeader.vue'
import AudioLyric from '../../components/AudioLyric.vue'
import PlayPause from '../../components/PlayPause.vue'

export default {
	name:"audio",
  components: { AudioHeader, PlayPause, AudioLyric },
	data() {
		return {
			isShowAudio: true,
		}
	},
	created() {
	},
	methods:{
}}
</script>

<style scoped>
.audio{
	position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
}
</style>