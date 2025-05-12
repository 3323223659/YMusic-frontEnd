import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import VueAudioBetter from 'vue-audio-better'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont/iconfont.css';
import '@/style/index.scss';
import '@/promission'


Vue.use(ElementUI);
Vue.use(VueAudioBetter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
