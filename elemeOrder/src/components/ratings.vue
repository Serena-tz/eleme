<template>
  <!-- 组件内容 -->
  <div class="fa">
    <div class="ratings">
      <!-- 综合评分 -->
      <div class="rate clearfix">
        <div class="left tc fl">
          <p class="scroe">{{ sellerdata.score }}</p>
          <p class="all">综合评分</p>
          <p class="tall">高于周边商家{{ sellerdata.rankRate }}%</p>
        </div>
        <div class="rig fl">
          <div class="item">
            <span class="title">服务态度</span>
            <span class="stars">
              <stars
                style="display: inline"
                :score="sellerdata.serviceScore"
              ></stars>
            </span>
            <span class="num">{{ sellerdata.serviceScore }}</span>
          </div>
          <div class="item">
            <span class="title">产品质量</span>
            <span class="stars">
              <stars
                style="display: inline"
                :score="sellerdata.foodScore"
              ></stars>
            </span>
            <span class="num">{{ sellerdata.foodScore }}</span>
          </div>
          <div class="item">
            <span class="title">送达时间</span>
            <span class="time">{{ sellerdata.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <!-- 评价分类 -->
      <div class="content">
        <div class="title" v-if="this.ratedata">
          <a
            class="tc white ok"
            href="javascript:;"
            :class="{ all: index == 0 }"
            @click="index = 0"
            >全部<span class="num">{{ ratedata.length }}</span></a
          >
          <a
            class="tc ok"
            href="javascript:;"
            :class="{ all: index == 1 }"
            @click="index = 1"
            >满意<span class="num">{{ likenum }}</span></a
          >
          <a
            class="tc nook"
            href="javascript:;"
            :class="{ all: index == 2 }"
            @click="index = 2"
            >不满意<span class="num">{{ nolikenum }}</span></a
          >
        </div>
        <!-- 只看有内容的评价 -->
        <div class="only" @click="checked = !checked">
          <label for="ch" class="label">
            <span
              class="check-icon iconfont icon-ziyuan"
              :class="{ checked: checked }"
            ></span>
            <input
              class="check"
              type="radio"
              v-model="checked"
              name="ch"
              id="ch"
            />
          </label>
          <span>只看有内容的评价</span>
        </div>
        <!-- 评论 -->
        <div class="rem-wrap">
          <div class="rem clearfix" v-show="index == 0">
            <ul class="rem-list">
              <li v-for="(item, index) in alllist" :key="index">
                <div class="clearfix">
                  <div class="pic fl">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="text fl">
                    <p class="clearfix">
                      <span class="fl">{{ item.username }}</span>
                      <span class="fr rig-time">{{
                        notime(item.rateTime)
                      }}</span>
                    </p>
                    <div>
                      <span class="stars">
                        <stars
                          :score="item.score"
                          style="display: inline"
                        ></stars>
                      </span>
                      <span class="time" v-show="item.deliveryTime"
                        >{{ item.deliveryTime }}分钟送达</span
                      >
                    </div>
                    <p class="con">{{ item.text }}</p>
                    <!-- 详情 -->
                    <div class="detail" v-show="item.recommend.length > 0">
                      <span
                        class="icon iconfont icon-dianzan_ good like"
                      ></span>
                      <span
                        class="con cutFont"
                        v-for="(item, index) in item.recommend"
                        :key="index"
                        >{{ item }}</span
                      >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="rem clearfix" v-show="index == 1">
            <ul class="rem-list">
              <li v-for="(item, index) in likelist" :key="index">
                <div class="clearfix">
                  <div class="pic fl">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="text fl">
                    <p class="clearfix">
                      <span class="fl">{{ item.username }}</span>
                      <span class="fr rig-time">{{
                        notime(item.rateTime)
                      }}</span>
                    </p>
                    <div>
                      <span class="stars">
                        <stars
                          :score="item.score"
                          style="display: inline"
                        ></stars>
                      </span>
                      <span class="time" v-show="item.deliveryTime"
                        >{{ item.deliveryTime }}分钟送达</span
                      >
                    </div>
                    <p class="con">{{ item.text }}</p>
                    <!-- 详情 -->
                    <div class="detail" v-show="item.recommend.length > 0">
                      <span
                        class="icon iconfont icon-dianzan_ good like"
                      ></span>
                      <span
                        class="con cutFont"
                        v-for="(item, index) in item.recommend"
                        :key="index"
                        >{{ item }}</span
                      >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="rem clearfix" v-show="index == 2">
            <ul class="rem-list">
              <li v-for="(item, index) in nolikelist" :key="index">
                <div class="clearfix">
                  <div class="pic fl">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="text fl">
                    <p class="clearfix">
                      <span class="fl">{{ item.username }}</span>
                      <span class="fr rig-time">{{
                        notime(item.rateTime)
                      }}</span>
                    </p>
                    <div>
                      <span class="stars">
                        <stars
                          :score="item.score"
                          style="display: inline"
                        ></stars>
                      </span>
                      <span class="time" v-show="item.deliveryTime"
                        >{{ item.deliveryTime }}分钟送达</span
                      >
                    </div>
                    <p class="con">{{ item.text }}</p>
                    <!-- 详情 -->
                    <div class="detail" v-show="item.recommend.length > 0">
                      <span
                        class="icon iconfont icon-dianzan_ good like"
                      ></span>
                      <span
                        class="con cutFont"
                        v-for="(item, index) in item.recommend"
                        :key="index"
                        >{{ item }}</span
                      >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
      // 评价数据
      ratedata: "",
      // 商家数据
      sellerdata: "",
      // 评价筛选
      checked: false,
      // 标记面板索引
      index: 0,
      // 全部评价
      alllist: [],
      // 满意评价
      likelist: [],
      // 不满意评价
      nolikelist: [],
    };
  },
  components: {
    // 注册组件
    stars,
  },
  computed: {
    // 统计满意
    likenum() {
      return (this.ratedata).filter((item) => item.rateType == 0).length;
    },
    // 统计不满意
    nolikenum() {
      return (this.ratedata).filter((item) => item.rateType == 1).length;
    },
  },
  watch: {
    // 监听判断只看内容
    checked: function () {
      if (this.checked) {
        this.alllist = (this.ratedata).filter((item) => item.text);
        this.likelist = (this.ratedata).filter( (item) => item.rateType == 0 && item.text);
        this.nolikelist = (this.ratedata).filter( (item) => item.rateType == 1 && item.text);
      } else {
        this.alllist = (this.ratedata).filter((item) => item.rateType == 0);
        this.likelist = (this.ratedata).filter((item) => item.rateType == 0);
        this.nolikelist = (this.ratedata).filter((item) => item.rateType == 1);
      }
    },
  },
  methods: {
    // 获取当前时间
    notime() {
      var time = new Date();
      var year = time.getFullYear();
      var month = addZero(time.getMonth() + 1);
      var day = addZero(time.getDate());
      var hour = addZero(time.getHours());
      var min = addZero(time.getMinutes());
      function addZero(num) {
        return num < 10 ? "0" + num : num;
      }
      return year + "-" + month + "-" + day + " " + hour + ":" + min;
    },
    // 方法
  },
  created() {
    // 添加钩子函数
    this.$axios
      .get("json/ratings.json")
      .then((res) => {
        this.alllist = this.ratedata = res.data.data;
        this.likelist = (this.ratedata).filter((item) => item.rateType == 0);
        this.nolikelist = (this.ratedata).filter((item) => item.rateType == 1);
      });
    this.$axios
      .get("json/seller.json")
      .then((res) => {
        this.sellerdata = res.data.data;
      });
  },
  updata() {},
};

