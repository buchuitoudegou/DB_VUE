import Vue from "vue";
import Vuex from "vuex";
import DBmodule from "@/stores/DBModule"
import medicine, { GET_MEDICINE_LIST } from "@/stores/medicine"
import employee from '@/stores/employee';
import supplier from '@/stores/supplier';
import guest from '@/stores/guest'
import purchase from '@/stores/purchase'
import {ILoadMessage} from '@/utils/request'
import storage from '@/stores/storage'
import sale from '@/stores/sale'
import finance from '@/stores/finance'
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
    guest,
    purchase,
    storage,
    sale,
    finance
  },
  state: {},
  getters: {
    
  },
  mutations: {},
  
  actions: {
    async loadMessage(state:any, options:ILoadMessage) {
      switch(options.tableName) {
        case '药品': await medicine.actions.UPDATE_MEDICINE_LIST(medicine.state, options);break;
        case '员工': await employee.actions.UPDATE_EMPLOYEE_LIST(employee.state, options);break;
        case '供应商': await supplier.actions.UPDATE_SUPPLIER_LIST(supplier.state, options);break;
        case '客户': await guest.actions.UPDATE_GUEST_LIST(guest.state, options);break;
        case '进货管理': await purchase.actions.UPDATE_PURCHASE_LIST(purchase.state, options);break;
        case '库存管理': await storage.actions.UPDATE_STORAGE_LIST(storage.state, options);break;
        case '销售管理': await sale.actions.UPDATE_SALE_LIST(sale.state, options);break
        case '财务统计': await finance.actions.UPDATE_FINANCE_LIST(finance.state, options);break;
      }  
    },
    async handoutRequest(state:any, options:ILoadMessage) {
      switch(options.tableName) {
        case '进货管理': await purchase.actions.HANDOUT_PURCHASE_ITEM(purchase.state, options);break;
        case '销售管理': await sale.actions.HANDOUT_SALE_ITEM(sale.state, options);break;
      }
    }
  }
});
