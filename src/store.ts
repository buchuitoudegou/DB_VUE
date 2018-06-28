import Vue from "vue";
import Vuex from "vuex";
import DBmodule from "@/stores/DBModule"
import medicine, { IMedicineList } from "@/stores/medicine"
import {Module} from "vuex"
Vue.use(Vuex);

export interface RootStore {
  modules: any,
  state: any,
  mutations: any,
  actions: any
}


export default new Vuex.Store({
  modules: {
    DBmodule,
    medicine
  },
  state: {},
  getters: {
    getMedicine(state):IMedicineList {
      //return medicine.state.list;
      return medicine.getters.GET_MEDICINE_LIST(state);
    }
  },
  mutations: {},
  actions: {}
});
