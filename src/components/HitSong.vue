<template>
	<div class= "hitsong-box" v-for="(item, i) in sonArray[index]"
	@click="toPlay(item.uiElement.mainTitle.title, artistsList[index][i], item.resourceId)"
	>
		<!-- 图片 -->
		<div class= "hit-img">
			<img :src="item.uiElement.image.imageUrl" >
		</div>
		<!--歌曲-->
		<div :class=[nullTitle] v-if="!item.uiElement.subTitle?.title">
			<span>{{item.uiElement.mainTitle.title}} </span>
			<span> - {{artistsList[index][i]}}</span>
		</div>
		<div :class=[hitTitle] v-if="item.uiElement.subTitle?.title">
			<span>{{item.uiElement.mainTitle.title}} </span>
			<span> - {{artistsList[index][i]}}</span>
		</div>
		<div class='sub-title'>
			<span>{{item.uiElement.subTitle?.title.trim()}}</span>
			</div>
		<!--mv-->
		<div class='hit-mv' v-if="item.resourceExtInfo.song.videoInfo.video !== null">
			<i class="iconfont  icon-bofang"/>
		</div>
	</div>
</template>

<script>
import LoginDialogVue from './LoginDialog.vue';


export default {
	name: 'hitsong',
	props: {
		songList: '',
		index: Number,
	},
	data() {
		return {
			sonArray: [],
			saveArray: [],
			playingList: [],
			artistsList: [],
			count: 0,
			hitTitle: "hit-title",
			nullTitle: "null-title"
		}
	},
	computed:{
		songListSave() {
			return this.songList;
		},
	},
	watch:{
		songListSave(val) {
			console.log(val);
			val.forEach(element => {
				this.sonArray.push(element.resources)
				this.formatArtist(element.resources)
				element.resources.forEach((element) => {
					this.playingList.push({
						name: element.resourceExtInfo.song.name,
						artists: element.resourceExtInfo.artists,
						id: element.resourceId
					})
				})
			});
		},
	},
	methods: {
		/* 拼接多个歌手情况下的字符 */
		formatArtist(value) {
			value.forEach((element) => {
				var sum = '';
				element.resourceExtInfo.artists.forEach((element,flag) => {
					if ( flag === 0) {
						sum = `${element.name}`
					} else {
						sum = `${sum}/${element.name}`
					}
				})
				this.saveArray.push(sum);
				this.count++;
				if (this.count === 3 ) {
					this.artistsList.push([...this.saveArray])
					this.saveArray.splice(0,3)
					this.count = 0;
				}
				sum='';
			})
		},
		toPlay(songName, songArtist, id) {
				this.$router.push('audio');
				this.$store.commit("setSongName", songName);
				this.$store.commit("setSongArtist", songArtist);
				this.$store.commit("setSongId", id);
				this.$store.commit("setIsPlaying", true);
				this.$store.commit("setIsShowFooter",false);
				this.$store.commit("setIsShowAudio",false);
				this.$store.commit("setPlayingList",this.playingList)
			}
	},
}
</script>

<style lang="scss" scoped>
.hitsong-box{
	position: relative;
	top: 20px;
	height: 50px;
  width: 100%;
	padding-block: 7px;
	border-bottom: 1px solid #d1d1d1;

}
.hit-title{
	position: relative;
	left: 65px;
	top: -55px;
	width: 250px;
  overflow: hidden;/* 多余隐藏 */
	font-size: 0.8em;
  white-space: nowrap;
}
.hit-title >:nth-child(1){
	white-space: nowrap;
	font-size: 16px;
	width: 150px;
}
.hit-title >:nth-child(2){
	position: relative;
	font-size: 0.5em;
	width: 150px;
	color:rgb(90, 88, 88);
}
.null-title{
	position: relative;
	left: 65px;
	top: -40px;
	width: 250px;
  overflow: hidden;/* 多余隐藏 */
	font-size: 0.8em;
  white-space: nowrap;
}
.null-title >:nth-child(1){
	white-space: nowrap;
	font-size: 16px;
	width: 150px;
}
.null-title >:nth-child(2){
	position: relative;
	font-size: 0.5em;
	width: 150px;
	color:rgb(90, 88, 88);
}
.sub-title{
	position: relative;
	left: 65px;
	top: -45px;
	width: 280px;
  overflow: hidden;/* 多余隐藏 */
	text-overflow: ellipsis;
	font-size: 0.8em;
  white-space: nowrap;
}
.sub-title >span{
color:rgb(90, 88, 88);
}

.hit-img{
	padding-inline-start: 10px;
	width: 60px;
}
.hit-img >img{
	width: 50px;
	border-radius: 5px;
}

.hit-mv{
	width: 50px;
  height: 50px;
  color: #a1a2a2;

}
.hit-mv >i{
	position: absolute;
	top: 20px;
	right: 10px;
	font-size: 1.5em;
}
</style>