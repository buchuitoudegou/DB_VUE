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
      bto: null
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
        }
      ]
    }
  }
})
</script>
