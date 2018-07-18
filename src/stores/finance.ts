import { ILoadMessage,request, IResponseData } from '@/utils/request';

export interface IFinance {
  fid: string,
  inOut: boolean | string,       // 支出或收入
  financeTime: string, // 流水时间
  count: number,       // 金额
  reason: string
}
export const UPDATE_FINANCE_LIST = 'UPDATE_FINANCE_LIST'

export default {
  state: {
    list: [],
    money: null
  },
  getters: {
    ['GET_FINANCE_LIST'](state:any) {
      return state.list
    },
    ['GET_MONEY'](state:any) {
      return state.money
    }
  },
  actions: {
    async ['UPDATE_FINANCE_LIST'](state:any, options:ILoadMessage) {
      state.list = []
      let data = await request('finance', options.methods,
      options.selectMessage, options.requestData)
      let status = (data as IResponseData).status
      let list = (data as IResponseData).list
      let money = (data as IResponseData).money
      state.money = money
      if (status != 'failed') {
        list.forEach((value)=>{
          state.list.push({
            fid: value.fid,
            inOut: value.inOut == true ? 'out': 'in',
            financeTime: value.financeTime,
            count: value.count,
            reason: value.reason
          })
        })
      }
    }
  }
}