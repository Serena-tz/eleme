<template>
  <!-- 组件内容 -->
  <div class="app">
    <!-- 头部 -->
    <top :layershow="layershow" @headtofa="gethead"></top>
    <!-- 页面切换 -->
    <div class="tab">
      <router-link to="/" exact>商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <!-- 主体内容三个切换面 -->
    <router-view ></router-view>
    <!-- 弹出层组件 -->
    <transition name="layer">
    <layer v-show="layershow" :layershow="layershow" @tofa="getdata"></layer>
    </transition>
  </div>
</template>

<script>
//常规JS代码
import top from "./components/head.vue";
import layer from "./components/layer.vue";
export default {
  // 这里写vue的那些兄弟
  data() {
    return {
      // 公告弹出层的显示和隐藏
      layershow: false,
    };
  },
  components: {
    // 公告组件
    layer,
    // 头部弹出层组件
    top,
  },
  methods: {
    // 弹出关闭按钮
    getdata(show) {
      this.layershow = show;
    },
    // 头部点击弹出
    gethead(show){
      this.layershow = show;
    },
  },
};
</script>
<style scoped>
/* 入场动画 */
.layer-enter {
  opacity: 0;
}
.layer-enter-to {
  opacity: 1;
}
.layer-enter-active,
.layer-leave-active {
  transition: all 0.8s;
}
/* 出场动画 */
.layer-leave {
  opacity: 1;
}
/* 头部 */
.tab {
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}
.tab a {
  font-size: 0.28rem;
  color: rgba(77, 85, 93);
}
.tab a.cur {
  color: rgba(240, 20, 20);
}
.app,body,html{
  width: 100%;
  height: 100%;
}
</style>