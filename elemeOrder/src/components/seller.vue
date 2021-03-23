<template>
  <!-- 组件内容 -->
  <div class="fa">
    <div class="seller">
      <!-- 基本信息 -->
      <div class="info">
        <!-- 总数据 -->
        <div class="total clearfix">
          <!-- 商铺名 -->
          <div class="title-wrap fl">
            <div class="title">{{ sellerdata.name }}</div>
            <stars style="display: inline" :score="sellerdata.score"></stars>
            <span class="num">（{{ sellerdata.ratingCount }}）</span>
            <span class="all">月售{{ sellerdata.sellCount }}单</span>
          </div>
          <!-- 收藏按钮 -->
          <div class="like-wrap fr" @click="add = !add">
            <p class="like tc">
              <span class="iconfont icon-aixin" :class="{ on: add }"></span>
            </p>
            <p class="tc add" v-show="add">已收藏</p>
            <p class="tc add" v-show="!add">收藏</p>
          </div>
        </div>
        <!-- 基本数据 -->
        <div class="nums">
          <div class="left tc">
            <p class="title">起送价</p>
            <p>
              <span class="big">{{ sellerdata.minPrice }}</span>
              元
            </p>
          </div>
          <div class="mid tc">
            <p class="title">商家配送</p>
            <p>
              <span class="big">{{ sellerdata.deliveryPrice }}</span>
              元
            </p>
          </div>
          <div class="rig tc">
            <p class="title">平均配送时间</p>
            <p>
              <span class="big">{{ sellerdata.ratingCount }}</span>
              分钟
            </p>
          </div>
        </div>
      </div>
      <!-- 活动 -->
      <div class="act">
        <!-- 公告 -->
        <div class="act-inner">
          <div class="title">公告与活动</div>
          <div class="text">{{ sellerdata.bulletin }}</div>
        </div>
        <!-- 具体活动 -->
        <div class="act-list">
          <ul>
            <li
              class="clearfix"
              v-for="(item, index) in sellerdata.supports"
              :key="index"
            >
              <div class="img fl">
                <img :src="`img/${icon[item.type]}_4@2x.png`" alt="" />
              </div>
              <div class="fl con">{{ item.description }}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商家实景 -->
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrap pore">
          <div class="pic-list clearfix">
            <div
              class="item fl"
              v-for="(item, index) in sellerdata.pics"
              :key="index"
            >
              <img :src="item" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 商家信息 -->
      <div class="intro">
        <div class="title">商家信息</div>
        <ul class="intro-list">
          <li v-for="(item, index) in sellerdata.infos" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import stars from "./stars.vue";
export default {
  data() {
    return {
      // 商家数据
      sellerdata: "",
      // 增加
      add: false,
      // 图标对应
      icon: ["decrease", "discount", "special", "invoice", "guarantee"],
    };
  },
  components: {
    // 注册组件
    stars,
  },
  created() {
    // 添加钩子函数
    this.$axios.get("json/seller.json").then((res) => {
      this.sellerdata = res.data.data;
    });
  },
  updated() {
    // 数据更新时触发
  },
};

// 写通用的方法
</script>

<style scoped>
.seller {
  background-color: #f3f5f7;
}
/* 本页样式写在这里 */
.title-wrap .title {
  margin: 0.36rem 0 0.16rem 0;
  font-size: 0.28rem;
  color: rgba(7, 17, 27);
  line-height: 0.28rem;
  font-weight: 700;
}
.info {
  background-color: #fff;
}

.title-wrap .num {
  margin: 0 0.24rem 0 0.16rem;
  color: rgba(77, 85, 93);
}
.title-wrap .all {
  color: rgba(77, 85, 93);
}
.like-wrap {
  margin-top: 0.36rem;
  width: 0.72rem;
}
.like {
  margin-bottom: 0.08rem;
}
.like span {
  font-size: 0.48rem;
  color: rgba(147, 153, 159);
  line-height: 0.48rem;
}
.like span.on {
  color: rgba(240, 20, 20);
}
.add {
  font-size: 0.2rem;
  color: rgba(77, 85, 93);
}
.total {
  padding-bottom: 0.36rem;
  margin: 0 0.36rem;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.nums {
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.nums > div {
  flex: 1;
  margin: 0.36rem 0;
}
.nums > div .title {
  margin: 0 0 0.08rem 0;
  font-size: 0.2rem;
  color: rgba(147, 153, 159);
  line-height: 0.2rem;
}
.nums > div .big {
  font: 0.48rem/0.2rem "微软雅黑";
  font-weight: 200;
  color: rgba(7, 17, 27);
  line-height: 0.48rem;
}
.nums > div:not(:last-child) {
  border-right: rgba(7, 17, 27, 0.1) solid 0.01rem;
}
.act {
  background-color: #fff;
  margin-top: 0.3rem;
  padding: 0 0.36rem;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  margin-bottom: 0.3rem;
}
.act .title {
  margin: 0.36rem 0 0.16rem 0;
  font-size: 0.28rem;
}
.act .text {
  padding: 0 0.24rem 0.32rem;
  font-size: 0.24rem;
  font-weight: 200;
  line-height: 0.48rem;
  color: rgba(240, 20, 20);
}
.act-list li {
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  padding: 0 0.24rem;
}
.act-list li .img {
  width: 0.32rem;
  height: 0.32rem;
  margin: 0.32rem 0.12rem 0.32rem 0;
}
.act-list li .img img {
  width: 100%;
  height: 100%;
}
.act-list li .con {
  font-size: 0.24rem;
  font-weight: 200;
  color: rgba(7, 17, 27);
  line-height: 0.32rem;
  margin-top: 0.32rem;
}
.pics {
  background-color: #fff;
  padding: 0.36rem;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  margin-bottom: 0.3rem;
}
.pics .title,
.intro .title {
  font-size: 0.28rem;
  color: rgba(7, 17, 27);
  line-height: 0.28rem;
  margin-bottom: 0.24rem;
}
.pic-wrap {
  width: 100%;
  height: 1.8rem;
  overflow-y: hidden;
  overflow-x: auto;
}
.pic-list {
  min-width: 8rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.pic-list .item {
  width: 2.4rem;
  height: 1.8rem;
  margin-right: 0.12rem;
}
.pic-list .item img {
  width: 100%;
  height: 100%;
}
.intro {
  padding: 0.36rem;
  background-color: #fff;
  /* margin-bottom: 0.95rem; */
}
.intro-list li {
  padding: 0.32rem 0.24rem;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 0.24rem;
  font-weight: 200;
  color: rgba(7, 17, 27);
  line-height: 0.32rem;
}
</style>