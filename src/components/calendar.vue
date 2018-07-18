<template>
  <div>
    <p v-if="tablename=='药品'">
       proDate: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="pfrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
        v-model="pto" value-format="yyyyMMdd"></el-date-picker>
       </p>
       <p v-if="tablename=='药品'">
         shelfLife: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="sfrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
        v-model="sto" value-format="yyyyMMdd"></el-date-picker>
       </p>
       <p v-if="tablename=='员工'">
         birth: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="bfrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="bto" value-format="yyyyMMdd"></el-date-picker>
       </p>
       <p v-if="tablename=='进货管理'">
         purchaseTime: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="pufrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="puto" value-format="yyyyMMdd"></el-date-picker>
       </p>
       <p v-if="tablename=='库存管理'">
         storeTime: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="stfrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="stto" value-format="yyyyMMdd"></el-date-picker>
       </p>
       <p v-if="tablename=='销售管理'">
         saleTime: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="safrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="sato" value-format="yyyyMMdd"></el-date-picker>
       </p>
       <p v-if="tablename=='财务统计'">
         financeTime: from 
         <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="fifrom" value-format="yyyyMMdd"></el-date-picker>
          to: 
          <el-date-picker type="date" placeholder="选择日期" style="width:20%"
         v-model="fito" value-format="yyyyMMdd"></el-date-picker>
       </p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    tablename: String
  },
  data: ()=>{
    return {
      pfrom: null,
      pto: null,
      sfrom: null,
      sto: null,
      bfrom: null,
      bto: null,
      pufrom: null,
      puto: null,
      stfrom: null,
      stto: null,
      safrom: null,
      sato: null,
      fifrom: null,
      fito: null
    }
  },
  methods: {
    getDate(condition:string) {
      return [
        {
          proDate: {
            from: this.pfrom,
            to: this.pto
          }
        },
        {
          shelfLife: {
            from: this.sfrom,
            to: this.sto
          }
        },
        {
          birth: {
            from: this.bfrom,
            to: this.bto
          }
        },
        {
          purchaseTime: {
            from: this.pufrom,
            to: this.puto
          }
        },
        {
          storeTime: {
            from: this.stfrom,
            to: this.stto
          }
        },
        {
          saleTime: {
            from: this.safrom,
            to: this.sato
          }
        },
        {
          financeTime: {
            from: this.fifrom,
            to: this.fito
          }
        }
      ]
    }
  }
})
</script>
<style>
  p {
    font-size: 0.85em;
    color: rgb(44, 62, 80);
  }
</style>
