import axios from 'axios'
export interface ILoadMessage {
  tableName: string,
  selectMessage: string,
  methods: string,
  requestData?: any,
}
export interface IResponseData {
  status: string,
  list: any[],
  money?: number
}
export function request(tablename:string, methods:string, select:string,requestData:any) {
  // console.log(2)
    return new Promise((resolve, reject)=>{
    if (methods == 'GET') {
      axios.get(`/api/${tablename}${select}`).then((response)=>{
        if (response.data) {
          resolve(response.data)
        }
        else
          reject({status: 'failed'})
      })
    } else if (methods == 'POST') {
      axios.post(`/api/${tablename}${select}`, requestData).then((response)=>{
        console.log(response.data)
        if (response.data)
          resolve(response.data)
        else
          reject({status: 'failed'})
      })
    }
  })
}