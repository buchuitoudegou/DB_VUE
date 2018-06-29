<template>
    <div id="app">
        <div>
            <InfoTable></InfoTable>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { RootStore } from '@/store';
import InfoTable from '@/components/InfoTable.vue'
import topbar from '@/components/TopBar.vue'
export default Vue.extend({
    components: {
        InfoTable,
        topbar
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
        
    }
})
</script>
