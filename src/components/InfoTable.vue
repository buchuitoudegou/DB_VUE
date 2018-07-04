<template>
    <div v-on:update="update(message)">
      <p>{{ tablename }}</p>
      <button @click="filter(tableName)">查询</button>
      <table>
        <tr>
          <td v-for="(value, index) in tableList[0]" v-bind:key="index">
            <input v-bind:seg="index" class="filter" type="text"/>
          </td>
        </tr>
        <tr>
          <td v-for="(value,index) in tableList[0]" v-bind:key="index">{{ index }}</td>
        </tr>
        <tr v-for="(item, index) in tableList" v-bind:key="index">
          <td v-for="(value, key) in item" v-bind:key="key">{{ value }}</td>
        </tr>
      </table>
      <calendar ref="calendar" v-bind:tablename="tablename"></calendar>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator';
import calendar from './calendar.vue'
export default  Vue.extend( {
  components: {
    calendar
  },
  props: {
    tableName: String
  },
  computed: {
    tablename: {
      get():String {
        return this.tableName
      }
    },
    tableList: {
      get():any[] {
        // return this.tablelist
        switch(this.tableName){
          case '药品': return this.$store.getters.GET_MEDICINE_LIST
          case '供应商': return this.$store.getters.GET_SUPPLIER_LIST
          case '员工': return this.$store.getters.GET_EMPLOYEE_LIST
          case '客户': return this.$store.getters.GET_GUEST_LIST
          case '进货管理': return this.$store.getters.GET_PURCHASE_LIST
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
      if (this.tableName == '药品') {
        if (dates[0].proDate.from != null && dates[0].proDate.to != null) {
          flag = true
          requestData.proDate = dates[0].proDate
        }
        if (dates[1].shelfLife.from != null && dates[1].shelfLife.to != null) {
          flag = true
          requestData.shelfLife = dates[1].shelfLife
        }
      } else if (this.tableName == '员工') {
        if (dates[2].birth.from != null && dates[2].birth.to != null) {
          requestData.birth = dates[2].birth
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
