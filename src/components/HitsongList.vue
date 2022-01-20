<template>
<div class="song-box" v-touch="onTouch">
	<div class="songlist-title">
		{{title}}
	</div>
	<!-- <div
        class="song-item"
        v-for="(item,index) in songList"
        :key="index"
				@click="toPlay(item,artistsList[index],idList[index])"
      > -->
        <!--歌曲-->
        <!-- <div class="line-song">
          <span>{{item}}</span>
        </div> -->
				<!-- 歌手 -->
				<!-- <div class="line-artists">
					<span>{{artistsList[index]}}</span>
				</div> -->
        <!--三个点-->
        <!-- <div class="line-icon">
          <i class="iconfont  icon-bofang"/>
        </div>
    </div> -->
		<el-carousel height="213px" indicator-position="none" :autoplay=false ref="hitCarousel">
      <el-carousel-item v-for="(item,index) in 4" :key="item.index" >
				<hit-song :song-list="songPass" :index="index" @change ="(( index )=>{ change(index) })"></hit-song>
      </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
import { discoveryInfoGet } from "@/http/api.js";
import HitSong from '../components/HitSong.vue'

export default {
	comments:{
		HitSong,
	},
	data() {
		return {
			title: "",
			songPass: [],//传递给子组件
			idList: [],
			
		}
	},
	created() {
		this.getSongList();
	},
	methods: {
		/* 获取精选歌曲数据 */
		async getSongList(){
			const {data:res} = await discoveryInfoGet();
			this.title = res.blocks[2].uiElement.subTitle.title 
			this.songPass = [...res.blocks[2].creatives];
				},
			onTouch(e) {
				if (e === 'left') {
				this.$refs.hitCarousel.next();
			}else if (e === "right") {
				this.$refs.hitCarousel.prev();
			}
			}
	},
}
</script>

<style scoped>
.song-box{
	position: relative;
	top: -5px;
	height:  235px;
	padding-block-end: 0px;
	border-bottom: 6px solid rgb(223, 223, 223);
	overflow: hidden;

}
.songlist-title{
	position: relative;
	height: 15px;
	left: 10px;
	top: 13px;
	font-weight: 700;
	padding: 0;

}

</style>