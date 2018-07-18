<template>
    <div id="topbar">
        <header id="topbar-header">药品数据库管理系统</header>
        <nav>
            <a href="/info" id="info">基本信息</a>
            <a href="/purchase" id="purchase">进货管理</a>
            <a href="/storage" id="storage">库房管理</a>
            <a href="/sale" id="sale">销售管理</a>
            <a href="/finance" id="finance">财务统计</a>
        </nav>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: ()=>{
      return {}
    },
})
</script>
<style>
  #topbar {
    background-color: rgb(228, 245, 239);
    margin: 0 auto;
  }
  #topbar-header {
    padding-top: 2%;
    text-align: center;
    color: rgb(44, 62, 80);
    font-size: 1.8em;
    font-weight: 0.5em;
    margin-bottom: 2%;
  }
  nav {
    text-align: center;
    padding-bottom: 2%;
  }
  nav a {
    margin-left: 80px;
    outline: none;
    text-decoration: none;
    color: rgb(44, 62, 80);
    text-align: center;
  }
  nav a:hover {
    color: rgb(104, 6, 193);
  }
</style>

