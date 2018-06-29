import axios from 'axios'
import { resolve } from 'url';
export interface IMedicineInfo {
  mid: String,
  name: String,
  proDate: String,
  shelfLife: String,
  prescription: Boolean
}

export interface IMedicineList {
  list: IMedicineInfo[]
}

export const SET_MEDICINE_LIST = 'SET_MEDICINE_LIST'

export default {
  state: {
    list: []
  },
  mutations: {
    [SET_MEDICINE_LIST](state:IMedicineList, { list }: { list: IMedicineInfo[] }) {
      state.list.push(...list);
    }
  },
  getters: {
    ['GET_MEDICINE_LIST'](state: any): IMedicineInfo[] {
      return state.list;
    }
  },
  actions: {
    ['UPDATE_MEDICINE_LIST'](state:any, selectMessage:String) {
      return new Promise((resolve, reject)=> {
        axios.get('/medicine?select=all').then((response)=>{
          // console.log(response);
          resolve('finished');
        });
      });
    }
  }
};