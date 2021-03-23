<template>
  <!-- 组件内容 -->
  <div class="fa">
    <!-- 头部 -->
    <div class="header">
      <!-- 主体 -->
      <div class="main clearfix pore">
        <!-- 图片 -->
        <img
          class="header-bg"
          src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
          alt=""
        />
        <div class="pic fl">
          <img
            src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
            alt=""
          />
        </div>
        <!-- 标题 -->
        <div class="text fl">
          <div class="title clearfix">
            <div class="brand fl"></div>
            <div class="fl name">{{sellerdata.name}}</div>
          </div>
          <p class="get">{{sellerdata.description}}/{{sellerdata.deliveryTime}}分钟送达</p>
          <div class="discount clearfix">
            <div class="min fl">
              <img v-if="sellerdata.supports" :src="`img/${icon[(sellerdata.supports)[0].type]}_2@2x.png`" alt="">
            </div>
            <div v-if="sellerdata.supports" class="fl con">{{(sellerdata.supports)[0].description}}</div>
          </div>
        </div>
        <!-- 个数 -->
        <div class="num" @click="changelayer">
          <span v-if="sellerdata.supports" class="number">{{(sellerdata.supports).length}}</span>
          <span>个</span>
          <span class="iconfont icon-arrow-right right"></span>
        </div>
      </div>
      <!-- 公告 -->
      <div class="tips" @click="changelayer">
        <div class="bulletin fl"></div>
        <div class="text cutFont fl">
          {{sellerdata.bulletin}}
        </div>
        <div
          class="more fr iconfont icon-arrow-right white"
          style="font-size: 0.14rem"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
export default {
  props:{
    // 弹出层的显示隐藏
    layershow:Boolean,
  },
  data() {
    return {
      // 商家数据
      sellerdata:"",
      // 图标类型的更换
      icon:["decrease","discount","special","invoice","guarantee"]
    };
  },
  methods: {
    // 关闭弹出层
    changelayer(){
      this.$emit("headtofa",true)
    }
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
.header {
  background-color: rgb(0, 0, 0, 0.2);
  overflow: hidden;
}

.header .header-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform: scale(1.2);
  filter: blur(0.1rem);
  -webkit-filter: blur(0.1rem);
}

.header .main .pic {
  width: 1.28rem;
  height: 1.28rem;
  border-radius: 0.04rem;
  overflow: hidden;
  margin: 0.48rem 0.32rem 0.36rem 0.48rem;
}

.header .main .pic img {
  width: 100%;
  height: 100%;
}

.header .main .text {
  margin-top: 0.48rem;
}

.header .title .brand {
  margin: 0.04rem 0.12rem 0.16rem 0;
  width: 0.6rem;
  height: 0.36rem;
  background: url(/img/brand@2x.png) no-repeat;
  background-size: 0.6rem 0.36rem;
}

.header .title .name {
  font-size: 0.32rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
  margin: 0 0 0.16rem 0.12rem;
  line-height: 0.36rem;
}

.header .text .get {
  font-size: 0.24rem;
  color: rgb(255, 255, 255);
  font-weight: 200;
  line-height: 0.24rem;
}

.header .discount {
  margin: 0.2rem 0 0.04rem;
}

.header .discount .con {
  font-size: 0.2rem;
  color: rgb(255, 255, 255);
  font-weight: 200;
  line-height: 0.24rem;
}

.header .min {
  width: 0.24rem;
  height: 0.24rem;
  margin-right: 0.08rem;
}
.header .min img{
  width: 100%;
  height: 100%;
}
.header .tips {
  height: 0.56rem;
  line-height: 0.56rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.header .bulletin {
  width: 0.44rem;
  height: 0.24rem;
  display: inline-block;
  background: url(/img/bulletin@2x.png) no-repeat;
  background-size: 0.44rem 0.24rem;
  margin: 0.17rem 0.08rem 0 0.24rem;
}

.header .tips .text {
  font-size: 0.2rem;
  color: rgb(255, 255, 255);
  font-weight: 200;
  line-height: 0.56rem;
  width: 6rem;
}

.header .tips .more {
  margin: 0 0.24rem 0 0.08rem;
  color: white;
}

.header .num {
  position: absolute;
  bottom: 0.36rem;
  right: 0.24rem;
  font-size: 0.2rem;
  color: white;
  font-weight: 200;
  line-height: 0.24rem;
  height: 0.48rem;
  line-height: 0.48rem;
  background-color: rgba(0, 0, 0, 0.2);
  display: inline-block;
  border-radius: 0.5rem;
}

.header .number {
  margin-left: 0.16rem;
}
.header .right {
  margin: 0 0.16rem 0 0.04rem;
  font-size: 0.2rem;
}
</style>