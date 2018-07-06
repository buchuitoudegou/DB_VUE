import { ILoadMessage,request, IResponseData } from '@/utils/request';

export interface ISale {
  mid: string,
  gid: string,
  sale: boolean | string, // 进货还是退货
  saleTime: string,
  eid: string
}
export const GET_SALE_LIST = 'GET_SALE_LIST'
export const UPDATE_SALE_LIST = 'UPDATE_SALE_LIST'

export default {
  state: {
    list: []
  },
  getters: {
    ['GET_SALE_LIST'](state:any) {
      return state.list
    }
  },
  actions: {
    async ['UPDATE_SALE_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('sale', options.methods,
      options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            mid: value.mid,
            gid: value.gid,
            sale: value.sale == true ? '销售' : '退货',
            saleTime: value.saleTime,
            eid: value.eid
          })
        })
      }
    },
    async ['HANDOUT_SALE_ITEM'](state:any, options:ILoadMessage) {
      await request('sale', options.methods, options.selectMessage, options.requestData);
      // await request('sale', 'GET', '/all', {});
      this.UPDATE_SALE_LIST(state, {tableName:'销售管理', methods:'GET', 
      selectMessage:'/all', requestData: {}});
    }
  }
}