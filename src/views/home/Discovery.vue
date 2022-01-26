<template>
<!-- 发现页 -->
  <div class = "discovery">
		<!-- 发现页头部 -->
		<discovery-header
		backgroundColor="#ffffff"
		@show-drawer="showDrawer"
		>
		</discovery-header>
		<!-- 发现页推荐 -->
		<discovery-recommend>
		</discovery-recommend>
		<!-- 热歌推荐 -->
		<hitsong-list>
		</hitsong-list>
		<!-- 抽屉 -->
		<el-drawer
    v-model="isPerDrawer"
    title="个人中心"
    direction="ltr"
    :before-close="handleClose"
		size ="width: 80%;"
  >
	<!-- 消息中心 -->
	<div class="dis-card">
		<el-card>
			<div class="to-center">
				<ul>
				<li>消息中心</li>
				<el-divider></el-divider>
				<li>云贝中心</li>
				<el-divider></el-divider>
				<li>创作者中心</li>
				</ul>
			</div>
		</el-card>
	</div>
		<!-- 其他 -->
		<el-card>
			<div class="to-center">
				<ul>
					<h5>其他</h5>
					<el-divider></el-divider>
					<li>设置</li>
					<li>夜间模式</li>
					<li>定时关闭</li>
				</ul>
			</div>
		</el-card>
  </el-drawer>
	</div>
</template>

<script>
import DiscoveryHeader from "@/components/DiscoveryHeader.vue";
import HitsongList from "@/components/HitsongList.vue";
import DiscoveryRecommend from "@/components/DiscoveryRecommend.vue";


export default {
	name: 'Discovery',
	components: {
		DiscoveryHeader,
		HitsongList,
		DiscoveryRecommend
	},
	data() {
		return {
			isPerDrawer: false,
		}
	},
	methods: {
		showDrawer() {
			this.isPerDrawer = true;
		}
	},
}
</script>

<style lang="scss">
.discovery{
	height: 1000px;
}
.el-drawer.ltr {
	width: 80%;
}
.dis-card .el-card{
	margin-block-end: 20px;
}
.dis-card .el-card__body {
	padding: 7px;
}
.to-center >ul>li{
	list-style: none;
	padding-block: 11px;
	padding-inline-start: 10px;
}
.to-center >ul .el-divider{
	margin: 0;
}
.to-center >ul>h5{
	font-size: 12px;
	color: rgb(124, 121, 121);
	padding-block-end: 5px;
}

</style>