// 写通用的方法
</script>

<style scoped>
.ratings {
  background-color: #f3f5f7;
}

.rate {
  padding: 0.36rem 0;
  margin-bottom: 0.3rem;
  background-color: #fff;
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.rate .left {
  width: 2.75rem;
  border-right: rgb(7, 17, 27, 0.2) solid 0.01rem;
}

.rate .rig {
  width: 4.74rem;
}

.scroe {
  font-size: 0.48rem;
  color: rgb(255, 153, 0);
  line-height: 0.56rem;
}

.left .all {
  font-size: 0.24rem;
  color: rgb(7, 17, 27);
  line-height: 0.24rem;
  margin: 0.12rem 0 0.1rem;
}

.left .tall {
  padding-top: 0.1rem;
  margin: 0 0 0.12rem;
  font-size: 0.2rem;
  color: rgb(7, 17, 27, 0.5);
  line-height: 0.2rem;
}

.stars {
  margin: 0 0.24rem;
}
.rig .num {
  color: #ff9900;
}

.rig .item {
  margin-left: 0.48rem;
}

.rig .item:not(:last-child) {
  margin-bottom: 0.16rem;
}

.rig .item .title {
  font-size: 0.24rem;
  color: rgb(7, 17, 27);
  line-height: 0.36rem;
}

.item .time {
  margin-left: 0.24rem;
  font-size: 0.24rem;
  color: rgb(147, 153, 159);
  line-height: 0.36rem;
}

.content {
  background-color: #fff;
  border-top: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.content .title {
  margin: 0.36rem 0.36rem 0;
  padding-bottom: 0.36rem;
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.content .title a {
  display: inline-block;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0 0.2rem;
  margin-right: 0.15rem;
}

.title .ok {
  background-color: #ccecf8;
  color: rgb(7, 17, 27);
}

.title .nook {
  background-color: #e9ebec;
  color: rgb(7, 17, 27);
}

.title .all {
  background-color: #00a0dc;
  color: white;
}

.title .num {
  font-size: 0.2rem;
  margin-left: 0.1rem;
}

.only {
  height: 0.95rem;
  line-height: 0.95rem;
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}

.check-icon {
  color: #b7bbbf;
}
.only .checked {
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
.rem .pic {
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.24rem;
}
.rem .pic img {
  width: 100%;
  height: 100%;
}
/* .rem-list {
  margin-bottom: 0.95rem;
} */
.rem-list li {
  margin: 0.36rem 0.36rem 0;
  padding-bottom: 0.36rem;
}
.rem-list li:not(:last-child) {
  border-bottom: 0.01rem solid rgb(7, 17, 27, 0.2);
}
.rem-list .text {
  font-size: 0.2rem;
  color: rgb(7, 17, 27);
  line-height: 0.24rem;
  width: 88%;
}
.rem-list .stars {
  display: inline-block;
  margin: 0.08rem 0 0.12rem 0;
  font-size: 0.2rem;
}
.rem-list .time {
  font-size: 0.2rem;
  color: rgb(147, 153, 159);
  margin-left: 0.12rem;
}
.rig-time {
  font-size: 0.2rem;
  color: rgb(147, 153, 159);
  font-weight: 200;
  line-height: 0.24rem;
}
.rem-list .con {
  font-size: 0.24rem;
  color: rgb(7, 17, 27);
  line-height: 0.36rem;
  display: inline-block;
}
.detail {
  margin-top: 0.16rem;
}
.detail .icon {
  margin-right: 0.12rem;
  font-size: 0.24rem;
  vertical-align: middle;
}
.detail .con {
  max-width: 1.75rem;
  display: inline-block;
  border: rgba(7, 17, 27, 0.1) solid 0.02rem;
  font-size: 0.18rem;
  color: rgb(147, 153, 159);
  margin-right: 0.16rem;
  padding: 0.03rem 0.12rem;
  vertical-align: middle;
  margin-bottom: 0.08rem;
}
.detail .like {
  color: #00a0dc;
}
.detail .nolike {
  color: #b7bbbf;
}
</style>