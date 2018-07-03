import axios from 'axios'
import { ILoadMessage, request, IResponseData } from '@/stores/request';
export interface ISupplier {
  sid: String,
  name: String,
  manager: String,
  phone: String,
  address: String
}
export const UPDATE_SUPPLIER_LIST = 'UPDATE_SUPPLIER_LIST'
export const GET_SUPPLIER_LIST = 'GET_SUPPLIER_LIST'
export default {
  state: {
    list: []
  },
  getters: {
      ['GET_SUPPLIER_LIST'](state:any) {
        return state.list;
      }
  },
  actions: {
    async ['UPDATE_SUPPLIER_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('supplier', options.methods,
        options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            sid: value.sid,
            name: value.name,
            manager: value.manager,
            phone: value.phone,
            address: value.address
          })
        })
      }  
    }
  }
}