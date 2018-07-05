<template>
  <div>
    <p>盈利/亏损: {{ $store.getters.GET_MONEY }} </p>
    <InfoTable tableName="财务统计"></InfoTable>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import InfoTable from '@/components/InfoTable.vue'
export default Vue.extend({
  components: {
    InfoTable
  },

})
</script>
