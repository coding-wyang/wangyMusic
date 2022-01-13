<template>
	<div class="banner-box" v-touch="onTouch">
			<el-carousel  height="150px" ref='carousel'>
      <el-carousel-item v-for="(item,index) in banners" :key="item">
        <h3 class="small" @click="toAd(item.url)">
					<img :src="item.pic" style="width:100%;">
				</h3>
      </el-carousel-item>
    </el-carousel>
	</div>
</template>

<script>
import {discoveryInfoGet} from '../http/api.js'

export default {
	name:"recommend",
	data() {
		return {
			banners:[],
		}
	},
	created() {
		this.getRecommend();
	},
	methods: {
		async getRecommend(){
			const {data:res} = await discoveryInfoGet();
			this.banners = [...res.blocks[0].extInfo.banners];
		},
		toAd(adUrl) {
			window.location.href = adUrl;
		},
		onTouch(e) {
			if (e === 'left') {
				this.$refs.carousel.next();
			}else if (e === "right") {
				this.$refs.carousel.prev();
			}
		}
	},
}
</script>

<style lang="scss">
.banner-box{
	padding-block: 8px;
	padding-inline: 14px;
	margin: 0;
}
.el-carousel{
	border-radius: 8px;
}
.el-carousel__indicators--horizontal{
	height: 25px;
	overflow: hidden;
	padding: 0;
	margin: 0;
}
.el-carousel__button{
	width: 9px;
}
</style>