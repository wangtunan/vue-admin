import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 现代版重置浏览器样式
import 'normalize.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 项目的样式文件
import 'assets/stylus/index.styl'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
