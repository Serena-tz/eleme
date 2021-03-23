<template>
  <!-- 组件内容 -->
  <div class="fa">
    <div class="detail">
      <div class="bigpic pore">
        <span class="iconfont icon-quxiao close" @click="change"></span>
        <img :src="todetail.image" :alt="todetail.name" />
      </div>
      <div class="intro pore">
        <p class="title">{{ todetail.name }}</p>
        <p class="much">
          <span class="left">月售{{ todetail.sellCount }}份</span>
          <span>好评率{{ todetail.rating }}%</span>
        </p>
        <p class="price">
          <span class="redp">￥{{ todetail.price }}</span>
          <span class="grayp" v-show="todetail.oldPrice > 0"
            >￥{{ todetail.oldPrice }}</span
          >
        </p>
        <!-- 加入购物车 -->
        <div class="add tc" v-show="todetail.num==0" @click="addcart(foodlist)">加入购物车</div>
        <!-- 数量增减控件 -->
        <div class="num-wrap" v-show="todetail.num>0">
          <span
            class="iconfont icon-jian choice"
            v-show="todetail.num > 0"
            @click.stop="min2(todetail.num)"
          ></span>
          <span class="num tc" v-show="todetail.num > 0">{{
            todetail.num
          }}</span>
          <span
            class="iconfont icon-jia1 choice"
            @click.stop="add2(todetail.num)"
          ></span>
        </div>
      </div>
      <!-- 商品介绍 -->
      <div class="info">
        <div class="title">商品介绍</div>
        <p class="text">{{ todetail.info }}</p>
      </div>
      <!-- 商品评价 -->
      <div class="info rate">
        <div class="title">商品评价</div>
        <div class="tab-title">
          <a
            class="ok white"
            href="javascript:;"
            :class="{ all: index == 0 }" v-if="todetail.ratings"
            @click="index = 0"
            >全部<span class="num">{{ todetail.ratings.length }}</span></a
          >
          <a v-if="this.todetail.ratings"
            class="ok"
            href="javascript:;"
            :class="{ all: index == 1 }"
            @click="index = 1"
            >推荐<span class="num">{{ likenum }}</span></a
          >
          <a  v-if="this.todetail.ratings"
            class="nook"
            href="javascript:;"
            :class="{ all: index == 2 }"
            @click="index = 2"
            >吐槽<span class="num">{{ nolikenum }}</span></a
          >
        </div>
      </div>
      <!-- 只看有内容的评价 -->
      <div class="only" @click="checked = !checked">
        <label class="label" for="ch">
          <span
            class="check-icon iconfont icon-ziyuan"
            :class="{ checked: checked }"
          ></span>
          <input
            class="check"
            v-model="checked"
            type="checkbox"
            name="ch"
            id="ch"
          />
        </label>
        <span>只看有内容的评价</span>
      </div>
      <!-- 评论 -->
      <div class="rem-wrap">
        <ul class="rate-list" v-show="index == 0">
          <li v-for="(item, index) in alllist" :key="index">
            <p class="clearfix">
              <span class="time fl">{{ nowtime(item.rateTime) }}</span>
              <img class="fr" :src="item.avatar" alt="" />
              <span class="name fr">{{ item.username }}</span>
            </p>
            <p>
              <span
                class="icon iconfont icon-dianzan_ good like"
                v-show="item.rateType == 0"
              ></span>
              <span
                class="icon iconfont icon-ai46 good nolike"
                v-show="item.rateType == 1"
              ></span>
              <span class="page">{{ item.text }}</span>
            </p>
          </li>
        </ul>
        <ul class="rate-list" v-show="index == 1">
          <li v-for="(item, index) in likelist" :key="index">
            <p class="clearfix">
              <span class="time fl">{{ nowtime(item.rateTime) }}</span>
              <img class="fr" :src="item.avatar" alt="" />
              <span class="name fr">{{ item.username }}</span>
            </p>
            <p>
              <span
                class="icon iconfont icon-dianzan_ good like"
                v-show="item.rateType == 0"
              ></span>
              <span
                class="icon iconfont icon-ai46 good nolike"
                v-show="item.rateType == 1"
              ></span>
              <span class="page">{{ item.text }}</span>
            </p>
          </li>
        </ul>
        <ul class="rate-list" v-show="index == 2">
          <li v-for="(item, index) in nolikelist" :key="index">
            <p class="clearfix">
              <span class="time fl">{{ nowtime(item.rateTime) }}</span>
              <img class="fr" :src="item.avatar" alt="" />
              <span class="name fr">{{ item.username }}</span>
            </p>
            <p>
              <span
                class="icon iconfont icon-dianzan_ good like"
                v-show="item.rateType == 0"
              ></span>
              <span
                class="icon iconfont icon-ai46 good nolike"
                v-show="item.rateType == 1"
              ></span>
              <span class="page">{{ item.text }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
export default {
  props: ["detailshow", "todetail", "foodlist"],
  data() {
    return {
      // 只查看内容按钮是否选中
      checked: false,
      // tab切换的索引
      index: 0,
      // 全部评论
      alllist: [],
      // 满意的评论
      likelist: [],
      // 不满意的评论
      nolikelist: [],
      // 详情页数据
      detaillist: "",
    };
  },
  computed: {
    // 满意的数量
    likenum() {
      return (this.todetail.ratings).filter((item) => item.rateType == 0).length;
    },
    // 不满意的数量
    nolikenum() {
      return (this.todetail.ratings).filter((item) => item.rateType == 1).length;
    },
  },
  methods: {
    // 关闭详情页
    change() {
      this.$emit("dtofa", false);
    },
    // 格式化时间
    nowtime() {
      var time = new Date();
      var year = time.getFullYear();
      var month = addZero(time.getMonth() + 1);
      var day = addZero(time.getDate());
      function addZero(num) {
        return num < 10 ? "0" + num : num;
      }
      return year + "-" + month + "-" + day;
    },
    // 增加数量
    add2(num) {
      this.todetail.num++;
    },
    // 减少数量
    min2(num) {
      this.todetail.num--;
    },
    // 加入购物车
    addcart(foodlist){
      this.$set(this.todetail, "num", 1);
      this.$set(foodlist, this.todetail.name, this.todetail);
    }
  },
  watch: {
    // 监听只看有内容的评价
    checked: function () {
      if (this.checked) {
        this.alllist = (this.todetail.ratings).filter((item) => item.text);
        this.likelist = (this.todetail.ratings).filter(
          (item) => item.rateType == 0 && item.text
        );
        this.nolikelist = (this.todetail.ratings).filter(
          (item) => item.rateType == 1 && item.text
        );
      } else {
        this.alllist = (this.todetail.ratings);
        this.likelist = (this.todetail.ratings).filter(
          (item) => item.rateType == 0
        );
        this.nolikelist = (this.todetail.ratings).filter(
          (item) => item.rateType == 1
        );
      }
    },
    todetail() {
      // 评论的筛选
      this.alllist = this.todetail.ratings;
      this.likelist = (this.todetail.ratings).filter(
        (item) => item.rateType == 0
      );
      this.nolikelist = (this.todetail.ratings).filter(
        (item) => item.rateType == 1
      );
    },
  },
};
// 写通用的方法
</script>

<style scoped>
.detail {
  background-color: #f3f5f7;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.choice {
  font-size: 0.48rem;
  color: #00a0dc;
  font-weight: 400;
  vertical-align: middle;
}

.num-wrap .num {
  display: inline-block;
  width: 0.48rem;
  color: #c3c6c9;
}
.num-wrap {
  position: absolute;
  right: 0;
  bottom: 0.36rem;
  margin-right: 0.36rem;
}

.bigpic {
  width: 100%;
  height: 7.5rem;
}

.bigpic img {
  width: 100%;
  height: 100%;
}

.intro {
  background-color: #fff;
  padding: 0.36rem;
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.intro .title {
  font-size: 0.28rem;
  font-weight: 700;
  color: rgb(7, 17, 27);
  margin-bottom: 0.16rem;
}

.intro .much {
  font-size: 0.2rem;
  color: rgb(147, 153, 159);
}

.much .left {
  margin-right: 0.24rem;
}

.price {
  margin-top: 0.36rem;
}

.intro .redp {
  font-size: 0.2rem/0.28rem;
  font-weight: 700;
  color: rgb(240, 20, 20);
  line-height: 0.48rem;
  margin-right: 0.24rem;
}

.intro .grayp {
  font-size: 0.2rem;
  font-weight: 700;
  color: rgb(147, 153, 159);
  line-height: 0.48rem;
  text-decoration: line-through;
}

.intro .add {
  width: 1.48rem;
  height: 0.48rem;
  line-height: 0.48rem;
  background-color: #00a0dc;
  color: #fff;
  position: absolute;
  right: 0.36rem;
  bottom: 0.36rem;
  border-radius: 0.24rem;
  font-size: 0.2rem;
}

.info {
  padding: 0.36rem;
  background-color: #fff;
  margin-top: 0.3rem;
  border-top: 0.01rem solid rgb(7, 17, 27, 0.2);
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.rate {
  border-bottom: 0;
  padding-bottom: 0;
}

.info .title {
  margin-bottom: 0.12rem;
  font-size: 0.24rem;
  color: rgb(7, 17, 27);
  line-height: 0.36rem;
}

.info .text {
  font-size: 0.24rem;
  font-weight: 200;
  color: rgb(77, 85, 93);
  line-height: 0.4rem;
}

.tab-title {
  font-size: 0.24rem/0.16rem;
  padding-bottom: 0.36rem;
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.tab-title > a {
  display: inline-block;
  padding: 0.16rem 0.24rem;
  margin-right: 0.16rem;
}

.tab-title .ok {
  background-color: #ccecf8;
  color: rgb(7, 17, 27);
}

.tab-title .nook {
  background-color: #e9ebec;
  color: rgb(7, 17, 27);
}

.tab-title .all {
  background-color: #00a0dc;
  color: white;
}

.tab-title .num {
  font-size: 0.2rem;
  margin-left: 0.1rem;
}

.only {
  background-color: #fff;
  height: 0.95rem;
  line-height: 0.95rem;
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.check-icon {
  color: #b7bbbf;
}
.checked {
  color: #00a0dc;
}
.check {
  width: 0;
  margin-right: -0.1rem;
}

.label {
  margin-left: 0.36rem;
  margin-right: 0.24rem;
}

.rate-list {
  padding: 0 0.36rem;
  background-color: #fff;
  padding-bottom: 2.95rem;
}

.rate-list li {
  padding: 0.32rem 0;
}
.rate-list li:not(:last-child) {
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}
.rate-list .icon {
  margin-right: 0.12rem;
  font-size: 0.24rem;
}
.rate-list .like {
  color: #00a0dc;
}
.rate-list .nolike {
  color: #b7bbbf;
}
.page {
  font-size: 0.24rem;
  color: rgb(7, 17, 27);
  line-height: 0.32rem;
}

.rate-list img {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  margin-left: 0.12rem;
}
.rate-list .time,
.rate-list .name {
  margin-bottom: 0.12rem;
  font-size: 0.2rem;
  color: rgb(147, 153, 159);
  line-height: 0.24rem;
}
.close {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  background-color: rgb(7, 17, 27, 0.2);
  padding: 0.2rem;
  color: #fff;
  border-radius: 50%;
}
</style>