import axios from 'axios'
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
      ['UPDATE_SUPPLIER_LIST'](state:any, selectMessage:String) {
          return new Promise((resolve, reject)=>{
            axios.get(`/api/supplier/${selectMessage}`).then((response)=>{
              state.list = []
              if (response.data) {
                let data = response.data.list
                for (let i in data) {
                  let curInfo: ISupplier = {
                    sid: data[i].sid,
                    name: data[i].name,
                    manager: data[i].manager,
                    phone: data[i].phone,
                    address: data[i].address
                  }
                  state.list.push(curInfo)
                }
                resolve('finished')
              } else {
                reject('failed')
              } 
            })
          })
      }
  }
}