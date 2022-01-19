<template>
<!-- 搜索结果 综合 -->
	<div class = 'songlist-box'>
		<!-- 头部 -->
		<div class = 'header-box'>
			<div class ='back-box' @click ='$router.go(-1)'>
				<i class="iconfont icon-fanhui4"/>
			</div>
			<input type="text" v-model="keyWord" @click="$router.push('/search')">
			<i class= "iconfont icon-sousuo"/>
		</div>
		<!-- 头部标签 -->
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick" stretch="true">
				<el-tab-pane label="综合" name="first">
						<el-card>
				<div slot="header" class="clearfix">
					<span>单曲</span>
					<el-divider></el-divider>
					</div>
				<div class = "list-card" v-for="(item, index) in songList.songs">
					<div class = "single" @click ="toPlay(item.name,artistsList[index],item.id)">
						<p>{{ item.name }}</p>
						<p>{{ artistsList[index] }} - {{item.al.name}}</p>
						<div class='res-mv' v-if="item.cp">
							<i class="iconfont  icon-bofang"/>
						</div>
					</div>
				</div>
				<div class="more-single" @click="toSingle">
					<p>{{moreText}}></p>
				</div>
			</el-card>
				</el-tab-pane>
				<el-tab-pane label="单曲" name="second">
					<single-song>
					</single-song>
				</el-tab-pane>
				<el-tab-pane label="歌单" name="third"></el-tab-pane>
				<el-tab-pane label="视频" name="fourth"></el-tab-pane>
					<el-tab-pane label="歌手" name="fifth"></el-tab-pane>
				<el-tab-pane label="播客" name="sixth"></el-tab-pane>
				<el-tab-pane label="歌词" name="seventh"></el-tab-pane>
				<el-tab-pane label="专辑" name="eighth"></el-tab-pane>
					<el-tab-pane label="声音" name="ninth"></el-tab-pane>
				<el-tab-pane label="云圈" name="tenth"></el-tab-pane>
				<el-tab-pane label="用户" name="eleventh"></el-tab-pane>
				</el-tabs>
		</div>
		<!-- 单曲卡片 -->
	</div>
</template>

<script>
import SingleSong from '../../components/SingleSong.vue';
export default {
	name: 'songlist',
	components:{
		SingleSong,
	},
	data() {
		return {
			songList: [],
			keyWord: '',
			artistsList: [],
			moreText:'',
			activeName: 'first'
		}
	},
	created() {
		this.songList = this.$store.getters.songList;
		this.keyWord = this.$store.getters.keyWord;
		this.formatArtist(this.songList.songs)
		this.moreText = this.songList.moreText;
		if (this.activeName !== 'first') {
			this.activeName = JSON.parse(sessionStorage.getItem('activeName'));
		}
	},
	methods: {
		/* 拼接歌手字符 */
		formatArtist(value) {
			value.forEach((element) => {
				var sum = '';
				element.ar.forEach((element,flag) => {
					if ( flag === 0) {
						sum = `${element.name}`
					} else {
						sum = `${sum}/${element.name}`
					}
				})
				this.artistsList.push(sum)
				sum='';
			})
		},
		/* onTouch(e) {
			console.log(e);
			console.log(this.$refs);
			if (e === 'left') {
				this.$refs.tabs.next();
			}else if (e === "right") {
				this.$refs.tabs.prev();
			}
		}, */
		toPlay(songName, songArtist, id) {
				this.$router.push('/audio');
				this.$store.commit("setSongName", songName);
				this.$store.commit("setSongArtist", songArtist);
				this.$store.commit("setSongId", id);
				this.$store.commit("setIsPlaying", true);
				this.$store.commit("setIsShowFooter",false);
				this.$store.commit("setIsShowAudio",false);
				this.$store.commit("setPlayingList",this.songList.songs)
			},
		handleClick(tab, event) {
        /* console.log(tab, event); */
      },
			/* 跳转至单曲table */
		toSingle() {
			this.activeName = 'second';
			sessionStorage.setItem('activeName', JSON.stringify(this.activeName));
		}
	},
}
</script>

<style lang="scss">
.header-box >input{
	height: 36px;
  width: 90%;
  border-radius: 25px;
  border: 0;
  background-color:rgba(225, 225, 225,0.4);
  text-indent: 37px;
	align-items: center;
	display: block;
	margin: 9px 35px;
	outline-color: white;
}
.back-box >:nth-child(1){
	position: absolute;
	top: 16px;
	left: 5px;
	font-size: 22px;
}
.header-box >:nth-child(3){
	position: absolute;
	top: 19px;
	left: 45px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.el-card{
	width: 91%;
	margin: 0 auto;

}
.el-card__body{
	
	box-shadow: 0 4px 8px 0 rgba(107, 107, 107, 0.2), 0 6px 20px 0 rgba(117, 117, 117, 0.19);
}
.clearfix >span{
	margin: 5px;
	font-size: 22px;
	font-weight: 700;
}

.single {
	position: relative;
  margin-bottom: 5px;
	padding-block-end: 10px;
	border-bottom: 1px solid #ccc;
}
.el-divider {
	margin: 5px;
}
.single >:nth-child(1){
	position: relative;
	width: 85%;
	top: 3px;
	font-size: 15px;
	color: rgb(10, 84, 196);
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.single >:nth-child(2){
	position: relative;
	width: 80%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	top: 5px;
	font-size: 13px;
}
.res-mv{
	height: 0px;
}
.res-mv >i {
	position: relative;
	left: 290px;
	top: -28px;
	font-size: 1.4em;
}
/* 单曲卡片更多 */
.more-single >p{
	position: relative;
	text-align: center;
	top: 8px;
	font-size: 13px;
	color: rgb(104, 100, 100);
}

.el-tabs__item.is-active{
	color: #000000;
	font-weight: 550;
}
.el-tabs__item:hover{
	color: #000000;
	font-weight: 550;
}
.el-tabs__active-bar{
	height: 5px;
	bottom: 11px;
	opacity: 0.7;
	border-radius: 3px;
	background-color: rgb(218, 1, 1);
}
.el-tabs__nav-wrap::after{
	background-color: white;
}
.el-tabs__nav{
	height:90%;overflow-y:auto;overflow-x:hidden;
}

</style>
