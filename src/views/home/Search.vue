<template>
<!-- 搜索页 -->
	<div class= "search-box">
		<meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">  
		<div class= "header-box">
			<!-- ios端的search效果必须以表单的方式 -->
			<form @submit.prevent="false" action="#">
					<input type="search" v-model="keyWords" autofocus="autofocus" @keyup="enterSearch($event)" :placeholder="placeholder"/>
			</form>
			<div class="cancle" @click="$router.go(-1)">
				<p>取消</p>
			</div>
			<i class= "iconfont icon-sousuo"/>
		</div>
		<div class= "search-hot" v-show="isHot">
			<h4>热搜榜</h4>
			<ul class="hot-list">
				<li v-for="(item, index) in hotList" :key="item.score">
					<div class="hot-index">
						<p>{{index+1}}</p>
						</div>
					<div class="hot-info" @click="enterSearch(item)">
						<span>{{item.searchWord}}</span>
						<img :src="item.iconUrl" />
						<div>{{item.content}}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="sug-box" v-show="isDrawer">
			<ul class="sug-list">
				<li @click="enterSearch(item)" v-for="item in sugList" :key="item.feature">
					<i class= "iconfont icon-sousuo"/>
					<p>{{item.keyword}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {searchSugGet, searchHotGet, searchDefaultGet, searchGet } from '../../http/api';
export default {
	name: 'search',
	inject:['reload'],
	data() {
		return {
			keyWords: '',
			placeholder: '',
			hotList: [],
			sugList: [],
			isDrawer: true,
			isHot: true,
			direction: 'top to bottom'
		}
	},
	created() {
		this.getSearch();
	},
	watch:{
		keyWords(val) {
			searchSugGet({
				keywords: this.keyWords,
				type: 'mobile'}).then(({result:result}) => {
					this.sugList = result.allMatch;
					this.isHot = false;
			}).catch((err) => {
				console.log(err);
			});
		}
	},
	methods: {
		/* 获取搜索词 */
		async getSearch(){
			const {data: data} = await searchDefaultGet();
			this.placeholder = data.showKeyword;
			const {data: hot} = await searchHotGet();
			this.hotList = [...hot];
			console.log("this.hotlist：：：",this.hotList);
		},
		/* 获取单曲 */
		async enterSearch(event) {
			if (event.type === 1 || event.source === 0) {
				this.keyWords = (event.keyword || event.searchWord);
				this.isDrawer = false;
			}
			if(event.keyCode === 13 || event.type === 1 || event.source === 0) {
			try {
				const res = await searchGet({
				keywords: this.keyWords,
				type: 1018,
			});
			console.log(res);
			if (event.keyCode === 13) {
				event.preventDefault();
			}
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
	.search-hot{
		position: relative;
		padding-top: 10px;
	}
	.search-hot >h4{
		padding: 5px 10px;
		font-weight: 600;
	}
	.search-hot .hot-list{
		display: flex;
		flex-wrap: wrap;
	}
	.hot-list >li {
  width: 50%;
  display: flex;
  flex-wrap: nowrap;
  margin: 10px 0;
	
}
.hot-index  {
	width: 20px;
	color: #d73e39;
	text-align: center;
	
}
.hot-index >p{
	line-height: 38px;

}
.hot-info{
	position: relative;
	width: 170px;
	left: 10px;
}
.hot-info >:nth-child(1){
	font-size: 0.9em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.hot-info >:nth-child(2){
	height: 16px;
  margin-left: 8px;
}
.hot-info >:nth-child(3){
	font-size: 0.7em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.sug-box{
	position: relative;
	top: 10px;
	left: 12px;
}
.sug-list>li{
	padding-block: 2px;
	height: 36px;
	width: 90%;
}
.sug-list >li >p{
	position: relative;

	padding-block-end: 5px;
	border-bottom: 1px solid rgb(223, 223, 223);
	left: 23px;
	top: -22px;
}
	/* 去除type ="search"自带图标 */
	::-webkit-search-decoration {  
		display: none;  
	}
	input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;/*此处只是去掉默认的小×*/
}
</style>