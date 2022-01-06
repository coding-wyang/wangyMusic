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
        <!--三个点-->
        <div class="line-icon">
          <i class="iconfont  icon-bofang"></i>
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
			Array: [],
			listArray:[],
			songList: [],
			artistList: [],
		}
	},
	created() {
		this.getSongList();
	},
	methods: {
		async getSongList(){
			const {data:res} = await songListGet();
			console.log(res);
			this.title = res.blocks[2].uiElement.subTitle 
			this.Array = [...res.blocks[2].creatives];
			console.log(this.Array);
			for (let value of this.Array) {
				this.Array= [...value.resources]
				for (let value of this.Array){
					console.log(value);
					let name = value.resourceExtInfo.song.name;
					let artists = value.resourceExtInfo.artists;
					this.artistList.push(artists);
					this.songList.push(name);
				}
			}
			console.log('this.songList:::', this.songList);
			console.log('this.artisitList::', this.artistList);
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
.line-song{
	width: 80%;
  height: 50px;
  overflow: hidden;
  font-size: 1em;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
	padding: 10px;
}
</style>