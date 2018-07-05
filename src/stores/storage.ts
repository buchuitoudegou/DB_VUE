export interface IStorage {
  mid: string,
  storeTime: string,
  reason: string // 进货或者退货
}
import { ILoadMessage,request, IResponseData } from '@/utils/request';
export const GET_STORAGE_LIST = 'GET_STORAGE_LIST'
export const UPDATE_STORAGE_LIST = 'UPDATE_STORAGE_LIST'
export default {
  state: {
    list: []
  },
  getters: {
    ['GET_STORAGE_LIST'](state:any) {
      return state.list
    }
  },
  actions: {
    async ['UPDATE_STORAGE_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('storage', options.methods,
      options.selectMessage, options.requestData);
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      if (status != 'failed') {
        list.forEach(element=>{
          state.list.push({
            mid: element.mid,
            storeTime: element.storeTime,
            reason: element.reason
          })
        })
      }
    }
  }
}