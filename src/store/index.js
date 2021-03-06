import Vue from "vue"
import Vuex from "vuex"
import  state from "./state"
import * as getters from "./getter"
import * as actions from "./action"
import mutations from "./mutation"

Vue.use(Vuex);
const store=new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
