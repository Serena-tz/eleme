<template>
  <!-- 组件内容 -->
  <div class="fa">
    <!-- 商品-->
    <div class="goods clearfix pore">
      <!-- 类别 -->
      <div class="menu fl">
        <ul class="menu-list" ref="uls" id="ul">
          <li
            v-for="(item, index) in goodsdata"
            :class="{ on: num == index }" 
            @click="num = index"
            :key="index"
          >
            <a  :href="`#id${index}`">
              <!-- <span class="icon"></span> -->
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
      <!-- 菜品 -->
      <div class="content fl" id="con">
        <div
          class="item"
          v-for="(item, index) in goodsdata"
          :key="index"
          :id="`id${index}`"
        >
          <div class="title">{{ item.name }}</div>
          <ul class="con-list">
            <li
              class="clearfix pore"
              v-for="(i, num) in item.foods"
              :key="num"
              @click="showDetail(i)"
            >
              <div class="img fl">
                <img :src="i.image" alt="" />
              </div>
              <div class="text fl">
                <p class="title-wrap">{{ i.name }}</p>
                <p class="name cutFont">{{ i.description }}</p>
                <p class="total">
                  <span>月售{{ i.sellCount }}份</span>
                  <span class="like">好评率{{ i.rating }}%</span>
                </p>
                <p class="price">
                  <span class="redp">￥{{ i.price }}</span>
                  <span class="grayp" v-show="i.oldPrice > 0"
                    >￥{{ i.oldPrice }}</span
                  >
                </p>
              </div>
              <div class="num-wrap">
                <transition name="fade">
                  <div style="display:inline-block;"
                    class="iconfont icon-jian choice min"
                    v-show="goodsdata[index].foods[num].num > 0"
                    @click.stop="min1(index, num)"
                  ></div>
                </transition>
                <span
                  class="num tc"
                  v-show="goodsdata[index].foods[num].num > 0"
                  >{{ goodsdata[index].foods[num].num }}</span
                >
                <div  style="display:inline-block;"
                  class="iconfont icon-jia1 choice"
                  @click.stop="add1(index, num)"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 底部黑色购物车-->
    <addcart :foodlist="foodlist" v-if="foodlist"></addcart>
    <!-- 商品详情 -->
    <transition name="move">
        <detail
        v-show="detailshow"
        :detailshow="detailshow"
        @dtofa="getd"
        :todetail="todetail"
        :foodlist="foodlist"
      ></detail>
    </transition>
  </div>
</template>

<script>
// 引入组件
import addcart from  "./addCart.vue";
import detail from "./detail.vue";

export default {
  name:"goods",
  data() {
    return {
      // 详情页的显示隐藏
      detailshow: false,
      // 商品数据
      goodsdata: "",
      // 数量统计
      numtotal: 0,
      // 传递给详情页的数据
      todetail: "",
      // 食品列表
      foodlist: {},
      // 菜单导航的索引
      num: 0,
    };
  },
  components: {
    // 注册购物车
    addcart,
    detail,
  },
  methods: {
    // 关闭详情页
    getd(show) {
      this.detailshow = show;
    },
    // 详情页传递数据
    showDetail(i) {
      this.detailshow = true;
      this.todetail = i;
    },
    // 加减
    add1(index, num) {
      let item = this.goodsdata[index].foods[num];
      item.num++;
      this.$set(this.foodlist, item.name, item);
    },
    min1(index, num) {
      let item = this.goodsdata[index].foods[num];
      // 数量减少
      item.num--;
      this.$set(this.foodlist, item.name, item);
      if (item.num <= 0) {
        this.$delete(this.foodlist, item.name);
      }
    },
  },
  created() {
    // 添加钩子函数
    this.$axios.get("json/goods.json").then((res) => {
      this.goodsdata = res.data.data;
      //  给对象添加一个num属性
      this.goodsdata.forEach((item) => {
        item.foods.forEach((element) => {
          this.$set(element, "num", 0);
        });
      });
    });
  },
};
</script>

<style scoped>
body,html{
  overflow: hidden; 
  height:100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s linear;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(0.96rem) rotate(360deg);
}

.fade-enter-to,
.fade-leave {
  transform: translateX(0) rotate(0deg);
}

/* 入场动画 */
.move-enter {
  opacity: 0;
}
.move-enter-to {
  opacity: 1;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.8s;
}
/* 出场动画 */
.move-leave {
  opacity: 1;
}
.goods {
  display: flex;
}
.goods > .content {
  flex: 1;
  overflow-y: scroll;
  height: 8.9rem;
  /* height: 10.6rem; */
}
.menu {
  overflow-y: scroll;
  background-color: #f3f5f7;
  position: relative;
  width: 1.6rem;
  height: 8.9rem;
  /* height: 10.8rem; */
}
.menu-list {
  width: 1.6rem;
  position: absolute;
  top: 0;
  left: 0;
}
.menu-list li {
  width: 100%;
  background-color: #f3f5f7;
  padding: 0.1rem 0.24rem;
  height: 1.08rem;
}

.menu-list li a {
  width: 1.12rem;
  height: 100%;
  display: inline-block;
  line-height: 0.28rem;
  font-size: 0.24rem;
  color: rgb(7, 17, 27);
  vertical-align: middle;
}

.menu-list li:not(:last-child) a {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.menu-list li.on {
  background-color: #fff;
}

.menu-list li.on a {
  border-bottom: 1px solid transparent;
}

.menu-list li .icon {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  background: url(/img/guarantee_2@2x.png) no-repeat;
  background-size: 0.32rem 0.32rem;
  vertical-align: middle;
}

.content .item .title {
  height: 0.52rem;
  line-height: 0.52rem;
  padding-left: 0.28rem;
  background-color: #f3f5f7;
  width: 100%;
  border-left: 0.04px solid #d9dde1;
}

.con-list {
  background-color: #fff;
}

.con-list li {
  margin: 0.36rem;
  padding-bottom: 0.36rem;
}

.con-list li:not(:last-child) {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.con-list .img {
  width: 1.14rem;
  height: 1.14rem;
  margin-right: 0.2rem;
}

.img img {
  width: 100%;
  height: 100%;
}

.con-list .text .tit {
  font-size: 0.28rem;
  color: rgb(7, 17, 27);
}

.text .name,
.text .total {
  max-width: 3rem;
  font-size: 0.2rem;
  color: rgb(147, 153, 159);
  margin-top: 0.16rem;
}
.total .like {
  margin-left: 0.24rem;
}
.choice {
  font-size: 0.48rem;
  color: #00a0dc;
  font-weight: 400;
  vertical-align: middle;
}

.num {
  display: inline-block;
  width: 0.48rem;
  color: #c3c6c9;
}
.num-wrap {
  position: absolute;
  right: 0;
  bottom: 0.36rem;
}
.price {
  margin-top: 0.24rem;
}

.redp {
  font-size: 0.2rem/0.28rem;
  font-weight: 700;
  color: rgb(240, 20, 20);
  line-height: 0.48rem;
  margin-right: 0.24rem;
}

.grayp{
  font-size: 0.2rem;
  font-weight: 700;
  color: rgb(147, 153, 159);
  line-height: 0.48rem;
  text-decoration: line-through;
}

</style>