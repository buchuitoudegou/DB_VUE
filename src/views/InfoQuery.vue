<template>
    <div>
        <div>
          <el-menu style="text-align: center;">
           <el-menu-item v-for="(value, index) in tableList" v-bind:key="index" v-bind:index="value.toString()"
            v-on:click="update(index)" style="display:inline-block">{{ value.name }}</el-menu-item>
            </el-menu>
            <InfoTable v-bind:tableName="tableName"
            ref="infotable"></InfoTable>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { RootStore } from '@/store';
import InfoTable from '@/components/InfoTable.vue'
import topbar from '@/components/TopBar.vue'
import { IDBModule } from '@/stores/DBModule';
import { VueClass } from 'vue-class-component/lib/declarations';
export default Vue.extend({
  components: {
    InfoTable: InfoTable,
    topbar: topbar
  },
  data: ()=> {
    return {
      index: 0
    }
  },
  computed: {
    tableName :{
      get():String {
        return this.$store.state.DBmodule.list[this.index].name;
      }
    },
    tableList: {
      get():IDBModule[] {
        return this.$store.state.DBmodule.list;
      }
    }       
  },
  methods: {
    update(newIndex:number):void {
      this.index = newIndex;
      (this.$refs.infotable as any).updateSelf(this.tableName,'/all');
    }
  }
})
</script>
<style scoped>

</style>
