import '@/assets/css/global.styl'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import animated from 'animate.css'
import '@/plugins/vant'
import '@/plugins/vuescroll'

import '@/plugins/element'
import '@/plugins/http'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()
Vue.use(animated)

new Vue({
  store,
  router,
  render: h => h(App),

}).$mount('#app')

