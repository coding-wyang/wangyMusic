<template>
  <div class = "discovery">
		<discovery-header
		backgroundColor="#ffffff">
		</discovery-header>
		<discovery-recommend>
		</discovery-recommend>
		<song-list>
		</song-list>
	</div>
</template>

<script>
import DiscoveryHeader from "@/components/DiscoveryHeader.vue";
import SongList from "@/components/SongList.vue";
import DiscoveryRecommend from "@/components/DiscoveryRecommend.vue";


export default {
	name:'Discovery',
	components:{
		DiscoveryHeader,
		SongList,
		DiscoveryRecommend
	},
	data() {
		return {
		}
	},
}
</script>

<style lang="scss" scoped>
.discovery{
	height: 1000px;
}

</style>