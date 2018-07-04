<template>
  <div>
    <div>
      <h1>进货登记</h1>
      <p>经手人id: <input v-model="eid"/></p>
      <p>药品id: <input v-model="mid"/></p>
      <p>供应商id: <input v-model="sid"/></p>
      <p>进货时间: <input placeholder="format:yyyyMMdd" v-model="purchaseTime"/></p>
      <button @click="handout">进货</button>
    </div>
    <InfoTable tableName="进货管理"></InfoTable>
    <p>{{ $store.state.purchase }}</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import topbar from '@/components/TopBar.vue'
import InfoTable from '@/components/InfoTable.vue'
import {formatDate, IDate, checkDate} from '@/utils/utils.ts' 
import purchase from '@/stores/purchase';
export default Vue.extend({
  components: {
    topbar,
    InfoTable
  },
  data: ()=>{
    return {
      eid: '',
      mid: '',
      sid: '',
      purchaseTime: ''
    }
  },
  methods: {
    handout() {
      let date: IDate = formatDate(this.purchaseTime);
      if (checkDate(date)) {
        let requestData = {
          eid: this.eid,
          mid: this.mid,
          sid: this.sid,
          purchaseTime: this.purchaseTime
        }
        this.$store.dispatch('handoutRequest', {tableName: '进货管理', selectMessage: '/',
        methods: 'POST', requestData})
      }
    }
  }
})
</script>
