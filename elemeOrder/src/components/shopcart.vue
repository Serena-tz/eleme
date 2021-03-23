<template>
  <!-- 组件内容 -->
  <div class="fa">
    <div class="mask"></div>
    <div class="shopcart">
      <div class="title clearfix">
        <span class="fl cart-title">购物车</span>
        <span class="fr empty" @click="clearall">清空</span>
      </div>
      <div class="content">
        <ul class="cart-list">
          <li class="clearfix" v-for="(item, index) in foodlist" :key="index" v-show="item.num>0">
            <div class="fl cutFont goods">{{ item.name }}</div>
            <span class="fr">
              <span class="price">￥{{ item.price }}</span>
              <span
                class="iconfont icon-jian choice"
                @click="minit(item, index)"
              ></span>
              <span class="num tc">{{ item.num }}</span>
              <span
                class="iconfont icon-jia1 choice"
                @click="addit(item, index)"
              ></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
export default {
  name:"shopcart",
  props: ["foodlist"],
  data() {
    return {
      // 数据
    };
  },
  methods: {
    // 减少数量
    minit(item, index) {
      item.num--;
      if (item.num <= 0) {
        this.$delete(this.foodlist, item.name);
      }
    },
    // 增加数量
    addit(item, index) {
      item.num++;
    },
    // 清空所有
    clearall() {
      for (let k in this.foodlist) {
        this.foodlist[k].num=0
      }
    },
  },
};
// 写通用的方法
</script>

<style scoped>
.shopcart {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0.95rem;
  z-index: 99;
}
.mask {
  background: rgba(7, 17, 27, 0.6);
  filter: blur(0.1rem);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.title {
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 0.36rem;
  background-color: #f3f5f7;
  border-bottom: 0.01rem solid rgba(7, 17, 27, 0.6);
}
.empty {
  font-size: 0.24rem;
  color: rgba(0, 160, 220);
}
.cart-title {
  font-size: 0.28rem;
  font-weight: 200;
  color: rgba(7, 17, 27);
}
.cart-list {
  background-color: #fff;
  padding-bottom: 0.4rem;
}
.cart-list li {
  height: 0.96rem;
  line-height: 0.96rem;
  margin: 0 0.36rem;
  border-bottom: 1px solid rgba(7, 17, 27, 0.2);
  overflow: hidden;
}
.goods {
  font-size: 0.28rem;
  color: rgba(7, 17, 27);
}
.choice {
  font-size: 0.48rem;
  color: #00a0dc;
  font-weight: 400;
}
.price {
  margin: 0 0.24rem 0 0.36rem;
  color: #f01414;
  line-height: 0.48rem;
  font-weight: 700;
}
.num {
  display: inline-block;
  width: 0.48rem;
  color: #c3c6c9;
}
</style>