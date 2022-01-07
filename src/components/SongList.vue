<template>
<div class="song-box">
	<div
        class="song-item"
        v-for="(item,index) in songList"
        :key="index"
      >
        <!--歌曲-->
        <div class="line-song">
          <span>{{item}}</span>
        </div>
				<!-- 歌手 -->
				<div class="line-artists">
					<span>{{artistsList[index]}}</span>
				</div>
        <!--三个点-->
        <div class="line-icon">
          <i class="iconfont  icon-bofang"/>
        </div>
    </div>
</div>
</template>

<script>
import { songListGet } from "@/http/api.js";
import U from "utils";

export default {
	data() {
		return {
			title: "",
			saveArray: [],
			listArray:[],
			songList: [],
			saveArtist: [],
			artistsList: [],
		}
	},
	created() {
		this.getSongList();
	},
	methods: {
		/* 获取精选歌曲数据 */
		async getSongList(){
			const {data:res} = await songListGet();
			this.title = res.blocks[2].uiElement.subTitle 
			this.saveArray = [...res.blocks[2].creatives];
			this.saveArray.forEach(element => {
				this.saveArray = [...element.resources]
				for (let value of this.saveArray){
					let name = value.resourceExtInfo.song.name;
					let artists = value.resourceExtInfo.artists;
					this.saveArtist.push(artists);
					this.songList.push(name);
				}
			});
			/* 拼接多个歌手情况下的字符 */
			this.saveArtist.forEach((element) => {
				this.saveArray = element;
				var sum ='';
				element.forEach((element,flag) => {
					if ( flag === 0) {
						sum = `${element.name}`
					} else {
						sum = `${sum}/${element.name}`
					}
				})
				this.artistsList.push(sum);
				sum='';
			})
	},
}}
</script>

<style scoped>
.song-box {
  width: 100%;
  position: relative;
}
.song-item {
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e4e5;
}

.line-icon{
	width: 50px;
  height: 50px;
  text-align: center;
  color: #a1a2a2;
  line-height: 60px;
}
.line-icon >i{
	font-size: 1.5em;
}
.line-artists{
	width: 30%;
	font-family: sans-serif;
	display: flex;
  flex-direction: column;
	justify-content: center;
	padding-left: 20px;
  display: flex;
	font-size: 0.5em;
	word-break:keep-all;
	white-space:nowrap;/* 让文字再一行显示 */
}
.line-song{

	width: 80%;
  height: 50px;
  overflow: hidden;/* 多余隐藏 */
	font-size: 0.8em;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
	padding: 10px;
}
</style>