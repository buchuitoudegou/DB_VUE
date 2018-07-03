import axios from 'axios'
export interface IMedicineInfo {
  mid: String,
  name?: String,
  proDate?: String,
  shelfLife?: String,
  prescription?: Boolean,
  buyingPrice?: number,
  price?: number
}

export interface IMedicineList {
  list: IMedicineInfo[]
}

export const SET_MEDICINE_LIST = 'SET_MEDICINE_LIST'
export const GET_MEDICINE_LIST = 'GET_MEDICINE_LIST'
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
        axios.get('/api/medicine/all').then((response)=>{
          state.list = []
          if (response.data) {
            let data = response.data.list
            for (let i in data) {
              let curInfo: IMedicineInfo = {
                mid: data[i].mid,
                name: data[i].name,
                proDate: data[i].proDate,
                shelfLife: data[i].shelfLife,
                prescription: data[i].prescription == 'y' ? true : false,
                buyingPrice: parseFloat(data[i].buyingPrice),
                price: parseFloat(data[i].price)
              }
              state.list.push(curInfo)
            }
          }
          resolve('finished');
        });
      });
    }
  }
};