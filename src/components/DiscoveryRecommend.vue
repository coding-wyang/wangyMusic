<template>
  <div class="recommend">
    <!-- 懒加载骨架屏 -->
    <el-skeleton style="width: 100%; padding-block: 8px; padding-inline: 14px" animated v-if="banners[0] === undefined">
      <template #template>
        <!-- 图片类 -->
        <el-skeleton-item variant="image" style="width: 93%; height: 150px; border-radius: 5px" />
      </template>
    </el-skeleton>
    <!-- 通过v-touch来控制手机滑动 -->
    <div class="banner-box" v-touch="onTouch" v-if="banners[0] !== undefined">
      <el-carousel height="150px" ref="carousel">
        <el-carousel-item v-for="item in banners" :key="item">
          <h3 class="small" @click="toAd(item.url)">
            <img :src="item.pic" style="width: 100%" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 圆形入口 -->
    <div class="ball-box">
      <!-- 骨架屏 -->
      <el-skeleton style="display: inline-block; width: 50px; height: 80px; padding-inline: 13px; text-align: center; vertical-align: middle; --el-skeleton-circle-size: 50px" v-for="item in 9" :key="item.index" animated v-if="banners[0] === undefined">
        <template #template>
          <el-skeleton-item variant="circle" style="width: 50px; height: 30px; padding-block: 10px; border-radius: 40px" />
          <el-skeleton-item variant="text" style="width: 50px; position: relative; right: 49px; top: 19px" />
        </template>
      </el-skeleton>
      <div class="icon-line" v-for="item in ballIcon" :key="item.name">
        <div class="bottom-color">
          <img :src="item.iconUrl" />
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="playlist-box">
      <!-- 骨架屏 -->
      <el-skeleton style="display: inline-block; width: 110px; padding-inline: 13px; text-align: center; vertical-align: middle" v-for="item in 5" :key="item.name" animated v-if="banners[0] === undefined">
        <template #template>
          <el-skeleton-item variant="image" style="border-radius: 5px; width: 110px; height: 110px" />
          <el-skeleton-item variant="text" style="width: 100px; position: relative; top: 19px" />
        </template>
      </el-skeleton>
      <p>推荐歌单</p>
      <div class="img-line" v-for="(item, index) in playList" :key="item.creativeId">
        <el-carousel
          height="120px"
          direction="vertical"
          :autoplay="true"
          indicator-position="none"
          v-if="index === 0"
          @change="
            (index) => {
              change(index);
            }
          "
        >
          <el-carousel-item v-for="(item, index) in item.resources" :key="index">
            <img :src="item.uiElement.image.imageUrl" />
          </el-carousel-item>
        </el-carousel>
        <!-- 第一个歌单box  -->
        <div class="firsttitle-box" v-if="index === 0">
          <p align="left">{{ this.firstTitle }}</p>
        </div>
        <!-- 图片 -->
        <div class="img-box" v-if="index !== 0">
          <img :src="item.uiElement.image.imageUrl" />
          <!-- 播放量 -->
          <div class="count-box">
            <p>{{ playCount[index] }}</p>
          </div>
          <!-- 文字介绍 -->
          <div class="title-box">
            <p align="left">{{ item.uiElement.mainTitle.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { discoveryInfoGet, discoveryBallIconGet } from '../http/api';

export default {
  name: 'disRecommend',
  data() {
    return {
      banners: [], // 横幅
      ballIcon: [], // 圆形图标
      playList: [], // 歌单
      playCount: ['∞'], // 播放量
      firstTitle: '', // 第一个playList文字介绍
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    async getRecommend() {
      const { data: res } = await discoveryInfoGet();
      /* banner get */
      this.banners = [...res.blocks[0].extInfo.banners];
      const ret = await discoveryBallIconGet();
      /* 发现页 推荐入口get */
      this.ballIcon = [...ret.data];
      /* 歌单 get */
      this.playList = [...res.blocks[1].creatives];
      /* 循环遍历存储非第一个歌单信息 */
      this.playList.forEach((element, index) => {
        if (index !== 0) {
          const data = this.formatCount(element.resources[0].resourceExtInfo.playCount);
          this.playCount.push(data);
        }
      });
      /* 第一个歌单文字介绍 */
      this.firstTitle = this.playList[0].resources[0].uiElement.mainTitle.title;
    },
    /* 跳转外部路径 */
    toAd(adUrl) {
      window.location.href = adUrl;
    },
    /* 控制滑动调整轮播图 */
    onTouch(e) {
      if (e === 'left') {
        this.$refs.carousel.next();
      } else if (e === 'right') {
        this.$refs.carousel.prev();
      }
    },
    /* 解析播放量 */
    formatCount(val) {
      let countPlay = val;
      if (val < 1e4) {
        countPlay = val.toString();
      } else if (val > 1e4 && val < 1e8) {
        countPlay = `${Math.trunc(val / 1e4).toString()}万`; /* 截断小数 */
      } else if (val > 1e8) {
        countPlay = `${Math.trunc(val / 1e8).toString()}亿`;
      }
      return `▷${countPlay}`;
    },
    /* 首个歌单幻灯片切换时，更换文字。 */
    change(i) {
      this.playList[0].resources.forEach((element, index) => {
        if (index === i) {
          this.firstTitle = element.uiElement.mainTitle.title;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* banners 推荐轮播图 */
.recommend {
  width: 100%;
}
.banner-box {
  padding-block: 8px;
  padding-inline: 14px;
  margin: 0;
}
.el-carousel {
  border-radius: 8px;
}
.el-carousel__indicators--horizontal {
  height: 25px;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.el-carousel__button {
  width: 9px;
}
/* 圆形入口 */
.ball-box {
  overflow-x: auto; //x轴可滑动
  white-space: nowrap; //元素不换行
  padding-inline-start: 10px;
  padding-block: 8px;
  border-bottom: 1px solid;
  border-bottom-color: rgb(201, 201, 201);
}
.icon-line {
  display: inline-block;
  width: 50px;
  height: 80px;
  padding-inline: 13px;
  text-align: center;
  vertical-align: middle;
  /* float: left;  不能使用,因为float里超过屏幕后会自动换行*/
}
.bottom-color {
  width: 50px;
  height: 30px;
  padding-block: 10px;
  border-radius: 40px;
  background: rgb(253, 214, 214);
}
.icon-line .bottom-color > img {
  background: rgb(233, 78, 78);
  width: 28px;
  border-radius: 10px;
}
.icon-line > p {
  position: relative;
  top: 5px;
  font-size: 10px;
}
/* 推荐歌单 */
.playlist-box {
  width: 100%;
  height: 160px;
  overflow-x: auto; //x轴可滑动
  white-space: nowrap; //元素不换行
  padding-block: 8px;
  padding-block-start: 40px;
  border-bottom: 6px solid;
  border-bottom-color: rgb(228, 228, 228);
}
.playlist-box > p {
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 800;
  border-bottom: 4px;
  top: 320px;
  left: 20px;
}
.img-line {
  display: inline-block;
  width: 100px;
  height: 140px;
  padding-left: 12px;
  padding-right: 18px;
  text-align: center;
  vertical-align: middle;
}
.img-line .el-carousel {
  width: 110px;
}
.img-line .el-carousel .el-carousel__container {
  height: 110px;
}
.img-line .el-carousel .el-carousel__item > img {
  width: 110px;
  border-radius: 8px;
}
.img-box {
  height: 120px;
  width: 110px;
}
.img-box .count-box {
  position: relative;
  background: rgb(145, 145, 145);
  border-radius: 6px;
  width: 50px;
  height: 14px;
  opacity: 0.7;
  top: -110px;
  left: 55px;
}
.count-box > p {
  position: relative;
  font-size: 0.1em;
  bottom: 0px;
  color: #ffff;
  right: 0px;
}
.img-box > img {
  width: 110px;
  border-radius: 8px;
  overflow: hidden;
}
/* title部分 */
.title-box {
  position: relative;
  height: 50px;
  top: -10px;
}

.title-box > p {
  white-space: normal;
  font-size: 12px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.el-carousel--vertical {
  height: 110px;
  overflow: hidden;
}
.firsttitle-box {
  position: relative;
  height: 50px;
  top: 8px;
}
.firsttitle-box > p {
  white-space: normal;
  font-size: 12px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari 隐藏滚动条*/
}
</style>
