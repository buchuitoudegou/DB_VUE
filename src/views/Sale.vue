<template>
  <div>
    <div>
      <h1> 销售/退货登记 </h1>
      <p>药品id: <input v-model="mid"/></p>
      <p>客户id: <input v-model="gid"/></p>
      <p>销售: <input type="radio" name="sale" v-bind:value="true" v-model="sale"/>
      退货: <input type="radio" name="sale" v-bind:value="false" v-model="sale"/></p>
      <p>销售时间: <input v-model="saleTime" placeholder="format:yyyyMMdd"/></p>
      <p>经手员工id: <input v-model="eid"/></p>
      <button @click="handout()">提交登记</button>
    </div>
    <InfoTable tableName="销售管理"></InfoTable>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import InfoTable from '@/components/InfoTable.vue'
import {formatDate, IDate, checkDate} from '@/utils/utils.ts' 
export default Vue.extend({
  components: {
    InfoTable
  },
  data: ()=>{
    return {
      mid: '',
      gid: '',
      sale: null,
      saleTime: '',
      eid: ''
    }
  },
  methods: {
    handout() {
      //console.log(this.mid, this.gid, this.sale, this.saleTime, this.eid)
      let date: IDate = formatDate(this.saleTime)
      if (checkDate(date)) {
        let requestData = {
          mid: this.mid,
          gid: this.gid,
          sale: this.sale,
          saleTime: this.saleTime,
          eid: this.eid
        }
        this.$store.dispatch('handoutRequest', {tableName: '销售管理', selectMessage: '/',
        methods: 'POST', requestData})
      } else {
        alert('日期格式错误')
      }
    }
  }
})
</script>
