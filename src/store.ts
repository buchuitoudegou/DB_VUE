import Vue from "vue";
import Vuex from "vuex";
import DBmodule from "@/stores/DBModule"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    DBmodule
  },
  state: {},
  mutations: {},
  actions: {}
});
