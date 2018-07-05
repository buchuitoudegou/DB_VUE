<template>
    <div>
        <InfoTable tableName="库存管理"></InfoTable>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import InfoTable from '@/components/InfoTable.vue'
import calendar from '@/components/calendar.vue'
export default Vue.extend({
  components: {
    InfoTable,
    calendar
  },
  data: ()=>{
    return {
      mid: '',
      storeTime: '',
      reason: ''
    }
  },
  methods: {
    
  }
})
</script>
