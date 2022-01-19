<template>
	<div class='discovery-header'>
		<div class='drawer'>
			<i class="iconfont  icon-gerenxinxi"/>
		</div>
		<div class="search" >
      <input type="text" :placeholder="placeholder" @click="toSearch"/>
      <div class="head-search">
				<i class="iconfont  icon-sousuo"/>
      </div>
    </div>
		<div class="listen-to-know">
			<i class="iconfont  icon-tinggeshiqu"/>
		</div>
	</div>
</template>

<script>

import { searchDefaultGet } from '../http/api.js';
export default {
	name:'discovery-header',
	data() {
		return {
			placeholder: '搜索音乐、歌手',
		}
	},
	created() {
		this.getDefaultKeyword();
	},
	methods: {
		async getDefaultKeyword() {
			const {data:res} = await searchDefaultGet();
			this.placeholder = res.showKeyword;
		},
		toSearch() {
			this.$router.push('search');
		}
	},
}
</script>

<style scoped>
.drawer{
	position:absolute;
	top: 12px;
	left: 15px;
}
.drawer > i{
	font-size: 23px;
}
.search > input{
  height: 30px;
  width: 75%;
  border-radius: 25px;
  border: 0;
  background-color:rgba(225, 225, 225,0.4);
  text-indent:40px;
	display: block;
	margin: 9px auto;
}
.head-search {
  position: absolute;
  top: 13px;
  left: 60px;
	font-size: 1em;
}
.listen-to-know {
	position:absolute;
	top: 11px;
	right:13px
}
.listen-to-know > i{
	font-size: 27px;
}


</style>