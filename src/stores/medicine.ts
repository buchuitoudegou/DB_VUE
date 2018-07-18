import {ILoadMessage, request, IResponseData} from '@/utils/request'
export interface IMedicineInfo {
  mid: String,
  name?: String,
  proDate?: String,
  shelfLife?: String,
  prescription?: Boolean | string,
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
    async ['UPDATE_MEDICINE_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('medicine', options.methods,
        options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            mid: value.mid,
            name: value.name,
            proDate: value.proDate,
            shelfLife: value.shelfLife,
            prescription: value.prescription,
            buyingPrice: parseFloat(value.buyingPrice),
            price: parseFloat(value.price)
          })
        })
      }
    }
  }
};