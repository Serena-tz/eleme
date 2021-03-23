<template>
  <!-- 组件内容 -->
  <div class="fa">
    <span class="stars" v-if="score">
      <span class="iconfont icon-xingxing1 or" v-for="(item,index) in +or" :key="index"></span>
      <span class="iconfont icon-xingxing1 gray" v-for="(item,index) in +gray" :key="index+5"></span>
    </span>
  </div>
</template>

<script>
// 引入组件
export default {
  name: "stars",
  props:["score"],
  computed:{
    // 循环生成星星
    or(){
      return parseInt(this.score)
    },
    gray(){
      return 5-parseInt(this.score)
    }
  }
};

// 写通用的方法
</script>

<style scoped>
/* 星星 */
.stars .or {
  color: #ff9900;
}
.stars .gray {
  color: #d4d6d9;
}
/* 星星 */
</style>