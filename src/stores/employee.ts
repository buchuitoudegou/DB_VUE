import axios from 'axios'
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
      ['UPDATE_EMPLOYEE_LIST'](state:any, selectMessage:String) {
          return new Promise((resolve, reject)=>{
            axios.get(`/api/employee/${selectMessage}`).then((response)=>{
              state.list = []
              if (response.data) {
                let data = response.data.list
                for (let i in data) {
                  let curInfo: IEmployee = {
                    eid: data[i].eid,
                    name: data[i].name,
                    birth: data[i].birth,
                    phone: data[i].phone,
                    address: data[i].address
                  }
                  state.list.push(curInfo)
                }
                resolve('finished')
              } else {
                reject('fail')
              } 
            })
          })
      }
  }
}