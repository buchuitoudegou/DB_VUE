import { ILoadMessage,request, IResponseData } from '@/utils/request';

export interface IPurchase {
  eid: string,
  sid: string,
  mid: string,
  purchaseTime: string
}
export const GET_PURCHASE_LIST = 'GET_PURCHASE_LIST'
export const UPDATE_PURCHASE_LIST = 'UPDATE_PURCHASE_LIST'
export default {
  state: {
    list: []
  },
  getters: {
    ['GET_PURCHASE_LIST'](state:any) {
      return state.list
    }
  },
  actions: {
    async ['UPDATE_PURCHASE_LIST'](state:any, options:ILoadMessage) {
      // state.list.push('b')
      state.list = []
      let data = await request('purchase', options.methods,
      options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      // console.log(list)
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            eid: value.eid,
            sid: value.sid,
            mid: value.mid,
            purchaseTime: value.purchaseTime
          })
        })
      }
      // console.log(state.l// ist)
    },
    async ['HANDOUT_PURCHASE_ITEM'](state:any, options:ILoadMessage) {
      await request('purchase', options.methods, options.selectMessage, options.requestData);
      // await request('purchase', 'GET', '/all', {});
      this.UPDATE_PURCHASE_LIST(state, {tableName:'进货管理', methods:'GET', 
      selectMessage:'/all', requestData: {}});
    }
  }
}