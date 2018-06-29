<template>
    <p>{{ getList() }}</p>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator';
import { IMedicineList } from '@/stores/medicine';
export default class InfoTable extends Vue {
  @Prop() private tableName!: String;
  @Prop() private list!:any[];
  getList() {
    return this.$store.getters.getMedicine;
  }
}
</script>
