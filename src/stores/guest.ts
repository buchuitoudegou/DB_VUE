import axios from 'axios'
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
      ['UPDATE_GUEST_LIST'](state:any, selectMessage:String) {
          // state.a = 2
          return new Promise((resolve, reject)=>{
            axios.get(`/api/guest/${selectMessage}`).then((response)=>{
              state.list.splice(0, state.list.length)
              if (response.data) {
                let data = response.data.list
                for (let i in data) {
                  let curInfo: IGuest = {
                    gid: data[i].gid,
                    name: data[i].name,
                    //manager: data[i].manager,
                    phone: data[i].phone,
                    //address: data[i].address
                  }
                  state.list.push(curInfo)
                }
                resolve('finished')
                console.log(state.list)
              } else {
                reject('failed')
              } 
            })
          })
      }
  }
}