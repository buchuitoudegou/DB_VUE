import Vue from "vue";
import Vuex from "vuex";
import DBmodule from "@/stores/DBModule"
import medicine, { GET_MEDICINE_LIST } from "@/stores/medicine"
import employee from '@/stores/employee';
import supplier from '@/stores/supplier';
import guest from '@/stores/guest'
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
    medicine,
    employee,
    supplier,
    guest
  },
  state: {},
  getters: {
    
  },
  mutations: {},
  actions: {
    async loadMessage(state:any, options:ILoadMessage) {
      // console.log(options.tableName)
      switch(options.tableName) {
        case '药品': await medicine.actions.UPDATE_MEDICINE_LIST(medicine.state, options.selectMessage);break;
        case '员工': await employee.actions.UPDATE_EMPLOYEE_LIST(employee.state, options.selectMessage);break;
        case '供应商': await supplier.actions.UPDATE_SUPPLIER_LIST(supplier.state, options.selectMessage);break;
        case '客户': await guest.actions.UPDATE_GUEST_LIST(guest.state, options.selectMessage);break;
      }  
    }
  }
});
