import Vue from 'vue'
import App from './App'
// import router from './router'
import router from './router/sportIndex'
import store from '@/store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../static/main.css"
import * as Filters from "./service/filter"

Vue.use(ElementUI);

Vue.config.productionTip = false;

Object.keys(Filters).forEach((key)=>{
  Vue.filter(key,Filters[key])
});

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
