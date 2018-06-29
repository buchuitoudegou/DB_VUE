import Vue from "vue";
import Vuex from "vuex";
import DBmodule from "@/stores/DBModule"
import medicine, { IMedicineInfo } from "@/stores/medicine"

Vue.use(Vuex);

export interface RootStore {
  modules: any,
  state: any,
  mutations: any,
  actions: any
}
interface ILoadMessage {
  tableName: String,
  selectMessage: String
}

export default new Vuex.Store({
  modules: {
    DBmodule,
    medicine
  },
  state: {},
  getters: {
    getMedicine(state): IMedicineInfo[] {
      return medicine.getters.GET_MEDICINE_LIST(medicine.state);
    }
  },
  mutations: {},
  actions: {
    async loadMessage(state:any, options:ILoadMessage) {
      await medicine.actions.UPDATE_MEDICINE_LIST(medicine.state, options.selectMessage);
    }
  }
});
