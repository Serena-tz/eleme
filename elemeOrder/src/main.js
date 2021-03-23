// 是vue的项目，首先要导入vue.js
import Vue from 'vue';//ES6
// 需要将组件导入进来，填充到#app那个口子上
import App from './App.vue'
// 导入rouer.js文件
import router from './router' //index.js
// 导入axios，需要启用
import axios from 'axios';
// 需要挂载到vue的实例中，变成Vue的全局方法
Vue.prototype.$axios=axios;
// 使用this.$axios.get
// 关闭生产环境的错误代码提示
Vue.config.productionTip = false;
// 引入CSS文件
require('./assets/css/reset.css')
require('./assets/font/iconfont.css')
// 生成一个vue的实例
new Vue({
    el:"#app",
    render:function(ce){
        return ce(App);
    },
    router,
});