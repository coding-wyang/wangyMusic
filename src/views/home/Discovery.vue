<template>
  <div class = "discovery">
		<discovery-header
		backgroundColor="#ffffff">
		</discovery-header>
		<song-list>
		</song-list>
	</div>
</template>

<script>
import DiscoveryHeader from "@/components/DiscoveryHeader.vue";
import SongList from "@/components/SongList.vue";


export default {
	name:'Discovery',
	components:{
		DiscoveryHeader,
		SongList,
	},
	data() {
		return {
		}
	},
}
</script>