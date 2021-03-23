<template>
  <!-- 组件内容 -->
  <div class="fa">
    <!-- 购物车明细组件 -->
    <div v-show="sum > 0">
      <!-- <transition name="cart"> -->
        <shopcart v-show="cartshow" :foodlist="foodlist" :sum="sum"></shopcart>
      <!-- </transition> -->
    </div>
    <div class="addCart clearfix">
      <!-- 购物车 -->
      <div
        class="cart fl tc"
        :class="{ bluecart: sum > 0 }"
        @click="cartshow = !cartshow"
      >
        <span class="iconfont icon-gouwuche"></span>
      </div>
      <!-- 总计 -->
      <div class="num fl pore">￥{{ sum }}</div>
      <!-- 配送费 -->
      <div class="fl send">
        另需配送费￥ <span>{{ sellerdata.deliveryPrice }}</span
        >元
      </div>
      <!-- 起送价格 -->
      <div class="rig fr tc" v-show="sum == 0">
        ￥{{ sellerdata.minPrice }}起送
      </div>
      <div class="rig fr tc" v-show="sellerdata.minPrice - sum > 0">
        还差￥{{ sellerdata.minPrice - sum }}起送
      </div>
      <div class="rig fr tc rig2" v-show="sellerdata.minPrice - sum <= 0">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import shopcart from "./shopcart.vue";
export default {
  name:"addcart",
  props: ["foodlist"],
  data() {
    return {
      // 购物车显示隐藏
      cartshow: false,
      // 商家数据
      sellerdata: "",
      // 金额统计
      sum: 0,
    };
  },
  components: {
    // 注册购物车组件
    shopcart,
  },
  computed: {},
  methods: {
    // 从父级获得购物车数据
    getshop(data) {
      this.foodlist = show;
    },
  },
  watch: {
    // 监视数据变化，进行金额统计
    foodlist: {
      handler() {
        let sum = 0;
        for (var key of Object.keys(this.foodlist)) {
          sum += this.foodlist[key].price * this.foodlist[key].num;
        }
        this.sum = sum;
      },
      deep: true,
    },
  },
  created() {
    // 添加钩子函数
    this.$axios.get("json/seller.json").then((res) => {
      this.sellerdata = res.data.data;
    });
  },
};

// 写通用的方法
</script>

<style scoped>
/* 入场动画 */
.cart-enter {
  opacity: 1;
}
.cart-enter-to {
  opacity: 0;
}
.cart-enter-active,
.cart-leave-active {
  transition: all 0.8s;
}
/* 出场动画 */
.cart-leave {
  opacity: 0;
}
.addCart {
  background-color: #141d27;
  height: 0.95rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.addCart .cart {
  background-color: #2b343c;
  width: 0.88rem;
  height: 0.88rem;
  border-radius: 50%;
  position: absolute;
  bottom: 0.16rem;
  left: 0.36rem;
  border: #141d27 0.12rem solid;
}
.addCart .bluecart {
  color: white;
  background-color: #00a0dc;
}
.addCart .bluecart span {
  color: #fff;
}
.addCart .cart span {
  font-size: 0.48rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 0.68rem;
}
.addCart .rig {
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  line-height: 0.95rem;
  width: 2.1rem;
  background-color: #2b333b;
  height: 100%;
}
.addCart .rig2 {
  background: #00b43c;
  color: #fff;
}
.addCart .num {
  margin-left: 1.5rem;
  font-size: 0.32rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  line-height: 0.95rem;
  margin-right: 0.24rem;
}
.addCart .num::after {
  content: "";
  display: block;
  height: 0.5rem;
  width: 0.02rem;
  position: absolute;
  top: 0.22rem;
  right: -0.24rem;
  background-color: rgba(255, 255, 255, 0.4);
}
.addCart .send {
  margin-left: 0.24rem;
  font-size: 0.16rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 200;
  line-height: 0.95rem;
}
</style>