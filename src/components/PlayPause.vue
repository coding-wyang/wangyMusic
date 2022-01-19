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
		<div class="method">
			<i class="iconfont  icon-24gl-repeatOnce2"/>
		</div>
		<div class="prev" @click="toPrev()">
			<i class="iconfont  icon-047caozuo_shangyishou"/>
		</div>
		<div class="play-pause" @click="startPlayPause">
			<i :class="playIcon"/>
		</div>
		<div class="next" @click="toNext()">
			<i class="iconfont  icon-048caozuo_xiayishou"/>
		</div>
		<div class="more">
			<i class="iconfont  icon-24gf-playlist2"/>
		</div>
	</div>
	</div>
</template>

<script>
import U from '../utils/index.js'
export default {
	name: 'playpause',
	inject: ['reload'],
	data() {
		return {
			playIcon: 'iconfont  icon-zanting',
			songUrl: '',
			// 音频两端时长
			nowTime: "0:00:00",
			finalTime: "0:00:00",
			/* 进度条长度 */
			progressLength: 0,
			/* 进度条位置 */
			curLength: 0,
			isPlaying: true,
			timeSave: 0,
			/* maxTime: 0, */
			}
	},
	computed:{
		maxTime() {
			return  this.$store.state.playing.maxTime
		},
		currentTime() {
				return this.$store.state.playing.currentTime
		},
		playingList() {
			return this.$store.state.playing.playingList
		},
		songId() {
			return this.$store.state.playing.songId
		},
	},
	watch: {
		isPlaying(val) {
			/* 控制播放暂停icon切换 */
			if (val) {
				this.playIcon = "iconfont  icon-zanting";
			} else {
				this.playIcon = 'iconfont  icon-bofang1'
			};
		},
		currentTime: {
			/* 监测播放器进度 */
			deep:true,
			handler(val) {
			this.nowTime = this.formatSeconds(this.currentTime);
			this.finalTime = this.formatSeconds(this.maxTime);
			this.$store.commit("setNowTime",this.currentTime);
			this.curLength = (this.currentTime / this.maxTime) * 100;
			}
		},
		maxTime(val) {
			this.finalTime = this.formatSeconds(val);
		},
	},
	mounted() {
		/* 拼接mp3链接进度 */
		const res = this.$store.state.playing.songId;
		this.songUrl = `https://music.163.com/song/media/outer/url?id=${res}.mp3`;
		this.$store.commit("setSongUrl", this.songUrl)
		/* 进度条长度 */
		this.progressLength = this.$refs.line.getBoundingClientRect().width;
		this.updateStuff();
		U.sessionSave(this.$store);
	},

	methods: {
    // 控制音频的播放与暂停
    startPlayPause() {
			this.isPlaying =!this.isPlaying;
			this.$store.commit("setIsPlaying",this.isPlaying);
    },
		/* 下一首 */
		toNext() {
			const i = this.playingList.findIndex((value) =>value.id === this.songId) + 1;
			if (i<=this.playingList.length) {
				const nextValue = this.playingList.find((value,index)=>{
				return index === i;
			});
			console.log(nextValue);
			let saveArr = U.formatArtist([nextValue]);
			this.toPlay(nextValue.name, saveArr[0], nextValue.id)
			}
		},
		/* 上一首 */
		toPrev() {
			const i = this.playingList.findIndex((value) =>value.id === this.songId) - 1;
			if (i >= 0) {
				const prevValue = this.playingList.find((value,index)=>{
				return index === i;
			});
			let saveArr = U.formatArtist([prevValue]);
			this.toPlay(prevValue.name, saveArr[0], prevValue.id)
			}
		},
		/* 将时间解析为时分秒 */
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
		},
		/* 二次进入页面更新 */
		updateStuff() {
			this.isPlaying = this.$store.getters.isPlaying;
			this.timeSave = this.$store.getters.currentTime;
			this.$store.commit("setCurrentTime",0);
			this.$store.commit("setCurrentTime",this.timeSave);
		},
		toPlay(songName,songArtist,id) {
			this.$store.commit("setSongName", songName);
			this.$store.commit("setSongArtist", songArtist);
			this.$store.commit("setSongId", id);
			this.$store.commit("setIsPlaying", true);
			/* this.$router.go(0); */
			this.reload();
			console.log(() =>{this.reload()});
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