import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import teacherRouter from './router/index'
import sportRouter from './router/sportIndex'
import store from '@/store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../static/main.css"
import * as Filters from "./service/filter"
import {miXin} from "./service/index"
import messages from './language/index'

Vue.use(ElementUI);
Vue.use(VueI18n)

Vue.mixin(miXin.powerMiXin);

Vue.config.productionTip = false;

Object.keys(Filters).forEach((key)=>{
  Vue.filter(key,Filters[key])
});

/* eslint-disable no-new */

const router=teacherRouter;//外教项目
// const router=sportRouter;//健身房项目

function lang () {
  // 将选择的语言存在localStorage中
    let t = window.localStorage.getItem('language');
    if (t) return t;
    // 默认中文
    else return 'cn'
  }

  const language = lang();

  // 自定义 window 的 lang 属性
  window.lang = lang();

  // 创建一个 i18n 实例
  const i18n = new VueI18n({
    locale: language,    // 语言标识
    messages
  });

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
});
