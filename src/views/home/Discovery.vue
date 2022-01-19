<template>
  <div class = "discovery">
		<discovery-header
		backgroundColor="#ffffff">
		</discovery-header>
		<discovery-recommend>
		</discovery-recommend>
		<hitsong-list>
		</hitsong-list>
	</div>
</template>

<script>
import DiscoveryHeader from "@/components/DiscoveryHeader.vue";
import HitsongList from "@/components/HitsongList.vue";
import DiscoveryRecommend from "@/components/DiscoveryRecommend.vue";


export default {
	name:'Discovery',
	components:{
		DiscoveryHeader,
		HitsongList,
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