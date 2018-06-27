import { Module } from 'vuex'

export interface IMedicineInfo {
    mid: String,
    name: String,
    proDate: String,
    shelfLife: String,
    prescription: Boolean
}

export interface IMedicineList {
    list: IMedicineInfo[]
}

export const SET_MEDICINE_LIST = 'SET_MEDICINE_LIST'

export default {
    state:()=>({
        list: []
    }),
    mutations: {
        [SET_MEDICINE_LIST](state, { list }: { list: IMedicineInfo[] }) {
            state.list.push(...list);
        }
    }
} as Module<IMedicineList, any>;