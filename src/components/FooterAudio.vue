<template>
	<div class="song-box" v-show="isShowAudio">
		<div class="song">
			<div class="song-img"></div>
			<div class="title" @click="reLoadingAudio">
			<p>{{songName}}</p>
			<p>-</p>
			<p>{{songArtist}}</p>
			</div>
			<div class="icon" @click='changePlay'>
				<i :class="playIcon"/>
				<div class="list">
			<i class="iconfont  icon-24gf-playlist2"/>
			</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	data() {
		return {
			playIcon: "iconfont  icon-zanting",
		}
	},
	computed:{
		songName() {
			return this.$store.state.playing.songName
		},
		songArtist() {
			return this.$store.state.playing.songArtist
		},
		isPlaying() { 
			return this.$store.state.playing.isPlaying
		},
		isShowAudio() {
			return this.$store.state.playing.isShowAudio
		}
	},
	watch:{
		isPlaying(val) {
			/* 控制图标 */
			if (val) {
					this.playIcon = "iconfont  icon-zanting";
			}else {
				this.playIcon = "iconfont  icon-bofang1";
			}
		}
	},
	methods: {
		changePlay() {
			/* 切换播放状态 */
			this.$store.commit("setIsPlaying", !this.isPlaying);
		},
		reLoadingAudio() {
			/* 点击进入audio */
			this.$router.push("audio")
			this.$store.commit("setIsShowFooter",false);
			this.$store.commit("setIsShowAudio",false);
			/* this.$parent.$parent.refs */
		}
	},
}
</script>

<style scoped>
.song-box{
	height: 50px;
	
}
.song{
	height: 50px;
  width: 100vw;
  padding: 5px 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  z-index: 1111;
}
.title{
	display: flex;
  align-items: baseline;
	width: 70%;
  color: rgb(37, 34, 34);
  font-size: 12px;
  margin-left: 4px;
  white-space: nowrap;
	overflow: hidden;
  text-overflow: ellipsis;
}
.title  >p:nth-child(1){
	font-size: 16px;
  color: rgb(24, 23, 23);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 4px;
}
.title  >p:nth-child(1){
	font-size: 15px;
}
.title  >p:nth-child(3){
	font-size: 10px;
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon{
	position: absolute;
	right: 10px;
	width: 25px;
  height: 25px;
}
.icon >i:nth-child(1){
	position: absolute;
	font-size: 1.8em;
  right: 45px;
}
.list >i{
	position: absolute;
	top: 8px;
  right: 13px;
}

</style>
