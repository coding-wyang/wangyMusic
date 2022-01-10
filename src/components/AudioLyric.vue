<template>
	<div class="lyric-box" >
		<ul class="lrc" v-show="lrc.length" :style="{top:lrcTop}">
			<li v-for="(item, index) in lrc" :key="index">
				{{ item[1] }}
			</li>
		</ul>
		<!-- 没有歌词的情况 -->
		<ul v-show="!lrc.length" style="margin-top:40%;">
			<span class="no-lrc">暂无歌词</span>
			</ul>
	</div>
</template>

<script>
import { lyricGet } from "../http/api.js"
import U from "../utils/index.js"

export default {
	name: 'audiolyric',
	data() {
		return {
      lrcTop: 200 + 'px', // 歌词滑动
			songId: '',
		}
	},
	computed: {
		lrc() {
			return this.$store.state.playing.songLyric ;
		},
		nowTime() {
			return this.$store.state.playing.nowTime ;
		}
	},
	created() { 
	this.songId = this.$store.state.playing.songId;
	this.getLyric();
	U.sessionSave(this.$store);
	},
	watch:{
		nowTime(){
			this.lrc.forEach((element,index) => {
				if (this.nowTime >=element[0]) {
					this.lrc.forEach((element,index) => {
						document.querySelectorAll('.lrc li')[index].style.color = 'rgba(165,165,165,0.7)'
					});
					if (index >= 0) {
              this.lrcTop = -index * 30 + 180 + 'px'
              document.querySelectorAll('.lrc li')[index].style.color = '#ffffff'
				}
			}})}
	},
	methods: {
	async getLyric(){
		const {lrc:res} = await lyricGet({id:this.songId});
		console.log(res);
		let lyc = this.parseLyric(res.lyric);
		this.$store.commit("setSongLyric", lyc)
	},
	/* 处理歌词 */
	parseLyric (text) {
      var lines = text.split('\n')
      var pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
      var result = []
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1)
      };
      lines[lines.length - 1].length === 0 && lines.pop()
      lines.forEach(function (item) {
        let time = item.match(pattern) // 存前面的时间段
        let value = item.replace(pattern, '') // 存歌词
        time.forEach(function (item1) {
          var t = item1.slice(1, -1).split(':')
          if (value !== '') {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
          }
        })
      })
      result.sort(function (a, b) {
        return a[0] - b[0]
      })
      return result
    },
},
}
</script>

<style scoped>
	.lyric-box{
		position: absolute;
		top: 80px;
		bottom: 130px;
		width: 100%;
		overflow: hidden;
		transition: all 1s;
	}
	.lyric-box >ul{
		position: absolute;
		width:100%;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		transition: all 0.5s;
		color:rgba(185,185,185,1);
	}
</style>