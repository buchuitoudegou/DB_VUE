<template>
  <div>
    <el-menu style="text-align:center">
      <el-menu-item style="display:inline-block;width:50%" @click="sw = 1" index="1">销售/退货登记</el-menu-item>
      <el-menu-item style="display:inline-block;width:50%" @click="sw = 0" index="0">销售管理查询</el-menu-item>
    </el-menu>
    <div v-show="sw"> 
      <header style="font-size:1.25em;text-align:center;color:rgb(44, 62, 80);font-size:1.25em;">进货登记</header>
      <el-form style="width:50%;margin:0 auto;">
      <el-form-item>经手人id: <el-input v-model="eid"/></el-form-item>
      <el-form-item>药品id: <el-input v-model="mid"/></el-form-item>
      <el-form-item>供应商id: <el-input v-model="sid"/></el-form-item>
      <el-form-item>进货时间: 
      <el-date-picker type="date" placeholder="选择日期" style="width:30%"
         v-model="purchaseTime" value-format="yyyyMMdd"></el-date-picker>
      </el-form-item>
      <el-button @click="handout()">进货</el-button>
      </el-form>
    </div>
    <InfoTable v-show="!sw" tableName="进货管理"></InfoTable>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import InfoTable from '@/components/InfoTable.vue'
import {formatDate, IDate, checkDate} from '@/utils/utils.ts' 
import purchase from '@/stores/purchase';
import calendar from '@/components/calendar.vue'
export default Vue.extend({
  components: {
    InfoTable,
    calendar
  },
  data: ()=>{
    return {
      eid: '',
      mid: '',
      sid: '',
      purchaseTime: '',
      sw: 1
    }
  },
  methods: {
    handout() {
      // let date: IDate = formatDate(this.purchaseTime);
      // console.log(date)
      if (this.eid && this.mid && this.sid && this.purchaseTime) {
        let requestData = {
          eid: this.eid,
          mid: this.mid,
          sid: this.sid,
          purchaseTime: this.purchaseTime
        }
        this.$store.dispatch('handoutRequest', {tableName: '进货管理', selectMessage: '/',
        methods: 'POST', requestData})
      } else {
        alert('有的字段为空')
      }
    }
  }
})
</script>
<style>

</style>
