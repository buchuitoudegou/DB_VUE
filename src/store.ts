import Vue from "vue";
import Vuex from "vuex";
import DBmodule from "@/stores/DBModule"
import medicine, { GET_MEDICINE_LIST } from "@/stores/medicine"
import employee from '@/stores/employee';
import supplier from '@/stores/supplier';
import guest from '@/stores/guest'
import {ILoadMessage} from '@/stores/request'
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
      // console.log(1)
      switch(options.tableName) {
        case '药品': await medicine.actions.UPDATE_MEDICINE_LIST(medicine.state, options);break;
        case '员工': await employee.actions.UPDATE_EMPLOYEE_LIST(employee.state, options);break;
        case '供应商': await supplier.actions.UPDATE_SUPPLIER_LIST(supplier.state, options);break;
        case '客户': await guest.actions.UPDATE_GUEST_LIST(guest.state, options);break;
      }  
    }
  }
});
