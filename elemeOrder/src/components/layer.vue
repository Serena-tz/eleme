<template>
  <!-- 组件内容 -->
  <div class="fa">
    <div class="layer-wrap">
      <div class="layer">
        <div class="mask"></div>
        <p class="main-title tc">{{layerdata.name}}</p>
        <div class="tc star-wrap">
          <stars :score="layerdata.score"></stars>
        </div>
        <!-- 优惠信息 -->
        <div class="discount">
          <div class="title tc">优惠信息</div>
          <ul class="dis-ul">
            <li class="clearfix"  v-for="(item,index) in layerdata.supports" :key="index">
              <div class="img fl">
                <img :src="`img/${icon[item.type]}_2@2x.png`" alt="">
              </div>
              <div class="text fl">{{item.description}}</div>
            </li>
          </ul>
        </div>
        <!-- 商家公告 -->
        <div class="discount">
          <div class="title tc">商家公告</div>
          <p class="info">{{layerdata.bulletin}}</p>
        </div>
        <!-- 取消 -->
        <div class="close tc" @click="changelayer">
          <span class="iconfont icon-quxiao tc"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import stars from "./stars.vue";
export default {
  // 弹出层的显示隐藏
  props:["layershow"],
  data() {
    return {
      // 弹出层数据
      layerdata:"",
      // 弹出层显示
      lshow:true,
      // 图标更换
      icon:["decrease","discount","special","invoice","guarantee"]
    };
  },
  components: {
    // 注册组件
    stars
  },
  methods: {
    // 弹出层显示
    changelayer(){
        this.$emit("tofa",false)
    }
  },
  created() {
    // 添加钩子函数
    this.$axios.get("json/seller.json").then((res) => {
      this.layerdata = res.data.data;
    });
  },
};
// 写通用的方法
</script>

<style scoped>
.layer-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99999999999;
}
.layer .mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(7, 17, 27, 0.8);
  filter: blur(0.1rem);
  z-index: -1;
}
.layer {
  margin: 0 0.72rem;
}
.layer .main-title {
  margin-top: 1.28rem;
  font-size: 0.32rem;
  color: rgb(255, 255, 255);
  line-height: 0.32rem;
  font-weight: 700;
}
.star-wrap {
  margin: 0.32rem 0 0;
  font-size: 0.28rem;
}
.discount .title {
  font-size: 0.32rem;
  color: rgb(255, 255, 255);
  line-height: 0.32rem;
  font-weight: 700;
  margin: 0.56rem 0.24rem 0.48rem;
  padding-top: 0.48rem;
}
.discount .title::before {
  content: "";
  display: inline-block;
  width: 2.24rem;
  height: 0.02rem;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 0.72rem;
  margin-top: 0.18rem;
}
.discount .title::after {
  content: "";
  display: inline-block;
  width: 2.24rem;
  height: 0.02rem;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 0.72rem;
  margin-top: 0.18rem;
}
.dis-ul .text {
  font-size: 0.24rem;
  font-weight: 200;
  color: #fff;
  line-height: 0.24rem;
  vertical-align: middle;
}
.dis-ul .img {
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.12rem;
}
.dis-ul .img img{
  width: 100%;
  height: 100%;
}
.dis-ul li {
  margin-bottom: 0.24rem;
  padding: 0 0.24rem;
}
.info {
  font-size: 0.24rem;
  color: #fff;
  font-weight: 200;
  line-height: 0.48rem;
  padding: 0 0.24rem;
}
.close {
  position: absolute;
  bottom: 0.64rem;
  left: 0;
  right: 0;
  font-size: 0.64rem;
  color: rgba(255, 255, 255, 0.5);
}
</style>