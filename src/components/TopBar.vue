<template>
    <div>
        <title>药品数据库管理系统</title>
        <nav>
            <a href="/info">基本信息</a>
            <a href="/purchase">进货管理</a>
            <a href="/storage">库房管理</a>
            <a href="/sale">销售管理</a>
            <a href="/finance">财务统计</a>
        </nav>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: ()=>{
        return {}
    },
    computed: {

    }
})
</script>
<style>
    nav a {
        margin-left: 20px;
        outline: none;
    }
</style>

