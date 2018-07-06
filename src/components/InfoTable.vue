<template>
    <div v-on:update="update(message)">
      <header id="table-title">{{ tablename }}查询</header>
      <el-table :data="tableList">
        <el-table-column v-for="(value, index) in tableList[0]" v-bind:key="index" v-bind:label="index" :prop="index">
            <!--<input v-bind:seg="index" class="filter" type="text"/>-->
        </el-table-column>
        
        <!--
        <tr>
          <td v-for="(value,index) in tableList[0]" v-bind:key="index">{{ index }}</td>
        </tr>
        <tr v-for="(item, index) in tableList" v-bind:key="index">
          <td v-for="(value, key) in item" v-bind:key="key">{{ value }}</td>
        </tr>-->
      </el-table>
      <div id="page-change">
      <el-select v-model="pageIndex">
        <el-option v-for="i in selectoptions" :key="i" :value="i"></el-option>
      </el-select>
      </div>
      <el-button @click="filter(tableName)" style="float:right;">查询</el-button>
      <el-form label-width="40%">
        <el-form-item v-for="(value, index) in tableList[0]" v-bind:key="index" :label="index" style="display: inline-block;width:20%;">
          <input v-bind:seg="index" class="filter" style="width:60%"/>
        </el-form-item>
      </el-form>
      <calendar ref="calendar" v-bind:tablename="tablename"></calendar>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator';
import calendar from './calendar.vue'
import { ElInput } from 'element-ui/types/input';
export default  Vue.extend( {
  components: {
    calendar
  },
  props: {
    tableName: String
  },
  data: ()=>{
    return {
      pageIndex: 1
    }
  },
  computed: {
    tablename: {
      get():String {
        return this.tableName
      }
    },
    tableList: {
      get():any[] {
        return this.alltableList.slice((this.pageIndex-1)*10, this.pageIndex*10);
      }
    },
    selectoptions: {
      get(): any[] {
        let data = []
        for (let i = 1; i <= parseInt((this.alltableList.length / 10).toString()) + 1; ++ i) {
          data.push(i)
        }
        return data;
      }
    },
    alltableList: {
      get():any[] {
        this.pageIndex = 1;
        switch(this.tableName){
          case '药品': return this.$store.getters.GET_MEDICINE_LIST
          case '供应商': return this.$store.getters.GET_SUPPLIER_LIST
          case '员工': return this.$store.getters.GET_EMPLOYEE_LIST
          case '客户': return this.$store.getters.GET_GUEST_LIST
          case '进货管理': return this.$store.getters.GET_PURCHASE_LIST
          case '库存管理': return this.$store.getters.GET_STORAGE_LIST
          case '销售管理': return this.$store.getters.GET_SALE_LIST
          case '财务统计': return this.$store.getters.GET_FINANCE_LIST
          default: return []
        }
      }
    }
  },
  async mounted() {
    let options = {
      tableName: this.tableName,
      selectMessage: '/all',
      methods: 'GET'
    };
    await this.$store.dispatch('loadMessage',options);
  },
  methods: {
    async updateSelf(tablename:string,condition:string) {
      let options = {
      tableName: tablename,
      selectMessage: condition,
      methods: 'GET'
    };
    await this.$store.dispatch('loadMessage',options);
    },
    async filter(tablename:string) {
      let arr = []
      arr.push(...document.getElementsByClassName('filter'))
      let string = '';
      arr.forEach(element => {
        if ((element as HTMLInputElement).value != '') {
          string += '/' + element.getAttribute('seg') + '/' 
          + (element as HTMLInputElement).value
        }
      });
      let dates:any[] = (this.$refs.calendar as any).getDate()
      let flag = false
      let requestData: any = {};
      // console.log(dates)
      if (this.tableName == '药品') {
        if (dates[0].proDate.from != null && dates[0].proDate.to != null) {
          flag = true
          string += '/proDate'
          requestData.proDate = dates[0].proDate
        }
        if (dates[1].shelfLife.from != null && dates[1].shelfLife.to != null) {
          flag = true
          requestData.shelfLife = dates[1].shelfLife
        }
      } else if (this.tableName == '员工') {
        if (dates[2].birth.from != null && dates[2].birth.to != null) {
          flag = true
          string += '/birth'
          requestData.birth = dates[2].birth
        }
      } else if (this.tableName == '进货管理') {
        if (dates[3].purchaseTime.from != null && dates[3].purchaseTime.to != null) {
          flag = true
          string += '/purchaseTime'
          requestData.purchaseTime = dates[3].purchaseTime
        }
      } else if (this.tableName == '库存管理') {
        if (dates[4].storeTime.from != null && dates[4].storeTime.to != null) {
          flag = true
          string += '/storeTime'
          requestData.storeTime = dates[4].storeTime
        }
      } else if (this.tableName == '销售管理') {
        if (dates[5].saleTime.from != null && dates[5].saleTime.to != null) {
          flag = true
          string += '/saleTime'
          requestData.saleTime = dates[5].saleTime
        }
      } else if (this.tableName == '财务统计') {
        if (dates[6].financeTime.from != null && dates[6].financeTime.to != null) {
          flag = true
          string += '/financeTime'
          requestData.financeTime = dates[6].financeTime
        }
      }
      if (!flag) {
        if (string == '')
          string = '/all'
        await this.$store.dispatch('loadMessage', {tableName: this.tablename, 
        selectMessage: string, methods: 'GET'})
      }
      else {
        // console.log(dates)
        console.log(requestData)
        await this.$store.dispatch('loadMessage', {tableName: this.tablename,
        selectMessage: string, methods: 'POST', requestData: requestData})
      }
    }
  }
})
</script>
<style>
  #table-title {
    color: rgb(44, 62, 80);
    font-size: 1.25em;
    text-align: center;
  }
  #page-change {
    text-align: center;
    margin-top: 1%;
  }
</style>
