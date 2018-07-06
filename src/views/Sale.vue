<template>
  <div>
    <el-menu style="text-align:center">
      <el-menu-item style="display:inline-block;width:50%" @click="sw = 1" index="1">销售/退货登记</el-menu-item>
      <el-menu-item style="display:inline-block;width:50%" @click="sw = 0" index="0">销售管理查询</el-menu-item>
    </el-menu>
    <div v-show="sw">
      <header style="font-size:1.25em;text-align:center;color:rgb(44, 62, 80);font-size:1.25em;"> 销售/退货登记 </header>
      <el-form style="width:50%;margin:0 auto;">
      <el-form-item>药品id: <el-input v-model="mid"/></el-form-item>
      <el-form-item>客户id: <el-input v-model="gid"/></el-form-item>
      <el-form-item>
        销售: <input type="radio" name="sale" v-bind:value="true" v-model="sale"/>
        退货: <input type="radio" name="sale" v-bind:value="false" v-model="sale"/>
      </el-form-item>
      <el-form-item>销售时间: 
        <el-date-picker type="date" placeholder="选择日期" style="width:30%"
         v-model="saleTime" value-format="yyyyMMdd"></el-date-picker>
      </el-form-item>
      <el-form-item>经手员工id: <el-input v-model="eid"/></el-form-item>
      <el-button @click="handout()">提交登记</el-button>
      </el-form>
    </div>
    <InfoTable v-show="!sw" tableName="销售管理"></InfoTable>
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
      eid: '',
      sw: 1
    }
  },
  methods: {
    handout() {
      //console.log(this.mid, this.gid, this.sale, this.saleTime, this.eid)
      //let date: IDate = formatDate(this.saleTime)
      // console.log(this.mid)
      if (this.mid && this.gid && this.sale != null && this.saleTime && this.eid) {
        let requestData = {
          mid: this.mid,
          gid: this.gid,
          sale: this.sale,
          saleTime: this.saleTime,
          eid: this.eid
        }
        this.$store.dispatch('handoutRequest', {tableName: '销售管理', selectMessage: '/',
        methods: 'POST', requestData})
        this.mid = ''
        this.gid = ''
        this.sale = null
        this.saleTime = ''
        this.eid = ''
      } else {
        alert('有的字段为空')
      }
    }
  }
})
</script>
<style>
</style>
