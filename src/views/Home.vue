<template>
  <div class="home">
    <img src="../assets/logo.png">
    <header id="tech">VUE + TYPESCRIPT + EXPRESS + MYSQL</header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    
  }
})
export default class Home extends Vue {}
</script>
<style>
  img {
    padding-top: 5%;
    display: block;
    margin: 0 auto;
  }
  .home {
    text-align: center;
  }
  #tech {
    margin-top: 1%;
    font-size: 1.5em;
  }
</style>
