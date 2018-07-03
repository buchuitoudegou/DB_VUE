import { ILoadMessage, request, IResponseData } from '@/stores/request';
export interface IGuest {
  gid: String,
  name: String,
  phone: String,
}
export const UPDATE_GUEST_LIST = 'UPDATE_GUEST_LIST'
export const GET_GUEST_LIST = 'GET_GUEST_LIST'
export default {
  state: {
    list: [],
  },
  getters: {
      ['GET_GUEST_LIST'](state:any) {
        return state.list;
      }
  },
  actions: {
    async ['UPDATE_GUEST_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('guest', options.methods,
        options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            gid: value.gid,
            name: value.name,
            phone: value.phone
          })
        })
      }  
    }
  }
}