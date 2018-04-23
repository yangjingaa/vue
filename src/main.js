import Vue from 'vue'
import App from './App'
import teacherRouter from './router/index'
import sportRouter from './router/sportIndex'
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

// const router=teacherRouter;//外教项目
const router=sportRouter;//健身房项目

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
