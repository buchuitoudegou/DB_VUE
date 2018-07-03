import { ILoadMessage, request, IResponseData } from '@/stores/request';
export interface IEmployee {
  eid: String,
  name: String,
  birth: String,
  phone: String,
  address: String
}
export const UPDATE_EMPLOYEE_LIST = 'UPDATE_EMPLOYEE_LIST';
export const GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST'
export default {
  state: {
    list: []
  },
  getters: {
      ['GET_EMPLOYEE_LIST'](state:any) {
        return state.list;
      }
  },
  actions: {
    async ['UPDATE_EMPLOYEE_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('employee', options.methods,
        options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            eid: value.eid,
            name: value.name,
            birth: value.birth,
            phone: value.phone,
            address: value.address
          })
        })
      } 
    }
  }
}