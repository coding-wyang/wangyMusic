<template>
<div class="footer">
  <div class='progress'>
		<!-- 播放实时时间 -->
		<div class='now-time'>{{nowTime}}</div>
		<div class='progress-box'>
			<div ref="line" class='line'>
					<!-- 进度条 -->
					<div ref="curProgress" class="cur-progress" :style="{width: curLength+'%'}"></div>
					<!--滑块-->
					<div class="slider" :style="{left: curLength+'%'}"></div>
			</div>
		</div>
		<div class="final-time">{{ finalTime  }}</div>
	</div>
	<div class='audio-contain'>
		<!-- 音频播放控件 -->
		<audio ref = "audio"
		class="audio"
		@pause="onPause"
		@play="onPlay"
		controls="controls"
		@timeupdate="onTimeupdate" 
    @loadedmetadata="onLoadedmetadata"
		v-show="false"
		src=""></audio>
		<div class="method">
			<i class="iconfont  icon-24gl-repeatOnce2"/>
		</div>
		<div class="prev">
			<i class="iconfont  icon-047caozuo_shangyishou"/>
		</div>
		<div class="play-pause" @click="startPlayOrPause">
			<i :class="playIcon"/>
		</div>
		<div class="next">
			<i class="iconfont  icon-048caozuo_xiayishou"/>
		</div>
		<div class="more">
			<i class="iconfont  icon-24gf-playlist2"/>
		</div>
	</div>
	</div>
</template>

<script>
export default {
	name: 'playpause',
	data() {
		return {
			isPlaying: false,
			playIcon: 'iconfont  icon-bofang1',
			songId: '',
			// 音频当前播放时长
			currentTime: 0,
			// 音频两端时长
			nowTime: "0:00:00",
			finalTime: "0:00:00",
			/* 歌曲长度 */
			maxTime: 0,
			/* 进度条长度 */
			progressLength: 0,
			/* 进度条位置 */
			curLength: 0,
			}
	},
	computed:{
		songId() {
			return this.$store.state.playing.songId;
		}
	},
	watch: {
		isPlaying(val) {
			if (val) {
				this.playIcon = "iconfont  icon-zanting"
			} else {
				this.playIcon = 'iconfont  icon-bofang1'
			};
		},
		currentTime() {
			this.nowTime = this.formatSeconds(this.currentTime);
			this.finalTime = this.formatSeconds(this.maxTime);
			this.$store.commit("setNowTime",this.currentTime);
			this.curLength = (this.currentTime / this.maxTime) * 100;
		}
	},
	mounted() {
		const res = this.$store.state.playing.songId;
		this.songId = `https://music.163.com/song/media/outer/url?id=${res}.mp3`;
		this.$refs.audio.src = this.songId;
		/* 进度条长度 */
		this.progressLength = this.$refs.line.getBoundingClientRect().width;
		/* 最大时间 */
	},
	methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.isPlaying ? this.pause() : this.play()
			
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.isPlaying = true
    },
    // 当音频暂停
    onPause () {
      this.isPlaying = false
    },
		// 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.maxTime = parseInt(res.target.duration)
    },
		formatSeconds(time) {
			if (time !== undefined) {
			time = parseInt(time);
			let hours = Math.floor(time / 3600);
			time = time - hours * 3600;
			let minute = Math.floor(time / 60);
			time = time - minute * 60;
			
			return hours + ':' + ('0' + minute).slice(-2) + ':' + ('0' + time).slice(-2)
			} else {
				return '0:00:00'
				};
		}
  },
}
</script>

<style scoped>
.footer{
	position: fixed;
  padding-bottom: 10px;
  width: 100%;
  bottom: 0;
}
.progress{
	height: 30px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.now-time,
.final-time{
	width: 70px;
  text-align: center;
  font-size: 13px;
  color: #ffffff;
  top: -10px;
}
.progress-box {
  flex: 1;
}
.line{
	width: 100%;
  background: #ffffff;
  height: 2px;
}

.cur-progress {
	height: 100%;
  background: #746a6a;
}
.idot {
  width: 16px;
  height: 16px;
  position: relative;
  border-radius: 50%;
  background-color: #fff;
  top: -9px;
  vertical-align: middle;
}
.audio-contain{
  height: 80px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.audio-contain >div {
	width: 100%;
  margin: 0 5%;
}

.method > i{
	font-size: 1.7em;
}
.prev > i{
	font-size: 2em;
}
.play-pause > i{
	font-size: 3em;
}
.next > i{
	font-size: 2em;
}
.more > i{
	font-size: 1.5em;
}

</style>