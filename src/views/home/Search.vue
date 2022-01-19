<template>
	<div class= "search-box">
		<meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">  
		<div class= "header-box">
			<form @submit.prevent="false" action="#">
					<input type="search" v-model="keyWords" autofocus="autofocus" @keyup="enterSearch($event)" :placeholder="placeholder"/>
			</form>
			<div class="cancle" @click="$router.go(-1)">
				<p>取消</p>
			</div>
			<i class= "iconfont icon-sousuo"/>
		</div>
	</div>
</template>

<script>
import { searchDefaultGet, searchGet } from '../../http/api';
export default {
	name: 'search',
	inject:['reload'],
	data() {
		return {
			keyWords: '',
			placeholder: '',
		}
	},
	created() {
		this.getSearch();
	},
	methods: {
		/* 获取搜索词 */
		async getSearch(){
			const {data: data} = await searchDefaultGet();
			this.placeholder = data.showKeyword;
		},
		/* 获取单曲 */
		async enterSearch(event) {
			if(event.keyCode === 13) {
			try {
				const res = await searchGet({
				keywords: this.keyWords,
				type: 1018,
			});
			console.log('res',res);
			event.preventDefault();
			this.$store.commit("setSongList",res.result.song);
			this.$store.commit("setKeyWord",this.keyWords);
			this.$router.push('/search/result');
			} catch (error) {
				alert(error)
			};
			}
			},
		}
}
</script>

<style lang="scss" scoped>
  .header-box >form >input{
	height: 36px;
  width: 80%;
  border-radius: 25px;
  border: 0;
  background-color:rgba(225, 225, 225,0.4);
  text-indent: 37px;
	display: block;
	margin: 9px 18px;
	outline-color: white;
	}
	.header-box > i{
		position: absolute;
		top: 19px;
		left: 30px;
	}
	.header-box .cancle> p{
		position: absolute;
		top: 15px;
		right: 20px;
		font-weight: 500;
	}
	/* 去除type ="search"自带图标 */
	::-webkit-search-decoration {  
		display: none;  
	}
	input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;/*此处只是去掉默认的小×*/
}
</style>