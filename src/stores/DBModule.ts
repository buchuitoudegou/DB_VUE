import { Module } from 'vuex'
import medicine from '@/stores/medicine.ts'
export const GET_CURRENT_LIST = 'GET_CURRENT_LIST'

export interface IDBModule {
    name: String,
    _class: String
}
export interface IDBModuleList {
    list: IDBModule[],
}
export default {
    state: ()=>({
        list: [
            { name: '药品', _class: 'M'},
            { name: '供应商', _class: 'M'},
            { name: '进货', _class: 'R'},
            { name: '库存', _class: 'R'},
            { name: '员工', _class: 'R'},
            { name: '财务', _class: 'R'},
            { name: '销售', _class: 'R'},
            { name: '客户', _class: 'M'},
        ]
    }),
} as Module<IDBModuleList,any>;