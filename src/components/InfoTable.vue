<template>
    <div v-on:update="update(message)">
      <p>{{ tablename }}</p>
      <table>
        <tr>
          <td v-for="(value,index) in tableList[0]" v-bind:key="index">{{ index }}</td>
        </tr>
        <tr v-for="(item, index) in tableList" v-bind:key="index">
          <td v-for="(value, key) in item" v-bind:key="key">{{ value }}</td>
        </tr>
      </table>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator';
export default  Vue.extend( {
  props: {
    tableName: String
  },
  data: ()=>{
    return {
      tablelist: []
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
        // return this.tablelist
        switch(this.tableName){
          case '药品': return this.$store.getters.GET_MEDICINE_LIST
          case '供应商': return this.$store.getters.GET_SUPPLIER_LIST
          case '员工': return this.$store.getters.GET_EMPLOYEE_LIST
          case '客户': return this.$store.getters.GET_GUEST_LIST
          default: return []
        }
      },
      set(newValue:any) {
        this.tablelist = newValue
      }
    }
  },
  async mounted() {
    let options = {
      tableName: this.tableName,
      selectMessage: 'all'
    };
    await this.$store.dispatch('loadMessage',options);
  },
  methods: {
    async updateSelf(tablename:string,condition:string) {
      // console.log('a')
      let options = {
      tableName: tablename,
      selectMessage: condition
    };
    await this.$store.dispatch('loadMessage',options);
    }
  }
})
</script>
