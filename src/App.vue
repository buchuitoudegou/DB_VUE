<template>
  <div id="app">
    <topbar></topbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import topbar from '@/components/TopBar.vue'
export default Vue.extend({
  components: {
    topbar
  }
})
</script>
